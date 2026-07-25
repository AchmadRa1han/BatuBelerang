import { Head, Link } from '@inertiajs/react';
import { Search, ShoppingBag, PhoneCall, X, ChevronLeft, ChevronRight, Store } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PublicPageLayout from '@/components/public-page-layout';

interface KategoriItem {
    id: number;
    nama: string;
    slug: string;
}

interface ProdukItem {
    id: number;
    kategori_umkm_id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    harga: string | number;
    stok: number;
    nomor_whatsapp: string;
    foto_path: string;
    nama_kategori: string;
    nama_penjual: string;
}

interface PasarMayaProps {
    kategoriList: KategoriItem[];
    produkList: ProdukItem[];
}

export default function PasarMaya({ kategoriList = [], produkList = [] }: PasarMayaProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedProduk, setSelectedProduk] = useState<ProdukItem | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProduk) {
            document.body.classList.add('overflow-hidden');
            setCurrentImageIndex(0); // Reset image slide index
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [selectedProduk]);

    const filteredProduk = useMemo(() => {
        return produkList.filter((produk) => {
            const matchesSearch =
                produk.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                produk.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                produk.nama_penjual.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                selectedCategoryId === null || produk.kategori_umkm_id === selectedCategoryId;

            return matchesSearch && matchesCategory;
        });
    }, [produkList, searchQuery, selectedCategoryId]);

    const formatRupiah = (value: string | number) => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num);
    };

    const getWhatsAppUrl = (produk: ProdukItem) => {
        let cleanNumber = produk.nomor_whatsapp.replace(/\D/g, '');
        if (cleanNumber.startsWith('0')) {
            cleanNumber = '62' + cleanNumber.slice(1);
        }
        const text = encodeURIComponent(
            `Halo, saya tertarik dengan produk "${produk.nama}" (${formatRupiah(produk.harga)}) yang diiklankan di Pasar Maya Desa Batu Belerang.`
        );
        return `https://wa.me/${cleanNumber}?text=${text}`;
    };

    const modalImages = useMemo(() => {
        if (!selectedProduk) return [];
        return typeof selectedProduk.foto_path === 'string'
            ? selectedProduk.foto_path.split(',')
            : [selectedProduk.foto_path];
    }, [selectedProduk]);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (modalImages.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (modalImages.length > 1) {
            setCurrentImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
        }
    };

    return (
        <PublicPageLayout
            title="Pasar Maya Desa"
            subtitle="Etalase digital produk unggulan usaha mikro, kecil, dan menengah (UMKM) karya warga Desa Batu Belerang."
            category="Ekonomi Warga"
            breadcrumbs={[{ label: 'Pasar Maya' }]}
        >
            <div className="space-y-8 text-sm">
                {/* Search & Filter Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setSelectedCategoryId(null)}
                            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                                selectedCategoryId === null
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
                            }`}
                        >
                            Semua Produk
                        </button>
                        {kategoriList.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedCategoryId(cat.id)}
                                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                                    selectedCategoryId === cat.id
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
                                }`}
                            >
                                {cat.name || cat.nama}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full max-w-xs">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <Search className="size-4" />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari produk unggulan..."
                            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900"
                        />
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProduk.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProduk.map((produk) => {
                            // Extract first image from comma-separated list
                            const firstImage = typeof produk.foto_path === 'string'
                                ? produk.foto_path.split(',')[0]
                                : produk.foto_path;

                            return (
                                <div
                                    key={produk.id}
                                    onClick={() => setSelectedProduk(produk)}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900/60 cursor-pointer"
                                >
                                    {/* Product Image - Aspect Square for Shop feel */}
                                    <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                                        <img
                                            src={firstImage}
                                            alt={produk.nama}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {/* Floating Category Badge */}
                                        <span className="absolute top-3 left-3 rounded-md bg-emerald-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                                            {produk.nama_kategori}
                                        </span>
                                        {/* Floating Price Tag */}
                                        <span className="absolute bottom-3 right-3 rounded-lg bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 text-xs font-black text-emerald-400 shadow-md">
                                            {formatRupiah(produk.harga)}
                                        </span>
                                    </div>

                                    {/* Content Details */}
                                    <div className="flex flex-1 flex-col p-4 space-y-3">
                                        <div className="space-y-1">
                                            {/* Shop & Stock info */}
                                            <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Store className="size-3" />
                                                    {produk.nama_penjual}
                                                </span>
                                                <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-55/10 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded-md">
                                                    Stok: {produk.stok}
                                                </span>
                                            </div>

                                            <h3 className="font-bold text-xs text-slate-950 dark:text-white line-clamp-2 pt-1 min-h-[36px]">
                                                {produk.nama}
                                            </h3>
                                            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                                                {produk.deskripsi}
                                            </p>
                                        </div>

                                        {/* Action Bar */}
                                        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedProduk(produk);
                                                }}
                                                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold py-2 transition-colors cursor-pointer text-slate-700 dark:text-slate-300 text-center"
                                            >
                                                Detail
                                            </button>
                                            <a
                                                href={getWhatsAppUrl(produk)}
                                                onClick={(e) => e.stopPropagation()}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-[11px] font-bold text-white py-2 shadow-sm transition-colors cursor-pointer"
                                            >
                                                <ShoppingBag className="size-3.5" />
                                                <span>Beli</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                        <ShoppingBag className="size-12 text-slate-300 dark:text-slate-700 mb-3" />
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                            Tidak Ada Produk Ditemukan
                        </h4>
                        <p className="text-xs text-slate-400 max-w-xs mt-1">
                            Coba ganti kategori produk atau gunakan kata kunci pencarian yang lain.
                        </p>
                    </div>
                )}
            </div>

            {/* Modal Detail Produk */}
            {mounted && selectedProduk && createPortal(
                <div
                    className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex justify-center items-start p-4 md:p-8 animate-in fade-in duration-200"
                    onClick={() => setSelectedProduk(null)}
                >
                    <div
                        className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col md:flex-row overflow-hidden my-auto md:h-[480px] animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setSelectedProduk(null)}
                            className="absolute top-3 right-3 z-20 rounded-full bg-white/95 dark:bg-slate-800/90 p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white shadow-md transition-colors"
                        >
                            <X className="size-4" />
                        </button>

                        {/* Left Side: Image Slider/Carousel */}
                        <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:h-full overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center group/slider">
                            <img
                                src={modalImages[currentImageIndex]}
                                alt={selectedProduk.nama}
                                className="h-full w-full object-cover transition-opacity duration-300"
                            />

                            {/* Left/Right Slider Controls */}
                            {modalImages.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={prevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-slate-900/80 p-1.5 text-slate-800 dark:text-white shadow-md hover:bg-white dark:hover:bg-slate-900 transition-colors opacity-0 group-hover/slider:opacity-100"
                                    >
                                        <ChevronLeft className="size-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-slate-900/80 p-1.5 text-slate-800 dark:text-white shadow-md hover:bg-white dark:hover:bg-slate-900 transition-colors opacity-0 group-hover/slider:opacity-100"
                                    >
                                        <ChevronRight className="size-4" />
                                    </button>

                                    {/* Indicator Dots */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 backdrop-blur-xs px-2 py-1 rounded-full">
                                        {modalImages.map((_, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndex(idx);
                                                }}
                                                className={`size-1.5 rounded-full transition-all ${
                                                    idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right Side: Details */}
                        <div className="flex flex-col flex-1 p-6 md:p-8 md:h-full md:overflow-y-auto space-y-4">
                            <div>
                                <span className="rounded-md bg-emerald-600/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                    {selectedProduk.nama_kategori}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                                    {selectedProduk.nama}
                                </h3>
                                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                                    <span>Penjual: <strong className="text-slate-600 dark:text-slate-300">{selectedProduk.nama_penjual}</strong></span>
                                    <span>•</span>
                                    <span>Stok: <strong className="text-slate-600 dark:text-slate-300">{selectedProduk.stok}</strong></span>
                                </div>
                            </div>

                            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                                {formatRupiah(selectedProduk.harga)}
                            </div>

                            <div className="space-y-2 flex-1">
                                <h4 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    Deskripsi Produk
                                </h4>
                                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 whitespace-pre-line">
                                    {selectedProduk.deskripsi}
                                </p>
                            </div>

                            {/* Clean, balanced grid footer buttons */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedProduk(null)}
                                    className="w-full rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold py-2.5 transition-colors text-slate-600 dark:text-slate-300"
                                >
                                    Tutup
                                </button>
                                <a
                                    href={getWhatsAppUrl(selectedProduk)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white py-2.5 shadow-md shadow-emerald-600/10 transition-colors"
                                >
                                    <PhoneCall className="size-4" />
                                    <span>Hubungi Penjual</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </PublicPageLayout>
    );
}
