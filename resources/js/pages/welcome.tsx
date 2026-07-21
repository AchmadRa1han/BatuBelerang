import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    MapPin,
    User,
    FileText,
    Download,
    Clock,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import PublicNavbar from '@/components/public-navbar';
import WeatherShalatWidget from '@/components/weather-shalat-widget';

interface DemografiData {
    gender: Array<{ name: string; value: number }>;
    agama: Array<{ name: string; value: number }>;
    dusun: Array<{ name: string; value: number }>;
}

interface RegulasiItem {
    id: number;
    judul: string;
    jenis: 'perdes' | 'perkades' | 'sk_kades' | 'instruksi';
    tahun: number;
    nomor: string;
    deskripsi?: string;
    file_path?: string;
    status: boolean;
}

interface AgendaItem {
    id: number;
    judul: string;
    deskripsi?: string;
    lokasi: string;
    waktu_mulai: string;
    waktu_selesai?: string;
    koordinator?: string;
}

interface ProfilDesaProps {
    nama_desa?: string;
    nama_kecamatan?: string;
    nama_kabupaten?: string;
    nama_provinsi?: string;
    sejarah?: string;
    visi?: string;
    misi?: string[];
    alamat_kantor?: string;
    telepon?: string;
    email?: string;
    nama_kades?: string;
    jabatan_kades?: string;
    sambutan_kades?: string;
    foto_kades?: string;
    hero_title?: string;
    hero_subtitle?: string;
}

interface AparaturItemProps {
    id?: number;
    nama: string;
    jabatan: string;
    foto_path?: string;
    foto?: string;
}

interface BeritaItemProps {
    id: number;
    judul: string;
    kategori: string;
    ringkasan: string;
    isi?: string;
    foto_path?: string;
    foto?: string;
    tanggal_publikasi?: string;
    tanggal?: string;
}

interface ApbdesItemProps {
    tahun: number;
    jenis: string;
    jumlah_anggaran: number;
    jumlah_realisasi: number;
}

interface Props {
    stats: {
        warga: number;
        kk: number;
        dusun: number;
        umkm: number;
        wisata: number;
    };
    demografi?: DemografiData;
    regulasi?: RegulasiItem[];
    agenda?: AgendaItem[];
    profilDesa?: ProfilDesaProps;
    aparaturList?: AparaturItemProps[];
    beritaList?: BeritaItemProps[];
    apbdesList?: ApbdesItemProps[];
}

const COLORS = [
    '#4f46e5',
    '#10b981',
    '#f59e0b',
    '#ec4899',
    '#8b5cf6',
    '#3b82f6',
];

const aparaturList = [
    {
        nama: 'Sulaeman',
        jabatan: 'Sekretaris Desa',
        foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    },
    {
        nama: 'Sadar Syam, S.Pd',
        jabatan: 'Kepala Seksi Pemerintahan',
        foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    },
    {
        nama: 'Hartati',
        jabatan: 'Kepala Seksi Pelayanan',
        foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    },
    {
        nama: 'Lukman, S.Pd',
        jabatan: 'Kepala Seksi Kesejahteraan',
        foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    },
    {
        nama: 'Kartini, S.Pd',
        jabatan: 'Kepala Urusan Tata Usaha dan Umum',
        foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    },
    {
        nama: 'Fitriani',
        jabatan: 'Kepala Urusan Keuangan',
        foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    },
    {
        nama: 'Nirmawati, SP',
        jabatan: 'Kepala Urusan Perencanaan',
        foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    },
    {
        nama: 'Muh. Darwis',
        jabatan: 'Kepala Dusun Jeppara',
        foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    },
    {
        nama: 'Aditya Saputra',
        jabatan: 'Kepala Dusun Bontoe',
        foto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    },
    {
        nama: 'Muh. Tahir',
        jabatan: 'Kepala Dusun Kalimbu',
        foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    },
    {
        nama: 'Ahmad',
        jabatan: 'Kepala Dusun Mattirotasi',
        foto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    },
];

