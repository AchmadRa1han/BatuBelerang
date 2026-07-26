<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penduduk extends Model
{
    protected $table = 'penduduk';

    protected $fillable = [
        'nik',
        'nama',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'golongan_darah',
        'agama',

        'status_perkawinan',
        'kartu_keluarga_id',
        'dusun_id',
        'rt',
        'rw',
        'alamat',
        'status_warga',
        'is_hamil',
        'is_stunting',
        'is_disabilitas',
        'jenis_disabilitas',
        'is_penerima_bansos',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'is_hamil' => 'boolean',
        'is_stunting' => 'boolean',
        'is_disabilitas' => 'boolean',
        'is_penerima_bansos' => 'boolean',
    ];
}
