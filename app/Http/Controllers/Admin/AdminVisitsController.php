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
        $customers = Customer::all();
        $visits = Visit::all()->load('customer')->load('user');

        return Inertia::render('Admin/Visits/Index', [
            'customers' => $customers,
            'visits' => $visits,
        ]);
    }
    public function show($id , Request $request)
    {
        $customers = Customer::all();
        $visit = Visit::where('id',$id)->first();
        if($visit){
            $visit->load('customer');
            $visit->load('user');
        }

        return Inertia::render('Admin/Visits/Show', [
            'visit' => $visit,
        ]);
    }

}