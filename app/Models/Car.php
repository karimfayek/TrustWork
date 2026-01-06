<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'plate_number',
        'model',
        'current_km',
        'oil_change_every',
        'maintenance_every',
        'license_number',
        'license_expiry_date',
        'chassis_number'
    ];

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
}
