<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\TaskProgress;
use Illuminate\Http\Request;

class TaskProgressController extends Controller
{
    public function store(Request $request)
    {
       //dd($request->all());
        $data = $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'quantity_done' => 'required|integer|min:1',
        ]);

        $task = Task::findOrFail($data['task_id']);
       if($task->unit === 'collaborative'){
           foreach($task->users as $user){
               $progress = TaskProgress::create([
               'task_id' => $task->id,
               'user_id' => $user->id,
               'date' => now()->toDateString(),
               'quantity_done' => $data['quantity_done'],
                ]);
           }
            return back()->with([
            'message'=> 'تم   بنجاح.',
            'type' => 'success'
            ]);
       }
        // حفظ التقدم
        $progress = TaskProgress::create([
            'task_id' => $task->id,
            'user_id' => auth()->id(),
            'date' => now()->toDateString(),
            'quantity_done' => $data['quantity_done'],
        ]);

        return back()->with([
            'message'=> 'تم   بنجاح.',
            'type' => 'success'
        ]);
    }
    
    public function storeAdmin(Request $request)
    {
      // dd($request->all());
        $data = $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'user_id' => 'required|exists:users,id',
            'quantity_done' => 'required|integer|min:1',
        ]);

        $task = Task::findOrFail($data['task_id']);
       if($task->unit === 'collaborative'){
           foreach($task->users as $user){
               $progress = TaskProgress::create([
               'task_id' => $task->id,
               'user_id' => $user->id,
               'date' => now()->toDateString(),
               'quantity_done' => $data['quantity_done'],
                ]);
           }
            return back()->with([
            'message'=> 'تم   بنجاح.',
            'type' => 'success'
            ]);
       }
        // حفظ التقدم
        $progress = TaskProgress::create([
            'task_id' => $task->id,
            'user_id' =>$data['user_id'],
            'date' => now()->toDateString(),
            'quantity_done' => $data['quantity_done'],
        ]);

        return back()->with([
            'message'=> 'تم   بنجاح.',
            'type' => 'success'
        ]);
    }
}
