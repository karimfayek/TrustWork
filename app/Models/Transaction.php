<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['item_id', 'type', 'quantity', 'note'];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
