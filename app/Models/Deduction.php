<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deduction extends Model
{
    protected $fillable = ['user_id', 'type', 'amount', 'note', 'deducted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
