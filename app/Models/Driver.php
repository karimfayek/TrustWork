<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    protected $fillable = ['user_id', 'car_id', 'license_number', 'license_expiry_date', 'residence', 'license_type'];
    protected $dates = ['license_expiry_date'];
    protected $casts = [
        'license_expiry_date' => 'date',
    ];
    protected $table = 'drivers';
    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function activeTrip()
    {
        return $this->hasOne(Trip::class)
            ->whereNull('ended_at');
    }
}
