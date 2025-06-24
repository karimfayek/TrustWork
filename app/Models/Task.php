<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;
class Task extends Model
{
    protected $fillable = [
        'project_id', 'user_id' , 'title','description','is_completed','due_date','start_date',
        'end_date',
        'quantity',
        'unit','tp', 'unit_price'
    ];
    public function getDailyQuantityAttribute()
   {
    if (!$this->start_date || !$this->end_date || $this->quantity == 0) return null;

    $days = Carbon::parse($this->start_date)->diffInDays(Carbon::parse($this->end_date)) + 1;
    return ceil($this->quantity / $days);
    }

    public function users()
    {
      return $this->belongsToMany(User::class, 'task_user', 'task_id', 'user_id')->withPivot('quantity');
    }

    
    public function progress()
    {
        return $this->hasMany(TaskProgress::class);
    }

    public function project() {
       return $this->belongsTo(Project::class);
    }
    public function getUsersCountAttribute()
    {
      return $this->users->count();
    }
    public function getDurationDaysAttribute()
    {
        return \Carbon\Carbon::parse($this->start_date)->diffInDays(\Carbon\Carbon::parse($this->end_date)) + 1;
    }
    
    public function getDailyTargetAttribute()
    {
        return $this->quantity / $this->duration_days;
    }
    
    public function getTotalDoneAttribute()
    {
        return $this->progress->sum('quantity_done');
    }
    
    public function getRemainingAttribute()
    {
        return max(0, $this->quantity - $this->total_done);
    }
    public function getIsBehindScheduleAttribute()
    {
        $startDate = Carbon::parse($this->start_date)->toDateString();
        $now = Carbon::now()->toDateString();

        $daysPassed = Carbon::parse($startDate)->diffInDays($now) ;
        $expectedDone = $this->remainig < 1 ? $this->quantity : $this->daily_target * $daysPassed;
       return $this->total_done < $expectedDone;
        /*return [
        'startdate' =>  $startDate ,
        'daysPassed' =>  $daysPassed ,
        'expectedDone' =>  $expectedDone ,
        'total_done' => $this->total_done,
        'daily_target' => $this->daily_target,
       ]; */
    }

    protected $appends = [
    'DailyQuantity',
    'isBehindSchedule' , 
    'duration_days',
    'daily_target',
    'total_done',
    'remaining',
    'users_count',
];
}
