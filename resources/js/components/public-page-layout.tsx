import { Head, Link } from '@inertiajs/react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import React from 'react';
import PublicNavbar from '@/components/public-navbar';

interface SideMenuItem {
    title: string;
    href: string;
    active?: boolean;
}

interface PublicPageLayoutProps {
    title: string;
    subtitle?: string;
    category: 'Profil Desa' | 'Pemerintahan' | 'Lembaga Desa';
    breadcrumbs?: Array<{ label: string; href?: string }>;
    sideMenuItems?: SideMenuItem[];
    children: React.ReactNode;
}

export default function PublicPageLayout({
    title,
    subtitle,
    category,
    breadcrumbs = [],
    sideMenuItems = [],
    children,
}: PublicPageLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased selection:bg-emerald-500 selection:text-white dark:bg-slate-950 dark:text-slate-200">
            <Head title={`${title} - Desa Batu Belerang`} />

            {/* Public Header Navbar */}
            <PublicNavbar />

            {/* Clean Header Banner */}
            <header className="relative border-b border-slate-200/80 bg-slate-900 pt-28 pb-12 text-white dark:border-slate-800 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Breadcrumbs */}
                    <nav className="mb-4 flex items-center gap-2 text-xs text-slate-400">
                        <Link href="/" className="transition-colors hover:text-white">
                            Beranda
                        </Link>
                        <ChevronRight className="h-3 w-3 text-slate-600" />
                        <span className="font-semibold text-emerald-400">{category}</span>
                        {breadcrumbs.map((item, idx) => (
                            <React.Fragment key={idx}>
                                <ChevronRight className="h-3 w-3 text-slate-600" />
                                {item.href ? (
                                    <Link href={item.href} className="transition-colors hover:text-white">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-slate-200">{item.label}</span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>

                    <div className="space-y-2">
                        <span className="inline-block rounded-md bg-emerald-600/20 px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-emerald-400 border border-emerald-500/30">
                            {category}
                        </span>
                        <h1 className="text-2xl font-extrabold tracking-tight md:text-4xl text-white">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="max-w-2xl text-xs md:text-sm text-slate-400">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Main Content (Left Column) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
                            {children}
                        </div>
                    </div>

                    {/* Sidebar / Menu List (Right Column) */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Submenu Navigation Card */}
                        {sideMenuItems.length > 0 && (
                            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 space-y-3">
                                <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                                    Navigasi {category}
                                </h3>
                                <nav className="space-y-1.5">
                                    {sideMenuItems.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item.href}
                                            className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                                                item.active
                                                    ? 'bg-emerald-600 text-white shadow-sm'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-emerald-400'
                                            }`}
                                        >
                                            <span>{item.title}</span>
                                            <ChevronRight className={`h-3.5 w-3.5 ${item.active ? 'text-white' : 'text-slate-400'}`} />
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        )}

                        {/* Informational Card */}
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 space-y-3">
                            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                                Kantor Desa Batu Belerang
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Jl. Poros Biji Nangka - Batu Belerang, Kecamatan Sinjai Borong, Kabupaten Sinjai, Provinsi Sulawesi Selatan.
                            </p>
                            <div className="pt-2 text-xs space-y-1">
                                <p className="text-slate-600 dark:text-slate-300 font-semibold">Email: pemdes@batubelerang.desa.id</p>
                                <p className="text-slate-600 dark:text-slate-300 font-semibold">Telepon: (0482) 123-4567</p>
                            </div>
                        </div>

                        {/* Back to Homepage Button */}
                        <Link
                            href="/"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Kembali ke Beranda</span>
                        </Link>
                    </aside>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white text-slate-600 transition-colors dark:border-slate-900 dark:bg-slate-950 dark:text-slate-400">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs sm:flex-row">
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/lambang_kabupaten_sinjai.png"
                            alt="Lambang Kabupaten Sinjai"
                            className="h-7 w-auto object-contain"
                        />
                        <span className="font-semibold text-slate-900 dark:text-white">
                            Pemerintah Desa Batu Belerang
                        </span>
                    </div>
                    <p>© {new Date().getFullYear()} Hak Cipta Dilindungi Undang-Undang.</p>
                </div>
            </footer>
        </div>
    );
}
