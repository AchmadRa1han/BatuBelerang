<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KartuKeluarga extends Model
{
    protected $table = 'kartu_keluarga';

    protected $fillable = [
        'no_kk',
        'nik_kepala_keluarga',
        'alamat',
    ];

    /**
     * Get the anggota keluarga associated with this KK.
     */
    public function anggota(): HasMany
    {
        return $this->hasMany(Penduduk::class, 'kartu_keluarga_id');
    }

    /**
     * Get the kepala keluarga associated with this KK.
     */
    public function kepalaKeluarga(): BelongsTo
    {
        return $this->belongsTo(Penduduk::class, 'nik_kepala_keluarga', 'nik');
    }
}
