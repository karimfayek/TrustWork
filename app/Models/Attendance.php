<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'project_id',
        'user_id',
        'check_in_time',
        'check_out_time',
        'in_location',
        'is_late',
        'out_location',
        'customer',
        'type',
        'visit_id',
        'late_deduct_type'
    ];


    public function user()
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id')->withTrashed();
    }
    public function visit()
    {
        return $this->belongsTo(Visit::class, 'visit_id');
    }

}
