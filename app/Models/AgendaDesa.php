<?php

namespace App\Models;

use Database\Factories\AgendaDesaFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgendaDesa extends Model
{
    /** @use HasFactory<AgendaDesaFactory> */
    use HasFactory;

    protected $table = 'agenda_desa';

    protected $fillable = [
        'judul',
        'deskripsi',
        'lokasi',
        'waktu_mulai',
        'waktu_selesai',
        'koordinator',
    ];

    protected $casts = [
        'waktu_mulai' => 'datetime',
        'waktu_selesai' => 'datetime',
    ];
}
