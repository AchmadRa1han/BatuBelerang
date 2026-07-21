import { Head, Link } from '@inertiajs/react';
import { Search, Calendar, Tag, ArrowRight, ArrowLeft, Filter } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import PublicNavbar from '@/components/public-navbar';

interface BeritaItem {
    id: number;
    judul: string;
    slug: string;
    kategori: string;
    ringkasan: string;
    isi?: string;
    foto_path?: string;
    tanggal_publikasi: string;
    is_headline: boolean;
}

interface ProfilDesa {
    nama_desa: string;
    nama_kecamatan: string;
    nama_kabupaten: string;
    alamat_kantor: string;
}

export default function BeritaIndex({
    beritaList = [],
    profilDesa,
}: {
    beritaList: BeritaItem[];
    profilDesa?: ProfilDesa;
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    // Extract unique categories
    const categories = useMemo(() => {
        const set = new Set<string>();
        beritaList.forEach(b => {
            if (b.kategori) set.add(b.kategori);
        });
        return ['Semua', ...Array.from(set)];
    }, [beritaList]);

    // Filter news items
    const filteredBerita = useMemo(() => {
        return beritaList.filter(b => {
            const matchesCategory = selectedCategory === 'Semua' || b.kategori === selectedCategory;
            const matchesSearch =
                b.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.ringkasan.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [beritaList, selectedCategory, searchQuery]);

    // Headline news item
    const headlineItem = useMemo(() => {
        if (selectedCategory !== 'Semua' || searchQuery) return null;
        return beritaList.find(b => b.is_headline) || beritaList[0];
    }, [beritaList, selectedCategory, searchQuery]);

    // Grid news items (excluding headline if present)
    const gridBerita = useMemo(() => {
        if (!headlineItem) return filteredBerita;
        return filteredBerita.filter(b => b.id !== headlineItem.id);
    }, [filteredBerita, headlineItem]);

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 transition-colors duration-300 selection:bg-emerald-500 selection:text-white dark:bg-slate-950 dark:text-slate-100">
            <Head title="Kabar & Informasi Berita Desa Batu Belerang" />

            {/* Public Header */}
            <PublicNavbar />

            {/* Hero Header Banner */}
            <section className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 pt-32 pb-16 md:pt-40 md:pb-20 text-white border-b border-slate-800">
                <div className="mx-auto max-w-7xl px-6 text-center space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mb-2"
                    >
                        <ArrowLeft className="size-3.5" /> Kembali ke Beranda
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                        Arsip Berita & Informasi Desa
                    </h1>
                    <p className="mx-auto max-w-2xl text-xs md:text-sm text-slate-400 leading-relaxed">
                        Pusat publikasi kabar terbaru, pengumuman pemerintah desa, kegiatan kemasyarakatan, dan transparansi pembangunan Desa Batu Belerang.
                    </p>
                </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="mx-auto max-w-7xl px-6 -mt-8 relative z-20">
                <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 md:p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari berita desa..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            />
                        </div>

                        {/* Total News Count */}
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium self-end sm:self-center">
                            Menampilkan <span className="font-bold text-slate-900 dark:text-white">{filteredBerita.length}</span> artikel berita
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
                        <Filter className="size-3.5 text-slate-400 shrink-0 mr-1" />
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                    selectedCategory === cat
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="mx-auto max-w-7xl px-6 py-12 space-y-12">
                {/* 👑 Headline Featured News (If no filter applied) */}
                {headlineItem && (
                    <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 p-1 shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 rounded-xl bg-slate-900/90 p-6 md:p-8 backdrop-blur-md">
                            <div className="md:col-span-6 lg:col-span-5 relative aspect-16/9 md:aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-800 shrink-0">
                                <img
                                    src={headlineItem.foto_path || 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&auto=format&fit=crop&q=60'}
                                    alt={headlineItem.judul}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <span className="absolute top-3 left-3 flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-md">
                                    ⭐ BERITA UTAMA
                                </span>
                            </div>
                            <div className="md:col-span-6 lg:col-span-7 space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                                        {headlineItem.kategori}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        • {formatDate(headlineItem.tanggal_publikasi)}
                                    </span>
                                </div>
                                <h2 className="text-xl md:text-3xl font-extrabold leading-tight text-white transition-colors group-hover:text-emerald-400">
                                    {headlineItem.judul}
                                </h2>
                                <p className="line-clamp-3 text-xs md:text-sm leading-relaxed text-slate-300">
                                    {headlineItem.ringkasan}
                                </p>
                                <div className="pt-2">
                                    <Link
                                        href={`/berita/${headlineItem.slug}`}
                                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500"
                                    >
                                        Baca Berita Utama <ArrowRight className="size-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* News Cards Grid */}
                {gridBerita.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {gridBerita.map((item) => (
                            <Link
                                key={item.id}
                                href={`/berita/${item.slug}`}
                                className="group flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-100/50 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none dark:hover:border-slate-700"
                            >
                                <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={item.foto_path || 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&auto=format&fit=crop&q=60'}
                                        alt={item.judul}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute top-3 left-3 rounded-md border border-slate-200 bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 dark:text-emerald-300">
                                        {item.kategori}
                                    </span>
                                </div>
                                <div className="flex flex-1 flex-col justify-between p-5 space-y-3">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                            <Calendar className="size-3 text-emerald-500" />
                                            <span>{formatDate(item.tanggal_publikasi)}</span>
                                        </div>
                                        <h3 className="text-sm md:text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 line-clamp-2">
                                            {item.judul}
                                        </h3>
                                        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                                            {item.ringkasan}
                                        </p>
                                    </div>
                                    <div className="pt-2 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500">
                                        <span>Baca Artikel</span>
                                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800 space-y-3">
                        <Tag className="size-10 text-slate-400 mx-auto" />
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            Tidak Ada Berita Ditemukan
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Coba ubah kata kunci pencarian atau pilih kategori berita lain.
                        </p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white text-slate-600 transition-colors dark:border-slate-900 dark:bg-slate-950 dark:text-slate-400">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 text-sm md:grid-cols-4">
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
                            Portal resmi informasi publik dan publikasi kabar terkini Pemerintah Desa Batu Belerang, Kecamatan Sinjai Borong, Kabupaten Sinjai.
                        </p>
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            © {new Date().getFullYear()} Pemerintah Desa Batu Belerang. All Rights Reserved.
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold tracking-wide text-slate-900 dark:text-white">
                            Navigasi Portal
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/" className="hover:text-emerald-600 dark:hover:text-white">
                                    Beranda Utama
                                </Link>
                            </li>
                            <li>
                                <Link href="/berita" className="hover:text-emerald-600 dark:hover:text-white">
                                    Arsip Berita Desa
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="hover:text-emerald-600 dark:hover:text-white">
                                    Layanan Mandiri Warga
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold tracking-wide text-slate-900 dark:text-white">
                            Alamat Kantor Desa
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li className="leading-relaxed">
                                {profilDesa?.alamat_kantor || 'Jalan Poros Biji Nangka - Batu Belerang, Kec. Sinjai Borong, Kabupaten Sinjai, Sulawesi Selatan.'}
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}

BeritaIndex.layout = (page: React.ReactNode) => page;
