<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'amount',
        'reason',
        'loan_date',
        'status',
        'admin_status',
        'notes',
    ];

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
        
    }
}
