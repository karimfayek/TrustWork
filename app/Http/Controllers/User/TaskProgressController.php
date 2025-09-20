<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\TaskProgress;
use Illuminate\Http\Request;
use Mail;
use App\Mail\TaskProgress as TaskProgressMail;

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
       
        $emails = \App\Models\Setting::where('key', 'task_progress_notify')->value('value');
        $emailscc = $task->project->customer_email;
        //dd($emails);
       if($task->unit === 'collaborative'){
           foreach($task->users as $user){
               $progress = TaskProgress::create([
               'task_id' => $task->id,
               'user_id' => $user->id,
               'date' => now()->toDateString(),
               'quantity_done' => $data['quantity_done'],
                ]);
           }
            if (!empty($emails) ) {
                $emailsArray = array_filter(array_map('trim', explode(',', $emails)));
            
                if (!empty($emailsArray)) {
                    Mail::to($emailsArray)->send(new TaskProgressMail(
                        $task->project->name,
                        $task,
                        $data['quantity_done'],
                        $task->users,
                    ));
                }
            }
            if (!empty($emailscc) ) {
                $emailsArrayCC = array_filter(array_map('trim', explode(',', $emailscc)));
            
                if (!empty($emailsArrayCC)) {
                    Mail::to($emailsArrayCC)->send(new TaskProgressMail(
                        $task->project->name,
                        $task,
                        $data['quantity_done'],
                        $task->users,
                    ));
                }
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
       
            if (!empty($emails) ) {
                $emailsArray = array_filter(array_map('trim', explode(',', $emails)));
            
                if (!empty($emailsArray)) {
                    Mail::to($emailsArray)->send(new TaskProgressMail(
                        $task->project->name,
                        $task,
                        $data['quantity_done'],
                        \App\Models\User::find(auth()->id()),
                    ));
                }
            }
            if (!empty($emailscc) ) {
                $emailsArrayCC = array_filter(array_map('trim', explode(',', $emailscc)));
            
                if (!empty($emailsArrayCC)) {
                    Mail::to($emailsArrayCC)->send(new TaskProgressMail(
                        $task->project->name,
                        $task,
                        $data['quantity_done'],
                        \App\Models\User::find(auth()->id()),
                    ));
                }
            }
       
           
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
           $emails = \App\Models\Setting::where('key', 'task_progress_notify')->value('value');
        $emailscc = $task->project->customer_email;
       if($task->unit === 'collaborative'){
           foreach($task->users as $user){
               $progress = TaskProgress::create([
               'task_id' => $task->id,
               'user_id' => $user->id,
               'date' => now()->toDateString(),
               'quantity_done' => $data['quantity_done'],
                ]);
           }
              if (!empty($emails) ) {
                $emailsArray = array_filter(array_map('trim', explode(',', $emails)));
            
                if (!empty($emailsArray)) {
                    Mail::to($emailsArray)->send(new TaskProgressMail(
                        $task->project->name,
                        $task,
                        $data['quantity_done'],
                        $task->users,
                    ));
                }
            }
            if (!empty($emailscc) ) {
                $emailsArrayCC = array_filter(array_map('trim', explode(',', $emailscc)));
            
                if (!empty($emailsArrayCC)) {
                    Mail::to($emailsArrayCC)->send(new TaskProgressMail(
                        $task->project->name,
                        $task,
                        $data['quantity_done'],
                        $task->users,
                    ));
                }
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

        if (!empty($emails) ) {
                $emailsArray = array_filter(array_map('trim', explode(',', $emails)));
            
                if (!empty($emailsArray)) {
                    Mail::to($emailsArray)->send(new TaskProgressMail(
                        $task->project->name,
                        $task,
                        $data['quantity_done'],
                        \App\Models\User::find(auth()->id()),
                    ));
                }
            }
            if (!empty($emailscc) ) {
                $emailsArrayCC = array_filter(array_map('trim', explode(',', $emailscc)));
            
                if (!empty($emailsArrayCC)) {
                    Mail::to($emailsArrayCC)->send(new TaskProgressMail(
                        $task->project->name,
                        $task,
                        $data['quantity_done'],
                        \App\Models\User::find(auth()->id()),
                    ));
                }
            }
       
        return back()->with([
            'message'=> 'تم   بنجاح.',
            'type' => 'success'
        ]);
    }
    public function deleteAdmin(Request $request)
    {
       // dd($request->all());
        $data = $request->validate([
            'id' => 'required|exists:task_progress,id',
        ]);
        
        $progress = TaskProgress::findOrFail($data['id']);
        $progress->delete();

        return back()->with([
            'message'=> 'تم الحذف بنجاح.',
            'type' => 'success'
        ]);
    }
}
