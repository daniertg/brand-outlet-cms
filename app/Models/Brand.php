<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    protected $fillable = [
        'name',
        'description',
        'logo',
    ];

    public function outlets(): HasMany
    {
        return $this->hasMany(Outlet::class);
    }
}
