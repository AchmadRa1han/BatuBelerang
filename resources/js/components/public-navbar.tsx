import { Link, usePage } from '@inertiajs/react';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { useAppearance } from '@/hooks/use-appearance';

export default function PublicNavbar() {
    const { auth } = usePage().props as any;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileProfilOpen, setMobileProfilOpen] = useState(false);
    const [mobilePemerintahanOpen, setMobilePemerintahanOpen] = useState(false);
    const [mobileLembagaOpen, setMobileLembagaOpen] = useState(false);
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="fixed top-0 right-0 left-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md transition-colors dark:border-slate-900 dark:bg-slate-950/80">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <img
                        src="/images/lambang_kabupaten_sinjai.png"
                        alt="Lambang Kabupaten Sinjai"
                        className="h-10 w-auto object-contain transition-transform hover:scale-105"
                    />
                    <div>
                        <span className="block text-base font-bold tracking-tight text-slate-900 dark:text-white">
                            Batu Belerang
                        </span>
                        <span className="-mt-1 block text-[10px] font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                            Sinjai Borong
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
                    <Link
                        href="/"
                        className="font-semibold text-slate-900 transition-colors hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400"
                    >
                        Beranda
                    </Link>
                    <div className="group/profil relative py-2">
                        <button className="flex cursor-pointer items-center gap-1 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                            <span>Profil</span>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover/profil:rotate-180" />
                        </button>
                        <div className="pointer-events-none absolute top-full left-1/2 z-50 w-52 -translate-x-1/2 translate-y-2 scale-95 pt-2.5 opacity-0 transition-all duration-200 ease-out group-hover/profil:pointer-events-auto group-hover/profil:translate-y-0 group-hover/profil:scale-100 group-hover/profil:opacity-100">
                            <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-950">
                                {[
                                    { title: 'Tentang Kami', href: '#' },
                                    { title: 'Visi & Misi', href: '#' },
                                    { title: 'Sejarah Desa', href: '#' },
                                    { title: 'Geografis Desa', href: '#' },
                                    { title: 'Demografi Desa', href: '#' },
                                ].map((subItem) => (
                                    <Link
                                        key={subItem.title}
                                        href={subItem.href}
                                        className="block rounded-xl px-4 py-2 text-left font-medium text-slate-600 transition-all duration-150 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-900/60 dark:hover:text-emerald-400"
                                    >
                                        {subItem.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="group/pemerintahan relative py-2">
                        <button className="flex cursor-pointer items-center gap-1 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                            <span>Pemerintahan</span>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover/pemerintahan:rotate-180" />
                        </button>
                        <div className="pointer-events-none absolute top-full left-1/2 z-50 w-52 -translate-x-1/2 translate-y-2 scale-95 pt-2.5 opacity-0 transition-all duration-200 ease-out group-hover/pemerintahan:pointer-events-auto group-hover/pemerintahan:translate-y-0 group-hover/pemerintahan:scale-100 group-hover/pemerintahan:opacity-100">
                            <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-950">
                                {[
                                    { title: 'Visi dan Misi', href: '#' },
                                    { title: 'Data Perangkat', href: '#' },
                                    {
                                        title: 'Struktur Organisasi',
                                        href: '#',
                                    },
                                    { title: 'RPJMDes', href: '#' },
                                    { title: 'Pemerintahan', href: '#' },
                                ].map((subItem) => (
                                    <Link
                                        key={subItem.title}
                                        href={subItem.href}
                                        className="block rounded-xl px-4 py-2 text-left font-medium text-slate-600 transition-all duration-150 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-900/60 dark:hover:text-emerald-400"
                                    >
                                        {subItem.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="group/lembaga relative py-2">
                        <button className="flex cursor-pointer items-center gap-1 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                            <span>Lembaga</span>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover/lembaga:rotate-180" />
                        </button>
                        <div className="pointer-events-none absolute top-full left-1/2 z-50 w-64 -translate-x-1/2 translate-y-2 scale-95 pt-2.5 opacity-0 transition-all duration-200 ease-out group-hover/lembaga:pointer-events-auto group-hover/lembaga:translate-y-0 group-hover/lembaga:scale-100 group-hover/lembaga:opacity-100">
                            <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-950">
                                {[
                                    {
                                        title: 'Badan Permusyawaratan Desa',
                                        href: '#',
                                    },
                                    {
                                        title: 'Tim Penggerak PKK',
                                        href: '#',
                                    },
                                    { title: 'Karang Taruna', href: '#' },
                                    { title: 'Rt dan Rw', href: '#' },
                                    { title: 'Posyandu', href: '#' },
                                    { title: 'Bumdes', href: '#' },
                                ].map((subItem) => (
                                    <Link
                                        key={subItem.title}
                                        href={subItem.href}
                                        className="block rounded-xl px-4 py-2 text-left font-medium text-slate-600 transition-all duration-150 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-900/60 dark:hover:text-emerald-400"
                                    >
                                        {subItem.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Link
                        href="#"
                        className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                        prefetch
                    >
                        UMKM
                    </Link>
                    <Link
                        href="#"
                        className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                        prefetch
                    >
                        Wisata
                    </Link>
                    <Link
                        href="/debug/database"
                        className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
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
                            className="rounded-xl bg-emerald-600 px-4.5 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-500/10 transition-all hover:bg-emerald-500"
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
                    <div>
                        <button
                            onClick={() =>
                                setMobileProfilOpen(!mobileProfilOpen)
                            }
                            className="flex w-full cursor-pointer items-center justify-between text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            <span>Profil</span>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${mobileProfilOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <div
                            className={`mt-2 ml-4 space-y-2 border-l border-slate-200 pl-4 transition-all duration-300 dark:border-slate-800 ${
                                mobileProfilOpen
                                    ? 'max-h-60 opacity-100'
                                    : 'max-h-0 overflow-hidden opacity-0'
                            }`}
                        >
                            {[
                                { title: 'Tentang Kami', href: '#' },
                                { title: 'Visi & Misi', href: '#' },
                                { title: 'Sejarah Desa', href: '#' },
                                { title: 'Geografis Desa', href: '#' },
                                { title: 'Demografi Desa', href: '#' },
                            ].map((subItem) => (
                                <Link
                                    key={subItem.title}
                                    href={subItem.href}
                                    onClick={() => {
                                        setMobileProfilOpen(false);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="block py-1.5 text-left text-xs text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                                >
                                    {subItem.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() =>
                                setMobilePemerintahanOpen(
                                    !mobilePemerintahanOpen,
                                )
                            }
                            className="flex w-full cursor-pointer items-center justify-between text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            <span>Pemerintahan</span>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${mobilePemerintahanOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <div
                            className={`mt-2 ml-4 space-y-2 border-l border-slate-200 pl-4 transition-all duration-300 dark:border-slate-800 ${
                                mobilePemerintahanOpen
                                    ? 'max-h-60 opacity-100'
                                    : 'max-h-0 overflow-hidden opacity-0'
                            }`}
                        >
                            {[
                                { title: 'Visi dan Misi', href: '#' },
                                { title: 'Data Perangkat', href: '#' },
                                { title: 'Struktur Organisasi', href: '#' },
                                { title: 'RPJMDes', href: '#' },
                                { title: 'Pemerintahan', href: '#' },
                            ].map((subItem) => (
                                <Link
                                    key={subItem.title}
                                    href={subItem.href}
                                    onClick={() => {
                                        setMobilePemerintahanOpen(false);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="block py-1.5 text-left text-xs text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                                >
                                    {subItem.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() =>
                                setMobileLembagaOpen(!mobileLembagaOpen)
                            }
                            className="flex w-full cursor-pointer items-center justify-between text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            <span>Lembaga</span>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${mobileLembagaOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <div
                            className={`mt-2 ml-4 space-y-2 border-l border-slate-200 pl-4 transition-all duration-300 dark:border-slate-800 ${
                                mobileLembagaOpen
                                    ? 'max-h-72 opacity-100'
                                    : 'max-h-0 overflow-hidden opacity-0'
                            }`}
                        >
                            {[
                                {
                                    title: 'Badan Permusyawaratan Desa',
                                    href: '#',
                                },
                                { title: 'Tim Penggerak PKK', href: '#' },
                                { title: 'Karang Taruna', href: '#' },
                                { title: 'Rt dan Rw', href: '#' },
                                { title: 'Posyandu', href: '#' },
                                { title: 'Bumdes', href: '#' },
                            ].map((subItem) => (
                                <Link
                                    key={subItem.title}
                                    href={subItem.href}
                                    onClick={() => {
                                        setMobileLembagaOpen(false);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="block py-1.5 text-left text-xs text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                                >
                                    {subItem.title}
                                </Link>
                            ))}
                        </div>
                    </div>
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
                                className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-center text-xs font-semibold text-white"
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
                                    className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-center text-xs font-semibold text-white"
                                >
                                    Layanan Mandiri
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
