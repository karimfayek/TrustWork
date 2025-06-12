<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Customer;
use App\Models\Visit;
use Inertia\Inertia;
use Carbon\Carbon;
class VisitsController extends Controller
{
    public function index(Request $request)
    {
        $customers = Customer::all();
        $visits = Visit::where('user_id' , $request->user()->id )->with('customer')->get();

        return Inertia::render('Employee/Visits/index', [
            'customers' => $customers,
            'visits' => $visits,
        ]);
    }
    public function show($id , Request $request)
    {
        $customers = Customer::all();
        $visit = Visit::where('id',$id)->where('user_id' , $request->user()->id )->first();
        if($visit){
            $visit->load('customer');
        }

        return Inertia::render('Employee/Visits/Show', [
            'customers' => $customers,
            'visit' => $visit,
        ]);
    }
    public function start(Request $request)
    {
        $customers = Customer::all();
        $visits = Visit::where('user_id' , $request->user()->id )->with('customer')->get();
        $activeVisit = Visit::where('user_id', $request->user()->id )
        ->whereNull('check_out')
        ->latest()
        ->first();

        $customers = Customer::all();
        return Inertia::render('Employee/Visits/VisitStart', [
            'customers' => $customers,
            'visits' => $visits,
            'activeVisit' => $activeVisit,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
        ]);
        $esistingVisit = Visit::where('customer_id' , $request->customer_id )->where('user_id' , $request->user()->id)->whereDate('check_in', Carbon::today())
        ->first();
        if($esistingVisit){
            return  response()->json(['error' => 'تم تسجيل الحضور بالفعل اليوم.']);
        }
        
      
        $visit = Visit::create([
            'user_id' => $request->user()->id,
            'customer_id' => $request->customer_id,
            'check_in' => now(),
            'in_location' => $request->input('location', 'غير محدد'),
            'is_late' =>  now()->hour >= 9,
        ]);
       // return redirect()->back()->with(['visit' => $visit]);
        return response()->json(['visit' => $visit]);
    }

    public function update(Request $request, $id)
    {
        //dd($request->input('location'));
        $visit = Visit::findOrFail($id);

        $request->validate([
            'notes' => 'nullable|string',
            'report' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('report')) {
            $path = $request->file('report')->store('reports', 'public');
            $visit->report_path = $path;
        }

        $visit->notes = $request->notes;
        $visit->check_out = now();
        $visit->out_location =  $request->input('location', 'غير محدد');
        $visit->save();

        return  response()->json([
            'success' => true,
            'redirect' => route('visits.show', $visit->id),
            'message' => 'تم إنهاء الزيارة',
        ]);
    }

}