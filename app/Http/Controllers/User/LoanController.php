<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Loan;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;
class LoanController extends Controller
{

     public function index(){
         $loans = Loan::with('employee')
        ->latest()
        ->get()
        ->groupBy('employee_id')
        ->map(function ($items) {
            return [
                'user' => $items->first()->employee->name ?? 'غير معروف',
                'total_points' => $items->sum('points'),
                'records' => $items->map(function ($reward) {
                    return [
                        'date' => $reward->loan_date,
                        'amount' => $reward->amount,
                        'reason' => $reward->reason,
                        'status' => $reward->status,
                        'admin_status' => $reward->admin_status,
                        'id' => $reward->id,
                    ];
                }),
            ];
        })
        ->values();
        $users = User::where('status' , 1)->with('loans')->get();
        return Inertia::render('Admin/Loans/Index', [ 
             'users'=> $users,
             'loans' => $loans

        ]);
     }
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

    public function AdminStore(Request $request )
{
    //dd($request->all());
    

    Loan::create([
        'employee_id' => $request->user_id,
        'amount' => $request->amount,
        'reason' => $request->reason,
        'loan_date' =>$request->loan_date,
        'admin_status' => 'approved',
        'status' => 'paid',
    ]);

    return redirect()->back()->with('message', 'تم  اضافة السلفة بنجاح.');
}
public function spent(Request $request , $id)
{
    $reward = Loan::find($id);
    $reward->update([
        'status' => 'paid',
        'admin_status'=>'approved'
    ]);
    return back()->with('message' , 'تم بنجاح');
  

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
