<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    protected $fillable = ['user_id', 'car_id', 'license_number'];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
}
