<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dusun extends Model
{
    protected $table = 'dusun';

    protected $fillable = [
        'nama',
        'kepala_dusun_id',
    ];

    /**
     * Get the kepala dusun associated with the dusun.
     */
    public function kepalaDusun(): BelongsTo
    {
        return $this->belongsTo(Penduduk::class, 'kepala_dusun_id');
    }

    /**
     * Get the penduduk in the dusun.
     */
    public function penduduk(): HasMany
    {
        return $this->hasMany(Penduduk::class, 'dusun_id');
    }
}
