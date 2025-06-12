<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskProgress extends Model
{
    protected $fillable = [
        'task_id',
        'user_id',
        'quantity_done',
        'date'
    ];
   
public function task()
{
    return $this->belongsTo(Task::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}

}
