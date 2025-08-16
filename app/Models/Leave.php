<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    protected $fillable = [
        'type',
        'leave_date',
        'reason',
        'status'
    ];
}
