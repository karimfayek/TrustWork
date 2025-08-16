<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Project;
use App\Models\TaskUser;
use App\Models\Attendance;
use App\Models\Task;

class UserController extends Controller
{
  
    public function dashboard()
    {
        //$projects = Project::withCount('users')->latest()->get();
        $projects = auth()->user()->projects()->withCount('tasks')->withCount('users')->get();
        foreach($projects as $project){
            $project['users'] = $project->users->count() ;
        }
        return Inertia::render('User/Dashboard', [
            'projects' => $projects
        ]);
    }

    public function showProject($id)
    {
    //$this->authorize('view', $project);
    $t = TaskUser::where('project_id' ,$id)->get();
    //dd($t);
    $project = Project::find($id)->load('users');
    $tasks = TaskUser::where('user_id' , auth()->id())->where('project_id' ,$project->id)->with('task')->get();
    
    $tasks->load('task.progress.user');
    $user = auth()->user();
    $attendances = Attendance::where('user_id', $user->id)->where('project_id',$project->id )
        ->whereDate('check_in_time', today())
        ->get()
        ->keyBy('project_id'); // مفتاحه هو project_id لتسهيل الوصول في الواجهة

    return Inertia::render('User/ProjectShow', [
        'project' => $project,
        'tasks' => $tasks,
        'attendances' => $attendances,
    ]);
}



public function reportIssue($id)
{
    //$this->authorize('view', $project);
$project = Task::find($id);
    $tasks = TaskUser::where('user_id' , auth()->id())->where('project_id' ,$project->id)->with('task')->get();
  // dd($tasks[0]->task->title); 
   // $tasks = 

    return Inertia::render('User/ProjectShow', [
        'project' => $project,
        'tasks' => $tasks,
    ]);
}

public function taskComplete($id)
{
    //$this->authorize('view', $project);
$task = Task::find($id);
   $task->is_completed = 1 ;
   $task->completed_at = now();
   $task->save();
   return back();

}
}