export default function Welcome({
    stats,
    demografi,
    regulasi = [],
    agenda = [],
    profilDesa,
    aparaturList: propsAparaturList = [],
    beritaList: propsBeritaList = [],
    apbdesList: propsApbdesList = [],
}: Props) {
    const [activeGenderIndex, setActiveGenderIndex] = useState<number | null>(
        null,
    );
    const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

    const [aparaturIndex, setAparaturIndex] = useState(aparaturList.length); // Mulai dari klon tengah (index N)
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    const prevAparatur = () => {
        if (!transitionEnabled) {
            return;
        }

        setAparaturIndex((prev) => prev - 1);
    };

    const nextAparatur = () => {
        if (!transitionEnabled) {
            return;
        }

        setAparaturIndex((prev) => prev + 1);
    };

    const handleTransitionEnd = () => {
        const N = aparaturList.length;

        if (aparaturIndex >= 2 * N) {
            setTransitionEnabled(false);
            setAparaturIndex((prev) => prev - N);
        } else if (aparaturIndex < N) {
            setTransitionEnabled(false);
            setAparaturIndex((prev) => prev + N);
        }
    };

    useEffect(() => {
        if (!transitionEnabled) {
            const raf = requestAnimationFrame(() => {
                setTransitionEnabled(true);
            });

            return () => cancelAnimationFrame(raf);
        }
    }, [transitionEnabled]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextAparatur();
        }, 4000); // Auto-scroll setiap 4 detik

        return () => clearInterval(interval);
    }, [aparaturIndex, transitionEnabled]);

    // Mock data untuk fallback jika database kosong
    const fallbackGender = [
        { name: 'Laki-laki', value: 612 },
        { name: 'Perempuan', value: 636 },
    ];

    const fallbackAgama = [
        { name: 'Islam', value: 1242 },
        { name: 'Kristen', value: 6 },
    ];

    const fallbackDusun = [
        { name: 'Dusun I', value: 310 },
        { name: 'Dusun II', value: 295 },
        { name: 'Dusun III', value: 345 },
        { name: 'Dusun IV', value: 298 },
    ];

    const genderData = demografi?.gender?.length
        ? demografi.gender
        : fallbackGender;
    const religionData = demografi?.agama?.length
        ? demografi.agama
        : fallbackAgama;
    const dusunData = demografi?.dusun?.length
        ? demografi.dusun
        : fallbackDusun;

    const fallbackAgenda: AgendaItem[] = [
        {
            id: 1,
            judul: 'Musyawarah Dusun (Musdus) Rencana Kerja 2027',
            deskripsi:
                'Pertemuan warga dusun untuk merumuskan usulan pembangunan prioritas.',
            lokasi: 'Aula Pertemuan Dusun Cempae',
            waktu_mulai: '2026-07-20 09:00:00',
            waktu_selesai: '2026-07-20 12:00:00',
            koordinator: 'Baharuddin (Kadus Cempae)',
        },
        {
            id: 2,
            judul: 'Penyaluran BLT-Dana Desa Tahap III',
            deskripsi:
                'Pembagian bantuan langsung tunai tahap ketiga bagi KPM yang terdata.',
            lokasi: 'Aula Kantor Desa Batu Belerang',
            waktu_mulai: '2026-07-22 08:30:00',
            waktu_selesai: '2026-07-22 14:00:00',
            koordinator: 'Irsan Ramli (Kaur Keuangan)',
        },
        {
            id: 3,
            judul: 'Sosialisasi Pencegahan Stunting Anak',
            deskripsi:
                'Kegiatan edukasi pemenuhan gizi balita bersama kader Posyandu dan Puskesmas.',
            lokasi: 'Posyandu Terpadu Dusun Babana',
            waktu_mulai: '2026-07-25 09:00:00',
            waktu_selesai: '2026-07-25 11:30:00',
            koordinator: 'Marni (Kasi Kesejahteraan)',
        },
    ];

    const fallbackRegulasi: RegulasiItem[] = [
        {
            id: 1,
            judul: 'Rencana Pembangunan Jangka Menengah Desa (RPJMDes) Tahun 2026-2031',
            jenis: 'perdes',
            tahun: 2026,
            nomor: 'Nomor 02 Tahun 2026',
            deskripsi:
                'Dokumen perencanaan jangka menengah desa mengenai arah kebijakan pembangunan.',
            file_path: '#',
            status: true,
        },
        {
            id: 2,
            judul: 'Pencegahan dan Penanganan Stunting Terintegrasi tingkat Desa',
            jenis: 'perkades',
            tahun: 2025,
            nomor: 'Nomor 04 Tahun 2025',
            deskripsi:
                'Peraturan Kepala Desa mengenai alokasi anggaran dan aksi penanganan stunting.',
            file_path: '#',
            status: true,
        },
        {
            id: 3,
            judul: 'Pembentukan Pengurus Lembaga Kemasyarakatan Desa (LKD)',
            jenis: 'sk_kades',
            tahun: 2025,
            nomor: 'SK Nomor 18 Tahun 2025',
            deskripsi:
                'Surat Keputusan Kepala Desa untuk penetapan pengurus PKK, LKD, dan Posyandu.',
            file_path: '#',
            status: true,
        },
    ];

    const agendaData = agenda?.length ? agenda : fallbackAgenda;
    const regulasiData = regulasi?.length ? regulasi : fallbackRegulasi;

    // Kalkulasi Donut Chart Gender
    const totalGender = genderData.reduce((acc, curr) => acc + curr.value, 0);
    const radius = 60;
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius; // ~377

    // Dynamic data fallback
    const activeBeritaList = propsBeritaList.length
        ? propsBeritaList.map(b => ({
            id: b.id,
            judul: b.judul,
            slug: b.slug,
            kategori: b.kategori,
            tanggal: b.tanggal_publikasi || b.tanggal || '09 Jul 2026',
            ringkasan: b.ringkasan,
            foto: b.foto_path || b.foto || 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&auto=format&fit=crop&q=60',
            is_headline: Boolean(b.is_headline),
        }))
        : [
        {
            id: 1,
            judul: 'Peresmian Kolam Rendam Air Panas Belerang Baru',
            kategori: 'Pariwisata',
            tanggal: '09 Jul 2026',
            ringkasan:
                'Pemerintah Desa meresmikan kawasan baru fasilitas pemandian air panas belerang yang dilengkapi dengan kolam rendam keluarga dan gazebo bersantai.',
            foto: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&auto=format&fit=crop&q=60',
            is_headline: true,
        },
        {
            id: 2,
            judul: 'Penyaluran Bantuan Langsung Tunai (BLT) Tahap Kedua Sukses Terlaksana',
            kategori: 'Kesejahteraan Warga',
            tanggal: '07 Jul 2026',
            ringkasan:
                'Sebanyak 78 keluarga penerima manfaat di seluruh dusun menerima penyaluran bantuan tunai guna mendukung perekonomian lokal.',
            foto: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
            is_headline: false,
        },
        {
            id: 3,
            judul: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) TA 2027',
            kategori: 'Pemerintahan',
            tanggal: '02 Jul 2026',
            ringkasan:
                'Warga berkumpul mendiskusikan rencana pembangunan infrastruktur jalan tani dan perluasan jangkauan air bersih.',
            foto: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
            is_headline: false,
        },
        {
            id: 4,
            judul: 'Kunjungan Kerja Tim Penggerak PKK Kabupaten Sinjai ke Desa Batu Belerang',
            kategori: 'Kelembagaan',
            tanggal: '28 Jun 2026',
            ringkasan:
                'Peninjauan program ketahanan pangan keluarga dan pelatihan kerajinan bambu khas warga desa.',
            foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60',
            is_headline: false,
        },
        {
            id: 5,
            judul: 'Pelatihan Digitalisasi Produk UMKM Pertanian & Olahan Hasil Alami',
            kategori: 'Ekonomi UMKM',
            tanggal: '22 Jun 2026',
            ringkasan:
                'Pelaku usaha lokal dilatih memasarkan produk kopi olahan dan buah markisa secara digital di marketplace.',
            foto: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60',
            is_headline: false,
        },
        {
            id: 6,
            judul: 'Kerja Bakti Masal Membersihkan Saluran Irigasi Persawahan Dusun',
            kategori: 'Gotong Royong',
            tanggal: '18 Jun 2026',
            ringkasan:
                'Ratusan petani bersama aparatur desa bahu-membahu merapikan saluran air jelang musim tanam padi.',
            foto: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=60',
            is_headline: false,
        },
        {
            id: 7,
            judul: 'Pemeriksaan Kesehatan Gratis & Pembagian Vitamin untuk Lansia',
            kategori: 'Kesehatan',
            tanggal: '12 Jun 2026',
            ringkasan:
                'Pemerintah desa bekerja sama dengan Puskesmas menggelar posyandu integrasi rutin di kantor desa.',
            foto: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
            is_headline: false,
        },
    ];

    // Headline Berita & 6 Sub Berita Compact
    const headlineBerita = activeBeritaList.find(b => b.is_headline) || activeBeritaList[0];
    const subBeritaList = activeBeritaList.filter(b => b.id !== headlineBerita?.id).slice(0, 6);

    const activeAparaturList = propsAparaturList.length
        ? propsAparaturList.map(a => ({
            nama: a.nama,
            jabatan: a.jabatan,
            foto: a.foto_path || a.foto || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
        }))
        : aparaturList;

    // APBDesa Keuangan Dynamic
    const pend = propsApbdesList.find(a => a.jenis === 'pendapatan');
    const bel = propsApbdesList.find(a => a.jenis === 'belanja');
    const pem = propsApbdesList.find(a => a.jenis === 'pembiayaan');

    const apbdes = {
        tahun: pend?.tahun || 2026,
        pendapatan: { anggaran: Number(pend?.jumlah_anggaran || 1200000000), realisasi: Number(pend?.jumlah_realisasi || 980000000) },
        belanja: { anggaran: Number(bel?.jumlah_anggaran || 1150000000), realisasi: Number(bel?.jumlah_realisasi || 720000000) },
        pembiayaan: { anggaran: Number(pem?.jumlah_anggaran || 50000000), realisasi: Number(pem?.jumlah_realisasi || 50000000) },
    };

    const hitungPersentase = (realisasi: number, anggaran: number) => {
        return Math.min(Math.round((realisasi / anggaran) * 100), 100);
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-800 transition-colors duration-300 selection:bg-emerald-500 selection:text-white dark:bg-slate-950 dark:text-slate-100">
            <Head title="Website Resmi Desa Batu Belerang" />

            {/* Navigation Header */}
            <PublicNavbar />

            {/* Hero Section */}
            <section className="relative flex items-center justify-center pt-28 pb-20 md:pt-36 md:pb-28 text-white overflow-hidden bg-slate-950">
                {/* Hero Background Image & Dark Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={profilDesa?.hero_bg_path || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=80'}
                        alt="Hero Background Desa"
                        className="h-full w-full object-cover transition-transform duration-1000 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/75 to-slate-950/90 backdrop-blur-[1px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl space-y-5 px-6 text-center">
                    <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold tracking-wider text-emerald-300 uppercase backdrop-blur-md shadow-sm">
                        Portal Resmi Desa Batu Belerang
                    </span>
                    <h1 className="mx-auto max-w-3xl text-2xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-md leading-snug">
                        {profilDesa?.hero_title || 'Desa Batu Belerang'}
                    </h1>
                    <p className="mx-auto max-w-xl text-xs md:text-sm font-medium text-slate-200 drop-shadow-sm leading-relaxed">
                        {profilDesa?.hero_subtitle || 'Kecamatan Sinjai Borong, Kabupaten Sinjai, Provinsi Sulawesi Selatan'}
                    </p>
                    <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
                        <Link
                            href="/register"
                            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-emerald-600/30 transition-all hover:bg-emerald-500"
                        >
                            Layanan Mandiri Warga
                        </Link>
                        <Link
                            href="/berita"
                            className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
                        >
                            Jelajahi Berita Desa
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Stats Widget */}
            <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6">
                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md transition-colors md:grid-cols-5 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-slate-950/50">
                    <div className="border-slate-150 col-span-1 border-r p-4 text-center last:border-0 dark:border-slate-800/40">
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                            {stats.warga > 0 ? stats.warga : 1254}
                        </div>
                        <div className="mt-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                            Total Warga
                        </div>
                    </div>
                    <div className="border-slate-150 col-span-1 border-r p-4 text-center last:border-0 dark:border-slate-800/40">
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                            {stats.kk > 0 ? stats.kk : 382}
                        </div>
                        <div className="mt-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                            Kartu Keluarga
                        </div>
                    </div>
                    <div className="border-slate-150 col-span-1 border-r p-4 text-center last:border-0 dark:border-slate-800/40">
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                            {stats.dusun > 0 ? stats.dusun : 4}
                        </div>
                        <div className="mt-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                            Wilayah Dusun
                        </div>
                    </div>
                    <div className="border-slate-150 col-span-1 border-r p-4 text-center last:border-0 dark:border-slate-800/40">
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                            {stats.umkm > 0 ? stats.umkm : 24}
                        </div>
                        <div className="mt-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                            UMKM Warga
                        </div>
                    </div>
                    <div className="col-span-2 p-4 text-center md:col-span-1">
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                            {stats.wisata > 0 ? stats.wisata : 3}
                        </div>
                        <div className="mt-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                            Spot Wisata
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Sections */}
            <div className="mx-auto max-w-7xl space-y-12 md:space-y-16 px-6 py-10 md:py-14">
                {/* 1. KABAR DESA TERKINI (Section Berita Utama & Grid 6 Berita Compact) */}
                <section className="space-y-5">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="space-y-1 text-center sm:text-left">
                            <span className="block text-xs font-semibold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                                Berita & Informasi Resmi
                            </span>
                            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                                Kabar Desa Terkini
                            </h2>
                            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                                Ikuti berita utama dan 6 kabar terbaru perkembangan Desa Batu Belerang.
                            </p>
                        </div>
                        <Link
                            href="/berita"
                            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                            Lihat Semua Berita <span>→</span>
                        </Link>
                    </div>

                    {/* 👑 Headline Card Utama */}
                    {headlineBerita && (
                        <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/80 p-1 shadow-lg dark:border-emerald-500/20">
                            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 rounded-xl bg-slate-900/90 p-5 md:p-6 backdrop-blur-md">
                                <div className="md:col-span-6 lg:col-span-5 relative aspect-16/9 md:aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-800 shrink-0">
                                    <img
                                        src={headlineBerita.foto}
                                        alt={headlineBerita.judul}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute top-3 left-3 flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-md">
                                        ⭐ BERITA UTAMA
                                    </span>
                                </div>
                                <div className="md:col-span-6 lg:col-span-7 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                                            {headlineBerita.kategori}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            • {headlineBerita.tanggal}
                                        </span>
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-bold leading-tight text-white transition-colors group-hover:text-emerald-400">
                                        {headlineBerita.judul}
                                    </h3>
                                    <p className="line-clamp-2 md:line-clamp-3 text-xs md:text-sm leading-relaxed text-slate-300">
                                        {headlineBerita.ringkasan}
                                    </p>
                                    <div className="pt-2">
                                        <Link
                                            href={headlineBerita.slug ? `/berita/${headlineBerita.slug}` : '/berita'}
                                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-emerald-500"
                                        >
                                            Baca Berita Utama <span>→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 📰 Grid 6 Sub-Berita Compact */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-1">
                        {subBeritaList.map((berita) => (
                            <div
                                key={berita.id}
                                className="group flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-100/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 dark:border-slate-800 dark:bg-slate-900/30 dark:shadow-none dark:hover:border-slate-700"
                            >
                                <div className="relative aspect-4/3 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={berita.foto}
                                        alt={berita.judul}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col justify-between space-y-1.5 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span className="rounded px-1.5 py-0.2 text-[9px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 truncate max-w-[100px]">
                                            {berita.kategori}
                                        </span>
                                        <span className="text-[10px] text-slate-400 shrink-0">
                                            {berita.tanggal}
                                        </span>
                                    </div>
                                    <h4 className="text-xs font-bold leading-snug text-slate-900 line-clamp-2 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                                        {berita.judul}
                                    </h4>
                                    <Link
                                        href={berita.slug ? `/berita/${berita.slug}` : '/berita'}
                                        className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 pt-0.5"
                                    >
                                        Baca <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. AGENDA KEGIATAN & REGULASI DESA (BAKU SEBLAHAN - Side by Side Grid) */}
                <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Agenda Kegiatan */}
                    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 transition-colors dark:border-slate-800 dark:bg-slate-900/20 dark:shadow-none">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                                    <Calendar className="h-4.5 w-4.5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                        Agenda Kegiatan Desa
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Jadwal acara & musyawarah mendatang
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {agendaData.map((item) => {
                                const eventDate = new Date(item.waktu_mulai);
                                const dateFormatted =
                                    eventDate.toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    });
                                const timeFormatted =
                                    eventDate.toLocaleTimeString('id-ID', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    });

                                return (
                                    <div
                                        key={item.id}
                                        className="group relative rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-all duration-200 hover:border-emerald-200 hover:bg-slate-50 dark:border-slate-800/60 dark:bg-slate-900/10 dark:hover:border-slate-800 dark:hover:bg-slate-900/30"
                                    >
                                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                                            {item.judul}
                                        </h4>
                                        {item.deskripsi && (
                                            <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                                                {item.deskripsi}
                                            </p>
                                        )}
                                        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3 text-emerald-500" />
                                                <span>
                                                    {dateFormatted} - {timeFormatted} WITA
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3 text-emerald-500" />
                                                <span>{item.lokasi}</span>
                                            </div>
                                        </div>
                                        {item.koordinator && (
                                            <div className="mt-2 flex items-center gap-1 border-t border-slate-100 pt-1.5 text-[10px] text-slate-400 dark:border-slate-800/40">
                                                <User className="h-3 w-3" />
                                                <span>
                                                    Koordinator: {item.koordinator}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Regulasi & Produk Hukum */}
                    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 transition-colors dark:border-slate-800 dark:bg-slate-900/20 dark:shadow-none">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                                    <FileText className="h-4.5 w-4.5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                        Regulasi & Produk Hukum
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Peraturan & surat keputusan resmi desa
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {regulasiData.map((item) => {
                                const typeNames = {
                                    perdes: 'Peraturan Desa',
                                    perkades: 'Peraturan Kades',
                                    sk_kades: 'SK Kades',
                                    instruksi: 'Instruksi',
                                };
                                const badgeColors = {
                                    perdes: 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900/30',
                                    perkades:
                                        'bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400 border-purple-100 dark:border-purple-900/30',
                                    sk_kades:
                                        'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-100 dark:border-amber-900/30',
                                    instruksi:
                                        'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-100 dark:border-rose-900/30',
                                };

                                return (
                                    <div
                                        key={item.id}
                                        className="group flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-all duration-200 hover:border-emerald-200 hover:bg-slate-50 dark:border-slate-800/60 dark:bg-slate-900/20 dark:hover:border-slate-800 dark:hover:bg-slate-900/40"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${badgeColors[item.jenis]}`}
                                                >
                                                    {typeNames[item.jenis]}
                                                </span>
                                                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                                    {item.nomor}
                                                </span>
                                            </div>
                                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                                {item.judul}
                                            </h4>
                                            {item.deskripsi && (
                                                <p className="line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400">
                                                    {item.deskripsi}
                                                </p>
                                            )}
                                        </div>
                                        <a
                                            href={item.file_path || '#'}
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-emerald-400"
                                            title="Unduh Berkas"
                                            download
                                        >
                                            <Download className="h-3.5 w-3.5" />
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 3. WEATHER & SHALAT WIDGET */}
                <section className="animate-fade-in scroll-mt-24">
                    <WeatherShalatWidget />
                </section>

                {/* 4. DEMOGRAPHIC CHARTS SECTION */}
                <section className="space-y-6">
                    <div className="space-y-1 text-center sm:text-left">
                        <span className="block text-xs font-semibold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                            Data Penduduk
                        </span>
                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                            Statistik Penduduk Desa
                        </h2>
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                            Peta demografi kependudukan real-time Desa Batu Belerang.
                        </p>
                    </div>

                    {!demografi ? (
                        /* Skeleton Loading */
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="flex h-[320px] animate-pulse flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/30"
                                >
                                    <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800"></div>
                                    <div className="flex h-40 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800/50">
                                        <div className="border-slate-350 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent dark:border-slate-700"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
                                        <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Custom dependency-free SVG Charts */
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {/* Gender Chart (SVG Donut) */}
                            <div className="flex min-h-[340px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 dark:border-slate-800 dark:bg-slate-900/30 dark:shadow-none">
                                <h3 className="mb-2 text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
                                    Rasio Jenis Kelamin
                                </h3>
                                <div className="relative flex flex-1 items-center justify-center">
                                    <svg
                                        width="160"
                                        height="160"
                                        className="-rotate-90 transform"
                                    >
                                        {(() => {
                                            const val1 =
                                                genderData[0]?.value || 0;
                                            const val2 =
                                                genderData[1]?.value || 0;
                                            const total = val1 + val2 || 1;
                                            const p1 =
                                                (val1 / total) * circumference;
                                            const p2 =
                                                (val2 / total) * circumference;

                                            return (
                                                <>
                                                    {/* Segment 1: Laki-laki */}
                                                    <circle
                                                        cx="80"
                                                        cy="80"
                                                        r={radius}
                                                        fill="transparent"
                                                        stroke="#4f46e5"
                                                        strokeWidth={
                                                            strokeWidth
                                                        }
                                                        strokeDasharray={`${p1} ${circumference}`}
                                                        className="cursor-pointer transition-all duration-500"
                                                        onMouseEnter={() =>
                                                            setActiveGenderIndex(
                                                                0,
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setActiveGenderIndex(
                                                                null,
                                                            )
                                                        }
                                                        opacity={
                                                            activeGenderIndex ===
                                                            1
                                                                ? 0.4
                                                                : 1
                                                        }
                                                    />
                                                    {/* Segment 2: Perempuan */}
                                                    <circle
                                                        cx="80"
                                                        cy="80"
                                                        r={radius}
                                                        fill="transparent"
                                                        stroke="#10b981"
                                                        strokeWidth={
                                                            strokeWidth
                                                        }
                                                        strokeDasharray={`${p2} ${circumference}`}
                                                        strokeDashoffset={-p1}
                                                        className="cursor-pointer transition-all duration-500"
                                                        onMouseEnter={() =>
                                                            setActiveGenderIndex(
                                                                1,
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setActiveGenderIndex(
                                                                null,
                                                            )
                                                        }
                                                        opacity={
                                                            activeGenderIndex ===
                                                            0
                                                                ? 0.4
                                                                : 1
                                                        }
                                                    />
                                                </>
                                            );
                                        })()}
                                    </svg>
                                    <div className="absolute flex flex-col items-center justify-center text-center">
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                                            {activeGenderIndex !== null
                                                ? genderData[activeGenderIndex]
                                                      ?.value
                                                : totalGender || 1248}
                                        </span>
                                        <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            {activeGenderIndex !== null
                                                ? genderData[activeGenderIndex]
                                                      ?.name
                                                : 'Total Jiwa'}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-3 w-3 rounded-full bg-emerald-600"></span>
                                        Laki-laki ({genderData[0]?.value || 612}
                                        )
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                                        Perempuan ({genderData[1]?.value || 636}
                                        )
                                    </span>
                                </div>
                            </div>

                            {/* Religion Chart (Horizontal Progress Bars) */}
                            <div className="flex min-h-[340px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 dark:border-slate-800 dark:bg-slate-900/30 dark:shadow-none">
                                <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
                                    Komposisi Agama
                                </h3>
                                <div className="flex flex-1 flex-col justify-center space-y-4">
                                    {(() => {
                                        const total =
                                            religionData.reduce(
                                                (acc, curr) => acc + curr.value,
                                                0,
                                            ) || 1;

                                        return religionData.map((item, idx) => {
                                            const pct = Math.round(
                                                (item.value / total) * 100,
                                            );

                                            return (
                                                <div
                                                    key={item.name}
                                                    className="space-y-1.5"
                                                >
                                                    <div className="flex justify-between text-xs font-medium">
                                                        <span className="text-slate-700 dark:text-slate-300">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-slate-500 dark:text-slate-400">
                                                            {item.value} ({pct}
                                                            %)
                                                        </span>
                                                    </div>
                                                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-900">
                                                        <div
                                                            className="h-2 rounded-full transition-all duration-1000"
                                                            style={{
                                                                backgroundColor:
                                                                    COLORS[
                                                                        idx %
                                                                            COLORS.length
                                                                    ],
                                                                width: `${pct}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                                <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                                    Grafik sebaran keyakinan penduduk terdaftar.
                                </div>
                            </div>

                            {/* Dusun Chart (SVG Bar Chart) */}
                            <div className="flex min-h-[340px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 dark:border-slate-800 dark:bg-slate-900/30 dark:shadow-none">
                                <h3 className="mb-2 text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
                                    Populasi per Dusun
                                </h3>
                                <div className="flex h-44 flex-1 items-end justify-between px-2">
                                    {(() => {
                                        const maxVal = Math.max(
                                            ...dusunData.map((d) => d.value),
                                            1,
                                        );
                                        const chartHeight = 130;

                                        return dusunData.map((item, idx) => {
                                            const barH =
                                                (item.value / maxVal) *
                                                chartHeight;
                                            const isHovered =
                                                hoveredBarIndex === idx;

                                            return (
                                                <div
                                                    key={item.name}
                                                    className="group flex flex-1 flex-col items-center"
                                                    onMouseEnter={() =>
                                                        setHoveredBarIndex(idx)
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoveredBarIndex(null)
                                                    }
                                                >
                                                    {/* Tooltip on top */}
                                                    <div
                                                        className={`mb-2 rounded border border-slate-800 bg-slate-900 px-2 py-0.5 font-mono text-[10px] text-white transition-opacity duration-200 dark:bg-slate-950 ${
                                                            isHovered
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        }`}
                                                    >
                                                        {item.value}
                                                    </div>
                                                    {/* Bar rect */}
                                                    <div
                                                        className="w-8 cursor-pointer rounded-t-lg shadow-lg shadow-emerald-600/5 transition-all duration-300"
                                                        style={{
                                                            height: `${barH}px`,
                                                            backgroundColor:
                                                                isHovered
                                                                    ? '#6366f1'
                                                                    : COLORS[
                                                                          idx %
                                                                              COLORS.length
                                                                      ],
                                                        }}
                                                    ></div>
                                                    {/* X Label */}
                                                    <span className="mt-2 text-[10px] font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                                                        {item.name.replace(
                                                            'Dusun ',
                                                            'D. ',
                                                        )}
                                                    </span>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                                <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                                    Penyebaran penduduk di 4 dusun
                                    administratif.
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* 5. APBDes TRANSPARENCY WIDGET */}
                <section className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 transition-colors md:grid-cols-2 md:p-8 dark:border-slate-800 dark:bg-slate-900/20 dark:shadow-none">
                    <div className="space-y-4">
                        <span className="block text-xs font-semibold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                            Akuntabilitas Keuangan
                        </span>
                        <h2 className="text-2xl leading-tight font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                            Transparansi Dana Desa & APBDesa {apbdes.tahun}
                        </h2>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                            Sebagai komitmen mewujudkan tata kelola desa yang
                            bersih dan akuntabel, berikut rincian anggaran
                            pendapatan, belanja, dan pembiayaan Desa Batu
                            Belerang untuk tahun berjalan.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                            >
                                Unduh Laporan APBDesa PDF <span>→</span>
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 dark:border-slate-800/50 dark:bg-slate-900/40">
                        {/* Item 1: Pendapatan */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-700 dark:text-slate-300">
                                    Pendapatan Desa
                                </span>
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    Rp{' '}
                                    {apbdes.pendapatan.realisasi.toLocaleString(
                                        'id-ID',
                                    )}{' '}
                                    /{' '}
                                    {apbdes.pendapatan.anggaran.toLocaleString(
                                        'id-ID',
                                    )}
                                </span>
                            </div>
                            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                <div
                                    className="h-full rounded-full bg-emerald-500 transition-all duration-1000"
                                    style={{
                                        width: `${hitungPersentase(apbdes.pendapatan.realisasi, apbdes.pendapatan.anggaran)}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Item 2: Belanja */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-700 dark:text-slate-300">
                                    Belanja Desa
                                </span>
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    Rp{' '}
                                    {apbdes.belanja.realisasi.toLocaleString(
                                        'id-ID',
                                    )}{' '}
                                    /{' '}
                                    {apbdes.belanja.anggaran.toLocaleString(
                                        'id-ID',
                                    )}
                                </span>
                            </div>
                            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                <div
                                    className="h-full rounded-full bg-blue-500 transition-all duration-1000"
                                    style={{
                                        width: `${hitungPersentase(apbdes.belanja.realisasi, apbdes.belanja.anggaran)}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Item 3: Pembiayaan */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-700 dark:text-slate-300">
                                    Pembiayaan Desa
                                </span>
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    Rp{' '}
                                    {apbdes.pembiayaan.realisasi.toLocaleString(
                                        'id-ID',
                                    )}{' '}
                                    /{' '}
                                    {apbdes.pembiayaan.anggaran.toLocaleString(
                                        'id-ID',
                                    )}
                                </span>
                            </div>
                            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                <div
                                    className="h-full rounded-full bg-purple-500 transition-all duration-1000"
                                    style={{
                                        width: `${hitungPersentase(apbdes.pembiayaan.realisasi, apbdes.pembiayaan.anggaran)}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. STRUKTUR APARATUR DESA */}
                <section className="space-y-6">
                    <div className="space-y-1 text-center sm:text-left">
                        <span className="block text-xs font-semibold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                            Struktur Organisasi
                        </span>
                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                            Aparatur Pemerintah Desa
                        </h2>
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                            Pengabdi masyarakat yang siap melayani kebutuhan warga Desa Batu Belerang.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {/* Pemimpin: Kepala Desa */}
                        <div className="group flex flex-col items-center overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-50/40 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 dark:border-emerald-500/20 dark:bg-emerald-950/20">
                            <div className="relative mb-3 aspect-4/5 w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
                                <img
                                    src={profilDesa?.foto_kades || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'}
                                    alt={profilDesa?.nama_kades || 'Kepala Desa'}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <span className="absolute top-2 left-2 rounded bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
                                    👑 Kades
                                </span>
                            </div>
                            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                                {profilDesa?.nama_kades || 'H. Ahmad Supardi, S.Sos'}
                            </h3>
                            <p className="mt-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                                {profilDesa?.jabatan_kades || 'Kepala Desa'}
                            </p>
                        </div>

                        {/* Staf & Perangkat Desa Lainnya */}
                        {activeAparaturList.map((aparatur, index) => (
                            <div
                                key={index}
                                className="group flex flex-col items-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm shadow-slate-100/50 transition-all duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900/30 dark:shadow-none"
                            >
                                <div className="relative mb-3 aspect-4/5 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={aparatur.foto}
                                        alt={aparatur.nama}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                                    {aparatur.nama}
                                </h3>
                                <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                                    {aparatur.jabatan}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. FITUR & LAYANAN UTAMA (Quick Action Grid) */}
                <section className="space-y-6">
                    <div className="space-y-1 text-center sm:text-left">
                        <span className="block text-xs font-semibold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                            Akses Cepat
                        </span>
                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                            Fitur & Layanan Utama
                        </h2>
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                            Kemudahan akses informasi dan pelayanan publik dalam satu genggaman.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Card 1: Pelayanan Mandiri */}
                        <Link
                            href="/register"
                            className="group space-y-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100/50 transition-all duration-300 hover:bg-emerald-50/10 dark:border-slate-800 dark:bg-slate-900/35 dark:shadow-md dark:hover:border-emerald-500/40 dark:hover:bg-emerald-950/15"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-500/10 text-base font-bold text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white dark:border-emerald-500/20 dark:text-emerald-400">
                                📝
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                                Layanan Mandiri
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                Pengajuan berbagai surat keterangan secara online tanpa antri.
                            </p>
                        </Link>

                        {/* Card 2: Katalog UMKM */}
                        <Link
                            href="#"
                            className="group space-y-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100/50 transition-all duration-300 hover:bg-emerald-50/10 dark:border-slate-800 dark:bg-slate-900/35 dark:shadow-md dark:hover:border-emerald-500/40 dark:hover:bg-emerald-950/15"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 bg-amber-500/10 text-base font-bold text-amber-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white dark:border-amber-500/20 dark:text-amber-400">
                                🛍️
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
                                Produk UMKM Warga
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                Dukung perekonomian lokal dengan belanja produk unggulan desa.
                            </p>
                        </Link>

                        {/* Card 3: Pariwisata */}
                        <Link
                            href="#"
                            className="group space-y-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100/50 transition-all duration-300 hover:bg-emerald-50/10 dark:border-slate-800 dark:bg-slate-900/35 dark:shadow-md dark:hover:border-emerald-500/40 dark:hover:bg-emerald-950/15"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-200 bg-cyan-500/10 text-base font-bold text-cyan-600 transition-colors duration-300 group-hover:bg-cyan-500 group-hover:text-white dark:border-cyan-500/20 dark:text-cyan-400">
                                ♨️
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                                Wisata Air Panas Belerang
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                Informasi lengkap destinasi pemandian air panas dan fasilitasnya.
                            </p>
                        </Link>

                        {/* Card 4: Pengaduan */}
                        <Link
                            href="#"
                            className="group space-y-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100/50 transition-all duration-300 hover:bg-rose-50/10 dark:border-slate-800 dark:bg-slate-900/35 dark:shadow-md dark:hover:border-rose-500/40 dark:hover:bg-rose-950/15"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-500/10 text-base font-bold text-rose-600 transition-colors duration-300 group-hover:bg-rose-500 group-hover:text-white dark:border-rose-500/20 dark:text-rose-400">
                                📣
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-rose-600 dark:text-white dark:group-hover:text-rose-400">
                                Layanan Pengaduan
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                Sampaikan kritik, saran, maupun keluhan secara tertulis (bisa anonim).
                            </p>
                        </Link>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white text-slate-600 transition-colors dark:border-slate-900 dark:bg-slate-950 dark:text-slate-400">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 text-sm md:grid-cols-4">
                    <div className="col-span-1 space-y-4 md:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white shadow-lg shadow-emerald-500/20">
                                BB
                            </div>
                            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                                Desa Batu Belerang
                            </span>
                        </div>
                        <p className="max-w-sm text-xs leading-relaxed">
                            Pusat pelayanan digital terpadu untuk efisiensi
                            urusan administrasi warga dan publikasi keindahan
                            wisata alam pemandian air panas serta air terjun
                            Desa Batu Belerang.
                        </p>
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            © {new Date().getFullYear()} Pemerintah Desa Batu
                            Belerang. All Rights Reserved.
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold tracking-wide text-slate-900 dark:text-white">
                            Peta Navigasi
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link
                                    href="/"
                                    className="transition-colors hover:text-emerald-600 dark:hover:text-white"
                                >
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="transition-colors hover:text-emerald-600 dark:hover:text-white"
                                >
                                    Profil Geografis
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="transition-colors hover:text-emerald-600 dark:hover:text-white"
                                >
                                    Kelembagaan Desa
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="transition-colors hover:text-emerald-600 dark:hover:text-white"
                                >
                                    Etalase UMKM
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="transition-colors hover:text-emerald-600 dark:hover:text-white"
                                >
                                    Informasi Wisata
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold tracking-wide text-slate-900 dark:text-white">
                            Hubungi Kami
                        </h4>
                        <ul className="space-y-3 text-xs">
                            <li className="leading-relaxed">
                                <span className="block font-semibold text-slate-800 dark:text-slate-300">
                                    Kantor Desa:
                                </span>
                                {profilDesa?.alamat_kantor || 'Jalan Poros Biji Nangka - Batu Belerang, Kec. Sinjai Borong, Kabupaten Sinjai, Sulawesi Selatan.'}
                            </li>
                            <li>
                                <span className="block font-semibold text-slate-800 dark:text-slate-300">
                                    Email Hubungan:
                                </span>
                                info@batubelerang.desa.id
                            </li>
                            <li>
                                <span className="block font-semibold text-slate-800 dark:text-slate-300">
                                    Telepon Hubungan:
                                </span>
                                +62 812-3456-7890
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
