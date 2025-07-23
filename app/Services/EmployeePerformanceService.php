<?php
namespace App\Services;

use App\Models\Attendance;
use App\Models\User;
use App\Models\Visit;
use App\Models\Reward;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class EmployeePerformanceService
{
    public function calculate($userId, $from = null, $to = null)
    {
        
    $startDate = $from ? Carbon::parse($from)->startOfDay() : Carbon::now()->startOfMonth();
    $endDate = $to ? Carbon::parse($to)->endOfDay() : Carbon::now()->endOfMonth();

        $user = User::with(['tasks.progress', 'salary', 'toolassignments.tool'])->findOrFail($userId);

        $workingDays = $this->countWorkingDays($user->offdayestype, $startDate, $endDate);
        //$workingDaysUntilToday = $this->countWorkingDaysUntilToday($user->offdayestype,$startDate, $endDate, $month);
        $attendance = $this->getAttendanceData($userId, $startDate, $endDate);
        $taskData = $this->getTaskData($user, $startDate, $endDate);
        $penaltyScores = $this->calculateScores($user, $taskData['completedTasksPercentage'], $workingDays, $attendance['late_days'] , $attendance['present_days']);
        $tools = $this->getToolAssignments($user, $startDate, $endDate);
        $financials = $this->getFinancials($user, $startDate, $endDate);
        $transportFees = $this->calculateTransportFees($attendance['visits']);
        $rewards = $this->getRewards($userId, $startDate, $endDate);

        return [
            'attendance_percentage' => round($attendance['percentage'], 2),
            'deductions' => $financials['deductions'],
            'rewards' => $rewards,
            'visits' => $attendance['visits'],
            'totalAdvance' => $financials['advances'],
            'totalExpense' => $financials['expenses'],
            'remaining' => $financials['remaining'],
            'transportaionFees' => $transportFees,
            'total_days' => $workingDays,
            'late_days' => $attendance['late_days'],
            'att_days' => $attendance['present_days'],
            'alltasks' => $taskData['totalTasks'],
            'tasksCompleted' => $taskData['completedCount'],
            'completedTasksPercentage' => $taskData['completedTasksPercentage'],
            'absenceDays' => max(0, $workingDays - $attendance['present_days']),
            'taskScore' => $penaltyScores['taskScore'],
            'lateScore' => $penaltyScores['lateScore'],
            'lateFees' => $penaltyScores['lateFees'],
            'assignments' => $tools['all'],
            'lostThismonth' => $tools['lost'],
            'lostCostThisMonth' => $tools['lostCost'],
        ];
    }

    private function getMonthBoundaries($month)
    {
        $month = $month == null || $month == 'null' ? Carbon::now()->month : $month;
        $carbonMonth = Carbon::create(null, $month, 1);
        return [
            'start' => $carbonMonth->copy()->startOfMonth(),
            'end' => $carbonMonth->copy()->endOfMonth(),
            'today' => ($month == Carbon::now()->month) ? Carbon::now()->startOfDay() : $carbonMonth->copy()->endOfMonth(),
        ];
    }

    private function countWorkingDays($type,$start, $end)
    {
        $days = 0;
        for ($date = $start->copy(); $date->lte($end); $date->addDay()) {
            if ($type == 1) {
                // استثناء الجمعة فقط
                if ($date->dayOfWeek !== Carbon::FRIDAY) {
                    $days++;
                }
            } else {
                // استثناء الجمعة والسبت
                if (!in_array($date->dayOfWeek, [Carbon::FRIDAY, Carbon::SATURDAY])) {
                    $days++;
                }
            }
        }
        return $days;
    }

    private function countWorkingDaysUntilToday($type, $start, $end, $month)
{
    $today = ($month == null || $month == 'null') ? Carbon::now()->startOfDay() : $end;
    $count = 0;

    for ($date = $start->copy(); $date->lte($today); $date->addDay()) {
        if ($type == 1) {
            // استثناء الجمعة فقط
            if ($date->dayOfWeek !== Carbon::FRIDAY) {
                $count++;
            }
        } else {
            // استثناء الجمعة والسبت
            if (!in_array($date->dayOfWeek, [Carbon::FRIDAY, Carbon::SATURDAY])) {
                $count++;
            }
        }
    }

    return $count;
}


    private function getAttendanceData($userId, $start, $today)
    {
        $attendanceDays = Attendance::where('user_id', $userId)
            ->whereDate('check_in_time', '>=', $start)
            ->whereDate('check_in_time', '<=', $today)
            ->distinct()
            ->count('check_in_time');
         $lateAttendances = Attendance::where('user_id', $userId)
            ->whereBetween('check_in_time', [$start, $today])
            ->where('is_late', true)
            ->count();
$user= User::find($userId);

        return [
            'present_days' => $attendanceDays ,
            'late_days' => $lateAttendances ,
            'percentage' => ($attendanceDays ) / max(1, $this->countWorkingDays($user->type,$start, $today)) * 100,
            'visits' => Visit::where('user_id', $userId)
                ->whereBetween('check_in', [$start, $today])
                ->get()
        ];
    }

    private function getTaskData(User $user, $start, $end)
    {
        // جلب المهام المرتبطة بالموظف في الفترة المحددة، مع كمية نصيبه في المهمة
        $tasks = $user->tasks()
            ->whereBetween('tasks.end_date', [$start, $end])
            ->with(['progress' => function($query) use ($user) {
                // جلب تقدم هذا الموظف فقط (إنجازاته في المهمة)
                $query->where('user_id', $user->id);
            }])
            ->get();
    
        // مجموع الكميات المطلوبة لهذا الموظف فقط (من pivot)
        $totalRequired = $tasks->sum(function ($task) use ($user) {
            // نصيب الموظف في المهمة (مثلاً من pivot)
            return $task->pivot->quantity ?? 0;
        });
   // dd($totalRequired);
        // مجموع الكميات المنجزة من جدول التقدم لهذا الموظف
        $totalDone = $tasks->sum(function ($task) {
            // مجموع الانجازات المرتبطة بالموظف في المهمة
            return $task->progress->sum('quantity_done');
        });
    
        // نسبة الإنجاز حسب كمية كل موظف
        $completedTasksPercentage = $totalRequired > 0 ? ($totalDone / $totalRequired) * 100 : 100;
    
        // عدد المهام التي أنجزها الموظف بالكامل (كمية منجزة >= كمية مطلوبه)
        $completedCount = $tasks->filter(function ($task) {
            $required = $task->pivot->quantity ?? 0;
            $done = $task->progress->sum('quantity_done');
            return $done >= $required;
        })->count();
    
        return [
            'totalTasks' => $tasks->count(),
            'completedTasksPercentage' => round($completedTasksPercentage, 2),
            'completedCount' => $completedCount,
        ];
    }
    

    private function calculateScores($user, $completedTasksPercentage, $workingDays, $lateDays , $attDayes)
    {
      
        if($attDayes > 0 ){
            $variable = $user->salary->final_salary - $user->salary->base_salary;
            $score =  ($variable * $completedTasksPercentage) / 100 ;
        }else{
            $score = 0 ;
        }
        
        $lateFees = $user->salary->base_salary * .03;

        return [
            'taskScore' =>$score ,
            'lateScore' =>  $lateFees * $lateDays,
            'lateFees' => $lateFees ,
        ];
    }

    private function getToolAssignments($user, $start, $end)
    {
        $lost = $user->toolassignments()->whereBetween('lost_at', [$start, $end])->get();
        $cost = $lost->sum(fn($item) => $item->tool->estimated_value * $item->quantity);

        return [
            'all' => $user->toolassignments()->with('tool')->get(),
            'lost' => $lost,
            'lostCost' => $cost,
        ];
    }

    private function getFinancials($user, $start, $end)
    {
        $advances = $user->advances->whereBetween('given_at', [$start, $end])->where('status' , 'accepted')->sum('amount');
        $expenses = $user->expenses->whereBetween('given_at', [$start, $end])->sum('amount');
        $deductions = $user->deductions->sum('amount');

        return [
            'advances' => $advances,
            'expenses' => $expenses,
            'deductions' => $deductions,
            'remaining' => $advances - $expenses
        ];
    }

    private function calculateTransportFees($visits)
    {
        return $visits->sum(fn($visit) => $visit->customer->transport_fees ?? 0);
    }

    private function getRewards($userId, $start, $end)
    {
        return Reward::where('user_id', $userId)
            ->whereBetween('reward_date', [$start, $end])
            ->sum('amount');
    }
}
