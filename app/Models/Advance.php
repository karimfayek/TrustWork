<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Advance extends Model
{
    protected $fillable = [
        'amount', 'user_id' , 'given_at','note','project_id','status', 'method'
    ];

    public function scopeAccepted($query) {
        return $query->where('status', 'accepted');
    }
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
