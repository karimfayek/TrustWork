<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = [
        'amount', 'user_id' , 'description','spent_at','location','asa','file_path'
    ];
}
