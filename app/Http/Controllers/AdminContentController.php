<?php

namespace App\Http\Controllers;

use App\Models\AgendaDesa;
use App\Models\AnggaranApbdes;
use App\Models\AparaturDesa;
use App\Models\BeritaDesa;
use App\Models\ProfilDesa;
use App\Models\Regulasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
}
