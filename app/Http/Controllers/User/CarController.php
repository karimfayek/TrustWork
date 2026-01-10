<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;
use Inertia\Inertia;

class CarController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Cars/Index', [
            'cars' => Car::all()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'plate_number' => 'required|unique:cars',
            'model' => 'required',
            'current_km' => 'required|integer',
            'oil_change_every' => 'required|integer',
            'maintenance_every' => 'required|integer',
            'license_number' => 'required|numeric',
            'license_expiry_date' => 'required|date',
            'chassis_number' => 'required|numeric',
        ]);
        Car::create($data);

        return redirect()->route('cars.index')
            ->with('success', 'تم إضافة السيارة بنجاح');
    }
    // update
    public function update(Request $request, Car $car)
    {
        $car->update($request->validate([
            //check if plate number is unique except the current car
            'plate_number' => 'required|unique:cars,plate_number,' . $car->id,
            'model' => 'required',
            'current_km' => 'required|integer',
            'oil_change_every' => 'required|integer',
            'maintenance_every' => 'required|integer',
            'license_number' => 'required|numeric',
            'license_expiry_date' => 'required|date',
            'chassis_number' => 'required|numeric',
        ]));
        //redirect to car index
        return redirect()->route('cars.index')
            ->with('success', 'تم تحديث السيارة بنجاح');
    }
    // delete
    public function destroy(Car $car)
    {
        $car->delete();
        return back();
    }
    // show
    public function show(Car $car)
    {
        return Inertia::render('Admin/Cars/Show', [
            'car' => $car
        ]);
    }
    // edit
    public function edit(Car $car)
    {
        return Inertia::render('Admin/Cars/Edit', [
            'car' => $car
        ]);
    }
    // create
    public function create()
    {
        return Inertia::render('Admin/Cars/Create');
    }

    public function driverCar()
    {
        $user = auth()->user();
        $driver = $user->driver;
        $car = $driver->car;
        return Inertia::render('Driver/Car', [
            'car' => $car
        ]);
    }
}
