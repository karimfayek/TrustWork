<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::with([
            'visits' => function ($q) {
                $q->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->selectRaw('DISTINCT DATE(created_at), customer_id');
            }
        ])->get();

        return Inertia::render('Admin/Customers/List', [
            'customers' => $customers
        ]);
    }
    public function create()
    {

        return Inertia::render('Admin/Customers/Create');
    }
    public function edit($id)
    {
        // جلب جميع العملاء
        $customer = Customer::find($id);

        return Inertia::render('Admin/Customers/Edit', [
            'customer' => $customer,
        ]);
        // return Inertia::render('Admin/Customers/Edit', compact('customer'));
    }
    public function store(Request $request)
    {
        //dd($request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'transport_fees' => 'required|numeric|min:0',
            'address' => 'required|string',
            'description' => 'nullable|string',
            'info' => 'nullable|string',
            'email' => 'nullable|email',
            'visits_nu' => 'nullable|numeric',
        ]);
        Customer::create($validated);

        return redirect()->back()->with('success', 'تمت إضافة العميل بنجاح.');
    }
    public function update(Request $request, $id)
    {
        //dd($request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'transport_fees' => 'required|numeric|min:0',
            'address' => 'required|string',
            'description' => 'nullable|string',
            'info' => 'nullable|string',
            'email' => 'nullable|email',
            'visits_nu' => 'nullable|numeric',
        ]);
        $customer = Customer::find($id);
        $customer->update($validated);
        //Customer::create($validated);

        return redirect()->back()->with('success', 'تم تعديل العميل بنجاح.');
    }
}
