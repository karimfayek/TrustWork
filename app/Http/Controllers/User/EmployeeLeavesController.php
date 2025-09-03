<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Mail;
use App\Mail\LeaveRequestNotification;

class EmployeeLeavesController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:casual,regular',
            'leave_date' => 'required|date',
            'reason' => 'required|string|min:3',
        ]);
    
        $today = now()->startOfDay();
        $leaveDate = \Carbon\Carbon::parse($request->leave_date)->startOfDay();
    
    //dd($leaveDate);
        // تحقق من الشروط
        if ($request->type === 'regular' && $today->diffInDays($leaveDate, false) < 3) {
            return back()->withErrors(['message' => 'الإجازة الاعتيادية يجب طلبها قبل الموعد بثلاثة أيام على الأقل.']);
          // return back()->withErrors(['message' => $leaveDate ]);
        }
    
    
        //dd($leaveDate);
    
        auth()->user()->leaves()->create([
            'type' => $request->type,
            'leave_date' => $leaveDate,
            'reason' => $request->reason,
        ]);

            $emails = explode(',', \App\Models\Setting::where('key', 'leave_request_notify')->value('value'));
            if (!empty($emails)) {
                $emailsArray = array_filter(array_map('trim', $emails));
            
                if (!empty($emailsArray)) {
                    Mail::to($emails)->send(new LeaveRequestNotification(
                        auth()->user()->name,
                        $leaveDate,
                        $request->reason,
                        auth()->user()->id,
                    ));
                }
            }
           
       
       /*  if (config('app.env') !== 'production') {
            Mail::to('kariem.pro@gmail.com')->send(new LeaveRequestNotification(
                auth()->user()->name,
                $leaveDate,
                $request->reason,
                auth()->user()->id,
            ));
        } */
        return back()->with('message', 'تم تقديم طلب الإجازة بنجاح. في انتظار الموافقة.');
    }
    
    public function requestLeave(Request $request)
    {

    }
    
    public function changeStatus(Request $request)
    {
        $request->validate([
            'leave_id' => 'required',
            'status' => 'required',
        ]);
        // dd($request->all());
        $leave = \App\Models\Leave::findOrFail($request->leave_id);
        
        $leave->update([
            'status' =>  $request->status,
        ]);

        return redirect()->back()->with('success', 'تم تحديث حالة الاجازة.');

    }
    public function delete(Request $request)
    {
       //dd($request->all());
        $leave = \App\Models\Leave::find($request->id)->delete();
       
        return back()->with('message', 'تم   الحذف!'); 
    }

}
