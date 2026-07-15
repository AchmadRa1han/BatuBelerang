<?php

namespace App\Models;

use Database\Factories\KelompokWargaFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KelompokWarga extends Model
{
    /** @use HasFactory<KelompokWargaFactory> */
    use HasFactory;

    protected $table = 'kelompok_warga';

    protected $fillable = [
        'nama',
        'kode',
        'kategori',
        'deskripsi',
    ];

    /**
     * Get the members (relationship table records) for the group.
     *
     * @return HasMany<AnggotaKelompok, $this>
     */
    public function anggota(): HasMany
    {
        return $this->hasMany(AnggotaKelompok::class, 'kelompok_warga_id');
    }

    /**
     * Get the residents belonging to this group.
     *
     * @return BelongsToMany<Penduduk, $this>
     */
    public function penduduk(): BelongsToMany
    {
        // Assuming Penduduk model exists or will exist.
        // Let's define the belongsToMany relation through the anggota_kelompok table
        return $this->belongsToMany(
            Penduduk::class,
            'anggota_kelompok',
            'kelompok_warga_id',
            'penduduk_id'
        )->withPivot('jabatan', 'tanggal_bergabung')->withTimestamps();
    }
}
