<?php

use App\Http\Controllers\AdminContentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DebugDatabaseController;
use App\Models\AnggaranApbdes;
use App\Models\AparaturDesa;
use App\Models\BeritaDesa;
use App\Models\HalamanKonten;
use App\Models\ProfilDesa;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $wargaCount = DB::table('penduduk')->count();
    $kkCount = DB::table('kartu_keluarga')->count();
    $dusunCount = DB::table('dusun')->count();
    $umkmCount = DB::table('produk_umkm')->where('status', 'aktif')->count();
    $wisataCount = DB::table('destinasi_wisata')->count();

    $profilDesa = ProfilDesa::first();
    $aparaturList = AparaturDesa::where('status', true)->orderBy('urutan', 'asc')->get();
    $beritaList = BeritaDesa::where('status', 'terbit')->orderBy('tanggal_publikasi', 'desc')->limit(7)->get();
    $apbdesList = AnggaranApbdes::where('tahun', date('Y'))->get();

    $regulasi = DB::table('regulasi')
        ->where('status', true)
        ->orderBy('tahun', 'desc')
        ->orderBy('created_at', 'desc')
        ->limit(3)
        ->get();

    $agenda = DB::table('agenda_desa')
        ->where('waktu_mulai', '>=', now())
        ->orderBy('waktu_mulai', 'asc')
        ->limit(3)
        ->get();

    return Inertia::render('welcome', [
        'stats' => [
            'warga' => $wargaCount,
            'kk' => $kkCount,
            'dusun' => $dusunCount,
            'umkm' => $umkmCount,
            'wisata' => $wisataCount,
        ],
        'profilDesa' => $profilDesa,
        'aparaturList' => $aparaturList,
        'beritaList' => $beritaList,
        'apbdesList' => $apbdesList,
        'regulasi' => $regulasi,
        'agenda' => $agenda,
        'demografi' => Inertia::defer(fn () => [
            'gender' => DB::table('penduduk')
                ->select('jenis_kelamin', DB::raw('count(*) as jumlah'))
                ->groupBy('jenis_kelamin')
                ->get()
                ->map(fn ($item) => [
                    'name' => $item->jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan',
                    'value' => (int) $item->jumlah,
                ]),
            'agama' => DB::table('penduduk')
                ->select('agama', DB::raw('count(*) as jumlah'))
                ->groupBy('agama')
                ->get()
                ->map(fn ($item) => [
                    'name' => $item->agama,
                    'value' => (int) $item->jumlah,
                ]),
            'dusun' => DB::table('penduduk')
                ->join('dusun', 'penduduk.dusun_id', '=', 'dusun.id')
                ->select('dusun.nama as nama_dusun', DB::raw('count(*) as jumlah'))
                ->groupBy('dusun.nama')
                ->get()
                ->map(fn ($item) => [
                    'name' => $item->nama_dusun,
                    'value' => (int) $item->jumlah,
                ]),
        ]),
    ]);
})->name('home');

Route::get('/berita', function () {
    $beritaList = BeritaDesa::where('status', 'terbit')
        ->orderBy('tanggal_publikasi', 'desc')
        ->get();
    $profilDesa = ProfilDesa::first();

    return Inertia::render('berita/index', [
        'beritaList' => $beritaList,
        'profilDesa' => $profilDesa,
    ]);
})->name('berita.index');

Route::get('/berita/{slug}', function ($slug) {
    $berita = BeritaDesa::where('slug', $slug)->firstOrFail();
    $profilDesa = ProfilDesa::first();
    $beritaLainnya = BeritaDesa::where('status', 'terbit')
        ->where('id', '!=', $berita->id)
        ->orderBy('tanggal_publikasi', 'desc')
        ->limit(4)
        ->get();

    return Inertia::render('berita/show', [
        'berita' => $berita,
        'profilDesa' => $profilDesa,
        'beritaLainnya' => $beritaLainnya,
    ]);
})->name('berita.show');

