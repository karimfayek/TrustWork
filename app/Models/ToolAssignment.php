<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ToolAssignment extends Model
{
    protected $fillable = [
        'tool_id',
        'user_id',
        'quantity',
        'assigned_at',
        'status',
        'lost_at',
    ];
    public function tool()
{
    return $this->belongsTo(Tool::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}

public function deduction()
{
    return $this->hasOne(ToolDeduction::class);
}

}
