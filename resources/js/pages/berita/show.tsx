import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import React from 'react';
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
}

interface ProfilDesa {
    nama_desa: string;
    nama_kecamatan: string;
    nama_kabupaten: string;
    alamat_kantor: string;
}

export default function BeritaShow({
    berita,
    beritaLainnya = [],
    profilDesa,
}: {
    berita: BeritaItem;
    beritaLainnya: BeritaItem[];
    profilDesa?: ProfilDesa;
}) {
    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 transition-colors duration-300 selection:bg-emerald-500 selection:text-white dark:bg-slate-950 dark:text-slate-100">
            <Head>
                <title>{`${berita.judul} - Desa Batu Belerang`}</title>
                <meta name="description" content={berita.ringkasan} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={berita.judul} />
                <meta property="og:description" content={berita.ringkasan} />
                <meta property="og:image" content={berita.foto_path || 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&auto=format&fit=crop&q=60'} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={berita.judul} />
                <meta name="twitter:description" content={berita.ringkasan} />
                <meta name="twitter:image" content={berita.foto_path || 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&auto=format&fit=crop&q=60'} />
            </Head>

            {/* Public Header */}
            <PublicNavbar />

            {/* Header Spacing */}
            <div className="pt-24 md:pt-28" />

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        href="/berita"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors dark:text-slate-400 dark:hover:text-emerald-400"
                    >
                        <ArrowLeft className="size-4" /> Kembali ke Semua Berita
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    {/* Main News Article (Col 8) */}
                    <article className="lg:col-span-8 space-y-6">
                        {/* Meta Category & Date */}
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                {berita.kategori}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                <Calendar className="size-3.5 text-emerald-500" />
                                <span>{formatDate(berita.tanggal_publikasi)}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
                            {berita.judul}
                        </h1>

                        {/* Summary Lead Box */}
                        <div className="rounded-xl border border-emerald-200/60 bg-emerald-50/40 p-4 text-xs md:text-sm font-medium leading-relaxed text-slate-700 dark:border-emerald-900/30 dark:bg-emerald-950/20 dark:text-slate-300">
                            {berita.ringkasan}
                        </div>

                        {/* Featured Image */}
                        <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md dark:border-slate-800 dark:bg-slate-900">
                            <img
                                src={berita.foto_path || 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&auto=format&fit=crop&q=60'}
                                alt={berita.judul}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Full Article Content */}
                        <div className="space-y-4 pt-2 text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                            {berita.isi ? (
                                berita.isi.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))
                            ) : (
                                <p>{berita.ringkasan}</p>
                            )}
                        </div>
                    </article>

                    {/* Sidebar Recommended News (Col 4) */}
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 space-y-4">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                                Berita Lainnya
                            </h3>

                            <div className="space-y-4">
                                {beritaLainnya.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/berita/${item.slug}`}
                                        className="group flex gap-3 items-start"
                                    >
                                        <div className="relative aspect-4/3 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                                            <img
                                                src={item.foto_path || 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&auto=format&fit=crop&q=60'}
                                                alt={item.judul}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="space-y-1 min-w-0">
                                            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                                {item.kategori}
                                            </span>
                                            <h4 className="text-xs font-bold leading-snug text-slate-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 line-clamp-2">
                                                {item.judul}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white text-slate-600 transition-colors mt-12 dark:border-slate-900 dark:bg-slate-950 dark:text-slate-400">
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
                            Portal resmi informasi publik Desa Batu Belerang, Kecamatan Sinjai Borong.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

BeritaShow.layout = (page: React.ReactNode) => page;
