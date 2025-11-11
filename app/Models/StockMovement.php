<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    protected $fillable = [
        'warehouse_id','product_id','type','quantity','project_id','supplier_id','employee_id','note'
    ];

    public function warehouse() { return $this->belongsTo(Warehouse::class); }
    public function product() { return $this->belongsTo(Product::class); }
    public function project() { return $this->belongsTo(Project::class); }
}