Route::get('/pasar-maya', function () {
    $kategoriList = DB::table('kategori_umkm')->get();
    $produkList = DB::table('produk_umkm')
        ->join('kategori_umkm', 'produk_umkm.kategori_umkm_id', '=', 'kategori_umkm.id')
        ->join('penduduk', 'produk_umkm.penduduk_id', '=', 'penduduk.id')
        ->select(
            'produk_umkm.*',
            'kategori_umkm.nama as nama_kategori',
            'penduduk.nama as nama_penjual'
        )
        ->where('produk_umkm.status', 'aktif')
        ->orderBy('produk_umkm.created_at', 'desc')
        ->get();

    $profilDesa = ProfilDesa::first();

    return Inertia::render('pasar-maya/index', [
        'kategoriList' => $kategoriList,
        'produkList' => $produkList,
        'profilDesa' => $profilDesa,
    ]);
})->name('pasar-maya.index');

Route::get('/wisata', function () {
    $wisataList = DB::table('destinasi_wisata')->get()->map(function ($item) {
        $item->galeri_foto = json_decode($item->galeri_foto);
        return $item;
    });

    $profilDesa = ProfilDesa::first();

    return Inertia::render('wisata/index', [
        'wisataList' => $wisataList,
        'profilDesa' => $profilDesa,
    ]);
})->name('wisata.index');

// Public Menu Routes (Profil)
Route::get('/profil/tentang-kami', function () {
    $konten = HalamanKonten::where('slug', 'profil-tentang-kami')->first();

    return Inertia::render('profil/tentang-kami', ['konten' => $konten]);
})->name('profil.tentang-kami');

Route::get('/profil/visi-misi', function () {
    $konten = HalamanKonten::where('slug', 'profil-visi-misi')->first();

    return Inertia::render('profil/visi-misi', ['konten' => $konten, 'category' => 'Profil Desa']);
})->name('profil.visi-misi');

Route::get('/profil/sejarah-desa', function () {
    $konten = HalamanKonten::where('slug', 'profil-sejarah-desa')->first();

    return Inertia::render('profil/sejarah-desa', ['konten' => $konten]);
})->name('profil.sejarah-desa');

Route::get('/profil/geografis-desa', function () {
    $konten = HalamanKonten::where('slug', 'profil-geografis-desa')->first();

    return Inertia::render('profil/geografis-desa', ['konten' => $konten]);
})->name('profil.geografis-desa');

Route::get('/profil/demografi-desa', function () {
    $konten = HalamanKonten::where('slug', 'profil-demografi-desa')->first();

    return Inertia::render('profil/demografi-desa', ['konten' => $konten]);
})->name('profil.demografi-desa');

// Public Menu Routes (Pemerintahan)
Route::get('/pemerintahan/visi-misi', function () {
    $konten = HalamanKonten::where('slug', 'profil-visi-misi')->first();

    return Inertia::render('profil/visi-misi', ['konten' => $konten, 'category' => 'Pemerintahan']);
})->name('pemerintahan.visi-misi');

Route::get('/pemerintahan/data-perangkat', function () {
    $profilDesa = ProfilDesa::first();
    $aparaturDesa = AparaturDesa::where('status', true)->orderBy('urutan', 'asc')->get();

    return Inertia::render('pemerintahan/data-perangkat', [
        'profilDesa' => $profilDesa,
        'aparaturDesa' => $aparaturDesa,
    ]);
})->name('pemerintahan.data-perangkat');

Route::get('/pemerintahan/struktur-organisasi', function () {
    $konten = HalamanKonten::where('slug', 'pemerintahan-struktur-organisasi')->first();

    return Inertia::render('pemerintahan/struktur-organisasi', ['konten' => $konten]);
})->name('pemerintahan.struktur-organisasi');

