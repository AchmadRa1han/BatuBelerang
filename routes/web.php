<?php

use App\Http\Controllers\AdminContentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DebugDatabaseController;
use App\Models\AnggaranApbdes;
use App\Models\AparaturDesa;
use App\Models\BeritaDesa;
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

// Public Menu Routes (Profil)
Route::get('/profil/tentang-kami', fn () => Inertia::render('profil/tentang-kami'))->name('profil.tentang-kami');
Route::get('/profil/visi-misi', fn () => Inertia::render('profil/visi-misi'))->name('profil.visi-misi');
Route::get('/profil/sejarah-desa', fn () => Inertia::render('profil/sejarah-desa'))->name('profil.sejarah-desa');
Route::get('/profil/geografis-desa', fn () => Inertia::render('profil/geografis-desa'))->name('profil.geografis-desa');
Route::get('/profil/demografi-desa', fn () => Inertia::render('profil/demografi-desa'))->name('profil.demografi-desa');

// Public Menu Routes (Pemerintahan)
Route::get('/pemerintahan/visi-misi', fn () => Inertia::render('profil/visi-misi', ['category' => 'Pemerintahan']))->name('pemerintahan.visi-misi');
Route::get('/pemerintahan/data-perangkat', function () {
    $profilDesa = ProfilDesa::first();
    $aparaturDesa = AparaturDesa::where('status', true)->orderBy('urutan', 'asc')->get();

    return Inertia::render('pemerintahan/data-perangkat', [
        'profilDesa' => $profilDesa,
        'aparaturDesa' => $aparaturDesa,
    ]);
})->name('pemerintahan.data-perangkat');
Route::get('/pemerintahan/struktur-organisasi', fn () => Inertia::render('pemerintahan/struktur-organisasi'))->name('pemerintahan.struktur-organisasi');
Route::get('/pemerintahan/rpjmdes', fn () => Inertia::render('pemerintahan/rpjmdes'))->name('pemerintahan.rpjmdes');
Route::get('/pemerintahan/tata-kelola', fn () => Inertia::render('pemerintahan/tata-kelola'))->name('pemerintahan.tata-kelola');

// Public Menu Routes (Lembaga)
Route::get('/lembaga/bpd', fn () => Inertia::render('lembaga/bpd'))->name('lembaga.bpd');
Route::get('/lembaga/pkk', fn () => Inertia::render('lembaga/pkk'))->name('lembaga.pkk');
Route::get('/lembaga/karang-taruna', fn () => Inertia::render('lembaga/karang-taruna'))->name('lembaga.karang-taruna');
Route::get('/lembaga/rt-rw', fn () => Inertia::render('lembaga/rt-rw'))->name('lembaga.rt-rw');
Route::get('/lembaga/posyandu', fn () => Inertia::render('lembaga/posyandu'))->name('lembaga.posyandu');
Route::get('/lembaga/bumdes', fn () => Inertia::render('lembaga/bumdes'))->name('lembaga.bumdes');

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

    Route::post('/admin/regulasi', [AdminContentController::class, 'storeRegulasi'])->name('admin.regulasi.store');
    Route::post('/admin/agenda', [AdminContentController::class, 'storeAgenda'])->name('admin.agenda.store');
});

Route::get('/debug/database', [DebugDatabaseController::class, 'index'])->name('debug.database');

Route::get('_boost/browser-logs', function () {
    return redirect()->route('dashboard');
});

require __DIR__.'/settings.php';
