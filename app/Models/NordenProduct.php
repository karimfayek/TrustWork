<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NordenProduct extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'cost_price',
        'category_id',
        'part_number',
        'data_sheet',
        'image',
        'stock',
        'quantity'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
