<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\Reward;
use App\Models\User;
use App\Models\Visit;
use Carbon\Carbon;

class EmployeePerformanceService
{
    public function calculate($userId, $from = null, $to = null)
    {

        $startDate = $from ? Carbon::parse($from)->startOfDay() : Carbon::now()->startOfMonth();
        $endDate = $to ? Carbon::parse($to)->endOfDay() : Carbon::now()->endOfMonth();

        $user = User::with(['tasks.progress', 'salary', 'toolassignments.tool'])->findOrFail($userId);

        $workingDays = $this->countWorkingDays($user->offdayestype, $startDate, $endDate);
        // $workingDaysUntilToday = $this->countWorkingDaysUntilToday($user->offdayestype,$startDate, $endDate, $month);
        $attendance = $this->getAttendanceData($userId, $startDate, $endDate);
        $taskData = $this->getTaskData($user, $startDate, $endDate);
        $penaltyScores = $this->calculateScores($user, $taskData['completedTasksPercentage'], $workingDays, $attendance['late_days'], $attendance['present_days']);
        $tools = $this->getToolAssignments($user, $startDate, $endDate);
        $financials = $this->getFinancials($user, $startDate, $endDate);
        $transportFees = $this->calculateTransportFees($attendance['visits']);
        $rewards = $this->getRewards($userId, $startDate, $endDate);
        $loans = $this->getLoans($userId, $startDate, $endDate);

        // dd( $startDate->daysInMonth);
        return [
            'attendance_percentage' => round($attendance['percentage'], 2),
            'deductions' => $financials['deductions'],
            'lateDeductionsTotal' => $financials['lateDeductionsTotal'],
            'basics' => $financials['basics'],
            'rewards' => $rewards,
            'loans' => $loans,
            'visits' => $attendance['visits'],
            'totalAdvance' => $financials['advances'],
            'totalExpense' => $financials['expenses'],
            'remaining' => $financials['remaining'],
            'transportaionFees' => $transportFees,
            'total_days' => $workingDays,
            'late_days' => $attendance['late_days'],
            'att_days' => $attendance['present_days'],
            'month_days' => $startDate->daysInMonth,
            'alltasks' => $taskData['totalTasks'],
            'tasksCompleted' => $taskData['completedCount'],
            'completedTasksPercentage' => $taskData['completedTasksPercentage'],
            'absenceDays' => $user->temporary ? 0 : max(0, $workingDays - $attendance['present_days'] - $attendance['leaves']),
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

    private function countWorkingDays($type, $start, $end)
    {
        // جلب جميع تواريخ الإجازات الرسمية في الفترة
        $holidayDates = \App\Models\Holiday::whereBetween('date', [$start->toDateString(), $end->toDateString()])
            ->pluck('date')
            ->map(fn($d) => Carbon::parse($d)->toDateString())
            ->toArray();

        $days = 0;

        for ($date = $start->copy(); $date->lte($end); $date->addDay()) {
            $dayOfWeek = $date->dayOfWeek;      // رقم اليوم (0=Sunday .. 6=Saturday)
            $dayString = $date->toDateString(); // YYYY-MM-DD

            // استثناء أيام العطلة الأسبوعية
            if ($type == 1 && $dayOfWeek === Carbon::FRIDAY) {
                continue;
            }
            if ($type != 1 && in_array($dayOfWeek, [Carbon::FRIDAY, Carbon::SATURDAY])) {
                continue;
            }

            // استثناء الإجازات الرسمية
            if (in_array($dayString, $holidayDates)) {
                continue;
            }

            // يوم عمل فعلي
            $days++;
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

    public function getAttendanceData($userId, $start, $today)
    {
        $user = User::find($userId);
        $holidayDates = \App\Models\Holiday::whereBetween('date', [$start->toDateString(), $today->toDateString()])
            ->pluck('date')
            ->map(fn($d) => Carbon::parse($d)->toDateString())
            ->toArray();

        $offDays = [];

        if ($user->offdayestype == '1') {
            $offDays = ['Friday'];
        } elseif ($user->offdayestype == '2') {
            $offDays = ['Friday', 'Saturday'];
        } elseif ($user->offdayestype == '3') {
            $offDays = ['Friday', 'Thursday'];
        }

        $attendanceDays = Attendance::where('user_id', $userId)
            ->whereDate('check_in_time', '>=', $start)
            ->whereDate('check_in_time', '<=', $today)
            ->get()
            ->groupBy(function ($attendance) {
                return \Carbon\Carbon::parse($attendance->check_in_time)->toDateString(); // Group by date
            })
            ->filter(function ($attendancesOnDay) use ($offDays, $holidayDates) {
                $date = \Carbon\Carbon::parse($attendancesOnDay->first()->check_in_time)->toDateString();
                $dayName = \Carbon\Carbon::parse($attendancesOnDay->first()->check_in_time)->format('l');

                // ✅ استبعاد إذا كان يوم عطلة أسبوعية أو إجازة رسمية
                return !in_array($dayName, $offDays) && !in_array($date, $holidayDates);
            })
            ->count();
        $leaves = $user->leaves()->where('status', 'approved')->count();
        //dd($start->toDateString(), $today->toDateString());
        $lateAttendancesQ = Attendance::with(['project', 'visit.customer'])->where('user_id', $userId)
            ->whereBetween('check_in_time', [$start->toDateString(), $today->toDateString() . ' 23:59:59'])
            ->where('is_late', 1)
            ->get()
            ->groupBy(function ($attendance) {
                return \Carbon\Carbon::parse($attendance->check_in_time)->toDateString(); // Group by date
            })
            ->filter(function ($attendancesOnDay) use ($offDays, $holidayDates) {
                $date = \Carbon\Carbon::parse($attendancesOnDay->first()->check_in_time)->toDateString();
                $dayName = \Carbon\Carbon::parse($attendancesOnDay->first()->check_in_time)->format('l');

                // ✅ استبعاد إذا كان يوم عطلة أسبوعية أو إجازة رسمية
                return !in_array($dayName, $offDays) && !in_array($date, $holidayDates);
            });
        //dd($lateAttendancesQ);
        $lateAttendances = $lateAttendancesQ->count();


        $visits = Visit::where('user_id', $userId)
            ->whereBetween('created_at', [$start, $today])
            ->get();

        // dd($visits);
        return [
            'present_days' => $attendanceDays,
            'late_days' => $lateAttendances,
            'leaves' => $leaves,
            'percentage' => ($attendanceDays) / max(1, $this->countWorkingDays($user->offdayestype, $start, $today)) * 100,
            'visits' => $visits,
            'lateAttendancesGet' => $lateAttendancesQ,
        ];
    }

    private function getTaskData(User $user, $start, $end)
    {
        // جلب المهام المرتبطة بالموظف في الفترة المحددة، مع كمية نصيبه في المهمة
        $tasks = $user->tasks()
            ->whereBetween('tasks.end_date', [$start, $end])
            ->with([
                'progress' => function ($query) use ($user) {
                    // جلب تقدم هذا الموظف فقط (إنجازاته في المهمة)
                    $query->where('user_id', $user->id);
                }
            ])
            ->get();

        // مجموع الكميات المطلوبة لهذا الموظف فقط (من pivot)
        $totalRequired = $tasks->sum(function ($task) {
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

    private function calculateScores($user, $completedTasksPercentage, $workingDays, $lateDays, $attDayes)
    {

        if ($attDayes > 0) {
            $variable = $user->salary->final_salary - $user->salary->base_salary;
            $score = ($variable * $completedTasksPercentage) / 100;
        } else {
            $score = 0;
        }

        $lateFees = $user->salary->base_salary * .03;

        return [
            'taskScore' => $score,
            'lateScore' => $lateFees * $lateDays,
            'lateFees' => $lateFees,
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
        $advances = $user->advances->whereBetween('given_at', [$start, $end])->where('status', 'accepted')->sum('amount');
        $expenses = $user->expenses->whereBetween('spent_at', [$start, $end])->sum('amount');
        $basics = $user->deductions->where('type', 'basic')->sum('amount');
        $deductions = $user->deductions->whereBetween('deducted_at', [$start, $end])->where('type', 'deduction')->sum('amount');
        $lateAttendances = $user->attendances()
            ->whereBetween('check_in_time', [$start, $end])
            ->where('is_late', 1)
            ->whereNotNull('late_deduct_type')
            ->get();
        $salary = $user->salary->final_salary;
        $dayValue = $salary / 30;
        $lateDeductionsTotal = 0;

        foreach ($lateAttendances as $attendance) {
            switch ($attendance->late_deduct_type) {
                case 1: // ربع يوم
                    $lateDeductionsTotal += $dayValue / 4;
                    break;

                case 2: // نصف يوم
                    $lateDeductionsTotal += $dayValue / 2;
                    break;

                case 3: // يوم كامل
                    $lateDeductionsTotal += $dayValue;
                    break;
            }
        }
        // dd($expenses);
        return [
            'advances' => $advances,
            'expenses' => $expenses,
            'deductions' => $deductions + $lateDeductionsTotal,
            'lateDeductionsTotal' => $lateDeductionsTotal,
            'basics' => $basics,
            'remaining' => $advances - $expenses,
        ];
    }

    private function calculateTransportFees($visits)
    {
        // dd($visits);
        return $visits->sum(fn($visit) => $visit->customer->transport_fees ?? 0);
    }

    private function getRewards($userId, $start, $end)
    {
        return Reward::where('user_id', $userId)
            ->where(function ($q) {
                $q->where('type', '=', 'spent');
            })
            ->whereBetween('reward_date', [$start, $end])
            ->sum('amount');
    }

    private function getLoans($userId, $start, $end)
    {
        return \App\Models\Loan::where('employee_id', $userId)
            ->where(function ($q) {
                $q->where('status', 'paid');
            })
            ->whereBetween('loan_date', [$start, $end])
            ->sum('amount');
    }
}
