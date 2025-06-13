<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\User as Employee;
use App\Models\Project ; 

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index');
    }

    public function employeeReport()
    {
        $employees = Employee::where('role' , 'employee')
        ->with(['activeProjects.tasks.progress', 'endedProjects.tasks.progress',  'attendances' ])
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

    public function summarizeProjectForEmployee($project, $employeeId) {

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
            'user_tasks' => $userTasks,
            'completed_user_tasks' => $completed->count(),
        ];
    }

    
    public function projectsReport()
    {
        $projects = Project::all()->load('tasks' , 'users' , 'tasks.users' ,'tasks.progress.user');
        foreach($projects as $project){
            foreach($project->tasks as $task){
                $task['quantity_done'] = $task->progress->sum('quantity_done') ;
            }
            
        }
//dd($projects);
        return Inertia::render('Reports/ProjectsReport', [
            //dd($employees[0]->active_projects),
            'projects' => $projects,
        ]);
    }
}
