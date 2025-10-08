<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
      $query = Task::with('project');

        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%')
                ->orWhereHas('project', function ($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('project_code', 'like', '%' . $request->search . '%')
                    ->orWhere('customer_name', 'like', '%' . $request->search . '%');
                });
        }

        $tasks = $query->paginate(10)->withQueryString();
        $projects = Project::with('tasks')->get();

        return Inertia::render('Admin/Tasks/Tasks', [
            'tasks' => $tasks,
            'projects' => $projects,
            'filters' => $request->only('search'),
        ]);

    }
    public function indexEmployee()
    {
        $user= auth()->user();
        $tasks = $user->tasks;
        $tasks->load('project' , 'users');

        return Inertia::render('Employee/Tasks/Tasks', [
            'tasks' => $tasks
        ]);
    }

    public function show($id)
    {
    $task = Task::find($id);
    $task->load('progress.user');
    $task['project'] = $task->project;
    $users = User::all();
    $assignedUsers = $task->users()->get(); // if only one user per task

    return Inertia::render('Admin/Tasks/TaskShow', [
        'task' => $task,
        'assignedUsers' => $assignedUsers,
        'users' => $users
    ]);
}
}
