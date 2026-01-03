<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\Visit;
use App\Models\Project;
use App\Models\User;
use App\Models\Holiday;

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
        $userId = auth()->user()->id;
        $atts = Attendance::where('user_id', $userId)->get()->load('project', 'visit', 'visit.customer');
        return Inertia::render('Employee/Att/Index', [
            'customers' => $customers,
            'projects' => $projects,
            'userId' => $userId,
            'atts' => $atts,
        ]);
    }
    public function attList($user = null)
    {
        if ($user == null) {
            $atts = Attendance::with([
                'user:id,name',
                'project:id,name',
                'visit:id,customer_id',
                'visit.customer:id,name'
            ])
                ->select('check_in_time', 'check_out_time', 'id', 'type', 'visit_id', 'project_id', 'customer', 'user_id', 'out_location')
                ->latest()
                ->limit(100)
                ->get();

        } else {

            $atts = Attendance::where('user_id', $user)->get()->load('user', 'project', 'visit', 'visit.customer');
        }
        $role = auth()->user()->role;

        $currentUserRoles = auth()->user()->roles->pluck('name')->toArray();
        if (array_intersect($currentUserRoles, ['admin', 'acc', 'hr'])) {

            //dd( $currentUserRoles );
            $users = User::where('status', 1)->select('id', 'name')->get();

        } else {
            $users = User::where('status', 1)->whereHas('roles', function ($query) {
                $query->where('name', 'employee');
            })->select('id', 'name')->get();

        }

        $customers = \App\Models\Customer::select('id', 'name')->get();
        $projects = Project::all();
        return Inertia::render('User/AttList', [
            'atts' => $atts,
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

        // جلب تواريخ الإجازات الرسمية في الفترة
        $holidayDates = Holiday::whereBetween('date', [$from->toDateString(), $to->toDateString()])
            ->pluck('date')
            ->map(fn($d) => Carbon::parse($d)->toDateString())
            ->toArray();

        if ($request->user_id !== null) {
            $user = User::findOrFail($request->user_id);

            foreach ($period as $current) {
                $attendances = Attendance::whereDate('check_in_time', $current)
                    ->where('user_id', $user->id)
                    ->with(['project', 'visit.customer', 'user'])
                    ->get();

                if ($attendances->isEmpty()) {
                    $dayName = $current->format('l'); // 'Friday', 'Saturday', ...

                    // حدد أيام العطلة بناء على نوع الموظف
                    $offDays = [];
                    if ($user->offdayestype == '1') {
                        $offDays = ['Friday'];
                    } elseif ($user->offdayestype == '2') {
                        $offDays = ['Friday', 'Saturday'];
                    } elseif ($user->offdayestype == '3') {
                        $offDays = ['Friday', 'Thursday'];
                    }

                    // تحقق هل هذا اليوم إجازة معتمدة من جدول leaves
                    $hasLeave = \App\Models\Leave::where('user_id', $user->id)
                        ->where('status', 'approved')
                        ->whereDate('leave_date', $current->toDateString())
                        ->first();

                    // تحقق هل اليوم إجازة رسمية
                    if (in_array($current->toDateString(), $holidayDates)) {
                        $report->push([
                            'date' => $current->toDateString(),
                            'type' => 'holiday',
                            'name' => 'إجازة رسمية',
                            'check_in' => null,
                            'check_out' => null,
                            'user_name' => $user->name,
                        ]);
                    } elseif ($hasLeave) {
                        $leaveName = $hasLeave->type === 'regular' ? 'إجازة اعتيادية' : 'إجازة عارضة';
                        $report->push([
                            'date' => $current->toDateString(),
                            'type' => 'leave',
                            'name' => $leaveName,
                            'check_in' => null,
                            'check_out' => null,
                            'user_name' => $user->name,
                        ]);
                    } elseif (in_array($dayName, $offDays)) {
                        // اليوم إجازة أسبوعية
                        $report->push([
                            'date' => $current->toDateString(),
                            'type' => 'off',
                            'name' => 'إجازة أسبوعية',
                            'check_in' => null,
                            'check_out' => null,
                            'user_name' => $user->name,
                        ]);
                    } else {
                        // غياب
                        $report->push([
                            'date' => $current->toDateString(),
                            'type' => 'absent',
                            'name' => 'غياب',
                            'check_in' => null,
                            'check_out' => null,
                            'user_name' => $user->name,
                        ]);
                    }
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
            $users = User::where('status', 1)->get();

            foreach ($period as $current) {
                foreach ($users as $u) {
                    $attendances = Attendance::whereDate('check_in_time', $current)
                        ->where('user_id', $u->id)
                        ->with(['project', 'visit.customer', 'user'])
                        ->get();

                    if ($attendances->isEmpty()) {
                        $dayName = $current->format('l'); // 'Friday', 'Saturday', ...

                        // حدد أيام العطلة بناء على نوع الموظف
                        $offDays = [];
                        if ($u->offdayestype == '1') {
                            $offDays = ['Friday'];
                        } elseif ($u->offdayestype == '2') {
                            $offDays = ['Friday', 'Saturday'];
                        } elseif ($u->offdayestype == '3') {
                            $offDays = ['Friday', 'Thursday'];
                        }

                        // تحقق هل هذا اليوم إجازة معتمدة من جدول leaves
                        $hasLeave = \App\Models\Leave::where('user_id', $u->id)
                            ->where('status', 'approved')
                            ->whereDate('leave_date', $current->toDateString())
                            ->first();


                        if ($hasLeave) {
                            $leaveName = $hasLeave->type === 'regular' ? 'إجازة اعتيادية' : 'إجازة عارضة';
                            $report->push([
                                'date' => $current->toDateString(),
                                'type' => 'leave',
                                'name' => $leaveName,
                                'check_in' => null,
                                'check_out' => null,
                                'user_name' => $u->name,
                            ]);
                        } elseif (in_array($dayName, $offDays)) {
                            // اليوم إجازة أسبوعية
                            $report->push([
                                'date' => $current->toDateString(),
                                'type' => 'off',
                                'name' => 'إجازة أسبوعية',
                                'check_in' => null,
                                'check_out' => null,
                                'user_name' => $u->name,
                            ]);
                        } else {
                            // غياب
                            $report->push([
                                'date' => $current->toDateString(),
                                'type' => 'absent',
                                'name' => 'غياب',
                                'check_in' => null,
                                'check_out' => null,
                                'user_name' => $u->name,
                            ]);
                        }
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
    public function manualCheckIn(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'check_in_time' => 'nullable|date',
        ]);
        $user = $request->user_id;

        $currentUserRoles = auth()->user()->roles->pluck('name')->toArray();
        //dd($role);
        if (!array_intersect($currentUserRoles, ['admin', 'acc', 'hr'])) {
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
        if ($inOut === 'in') {
            if ($request->check_in_time == null) {
                $date = now();
                $time = now();
            } else {
                $date = Carbon::parse($request->check_in_time)->toDateString();
                $time = $request->check_in_time;
            }
            $existing = Attendance::whereDate('check_in_time', $date)
                ->where('user_id', $user)
                ->where('type', $type)
                ->first();

            if ($existing) {
                //dd($existing);
                return back()->with('message', 'تم تسجيل حضورك مسبقًا اليوم.');
            }
            if ($type === 'visit') {
                $visit = Visit::create([
                    'user_id' => $user,
                    'customer_id' => $request->customer_id,
                    'is_late' => now()->hour >= 9,
                ]);
                $visit_id = $visit->id;
                $project = null;
            } else {
                $visit_id = null;
            }
            Attendance::create([
                'user_id' => $user,
                'project_id' => $project,
                'visit_id' => $visit_id,
                'customer' => $customer,
                'type' => $type,
                'check_in_time' => $time,
                'in_location' => $request->input('location', 'غير محدد'),
                'is_late' => now()->hour >= 9, // تعتبر متأخر بعد الساعة 9 صباحًا
            ]);
            return back()->with('message', 'تم تسجيل الحضور بنجاح.');
        } elseif ($inOut === 'out') {
            if ($request->check_out_time == null) {
                $date = now();
                $time = now();
            } else {

                $date = Carbon::parse($request->check_out_time)->toDateString();
                $time = $request->check_out_time;
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
    public function checkOut(Request $request, Project $project)
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

    public function calculateAttendancePercentage(Request $request, $userId)
    {

        $from = $request->query('from');
        $to = $request->query('to');

        $service = new EmployeePerformanceService();
        $data = $service->calculate($userId, $from, $to);

        return response()->json($data);
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

