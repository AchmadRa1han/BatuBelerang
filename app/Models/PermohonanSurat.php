<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PermohonanSurat extends Model
{
    protected $table = 'permohonan_surat';

    protected $fillable = [
        'penduduk_id',
        'jenis_surat_id',
        'data_formulir',
        'status',
        'catatan_admin',
        'disetujui_oleh_user_id',
        'disetujui_pada',
    ];

    protected $casts = [
        'data_formulir' => 'array',
        'disetujui_pada' => 'datetime',
    ];

    /**
     * Get the penduduk who requested the letter.
     */
    public function penduduk(): BelongsTo
    {
        return $this->belongsTo(Penduduk::class, 'penduduk_id');
    }

    /**
     * Get the type of letter.
     */
    public function jenisSurat(): BelongsTo
    {
        return $this->belongsTo(JenisSurat::class, 'jenis_surat_id');
    }

    /**
     * Get the user (admin) who approved the letter.
     */
    public function disetujuiOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'disetujui_oleh_user_id');
    }
}
