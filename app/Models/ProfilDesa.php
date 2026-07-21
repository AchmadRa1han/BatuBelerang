<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'nama_desa',
    'nama_kecamatan',
    'nama_kabupaten',
    'nama_provinsi',
    'sejarah',
    'visi',
    'misi',
    'alamat_kantor',
    'logo_path',
    'koordinat_kantor',
    'telepon',
    'email',
    'nama_kades',
    'jabatan_kades',
    'sambutan_kades',
    'foto_kades',
    'hero_title',
    'hero_subtitle',
])]
class ProfilDesa extends Model
{
    use HasFactory;

    protected $table = 'profil_desa';

    protected function casts(): array
    {
        return [
            'misi' => 'array',
        ];
    }
}
