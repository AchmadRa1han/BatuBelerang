import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

interface DemografiData {
    gender: Array<{ name: string; value: number }>;
    agama: Array<{ name: string; value: number }>;
    dusun: Array<{ name: string; value: number }>;
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
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6'];

export default function Welcome({ stats, demografi }: Props) {
    const { auth } = usePage().props as any;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeGenderIndex, setActiveGenderIndex] = useState<number | null>(null);
    const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

    // Mock data untuk fallback jika database kosong
    const fallbackGender = [
        { name: 'Laki-laki', value: 612 },
        { name: 'Perempuan', value: 636 }
    ];

    const fallbackAgama = [
        { name: 'Islam', value: 1242 },
        { name: 'Kristen', value: 6 }
    ];

    const fallbackDusun = [
        { name: 'Dusun I', value: 310 },
        { name: 'Dusun II', value: 295 },
        { name: 'Dusun III', value: 345 },
        { name: 'Dusun IV', value: 298 }
    ];

    const genderData = demografi?.gender?.length ? demografi.gender : fallbackGender;
    const religionData = demografi?.agama?.length ? demografi.agama : fallbackAgama;
    const dusunData = demografi?.dusun?.length ? demografi.dusun : fallbackDusun;

    // Kalkulasi Donut Chart Gender
    const totalGender = genderData.reduce((acc, curr) => acc + curr.value, 0);
    const radius = 60;
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius; // ~377

    // Berita Acara
    const beritaList = [
        {
            id: 1,
            judul: "Peresmian Kolam Rendam Air Panas Belerang Baru",
            kategori: "Pariwisata",
            tanggal: "09 Jul 2026",
            ringkasan: "Pemerintah Desa meresmikan kolam berendam belerang baru dan gazebo bersantai bagi wisatawan lokal maupun mancanegara.",
            foto: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 2,
            judul: "Penyaluran Bantuan Langsung Tunai (BLT) Tahap Kedua Sukses Terlaksana",
            kategori: "Kesejahteraan Warga",
            tanggal: "07 Jul 2026",
            ringkasan: "Sebanyak 78 keluarga penerima manfaat di seluruh dusun menerima penyaluran bantuan tunai guna mendukung perekonomian lokal.",
            foto: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 3,
            judul: "Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) TA 2027",
            kategori: "Pemerintahan",
            tanggal: "02 Jul 2026",
            ringkasan: "Warga berkumpul mendiskusikan rencana pembangunan infrastruktur jalan tani dan perluasan jangkauan air bersih.",
            foto: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60"
        }
    ];

    // APBDesa Keuangan
    const apbdes = {
        tahun: 2026,
        pendapatan: { anggaran: 1200000000, realisasi: 980000000 },
        belanja: { anggaran: 1150000000, realisasi: 720000000 },
        pembiayaan: { anggaran: 50000000, realisasi: 50000000 }
    };

