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
    public function index()
    {
        $tasks = Task::with('project')->with('users')->get();
        $projects = Project::with('tasks')->get();

        return Inertia::render('Admin/Tasks/Tasks', [
            'tasks' => $tasks,
            'projects' => $projects,
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
