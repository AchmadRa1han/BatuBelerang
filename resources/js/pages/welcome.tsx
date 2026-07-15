import { Head, Link, usePage } from '@inertiajs/react';
import { Sun, Moon, Calendar, MapPin, User, FileText, Download, ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import WeatherShalatWidget from '@/components/weather-shalat-widget';
import { useAppearance } from '@/hooks/use-appearance';

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
}

const COLORS = [
    '#4f46e5',
    '#10b981',
    '#f59e0b',
    '#ec4899',
    '#8b5cf6',
    '#3b82f6',
];

export default function Welcome({
    stats,
    demografi,
    regulasi = [],
    agenda = [],
}: Props) {
    const { auth } = usePage().props as any;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeGenderIndex, setActiveGenderIndex] = useState<number | null>(
        null,
    );
    const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const [aparaturIndex, setAparaturIndex] = useState(5); // Mulai dari klon tengah (index 5)
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    const prevAparatur = () => {
        if (!transitionEnabled) return;
        setAparaturIndex((prev) => prev - 1);
    };

    const nextAparatur = () => {
        if (!transitionEnabled) return;
        setAparaturIndex((prev) => prev + 1);
    };

    const handleTransitionEnd = () => {
        if (aparaturIndex >= 10) {
            setTransitionEnabled(false);
            setAparaturIndex((prev) => prev - 5);
        } else if (aparaturIndex < 5) {
            setTransitionEnabled(false);
            setAparaturIndex((prev) => prev + 5);
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
            deskripsi: 'Pertemuan warga dusun untuk merumuskan usulan pembangunan prioritas.',
            lokasi: 'Aula Pertemuan Dusun Cempae',
            waktu_mulai: '2026-07-20 09:00:00',
            waktu_selesai: '2026-07-20 12:00:00',
            koordinator: 'Baharuddin (Kadus Cempae)',
        },
        {
            id: 2,
            judul: 'Penyaluran BLT-Dana Desa Tahap III',
            deskripsi: 'Pembagian bantuan langsung tunai tahap ketiga bagi KPM yang terdata.',
            lokasi: 'Aula Kantor Desa Batu Belerang',
            waktu_mulai: '2026-07-22 08:30:00',
            waktu_selesai: '2026-07-22 14:00:00',
            koordinator: 'Irsan Ramli (Kaur Keuangan)',
        },
        {
            id: 3,
            judul: 'Sosialisasi Pencegahan Stunting Anak',
            deskripsi: 'Kegiatan edukasi pemenuhan gizi balita bersama kader Posyandu dan Puskesmas.',
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
            deskripsi: 'Dokumen perencanaan jangka menengah desa mengenai arah kebijakan pembangunan.',
            file_path: '#',
            status: true,
        },
        {
            id: 2,
            judul: 'Pencegahan dan Penanganan Stunting Terintegrasi tingkat Desa',
            jenis: 'perkades',
            tahun: 2025,
            nomor: 'Nomor 04 Tahun 2025',
            deskripsi: 'Peraturan Kepala Desa mengenai alokasi anggaran dan aksi penanganan stunting.',
            file_path: '#',
            status: true,
        },
        {
            id: 3,
            judul: 'Pembentukan Pengurus Lembaga Kemasyarakatan Desa (LKD)',
            jenis: 'sk_kades',
            tahun: 2025,
            nomor: 'SK Nomor 18 Tahun 2025',
            deskripsi: 'Surat Keputusan Kepala Desa untuk penetapan pengurus PKK, LKD, dan Posyandu.',
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

    // Berita Acara
    const beritaList = [
        {
            id: 1,
            judul: 'Peresmian Kolam Rendam Air Panas Belerang Baru',
            kategori: 'Pariwisata',
            tanggal: '09 Jul 2026',
            ringkasan:
                'Pemerintah Desa meresmikan kolam berendam belerang baru dan gazebo bersantai bagi wisatawan lokal maupun mancanegara.',
            foto: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&auto=format&fit=crop&q=60',
        },
        {
            id: 2,
            judul: 'Penyaluran Bantuan Langsung Tunai (BLT) Tahap Kedua Sukses Terlaksana',
            kategori: 'Kesejahteraan Warga',
            tanggal: '07 Jul 2026',
            ringkasan:
                'Sebanyak 78 keluarga penerima manfaat di seluruh dusun menerima penyaluran bantuan tunai guna mendukung perekonomian lokal.',
            foto: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
        },
        {
            id: 3,
            judul: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) TA 2027',
            kategori: 'Pemerintahan',
            tanggal: '02 Jul 2026',
            ringkasan:
                'Warga berkumpul mendiskusikan rencana pembangunan infrastruktur jalan tani dan perluasan jangkauan air bersih.',
            foto: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
        },
    ];

    // APBDesa Keuangan
    const apbdes = {
        tahun: 2026,
        pendapatan: { anggaran: 1200000000, realisasi: 980000000 },
        belanja: { anggaran: 1150000000, realisasi: 720000000 },
        pembiayaan: { anggaran: 50000000, realisasi: 50000000 },
    };

    const hitungPersentase = (realisasi: number, anggaran: number) => {
        return Math.min(Math.round((realisasi / anggaran) * 100), 100);
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-800 transition-colors duration-300 selection:bg-indigo-500 selection:text-white dark:bg-slate-950 dark:text-slate-100">
            <Head title="Website Resmi Desa Batu Belerang" />

            {/* Navigation Header */}
            <header className="fixed top-0 right-0 left-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md transition-colors dark:border-slate-900 dark:bg-slate-950/80">
                <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 font-bold text-white shadow-lg shadow-indigo-500/20">
                            BB
                        </div>
                        <div>
                            <span className="block text-base font-bold tracking-tight text-slate-900 dark:text-white">
                                Batu Belerang
                            </span>
                            <span className="-mt-1 block text-[10px] font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                                Sinjai Timur
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
                        <Link
                            href="/"
                            className="font-semibold text-slate-900 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                        >
                            Beranda
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                            Profil
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                            Lembaga
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                            prefetch
                        >
                            UMKM
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                            prefetch
                        >
                            Wisata
                        </Link>
                        <Link
                            href="/debug/database"
                            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                            prefetch
                        >
                            DB Inspector
                        </Link>
                    </nav>

                    {/* Auth Actions */}
                    <div className="hidden items-center gap-4 md:flex">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="rounded-xl border border-slate-200/60 bg-slate-100 p-2.5 text-slate-500 transition-colors hover:bg-slate-200/50 hover:text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-200"
                            aria-label="Toggle Theme"
                        >
                            {resolvedAppearance === 'dark' ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </button>

                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className="rounded-xl bg-indigo-600 px-4.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/10 transition-all hover:bg-indigo-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-xl border border-slate-200 bg-white px-4.5 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700"
                                >
                                    Layanan Mandiri
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-slate-500 hover:text-slate-900 focus:outline-none md:hidden dark:text-slate-400 dark:hover:text-white"
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="space-y-4 border-b border-slate-200 bg-white p-6 text-sm font-medium transition-colors md:hidden dark:border-slate-900 dark:bg-slate-950">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-900">
                            <span className="font-bold text-slate-900 dark:text-white">
                                Menu
                            </span>
                            <button
                                onClick={toggleTheme}
                                className="rounded-lg border border-slate-200/60 bg-slate-100 p-2 text-slate-500 transition-colors hover:text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
                                aria-label="Toggle Theme"
                            >
                                {resolvedAppearance === 'dark' ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        <Link
                            href="/"
                            className="block text-slate-900 dark:text-white"
                        >
                            Beranda
                        </Link>
                        <Link
                            href="#"
                            className="block text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            Profil
                        </Link>
                        <Link
                            href="#"
                            className="block text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            Lembaga
                        </Link>
                        <Link
                            href="#"
                            className="block text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            UMKM
                        </Link>
                        <Link
                            href="#"
                            className="block text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            Wisata
                        </Link>
                        <Link
                            href="/debug/database"
                            className="block text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            DB Inspector
                        </Link>
                        <div className="flex gap-4 border-t border-slate-100 pt-4 dark:border-slate-900">
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                    className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-center text-xs font-semibold text-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="flex-1 rounded-xl border border-slate-200 bg-slate-100 py-2.5 text-center text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-center text-xs font-semibold text-white"
                                    >
                                        Layanan Mandiri
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="relative flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-slate-50 to-slate-50 pt-32 pb-24 transition-colors md:pt-40 md:pb-36 dark:from-indigo-900/10 dark:via-slate-950 dark:to-slate-950">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]"></div>

                <div className="relative z-10 mx-auto max-w-5xl space-y-8 px-6 text-center">
                    <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                        Portal Resmi Desa Batu Belerang
                    </span>
                    <h1 className="mx-auto max-w-4xl bg-gradient-to-b from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-4xl leading-tight font-extrabold tracking-tight text-slate-900 text-transparent md:text-6xl dark:from-white dark:via-white dark:to-slate-400 dark:text-white">
                        Membangun Desa Modern, Menjaga Potensi Alam
                    </h1>
                    <p className="mx-auto max-w-2xl text-base font-medium text-slate-600 md:text-lg dark:text-slate-400">
                        Selamat datang di gerbang digital resmi Desa Batu
                        Belerang, Kecamatan Sinjai Timur. Temukan kemudahan
                        layanan mandiri warga, transparansi pembangunan,
                        informasi UMKM, dan keindahan wisata belerang kami.
                    </p>
                    <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                        <Link
                            href="/register"
                            className="rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/15 transition-all hover:from-indigo-500 hover:to-indigo-400"
                        >
                            Layanan Mandiri Warga
                        </Link>
                        <Link
                            href="#"
                            className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                        >
                            Jelajahi Pariwisata Desa
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
            <div className="mx-auto max-w-7xl space-y-28 px-6 py-20">
                {/* Weather & Prayer Time Dashboard */}
                <section className="animate-fade-in scroll-mt-24">
                    <WeatherShalatWidget />
                </section>

                {/* Demographic Charts Section (Deferred Props) */}
                <section className="space-y-8">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                            Statistik Penduduk Desa
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Peta demografi kependudukan real-time Desa Batu
                            Belerang.
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
                                        <span className="h-3 w-3 rounded-full bg-indigo-600"></span>
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
                                                        className="w-8 cursor-pointer rounded-t-lg shadow-lg shadow-indigo-600/5 transition-all duration-300"
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

                {/* Agenda Kegiatan & Regulasi Desa */}
                <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    {/* Agenda Kegiatan */}
                    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 transition-colors dark:border-slate-800 dark:bg-slate-900/20 dark:shadow-none md:p-8">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Agenda Kegiatan Desa
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Jadwal acara & musyawarah mendatang
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {agendaData.map((item) => {
                                const eventDate = new Date(item.waktu_mulai);
                                const dateFormatted = eventDate.toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                });
                                const timeFormatted = eventDate.toLocaleTimeString('id-ID', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                });

                                return (
                                    <div
                                        key={item.id}
                                        className="group relative rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-305 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-slate-50 dark:border-slate-850 dark:bg-slate-900/10 dark:hover:border-slate-805 dark:hover:bg-slate-900/30"
                                    >
                                        <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                            {item.judul}
                                        </h4>
                                        {item.deskripsi && (
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                                                {item.deskripsi}
                                            </p>
                                        )}
                                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-405">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5 text-indigo-500" />
                                                <span>{dateFormatted} - {timeFormatted} WIB</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                                                <span>{item.lokasi}</span>
                                            </div>
                                        </div>
                                        {item.koordinator && (
                                            <div className="mt-2 flex items-center gap-1 border-t border-slate-100 pt-2 text-[10px] text-slate-400 dark:border-slate-800/40">
                                                <User className="h-3 w-3" />
                                                <span>Koordinator: {item.koordinator}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Regulasi & Produk Hukum */}
                    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 transition-colors dark:border-slate-800 dark:bg-slate-900/20 dark:shadow-none md:p-8">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Regulasi & Produk Hukum
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Peraturan & surat keputusan resmi desa
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {regulasiData.map((item) => {
                                const typeNames = {
                                    perdes: 'Peraturan Desa',
                                    perkades: 'Peraturan Kades',
                                    sk_kades: 'SK Kades',
                                    instruksi: 'Instruksi',
                                };
                                const badgeColors = {
                                    perdes: 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900/30',
                                    perkades: 'bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400 border-purple-100 dark:border-purple-900/30',
                                    sk_kades: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-100 dark:border-amber-900/30',
                                    instruksi: 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-100 dark:border-rose-900/30',
                                };

                                return (
                                    <div
                                        key={item.id}
                                        className="group flex items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-slate-50 dark:border-slate-850 dark:bg-slate-900/10 dark:hover:border-slate-800 dark:hover:bg-slate-900/30"
                                    >
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeColors[item.jenis]}`}>
                                                    {typeNames[item.jenis]}
                                                </span>
                                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                    {item.nomor}
                                                </span>
                                            </div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">
                                                {item.judul}
                                            </h4>
                                            {item.deskripsi && (
                                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                                    {item.deskripsi}
                                                </p>
                                            )}
                                        </div>
                                        <a
                                            href={item.file_path || '#'}
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-indigo-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-805 dark:hover:text-indigo-400"
                                            title="Unduh Berkas"
                                            download
                                        >
                                            <Download className="h-4 w-4" />
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* APBDes Transparancy Widget */}
                <section className="grid grid-cols-1 items-center gap-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-100/50 transition-colors md:grid-cols-2 md:p-12 dark:border-slate-800 dark:bg-slate-900/20 dark:shadow-none">
                    <div className="space-y-6">
                        <span className="block text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                            Akuntabilitas Keuangan
                        </span>
                        <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Transparansi Dana Desa & APBDesa {apbdes.tahun}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Sebagai komitmen mewujudkan tata kelola desa yang
                            bersih dan akuntabel, berikut rincian anggaran
                            pendapatan, belanja, dan pembiayaan Desa Batu
                            Belerang untuk tahun berjalan.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                                Lihat Laporan Keuangan Lengkap →
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Pendapatan */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    Pendapatan Desa
                                </span>
                                <span className="text-slate-500 dark:text-slate-400">
                                    Rp{' '}
                                    {apbdes.pendapatan.realisasi.toLocaleString(
                                        'id-ID',
                                    )}{' '}
                                    / Rp{' '}
                                    {apbdes.pendapatan.anggaran.toLocaleString(
                                        'id-ID',
                                    )}
                                </span>
                            </div>
                            <div className="h-3 w-full rounded-full border border-slate-200 bg-slate-100 dark:border-slate-800/40 dark:bg-slate-900">
                                <div
                                    className="h-2.5 rounded-full bg-indigo-500"
                                    style={{
                                        width: `${hitungPersentase(apbdes.pendapatan.realisasi, apbdes.pendapatan.anggaran)}%`,
                                    }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                                <span>Realisasi Pendapatan</span>
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    {hitungPersentase(
                                        apbdes.pendapatan.realisasi,
                                        apbdes.pendapatan.anggaran,
                                    )}
                                    %
                                </span>
                            </div>
                        </div>

                        {/* Belanja */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    Belanja Desa
                                </span>
                                <span className="text-slate-500 dark:text-slate-400">
                                    Rp{' '}
                                    {apbdes.belanja.realisasi.toLocaleString(
                                        'id-ID',
                                    )}{' '}
                                    / Rp{' '}
                                    {apbdes.belanja.anggaran.toLocaleString(
                                        'id-ID',
                                    )}
                                </span>
                            </div>
                            <div className="h-3 w-full rounded-full border border-slate-200 bg-slate-100 dark:border-slate-800/40 dark:bg-slate-900">
                                <div
                                    className="h-2.5 rounded-full bg-emerald-500"
                                    style={{
                                        width: `${hitungPersentase(apbdes.belanja.realisasi, apbdes.belanja.anggaran)}%`,
                                    }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                                <span>Realisasi Pengeluaran</span>
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    {hitungPersentase(
                                        apbdes.belanja.realisasi,
                                        apbdes.belanja.anggaran,
                                    )}
                                    %
                                </span>
                            </div>
                        </div>

                        {/* Pembiayaan */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    Pembiayaan Neto
                                </span>
                                <span className="text-slate-500 dark:text-slate-400">
                                    Rp{' '}
                                    {apbdes.pembiayaan.realisasi.toLocaleString(
                                        'id-ID',
                                    )}{' '}
                                    / Rp{' '}
                                    {apbdes.pembiayaan.anggaran.toLocaleString(
                                        'id-ID',
                                    )}
                                </span>
                            </div>
                            <div className="h-3 w-full rounded-full border border-slate-200 bg-slate-100 dark:border-slate-800/40 dark:bg-slate-900">
                                <div
                                    className="h-2.5 rounded-full bg-amber-500"
                                    style={{
                                        width: `${hitungPersentase(apbdes.pembiayaan.realisasi, apbdes.pembiayaan.anggaran)}%`,
                                    }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                                <span>Realisasi Pembiayaan</span>
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    {hitungPersentase(
                                        apbdes.pembiayaan.realisasi,
                                        apbdes.pembiayaan.anggaran,
                                    )}
                                    %
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Aparatur Pemerintah Desa */}
                <section className="space-y-10 scroll-mt-24">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div className="space-y-2 text-left">
                            <span className="block text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                                Struktur Organisasi
                            </span>
                            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                                Aparatur Pemerintah Desa
                            </h2>
                            <p className="max-w-lg text-sm text-slate-500 dark:text-slate-400">
                                Perangkat Desa Batu Belerang yang siap melayani kebutuhan administrasi dan kemajuan warga.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 self-start md:self-end">
                            <button
                                onClick={prevAparatur}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 shadow-sm"
                                aria-label="Aparatur Sebelumnya"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={nextAparatur}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 shadow-sm"
                                aria-label="Aparatur Selanjutnya"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-stretch relative">
                        {/* Kepala Desa - Pinned Left */}
                        <div className="w-full md:w-[240px] shrink-0 z-20 bg-slate-50 dark:bg-slate-950 relative md:pr-4 flex justify-center md:justify-start">
                            <div className="group flex flex-col items-center text-center space-y-3 w-[220px]">
                                <div className="relative overflow-hidden rounded-2xl border border-indigo-200 bg-indigo-50/50 shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg dark:border-indigo-900/50 dark:bg-indigo-950/20 w-full aspect-4/5">
                                    <img
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80"
                                        alt="SIRAJUDDIN, S.I.P"
                                        className="h-full w-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                        <span className="text-[10px] font-bold text-indigo-300 tracking-wider uppercase">
                                            Pemimpin Desa
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        SIRAJUDDIN, S.I.P
                                    </h4>
                                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                        Kepala Desa
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Carousel Wrapper with Slide/Fade-out Effect */}
                        <div className="flex-1 relative overflow-hidden">
                            {/* Left Fade-out Mask Overlay (Visible on md and up) */}
                            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-50 via-slate-50/40 to-transparent pointer-events-none z-10 dark:from-slate-950 dark:via-slate-950/40 hidden md:block" />

                            {/* Sliding Track */}
                            <div
                                className={`flex gap-6 py-2 ${transitionEnabled ? 'transition-transform duration-500 ease-out' : 'transition-none'}`}
                                style={{ transform: `translateX(-${aparaturIndex * (220 + 24)}px)` }}
                                onTransitionEnd={handleTransitionEnd}
                            >
                                {[
                                    // Set 1 (Klon Pertama)
                                    { nama: 'AKBAR HIJRI, S.IP', jabatan: 'Sekretaris Desa', foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'IRSAN RAMLI, S.A.P', jabatan: 'Kaur Keuangan', foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'RAFIKA, S.Pd.I, Gr', jabatan: 'Kasi Pemerintahan', foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'SAINAB, S.Pd', jabatan: 'Kasi Pelayanan', foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'ANWAR SADAT, S.Pd', jabatan: 'Kadus Babana', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
                                    
                                    // Set 2 (Klon Utama / Tengah)
                                    { nama: 'AKBAR HIJRI, S.IP', jabatan: 'Sekretaris Desa', foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'IRSAN RAMLI, S.A.P', jabatan: 'Kaur Keuangan', foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'RAFIKA, S.Pd.I, Gr', jabatan: 'Kasi Pemerintahan', foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'SAINAB, S.Pd', jabatan: 'Kasi Pelayanan', foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'ANWAR SADAT, S.Pd', jabatan: 'Kadus Babana', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
                                    
                                    // Set 3 (Klon Akhir)
                                    { nama: 'AKBAR HIJRI, S.IP', jabatan: 'Sekretaris Desa', foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'IRSAN RAMLI, S.A.P', jabatan: 'Kaur Keuangan', foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'RAFIKA, S.Pd.I, Gr', jabatan: 'Kasi Pemerintahan', foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'SAINAB, S.Pd', jabatan: 'Kasi Pelayanan', foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80' },
                                    { nama: 'ANWAR SADAT, S.Pd', jabatan: 'Kadus Babana', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group flex flex-col items-center text-center space-y-3 flex-none w-[220px]"
                                    >
                                        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md dark:border-slate-800 dark:bg-slate-900 w-full aspect-4/5">
                                            <img
                                                src={item.foto}
                                                alt={item.nama}
                                                className="h-full w-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                                                <span className="text-[10px] font-semibold text-slate-200 tracking-wide uppercase">
                                                    Batu Belerang
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {item.nama}
                                            </h4>
                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                {item.jabatan}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Services Links Grid */}
                <section className="space-y-8">
                    <div className="space-y-2 text-center">
                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                            Layanan & Fitur Unggulan
                        </h2>
                        <p className="mx-auto max-w-lg text-sm text-slate-500 dark:text-slate-400">
                            Akses instan ke berbagai layanan administrasi,
                            promosi warga, dan pengaduan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Card 1: Layanan Mandiri */}
                        <Link
                            href="/register"
                            className="group space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 transition-all duration-300 hover:bg-indigo-50/10 dark:border-slate-800 dark:bg-slate-900/35 dark:shadow-md dark:hover:border-indigo-500/40 dark:hover:bg-indigo-950/15"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-500/10 text-lg font-bold text-indigo-600 transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white dark:border-indigo-500/20 dark:text-indigo-400">
                                📄
                            </div>
                            <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                Layanan Mandiri
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                Ajukan permohonan surat keterangan (SKU, SKTM,
                                dsb.) secara mandiri dengan NIK dan PIN Anda.
                            </p>
                        </Link>

                        {/* Card 2: Lapak UMKM */}
                        <Link
                            href="#"
                            className="group space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 transition-all duration-300 hover:bg-emerald-50/10 dark:border-slate-800 dark:bg-slate-900/35 dark:shadow-md dark:hover:border-emerald-500/40 dark:hover:bg-emerald-950/15"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-500/10 text-lg font-bold text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white dark:border-emerald-500/20 dark:text-emerald-400">
                                🛍️
                            </div>
                            <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                                Etalase UMKM
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                Jelajahi berbagai produk makanan khas,
                                kerajinan, dan hasil tani warga Desa Batu
                                Belerang.
                            </p>
                        </Link>

                        {/* Card 3: Wisata */}
                        <Link
                            href="#"
                            className="group space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 transition-all duration-300 hover:bg-amber-50/10 dark:border-slate-800 dark:bg-slate-900/35 dark:shadow-md dark:hover:border-amber-500/40 dark:hover:bg-amber-950/15"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-amber-500/10 text-lg font-bold text-amber-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white dark:border-amber-500/20 dark:text-amber-400">
                                🌋
                            </div>
                            <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
                                Destinasi Wisata
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                Cek rute pemandian air panas, air terjun,
                                homestay, serta koordinat peta interaktif desa.
                            </p>
                        </Link>

                        {/* Card 4: Pengaduan */}
                        <Link
                            href="#"
                            className="group space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/50 transition-all duration-300 hover:bg-rose-50/10 dark:border-slate-800 dark:bg-slate-900/35 dark:shadow-md dark:hover:border-rose-500/40 dark:hover:bg-rose-950/15"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-200 bg-rose-500/10 text-lg font-bold text-rose-600 transition-colors duration-300 group-hover:bg-rose-500 group-hover:text-white dark:border-rose-500/20 dark:text-rose-400">
                                📣
                            </div>
                            <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-rose-600 dark:text-white dark:group-hover:text-rose-400">
                                Layanan Pengaduan
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                Sampaikan kritik, saran, maupun keluhan secara
                                tertulis (bisa anonim) demi transparansi.
                            </p>
                        </Link>
                    </div>
                </section>

                {/* Latest News (Kabar Desa) */}
                <section className="space-y-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="space-y-2 text-center sm:text-left">
                            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                                Kabar Desa Terkini
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Ikuti perkembangan berita dan kegiatan warga
                                Desa Batu Belerang.
                            </p>
                        </div>
                        <Link
                            href="#"
                            className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            Lihat Semua Berita <span>→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {beritaList.map((berita) => (
                            <div
                                key={berita.id}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-100/50 transition-transform duration-300 hover:-translate-y-1.5 dark:border-slate-800 dark:bg-slate-900/30 dark:shadow-none"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={berita.foto}
                                        alt={berita.judul}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute top-4 left-4 rounded border border-slate-200 bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 dark:text-indigo-300">
                                        {berita.kategori}
                                    </span>
                                </div>
                                <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                                            {berita.tanggal}
                                        </div>
                                        <h3 className="text-base leading-snug font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                            {berita.judul}
                                        </h3>
                                        <p className="line-clamp-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                            {berita.ringkasan}
                                        </p>
                                    </div>
                                    <Link
                                        href="#"
                                        className="block pt-2 text-xs font-semibold text-indigo-600 transition-colors group-hover:text-indigo-500 dark:text-indigo-400 dark:group-hover:text-indigo-300"
                                    >
                                        Baca Selengkapnya
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white text-slate-600 transition-colors dark:border-slate-900 dark:bg-slate-950 dark:text-slate-400">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 text-sm md:grid-cols-4">
                    <div className="col-span-1 space-y-4 md:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-500/20">
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
                                    className="transition-colors hover:text-indigo-600 dark:hover:text-white"
                                >
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="transition-colors hover:text-indigo-600 dark:hover:text-white"
                                >
                                    Profil Geografis
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="transition-colors hover:text-indigo-600 dark:hover:text-white"
                                >
                                    Kelembagaan Desa
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="transition-colors hover:text-indigo-600 dark:hover:text-white"
                                >
                                    Etalase UMKM
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="transition-colors hover:text-indigo-600 dark:hover:text-white"
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
                                    Kantor Kepala Desa:
                                </span>
                                Jl. Poros Batu Belerang, Sinjai Timur, Kabupaten
                                Sinjai, Sulawesi Selatan.
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
