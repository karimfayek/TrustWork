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
        'status',
        'priority',
        'assign_date',
        'completion_date',
        'file',
        'customer_id',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function employees()
    {
        return $this->belongsToMany(User::class, 'work_order_user')
            ->withTimestamps();
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}

