<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    protected $fillable = [
        'user_id', 'customer_id', 'check_in', 'check_out', 'notes', 'report_path','is_late','in_location','out_location'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function customer() {
        return $this->belongsTo(Customer::class);
    }
    public function attendance() {
        return $this->hasOne(Attendance::class);
    }
}
