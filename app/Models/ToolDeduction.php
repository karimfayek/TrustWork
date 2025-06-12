<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ToolDeduction extends Model
{
    protected $fillable = [
        'tool_assignment_id',
        'amount',
        'processed',
    ];
    public function assignment()
{
    return $this->belongsTo(ToolAssignment::class);
}

}
