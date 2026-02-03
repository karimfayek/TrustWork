<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'parent_id'];

    public function products()
    {
        return $this->hasMany(NordenProduct::class);
    }
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
    public function allChildrenIds()
    {
        $ids = $this->children()->pluck('id')->toArray();

        foreach ($this->children as $child) {
            $ids = array_merge($ids, $child->allChildrenIds());
        }

        return $ids;
    }

}
