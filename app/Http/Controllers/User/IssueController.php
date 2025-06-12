<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Issue;

class IssueController extends Controller
{
    public function store(Request $request)
    {
       
       //dd($request->all());
        $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'description' => 'required|string|max:1000',
        ]);
    
        Issue::create([
            'user_id' => auth()->id(),
            'task_id' => $request->task_id,
            'description' => $request->description,
        ]);
    
        return back()->with([
            'message'=> 'تم إرسال المشكلة بنجاح.',
            'type' => 'success'
        ]);
    }
}
