<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Project extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name', 'start_date' , 'end_date','description','created_by','deleted_at','customer_name' ,'project_code'
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
    public function extractions()
{
    return $this->hasMany(Extraction::class);
}
}
