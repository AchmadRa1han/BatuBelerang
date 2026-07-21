<?php

namespace App\Http\Controllers;

use App\Models\AgendaDesa;
use App\Models\AnggaranApbdes;
use App\Models\AparaturDesa;
use App\Models\BeritaDesa;
use App\Models\HalamanKonten;
use App\Models\ProfilDesa;
use App\Models\Regulasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $today = now()->toDateString();

        // Kependudukan Stats
        $wargaCount = DB::table('penduduk')->count();
        $kkCount = DB::table('kartu_keluarga')->count();
        $dusunCount = DB::table('dusun')->count();

        $genderBreakdown = DB::table('penduduk')
            ->select('jenis_kelamin', DB::raw('count(*) as total'))
            ->groupBy('jenis_kelamin')
            ->get()
            ->mapWithKeys(fn ($item) => [$item->jenis_kelamin => (int) $item->total]);

        // Permohonan Surat Stats
        $suratStats = DB::table('permohonan_surat')
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get()
            ->pluck('total', 'status');

        $suratTerbaru = DB::table('permohonan_surat')
            ->join('penduduk', 'permohonan_surat.penduduk_id', '=', 'penduduk.id')
            ->join('jenis_surat', 'permohonan_surat.jenis_surat_id', '=', 'jenis_surat.id')
            ->select(
                'permohonan_surat.id',
                'penduduk.nama as nama_pemohon',
                'penduduk.nik',
                'jenis_surat.nama as nama_surat',
                'permohonan_surat.status',
                'permohonan_surat.created_at'
            )
            ->orderBy('permohonan_surat.created_at', 'desc')
            ->limit(5)
            ->get();

        // Pengaduan Warga Stats
        $pengaduanStats = DB::table('pengaduan')
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get()
            ->pluck('total', 'status');

        $pengaduanTerbaru = DB::table('pengaduan')
            ->leftJoin('penduduk', 'pengaduan.penduduk_id', '=', 'penduduk.id')
            ->select(
                'pengaduan.id',
                'pengaduan.judul',
                'pengaduan.isi',
                'pengaduan.is_anonim',
                'pengaduan.status',
                'pengaduan.created_at',
                DB::raw("CASE WHEN pengaduan.is_anonim = 1 THEN 'Anonim' ELSE COALESCE(penduduk.nama, 'Masyarakat') END as pelapor")
            )
            ->orderBy('pengaduan.created_at', 'desc')
            ->limit(5)
            ->get();

        // UMKM & Wisata Stats
        $umkmCount = DB::table('produk_umkm')->count();
        $umkmPending = DB::table('produk_umkm')->where('status', 'pending')->count();
        $wisataCount = DB::table('destinasi_wisata')->count();
        $penginapanCount = DB::table('penginapan')->count();

        // Kehadiran Aparatur Hari Ini
        $kehadiranHariIni = DB::table('kehadiran_aparatur')
            ->leftJoin('users', 'kehadiran_aparatur.user_id', '=', 'users.id')
            ->where('tanggal', $today)
            ->select('kehadiran_aparatur.*', 'users.name as nama_aparatur')
            ->get();

        $kehadiranSummary = [
            'hadir' => $kehadiranHariIni->where('status', 'hadir')->count(),
            'izin' => $kehadiranHariIni->where('status', 'izin')->count(),
            'sakit' => $kehadiranHariIni->where('status', 'sakit')->count(),
            'alpa' => $kehadiranHariIni->where('status', 'alpa')->count(),
        ];

        // Agenda Desa
        $agendaMendatang = AgendaDesa::orderBy('waktu_mulai', 'asc')->get();

        // Homepage Content Data for Management
        $profilDesa = ProfilDesa::first();
        $aparaturList = AparaturDesa::orderBy('urutan', 'asc')->get();
        $beritaList = BeritaDesa::orderBy('tanggal_publikasi', 'desc')->get();
        $regulasiList = Regulasi::orderBy('tahun', 'desc')->orderBy('created_at', 'desc')->get();
        $apbdesList = AnggaranApbdes::where('tahun', date('Y'))->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'warga' => $wargaCount,
                'kk' => $kkCount,
                'dusun' => $dusunCount,
                'gender' => [
                    'laki_laki' => $genderBreakdown->get('L', 0),
                    'perempuan' => $genderBreakdown->get('P', 0),
                ],
                'surat' => [
                    'total' => DB::table('permohonan_surat')->count(),
                    'menunggu' => $suratStats->get('menunggu_persetujuan', 0),
                    'disetujui' => $suratStats->get('disetujui', 0),
                    'ditolak' => $suratStats->get('ditolak', 0),
                ],
                'pengaduan' => [
                    'total' => DB::table('pengaduan')->count(),
                    'terkirim' => $pengaduanStats->get('terkirim', 0),
                    'diproses' => $pengaduanStats->get('diproses', 0),
                    'selesai' => $pengaduanStats->get('selesai', 0),
                ],
                'umkm' => [
                    'total' => $umkmCount,
                    'pending' => $umkmPending,
                ],
                'wisata' => [
                    'destinasi' => $wisataCount,
                    'penginapan' => $penginapanCount,
                ],
                'kehadiran' => $kehadiranSummary,
            ],
            'suratTerbaru' => $suratTerbaru,
            'pengaduanTerbaru' => $pengaduanTerbaru,
            'kehadiranHariIni' => $kehadiranHariIni,
            'agendaMendatang' => $agendaMendatang,

            // Front Page Management Data
            'profilDesa' => $profilDesa,
            'aparaturList' => $aparaturList,
            'beritaList' => $beritaList,
            'regulasiList' => $regulasiList,
            'apbdesList' => $apbdesList,
            'halamanKontenList' => HalamanKonten::all(),
        ]);
    }
}
