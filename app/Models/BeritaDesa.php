<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'judul',
    'slug',
    'kategori',
    'ringkasan',
    'isi',
    'foto_path',
    'tanggal_publikasi',
    'is_headline',
    'status',
])]
class BeritaDesa extends Model
{
    use HasFactory;

    protected $table = 'berita_desa';

    protected function casts(): array
    {
        return [
            'is_headline' => 'boolean',
            'tanggal_publikasi' => 'date',
        ];
    }
}
