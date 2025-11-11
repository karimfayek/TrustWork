<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WarehouseProduct extends Model
{
   protected $table = 'warehouse_product';
    protected $fillable = ['warehouse_id','product_id','quantity'];
}
