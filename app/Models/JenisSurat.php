<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JenisSurat extends Model
{
    protected $table = 'jenis_surat';

    protected $fillable = [
        'kode',
        'nama',
        'deskripsi',
        'is_aktif',
    ];

    protected $casts = [
        'is_aktif' => 'boolean',
    ];

    /**
     * Get the permohonan surat for this type.
     */
    public function permohonan(): HasMany
    {
        return $this->hasMany(PermohonanSurat::class, 'jenis_surat_id');
    }
}
