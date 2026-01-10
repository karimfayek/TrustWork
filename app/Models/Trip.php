<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $fillable = [
        'driver_id',
        'car_id',
        'start_lat',
        'start_lng',
        'end_lat',
        'end_lng',
        'start_km',
        'end_km',
        'distance',
        'started_at',
        'ended_at',
        'to_location',
        'from_location',
    ];
    public function car()
    {
        return $this->belongsTo(Car::class);
    }
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}
