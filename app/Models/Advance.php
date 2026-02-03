<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Advance extends Model
{
    protected $fillable = [
        'amount',
        'user_id',
        'given_at',
        'note',
        'project_id',
        'status',
        'method',
        'given_by'
    ];
    protected $appends = ['is_opened'];
    public function scopeAccepted($query)
    {
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

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
    public function totalExpenses()
    {
        return $this->expenses()->sum('amount');
    }
    public function getIsOpenedAttribute()
    {
        $expensesSum = $this->relationLoaded('expenses')
            ? $this->expenses->sum('amount')
            : $this->expenses()->sum('amount');

        return $expensesSum < $this->amount;
    }
}
