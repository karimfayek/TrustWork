<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $fillable = ['name','location','manager_id'];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'warehouse_product')->withPivot('quantity')->withTimestamps();
    }

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
}
