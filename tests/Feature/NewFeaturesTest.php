<?php

use App\Models\AgendaDesa;
use App\Models\AnggotaKelompok;
use App\Models\KehadiranAparatur;
use App\Models\KelompokWarga;
use App\Models\Regulasi;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

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

test('can create a kelompok warga and add members', function () {
    // Seed a resident first because of foreign key constraint
    $dusunId = DB::table('dusun')->insertGetId([
        'nama' => 'Dusun Test',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $pendudukId = DB::table('penduduk')->insertGetId([
        'nik' => '1234567890123456',
        'nama' => 'Warga Test',
        'jenis_kelamin' => 'L',
        'tempat_lahir' => 'Sinjai',
        'tanggal_lahir' => '1990-01-01',
        'golongan_darah' => 'O',
        'agama' => 'Islam',
        'status_perkawinan' => 'belum_kawin',
        'dusun_id' => $dusunId,
        'rt' => '001',
        'rw' => '002',
        'alamat' => 'Jl. Test No. 1',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $kelompok = KelompokWarga::factory()->create();

    $anggota = AnggotaKelompok::factory()->create([
        'kelompok_warga_id' => $kelompok->id,
        'penduduk_id' => $pendudukId,
        'jabatan' => 'Ketua',
    ]);

    expect(KelompokWarga::count())->toBe(1);
    expect(AnggotaKelompok::count())->toBe(1);

    // Check relations
    expect($kelompok->penduduk()->first()->nama)->toBe('Warga Test');
    expect($anggota->kelompokWarga->id)->toBe($kelompok->id);
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
