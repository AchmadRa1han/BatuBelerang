import { Head, Link, useForm, usePage, usePoll } from '@inertiajs/react';
import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import {
    Users,
    FileText,
    MessageSquareWarning,
    ShoppingBag,
    Compass,
    CalendarCheck,
    CheckCircle2,
    Clock,
    XCircle,
    Calendar,
    Sparkles,
    RefreshCw,
    ShieldAlert,
    ExternalLink,
    ChevronRight,
    MapPin,
    Globe,
    Settings,
    Newspaper,
    Wallet,
    Save,
    Trash2,
    Plus,
    Edit3,
    Upload,
    Crop,
    Image as ImageIcon,
} from 'lucide-react';
import ImageCropperModal from '@/components/image-cropper-modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard, home } from '@/routes';
import type { Auth } from '@/types';

interface DashboardStats {
    warga: number;
    kk: number;
    dusun: number;
    gender: {
        laki_laki: number;
        perempuan: number;
    };
    surat: {
        total: number;
        menunggu: number;
        disetujui: number;
        ditolak: number;
    };
    pengaduan: {
        total: number;
        terkirim: number;
        diproses: number;
        selesai: number;
    };
    umkm: {
        total: number;
        pending: number;
    };
    wisata: {
        destinasi: number;
        penginapan: number;
    };
    kehadiran: {
        hadir: number;
        izin: number;
        sakit: number;
        alpa: number;
    };
}

interface SuratItem {
    id: number;
    nama_pemohon: string;
    nik: string;
    nama_surat: string;
    status: string;
    created_at: string;
}

interface PengaduanItem {
    id: number;
    judul: string;
    isi: string;
    is_anonim: boolean;
    status: string;
    created_at: string;
    pelapor: string;
}

interface KehadiranItem {
    id: number;
    nama_aparatur?: string;
    status: string;
}

interface AgendaItem {
    id: number;
    judul: string;
    lokasi?: string;
    waktu_mulai: string;
}

