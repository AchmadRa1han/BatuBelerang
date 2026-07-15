<?php

namespace App\Models;

use Database\Factories\KehadiranAparaturFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KehadiranAparatur extends Model
{
    /** @use HasFactory<KehadiranAparaturFactory> */
    use HasFactory;

    protected $table = 'kehadiran_aparatur';

    protected $fillable = [
        'user_id',
        'tanggal',
        'jam_masuk',
        'jam_pulang',
        'status',
        'keterangan',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    /**
     * Get the user (apparatus) who owns the attendance record.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
