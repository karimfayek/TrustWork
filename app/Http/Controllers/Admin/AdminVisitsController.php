<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Customer;
use App\Models\Visit;
use Inertia\Inertia;
use Carbon\Carbon;
class AdminVisitsController extends Controller
{
    public function index(Request $request)
    {
        $customers = Customer::where('type', 'contract')->with([
            'visits' => function ($q) {
                $q->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->selectRaw('DISTINCT DATE(created_at), customer_id');
            }
            ,
            'visits.user'
        ])->get();
        $visits = Visit::all()->load('customer')->load('user', 'attendance');

        return Inertia::render('Admin/Visits/Index', [
            'customers' => $customers,
            'visits' => $visits,
        ]);
    }
    public function details($id, $month, $year, Request $request)
    {
        $customer = Customer::where('id', $id)->with([
            'visits' => function ($q) use ($month, $year) {
                $q->whereMonth('created_at', $month)
                    ->whereYear('created_at', $year)
                    ->with('customer')
                    ->with('user')
                    ->with('attendance')
                ;
            }
            ,
            'visits.user'
        ])->get();
        return response()->json($customer);
    }
    public function show($id, Request $request)
    {
        $customers = Customer::all();
        $visit = Visit::where('id', $id)->first();
        if ($visit) {
            $visit->load('customer');
            $visit->load('user', 'attendance');
        }

        return Inertia::render('Admin/Visits/Show', [
            'visit' => $visit,
        ]);
    }
    public function delete(Request $request)
    {
        // dd($request->all());
        $visit = Visit::find($request->id);
        $visit->delete();
    }

}