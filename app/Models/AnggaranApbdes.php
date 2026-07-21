<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'tahun',
    'jenis',
    'kategori',
    'jumlah_anggaran',
    'jumlah_realisasi',
])]
class AnggaranApbdes extends Model
{
    use HasFactory;

    protected $table = 'anggaran_apbdes';
}
