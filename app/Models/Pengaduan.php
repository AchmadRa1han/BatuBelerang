<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pengaduan extends Model
{
    protected $table = 'pengaduan';

    protected $fillable = [
        'penduduk_id',
        'judul',
        'isi',
        'foto_path',
        'is_anonim',
        'status',
        'tanggapan_admin',
    ];

    protected $casts = [
        'is_anonim' => 'boolean',
    ];

    /**
     * Get the penduduk who filed the complaint, if not anonymous.
     */
    public function penduduk(): BelongsTo
    {
        return $this->belongsTo(Penduduk::class, 'penduduk_id');
    }
}
