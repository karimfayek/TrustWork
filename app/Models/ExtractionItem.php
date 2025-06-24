<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExtractionItem extends Model
{
    protected $fillable = [
        'extraction_id ', 'title', 'unit', 'quantity',
         'previous_done', 'current_done','total_done','unit_price','progress_percentage', 'total'
    ];
}
