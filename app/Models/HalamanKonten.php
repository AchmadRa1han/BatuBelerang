<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HalamanKonten extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'kategori',
        'judul',
        'subjudul',
        'isi',
        'meta_json',
    ];

    protected $casts = [
        'meta_json' => 'array',
    ];
}
