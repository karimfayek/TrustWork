<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Extraction extends Model
{
    protected $fillable = [
        'project_id', 'type', 'date', 'deductions', 'customer_name', 
        'notes','project_code','partial_number','deductions_json','net_total','supply','file','is_collected'
    ];
    protected $casts = [
        'deductions_json' => 'array',
    ];

    public function invoices() {
        return $this->hasMany(Invoice::class);
    }

    public function items()
    {
      return $this->hasMany(ExtractionItem::class);
    }
    public function project()
    {
      return $this->belongsTo(Project::class);
    }
    
}
