<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Penduduk extends Model
{
    protected $table = 'penduduk';

    protected $fillable = [
        'nik',
        'nama',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'golongan_darah',
        'agama',

        'status_perkawinan',
        'kartu_keluarga_id',
        'dusun_id',
        'rt',
        'rw',
        'alamat',
        'status_warga',
        'is_hamil',
        'is_stunting',
        'is_disabilitas',
        'jenis_disabilitas',
        'is_penerima_bansos',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'is_hamil' => 'boolean',
        'is_stunting' => 'boolean',
        'is_disabilitas' => 'boolean',
        'is_penerima_bansos' => 'boolean',
    ];

    /**
     * Get the kartu keluarga of this penduduk.
     */
    public function kartuKeluarga(): BelongsTo
    {
        return $this->belongsTo(KartuKeluarga::class, 'kartu_keluarga_id');
    }

    /**
     * Get the dusun of this penduduk.
     */
    public function dusun(): BelongsTo
    {
        return $this->belongsTo(Dusun::class, 'dusun_id');
    }

    /**
     * Get the permohonan surat requested by this penduduk.
     */
    public function permohonanSurat(): HasMany
    {
        return $this->hasMany(PermohonanSurat::class, 'penduduk_id');
    }

    /**
     * Get the pengaduan filed by this penduduk.
     */
    public function pengaduan(): HasMany
    {
        return $this->hasMany(Pengaduan::class, 'penduduk_id');
    }
}
