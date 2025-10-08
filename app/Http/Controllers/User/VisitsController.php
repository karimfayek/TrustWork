<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Mail;
use App\Mail\VisitStartNotification;
use App\Models\User;
use App\Models\Customer;
use App\Models\Attendance;
use App\Models\Visit;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Setting;

class VisitsController extends Controller
{
    public function index(Request $request)
    {
        $customers = Customer::all();
        $visits = Visit::where('user_id' , $request->user()->id )->with('customer','attendance')->get();

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
            $visit->load('attendance');
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
        $activeVisit = Visit::where('user_id', $request->user()->id)
            ->whereHas('attendance', function ($query) {
                $query->whereNull('check_out_time');
            })
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
        //dd($request->all());
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
        ]);
        $esistingVisit = Visit::where('customer_id' , $request->customer_id )->where('user_id' , $request->user()->id)->whereDate('created_at', Carbon::today())
        ->first();
        if($esistingVisit){
            return  response()->json(['error' => 'تم تسجيل الحضور بالفعل اليوم.']);
        }
        
      
        $visit = Visit::create([
            'user_id' => $request->user()->id,
            'customer_id' => $request->customer_id,
            'is_late' =>  now()->hour >= 9,
        ]);
        Attendance::create([
            'user_id' =>$request->user()->id,
            'visit_id' => $visit->id,
            'type' => 'visit',
            'check_in_time' => now(),
            'in_location' => $request->input('location', 'غير محدد'),
            'is_late' => now()->hour >= 9, // تعتبر متأخر بعد الساعة 9 صباحًا
        ]);
       // return redirect()->back()->with(['visit' => $visit]);
       try{
          if (config('app.env') === 'production' || true) {
            $emails =  Setting::where('key', 'visit_request_notify')->value('value');
            if (!empty($emails)) {
                $emailsArray = array_filter(array_map('trim', explode(',', $emails)));
            
                if (!empty($emailsArray)) {
                    $customer = \App\Models\Customer::find( $request->customer_id);
                    $visitsCountThisMonth = $customer->visits()
                        ->whereBetween('created_at', [
                            now()->startOfMonth(),
                            now()->endOfMonth()
                        ])
                        ->count();
                      Mail::to($emails)->send(new VisitStartNotification(
                        $request->user()->name,
                        $customer->name,
                        $visitsCountThisMonth,
                    ));
                }
            }
       
    }
       } catch (error $e){
         return response()->json(['visit' => $visit]);
       }
        return response()->json(['visit' => $visit]);
    }

    public function update(Request $request, $id)
    {
        //dd($request->input('location'));
        $visit = Visit::findOrFail($id);

        $request->validate([
            'notes' => 'nullable|string',
            'report' => 'required|image',
        ]);

        if ($request->hasFile('report')) {
            $path = $request->file('report')->store('reports', 'public');
            $visit->report_path = $path;
        }

        $visit->notes = $request->notes;
        $visit->save();
        $att = Attendance::where('visit_id' , $visit->id)->first();
        $att->check_out_time = now();
        $att->out_location =  $request->input('location', 'غير محدد');
        $att->save();

        return  response()->json([
            'success' => true,
            'redirect' => route('visits.show', $visit->id),
            'message' => 'تم إنهاء الزيارة',
        ]);
    }
    public function edit(Request $request, $id)
    {
        //dd($request->input('location'));
        $visit = Visit::findOrFail($id);

        $request->validate([
            'notes' => 'nullable|string',
            'report' => 'nullable|image',
        ]);

        if ($request->hasFile('report')) {
            $path = $request->file('report')->store('reports', 'public');
            $file = public_path('\\storage\\' . $visit->report_path);

            if (file_exists($file)) {
                @unlink($file);
            }
           
            $visit->report_path = $path;
        }

        $visit->notes = $request->notes;
        //$visit->check_out = now();
        //$visit->out_location =  $request->input('location', 'غير محدد');
        $visit->save();

        return back()->with('message', 'تم  التعديل بنجاح!');
    }

}