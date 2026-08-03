<?php

use App\Models\AgendaDesa;
use App\Models\Dusun;
use App\Models\HalamanKonten;
use App\Models\JenisSurat;
use App\Models\KartuKeluarga;
use App\Models\Penduduk;
use App\Models\Pengaduan;
use App\Models\PermohonanSurat;
use App\Models\Regulasi;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;

uses(RefreshDatabase::class);

test('authenticated admin can perform Dusun CRUD', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('admin.dusun.store'), [
            'nama' => 'Dusun Baji Nangka',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('dusun', ['nama' => 'Dusun Baji Nangka']);
    $dusun = Dusun::where('nama', 'Dusun Baji Nangka')->first();

    $response = $this->actingAs($user)
        ->put(route('admin.dusun.update', $dusun->id), [
            'nama' => 'Dusun Baru',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('dusun', ['id' => $dusun->id, 'nama' => 'Dusun Baru']);

    $response = $this->actingAs($user)
        ->delete(route('admin.dusun.delete', $dusun->id));

    $response->assertRedirect();
    $this->assertDatabaseMissing('dusun', ['id' => $dusun->id]);
});

test('authenticated admin can perform Kartu Keluarga CRUD', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('admin.kartu-keluarga.store'), [
            'no_kk' => '1234567890123456',
            'alamat' => 'Jalan Poros Desa',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('kartu_keluarga', ['no_kk' => '1234567890123456']);
    $kk = KartuKeluarga::where('no_kk', '1234567890123456')->first();

    $response = $this->actingAs($user)
        ->put(route('admin.kartu-keluarga.update', $kk->id), [
            'no_kk' => '9876543210987654',
            'alamat' => 'Jalan Baru',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('kartu_keluarga', ['id' => $kk->id, 'no_kk' => '9876543210987654', 'alamat' => 'Jalan Baru']);

    $response = $this->actingAs($user)
        ->delete(route('admin.kartu-keluarga.delete', $kk->id));

    $response->assertRedirect();
    $this->assertDatabaseMissing('kartu_keluarga', ['id' => $kk->id]);
});

test('authenticated admin can perform Penduduk CRUD', function () {
    $user = User::factory()->create();
    $dusun = Dusun::create(['nama' => 'Dusun Tes']);
    $kk = KartuKeluarga::create(['no_kk' => '1111222233334444', 'alamat' => 'Tes']);

    $response = $this->actingAs($user)
        ->post(route('admin.penduduk.store'), [
            'nik' => '1234567890123456',
            'nama' => 'Budi Santoso',
            'jenis_kelamin' => 'L',
            'tempat_lahir' => 'Sinjai',
            'tanggal_lahir' => '1990-05-15',
            'golongan_darah' => 'O',
            'agama' => 'Islam',
            'status_perkawinan' => 'belum_kawin',
            'kartu_keluarga_id' => $kk->id,
            'dusun_id' => $dusun->id,
            'rt' => '01',
            'rw' => '02',
            'alamat' => 'Alamat Budi',
            'status_warga' => 'aktif',
            'is_hamil' => false,
            'is_stunting' => false,
            'is_disabilitas' => false,
            'is_penerima_bansos' => true,
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('penduduk', ['nik' => '1234567890123456', 'nama' => 'Budi Santoso']);
    $penduduk = Penduduk::where('nik', '1234567890123456')->first();

    $response = $this->actingAs($user)
        ->put(route('admin.penduduk.update', $penduduk->id), [
            'nik' => '1234567890123456',
            'nama' => 'Budi Santoso Update',
            'jenis_kelamin' => 'L',
            'tempat_lahir' => 'Sinjai',
            'tanggal_lahir' => '1990-05-15',
            'golongan_darah' => 'A',
            'agama' => 'Islam',
            'status_perkawinan' => 'kawin',
            'kartu_keluarga_id' => $kk->id,
            'dusun_id' => $dusun->id,
            'rt' => '02',
            'rw' => '02',
            'alamat' => 'Alamat Budi Update',
            'status_warga' => 'aktif',
            'is_hamil' => false,
            'is_stunting' => false,
            'is_disabilitas' => false,
            'is_penerima_bansos' => false,
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('penduduk', ['id' => $penduduk->id, 'nama' => 'Budi Santoso Update', 'status_perkawinan' => 'kawin']);

    $response = $this->actingAs($user)
        ->delete(route('admin.penduduk.delete', $penduduk->id));

    $response->assertRedirect();
    $this->assertDatabaseMissing('penduduk', ['id' => $penduduk->id]);
});

test('authenticated admin can perform Jenis Surat CRUD', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('admin.jenis-surat.store'), [
            'kode' => 'SKU',
            'nama' => 'Surat Keterangan Usaha',
            'deskripsi' => 'Persyaratan usaha',
            'is_aktif' => true,
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('jenis_surat', ['kode' => 'SKU']);
    $js = JenisSurat::where('kode', 'SKU')->first();

    $response = $this->actingAs($user)
        ->put(route('admin.jenis-surat.update', $js->id), [
            'kode' => 'SKU_EDIT',
            'nama' => 'Surat Keterangan Usaha Edit',
            'deskripsi' => 'Persyaratan usaha edit',
            'is_aktif' => false,
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('jenis_surat', ['id' => $js->id, 'kode' => 'SKU_EDIT', 'is_aktif' => false]);

    $response = $this->actingAs($user)
        ->delete(route('admin.jenis-surat.delete', $js->id));

    $response->assertRedirect();
    $this->assertDatabaseMissing('jenis_surat', ['id' => $js->id]);
});

test('authenticated admin can verify Permohonan Surat', function () {
    $user = User::factory()->create();
    $dusun = Dusun::create(['nama' => 'Dusun Tes']);
    $penduduk = Penduduk::create([
        'nik' => '1111222233334444',
        'nama' => 'Warga Tes',
        'jenis_kelamin' => 'L',
        'tempat_lahir' => 'Sinjai',
        'tanggal_lahir' => '1995-10-10',
        'golongan_darah' => 'O',
        'agama' => 'Islam',
        'status_perkawinan' => 'belum_kawin',
        'dusun_id' => $dusun->id,
        'rt' => '01',
        'rw' => '01',
        'alamat' => 'Alamat Warga',
        'status_warga' => 'aktif',
    ]);
    $js = JenisSurat::create([
        'kode' => 'SKP',
        'nama' => 'Surat Keterangan Pengantar',
        'deskripsi' => 'Pengantar',
        'is_aktif' => true,
    ]);
    $permohonan = PermohonanSurat::create([
        'penduduk_id' => $penduduk->id,
        'jenis_surat_id' => $js->id,
        'data_formulir' => ['keterangan' => 'Keperluan tes'],
        'status' => 'menunggu_persetujuan',
    ]);

    $response = $this->actingAs($user)
        ->post(route('admin.permohonan-surat.status', $permohonan->id), [
            'status' => 'disetujui',
            'catatan_admin' => 'Dokumen lengkap dan valid',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('permohonan_surat', [
        'id' => $permohonan->id,
        'status' => 'disetujui',
        'catatan_admin' => 'Dokumen lengkap dan valid',
    ]);

    $updated = PermohonanSurat::find($permohonan->id);
    expect($updated->status)->toBe('disetujui');
    expect($updated->catatan_admin)->toBe('Dokumen lengkap dan valid');
    expect($updated->disetujui_oleh_user_id)->toBe($user->id);
    expect($updated->disetujui_pada)->not->toBeNull();
});

test('authenticated admin can reply to Pengaduan', function () {
    $user = User::factory()->create();
    $dusun = Dusun::create(['nama' => 'Dusun Tes']);
    $penduduk = Penduduk::create([
        'nik' => '1111222233334444',
        'nama' => 'Warga Tes',
        'jenis_kelamin' => 'L',
        'tempat_lahir' => 'Sinjai',
        'tanggal_lahir' => '1995-10-10',
        'golongan_darah' => 'O',
        'agama' => 'Islam',
        'status_perkawinan' => 'belum_kawin',
        'dusun_id' => $dusun->id,
        'rt' => '01',
        'rw' => '01',
        'alamat' => 'Alamat Warga',
        'status_warga' => 'aktif',
    ]);
    $pengaduan = Pengaduan::create([
        'penduduk_id' => $penduduk->id,
        'judul' => 'Jalan Rusak',
        'isi' => 'Mohon jalan diperbaiki segera.',
        'is_anonim' => false,
        'status' => 'terkirim',
    ]);

    $response = $this->actingAs($user)
        ->post(route('admin.pengaduan.tanggapan', $pengaduan->id), [
            'status' => 'diproses',
            'tanggapan_admin' => 'Akan dikoordinasikan dengan dinas terkait.',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('pengaduan', [
        'id' => $pengaduan->id,
        'status' => 'diproses',
        'tanggapan_admin' => 'Akan dikoordinasikan dengan dinas terkait.',
    ]);
});

test('authenticated admin can update and delete Regulasi', function () {
    $user = User::factory()->create();
    $reg = Regulasi::create([
        'judul' => 'Regulasi Awal',
        'jenis' => 'perdes',
        'tahun' => 2025,
        'nomor' => '01/2025',
    ]);

    $response = $this->actingAs($user)
        ->put(route('admin.regulasi.update', $reg->id), [
            'judul' => 'Regulasi Update',
            'jenis' => 'perdes',
            'tahun' => 2026,
            'nomor' => '01/2026',
            'deskripsi' => 'Deskripsi Baru',
            'status' => true,
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('regulasi', ['id' => $reg->id, 'judul' => 'Regulasi Update', 'tahun' => 2026]);

    $response = $this->actingAs($user)
        ->delete(route('admin.regulasi.delete', $reg->id));

    $response->assertRedirect();
    $this->assertDatabaseMissing('regulasi', ['id' => $reg->id]);
});

test('authenticated admin can update and delete Agenda', function () {
    $user = User::factory()->create();
    $agenda = AgendaDesa::create([
        'judul' => 'Agenda Awal',
        'lokasi' => 'Aula Kantor Desa',
        'waktu_mulai' => '2026-08-01 09:00:00',
    ]);

    $response = $this->actingAs($user)
        ->put(route('admin.agenda.update', $agenda->id), [
            'judul' => 'Agenda Update',
            'lokasi' => 'Lapangan Desa',
            'waktu_mulai' => '2026-08-02 10:00:00',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('agenda_desa', ['id' => $agenda->id, 'judul' => 'Agenda Update', 'lokasi' => 'Lapangan Desa']);

    $response = $this->actingAs($user)
        ->delete(route('admin.agenda.delete', $agenda->id));

    $response->assertRedirect();
    $this->assertDatabaseMissing('agenda_desa', ['id' => $agenda->id]);
});

test('authenticated admin can edit and update Halaman Konten', function () {
    $user = User::factory()->create();
    $halaman = HalamanKonten::create([
        'judul' => 'Visi Misi Awal',
        'slug' => 'profil-visi-misi-test',
        'kategori' => 'Profil Desa',
        'subjudul' => 'Sub Visi Misi',
        'isi' => 'Konten awal',
    ]);

    $response = $this->actingAs($user)
        ->get(route('admin.halaman.edit', 'profil-visi-misi-test'));

    $response->assertOk();

    $response = $this->actingAs($user)
        ->post(route('admin.halaman.update', 'profil-visi-misi-test'), [
            'judul' => 'Visi Misi Update',
            'subjudul' => 'Sub Visi Misi Update',
            'isi' => 'Konten update',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('halaman_kontens', [
        'slug' => 'profil-visi-misi-test',
        'judul' => 'Visi Misi Update',
        'subjudul' => 'Sub Visi Misi Update',
        'isi' => 'Konten update',
    ]);
});

test('authenticated admin can export and import residents via Excel', function () {
    $user = User::factory()->create();
    $dusun = Dusun::create(['nama' => 'Dusun Tes']);

    // Create a resident
    $penduduk = Penduduk::create([
        'nik' => '9999888877776666',
        'nama' => 'Warga Ekspor',
        'jenis_kelamin' => 'L',
        'tempat_lahir' => 'Sinjai',
        'tanggal_lahir' => '1990-01-01',
        'golongan_darah' => 'O',
        'agama' => 'Islam',
        'status_perkawinan' => 'belum_kawin',
        'dusun_id' => $dusun->id,
        'rt' => '001',
        'rw' => '001',
        'alamat' => 'Jalan Ekspor',
        'status_warga' => 'aktif',
    ]);

    // Test export
    $response = $this->actingAs($user)
        ->get(route('admin.penduduk.export'));

    $response->assertOk();
    $response->assertHeader('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Test import
    $bipFilePath = base_path('BIP BATU BELERANG.xls');

    $uploadedFile = new UploadedFile(
        $bipFilePath,
        'BIP BATU BELERANG.xls',
        'application/vnd.ms-excel',
        null,
        true
    );

    $response = $this->actingAs($user)
        ->post(route('admin.penduduk.import'), [
            'file' => $uploadedFile,
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    // Check that some seed records exist
    $this->assertDatabaseHas('penduduk', [
        'nik' => '7307072805630001',
        'nama' => 'ABD. KADIR',
    ]);
});
