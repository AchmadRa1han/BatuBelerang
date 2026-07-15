<?php

namespace App\Models;

use Database\Factories\RegulasiFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regulasi extends Model
{
    /** @use HasFactory<RegulasiFactory> */
    use HasFactory;

    protected $table = 'regulasi';

    protected $fillable = [
        'judul',
        'jenis',
        'tahun',
        'nomor',
        'deskripsi',
        'file_path',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];
}