Route::get('/pemerintahan/rpjmdes', function () {
    $konten = HalamanKonten::where('slug', 'pemerintahan-rpjmdes')->first();

    return Inertia::render('pemerintahan/rpjmdes', ['konten' => $konten]);
})->name('pemerintahan.rpjmdes');

Route::get('/pemerintahan/tata-kelola', function () {
    $konten = HalamanKonten::where('slug', 'pemerintahan-tata-kelola')->first();

    return Inertia::render('pemerintahan/tata-kelola', ['konten' => $konten]);
})->name('pemerintahan.tata-kelola');

// Public Menu Routes (Lembaga)
Route::get('/lembaga/bpd', function () {
    $konten = HalamanKonten::where('slug', 'lembaga-bpd')->first();

    return Inertia::render('lembaga/bpd', ['konten' => $konten]);
})->name('lembaga.bpd');

Route::get('/lembaga/pkk', function () {
    $konten = HalamanKonten::where('slug', 'lembaga-pkk')->first();

    return Inertia::render('lembaga/pkk', ['konten' => $konten]);
})->name('lembaga.pkk');

Route::get('/lembaga/karang-taruna', function () {
    $konten = HalamanKonten::where('slug', 'lembaga-karang-taruna')->first();

    return Inertia::render('lembaga/karang-taruna', ['konten' => $konten]);
})->name('lembaga.karang-taruna');

Route::get('/lembaga/rt-rw', function () {
    $konten = HalamanKonten::where('slug', 'lembaga-rt-rw')->first();

    return Inertia::render('lembaga/rt-rw', ['konten' => $konten]);
})->name('lembaga.rt-rw');

Route::get('/lembaga/posyandu', function () {
    $konten = HalamanKonten::where('slug', 'lembaga-posyandu')->first();

    return Inertia::render('lembaga/posyandu', ['konten' => $konten]);
})->name('lembaga.posyandu');

Route::get('/lembaga/bumdes', function () {
    $konten = HalamanKonten::where('slug', 'lembaga-bumdes')->first();

    return Inertia::render('lembaga/bumdes', ['konten' => $konten]);
})->name('lembaga.bumdes');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Admin Content Management Routes
    Route::post('/admin/profil', [AdminContentController::class, 'updateProfil'])->name('admin.profil.update');

    Route::post('/admin/aparatur', [AdminContentController::class, 'storeAparatur'])->name('admin.aparatur.store');
    Route::put('/admin/aparatur/{id}', [AdminContentController::class, 'updateAparatur'])->name('admin.aparatur.update');
    Route::delete('/admin/aparatur/{id}', [AdminContentController::class, 'deleteAparatur'])->name('admin.aparatur.delete');

    Route::post('/admin/berita', [AdminContentController::class, 'storeBerita'])->name('admin.berita.store');
    Route::put('/admin/berita/{id}', [AdminContentController::class, 'updateBerita'])->name('admin.berita.update');
    Route::delete('/admin/berita/{id}', [AdminContentController::class, 'deleteBerita'])->name('admin.berita.delete');

    Route::post('/admin/apbdes', [AdminContentController::class, 'updateApbdes'])->name('admin.apbdes.update');
    Route::get('/admin/halaman/{slug}', [AdminContentController::class, 'editHalaman'])->name('admin.halaman.edit');
    Route::post('/admin/halaman/{slug}', [AdminContentController::class, 'updateHalamanKonten'])->name('admin.halaman.update');

    Route::post('/admin/regulasi', [AdminContentController::class, 'storeRegulasi'])->name('admin.regulasi.store');
    Route::post('/admin/agenda', [AdminContentController::class, 'storeAgenda'])->name('admin.agenda.store');
});

Route::get('/debug/database', [DebugDatabaseController::class, 'index'])->name('debug.database');

Route::get('_boost/browser-logs', function () {
    return redirect()->route('dashboard');
});

require __DIR__.'/settings.php';