interface ProfilDesaData {
    id?: number;
    nama_desa?: string;
    nama_kecamatan?: string;
    nama_kabupaten?: string;
    nama_provinsi?: string;
    sejarah?: string;
    visi?: string;
    misi?: string[] | string;
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

interface AparaturItem {
    id: number;
    nama: string;
    jabatan: string;
    foto_path?: string;
    urutan?: number;
    status?: boolean;
}

interface BeritaItem {
    id: number;
    judul: string;
    kategori: string;
    ringkasan: string;
    isi?: string;
    foto_path?: string;
    tanggal_publikasi: string;
    status?: string;
}

interface ApbdesItem {
    id?: number;
    tahun: number;
    jenis: string;
    jumlah_anggaran: number;
    jumlah_realisasi: number;
}

interface HalamanKontenItem {
    id: number;
    slug: string;
    kategori: string;
    judul: string;
    subjudul?: string;
    isi?: string;
    meta_json?: any;
}

interface DashboardProps {
    stats?: DashboardStats;
    suratTerbaru?: any[];
    pengaduanTerbaru?: any[];
    kehadiranHariIni?: any[];
    agendaMendatang?: any[];
    profilDesa?: any;
    aparaturList?: any[];
    beritaList?: any[];
    regulasiList?: any[];
    apbdesList?: any[];
    halamanKontenList?: HalamanKontenItem[];
}

export default function Dashboard({
    stats,
    suratTerbaru = [],
    pengaduanTerbaru = [],
    kehadiranHariIni = [],
    agendaMendatang = [],
    profilDesa,
    aparaturList = [],
    beritaList = [],
    regulasiList = [],
    apbdesList = [],
    halamanKontenList = [],
}: DashboardProps) {
    const { auth, url } = usePage<{ auth: Auth }>().props;

    const getInitialTab = () => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const tabParam = params.get('tab');
            if (['overview', 'profil', 'aparatur', 'halaman', 'berita', 'apbdes'].includes(tabParam || '')) {
                return tabParam as 'overview' | 'profil' | 'aparatur' | 'halaman' | 'berita' | 'apbdes';
            }
        }
        return 'overview';
    };

    const [mainTab, setMainTab] = useState<'overview' | 'profil' | 'aparatur' | 'halaman' | 'berita' | 'apbdes'>(getInitialTab);
    const [activityTab, setActivityTab] = useState<'surat' | 'pengaduan' | 'agenda'>('surat');

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const tabParam = params.get('tab');
            if (tabParam && ['overview', 'profil', 'aparatur', 'halaman', 'berita', 'apbdes'].includes(tabParam)) {
                setMainTab(tabParam as any);
            }
        }
    }, [url]);

    // Form Profil & Hero
    const profilForm = useForm({
        nama_desa: profilDesa?.nama_desa || 'Batu Belerang',
        nama_kecamatan: profilDesa?.nama_kecamatan || 'Sinjai Borong',
        nama_kabupaten: profilDesa?.nama_kabupaten || 'Sinjai',
        nama_provinsi: profilDesa?.nama_provinsi || 'Sulawesi Selatan',
        hero_title: profilDesa?.hero_title || 'Desa Batu Belerang',
        hero_subtitle: profilDesa?.hero_subtitle || 'Kecamatan Sinjai Borong, Kabupaten Sinjai, Provinsi Sulawesi Selatan',
        hero_bg_path: profilDesa?.hero_bg_path || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=80',
        hero_bg_file: null as File | null,
        nama_kades: profilDesa?.nama_kades || 'Ahmad P',
        jabatan_kades: profilDesa?.jabatan_kades || 'Kepala Desa Batu Belerang',
        sambutan_kades: profilDesa?.sambutan_kades || 'Selamat datang di website resmi Desa Batu Belerang.',
        foto_kades: profilDesa?.foto_kades || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
        visi: profilDesa?.visi || 'Terwujudnya Desa Batu Belerang yang Mandiri dan Sejahtera.',
        alamat_kantor: profilDesa?.alamat_kantor || 'Jalan Poros Biji Nangka - Batu Belerang',
        telepon: profilDesa?.telepon || '(0482) 123-4567',
        email: profilDesa?.email || 'pemdes@batubelerang.desa.id',
    });

    // State Cropper & Edit Aparatur
    const [cropperOpen, setCropperOpen] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
    const [targetCropper, setTargetCropper] = useState<'aparatur' | 'kades'>('aparatur');
    const [editingAparaturId, setEditingAparaturId] = useState<number | null>(null);
    const [isEditingKades, setIsEditingKades] = useState(false);
    const [editingBeritaId, setEditingBeritaId] = useState<number | null>(null);

    // Form Edit Kades (under Perangkat Desa Tab)
    const kadesForm = useForm({
        nama_kades: profilDesa?.nama_kades || 'Ahmad P',
        jabatan_kades: profilDesa?.jabatan_kades || 'Kepala Desa Batu Belerang',
        foto_kades: profilDesa?.foto_kades || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
        foto_kades_base64: '',
    });

    // Form Tambah Perangkat Desa
    const aparaturForm = useForm({
        nama: '',
        jabatan: '',
        foto_path: '',
        foto_base64: '',
        urutan: aparaturList.length + 1,
        status: true,
    });

    // Form Tambah Berita
    const beritaForm = useForm({
        judul: '',
        kategori: 'Pemerintahan',
        ringkasan: '',
        isi: '',
        foto_path: '',
        tanggal_publikasi: new Date().toISOString().split('T')[0],
        status: 'terbit',
    });

    // Form Edit APBDesa
    const pend = apbdesList.find(a => a.jenis === 'pendapatan');
    const bel = apbdesList.find(a => a.jenis === 'belanja');
    const pem = apbdesList.find(a => a.jenis === 'pembiayaan');

    const apbdesForm = useForm({
        tahun: new Date().getFullYear(),
        pendapatan_anggaran: pend?.jumlah_anggaran || 1200000000,
        pendapatan_realisasi: pend?.jumlah_realisasi || 980000000,
        belanja_anggaran: bel?.jumlah_anggaran || 1150000000,
        belanja_realisasi: bel?.jumlah_realisasi || 720000000,
        pembiayaan_anggaran: pem?.jumlah_anggaran || 50000000,
        pembiayaan_realisasi: pem?.jumlah_realisasi || 50000000,
    });

    // Halaman Menu Content Editor State
    const [selectedPageSlug, setSelectedPageSlug] = useState<string>('profil-tentang-kami');
    const selectedHalaman = halamanKontenList?.find(h => h.slug === selectedPageSlug);

    const halamanForm = useForm({
        judul: selectedHalaman?.judul || '',
        subjudul: selectedHalaman?.subjudul || '',
        isi: selectedHalaman?.isi || '',
    });

    React.useEffect(() => {
        if (selectedHalaman) {
            halamanForm.setData({
                judul: selectedHalaman.judul || '',
                subjudul: selectedHalaman.subjudul || '',
                isi: selectedHalaman.isi || '',
            });
        }
    }, [selectedPageSlug, halamanKontenList]);

    const submitHalamanForm = (e: React.FormEvent) => {
        e.preventDefault();
        halamanForm.post(`/admin/halaman/${selectedPageSlug}`, { preserveScroll: true });
    };

    usePoll(15000);

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

    const submitProfil = (e: React.FormEvent) => {
        e.preventDefault();
        profilForm.post('/admin/profil', { preserveScroll: true });
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, target: 'aparatur' | 'kades' = 'aparatur') => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImageSrc(reader.result as string);
                setTargetCropper(target);
                setCropperOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCroppedPhoto = (croppedBase64: string) => {
        if (targetCropper === 'kades') {
            kadesForm.setData('foto_kades_base64', croppedBase64);
        } else {
            aparaturForm.setData('foto_base64', croppedBase64);
        }
    };

    const submitKades = (e: React.FormEvent) => {
        e.preventDefault();
        kadesForm.post('/admin/profil', {
            preserveScroll: true,
            onSuccess: () => setIsEditingKades(false),
        });
    };

    const startEditAparatur = (item: AparaturItem) => {
        setEditingAparaturId(item.id);
        aparaturForm.setData({
            nama: item.nama,
            jabatan: item.jabatan,
            foto_path: item.foto_path || '',
            foto_base64: '',
            urutan: item.urutan || 1,
            status: item.status ?? true,
        });
    };

    const resetAparaturForm = () => {
        setEditingAparaturId(null);
        aparaturForm.reset();
        aparaturForm.setData('foto_base64', '');
    };

    const submitAparatur = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAparaturId) {
            aparaturForm.post(`/admin/aparatur/${editingAparaturId}`, {
                preserveScroll: true,
                onSuccess: () => resetAparaturForm(),
            });
        } else {
            aparaturForm.post('/admin/aparatur', {
                preserveScroll: true,
                onSuccess: () => resetAparaturForm(),
            });
        }
    };

    const startEditBerita = (berita: any) => {
        setEditingBeritaId(berita.id);
        beritaForm.setData({
            judul: berita.judul || '',
            kategori: berita.kategori || 'Pemerintahan',
            ringkasan: berita.ringkasan || '',
            isi: berita.isi || '',
            foto_path: berita.foto_path || '',
            tanggal_publikasi: berita.tanggal_publikasi || new Date().toISOString().split('T')[0],
            status: berita.status || 'terbit',
        });
    };

    const resetBeritaForm = () => {
        beritaForm.reset();
        setEditingBeritaId(null);
    };

    const submitBerita = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBeritaId) {
            beritaForm.put(`/admin/berita/${editingBeritaId}`, {
                preserveScroll: true,
                onSuccess: () => resetBeritaForm(),
            });
        } else {
            beritaForm.post('/admin/berita', {
                preserveScroll: true,
                onSuccess: () => beritaForm.reset(),
            });
        }
    };

    const submitApbdes = (e: React.FormEvent) => {
        e.preventDefault();
        apbdesForm.post('/admin/apbdes', { preserveScroll: true });
    };

    const deleteAparatur = (id: number) => {
        if (confirm('Yakin ingin menghapus perangkat desa ini?')) {
            aparaturForm.delete(`/admin/aparatur/${id}`, { preserveScroll: true });
        }
    };

    const deleteBerita = (id: number) => {
        if (confirm('Yakin ingin menghapus berita ini?')) {
            beritaForm.delete(`/admin/berita/${id}`, { preserveScroll: true });
        }
    };

    const pendingActionsCount = (stats?.surat?.menunggu || 0) + (stats?.pengaduan?.terkirim || 0) + (stats?.umkm?.pending || 0);

    return (
        <>
            <Head title="Admin Dashboard - Kelola Informasi Desa" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Hero Greeting Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 md:p-8 text-white shadow-xl border border-emerald-500/20">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300 border border-emerald-400/30">
                                    <Sparkles className="size-3.5 text-emerald-400" />
                                    Portal Pemerintahan Desa Batu Belerang
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                                Dashboard Kelola Informasi, <span className="text-emerald-300">{auth?.user?.name || 'Admin'}</span> 👋
                            </h1>
                            <p className="text-sm text-slate-300 max-w-2xl">
                                Kelola seluruh konten halaman depan (Hero, Sambutan Kades, Perangkat Desa, Berita, APBDesa) serta layanan kependudukan warga secara terpadu.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <Link href={home()}>
                                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm gap-2">
                                    <Globe className="size-4" />
                                    <span>Pratinjau Halaman Depan</span>
                                    <ExternalLink className="size-3.5 opacity-70" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* TAB 1: OVERVIEW */}
                {mainTab === 'overview' && (
                    <div className="space-y-6">
                        {/* KPI Cards */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <span className="text-xs font-semibold uppercase text-slate-500">Total Penduduk</span>
                                <div className="mt-2 text-2xl font-bold">{stats?.warga || 0} Warga</div>
                                <span className="text-xs text-slate-400">{stats?.kk || 0} Kartu Keluarga</span>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <span className="text-xs font-semibold uppercase text-slate-500">Permohonan Surat</span>
                                <div className="mt-2 text-2xl font-bold">{stats?.surat?.total || 0} Permohonan</div>
                                <span className="text-xs text-amber-600 font-semibold">{stats?.surat?.menunggu || 0} Menunggu Verifikasi</span>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <span className="text-xs font-semibold uppercase text-slate-500">Pengaduan Warga</span>
                                <div className="mt-2 text-2xl font-bold">{stats?.pengaduan?.total || 0} Pengaduan</div>
                                <span className="text-xs text-rose-600 font-semibold">{stats?.pengaduan?.terkirim || 0} Belum Dibaca</span>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <span className="text-xs font-semibold uppercase text-slate-500">Potensi Desa</span>
                                <div className="mt-2 text-2xl font-bold">{(stats?.umkm?.total || 0) + (stats?.wisata?.destinasi || 0)} Item</div>
                                <span className="text-xs text-slate-400">{stats?.umkm?.total || 0} UMKM & {stats?.wisata?.destinasi || 0} Wisata</span>
                            </div>
                        </div>

                        {/* Recent Activity Table */}
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 p-5">
                            <h3 className="font-bold text-sm mb-4">Permohonan Surat Terbaru</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-semibold text-slate-500">
                                        <tr>
                                            <th className="py-2.5 px-3">Pemohon</th>
                                            <th className="py-2.5 px-3">NIK</th>
                                            <th className="py-2.5 px-3">Jenis Surat</th>
                                            <th className="py-2.5 px-3">Tanggal</th>
                                            <th className="py-2.5 px-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {suratTerbaru.map((s) => (
                                            <tr key={s.id}>
                                                <td className="py-2.5 px-3 font-semibold">{s.nama_pemohon}</td>
                                                <td className="py-2.5 px-3 font-mono">{s.nik}</td>
                                                <td className="py-2.5 px-3">{s.nama_surat}</td>
                                                <td className="py-2.5 px-3 text-slate-500">{formatDate(s.created_at)}</td>
                                                <td className="py-2.5 px-3">
                                                    <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold">
                                                        {s.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: EDIT PROFIL & HERO BANNER */}
                {mainTab === 'profil' && (
                    <form onSubmit={submitProfil} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <h3 className="font-bold text-base text-slate-900 dark:text-white">Pengaturan Halaman Depan & Profil Desa</h3>
                                <p className="text-xs text-slate-500">Ubah judul hero banner, sambutan kepala desa, visi misi, serta informasi kontak desa.</p>
                            </div>
                            <Button type="submit" disabled={profilForm.processing} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                                <Save className="size-4" /> Save Changes
                            </Button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">Judul Banner Utama (Hero Title)</Label>
                                <Input
                                    value={profilForm.data.hero_title}
                                    onChange={(e) => profilForm.setData('hero_title', e.target.value)}
                                    placeholder="Contoh: Membangun Desa Modern..."
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">Subjudul Banner Utama (Hero Subtitle)</Label>
                                <textarea
                                    className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
                                    rows={2}
                                    value={profilForm.data.hero_subtitle}
                                    onChange={(e) => profilForm.setData('hero_subtitle', e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">Foto Background Banner Utama (Hero Background Image)</Label>
                                <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                    <img
                                        src={profilForm.data.hero_bg_path}
                                        alt="Hero Background Preview"
                                        className="h-20 w-36 rounded-md object-cover border border-slate-300 dark:border-slate-700 shrink-0 shadow-sm"
                                    />
                                    <div className="space-y-2 w-full">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    profilForm.setData('hero_bg_file', file);
                                                    profilForm.setData('hero_bg_path', URL.createObjectURL(file));
                                                }
                                            }}
                                            className="text-xs bg-white dark:bg-slate-950"
                                        />
                                        <Input
                                            type="text"
                                            value={profilForm.data.hero_bg_path}
                                            onChange={(e) => profilForm.setData('hero_bg_path', e.target.value)}
                                            placeholder="Atau masukkan URL foto background..."
                                            className="text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Nama Kepala Desa</Label>
                                <Input
                                    value={profilForm.data.nama_kades}
                                    onChange={(e) => profilForm.setData('nama_kades', e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Jabatan Kepala Desa</Label>
                                <Input
                                    value={profilForm.data.jabatan_kades}
                                    onChange={(e) => profilForm.setData('jabatan_kades', e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">URL Foto Kepala Desa</Label>
                                <Input
                                    value={profilForm.data.foto_kades}
                                    onChange={(e) => profilForm.setData('foto_kades', e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">Teks Sambutan Kepala Desa</Label>
                                <textarea
                                    className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
                                    rows={4}
                                    value={profilForm.data.sambutan_kades}
                                    onChange={(e) => profilForm.setData('sambutan_kades', e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">Visi Pembangunan Desa</Label>
                                <textarea
                                    className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
                                    rows={3}
                                    value={profilForm.data.visi}
                                    onChange={(e) => profilForm.setData('visi', e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Alamat Kantor Desa</Label>
                                <Input
                                    value={profilForm.data.alamat_kantor}
                                    onChange={(e) => profilForm.setData('alamat_kantor', e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Telepon Resmi</Label>
                                <Input
                                    value={profilForm.data.telepon}
                                    onChange={(e) => profilForm.setData('telepon', e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">Email Resmi</Label>
                                <Input
                                    type="email"
                                    value={profilForm.data.email}
                                    onChange={(e) => profilForm.setData('email', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={profilForm.processing} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                                <Save className="size-4" /> Simpan Pengaturan
                            </Button>
                        </div>
                    </form>
                )}

                {/* TAB 3: PERANGKAT DESA */}
                {mainTab === 'aparatur' && (
                    <div className="space-y-6">
                        {/* 👑 KEPALA DESA CARD & EDIT FORM */}
                        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-900/10 via-teal-900/10 to-slate-900/10 p-5 shadow-sm dark:border-emerald-500/20 dark:bg-slate-900 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-emerald-200/50 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <span className="text-base">👑</span>
                                    <div>
                                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                                            Kepala Desa (Pemimpin Pemerintahan Desa)
                                        </h3>
                                        <p className="text-[11px] text-slate-500">
                                            Pemimpin utama Desa Batu Belerang yang tampil terdepan pada struktur organisasi di halaman depan.
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => setIsEditingKades(!isEditingKades)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white size-sm text-xs gap-1.5 shrink-0"
                                >
                                    <Edit3 className="size-3.5" />
                                    {isEditingKades ? 'Tutup Form Kades' : 'Edit Kepala Desa & Foto'}
                                </Button>
                            </div>

                            {/* Card Display Kades */}
                            {!isEditingKades ? (
                                <div className="flex items-center gap-4 p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                                    <div className="relative aspect-4/5 w-16 rounded-lg overflow-hidden border border-emerald-300 dark:border-emerald-700 shrink-0 bg-slate-100 shadow-sm">
                                        <img
                                            src={kadesForm.data.foto_kades || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'}
                                            alt={kadesForm.data.nama_kades}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                            Kepala Desa
                                        </span>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{kadesForm.data.nama_kades}</h4>
                                        <p className="text-xs text-slate-500">{kadesForm.data.jabatan_kades}</p>
                                    </div>
                                </div>
                            ) : (
                                /* Form Edit Kades */
                                <form onSubmit={submitKades} className="space-y-4 pt-2">
                                    <div className="grid gap-4 md:grid-cols-12">
                                        <div className="md:col-span-4 space-y-3">
                                            <div>
                                                <Label className="text-xs">Nama Kepala Desa</Label>
                                                <Input
                                                    required
                                                    value={kadesForm.data.nama_kades}
                                                    onChange={(e) => kadesForm.setData('nama_kades', e.target.value)}
                                                    placeholder="Nama & Gelar Kades"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-xs">Jabatan Resmi</Label>
                                                <Input
                                                    required
                                                    value={kadesForm.data.jabatan_kades}
                                                    onChange={(e) => kadesForm.setData('jabatan_kades', e.target.value)}
                                                    placeholder="Kepala Desa Batu Belerang"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-dashed border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20">
                                            {/* Preview Box Kades */}
                                            <div className="relative aspect-4/5 w-24 shrink-0 rounded-xl border border-emerald-300 dark:border-emerald-700 overflow-hidden bg-slate-900 shadow-sm flex items-center justify-center">
                                                {kadesForm.data.foto_kades_base64 || kadesForm.data.foto_kades ? (
                                                    <img
                                                        src={kadesForm.data.foto_kades_base64 || kadesForm.data.foto_kades}
                                                        alt="Preview Kades"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-center p-2">
                                                        <ImageIcon className="size-6 text-slate-500 mx-auto mb-1" />
                                                        <span className="text-[10px] text-slate-400">Ratio 4:5</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2 flex-1">
                                                <Label className="text-xs font-bold text-slate-900 dark:text-white">
                                                    Upload & Crop Foto Kepala Desa (Rasio 4:5)
                                                </Label>
                                                <p className="text-[11px] text-slate-500">
                                                    Unggah foto Kepala Desa dan sesuaikan dengan alat potong interaktif agar posisinya presisi 400x500 piksel.
                                                </p>
                                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                                                        <Upload className="size-3.5" />
                                                        <span>{kadesForm.data.foto_kades_base64 ? 'Ganti Foto Kades' : 'Upload Foto Kepala Desa'}</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => handleImageSelect(e, 'kades')}
                                                        />
                                                    </label>
                                                    {kadesForm.data.foto_kades_base64 && (
                                                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]">
                                                            ✓ Foto Kades Siap Disimpan
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-1">
                                        <Button type="button" variant="outline" onClick={() => setIsEditingKades(false)} className="size-sm text-xs">
                                            Batal
                                        </Button>
                                        <Button type="submit" disabled={kadesForm.processing} className="bg-emerald-600 hover:bg-emerald-700 text-white size-sm text-xs gap-1.5">
                                            <Save className="size-3.5" /> Simpan Data Kepala Desa
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Form Tambah / Edit Aparatur Lainnya */}
                        <form onSubmit={submitAparatur} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                                    {editingAparaturId ? (
                                        <>
                                            <Edit3 className="size-4 text-emerald-600" /> Edit Data Perangkat Desa
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="size-4 text-emerald-600" /> Tambah Perangkat Desa / Aparatur Baru
                                        </>
                                    )}
                                </h3>
                                {editingAparaturId && (
                                    <Button type="button" variant="ghost" onClick={resetAparaturForm} className="size-xs text-xs text-rose-600">
                                        Batal Edit
                                    </Button>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-12">
                                <div className="md:col-span-4 space-y-3">
                                    <div>
                                        <Label className="text-xs">Nama Lengkap & Gelar</Label>
                                        <Input
                                            required
                                            value={aparaturForm.data.nama}
                                            onChange={(e) => aparaturForm.setData('nama', e.target.value)}
                                            placeholder="Contoh: Sulaeman, S.Pd"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs">Jabatan Resmi</Label>
                                        <Input
                                            required
                                            value={aparaturForm.data.jabatan}
                                            onChange={(e) => aparaturForm.setData('jabatan', e.target.value)}
                                            placeholder="Contoh: Sekretaris Desa"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                                    {/* Preview Box */}
                                    <div className="relative aspect-4/5 w-24 shrink-0 rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden bg-slate-900 shadow-sm flex items-center justify-center">
                                        {aparaturForm.data.foto_base64 || aparaturForm.data.foto_path ? (
                                            <img
                                                src={aparaturForm.data.foto_base64 || aparaturForm.data.foto_path}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center p-2">
                                                <ImageIcon className="size-6 text-slate-500 mx-auto mb-1" />
                                                <span className="text-[10px] text-slate-400">Ratio 4:5</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2 flex-1">
                                        <Label className="text-xs font-bold text-slate-900 dark:text-white">
                                            Upload & Crop Foto Perangkat (Fix Ratio 4:5)
                                        </Label>
                                        <p className="text-[11px] text-slate-500">
                                            Pilih foto dari komputer Anda, kemudian sistem akan membuka alat potong interaktif agar ukuran foto seragam 400x500 piksel.
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2 pt-1">
                                            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                                                <Upload className="size-3.5" />
                                                <span>{aparaturForm.data.foto_base64 ? 'Ganti Foto' : 'Pilih Foto File'}</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageSelect}
                                                />
                                            </label>
                                            {aparaturForm.data.foto_base64 && (
                                                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]">
                                                    ✓ Foto Siap Disimpan (Uniform 400x500)
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button type="submit" disabled={aparaturForm.processing} className="bg-emerald-600 hover:bg-emerald-700 text-white size-sm text-xs gap-1.5">
                                    <Save className="size-3.5" />
                                    {editingAparaturId ? 'Update Data Perangkat' : 'Simpan Perangkat Desa'}
                                </Button>
                            </div>
                        </form>

                        {/* List Aparatur */}
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {aparaturList.map((item) => (
                                <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between dark:border-slate-800 dark:bg-slate-900 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="relative aspect-4/5 w-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100">
                                            <img
                                                src={item.foto_path || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'}
                                                alt={item.nama}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.nama}</h4>
                                            <p className="text-[11px] text-slate-500">{item.jabatan}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => startEditAparatur(item)}
                                            className="text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                                            title="Edit Perangkat"
                                        >
                                            <Edit3 className="size-3.5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => deleteAparatur(item.id)}
                                            className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                                            title="Hapus Perangkat"
                                        >
                                            <Trash2 className="size-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 3.5: KELOLA HALAMAN SUB-MENU */}
                {mainTab === 'halaman' && (
                    <div className="space-y-6">
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                                        <FileText className="size-5 text-emerald-600" /> Pengelola Konten Sub-Menu Halaman Website
                                    </h3>
                                    <p className="text-xs text-slate-500">Pilih menu halaman yang ingin diubah judul, subjudul, atau isi konten utamanya.</p>
                                </div>

                                {selectedPageSlug && (
                                    <a
                                        href={`/${selectedPageSlug.replace('-', '/')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-800 dark:text-emerald-400"
                                    >
                                        <Globe className="size-3.5" />
                                        <span>Pratinjau Halaman Ini</span>
                                        <ExternalLink className="size-3" />
                                    </a>
                                )}
                            </div>

                            {/* Menu Page Selector Grid / Tabs */}
                            <div className="space-y-4">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Pilih Halaman yang Ingin Di-Edit:</Label>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Group 1: Profil Desa */}
                                    <div className="space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/30">
                                        <span className="text-[11px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 block pb-1 border-b border-slate-200/60 dark:border-slate-800">
                                            Kategori: Profil Desa
                                        </span>
                                        <div className="space-y-1">
                                            {[
                                                { slug: 'profil-tentang-kami', label: 'Tentang Kami' },
                                                { slug: 'profil-visi-misi', label: 'Visi & Misi' },
                                                { slug: 'profil-sejarah-desa', label: 'Sejarah Desa' },
                                                { slug: 'profil-geografis-desa', label: 'Geografis Desa' },
                                                { slug: 'profil-demografi-desa', label: 'Demografi Desa' },
                                            ].map((item) => (
                                                <button
                                                    key={item.slug}
                                                    type="button"
                                                    onClick={() => setSelectedPageSlug(item.slug)}
                                                    className={`w-full text-left text-xs font-semibold px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                                                        selectedPageSlug === item.slug
                                                            ? 'bg-emerald-600 text-white shadow-sm'
                                                            : 'text-slate-700 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800'
                                                    }`}
                                                >
                                                    <span>{item.label}</span>
                                                    {selectedPageSlug === item.slug && <Check className="size-3.5" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Group 2: Pemerintahan */}
                                    <div className="space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/30">
                                        <span className="text-[11px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 block pb-1 border-b border-slate-200/60 dark:border-slate-800">
                                            Kategori: Pemerintahan
                                        </span>
                                        <div className="space-y-1">
                                            {[
                                                { slug: 'pemerintahan-struktur-organisasi', label: 'Struktur Organisasi' },
                                                { slug: 'pemerintahan-rpjmdes', label: 'RPJMDes' },
                                                { slug: 'pemerintahan-tata-kelola', label: 'Tata Kelola' },
                                            ].map((item) => (
                                                <button
                                                    key={item.slug}
                                                    type="button"
                                                    onClick={() => setSelectedPageSlug(item.slug)}
                                                    className={`w-full text-left text-xs font-semibold px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                                                        selectedPageSlug === item.slug
                                                            ? 'bg-emerald-600 text-white shadow-sm'
                                                            : 'text-slate-700 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800'
                                                    }`}
                                                >
                                                    <span>{item.label}</span>
                                                    {selectedPageSlug === item.slug && <Check className="size-3.5" />}
                                                </button>
                                            ))}
                                            <div className="pt-1 text-[11px] text-slate-500 italic px-2">
                                                *Data Perangkat Desa di-edit via tab "Perangkat Desa".
                                            </div>
                                        </div>
                                    </div>

                                    {/* Group 3: Lembaga Desa */}
                                    <div className="space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/30">
                                        <span className="text-[11px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 block pb-1 border-b border-slate-200/60 dark:border-slate-800">
                                            Kategori: Lembaga Desa
                                        </span>
                                        <div className="space-y-1">
                                            {[
                                                { slug: 'lembaga-bpd', label: 'BPD' },
                                                { slug: 'lembaga-pkk', label: 'PKK' },
                                                { slug: 'lembaga-karang-taruna', label: 'Karang Taruna' },
                                                { slug: 'lembaga-rt-rw', label: 'RT & RW' },
                                                { slug: 'lembaga-posyandu', label: 'Posyandu' },
                                                { slug: 'lembaga-bumdes', label: 'BUMDes' },
                                            ].map((item) => (
                                                <button
                                                    key={item.slug}
                                                    type="button"
                                                    onClick={() => setSelectedPageSlug(item.slug)}
                                                    className={`w-full text-left text-xs font-semibold px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                                                        selectedPageSlug === item.slug
                                                            ? 'bg-emerald-600 text-white shadow-sm'
                                                            : 'text-slate-700 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800'
                                                    }`}
                                                >
                                                    <span>{item.label}</span>
                                                    {selectedPageSlug === item.slug && <Check className="size-3.5" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Edit Konten Halaman Terpilih */}
                            <form onSubmit={submitHalamanForm} className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase">
                                            {selectedHalaman?.kategori || 'Form Edit'}
                                        </span>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                            Form Edit: {selectedHalaman?.judul || selectedPageSlug}
                                        </h4>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={halamanForm.processing}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-2 shrink-0"
                                    >
                                        <Save className="size-3.5" />
                                        <span>Simpan Perubahan Halaman</span>
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-xs font-semibold">Judul Utama Halaman</Label>
                                        <Input
                                            required
                                            value={halamanForm.data.judul}
                                            onChange={(e) => halamanForm.setData('judul', e.target.value)}
                                            placeholder="Judul halaman..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs font-semibold">Subjudul / Ringkasan Singkat</Label>
                                        <Input
                                            value={halamanForm.data.subjudul}
                                            onChange={(e) => halamanForm.setData('subjudul', e.target.value)}
                                            placeholder="Subjudul atau penjelasan singkat..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs font-semibold">Isi Konten Utama / Paragraf Deskripsi</Label>
                                        <textarea
                                            className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent p-3 text-xs leading-relaxed focus:ring-2 focus:ring-emerald-500 min-h-[160px]"
                                            rows={8}
                                            value={halamanForm.data.isi}
                                            onChange={(e) => halamanForm.setData('isi', e.target.value)}
                                            placeholder="Tuliskan isi konten utama atau informasi lengkap halaman ini..."
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* TAB 4: KELOLA BERITA DESA */}
                {mainTab === 'berita' && (
                    <div className="space-y-6">
                        {/* Form Tambah/Edit Berita */}
                        <form onSubmit={submitBerita} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                                {editingBeritaId ? (
                                    <>
                                        <Edit3 className="size-4 text-emerald-600 animate-pulse" />
                                        <span>Edit Berita: <span className="text-emerald-600">{beritaForm.data.judul}</span></span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="size-4 text-emerald-600" />
                                        <span>Tulis Berita / Pengumuman Desa Baru</span>
                                    </>
                                )}
                            </h3>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <Label className="text-xs">Judul Berita</Label>
                                    <Input
                                        required
                                        value={beritaForm.data.judul}
                                        onChange={(e) => beritaForm.setData('judul', e.target.value)}
                                        placeholder="Judul Berita..."
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs">Kategori</Label>
                                    <Input
                                        required
                                        value={beritaForm.data.kategori}
                                        onChange={(e) => beritaForm.setData('kategori', e.target.value)}
                                        placeholder="Pariwisata / Pemerintahan / Kesejahteraan"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs">URL Foto Utama</Label>
                                    <Input
                                        value={beritaForm.data.foto_path}
                                        onChange={(e) => beritaForm.setData('foto_path', e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label className="text-xs">Ringkasan Berita</Label>
                                    <textarea
                                        required
                                        rows={2}
                                        className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent p-2 text-xs"
                                        value={beritaForm.data.ringkasan}
                                        onChange={(e) => beritaForm.setData('ringkasan', e.target.value)}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label className="text-xs">Isi Berita Lengkap</Label>
                                    <textarea
                                        rows={6}
                                        className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent p-2 text-xs"
                                        value={beritaForm.data.isi}
                                        onChange={(e) => beritaForm.setData('isi', e.target.value)}
                                        placeholder="Tuliskan isi artikel berita selengkapnya di sini..."
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                {editingBeritaId && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={resetBeritaForm}
                                        className="text-xs"
                                    >
                                        Batal Edit
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    disabled={beritaForm.processing}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white size-sm text-xs gap-1.5"
                                >
                                    <Save className="size-3.5" />
                                    <span>{editingBeritaId ? 'Simpan Perubahan' : 'Publish Berita'}</span>
                                </Button>
                            </div>
                        </form>

                        {/* List Berita */}
                        <div className="space-y-3">
                            {beritaList.map((b) => (
                                <div key={b.id} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between dark:border-slate-800 dark:bg-slate-900">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[10px]">{b.kategori}</Badge>
                                            <span className="text-[11px] text-slate-400">{formatDate(b.tanggal_publikasi)}</span>
                                        </div>
                                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{b.judul}</h4>
                                        <p className="text-[11px] text-slate-500 line-clamp-1">{b.ringkasan}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => startEditBerita(b)}
                                            className="text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                                            title="Edit Berita"
                                        >
                                            <Edit3 className="size-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => deleteBerita(b.id)}
                                            className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                                            title="Hapus Berita"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 5: APBDESA */}
                {mainTab === 'apbdes' && (
                    <form onSubmit={submitApbdes} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <h3 className="font-bold text-base text-slate-900 dark:text-white">Kelola Transparansi Keuangan APBDesa</h3>
                                <p className="text-xs text-slate-500">Update jumlah anggaran dan realisasi APBDesa tahunan untuk transparansi di halaman depan.</p>
                            </div>
                            <Button type="submit" disabled={apbdesForm.processing} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                                <Save className="size-4" /> Simpan APBDesa
                            </Button>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-3">
                            <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <h4 className="font-bold text-xs text-emerald-600 dark:text-emerald-400 uppercase">1. Pendapatan Desa</h4>
                                <div>
                                    <Label className="text-xs">Target Anggaran (Rp)</Label>
                                    <Input
                                        type="number"
                                        value={apbdesForm.data.pendapatan_anggaran}
                                        onChange={(e) => apbdesForm.setData('pendapatan_anggaran', Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs">Realisasi Saat Ini (Rp)</Label>
                                    <Input
                                        type="number"
                                        value={apbdesForm.data.pendapatan_realisasi}
                                        onChange={(e) => apbdesForm.setData('pendapatan_realisasi', Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <h4 className="font-bold text-xs text-blue-600 dark:text-blue-400 uppercase">2. Belanja Desa</h4>
                                <div>
                                    <Label className="text-xs">Target Anggaran (Rp)</Label>
                                    <Input
                                        type="number"
                                        value={apbdesForm.data.belanja_anggaran}
                                        onChange={(e) => apbdesForm.setData('belanja_anggaran', Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs">Realisasi Saat Ini (Rp)</Label>
                                    <Input
                                        type="number"
                                        value={apbdesForm.data.belanja_realisasi}
                                        onChange={(e) => apbdesForm.setData('belanja_realisasi', Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <h4 className="font-bold text-xs text-amber-600 dark:text-amber-400 uppercase">3. Pembiayaan Desa</h4>
                                <div>
                                    <Label className="text-xs">Target Anggaran (Rp)</Label>
                                    <Input
                                        type="number"
                                        value={apbdesForm.data.pembiayaan_anggaran}
                                        onChange={(e) => apbdesForm.setData('pembiayaan_anggaran', Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs">Realisasi Saat Ini (Rp)</Label>
                                    <Input
                                        type="number"
                                        value={apbdesForm.data.pembiayaan_realisasi}
                                        onChange={(e) => apbdesForm.setData('pembiayaan_realisasi', Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button type="submit" disabled={apbdesForm.processing} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                                <Save className="size-4" /> Simpan Data APBDesa
                            </Button>
                        </div>
                    </form>
                )}
            </div>

            {/* Image Cropper Modal */}
            <ImageCropperModal
                isOpen={cropperOpen}
                imageSrc={selectedImageSrc}
                onClose={() => setCropperOpen(false)}
                onCropComplete={handleCroppedPhoto}
                aspectRatio={4 / 5}
            />
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Dashboard',
                href: dashboard(),
            },
        ]}
    >
        {page}
    </AppLayout>
);
