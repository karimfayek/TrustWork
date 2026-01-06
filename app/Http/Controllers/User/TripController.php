<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;

class TripController extends Controller
{
    public function start(Request $request)
    {
        $driver = auth()->user()->driver;

        Trip::create([
            'driver_id' => $driver->id,
            'car_id' => $driver->car_id,
            'start_lat' => $request->lat,
            'start_lng' => $request->lng,
            'start_km' => $request->start_km,
            'started_at' => now(),
        ]);
    }

    public function end(Request $request, Trip $trip)
    {
        $distance = $request->end_km - $trip->start_km;

        $trip->update([
            'end_lat' => $request->lat,
            'end_lng' => $request->lng,
            'end_km' => $request->end_km,
            'distance' => $distance,
            'ended_at' => now(),
        ]);

        $trip->car->increment('current_km', $distance);
    }
}
