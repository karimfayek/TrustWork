<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Driver;
use App\Models\Car;
use Inertia\Inertia;

class DriverController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Drivers/Index', [
            'drivers' => Driver::with('user')->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id|unique:drivers,user_id',
            'residence' => 'nullable|string',
            'license_type' => 'required|string',
            'license_number' => 'required|unique:drivers',
            'license_expiry_date' => 'required|date',
        ]);

        Driver::create($data);

        return redirect()->route('drivers.index')
            ->with('success', 'تم ربط المستخدم كسائق بنجاح');
    }
    // update
    public function update(Request $request, Driver $driver)
    {
        $driver->update($request->validate([
            // 'user_id' => 'nullable|exists:users,id|unique:drivers,user_id' . $driver->id,
            'residence' => 'nullable|string',
            'license_type' => 'required|string',
            'license_number' => 'required|unique:drivers,license_number,' . $driver->id,
            'license_expiry_date' => 'required|date',
        ]));

        return redirect()->route('drivers.index')
            ->with('success', 'تم تحديث بيانات السائق بنجاح');
    }
    // delete
    public function destroy(Driver $driver)
    {
        $driver->delete();
        return back();
    }
    // show
    public function show(Driver $driver)
    {
        return Inertia::render('Admin/Drivers/Show', [
            'driver' => $driver
        ]);
    }
    // edit
    public function edit(Driver $driver)
    {
        return Inertia::render('Admin/Drivers/Edit', [
            //send driver with user
            'driver' => $driver->with('user')->first()
        ]);
    }
    // create
    public function create()
    {
        $users = \App\models\User::doesntHave('driver')->get();
        return Inertia::render('Admin/Drivers/Create', [
            'users' => $users
        ]);
    }
}
