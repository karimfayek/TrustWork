<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Deduction;
class DeductionController extends Controller
{
    public function store(Request $request)
    {
        //dd($request->all());
       $validated =  $request->validate([
            'user_id' => 'required|exists:users,id',
            'type' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'note' => 'nullable|string',
        ]);
        $validated['deducted_at'] =  now();
        Deduction::create($validated);

        return redirect()->back()->with('success', 'تمت إضافة الاستقطاع بنجاح.');
    }
    public function delete(Request $request)
    {
       //dd($request->all());
        $deduction = Deduction::find($request->id)->delete();
       
        return back()->with('message', 'تم   الحذف!'); 
    }

}
