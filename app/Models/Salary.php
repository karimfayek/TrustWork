<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    protected $fillable = [
        'name',
        'email',
        'password',
        'base_salary',
        'final_salary'
    ];

    public function user()
{
    return $this->belongsTo(User::class);
}
}
