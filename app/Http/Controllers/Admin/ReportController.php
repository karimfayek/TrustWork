<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Attendance;
use App\Models\Visit;
use App\Models\User as Employee;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

use App\Models\Tool;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index');
    }

    public function attReport($user = null)
    {
        if ($user == null) {
            $atts = Attendance::all()->load('user', 'project');
            $visits = Visit::all()->load('user', 'customer');
        } else {

            $atts = Attendance::where('user_id', $user)->get()->load('user', 'project');
            $visits = Visit::where('user_id', $user)->get()->load('user', 'customer');
        }
        $users = Employee::where('role', 'employee')->where('status', 1)->get();
        $projects = Project::all();
        return Inertia::render('Reports/Att/AttReport', [
            'atts' => $atts,
            'visits' => $visits,
            'users' => $users,
            'projects' => $projects,
        ]);
    }
    public function employeeReport()
    {
        $employees = Employee::where('role', 'employee')->where('status', 1)
            ->with(['activeProjects.tasks.progress', 'endedProjects.tasks.progress', 'attendances'])
            ->get()
            ->map(function ($employee) {
                $employee->active = $employee->activeProjects->map(function ($project) use ($employee) {
                    return $this->summarizeProjectForEmployee($project, $employee->id);
                });

                $employee->ended = $employee->endedProjects->map(function ($project) use ($employee) {
                    return $this->summarizeProjectForEmployee($project, $employee->id);
                });


                return $employee;
            });


        //dd($employees[0]->active);
        return Inertia::render('Reports/EmployeeReport', [
            //dd($employees[0]->active_projects),
            'employees' => $employees,
        ]);
    }

    public function summarizeProjectForEmployee($project, $employeeId)
    {

        $allTasks = $project->tasks;
        $userTaskss = $allTasks->filter(function ($task) use ($employeeId) {
            return $task->users->pluck('id')->contains($employeeId);
        });
        //dd($userTaskss);
        $completed = $userTaskss->filter(function ($task) use ($employeeId) {
            $totalDone = $task->progress->where('user_id', $employeeId)->sum('quantity_done');
            $assignedQty = optional($task->users->firstWhere('id', $employeeId)->pivot)->quantity ?? 0;

            return $totalDone >= $assignedQty && $assignedQty > 0;
        });

        $userTasks = $allTasks->filter(function ($task) use ($employeeId) {
            return $task->users->pluck('id')->contains($employeeId);
        })->map(function ($task) use ($employeeId) {
            $quantity_done_by_employee = $task->progress
                ->where('user_id', $employeeId)
                ->sum('quantity_done');

            return [
                'id' => $task->id,
                'title' => $task->title,
                'quantity' => $task->quantity,
                'start_date' => $task->start_date,
                'end_date' => $task->end_date,
                'unit' => $task->unit,
                'done_by_employee' => $quantity_done_by_employee,
            ];
        });

        return [
            'id' => $project->id,
            'name' => $project->name,
            'start_date' => $project->start_date,
            'end_date' => $project->end_date,
            'total_project_tasks' => $allTasks->count(),
            'user_tasks' => array_values($userTasks->all()),
            'completed_user_tasks' => $completed->count(),
        ];
    }


    public function projectsReport()
    {
        $projects = Project::all()->load('tasks', 'users', 'tasks.users', 'tasks.progress.user');
        foreach ($projects as $project) {
            foreach ($project->tasks as $task) {
                //dd($task);
                $task['quantity_done'] = $task->progress->sum('quantity_done');
            }
            // dd($project->total_meter_done);
            $project['meter_done'] = $project->total_meter_done;
            $project['total_meters'] = $project->total_meters;
            $project['number_done'] = $project->total_number_done;
            $project['ls_done'] = $project->total_ls_done;
            $project['total_done'] = $project->total_done;
            $project['total_quantity'] = $project->total_quantity;
        }
        //dd($projects);
        return Inertia::render('Reports/ProjectsReport', [
            //dd($employees[0]->active_projects),
            'projects' => $projects->toArray(),
        ]);
    }
    public function projectsReport2()
    {
        $projects = Project::all()->load('tasks', 'users', 'tasks.users', 'tasks.progress.user');
        foreach ($projects as $project) {
            foreach ($project->tasks as $task) {
                //dd($task);
                $task['quantity_done'] = $task->progress->sum('quantity_done');
            }
            // dd($project->total_meter_done);
            $project['meter_done'] = $project->total_meter_done;
            $project['total_meters'] = $project->total_meters;
            $project['number_done'] = $project->total_number_done;
            $project['ls_done'] = $project->total_ls_done;
            $project['total_numbers'] = $project->total_numbers;
            $project['total_ls'] = $project->total_ls;
            $project['total_done'] = $project->total_done;
            $project['total_quantity'] = $project->total_quantity;
        }
        //dd($projects);
        return Inertia::render('Reports/ProjectsReport2', [
            //dd($employees[0]->active_projects),
            'projects' => $projects->toArray(),
        ]);
    }
    public function insuranceRefundsReport()
    {
        $projects = Project::whereHas('extractions', function ($q) {
            $q->where('type', 'final'); // المستخلصات الختامية
        })->with([
                    'extractions' => function ($q) {
                        $q->where('type', 'final')->latest();
                    }
                ])->get();

        $report = $projects->map(function ($project) {
            $final = $project->extractions->first(); // المستخلص الختامي الأحدث

            return [
                'project_name' => $project->name,
                'final_invoice_number' => $final->number,
                'final_invoice_date' => $final->date,
                'insurance_value' => ($final->total / 100) * $final->deductions_json['initial_insurance'], // خصم تأمين الأعمال
                'due_date' => \Carbon\Carbon::parse($final->date)->addYear()->toDateString(),
            ];
        });

        return Inertia::render('Reports/Project/InsuranceRefunds', [
            'reports' => $report,
        ]);
    }



    public function salariesReport()
    {
        $users = Employee::where('role', 'employee')->where('status', 1)->get()->load('salary', 'advances', 'activeProjects');
        foreach ($users as $user) {
            $acceptedAdvances = $user->advances()->where('status', 'accepted')->get()->load('project');
            $user['acceptedAdvances'] = $acceptedAdvances;
            $user['pendingAdvances'] = $user->advances()->where('status', 'pending')->get()->load('project');
            $expenses = $user->expenses()->select('amount', 'description', 'spent_at')->get();
            $user['expenses'] = $expenses;
            $user['deductions'] = $user->deductions()->select('amount', 'type', 'deducted_at', 'note')->get();
            $totalAdvance = $acceptedAdvances->sum('amount');
            $user['totalAdvance'] = $totalAdvance;
            $totalExpense = $expenses->sum('amount');
            $user['totalExpense'] = $totalExpense;
            $user['remaining'] = $totalAdvance - $totalExpense;
        }

        // $project = Project::with('tasks' , 'tasks.users', 'users')->find($id);

        // $userIds = $project->users->pluck('id');
        return Inertia::render('Reports/Salaries/SalaryReport', [
            'users' => $users,
        ]);

    }
    public function salariesReportAll()
    {
        $users = Employee::where('status', 1)->where('temporary', 0)->get()->load('salary', 'advances', 'activeProjects');
        foreach ($users as $user) {
            $acceptedAdvances = $user->advances()->where('status', 'accepted')->get()->load('project');
            $user['acceptedAdvances'] = $acceptedAdvances;
            $user['pendingAdvances'] = $user->advances()->where('status', 'pending')->get()->load('project');
            $expenses = $user->expenses()->select('amount', 'description', 'spent_at')->get();
            $user['expenses'] = $expenses;
            $user['deductions'] = $user->deductions()->select('amount', 'type', 'deducted_at', 'note')->get();
            $totalAdvance = $acceptedAdvances->sum('amount');
            $user['totalAdvance'] = $totalAdvance;
            $totalExpense = $expenses->sum('amount');
            $user['totalExpense'] = $totalExpense;
            $user['remaining'] = $totalAdvance - $totalExpense;
        }

        // $project = Project::with('tasks' , 'tasks.users', 'users')->find($id);

        // $userIds = $project->users->pluck('id');
        return Inertia::render('Reports/Salaries/SalaryReportAll', [
            'users' => $users,
        ]);

    }
    public function salariesReportTemporary()
    {
        $users = Employee::where('status', 1)->where('temporary', 1)->get()->load('salary', 'advances', 'activeProjects');
        foreach ($users as $user) {
            $acceptedAdvances = $user->advances()->where('status', 'accepted')->get()->load('project');
            $user['acceptedAdvances'] = $acceptedAdvances;
            $user['pendingAdvances'] = $user->advances()->where('status', 'pending')->get()->load('project');
            $expenses = $user->expenses()->select('amount', 'description', 'spent_at')->get();
            $user['expenses'] = $expenses;
            $user['deductions'] = $user->deductions()->select('amount', 'type', 'deducted_at', 'note')->get();
            $totalAdvance = $acceptedAdvances->sum('amount');
            $user['totalAdvance'] = $totalAdvance;
            $totalExpense = $expenses->sum('amount');
            $user['totalExpense'] = $totalExpense;
            $user['remaining'] = $totalAdvance - $totalExpense;
        }

        // $project = Project::with('tasks' , 'tasks.users', 'users')->find($id);

        // $userIds = $project->users->pluck('id');
        return Inertia::render('Reports/Salaries/SalaryReportTemp', [
            'users' => $users,
        ]);

    }
    public function toolsReport()
    {

        $tools = Tool::all();
        $users = Employee::where('role', 'employee')->where('status', 1)->get();
        $assignments = \App\Models\ToolAssignment::with(['tool', 'user'])->get();

        return Inertia::render('Reports/Tools/ToolsReport', [
            'tools' => $tools,
            'users' => $users,
            'assignments' => $assignments,
        ]);
    }
    public function financeReport()
    {
        $users = Employee::where('role', 'employee')->where('status', 1)->get()->load('advances', 'expenses', 'deductions', 'advances.project', 'advances.user', 'expenses.user', 'expenses.by', 'expenses.advance', 'expenses.advance.project');
        $projects = Project::all()->load('tasks', 'users', 'tasks.users', 'tasks.progress.user', 'advances', 'advances.project', 'advances.user', 'advances.expenses', 'advances.expenses.user', 'advances.expenses.by', 'advances.expenses.advance', 'advances.expenses.advance.project');
        foreach ($projects as $project) {
            foreach ($project->tasks as $task) {
                $task['quantity_done'] = $task->progress->sum('quantity_done');
            }

        }
        //dd($projects);
        return Inertia::render('Reports/Financial/FinancialReport', [
            //dd($employees[0]->active_projects),
            'users' => $users->toArray(),
            'projects' => $projects->toArray(),
        ]);
    }
    public function custodiesReport()
    {
        //load total advances and expenses
        $employees = Employee::where('status', 1)->get()->load('advances', 'advances.expenses', 'expenses', 'deductions', 'advances.project', 'advances.user', 'expenses.by', 'expenses.advance', 'expenses.advance.project');
        foreach ($employees as $employee) {
            $employee['total_advances'] = $employee->totalAdvances();
            $employee['total_expenses'] = $employee->totalExpenses();
            $employee['total_deductions'] = $employee->totalDeductions();
        }
        $totalExpenses = \App\Models\Expense::where('asa', 'expense')->sum('amount');
        //open custodies count (advances where its expenses->sum('amount') < advances->amount)

        /* $openCustodiesCount = \App\Models\Advance::withSum('expenses', 'amount')
           ->whereRaw('COALESCE(expenses_sum_amount, 0) < amount')
           ->count(); */
        $openCustodies = \App\Models\Advance::where(
            'amount',
            '>',
            function ($q) {
                $q->select(DB::raw('COALESCE(SUM(expenses.amount), 0)'))
                    ->from('expenses')
                    ->whereColumn('expenses.advance_id', 'advances.id');
            }
        )->get();
        $totalAdvances = \App\Models\Advance::where('status', 'accepted')->sum('amount');

        //  dd($openCustodies);
        return Inertia::render('Reports/Financial/EmployeeCustody', [
            'employees' => $employees,
            'totalExpenses' => $totalExpenses,
            'openCustodiesCount' => $openCustodies->count(),
            'openCustodies' => $openCustodies->load('user', 'project', 'expenses', 'user.advances', 'user.expenses', 'user.deductions'),
            'totalAdvances' => $totalAdvances,
        ]);
    }

}
