<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Project;

use App\Models\Task;

class PricingController extends Controller
{
    public function pricing(Request $request , $id)
    {
        $project = Project::find($id)->load('tasks');
        return Inertia::render('Projects/Pricing', compact('project'));
    }
    
    
    public function pricingSet(Request $request)
    {
       // dd()
        $request->validate([
            'tasks' => 'required|array',
            'tasks.*.up' => 'nullable|numeric',
        ]);
        foreach ($request->tasks as $taskData) {
            $task = Task::find($taskData['id']);
        //dd( (int)$taskData['up'] );
            $task->update([              
                'unit_price' => (float)$taskData['up'],
                'tp' => bcmul((string)$taskData['up'], (string) $taskData['quantity'], 2),
            ]);
        }
        return back()->with('message' , 'تم الحفظ');
    }
}
