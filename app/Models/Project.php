<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Project extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name', 'start_date' , 'end_date','description','created_by','deleted_at','customer_name' ,'project_code',
        'advance_payment','customer_email'
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
// Add any other relationships or methods as needed
public function getTotalQuantityAttribute()
{
    return $this->tasks->sum('quantity');
}

public function getTotalDoneAttribute()
{
    return $this->tasks->sum('total_done');
}
public function getTotalRemainingAttribute()
{
    return $this->tasks->sum('remaining');
}

public function getProgressPercentageAttribute()
{
    $totalQuantity = $this->total_quantity;
    if ($totalQuantity == 0) {
        return 0;
    }
    return ($this->total_done / $totalQuantity) * 100;
}
public function getDurationDaysAttribute()
{
    if (!$this->start_date || !$this->end_date) {
        return null;
    }
    return \Carbon\Carbon::parse($this->start_date)->diffInDays(\Carbon\Carbon::parse($this->end_date)) + 1;
}
public function getDailyTargetAttribute()
{
    if (!$this->duration_days || $this->duration_days == 0) {
        return null;
    }
    return $this->total_quantity / $this->duration_days;
}
public function getDailyDoneAttribute()
{
    $daysPassed = \Carbon\Carbon::parse($this->start_date)->diffInDays(\Carbon\Carbon::now()) + 1;
    if ($daysPassed <= 0) {
        return 0;
    }
    return $this->total_done / $daysPassed;
}

public function getIsCompletedAttribute()
{
    return $this->total_done >= $this->total_quantity && $this->total_quantity > 0;
}
protected $appends = [
    'total_quantity',
    'total_done',
    'total_remaining',
    'progress_percentage',
    'duration_days',
    'daily_target',
    'daily_done',
    'is_completed',
];
}
