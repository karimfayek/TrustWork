<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyExpense extends Model
{
    protected $fillable = [
        'category_id',
        'amount',
        'description',
        'expense_date',
        'payment_method',
        'reference_no',
        'project_id',
        'stored_by',
        'file_path'
    ];

    public function category()
    {
        return $this->belongsTo(ExpenseCategory::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function storedBy()
    {
        return $this->belongsTo(User::class, 'stored_by');
    }
}
