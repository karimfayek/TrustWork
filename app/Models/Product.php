<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name','code','unit','minimum_stock'];

    public function warehouses()
    {
        return $this->belongsToMany(Warehouse::class, 'warehouse_product')->withPivot('quantity')->withTimestamps();
    }

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }
}
