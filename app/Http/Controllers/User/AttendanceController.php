<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\Visit;
use App\Models\Project;
use App\Models\User;

use Inertia\Inertia;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\DB;
use App\Services\EmployeePerformanceService;
class AttendanceController extends Controller
{
    
    public function employeeAtt()
    {
        $customers = \App\Models\Customer::all(); 
        $projects = Project::all();
        $userId = auth()->user()->id ;
        $atts = Attendance::where('user_id', $userId)->get()->load('project', 'visit','visit.customer');
        return Inertia::render('Employee/Att/Index',[
            'customers' => $customers ,
            'projects' => $projects ,
            'userId' => $userId ,
            'atts' => $atts ,
        ]);
    }
    public function attList($user=null)
    {
        if($user == null){
            $atts = Attendance::with('user' , 'project')->get()->load('user', 'project', 'visit' ,'visit.customer');
            $visits = Visit::all()->load('user', 'customer'); 
        }else{

            $atts = Attendance::where('user_id', $user)->get()->load('user', 'project', 'visit','visit.customer');
            $visits = Visit::where('user_id', $user)->get()->load('user', 'customer');
        }
        $role = auth()->user()->role ;
        //dd($role);
        if($role === 'proj'){
            $users = User::where('role' , 'employee')->get(); 
        }else{

            $users = User::all();
        }
        $customers = \App\Models\Customer::all(); 
        $projects = Project::all();
        return Inertia::render('User/AttList', [
            'atts' => $atts,
            'visits' => $visits,
            'users' => $users,
            'projects' => $projects,
            'customers' => $customers,
        ]);
    }
    public function attFilter(Request $request)
    {
        $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'from' => 'required|date',
            'to' => 'required|date|after_or_equal:from',
        ]);
    
        $from = Carbon::parse($request->from)->startOfDay();
        $to = Carbon::parse($request->to)->endOfDay();
    
        $report = collect();
        $period = CarbonPeriod::create($from, $to);
    
        if ($request->user_id !== null) {
            // حالة: مستخدم محدد
            $user = User::findOrFail($request->user_id);
    
            foreach ($period as $current) {
                $attendances = Attendance::whereDate('check_in_time', $current)
                    ->where('user_id', $user->id)
                    ->with(['project', 'visit.customer', 'user']) // تحميل العلاقات دفعة واحدة
                    ->get();
    
                if ($attendances->isEmpty()) {
                    $report->push([
                        'date' => $current->toDateString(),
                        'type' => 'absent',
                        'name' => 'غياب',
                        'check_in' => null,
                        'check_out' => null,
                        'user_name' => $user->name,
                    ]);
                } else {
                    foreach ($attendances as $att) {
                        $name = 'غير معروف';
                        if ($att->project_id !== null) {
                            $name = $att->project->name;
                        } elseif ($att->visit_id !== null) {
                            $name = $att->visit->customer->name ?? 'زيارة';
                        } elseif ($att->type === 'internal') {
                            $name = 'Trust';
                        } elseif ($att->type === 'external') {
                            $name = $att->customer;
                        }
    
                        $report->push([
                            'date' => $current->toDateString(),
                            'type' => $att->type,
                            'name' => $name,
                            'check_in' => $att->check_in_time,
                            'check_out' => $att->check_out_time,
                            'user_name' => $att->user->name,
                        ]);
                    }
                }
            }
    
        } else {
            // حالة: كل المستخدمين
            $users = User::all();
    
            foreach ($period as $current) {
                foreach ($users as $u) {
                    $attendances = Attendance::whereDate('check_in_time', $current)
                        ->where('user_id', $u->id)
                        ->with(['project', 'visit.customer', 'user'])
                        ->get();
    
                    if ($attendances->isEmpty()) {
                        $report->push([
                            'date' => $current->toDateString(),
                            'type' => 'absent',
                            'name' => 'غياب',
                            'check_in' => null,
                            'check_out' => null,
                            'user_name' => $u->name,
                        ]);
                    } else {
                        foreach ($attendances as $att) {
                            $name = 'غير معروف';
                            if ($att->project_id !== null) {
                                $name = $att->project->name;
                            } elseif ($att->visit_id !== null) {
                                $name = $att->visit->customer->name ?? 'زيارة';
                            } elseif ($att->type === 'internal') {
                                $name = 'Trust';
                            } elseif ($att->type === 'external') {
                                $name = $att->customer;
                            }
    
                            $report->push([
                                'date' => $current->toDateString(),
                                'type' => $att->type,
                                'name' => $name,
                                'check_in' => $att->check_in_time,
                                'check_out' => $att->check_out_time,
                                'user_name' => $att->user->name,
                            ]);
                        }
                    }
                }
            }
        }
    
        return Inertia::render('User/ReportView', [
            'report' => $report,
            'user' => $request->user_id !== null ? $user : null,
            'from' => $request->from,
            'to' => $request->to,
        ]);
    }
    
    public function attFilterss(Request $request)
    {
        $from = Carbon::parse($request->from)->startOfDay(); // 00:00:00
        $to = Carbon::parse($request->to)->endOfDay();    
        $userId = $request->input('user_id');
        $users = User::all();

        //atts
        $atts = Attendance::query()
        ->when($userId, fn($q) => $q->where('user_id', $userId))
        ->when($from && $to, fn($q) => $q->whereBetween('check_in_time', [$from, $to]))
        ->with(['user', 'project'])
        ->get();
          // dd($atts);
        //visits
        $visits = Visit::query()
        ->when($userId, fn($q) => $q->where('user_id', $userId))
        ->when($from && $to, fn($q) => $q->whereBetween('check_in', [$from, $to]))
        ->with(['user', 'customer'])
        ->get();
        return Inertia::render('User/AttList', [
            'atts' => $atts,
            'visits' => $visits,
            'users' => $users,
            'filters' => [
                'user_id' => $userId,
                'from' => $from,
                'to' => $to,
            ],
        ]);
    }
    public function checkIn(Request $request, Project $project)
    {
        //dd($request->all());
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
    public function manualCheckIn(Request $request )
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'check_in_time' => 'nullable|date',
        ]);
         $user = $request->user_id;
         
         $role = User::find($user)->role ;
        // dd($role);
        if($role === 'admin' ){
            $request->validate([
                'location' => 'required',
            ]); 
        }
         $project = $request->project;
         $customer_id = $request->customer_id;
         $inOut = $request->inOut;
         $type = $request->input("type");
         $customer = $request->input('customer') ?? null;
       // dd($request->all());
        // Check if already checked in today
        if($inOut === 'in'){
            if($request->check_in_time == null){
                $date = now();
                $time = now();
            }else{
                $date = Carbon::parse($request->check_in_time)->toDateString();
           $time =$request->check_in_time ;
            }
            $existing = Attendance::whereDate('check_in_time', $date)
                        ->where('user_id', $user)
                        ->where('type', $type)
                        ->first();
        
            if ($existing) {
                //dd($existing);
                return back()->with('message', 'تم تسجيل حضورك مسبقًا اليوم.');
            }
            if($type === 'visit'){
                $visit = Visit::create([
                    'user_id' => $user,
                    'customer_id' => $request->customer_id,
                    'is_late' =>  now()->hour >= 9,
                ]);
                $visit_id = $visit->id ; 
                $project = null ;
            }else{
               $visit_id = null ;
            }
            Attendance::create([
                'user_id' => $user,
                'project_id' => $project,
                'visit_id' => $visit_id,
                'customer' => $customer,
                'type' => $type,
                'check_in_time' =>  $time,
                'in_location' => $request->input('location', 'غير محدد'),
                'is_late' => now()->hour >= 9, // تعتبر متأخر بعد الساعة 9 صباحًا
            ]);
            return back()->with('message', 'تم تسجيل الحضور بنجاح.');
        }elseif($inOut === 'out'){
            if($request->check_out_time == null){
                $date = now();                
                $time = now();
            }else{

                $date = Carbon::parse($request->check_out_time)->toDateString();
           $time =$request->check_out_time;
            }
            $attendance = Attendance::where('user_id', $user)
            ->where('type', $type)
            ->whereDate('check_in_time', $date)
            ->whereNull('check_out_time')
            ->first();

        if (!$attendance) {
            return back()->withErrors(['message' => 'لم يتم تسجيل الحضور أولاً.']);
        }

        $attendance->update([
            'check_out_time' => $time,        
            'out_location' => $request->input('location', 'غير محدد'),
        ]);
        return back()->with('message', 'تم تسجيل الانصراف بنجاح.');
        }
    
       
    }
    public function checkOut(Request $request,Project $project)
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

public function calculateAttendancePercentageUntillToday($userId, $month=null)
{
    

    $service = new EmployeePerformanceService();
    $data = $service->calculate($userId, $month);
//dd($data);
    return response()->json($data);
 
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

public function delete(Request $request)
{
   // dd($request->all());
    $att = Attendance::find($request->id);
  $att->delete();
}
}

