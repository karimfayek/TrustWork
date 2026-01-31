<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuotationItem extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'norden_product_id',
        'quantity',
        'unit_price',
        'total',
    ];

    public function product()
    {
        return $this->belongsTo(NordenProduct::class, 'norden_product_id');
    }
}
