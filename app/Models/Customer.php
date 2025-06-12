<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name','info', 'description','transport_fees',
        'address','email'
        
    ];
}
