<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskUser extends Model
{
    protected $table = 'task_user';


    public function user() {
        return $this->belongsTo(User::class);
       }

       public function project() {
        return $this->belongsTo(Project::class);
       }
       public function task() {
        return $this->belongsTo(Task::class);
       }
}
