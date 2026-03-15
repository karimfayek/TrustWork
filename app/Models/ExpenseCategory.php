<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpenseCategory extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];
    public function expenses()
    {
        return $this->hasMany(CompanyExpense::class, 'category_id');
    }
    //sum expenses
    public function totalExpenses()
    {
        return $this->expenses()->sum('amount');
    }
}
