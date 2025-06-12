<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ToolAssignment;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Tool;
use App\Models\ToolDeduction;

class ToolAssignmentController extends Controller
{
    public function index()
    {

        $tools = Tool::all();
        $users = User::all();
        $assignments = ToolAssignment::with(['tool', 'user'])->get();

        return Inertia::render('Admin/ToolAssignments/Index', [
            'tools' => $tools,
            'users' => $users,
            'assignments' => $assignments,
        ]);
    }

    public function assignTool(Request $request)
{
   
    $request->validate([
        'tool_id' => 'required|exists:tools,id',
        'user_id' => 'required|exists:users,id',
        'quantity' => 'required|integer|min:1',
    ]);
    $tool = Tool::find($request->tool_id);

    if($tool->qty < $request->quantity){
       
       return back()->withErrors(['message' => 'الكميه غير متاحة']);
    }
    $toolexist = ToolAssignment::where('tool_id' ,$request->tool_id )->where('status','assigned')->get();
    //dd($toolexist->sum('quantity'));
    if($toolexist){
        if($request->quantity + $toolexist->sum('quantity') > $tool->qty ){
            //dd( $toolexist->sum('quantity') );
            return back()->withErrors(['message' => 'الكميه غير متاحة']);
        }

    }
    ToolAssignment::create([
        'tool_id' => $request->tool_id,
        'user_id' => $request->user_id,
        'quantity' => $request->quantity,
        'status' => 'assigned',
        'assigned_at' => now(),
    ]);

    return back()->with('message', 'تم تسليم الأداة للموظف بنجاح.');
}

public function markAsLost($assignmentId)
{
    $assignment = ToolAssignment::findOrFail($assignmentId);
    $tool = Tool::findOrFail($assignment->tool_id);
    $tool->qty -= $assignment->quantity;
    $tool->save();
    $assignment->status = 'lost';
    $assignment->lost_at = now();
    $assignment->save();

    ToolDeduction::create([
        'tool_assignment_id' => $assignment->id,
        'amount' => $assignment->tool->estimated_value * $assignment->quantity,
    ]);

    return back()->with('message', 'تم تسجيل الأداة كمفقودة وخصمها من الراتب.');
}

public function markAsReturned($assignmentId)
{
    $assignment = ToolAssignment::findOrFail($assignmentId);
    $assignment->status = 'returned';
    $assignment->returned_at = now();
    $assignment->save();

    return back()->with('message', 'تم تسجيل الأداة كمرتجعة.');
}

}
