<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name', 'start_date' , 'end_date','description','created_by'
    ];
    public function users() {
     return $this->belongsToMany(User::class);
	}

    public function tasks() {
        return $this->hasMany(Task::class);
    }
    public function attendances()
    {
    return $this->hasMany(Attendance::class);
    }
    public function advances() {
        return $this->hasMany(Advance::class);
    }
}
