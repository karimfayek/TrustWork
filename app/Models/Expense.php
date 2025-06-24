<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = [
        'amount', 'user_id' , 'description','spent_at','location','asa','file_path', 'advance_id', 'stored_by'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function by()
    {
        return $this->belongsTo(User::class , 'stored_by');
    }
    public function advance()
    {
        return $this->belongsTo(Advance::class);
    }
}
