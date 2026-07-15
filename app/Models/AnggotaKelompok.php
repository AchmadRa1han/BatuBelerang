<?php

namespace App\Models;

use Database\Factories\AnggotaKelompokFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnggotaKelompok extends Model
{
    /** @use HasFactory<AnggotaKelompokFactory> */
    use HasFactory;

    protected $table = 'anggota_kelompok';

    protected $fillable = [
        'kelompok_warga_id',
        'penduduk_id',
        'jabatan',
        'tanggal_bergabung',
    ];

    protected $casts = [
        'tanggal_bergabung' => 'date',
    ];

    /**
     * Get the resident group this membership belongs to.
     *
     * @return BelongsTo<KelompokWarga, $this>
     */
    public function kelompokWarga(): BelongsTo
    {
        return $this->belongsTo(KelompokWarga::class, 'kelompok_warga_id');
    }

    /**
     * Get the resident details.
     *
     * @return BelongsTo<Penduduk, $this>
     */
    public function penduduk(): BelongsTo
    {
        return $this->belongsTo(Penduduk::class, 'penduduk_id');
    }
}
