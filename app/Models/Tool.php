<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    protected $fillable = [
        'name',
        'estimated_value',
        'description',
        'qty'
    ];
    public function assignments()
{
    return $this->hasMany(ToolAssignment::class);
}
}
