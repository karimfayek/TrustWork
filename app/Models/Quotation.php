<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    protected $fillable = [
        'quotation_number',
        'quotation_date',
        'company_name',
        'total',
        'notes',
        'user_id',
        'body',
    ];

    public function items()
    {
        return $this->hasMany(QuotationItem::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
