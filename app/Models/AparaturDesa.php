<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'nama',
    'jabatan',
    'foto_path',
    'urutan',
    'status',
])]
class AparaturDesa extends Model
{
    use HasFactory;

    protected $table = 'aparatur_desa';

    protected function casts(): array
    {
        return [
            'status' => 'boolean',
            'urutan' => 'integer',
        ];
    }
}
