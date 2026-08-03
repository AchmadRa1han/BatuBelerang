<?php

use App\Models\AgendaDesa;
use App\Models\KehadiranAparatur;
use App\Models\Regulasi;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('can create and persist a regulasi', function () {
    $regulasi = Regulasi::factory()->create([
        'judul' => 'Peraturan Pemandian Air Belerang',
        'jenis' => 'perdes',
        'tahun' => 2026,
    ]);

    expect(Regulasi::count())->toBe(1);
    expect($regulasi->judul)->toBe('Peraturan Pemandian Air Belerang');
});

test('can create agenda desa', function () {
    $agenda = AgendaDesa::factory()->create([
        'judul' => 'Rapat Koordinasi UMKM',
    ]);

    expect(AgendaDesa::count())->toBe(1);
    expect($agenda->judul)->toBe('Rapat Koordinasi UMKM');
});

test('can create kehadiran aparatur', function () {
    $kehadiran = KehadiranAparatur::factory()->create([
        'status' => 'hadir',
    ]);

    expect(KehadiranAparatur::count())->toBe(1);
    expect($kehadiran->status)->toBe('hadir');
});
