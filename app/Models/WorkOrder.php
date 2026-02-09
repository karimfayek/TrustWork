<?php

// app/Models/WorkOrder.php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class WorkOrder extends Model
{
    protected $fillable = [
        'client_name',
        'client_phone',
        'client_address',
        'description',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

