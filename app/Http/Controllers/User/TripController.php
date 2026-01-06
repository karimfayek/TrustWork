<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;

class TripController extends Controller
{
    public function start(Request $request)
    {
        //dd($request->all());
        $request->validate([
            'from_location' => 'required|string|max:255',
            'to_location' => 'required|string|max:255',
            'start_km' => 'required|integer|min:0',
            'lat' => 'required',
            'lng' => 'required',
        ]);

        $driver = auth()->user()->driver;

        if ($driver->activeTrip) {
            abort(403, 'يوجد رحلة مفتوحة');
        }

        Trip::create([
            'driver_id' => $driver->id,
            'car_id' => $driver->car_id,
            'start_km' => $request->start_km,
            'start_lat' => $request->lat,
            'start_lng' => $request->lng,
            'from_location' => $request->from_location,
            'to_location' => $request->to_location,
            'started_at' => now(),
        ]);

        return redirect()->route('driver.dashboard');
    }


    public function end(Request $request, Trip $trip)
    {
        // dd($trip->start_km);
        $trip->refresh();
        $request->validate([
            'end_km' => 'required|integer|gte:' . $trip->start_km,
            'lat' => 'required',
            'lng' => 'required',
        ]);

        if ($trip->driver_id !== auth()->user()->driver->id) {
            abort(403);
        }

        $distance = $request->end_km - $trip->start_km;

        $trip->update([
            'end_km' => $request->end_km,
            'end_lat' => $request->lat,
            'end_lng' => $request->lng,
            'distance' => $distance,
            'ended_at' => now(),
        ]);

        $trip->car->increment('current_km', $distance);

        return redirect()->route('driver.dashboard');
    }

}
