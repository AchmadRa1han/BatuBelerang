<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $wargaCount = DB::table('penduduk')->count();
    $kkCount = DB::table('kartu_keluarga')->count();
    $dusunCount = DB::table('dusun')->count();
    $umkmCount = DB::table('produk_umkm')->where('status', 'aktif')->count();
    $wisataCount = DB::table('destinasi_wisata')->count();

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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

use App\Http\Controllers\DebugDatabaseController;

Route::get('/debug/database', [DebugDatabaseController::class, 'index'])->name('debug.database');

require __DIR__.'/settings.php';
