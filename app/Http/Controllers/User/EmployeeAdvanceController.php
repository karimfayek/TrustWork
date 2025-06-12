<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Mail;
use App\Mail\AdvanceRequestNotification;
use App\Models\User;
use App\Models\Advance;
use App\Models\Project;
use Inertia\Inertia;
class EmployeeAdvanceController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $finalSalary = $user->salary->final_salary;
        $advances = $user->advances()->get()->load('project');
        $expenses = $user->expenses()->select('amount', 'description', 'spent_at')->get();

        $totalAdvance = $user->advances()->accepted()->sum('amount');
      // dd($totalAdvance);
       $userProjects = $user->projects();
       $activeProjects = $userProjects->whereDate('end_date', '>=', now()->toDateString())
       ->get();
      //dd($activeProjects);
        $totalExpense = $expenses->sum('amount');
        $remaining = $totalAdvance - $totalExpense;

        return Inertia::render('Employee/Advance', [
            'advances' => $advances,
            'expenses' => $expenses,
            'totalAdvance' => $totalAdvance,
            'totalExpense' => $totalExpense,
            'remaining' => $remaining,
            'activeProjects' => $activeProjects,
            'finalSalary'=>  (int)$finalSalary
        ]);
    }

    public function storeAdvance(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'note' => 'required|string|max:255',
            'project_id' => 'required',
        ]);
        // dd($request->all());
        //$existing = Advance::where()
        $user = $request->user_id
            ? User::findOrFail($request->user_id) // الإدمن يضيف لشخص معين
            : $request->user(); // الموظف يضيف لنفسه

        $user->advances()->create([
            'amount' => $request->amount,
            'note' => $request->note,
            'project_id' => $request->project_id,
            'given_at' => null,
            'status' => 'pending',
        ]);
        $project= Project::find($request->project_id);
        //Mail::to('kariem.pro@gmail.com')->send( new SendEmail($user->name,$user->email,$request->amount,$request->note));
        Mail::to('kariem.pro@gmail.com')->send(new AdvanceRequestNotification(
            $user->name,
            $project->name,
            $request->amount,
            $request->note,
            $user->id,
        ));
        return redirect()->back()->with('success', 'تم طلب العهدة.');
    }
    public function storeAdvanceAdmin(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'note' => 'required|string|max:255',
            'project_id' => 'required',
            'method' => 'required',
        ]);
        //dd($request->all());
        $user = $request->user_id
            ? User::findOrFail($request->user_id) // الإدمن يضيف لشخص معين
            : $request->user(); // الموظف يضيف لنفسه

        $user->advances()->create([
            'amount' => $request->amount,
            'note' => $request->note,
            'project_id' => $request->project_id,
            'given_at' => now(),
            'status' =>  'accepted',
            'method' => $request->method,
        ]);

        return redirect()->back()->with('success', 'تم تسجيل العهدة.');
    }
    public function statusAdvanceAdmin(Request $request)
    {
       // dd($request->all());
        $request->validate([
            'advance_id' => 'required',
            'status' => 'required',
            'amount' => 'required|numeric|min:1',
            'note' => 'required|string|max:255',
        ]);
        // dd($request->all());
        $advance = Advance::findOrFail($request->advance_id);
        if($request->status === 'declined'){
            $giveAt = null;
        }else{
            $giveAt = now();
        }
        $advance->update([
            'amount' => $request->amount,
            'note' => $request->note,
            'given_at' => $giveAt ,
            'status' =>  $request->status,
            'method'=> $request->payment_method
        ]);

        return redirect()->back()->with('success', 'تم تحديث العهدة.');
    }
    
    public function settlementAdvanceAdmin(Request $request)
    {
    // dd($request->all());
        $request->validate([
            'user_id' => 'required',
            'amount' => 'required|numeric|min:1',
        ]);
        // dd($request->all());
        
       $user = User::find($request->user_id);
      
       $user->expenses()->create([
        'amount' => $request->amount,
        'description' => 'تسوية',
        'spent_at' => now(),
        'asa'=> 'settle'
    ]);
        return redirect()->back()->with('success', 'تم تحديث العهدة.');
    }

public function deleteAdvance(Request $request)
{
    //dd($request->all());
    $request->validate([
        'id' => 'required|exists:advances,id',
    ]);
      // dd($request->all());
    $advance = Advance::find($request->id);
    $advance->delete();

    return redirect()->back()->with('success', 'تم مسح العهدة.');
}

public function storeExpense(Request $request)
{
    $request->validate([
        'amount' => 'required|numeric|min:1',
        'description' => 'required|string|max:255',
    ]);
    $user = $request->user_id
    ? User::findOrFail($request->user_id) // الإدمن يضيف لشخص معين
    : $request->user(); // الموظف يضيف لنفسه

$user->expenses()->create([
        'amount' => $request->amount,
        'description' => $request->description,
        'spent_at' => now(),
    ]);

    return redirect()->back()->with('success', 'تم تسجيل المصروف.');
}

}
