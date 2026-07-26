import { Head, Link } from '@inertiajs/react';
import { Search, MapPin, Clock, Navigation, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PublicPageLayout from '@/components/public-page-layout';

interface WisataItem {
    id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    harga_tiket: string | number;
    koordinat_lokasi: string;
    alamat: string;
    jam_operasional: string;
    foto_sampul_path: string;
    galeri_foto: string[] | string; // Decoded JSON array or string
}

interface WisataProps {
    wisataList: WisataItem[];
}

export default function Wisata({ wisataList = [] }: WisataProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedWisata, setSelectedWisata] = useState<WisataItem | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedWisata) {
            document.body.classList.add('overflow-hidden');
            setCurrentImageIndex(0); // Reset image slide index
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [selectedWisata]);

    const filteredWisata = useMemo(() => {
        return wisataList.filter((item) => {
            return (
                item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.alamat.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }, [wisataList, searchQuery]);

    const formatRupiah = (value: string | number) => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (num === 0) return 'Gratis';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num);
    };

    const getGoogleMapsUrl = (koordinat: string) => {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(koordinat)}`;
    };

    const modalImages = useMemo(() => {
        if (!selectedWisata) return [];
        
        let galeri = selectedWisata.galeri_foto;
        if (typeof galeri === 'string') {
            try {
                galeri = JSON.parse(galeri);
            } catch (e) {
                galeri = [selectedWisata.foto_sampul_path];
            }
        }
        
        const imagesList = Array.isArray(galeri) ? galeri : [];
        // Ensure sampul photo is at the start if not already there
        if (imagesList.length === 0 || !imagesList.includes(selectedWisata.foto_sampul_path)) {
            return [selectedWisata.foto_sampul_path, ...imagesList];
        }
        return imagesList;
    }, [selectedWisata]);

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
            title="Destinasi Wisata"
            subtitle="Jelajahi keindahan pemandian air panas alami belerang, pesona air terjun kembar, dan panorama perbukitan pinus Desa Batu Belerang."
            category="Profil Desa"
            breadcrumbs={[{ label: 'Wisata' }]}
        >
            <div className="space-y-8 text-sm">
                {/* Search Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                        Daftar Destinasi Wisata ({filteredWisata.length})
                    </h2>
                    {/* Search Input */}
                    <div className="relative w-full max-w-xs">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <Search className="size-4" />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari objek wisata..."
                            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900"
                        />
                    </div>
                </div>

                {/* Wisata Grid */}
                {filteredWisata.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                        {filteredWisata.map((wisata) => (
                            <div
                                key={wisata.id}
                                onClick={() => setSelectedWisata(wisata)}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900/60 cursor-pointer"
                            >
                                {/* Cover Image - 16:9 Landscape for scenery aspect */}
                                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                    <img
                                        src={wisata.foto_sampul_path}
                                        alt={wisata.nama}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Floating Ticket Price Badge */}
                                    <span className="absolute bottom-3 right-3 rounded-lg bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 text-xs font-black text-emerald-400 shadow-md">
                                        Tiket: {formatRupiah(wisata.harga_tiket)}
                                    </span>
                                </div>

                                {/* Content Details */}
                                <div className="flex flex-1 flex-col p-5 space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-sm text-slate-950 dark:text-white line-clamp-1">
                                            {wisata.nama}
                                        </h3>
                                        
                                        {/* Address & Hours row */}
                                        <div className="space-y-1 text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="size-3 text-slate-400 shrink-0" />
                                                <span className="line-clamp-1">{wisata.alamat}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="size-3 text-slate-400 shrink-0" />
                                                <span>{wisata.jam_operasional}</span>
                                            </div>
                                        </div>

                                        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2 pt-1">
                                            {wisata.deskripsi}
                                        </p>
                                    </div>

                                    {/* Action Footer Buttons */}
                                    <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedWisata(wisata);
                                            }}
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold py-2.5 transition-colors cursor-pointer text-slate-700 dark:text-slate-300 text-center"
                                        >
                                            <Eye className="size-3.5" />
                                            <span>Detail</span>
                                        </button>
                                        <a
                                            href={getGoogleMapsUrl(wisata.koordinat_lokasi)}
                                            onClick={(e) => e.stopPropagation()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-[11px] font-bold text-white py-2.5 shadow-sm transition-colors cursor-pointer"
                                        >
                                            <Navigation className="size-3.5" />
                                            <span>Petunjuk Rute</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                        <ShoppingBag className="size-12 text-slate-300 dark:text-slate-700 mb-3" />
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                            Tidak Ada Objek Wisata Ditemukan
                        </h4>
                        <p className="text-xs text-slate-400 max-w-xs mt-1">
                            Gunakan kata kunci pencarian yang lain untuk menemukan objek wisata.
                        </p>
                    </div>
                )}
            </div>

            {/* Modal Detail Wisata */}
            {mounted && selectedWisata && createPortal(
                <div
                    className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex justify-center items-start p-4 md:p-8 animate-in fade-in duration-200"
                    onClick={() => setSelectedWisata(null)}
                >
                    <div
                        className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col md:flex-row overflow-hidden my-auto md:h-[480px] animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setSelectedWisata(null)}
                            className="absolute top-3 right-3 z-20 rounded-full bg-white/95 dark:bg-slate-800/90 p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white shadow-md transition-colors"
                        >
                            <X className="size-4" />
                        </button>

                        {/* Left Side: Image Slider/Carousel */}
                        <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:h-full overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center group/slider">
                            <img
                                src={modalImages[currentImageIndex]}
                                alt={selectedWisata.nama}
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
                                <span className="rounded-md bg-emerald-600/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
                                    Tiket Masuk: {formatRupiah(selectedWisata.harga_tiket)}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                                    {selectedWisata.nama}
                                </h3>
                                <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="size-3.5 text-slate-400 shrink-0" />
                                        <span>{selectedWisata.alamat}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="size-3.5 text-slate-400 shrink-0" />
                                        <span>{selectedWisata.jam_operasional}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 flex-1">
                                <h4 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    Deskripsi Wisata
                                </h4>
                                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 whitespace-pre-line">
                                    {selectedWisata.deskripsi}
                                </p>
                            </div>

                            {/* Balanced grid footer buttons */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedWisata(null)}
                                    className="w-full rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold py-2.5 transition-colors text-slate-600 dark:text-slate-300"
                                >
                                    Tutup
                                </button>
                                <a
                                    href={getGoogleMapsUrl(selectedWisata.koordinat_lokasi)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white py-2.5 shadow-md shadow-emerald-600/10 transition-colors"
                                >
                                    <Navigation className="size-4" />
                                    <span>Buka Rute Peta</span>
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
