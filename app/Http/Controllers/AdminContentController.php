<?php

namespace App\Http\Controllers;

use App\Models\AgendaDesa;
use App\Models\AnggaranApbdes;
use App\Models\AparaturDesa;
use App\Models\BeritaDesa;
use App\Models\Dusun;
use App\Models\HalamanKonten;
use App\Models\JenisSurat;
use App\Models\KartuKeluarga;
use App\Models\Penduduk;
use App\Models\Pengaduan;
use App\Models\PermohonanSurat;
use App\Models\ProfilDesa;
use App\Models\Regulasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class AdminContentController extends Controller
{
    /**
     * Update profil desa and homepage banner settings.
     */
    public function updateProfil(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama_desa' => 'nullable|string|max:255',
            'nama_kecamatan' => 'nullable|string|max:255',
            'nama_kabupaten' => 'nullable|string|max:255',
            'nama_provinsi' => 'nullable|string|max:255',
            'sejarah' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|array',
            'alamat_kantor' => 'nullable|string',
            'telepon' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'nama_kades' => 'nullable|string|max:255',
            'jabatan_kades' => 'nullable|string|max:255',
            'sambutan_kades' => 'nullable|string',
            'foto_kades' => 'nullable|string',
            'foto_kades_file' => 'nullable|image|max:5120',
            'foto_kades_base64' => 'nullable|string',
            'hero_title' => 'nullable|string|max:255',
            'hero_subtitle' => 'nullable|string',
            'hero_bg_path' => 'nullable|string',
            'hero_bg_file' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('foto_kades_file')) {
            $path = $request->file('foto_kades_file')->store('aparatur', 'public');
            $validated['foto_kades'] = '/storage/'.$path;
        } elseif (! empty($request->input('foto_kades_base64'))) {
            $imageParts = explode(';base64,', $request->input('foto_kades_base64'));
            if (count($imageParts) === 2) {
                $imageType = str_contains($imageParts[0], 'png') ? 'png' : 'jpg';
                $imageData = base64_decode($imageParts[1]);
                $filename = 'kades_'.time().'_'.Str::random(6).'.'.$imageType;
                Storage::disk('public')->put('aparatur/'.$filename, $imageData);
                $validated['foto_kades'] = '/storage/aparatur/'.$filename;
            }
        }

        if ($request->hasFile('hero_bg_file')) {
            $path = $request->file('hero_bg_file')->store('hero', 'public');
            $validated['hero_bg_path'] = '/storage/'.$path;
        }

        unset($validated['foto_kades_file'], $validated['foto_kades_base64'], $validated['hero_bg_file']);

        $profil = ProfilDesa::firstOrCreate(['id' => 1]);
        $profil->update(array_filter($validated, fn ($val) => ! is_null($val)));

        return back()->with('success', 'Profil desa & hero background berhasil diperbarui.');
    }

    /**
     * Store new Aparatur / Perangkat Desa.
     */
    public function storeAparatur(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'foto_file' => 'nullable|image|max:5120',
            'foto_base64' => 'nullable|string',
            'foto_path' => 'nullable|string',
            'urutan' => 'nullable|integer',
            'status' => 'boolean',
        ]);

        if ($request->hasFile('foto_file')) {
            $path = $request->file('foto_file')->store('aparatur', 'public');
            $validated['foto_path'] = '/storage/'.$path;
        } elseif (! empty($validated['foto_base64'])) {
            $imageParts = explode(';base64,', $validated['foto_base64']);
            if (count($imageParts) === 2) {
                $imageType = str_contains($imageParts[0], 'png') ? 'png' : 'jpg';
                $imageData = base64_decode($imageParts[1]);
                $filename = 'aparatur_'.time().'_'.Str::random(6).'.'.$imageType;
                Storage::disk('public')->put('aparatur/'.$filename, $imageData);
                $validated['foto_path'] = '/storage/aparatur/'.$filename;
            }
        }

        unset($validated['foto_file'], $validated['foto_base64']);

        AparaturDesa::create($validated);

        return back()->with('success', 'Perangkat Desa berhasil ditambahkan.');
    }

    /**
     * Update existing Aparatur / Perangkat Desa.
     */
    public function updateAparatur(Request $request, int $id): RedirectResponse
    {
        $aparatur = AparaturDesa::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'foto_file' => 'nullable|image|max:5120',
            'foto_base64' => 'nullable|string',
            'foto_path' => 'nullable|string',
            'urutan' => 'nullable|integer',
            'status' => 'boolean',
        ]);

        if ($request->hasFile('foto_file')) {
            $path = $request->file('foto_file')->store('aparatur', 'public');
            $validated['foto_path'] = '/storage/'.$path;
        } elseif (! empty($validated['foto_base64'])) {
            $imageParts = explode(';base64,', $validated['foto_base64']);
            if (count($imageParts) === 2) {
                $imageType = str_contains($imageParts[0], 'png') ? 'png' : 'jpg';
                $imageData = base64_decode($imageParts[1]);
                $filename = 'aparatur_'.time().'_'.Str::random(6).'.'.$imageType;
                Storage::disk('public')->put('aparatur/'.$filename, $imageData);
                $validated['foto_path'] = '/storage/aparatur/'.$filename;
            }
        }

        unset($validated['foto_file'], $validated['foto_base64']);

        $aparatur->update($validated);

        return back()->with('success', 'Data Perangkat Desa berhasil diperbarui.');
    }

    /**
     * Delete Aparatur Desa.
     */
    public function deleteAparatur(int $id): RedirectResponse
    {
        $aparatur = AparaturDesa::findOrFail($id);
        $aparatur->delete();

        return back()->with('success', 'Perangkat Desa berhasil dihapus.');
    }

    /**
     * Store new Berita Desa.
     */
    public function storeBerita(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string|max:100',
            'ringkasan' => 'required|string',
            'isi' => 'nullable|string',
            'foto_path' => 'nullable|string',
            'tanggal_publikasi' => 'required|date',
            'is_headline' => 'boolean',
            'status' => 'required|in:draf,terbit',
        ]);

        $validated['slug'] = Str::slug($validated['judul']).'-'.time();
        BeritaDesa::create($validated);

        return back()->with('success', 'Berita desa berhasil dipublikasikan.');
    }

    /**
     * Update existing Berita Desa.
     */
    public function updateBerita(Request $request, int $id): RedirectResponse
    {
        $berita = BeritaDesa::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string|max:100',
            'ringkasan' => 'required|string',
            'isi' => 'nullable|string',
            'foto_path' => 'nullable|string',
            'tanggal_publikasi' => 'required|date',
            'is_headline' => 'boolean',
            'status' => 'required|in:draf,terbit',
        ]);

        $berita->update($validated);

        return back()->with('success', 'Berita desa berhasil diperbarui.');
    }

    /**
     * Delete Berita Desa.
     */
    public function deleteBerita(int $id): RedirectResponse
    {
        $berita = BeritaDesa::findOrFail($id);
        $berita->delete();

        return back()->with('success', 'Berita desa berhasil dihapus.');
    }

    /**
     * Update Keuangan APBDesa.
     */
    public function updateApbdes(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'tahun' => 'required|integer',
            'pendapatan_anggaran' => 'required|numeric|min:0',
            'pendapatan_realisasi' => 'required|numeric|min:0',
            'belanja_anggaran' => 'required|numeric|min:0',
            'belanja_realisasi' => 'required|numeric|min:0',
            'pembiayaan_anggaran' => 'required|numeric|min:0',
            'pembiayaan_realisasi' => 'required|numeric|min:0',
        ]);

        $tahun = $validated['tahun'];

        AnggaranApbdes::updateOrCreate(
            ['tahun' => $tahun, 'jenis' => 'pendapatan'],
            ['kategori' => 'Pendapatan Desa', 'jumlah_anggaran' => $validated['pendapatan_anggaran'], 'jumlah_realisasi' => $validated['pendapatan_realisasi']]
        );

        AnggaranApbdes::updateOrCreate(
            ['tahun' => $tahun, 'jenis' => 'belanja'],
            ['kategori' => 'Belanja Desa', 'jumlah_anggaran' => $validated['belanja_anggaran'], 'jumlah_realisasi' => $validated['belanja_realisasi']]
        );

        AnggaranApbdes::updateOrCreate(
            ['tahun' => $tahun, 'jenis' => 'pembiayaan'],
            ['kategori' => 'Pembiayaan Desa', 'jumlah_anggaran' => $validated['pembiayaan_anggaran'], 'jumlah_realisasi' => $validated['pembiayaan_realisasi']]
        );

        return back()->with('success', 'Data APBDesa berhasil diperbarui.');
    }

    /**
     * Store new Regulasi.
     */
    public function storeRegulasi(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'jenis' => 'required|in:perdes,perkades,sk_kades,instruksi',
            'tahun' => 'required|integer',
            'nomor' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
            'file_path' => 'nullable|string',
            'status' => 'boolean',
        ]);

        Regulasi::create($validated);

        return back()->with('success', 'Regulasi desa berhasil ditambahkan.');
    }

    /**
     * Store new Agenda Desa.
     */
    public function storeAgenda(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'lokasi' => 'required|string|max:255',
            'waktu_mulai' => 'required|date',
            'waktu_selesai' => 'nullable|date',
            'koordinator' => 'nullable|string|max:255',
        ]);

        AgendaDesa::create($validated);

        return back()->with('success', 'Agenda desa berhasil ditambahkan.');
    }

    /**
     * Show editor form for a specific Halaman Konten.
     */
    public function editHalaman(string $slug): Response
    {
        $halaman = HalamanKonten::where('slug', $slug)->firstOrFail();

        return Inertia::render('admin/halaman/edit', [
            'halaman' => $halaman,
        ]);
    }

    /**
     * Update Halaman Konten (Profil, Pemerintahan, Lembaga).
     */
    public function updateHalamanKonten(Request $request, string $slug): RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'subjudul' => 'nullable|string|max:255',
            'isi' => 'nullable|string',
        ]);

        $halaman = HalamanKonten::where('slug', $slug)->firstOrFail();
        $halaman->update($validated);

        return back()->with('success', "Konten Halaman {$halaman->judul} berhasil diperbarui.");
    }

    public function storeProduk(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'penduduk_id' => 'required|integer',
            'kategori_umkm_id' => 'required|integer',
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'nomor_whatsapp' => 'required|string|max:20',
            'foto_file' => 'required|image|max:5120',
            'status' => 'required|string|in:menunggu_verifikasi,aktif,non_aktif',
        ]);

        if ($request->hasFile('foto_file')) {
            $path = $request->file('foto_file')->store('umkm', 'public');
            $validated['foto_path'] = '/storage/'.$path;
        }

        unset($validated['foto_file']);

        $validated['slug'] = Str::slug($validated['nama']).'-'.rand(100, 999);
        $validated['created_at'] = now();
        $validated['updated_at'] = now();

        DB::table('produk_umkm')->insert($validated);

        return back()->with('success', 'Produk Pasar Maya berhasil ditambahkan.');
    }

    /**
     * Update existing Produk UMKM (Pasar Maya).
     */
    public function updateProduk(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'penduduk_id' => 'required|integer',
            'kategori_umkm_id' => 'required|integer',
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'nomor_whatsapp' => 'required|string|max:20',
            'foto_path' => 'nullable|string',
            'foto_file' => 'nullable|image|max:5120',
            'status' => 'required|string|in:menunggu_verifikasi,aktif,non_aktif',
        ]);

        if ($request->hasFile('foto_file')) {
            $path = $request->file('foto_file')->store('umkm', 'public');
            $validated['foto_path'] = '/storage/'.$path;
        }

        unset($validated['foto_file']);

        if (empty($validated['foto_path'])) {
            $existing = DB::table('produk_umkm')->where('id', $id)->first();
            if ($existing) {
                $validated['foto_path'] = $existing->foto_path;
            }
        }

        $validated['slug'] = Str::slug($validated['nama']).'-'.$id;
        $validated['updated_at'] = now();

        DB::table('produk_umkm')->where('id', $id)->update($validated);

        return back()->with('success', 'Produk Pasar Maya berhasil diperbarui.');
    }

    /**
     * Delete Produk UMKM.
     */
    public function deleteProduk(int $id): RedirectResponse
    {
        DB::table('produk_umkm')->where('id', $id)->delete();

        return back()->with('success', 'Produk Pasar Maya berhasil dihapus.');
    }

    /**
     * Store new Destinasi Wisata.
     */
    public function storeWisata(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'harga_tiket' => 'required|numeric|min:0',
            'koordinat_lokasi' => 'required|string|max:255',
            'alamat' => 'required|string',
            'jam_operasional' => 'required|string|max:255',
            'foto_sampul_path' => 'required|string',
            'galeri_foto' => 'required|array',
        ]);

        $validated['slug'] = Str::slug($validated['nama']).'-'.rand(100, 999);
        $validated['galeri_foto'] = json_encode($validated['galeri_foto']);
        $validated['created_at'] = now();
        $validated['updated_at'] = now();

        DB::table('destinasi_wisata')->insert($validated);

        return back()->with('success', 'Destinasi Wisata berhasil ditambahkan.');
    }

    /**
     * Update existing Destinasi Wisata.
     */
    public function updateWisata(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'harga_tiket' => 'required|numeric|min:0',
            'koordinat_lokasi' => 'required|string|max:255',
            'alamat' => 'required|string',
            'jam_operasional' => 'required|string|max:255',
            'foto_sampul_path' => 'required|string',
            'galeri_foto' => 'required|array',
        ]);

        $validated['slug'] = Str::slug($validated['nama']).'-'.$id;
        $validated['galeri_foto'] = json_encode($validated['galeri_foto']);
        $validated['updated_at'] = now();

        DB::table('destinasi_wisata')->where('id', $id)->update($validated);

        return back()->with('success', 'Destinasi Wisata berhasil diperbarui.');
    }

    /**
     * Delete Destinasi Wisata.
     */
    public function deleteWisata(int $id): RedirectResponse
    {
        DB::table('destinasi_wisata')->where('id', $id)->delete();

        return back()->with('success', 'Destinasi Wisata berhasil dihapus.');
    }

    /**
     * Update existing Regulasi.
     */
    public function updateRegulasi(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'jenis' => 'required|in:perdes,perkades,sk_kades,instruksi',
            'tahun' => 'required|integer',
            'nomor' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
            'file_path' => 'nullable|string',
            'status' => 'boolean',
        ]);

        $regulasi = Regulasi::findOrFail($id);
        $regulasi->update($validated);

        return back()->with('success', 'Regulasi desa berhasil diperbarui.');
    }

    /**
     * Delete Regulasi.
     */
    public function deleteRegulasi(int $id): RedirectResponse
    {
        Regulasi::findOrFail($id)->delete();

        return back()->with('success', 'Regulasi desa berhasil dihapus.');
    }

    /**
     * Update existing Agenda Desa.
     */
    public function updateAgenda(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'lokasi' => 'required|string|max:255',
            'waktu_mulai' => 'required|date',
            'waktu_selesai' => 'nullable|date',
            'koordinator' => 'nullable|string|max:255',
        ]);

        $agenda = AgendaDesa::findOrFail($id);
        $agenda->update($validated);

        return back()->with('success', 'Agenda desa berhasil diperbarui.');
    }

    /**
     * Delete Agenda.
     */
    public function deleteAgenda(int $id): RedirectResponse
    {
        AgendaDesa::findOrFail($id)->delete();

        return back()->with('success', 'Agenda desa berhasil dihapus.');
    }

    /**
     * Store new Dusun.
     */
    public function storeDusun(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:dusun,nama',
            'kepala_dusun_id' => 'nullable|integer|exists:penduduk,id',
        ]);

        Dusun::create($validated);

        return back()->with('success', 'Dusun berhasil ditambahkan.');
    }

    /**
     * Update existing Dusun.
     */
    public function updateDusun(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:dusun,nama,'.$id,
            'kepala_dusun_id' => 'nullable|integer|exists:penduduk,id',
        ]);

        $dusun = Dusun::findOrFail($id);
        $dusun->update($validated);

        return back()->with('success', 'Dusun berhasil diperbarui.');
    }

    /**
     * Delete Dusun.
     */
    public function deleteDusun(int $id): RedirectResponse
    {
        Dusun::findOrFail($id)->delete();

        return back()->with('success', 'Dusun berhasil dihapus.');
    }

    /**
     * Store new Kartu Keluarga.
     */
    public function storeKartuKeluarga(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'no_kk' => 'required|string|size:16|unique:kartu_keluarga,no_kk',
            'nik_kepala_keluarga' => 'nullable|string|size:16',
            'alamat' => 'required|string',
        ]);

        KartuKeluarga::create($validated);

        return back()->with('success', 'Kartu Keluarga berhasil ditambahkan.');
    }

    /**
     * Update existing Kartu Keluarga.
     */
    public function updateKartuKeluarga(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'no_kk' => 'required|string|size:16|unique:kartu_keluarga,no_kk,'.$id,
            'nik_kepala_keluarga' => 'nullable|string|size:16',
            'alamat' => 'required|string',
        ]);

        $kk = KartuKeluarga::findOrFail($id);
        $kk->update($validated);

        return back()->with('success', 'Kartu Keluarga berhasil diperbarui.');
    }

    /**
     * Delete Kartu Keluarga.
     */
    public function deleteKartuKeluarga(int $id): RedirectResponse
    {
        KartuKeluarga::findOrFail($id)->delete();

        return back()->with('success', 'Kartu Keluarga berhasil dihapus.');
    }

    /**
     * Store new Penduduk.
     */
    public function storePenduduk(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nik' => 'required|string|max:30|unique:penduduk,nik',
            'nama' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'golongan_darah' => 'required|in:A,B,AB,O,-',
            'agama' => 'required|string|max:100',
            'status_perkawinan' => 'required|string|max:100',
            'hubungan' => 'nullable|string|max:100',
            'kewarganegaraan' => 'nullable|string|max:100',
            'suku' => 'nullable|string|max:100',
            'pendidikan' => 'nullable|string|max:100',
            'pekerjaan' => 'nullable|string|max:100',
            'kartu_keluarga_id' => 'nullable|integer|exists:kartu_keluarga,id',
            'dusun_id' => 'required|integer|exists:dusun,id',
            'rt' => 'required|string|max:3',
            'rw' => 'required|string|max:3',
            'alamat' => 'required|string',
            'status_warga' => 'required|in:aktif,pindah,meninggal',
            'is_hamil' => 'boolean',
            'is_stunting' => 'boolean',
            'is_disabilitas' => 'boolean',
            'jenis_disabilitas' => 'nullable|string|max:255',
            'is_penerima_bansos' => 'boolean',
        ]);

        Penduduk::create($validated);

        return back()->with('success', 'Data penduduk berhasil ditambahkan.');
    }

    /**
     * Update existing Penduduk.
     */
    public function updatePenduduk(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'nik' => 'required|string|max:30|unique:penduduk,nik,'.$id,
            'nama' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'golongan_darah' => 'required|in:A,B,AB,O,-',
            'agama' => 'required|string|max:100',
            'status_perkawinan' => 'required|string|max:100',
            'hubungan' => 'nullable|string|max:100',
            'kewarganegaraan' => 'nullable|string|max:100',
            'suku' => 'nullable|string|max:100',
            'pendidikan' => 'nullable|string|max:100',
            'pekerjaan' => 'nullable|string|max:100',
            'kartu_keluarga_id' => 'nullable|integer|exists:kartu_keluarga,id',
            'dusun_id' => 'required|integer|exists:dusun,id',
            'rt' => 'required|string|max:3',
            'rw' => 'required|string|max:3',
            'alamat' => 'required|string',
            'status_warga' => 'required|in:aktif,pindah,meninggal',
            'is_hamil' => 'boolean',
            'is_stunting' => 'boolean',
            'is_disabilitas' => 'boolean',
            'jenis_disabilitas' => 'nullable|string|max:255',
            'is_penerima_bansos' => 'boolean',
        ]);

        $penduduk = Penduduk::findOrFail($id);
        $penduduk->update($validated);

        return back()->with('success', 'Data penduduk berhasil diperbarui.');
    }

    /**
     * Delete Penduduk.
     */
    public function deletePenduduk(int $id): RedirectResponse
    {
        Penduduk::findOrFail($id)->delete();

        return back()->with('success', 'Data penduduk berhasil dihapus.');
    }

    /**
     * Export data penduduk ke file Excel.
     */
    public function exportPenduduk(): BinaryFileResponse|RedirectResponse
    {
        $residents = DB::table('penduduk')
            ->leftJoin('dusun', 'penduduk.dusun_id', '=', 'dusun.id')
            ->leftJoin('kartu_keluarga', 'penduduk.kartu_keluarga_id', '=', 'kartu_keluarga.id')
            ->leftJoin('penduduk as kepala', 'kartu_keluarga.nik_kepala_keluarga', '=', 'kepala.nik')
            ->select([
                'penduduk.rw',
                'penduduk.rt',
                'dusun.nama as dusun_nama',
                'penduduk.alamat',
                'kartu_keluarga.no_kk',
                'kepala.nama as nama_kepala',
                'penduduk.nik',
                'penduduk.nama',
                'penduduk.jenis_kelamin',
                'penduduk.hubungan',
                'penduduk.tempat_lahir',
                'penduduk.tanggal_lahir',
                'penduduk.status_perkawinan',
                'penduduk.agama',
                'penduduk.golongan_darah',
                'penduduk.kewarganegaraan',
                'penduduk.suku',
                'penduduk.pendidikan',
                'penduduk.pekerjaan',
            ])
            ->get();

        $jsonTempFile = tempnam(sys_get_temp_dir(), 'export_');
        file_put_contents($jsonTempFile, json_encode($residents, JSON_UNESCAPED_UNICODE));

        $xlsxTempFile = tempnam(sys_get_temp_dir(), 'export_').'.xlsx';

        $scriptPath = storage_path('app/excel_helper.py');
        $python = $this->getPythonExecutable();
        $command = $python.' '.escapeshellarg($scriptPath).' export '.escapeshellarg($jsonTempFile).' '.escapeshellarg($xlsxTempFile).' 2>&1';

        $output = [];
        $returnVar = 0;
        exec($command, $output, $returnVar);

        @unlink($jsonTempFile);

        if ($returnVar !== 0) {
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'Gagal memproses ekspor Excel: '.implode("\n", $output),
            ]);
            session()->flash('error', 'Gagal memproses ekspor Excel: '.implode("\n", $output));

            return back();
        }

        return response()->download($xlsxTempFile, 'data_penduduk_'.date('Ymd_His').'.xlsx')->deleteFileAfterSend(true);
    }

    /**
     * Import data penduduk dari file Excel.
     */
    public function importPenduduk(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:xls,xlsx,zip',
        ]);

        $file = $request->file('file');
        $uploadedPath = $file->getRealPath();

        $jsonTempFile = tempnam(sys_get_temp_dir(), 'import_');

        $scriptPath = storage_path('app/excel_helper.py');
        $python = $this->getPythonExecutable();
        $command = $python.' '.escapeshellarg($scriptPath).' import '.escapeshellarg($uploadedPath).' '.escapeshellarg($jsonTempFile).' 2>&1';

        $output = [];
        $returnVar = 0;
        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            @unlink($jsonTempFile);
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'Gagal memproses file Excel: '.implode("\n", $output),
            ]);
            session()->flash('error', 'Gagal memproses file Excel: '.implode("\n", $output));

            return back();
        }

        $jsonData = file_get_contents($jsonTempFile);
        @unlink($jsonTempFile);

        if ($jsonData === false) {
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'Gagal membaca data hasil ekstraksi Excel.',
            ]);
            session()->flash('error', 'Gagal membaca data hasil ekstraksi Excel.');

            return back();
        }

        $records = json_decode($jsonData, true);

        if (! is_array($records)) {
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'Gagal membaca data hasil ekstraksi Excel.',
            ]);
            session()->flash('error', 'Gagal membaca data hasil ekstraksi Excel.');

            return back();
        }

        $successCount = 0;

        DB::transaction(function () use ($records, &$successCount) {
            // Step 1: Pre-process Kartu Keluarga
            $kkData = [];
            foreach ($records as $record) {
                $noKk = $record['no_kk'];
                if (! $noKk) {
                    continue;
                }

                if (! isset($kkData[$noKk])) {
                    $kkData[$noKk] = [
                        'no_kk' => $noKk,
                        'nik_kepala_keluarga' => null,
                        'alamat' => $record['alamat'] ?: '-',
                    ];
                }

                if (strtolower($record['hubungan']) === 'kepala keluarga') {
                    $kkData[$noKk]['nik_kepala_keluarga'] = $record['nik'];
                }
            }

            // Fill missing heads of family with first NIK in the KK
            foreach ($records as $record) {
                $noKk = $record['no_kk'];
                if ($noKk && isset($kkData[$noKk]) && $kkData[$noKk]['nik_kepala_keluarga'] === null) {
                    $kkData[$noKk]['nik_kepala_keluarga'] = $record['nik'];
                }
            }

            // Insert/update Kartu Keluarga and keep their IDs
            $kkMap = [];
            foreach ($kkData as $noKk => $data) {
                $kk = KartuKeluarga::updateOrCreate(
                    ['no_kk' => $noKk],
                    [
                        'nik_kepala_keluarga' => $data['nik_kepala_keluarga'],
                        'alamat' => $data['alamat'],
                    ]
                );
                $kkMap[$noKk] = $kk->id;
            }

            // Step 2: Pre-process Dusun
            $dusunMap = [];
            $dusunNames = array_unique(array_filter(array_column($records, 'dusun')));
            foreach ($dusunNames as $name) {
                $dusun = Dusun::firstOrCreate(['nama' => $name]);
                $dusunMap[strtolower($name)] = $dusun->id;
            }

            // Step 3: Insert/update residents
            foreach ($records as $record) {
                $dusunKey = strtolower($record['dusun']);
                $dusunId = $dusunMap[$dusunKey] ?? null;

                if (! $dusunId && $record['dusun']) {
                    $dusun = Dusun::firstOrCreate(['nama' => $record['dusun']]);
                    $dusunId = $dusun->id;
                    $dusunMap[$dusunKey] = $dusunId;
                }

                $noKk = $record['no_kk'];
                $kkId = $noKk ? ($kkMap[$noKk] ?? null) : null;

                Penduduk::updateOrCreate(
                    ['nik' => $record['nik']],
                    [
                        'nama' => $record['nama'],
                        'jenis_kelamin' => $record['jenis_kelamin'],
                        'tempat_lahir' => $record['tempat_lahir'] ?: '-',
                        'tanggal_lahir' => $record['tanggal_lahir'],
                        'golongan_darah' => $record['golongan_darah'] ?: '-',
                        'agama' => $record['agama'] ?: 'Islam',
                        'kewarganegaraan' => $record['kewarganegaraan'] ?: 'WNI',
                        'suku' => $record['suku'] ?: '-',
                        'pendidikan' => $record['pendidikan'] ?: '-',
                        'pekerjaan' => $record['pekerjaan'] ?: '-',
                        'status_perkawinan' => $record['status_perkawinan'] ?: 'belum_kawin',
                        'hubungan' => $record['hubungan'] ?: '-',
                        'kartu_keluarga_id' => $kkId,
                        'dusun_id' => $dusunId,
                        'rt' => $record['rt'] ?: '000',
                        'rw' => $record['rw'] ?: '000',
                        'alamat' => $record['alamat'] ?: '-',
                        'status_warga' => 'aktif',
                        'is_hamil' => false,
                        'is_stunting' => false,
                        'is_disabilitas' => false,
                        'is_penerima_bansos' => false,
                    ]
                );
                $successCount++;
            }
        });

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "Berhasil mengimpor {$successCount} data penduduk.",
        ]);
        session()->flash('success', "Berhasil mengimpor {$successCount} data penduduk.");

        return back();
    }

    /**
     * Store new Jenis Surat.
     */
    public function storeJenisSurat(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'kode' => 'required|string|max:50|unique:jenis_surat,kode',
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'is_aktif' => 'boolean',
        ]);

        JenisSurat::create($validated);

        return back()->with('success', 'Jenis surat berhasil ditambahkan.');
    }

    /**
     * Update existing Jenis Surat.
     */
    public function updateJenisSurat(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'kode' => 'required|string|max:50|unique:jenis_surat,kode,'.$id,
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'is_aktif' => 'boolean',
        ]);

        $jenisSurat = JenisSurat::findOrFail($id);
        $jenisSurat->update($validated);

        return back()->with('success', 'Jenis surat berhasil diperbarui.');
    }

    /**
     * Delete Jenis Surat.
     */
    public function deleteJenisSurat(int $id): RedirectResponse
    {
        JenisSurat::findOrFail($id)->delete();

        return back()->with('success', 'Jenis surat berhasil dihapus.');
    }

    /**
     * Update status of Permohonan Surat.
     */
    public function updateStatusPermohonan(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:menunggu_persetujuan,disetujui,ditolak',
            'catatan_admin' => 'nullable|string',
        ]);

        $permohonan = PermohonanSurat::findOrFail($id);
        $permohonan->status = $validated['status'];
        $permohonan->catatan_admin = $validated['catatan_admin'] ?? null;

        if ($validated['status'] === 'disetujui' || $validated['status'] === 'ditolak') {
            $permohonan->disetujui_oleh_user_id = auth()->id();
            $permohonan->disetujui_pada = now();
        } else {
            $permohonan->disetujui_oleh_user_id = null;
            $permohonan->disetujui_pada = null;
        }

        $permohonan->save();

        return back()->with('success', 'Status permohonan surat berhasil diperbarui.');
    }

    /**
     * Update response and status of Pengaduan.
     */
    public function updateTanggapanPengaduan(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:terkirim,diproses,selesai',
            'tanggapan_admin' => 'nullable|string',
        ]);

        $pengaduan = Pengaduan::findOrFail($id);
        $pengaduan->update($validated);

        return back()->with('success', 'Tanggapan pengaduan berhasil disimpan.');
    }

    /**
     * Get the best Python executable command available.
     */
    private function getPythonExecutable(): string
    {
        // Try 'python'
        $output = [];
        $returnVar = 0;
        exec('python --version 2>&1', $output, $returnVar);
        if ($returnVar === 0) {
            return 'python';
        }

        // Try 'py' (Python Launcher for Windows)
        $output = [];
        $returnVar = 0;
        exec('py --version 2>&1', $output, $returnVar);
        if ($returnVar === 0) {
            return 'py';
        }

        // Try common Windows AppData paths
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $userProfile = getenv('USERPROFILE') ?: getenv('HOMEDRIVE').getenv('HOMEPATH');
            if ($userProfile) {
                $localAppData = $userProfile.'\AppData\Local\Programs\Python';
                if (is_dir($localAppData)) {
                    $dirs = glob($localAppData.'\Python*');
                    if ($dirs) {
                        rsort($dirs);
                        foreach ($dirs as $dir) {
                            $exe = $dir.'\python.exe';
                            if (file_exists($exe)) {
                                return '"'.$exe.'"';
                            }
                        }
                    }
                }
            }
        }

        // Default fallback
        return 'python';
    }
}
