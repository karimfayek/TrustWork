<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Loan;
use Carbon\Carbon;
use Inertia\Inertia;
class LoanController extends Controller
{
    public function requestLoan(Request $request)
{
    $user = Auth::user();
    // تحقق من التاريخ
    if (now()->day < 15) {
       return back()->withErrors(['message' => 'لا يمكنك طلب السلفة إلا بعد يوم 15 من الشهر.']);
    }

    // احصل على 25% من الراتب
    $maxAmount = $user->salary->final_salary * 0.25;
    $userloans = $user->loans->sum('amount');
    if ($userloans >= $maxAmount) {
        return back()->withErrors(['message' => 'لديك سلف سابقة']);
     }

    $validated = $request->validate([
        'amount' => "required|numeric|min:1|max:$maxAmount",
        'reason' => 'nullable|string|max:1000',
    ]);

    Loan::create([
        'employee_id' => $user->id,
        'amount' => $validated['amount'],
        'reason' => $validated['reason'],
        'loan_date' => Carbon::today(),
        'admin_status' => 'pending',
    ]);

    return redirect()->back()->with('message', 'تم إرسال طلب السلفة بنجاح.');
}
public function changeStatus(Request $request)
{
    $request->validate([
        'leave_id' => 'required',
        'status' => 'required',
    ]);
    // dd($request->all());
    $loan = \App\Models\Loan::findOrFail($request->loan_id);
    
    $loan->update([
        'status' =>  $request->status,
    ]);

    return redirect()->back()->with('success', 'تم تحديث حالة السلفة.');

}
public function delete(Request $request)
{
   //dd($request->all());
    $loan = \App\Models\Loan::find($request->id)->delete();
   
    return back()->with('message', 'تم   الحذف!'); 
}
}
