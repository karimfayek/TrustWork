<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();

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
       $validated =  $request->validate([
            'name' => 'required|string|max:255',
            'transport_fees' => 'required|numeric|min:0',
            'address' => 'required|string',
            'description' => 'nullable|string',
            'info' => 'nullable|string',
            'email' => 'nullable|email',
        ]);
        Customer::create($validated);

        return redirect()->back()->with('success', 'تمت إضافة العميل بنجاح.');
    }
    public function update(Request $request , $id)
    {
        //dd($request->all());
       $validated =  $request->validate([
            'name' => 'required|string|max:255',
            'transport_fees' => 'required|numeric|min:0',
            'address' => 'required|string',
            'description' => 'nullable|string',
            'info' => 'nullable|string',
            'email' => 'nullable|email',
        ]);
        $customer = Customer::find($id);
        $customer->update($validated);
        //Customer::create($validated);

        return redirect()->back()->with('success', 'تم تعديل العميل بنجاح.');
    }
}
