<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Tool;
use App\Models\ToolAssignment;

class ToolController extends Controller
{
    public function index()
    {

        $tools = Tool::with('assignments')->get();
        $users = User::all();
        $assignments = ToolAssignment::with(['tool', 'user'])->get();
       // $realqty =  $assignments
       foreach($tools as $tool){
        $tool['returned'] = $tool->assignments->where('status' , 'assigned')->sum('quantity');
       }
        return Inertia::render('Admin/Tools/Index', [
            'tools' => $tools,
            'users' => $users,
            'assignments' => $assignments,
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Tools/Create');
    }
    public function edit($id)
    {
        $tool = Tool::find($id);
        return Inertia::render('Admin/Tools/Edit' , compact('tool'));
    }
    public function store(Request $request )
    {
        //dd($request->all());
       $validated = $request->validate([
            'name' => 'required|string|max:255',
            'estimated_value' => 'required|numeric',
            'qty' => 'required|numeric',
            'description' => 'nullable|string',
        ]);
       // dd($request->all());
         Tool::create($validated);

        
      
    
        return back()->with('message', 'تم انشاء الاداة بنجاح!'); // "Task updated successfully"
    }
    public function update(Request $request, $id )
    {
        //dd($request->all());
       $validated = $request->validate([
            'name' => 'required|string|max:255',
            'estimated_value' => 'required|numeric',
            'qty' => 'required|numeric',
            'description' => 'nullable|string',
        ]);
       // dd($request->all());
       $tool = Tool::find($id);
         $tool->update($validated);

        
      
    
        return back()->with('message', 'تم انشاء الاداة بنجاح!'); // "Task updated successfully"
    }
}
