<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Services\EmployeeReportService;
class AttendanceController extends Controller
{
   
    
    public function checkIn(Request $request, Project $project)
    {
        $user = auth()->user();
    
        // Check if already checked in today
        $existing = Attendance::whereDate('check_in_time', now()->toDateString())
                    ->where('user_id', $user->id)
                    ->where('project_id', $project->id)
                    ->first();
    
        if ($existing) {
            return back()->with('message', 'تم تسجيل حضورك مسبقًا اليوم.');
        }
    
        Attendance::create([
            'user_id' => $user->id,
            'project_id' => $project->id,
            'check_in_time' => now(),
            'in_location' => $request->input('location', 'غير محدد'),
            'is_late' => now()->hour >= 9, // تعتبر متأخر بعد الساعة 9 صباحًا
        ]);
    
        return back()->with('message', 'تم تسجيل الحضور بنجاح.');
    }
    public function checkOut(Project $project)
{
    $user = auth()->user();

    $attendance = Attendance::where('user_id', $user->id)
        ->where('project_id', $project->id)
        ->whereDate('check_in_time', today())
        ->whereNull('check_out_time')
        ->first();

    if (!$attendance) {
        return back()->withErrors(['message' => 'لم يتم تسجيل الحضور أولاً.']);
    }

    $attendance->update([
        'check_out_time' => now(),
        'out_location' => $request->input('location', 'غير محدد'),
    ]);

    return back()->with('message', 'تم تسجيل الانصراف بنجاح.');
}
public function calculateAttendancePercentage($userId, $month=null)
{
    // تحديد بداية ونهاية الشهر المطلوب
    $month =Carbon::create(null, Carbon::now()->month, 1);
    $startOfMonth = Carbon::parse($month)->startOfMonth();
    $endOfMonth = Carbon::parse($month)->endOfMonth();

    $workingDays = 0;
    for ($date = $startOfMonth->copy(); $date->lte($endOfMonth); $date->addDay()) {
        if ($date->dayOfWeek !== Carbon::FRIDAY)
        { 
            $workingDays++;
        }
    }
    
    if ($workingDays == 0) {
        return 0; 
    }
 //until today
 $today = Carbon::now()->startOfDay();
 $workingDaysUntilltoday = 0;
 $current = $startOfMonth->copy();

 while ($current <= $today) {
     //, Carbon::SATURDAY
     if (!in_array($current->dayOfWeek, [Carbon::FRIDAY])) {
         $workingDaysUntilltoday++;
     }
     $current->addDay();
 }

    // عدد أيام الحضور للموظف خلال الشهر
    $attendanceDays = Attendance::where('user_id', $userId)
        ->whereBetween('check_in_time', [$startOfMonth, $endOfMonth])
        ->count();

    $attendanceUntilToday = Attendance::where('user_id', $userId)
    ->whereDate('check_in_time', '>=', $startOfMonth)
    ->whereDate('check_in_time', '<=', $today)
    ->distinct()
    ->count('check_in_time');

    // عدد أيام الغياب
    $absenceDays = max(0, $workingDaysUntilltoday - $attendanceUntilToday);
    //$absenceDaysInMonth = max(0, $workingDays - $attendanceUntilToday);

    // حساب النسبة
    $attendancePercentage = ($attendanceDays / $workingDays) * 100;
    $lateAttendances = Attendance::where('user_id', $userId)
    ->whereBetween('check_in_time', [$startOfMonth, $endOfMonth])
    ->where('is_late', true)
    ->count();
    //return $attendanceDays;

    $user = User::find($userId);
    $alltasks =  $user->tasks()
    ->whereBetween('tasks.due_date', [$startOfMonth, $endOfMonth])
    ->count();
    $tasksCompleted = $user->tasks()
    ->where('is_completed', 1)
    ->whereBetween('tasks.due_date', [$startOfMonth, $endOfMonth])
    ->count();
    if($alltasks === 0){
        $completedTasksPercentage = 100 ; 
        $tasksCompleted = 0; 
    }else{
        $completedTasksPercentage = ($tasksCompleted / $alltasks) * 100;
    }
   

    $variableSalary = $user->salary->final_salary - $user->salary->base_salary ; // 2000
    $taskFees = ($variableSalary / 100 ) * 65; // 1300
    $lateFees = ($variableSalary / 100 ) * 35; // 700
    $taskScore = ( $taskFees / 100) * $completedTasksPercentage; // 100
    $latePercentage =  ( $lateAttendances / $workingDays) * 100 ; // 3.8
    $lateScore = ( $lateFees / 100) * $latePercentage; // 100
//$assignments = $user->toolassignments->with('toolassignments.tool') ;
$assignments = $user->toolassignments()->with('tool')->get();
$lostThismonth =  $user->toolassignments() ->whereBetween('lost_at', [$startOfMonth, $endOfMonth])->get();
$lostCostThisMonth = 0 ;
foreach($lostThismonth as $lostItem){
    $lostCostThisMonth +=$lostItem->tool->estimated_value * $lostItem->quantity;
}
//advances deduction


    return [
        'attendance_percentage' => round($attendancePercentage, 2),
        'total_days' => $workingDays,
        'late_days' => $lateAttendances,
        'att_days' => $attendanceDays,
        'alltasks' => $alltasks,
        'tasksCompleted' => $tasksCompleted,
        'completedTasksPercentage' => $completedTasksPercentage,
        'absenceDays'=> $absenceDays,
        'taskScore'=> $taskScore,
        'lateScore' => $lateScore,
        'lateFees' => $lateFees,
        'assignments' => $assignments,
        'lostThismonth'=>$lostThismonth,
        'lostCostThisMonth'=>$lostCostThisMonth
    ];
    //return round($attendancePercentage, 2); // نقربها لرقمين عشريين
}
public function calculateAttendancePercentageUntillToday($userId, $month=null)
{
    // تحديد بداية ونهاية الشهر المطلوب
    if($month == null || $month == 'null'){
        $month =  Carbon::now()->month ;
    }
    $month = Carbon::create(null,$month, 1);
    $startOfMonth = Carbon::parse($month)->startOfMonth();
    $endOfMonth = Carbon::parse($month)->endOfMonth();

    $workingDays = 0;
    for ($date = $startOfMonth->copy(); $date->lte($endOfMonth); $date->addDay()) {
        if ($date->dayOfWeek !== Carbon::FRIDAY)
        { 
            $workingDays++;
        }
    }
    
    if ($workingDays == 0) {
        return 0; 
    }
 //until today
 if($month == null || $month == 'null'){

    $today = Carbon::now()->startOfDay();
 }else{
    $today = $endOfMonth->copy();
 }
 $workingDaysUntilltoday = 0;
 $current = $startOfMonth->copy();

 while ($current <= $today) {
     //, Carbon::SATURDAY
     if (!in_array($current->dayOfWeek, [Carbon::FRIDAY])) {
         $workingDaysUntilltoday++;
     }
     $current->addDay();
 }



    $attendanceUntilToday = Attendance::where('user_id', $userId)
    ->whereDate('check_in_time', '>=', $startOfMonth)
    ->whereDate('check_in_time', '<=', $today)
    ->distinct()
    ->count('check_in_time');

    $attInVisits = \App\Models\Visit::where('user_id', $userId)
    ->whereDate('check_in', '>=', $startOfMonth)
    ->whereDate('check_in', '<=', $today)
    ->distinct(DB::raw('DATE(check_in)'))
    ->count();
    //dd($attInVisits);

    // عدد أيام الغياب
    $absenceDays = max(0, $workingDaysUntilltoday - $attendanceUntilToday - $attInVisits);
    //$absenceDaysInMonth = max(0, $workingDays - $attendanceUntilToday);

    // حساب النسبة
    $attendancePercentage = (($attendanceUntilToday + $attInVisits )/ $workingDays) * 100;
    $lateAttendances = Attendance::where('user_id', $userId)
    ->whereBetween('check_in_time', [$startOfMonth, $endOfMonth])
    ->where('is_late', true)
    ->count();
    //return $attendanceDays;
    $lateAttendanceVisits = \App\Models\Visit::select(DB::raw('DATE(check_in) as visit_date'), DB::raw('MIN(check_in) as first_check_in'))
    ->where('user_id', $userId)
    ->whereDate('check_in', '>=', $startOfMonth)
    ->whereDate('check_in', '<=', $today)
    ->groupBy(DB::raw('DATE(check_in)'))
    ->havingRaw('TIME(first_check_in) > "09:00:00"')
    ->count();
    //dd($lateAttendanceDays);

    $user = User::find($userId);

    $tasks = $user->tasks()
    ->whereBetween('tasks.end_date', [$startOfMonth, $endOfMonth])
    ->with('progress')
    ->get();

    $alltasks = $tasks->count();

    $totalRequiredQuantity = $tasks->sum('quantity');
    $totalCompletedQuantity = $tasks->flatMap->progress->sum('quantity_done');
    
    $completionPercentage = $totalRequiredQuantity > 0
        ? round(($totalCompletedQuantity / $totalRequiredQuantity) * 100, 2)
        : 0;
        
    $tasksCompleted = $tasks->filter(function ($task) {
        $done = $task->progress->sum('quantity_done');
        return $done >= $task->quantity;
    })->count();

    if($alltasks === 0){
        $completedTasksPercentage = 100 ; 
        $tasksCompleted = 0; 
    }else{
        $completedTasksPercentage =  round(($totalCompletedQuantity / $totalRequiredQuantity) * 100, 2);
    }
   

    $variableSalary = $user->salary->final_salary - $user->salary->base_salary ; // 2000
    $taskFees = ($variableSalary / 100 ) * 65; // 1300
    $lateFees = ($variableSalary / 100 ) * 35; // 700
    $taskScore = ( $taskFees / 100) * $completedTasksPercentage; // 100
    $latePercentage =  ( ($lateAttendances + $lateAttendanceVisits) / $workingDays) * 100 ; // 3.8
    $lateScore = ( $lateFees / 100) * $latePercentage; // 100
    //$assignments = $user->toolassignments->with('toolassignments.tool') ;
    $assignments = $user->toolassignments()->with('tool')->get();
    $lostThismonth =  $user->toolassignments() ->whereBetween('lost_at', [$startOfMonth, $endOfMonth])->get();
    $lostCostThisMonth = 0 ;
    foreach($lostThismonth as $lostItem){
        $lostCostThisMonth +=$lostItem->tool->estimated_value * $lostItem->quantity;
    }
    $advances = $user->advances()->select('amount')->get();
    $expenses = $user->expenses()->select('amount')->get();
    $deductions= $user->deductions()->select('amount')->get();
    $totalAdvance = $advances->sum('amount');
    $totalExpense = $expenses->sum('amount');
    $totalDeductions = $deductions->sum('amount');
    $remaining = $totalAdvance - $totalExpense;

    $visits = \App\Models\Visit::where('user_id', $userId)
    ->whereBetween('check_in', [$startOfMonth, $endOfMonth])
    ->get();
    $transportaionFees = 0 ;
    foreach($visits as $visit){
        $transportaionFees += $visit->customer->transport_fees;
    }

    //rewards
    $rewards = \App\Models\Reward::where('user_id', $userId)
    ->whereBetween('reward_date', [$startOfMonth, $endOfMonth])
    ->sum('amount');

    return [
        'attendance_percentage' => round($attendancePercentage, 2),
        'deductions' => $totalDeductions,
        'rewards' => $rewards,
        'visits' => $visits,
        'totalAdvance' => $totalAdvance,
        'totalExpense' => $totalExpense,
        'remaining' => $remaining, 
        'transportaionFees' => $transportaionFees,      
        'total_days' => $workingDays,
        'late_days' =>($lateAttendances + $lateAttendanceVisits),
        'att_days' => $attendanceUntilToday + $attInVisits,
        'alltasks' => $alltasks,
        'tasksCompleted' => $tasksCompleted,
        'completedTasksPercentage' => $completedTasksPercentage,
        'absenceDays'=> $absenceDays,
        'taskScore'=> $taskScore,
        'lateScore' => $lateScore,
        'lateFees' => $lateFees,
        'assignments' => $assignments,
        'lostThismonth'=>$lostThismonth,
        'lostCostThisMonth'=>$lostCostThisMonth
    ];
    //return round($attendancePercentage, 2); // نقربها لرقمين عشريين
}
public function countLateAttendances($userId, $month)
{
    $month = Carbon::create(null, Carbon::now()->month, 1);
    $startOfMonth = Carbon::parse($month)->startOfMonth();
    $endOfMonth = Carbon::parse($month)->endOfMonth();

    $lateAttendances = Attendance::where('user_id', $userId)
        ->whereBetween('check_in_time', [$startOfMonth, $endOfMonth])
        ->where('is_late', true)
        ->count();

    return $lateAttendances;
}


}

