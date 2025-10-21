<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['name', 'unit', 'quantity', 'alert_quantity'];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}