    const hitungPersentase = (realisasi: number, anggaran: number) => {
        return Math.min(Math.round((realisasi / anggaran) * 100), 100);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-850 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden transition-colors duration-300">
            <Head title="Website Resmi Desa Batu Belerang" />

            {/* Navigation Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/80 dark:border-slate-900 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
                <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-650 to-emerald-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                            BB
                        </div>
                        <div>
                            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white block">Batu Belerang</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase block -mt-1">Sinjai Timur</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
                        <Link href="/" className="hover:text-indigo-605 dark:hover:text-indigo-400 transition-colors text-slate-900 dark:text-white font-semibold">Beranda</Link>
                        <Link href="#" className="hover:text-indigo-605 dark:hover:text-indigo-400 transition-colors">Profil</Link>
                        <Link href="#" className="hover:text-indigo-605 dark:hover:text-indigo-400 transition-colors">Lembaga</Link>
                        <Link href="#" className="hover:text-indigo-605 dark:hover:text-indigo-400 transition-colors" prefetch>UMKM</Link>
                        <Link href="#" className="hover:text-indigo-605 dark:hover:text-indigo-400 transition-colors" prefetch>Wisata</Link>
                        <Link href="/debug/database" className="hover:text-indigo-605 dark:hover:text-indigo-400 transition-colors" prefetch>DB Inspector</Link>
                    </nav>

                    {/* Auth Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {auth.user ? (
                            <Link 
                                href="/dashboard" 
                                className="px-4.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-500/10 transition-all"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link 
                                    href="/login" 
                                    className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="px-4.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all"
                                >
                                    Layanan Mandiri
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:outline-none"
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-b border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-955 p-6 space-y-4 text-sm font-medium transition-colors">
                        <Link href="/" className="block text-slate-900 dark:text-white">Beranda</Link>
                        <Link href="#" className="block text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Profil</Link>
                        <Link href="#" className="block text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Lembaga</Link>
                        <Link href="#" className="block text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">UMKM</Link>
                        <Link href="#" className="block text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Wisata</Link>
                        <Link href="/debug/database" className="block text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">DB Inspector</Link>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex gap-4">
                            {auth.user ? (
                                <Link href="/dashboard" className="flex-1 text-center py-2.5 bg-indigo-650 text-white rounded-xl text-xs font-semibold">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="flex-1 text-center py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold">
                                        Login
                                    </Link>
                                    <Link href="/register" className="flex-1 text-center py-2.5 bg-indigo-650 text-white rounded-xl text-xs font-semibold">
                                        Layanan Mandiri
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-slate-50 to-slate-50 dark:from-indigo-900/10 dark:via-slate-950 dark:to-slate-955 transition-colors">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"></div>

                <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
                    <span className="inline-flex px-3.5 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider">
                        Portal Resmi Desa Batu Belerang
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto bg-gradient-to-b from-slate-950 via-slate-800 to-slate-655 dark:from-white dark:via-white dark:to-slate-400 bg-clip-text text-transparent">
                        Membangun Desa Modern, Menjaga Potensi Alam
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        Selamat datang di gerbang digital resmi Desa Batu Belerang, Kecamatan Sinjai Timur. Temukan kemudahan layanan mandiri warga, transparansi pembangunan, informasi UMKM, dan keindahan wisata belerang kami.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link 
                            href="/register" 
                            className="px-6 py-3.5 bg-gradient-to-tr from-indigo-600 to-indigo-505 hover:from-indigo-505 hover:to-indigo-455 text-white rounded-xl font-semibold shadow-md shadow-indigo-600/15 transition-all text-sm"
                        >
                            Layanan Mandiri Warga
                        </Link>
                        <Link 
                            href="#" 
                            className="px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:hover:border-slate-700 text-slate-700 dark:text-slate-205 rounded-xl font-semibold transition-all text-sm"
                        >
                            Jelajahi Pariwisata Desa
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Stats Widget */}
            <section className="relative z-20 -mt-12 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white/90 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-850 p-6 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-955/50 transition-colors">
                    <div className="p-4 text-center border-r border-slate-150 dark:border-slate-800/40 last:border-0 col-span-1">
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.warga > 0 ? stats.warga : 1254}</div>
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">Total Warga</div>
                    </div>
                    <div className="p-4 text-center border-r border-slate-150 dark:border-slate-800/40 last:border-0 col-span-1">
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.kk > 0 ? stats.kk : 382}</div>
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">Kartu Keluarga</div>
                    </div>
                    <div className="p-4 text-center border-r border-slate-150 dark:border-slate-800/40 last:border-0 col-span-1">
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.dusun > 0 ? stats.dusun : 4}</div>
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">Wilayah Dusun</div>
                    </div>
                    <div className="p-4 text-center border-r border-slate-150 dark:border-slate-800/40 last:border-0 col-span-1">
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.umkm > 0 ? stats.umkm : 24}</div>
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">UMKM Warga</div>
                    </div>
                    <div className="p-4 text-center col-span-2 md:col-span-1">
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.wisata > 0 ? stats.wisata : 3}</div>
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">Spot Wisata</div>
                    </div>
                </div>
            </section>

            {/* Main Content Sections */}
            <div className="max-w-7xl mx-auto px-6 py-20 space-y-28">

                {/* Demographic Charts Section (Deferred Props) */}
                <section className="space-y-8">
                    <div className="text-center md:text-left space-y-2">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Statistik Penduduk Desa</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Peta demografi kependudukan real-time Desa Batu Belerang.</p>
                    </div>

                    {!demografi ? (
                        /* Skeleton Loading */
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white/80 border border-slate-200 dark:bg-slate-900/30 dark:border-slate-850 p-6 rounded-2xl h-[320px] flex flex-col justify-between animate-pulse">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
                                    <div className="h-40 bg-slate-100 dark:bg-slate-800/50 rounded-lg flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full border-4 border-slate-350 dark:border-slate-700 border-t-transparent animate-spin"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Custom dependency-free SVG Charts */
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Gender Chart (SVG Donut) */}
                            <div className="bg-white border border-slate-200 dark:bg-slate-900/30 dark:border-slate-850 p-6 rounded-2xl flex flex-col justify-between min-h-[340px] shadow-sm shadow-slate-100/50 dark:shadow-none">
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide mb-2">Rasio Jenis Kelamin</h3>
                                <div className="flex-1 flex items-center justify-center relative">
                                    <svg width="160" height="160" className="transform -rotate-90">
                                        {(() => {
                                            const val1 = genderData[0]?.value || 0;
                                            const val2 = genderData[1]?.value || 0;
                                            const total = (val1 + val2) || 1;
                                            const p1 = (val1 / total) * circumference;
                                            const p2 = (val2 / total) * circumference;
                                            return (
                                                <>
                                                    {/* Segment 1: Laki-laki */}
                                                    <circle
                                                        cx="80"
                                                        cy="80"
                                                        r={radius}
                                                        fill="transparent"
                                                        stroke="#4f46e5"
                                                        strokeWidth={strokeWidth}
                                                        strokeDasharray={`${p1} ${circumference}`}
                                                        className="transition-all duration-500 cursor-pointer"
                                                        onMouseEnter={() => setActiveGenderIndex(0)}
                                                        onMouseLeave={() => setActiveGenderIndex(null)}
                                                        opacity={activeGenderIndex === 1 ? 0.4 : 1}
                                                    />
                                                    {/* Segment 2: Perempuan */}
                                                    <circle
                                                        cx="80"
                                                        cy="80"
                                                        r={radius}
                                                        fill="transparent"
                                                        stroke="#10b981"
                                                        strokeWidth={strokeWidth}
                                                        strokeDasharray={`${p2} ${circumference}`}
                                                        strokeDashoffset={-p1}
                                                        className="transition-all duration-500 cursor-pointer"
                                                        onMouseEnter={() => setActiveGenderIndex(1)}
                                                        onMouseLeave={() => setActiveGenderIndex(null)}
                                                        opacity={activeGenderIndex === 0 ? 0.4 : 1}
                                                    />
                                                </>
                                            );
                                        })()}
                                    </svg>
                                    <div className="absolute flex flex-col items-center justify-center text-center">
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                                            {activeGenderIndex !== null 
                                                ? genderData[activeGenderIndex]?.value 
                                                : totalGender || 1248
                                            }
                                        </span>
                                        <span className="text-[10px] text-slate-550 dark:text-slate-400 uppercase font-semibold tracking-wider">
                                            {activeGenderIndex !== null 
                                                ? genderData[activeGenderIndex]?.name 
                                                : 'Total Jiwa'
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 mt-4">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-3 h-3 rounded-full bg-indigo-650"></span>
                                        Laki-laki ({genderData[0]?.value || 612})
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                        Perempuan ({genderData[1]?.value || 636})
                                    </span>
                                </div>
                            </div>

                            {/* Religion Chart (Horizontal Progress Bars) */}
                            <div className="bg-white border border-slate-200 dark:bg-slate-900/30 dark:border-slate-850 p-6 rounded-2xl flex flex-col justify-between min-h-[340px] shadow-sm shadow-slate-100/50 dark:shadow-none">
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide mb-4">Komposisi Agama</h3>
                                <div className="flex-1 flex flex-col justify-center space-y-4">
                                    {(() => {
                                        const total = religionData.reduce((acc, curr) => acc + curr.value, 0) || 1;
                                        return religionData.map((item, idx) => {
                                            const pct = Math.round((item.value / total) * 100);
                                            return (
                                                <div key={item.name} className="space-y-1.5">
                                                    <div className="flex justify-between text-xs font-medium">
                                                        <span className="text-slate-700 dark:text-slate-300">{item.name}</span>
                                                        <span className="text-slate-550 dark:text-slate-400">{item.value} ({pct}%)</span>
                                                    </div>
                                                    <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-2">
                                                        <div 
                                                            className="h-2 rounded-full transition-all duration-1000"
                                                            style={{ 
                                                                backgroundColor: COLORS[idx % COLORS.length],
                                                                width: `${pct}%`
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                                    Grafik sebaran keyakinan penduduk terdaftar.
                                </div>
                            </div>

                            {/* Dusun Chart (SVG Bar Chart) */}
                            <div className="bg-white border border-slate-200 dark:bg-slate-900/30 dark:border-slate-850 p-6 rounded-2xl flex flex-col justify-between min-h-[340px] shadow-sm shadow-slate-100/50 dark:shadow-none">
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide mb-2">Populasi per Dusun</h3>
                                <div className="flex-1 flex items-end justify-between px-2 h-44">
                                    {(() => {
                                        const maxVal = Math.max(...dusunData.map(d => d.value), 1);
                                        const chartHeight = 130;
                                        return dusunData.map((item, idx) => {
                                            const barH = (item.value / maxVal) * chartHeight;
                                            const isHovered = hoveredBarIndex === idx;
                                            return (
                                                <div 
                                                    key={item.name} 
                                                    className="flex flex-col items-center flex-1 group"
                                                    onMouseEnter={() => setHoveredBarIndex(idx)}
                                                    onMouseLeave={() => setHoveredBarIndex(null)}
                                                >
                                                    {/* Tooltip on top */}
                                                    <div className={`mb-2 bg-slate-900 dark:bg-slate-950 border border-slate-800 text-[10px] text-white px-2 py-0.5 rounded font-mono transition-opacity duration-200 ${
                                                        isHovered ? 'opacity-100' : 'opacity-0'
                                                    }`}>
                                                        {item.value}
                                                    </div>
                                                    {/* Bar rect */}
                                                    <div 
                                                        className="w-8 rounded-t-lg transition-all duration-300 cursor-pointer shadow-lg shadow-indigo-650/5"
                                                        style={{ 
                                                            height: `${barH}px`,
                                                            backgroundColor: isHovered ? '#6366f1' : COLORS[idx % COLORS.length]
                                                        }}
                                                    ></div>
                                                    {/* X Label */}
                                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide mt-2">
                                                        {item.name.replace('Dusun ', 'D. ')}
                                                    </span>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                                    Penyebaran penduduk di 4 dusun administratif.
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* APBDes Transparancy Widget */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-850 p-8 md:p-12 rounded-3xl shadow-sm shadow-slate-100/50 dark:shadow-none transition-colors">
                    <div className="space-y-6">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">Akuntabilitas Keuangan</span>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">Transparansi Dana Desa & APBDesa {apbdes.tahun}</h2>
                        <p className="text-sm text-slate-655 dark:text-slate-400">
                            Sebagai komitmen mewujudkan tata kelola desa yang bersih dan akuntabel, berikut rincian anggaran pendapatan, belanja, dan pembiayaan Desa Batu Belerang untuk tahun berjalan.
                        </p>
                        <div className="pt-2">
                            <Link href="#" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                                Lihat Laporan Keuangan Lengkap →
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Pendapatan */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-slate-900 dark:text-white">Pendapatan Desa</span>
                                <span className="text-slate-550 dark:text-slate-400">Rp {apbdes.pendapatan.realisasi.toLocaleString('id-ID')} / Rp {apbdes.pendapatan.anggaran.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-3 border border-slate-200 dark:border-slate-800/40">
                                <div 
                                    className="bg-indigo-550 h-2.5 rounded-full" 
                                    style={{ width: `${hitungPersentase(apbdes.pendapatan.realisasi, apbdes.pendapatan.anggaran)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                                <span>Realisasi Pendapatan</span>
                                <span className="font-semibold text-slate-900 dark:text-white">{hitungPersentase(apbdes.pendapatan.realisasi, apbdes.pendapatan.anggaran)}%</span>
                            </div>
                        </div>

                        {/* Belanja */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-slate-900 dark:text-white">Belanja Desa</span>
                                <span className="text-slate-550 dark:text-slate-400">Rp {apbdes.belanja.realisasi.toLocaleString('id-ID')} / Rp {apbdes.belanja.anggaran.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-3 border border-slate-200 dark:border-slate-800/40">
                                <div 
                                    className="bg-emerald-500 h-2.5 rounded-full" 
                                    style={{ width: `${hitungPersentase(apbdes.belanja.realisasi, apbdes.belanja.anggaran)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-550 dark:text-slate-400">
                                <span>Realisasi Pengeluaran</span>
                                <span className="font-semibold text-slate-900 dark:text-white">{hitungPersentase(apbdes.belanja.realisasi, apbdes.belanja.anggaran)}%</span>
                            </div>
                        </div>

                        {/* Pembiayaan */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-slate-900 dark:text-white">Pembiayaan Neto</span>
                                <span className="text-slate-550 dark:text-slate-400">Rp {apbdes.pembiayaan.realisasi.toLocaleString('id-ID')} / Rp {apbdes.pembiayaan.anggaran.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-3 border border-slate-200 dark:border-slate-800/40">
                                <div 
                                    className="bg-amber-500 h-2.5 rounded-full" 
                                    style={{ width: `${hitungPersentase(apbdes.pembiayaan.realisasi, apbdes.pembiayaan.anggaran)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-550 dark:text-slate-400">
                                <span>Realisasi Pembiayaan</span>
                                <span className="font-semibold text-slate-900 dark:text-white">{hitungPersentase(apbdes.pembiayaan.realisasi, apbdes.pembiayaan.anggaran)}%</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Services Links Grid */}
                <section className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Layanan & Fitur Unggulan</h2>
                        <p className="text-sm text-slate-550 dark:text-slate-400 max-w-lg mx-auto">Akses instan ke berbagai layanan administrasi, promosi warga, dan pengaduan.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1: Layanan Mandiri */}
                        <Link href="/register" className="p-6 bg-white hover:bg-indigo-50/10 border border-slate-200 dark:bg-slate-900/35 dark:hover:bg-indigo-950/15 dark:border-slate-850 dark:hover:border-indigo-500/40 rounded-2xl space-y-4 group transition-all duration-300 shadow-sm shadow-slate-100/50 dark:shadow-md">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-200 dark:border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                📄
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Layanan Mandiri</h3>
                            <p className="text-xs leading-relaxed text-slate-555 dark:text-slate-400">
                                Ajukan permohonan surat keterangan (SKU, SKTM, dsb.) secara mandiri dengan NIK dan PIN Anda.
                            </p>
                        </Link>

                        {/* Card 2: Lapak UMKM */}
                        <Link href="#" className="p-6 bg-white hover:bg-emerald-50/10 border border-slate-200 dark:bg-slate-900/35 dark:hover:bg-emerald-955/15 dark:border-slate-850 dark:hover:border-emerald-500/40 rounded-2xl space-y-4 group transition-all duration-300 shadow-sm shadow-slate-100/50 dark:shadow-md">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-200 dark:border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                🛍️
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Etalase UMKM</h3>
                            <p className="text-xs leading-relaxed text-slate-555 dark:text-slate-400">
                                Jelajahi berbagai produk makanan khas, kerajinan, dan hasil tani warga Desa Batu Belerang.
                            </p>
                        </Link>

                        {/* Card 3: Wisata */}
                        <Link href="#" className="p-6 bg-white hover:bg-amber-50/10 border border-slate-200 dark:bg-slate-900/35 dark:hover:bg-amber-955/15 dark:border-slate-850 dark:hover:border-amber-500/40 rounded-2xl space-y-4 group transition-all duration-300 shadow-sm shadow-slate-100/50 dark:shadow-md">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-605 dark:text-amber-400 flex items-center justify-center font-bold text-lg border border-amber-200 dark:border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                                🌋
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Destinasi Wisata</h3>
                            <p className="text-xs leading-relaxed text-slate-555 dark:text-slate-400">
                                Cek rute pemandian air panas, air terjun, homestay, serta koordinat peta interaktif desa.
                            </p>
                        </Link>

                        {/* Card 4: Pengaduan */}
                        <Link href="#" className="p-6 bg-white hover:bg-rose-50/10 border border-slate-200 dark:bg-slate-900/35 dark:hover:bg-rose-955/15 dark:border-slate-850 dark:hover:border-rose-500/40 rounded-2xl space-y-4 group transition-all duration-300 shadow-sm shadow-slate-100/50 dark:shadow-md">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-lg border border-rose-200 dark:border-rose-500/20 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                                📣
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">Layanan Pengaduan</h3>
                            <p className="text-xs leading-relaxed text-slate-555 dark:text-slate-400">
                                Sampaikan kritik, saran, maupun keluhan secara tertulis (bisa anonim) demi transparansi.
                            </p>
                        </Link>
                    </div>
                </section>

                {/* Latest News (Kabar Desa) */}
                <section className="space-y-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="space-y-2 text-center sm:text-left">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Kabar Desa Terkini</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Ikuti perkembangan berita dan kegiatan warga Desa Batu Belerang.</p>
                        </div>
                        <Link href="#" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 flex items-center gap-1.5 transition-colors">
                            Lihat Semua Berita <span>→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {beritaList.map((berita) => (
                            <div key={berita.id} className="bg-white border border-slate-200 dark:bg-slate-900/30 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm shadow-slate-100/50 dark:shadow-none hover:-translate-y-1.5 transition-transform duration-300 flex flex-col h-full group">
                                <div className="h-44 overflow-hidden relative">
                                    <img 
                                        src={berita.foto} 
                                        alt={berita.judul}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                    <span className="absolute top-4 left-4 px-2.5 py-0.5 bg-white/90 dark:bg-slate-955/80 backdrop-blur-md text-[10px] font-bold text-indigo-750 dark:text-indigo-300 rounded border border-slate-200 dark:border-slate-805">
                                        {berita.kategori}
                                    </span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <div className="text-[10px] text-slate-400 dark:text-slate-550 font-semibold">{berita.tanggal}</div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
                                            {berita.judul}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                                            {berita.ringkasan}
                                        </p>
                                    </div>
                                    <Link href="#" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors pt-2 block">
                                        Baca Selengkapnya
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 dark:bg-slate-955 dark:border-slate-900 text-slate-655 dark:text-slate-400 transition-colors">
                <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
                    <div className="space-y-4 col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                                BB
                            </div>
                            <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Desa Batu Belerang</span>
                        </div>
                        <p className="max-w-sm leading-relaxed text-xs">
                            Pusat pelayanan digital terpadu untuk efisiensi urusan administrasi warga dan publikasi keindahan wisata alam pemandian air panas serta air terjun Desa Batu Belerang.
                        </p>
                        <div className="text-xs font-semibold text-slate-400 dark:text-slate-505">
                            © {new Date().getFullYear()} Pemerintah Desa Batu Belerang. All Rights Reserved.
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-wide">Peta Navigasi</h4>
                        <ul className="space-y-2 text-xs">
                            <li><Link href="/" className="hover:text-indigo-650 dark:hover:text-white transition-colors">Beranda</Link></li>
                            <li><Link href="#" className="hover:text-indigo-655 dark:hover:text-white transition-colors">Profil Geografis</Link></li>
                            <li><Link href="#" className="hover:text-indigo-655 dark:hover:text-white transition-colors">Kelembagaan Desa</Link></li>
                            <li><Link href="#" className="hover:text-indigo-655 dark:hover:text-white transition-colors">Etalase UMKM</Link></li>
                            <li><Link href="#" className="hover:text-indigo-655 dark:hover:text-white transition-colors">Informasi Wisata</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-wide">Hubungi Kami</h4>
                        <ul className="space-y-3 text-xs">
                            <li className="leading-relaxed">
                                <span className="block font-semibold text-slate-800 dark:text-slate-300">Kantor Kepala Desa:</span>
                                Jl. Poros Batu Belerang, Sinjai Timur, Kabupaten Sinjai, Sulawesi Selatan.
                            </li>
                            <li>
                                <span className="block font-semibold text-slate-800 dark:text-slate-300">Email Hubungan:</span>
                                info@batubelerang.desa.id
                            </li>
                            <li>
                                <span className="block font-semibold text-slate-800 dark:text-slate-300">Telepon Hubungan:</span>
                                +62 812-3456-7890
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
