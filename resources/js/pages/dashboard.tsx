import {
    Head,
    Link,
    useForm,
    usePage,
    usePoll,
    router,
} from '@inertiajs/react';
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
    Store,
    Map,
    Image as ImageIcon,
    Check,
} from 'lucide-react';
import ImageCropperModal from '@/components/image-cropper-modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard, home } from '@/routes';
import type { Auth } from '@/types';

interface KategoriItem {
    id: number;
    nama: string;
    slug: string;
}

interface PendudukItem {
    id: number;
    nama: string;
    nik: string;
}

interface ProdukItem {
    id: number;
    penduduk_id: number;
    kategori_umkm_id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    harga: number;
    stok: number;
    nomor_whatsapp: string;
    foto_path: string;
    status: 'menunggu_verifikasi' | 'aktif' | 'non_aktif';
    nama_kategori?: string;
    nama_penjual?: string;
}

interface WisataItem {
    id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    harga_tiket: number;
    koordinat_lokasi: string;
    alamat: string;
    jam_operasional: string;
    foto_sampul_path: string;
    galeri_foto: string[] | string;
}

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
    umkmList?: ProdukItem[];
    wisataList?: WisataItem[];
    kategoriUmkmList?: KategoriItem[];
    pendudukList?: any[];
    dusunList?: any[];
    kartuKeluargaList?: any[];
    jenisSuratList?: any[];
    suratList?: any[];
    pengaduanList?: any[];
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
    umkmList = [],
    wisataList = [],
    kategoriUmkmList = [],
    pendudukList = [],
    dusunList = [],
    kartuKeluargaList = [],
    jenisSuratList = [],
    suratList = [],
    pengaduanList = [],
}: DashboardProps) {
    const { auth, url } = usePage<{ auth: Auth }>().props;

    const getInitialTab = () => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const tabParam = params.get('tab');
            const validTabs = [
                'overview',
                'profil',
                'aparatur',
                'halaman',
                'berita',
                'apbdes',
                'pasar-maya',
                'wisata',
                'penduduk',
                'kartu-keluarga',
                'dusun',
                'jenis-surat',
                'permohonan-surat',
                'pengaduan',
                'agenda',
                'regulasi',
            ];
            if (validTabs.includes(tabParam || '')) {
                return tabParam as any;
            }
        }
        return 'overview';
    };

    const [mainTab, setMainTab] = useState<
        | 'overview'
        | 'profil'
        | 'aparatur'
        | 'halaman'
        | 'berita'
        | 'apbdes'
        | 'pasar-maya'
        | 'wisata'
        | 'penduduk'
        | 'kartu-keluarga'
        | 'dusun'
        | 'jenis-surat'
        | 'permohonan-surat'
        | 'pengaduan'
        | 'agenda'
        | 'regulasi'
    >(getInitialTab);
    const [activityTab, setActivityTab] = useState<
        'surat' | 'pengaduan' | 'agenda'
    >('surat');

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const tabParam = params.get('tab');
            const validTabs = [
                'overview',
                'profil',
                'aparatur',
                'halaman',
                'berita',
                'apbdes',
                'pasar-maya',
                'wisata',
                'penduduk',
                'kartu-keluarga',
                'dusun',
                'jenis-surat',
                'permohonan-surat',
                'pengaduan',
                'agenda',
                'regulasi',
            ];
            if (tabParam && validTabs.includes(tabParam)) {
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
        hero_subtitle:
            profilDesa?.hero_subtitle ||
            'Kecamatan Sinjai Borong, Kabupaten Sinjai, Provinsi Sulawesi Selatan',
        hero_bg_path:
            profilDesa?.hero_bg_path ||
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=80',
        hero_bg_file: null as File | null,
        nama_kades: profilDesa?.nama_kades || 'Ahmad P',
        jabatan_kades: profilDesa?.jabatan_kades || 'Kepala Desa Batu Belerang',
        sambutan_kades:
            profilDesa?.sambutan_kades ||
            'Selamat datang di website resmi Desa Batu Belerang.',
        foto_kades:
            profilDesa?.foto_kades ||
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
        sejarah: profilDesa?.sejarah || '',
        visi:
            profilDesa?.visi ||
            'Terwujudnya Desa Batu Belerang yang Mandiri dan Sejahtera.',
        misi: (profilDesa?.misi || []) as string[],
        alamat_kantor:
            profilDesa?.alamat_kantor ||
            'Jalan Poros Biji Nangka - Batu Belerang',
        telepon: profilDesa?.telepon || '(0482) 123-4567',
        email: profilDesa?.email || 'pemdes@batubelerang.desa.id',
    });

    const [newMisiText, setNewMisiText] = useState('');

    // State Cropper & Edit Aparatur
    const [cropperOpen, setCropperOpen] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(
        null,
    );
    const [targetCropper, setTargetCropper] = useState<'aparatur' | 'kades'>(
        'aparatur',
    );
    const [editingAparaturId, setEditingAparaturId] = useState<number | null>(
        null,
    );
    const [isEditingKades, setIsEditingKades] = useState(false);
    const [editingBeritaId, setEditingBeritaId] = useState<number | null>(null);

    // State & Forms for Pasar Maya & Wisata
    const [editingProduk, setEditingProduk] = useState<ProdukItem | null>(null);
    const [editingWisata, setEditingWisata] = useState<WisataItem | null>(null);

    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const produkForm = useForm({
        penduduk_id: '',
        kategori_umkm_id: '',
        nama: '',
        deskripsi: '',
        harga: '',
        stok: '',
        nomor_whatsapp: '628',
        foto_path: '',
        status: 'aktif',
    });

    const wisataForm = useForm({
        nama: '',
        deskripsi: '',
        harga_tiket: '0',
        koordinat_lokasi: '',
        alamat: '',
        jam_operasional: '',
        foto_sampul_path: '',
        galeri_foto_raw: '',
    });

    // --- NEW ADMIN CRUD FORMS & HANDLERS ---
    const [editingDusun, setEditingDusun] = useState<any | null>(null);
    const dusunForm = useForm({
        nama: '',
        kepala_dusun_id: '',
    });

    const [editingKK, setEditingKK] = useState<any | null>(null);
    const kkForm = useForm({
        no_kk: '',
        nik_kepala_keluarga: '',
        alamat: '',
    });

    const [editingPenduduk, setEditingPenduduk] = useState<any | null>(null);
    const pendudukForm = useForm({
        nik: '',
        nama: '',
        jenis_kelamin: 'L',
        tempat_lahir: '',
        tanggal_lahir: '',
        golongan_darah: 'O',
        agama: '',
        status_perkawinan: 'belum_kawin',
        kartu_keluarga_id: '',
        dusun_id: '',
        rt: '',
        rw: '',
        alamat: '',
        status_warga: 'aktif',
        is_hamil: false,
        is_stunting: false,
        is_disabilitas: false,
        jenis_disabilitas: '',
        is_penerima_bansos: false,
    });

    const [editingJenisSurat, setEditingJenisSurat] = useState<any | null>(
        null,
    );
    const jenisSuratForm = useForm({
        kode: '',
        nama: '',
        deskripsi: '',
        is_aktif: true,
    });

    const [selectedPermohonan, setSelectedPermohonan] = useState<any | null>(
        null,
    );
    const permohonanStatusForm = useForm({
        status: 'menunggu_persetujuan',
        catatan_admin: '',
    });

    const [selectedPengaduan, setSelectedPengaduan] = useState<any | null>(
        null,
    );
    const pengaduanTanggapanForm = useForm({
        status: 'terkirim',
        tanggapan_admin: '',
    });

    const [editingRegulasi, setEditingRegulasi] = useState<any | null>(null);
    const regulasiForm = useForm({
        judul: '',
        jenis: 'perdes',
        tahun: String(new Date().getFullYear()),
        nomor: '',
        deskripsi: '',
        file_path: '',
        status: true,
    });

    const [editingAgenda, setEditingAgenda] = useState<any | null>(null);
    const agendaForm = useForm({
        judul: '',
        deskripsi: '',
        lokasi: '',
        waktu_mulai: '',
        waktu_selesai: '',
        koordinator: '',
    });

    const handleSaveDusun = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingDusun) {
            dusunForm.put(`/admin/dusun/${editingDusun.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setEditingDusun(null);
                    dusunForm.reset();
                },
            });
        } else {
            dusunForm.post('/admin/dusun', {
                preserveScroll: true,
                onSuccess: () => {
                    dusunForm.reset();
                },
            });
        }
    };

    const handleDeleteDusun = (id: number) => {
        if (confirm('Yakin ingin menghapus dusun ini?')) {
            router.delete(`/admin/dusun/${id}`, { preserveScroll: true });
        }
    };

    const handleEditDusun = (dusun: any) => {
        setEditingDusun(dusun);
        dusunForm.setData({
            nama: dusun.nama,
            kepala_dusun_id: dusun.kepala_dusun_id
                ? String(dusun.kepala_dusun_id)
                : '',
        });
    };

    const handleCancelEditDusun = () => {
        setEditingDusun(null);
        dusunForm.reset();
    };

    const handleSaveKK = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingKK) {
            kkForm.put(`/admin/kartu-keluarga/${editingKK.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setEditingKK(null);
                    kkForm.reset();
                },
            });
        } else {
            kkForm.post('/admin/kartu-keluarga', {
                preserveScroll: true,
                onSuccess: () => {
                    kkForm.reset();
                },
            });
        }
    };

    const handleDeleteKK = (id: number) => {
        if (confirm('Yakin ingin menghapus Kartu Keluarga ini?')) {
            router.delete(`/admin/kartu-keluarga/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleEditKK = (kk: any) => {
        setEditingKK(kk);
        kkForm.setData({
            no_kk: kk.no_kk,
            nik_kepala_keluarga: kk.nik_kepala_keluarga || '',
            alamat: kk.alamat,
        });
    };

    const handleCancelEditKK = () => {
        setEditingKK(null);
        kkForm.reset();
    };

    const handleSavePenduduk = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...pendudukForm.data,
            kartu_keluarga_id: pendudukForm.data.kartu_keluarga_id
                ? Number(pendudukForm.data.kartu_keluarga_id)
                : null,
            dusun_id: Number(pendudukForm.data.dusun_id),
        };
        if (editingPenduduk) {
            router.put(
                `/admin/penduduk/${editingPenduduk.id}`,
                payload as any,
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setEditingPenduduk(null);
                        pendudukForm.reset();
                    },
                },
            );
        } else {
            router.post('/admin/penduduk', payload as any, {
                preserveScroll: true,
                onSuccess: () => {
                    pendudukForm.reset();
                },
            });
        }
    };

    const handleDeletePenduduk = (id: number) => {
        if (confirm('Yakin ingin menghapus data penduduk ini?')) {
            router.delete(`/admin/penduduk/${id}`, { preserveScroll: true });
        }
    };

    const handleEditPenduduk = (penduduk: any) => {
        setEditingPenduduk(penduduk);
        // Format date string to YYYY-MM-DD
        let formattedDate = '';
        if (penduduk.tanggal_lahir) {
            formattedDate = penduduk.tanggal_lahir.split('T')[0];
        }
        pendudukForm.setData({
            nik: penduduk.nik,
            nama: penduduk.nama,
            jenis_kelamin: penduduk.jenis_kelamin,
            tempat_lahir: penduduk.tempat_lahir,
            tanggal_lahir: formattedDate,
            golongan_darah: penduduk.golongan_darah || 'O',
            agama: penduduk.agama,
            status_perkawinan: penduduk.status_perkawinan,
            kartu_keluarga_id: penduduk.kartu_keluarga_id
                ? String(penduduk.kartu_keluarga_id)
                : '',
            dusun_id: penduduk.dusun_id ? String(penduduk.dusun_id) : '',
            rt: penduduk.rt,
            rw: penduduk.rw,
            alamat: penduduk.alamat,
            status_warga: penduduk.status_warga || 'aktif',
            is_hamil: Boolean(penduduk.is_hamil),
            is_stunting: Boolean(penduduk.is_stunting),
            is_disabilitas: Boolean(penduduk.is_disabilitas),
            jenis_disabilitas: penduduk.jenis_disabilitas || '',
            is_penerima_bansos: Boolean(penduduk.is_penerima_bansos),
        });
    };

    const handleCancelEditPenduduk = () => {
        setEditingPenduduk(null);
        pendudukForm.reset();
    };

    const handleSaveJenisSurat = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingJenisSurat) {
            jenisSuratForm.put(`/admin/jenis-surat/${editingJenisSurat.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setEditingJenisSurat(null);
                    jenisSuratForm.reset();
                },
            });
        } else {
            jenisSuratForm.post('/admin/jenis-surat', {
                preserveScroll: true,
                onSuccess: () => {
                    jenisSuratForm.reset();
                },
            });
        }
    };

    const handleDeleteJenisSurat = (id: number) => {
        if (confirm('Yakin ingin menghapus jenis surat ini?')) {
            router.delete(`/admin/jenis-surat/${id}`, { preserveScroll: true });
        }
    };

    const handleEditJenisSurat = (js: any) => {
        setEditingJenisSurat(js);
        jenisSuratForm.setData({
            kode: js.kode,
            nama: js.nama,
            deskripsi: js.deskripsi,
            is_aktif: Boolean(js.is_aktif),
        });
    };

    const handleCancelEditJenisSurat = () => {
        setEditingJenisSurat(null);
        jenisSuratForm.reset();
    };

    const handleSavePermohonanStatus = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPermohonan) {
            permohonanStatusForm.post(
                `/admin/permohonan-surat/${selectedPermohonan.id}/status`,
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedPermohonan(null);
                        permohonanStatusForm.reset();
                    },
                },
            );
        }
    };

    const handleSavePengaduanTanggapan = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPengaduan) {
            pengaduanTanggapanForm.post(
                `/admin/pengaduan/${selectedPengaduan.id}/tanggapan`,
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedPengaduan(null);
                        pengaduanTanggapanForm.reset();
                    },
                },
            );
        }
    };

    const handleSaveRegulasi = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingRegulasi) {
            regulasiForm.put(`/admin/regulasi/${editingRegulasi.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setEditingRegulasi(null);
                    regulasiForm.reset();
                },
            });
        } else {
            regulasiForm.post('/admin/regulasi', {
                preserveScroll: true,
                onSuccess: () => {
                    regulasiForm.reset();
                },
            });
        }
    };

    const handleDeleteRegulasi = (id: number) => {
        if (confirm('Yakin ingin menghapus regulasi ini?')) {
            router.delete(`/admin/regulasi/${id}`, { preserveScroll: true });
        }
    };

    const handleEditRegulasi = (reg: any) => {
        setEditingRegulasi(reg);
        regulasiForm.setData({
            judul: reg.judul,
            jenis: reg.jenis,
            tahun: String(reg.tahun),
            nomor: reg.nomor,
            deskripsi: reg.deskripsi || '',
            file_path: reg.file_path || '',
            status: Boolean(reg.status),
        });
    };

    const handleCancelEditRegulasi = () => {
        setEditingRegulasi(null);
        regulasiForm.reset();
    };

    const handleSaveAgenda = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAgenda) {
            agendaForm.put(`/admin/agenda/${editingAgenda.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setEditingAgenda(null);
                    agendaForm.reset();
                },
            });
        } else {
            agendaForm.post('/admin/agenda', {
                preserveScroll: true,
                onSuccess: () => {
                    agendaForm.reset();
                },
            });
        }
    };

    const handleDeleteAgenda = (id: number) => {
        if (confirm('Yakin ingin menghapus agenda ini?')) {
            router.delete(`/admin/agenda/${id}`, { preserveScroll: true });
        }
    };

    const handleEditAgenda = (ag: any) => {
        setEditingAgenda(ag);
        // Format datetime-local format: YYYY-MM-DDTHH:MM
        let formattedMulai = '';
        if (ag.waktu_mulai) {
            formattedMulai = new Date(ag.waktu_mulai)
                .toISOString()
                .slice(0, 16);
        }
        let formattedSelesai = '';
        if (ag.waktu_selesai) {
            formattedSelesai = new Date(ag.waktu_selesai)
                .toISOString()
                .slice(0, 16);
        }
        agendaForm.setData({
            judul: ag.judul,
            deskripsi: ag.deskripsi || '',
            lokasi: ag.lokasi,
            waktu_mulai: formattedMulai,
            waktu_selesai: formattedSelesai,
            koordinator: ag.koordinator || '',
        });
    };

    const handleCancelEditAgenda = () => {
        setEditingAgenda(null);
        agendaForm.reset();
    };
    // ---------------------------------------

    const handleSaveProduk = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduk) {
            produkForm.put(`/admin/produk/${editingProduk.id}`, {
                onSuccess: () => {
                    setEditingProduk(null);
                    produkForm.reset();
                },
            });
        } else {
            produkForm.post('/admin/produk', {
                onSuccess: () => {
                    produkForm.reset();
                },
            });
        }
    };

    const handleDeleteProduk = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            router.delete(`/admin/produk/${id}`);
        }
    };

    const handleEditProduk = (produk: ProdukItem) => {
        setEditingProduk(produk);
        produkForm.setData({
            penduduk_id: String(produk.penduduk_id),
            kategori_umkm_id: String(produk.kategori_umkm_id),
            nama: produk.nama,
            deskripsi: produk.deskripsi,
            harga: String(produk.harga),
            stok: String(produk.stok),
            nomor_whatsapp: produk.nomor_whatsapp,
            foto_path: produk.foto_path,
            status: produk.status,
        });
    };

    const handleCancelEditProduk = () => {
        setEditingProduk(null);
        produkForm.reset();
    };

    const handleSaveWisata = (e: React.FormEvent) => {
        e.preventDefault();
        const galeriArray = wisataForm.data.galeri_foto_raw
            ? wisataForm.data.galeri_foto_raw
                  .split(',')
                  .map((url) => url.trim())
                  .filter((url) => url.length > 0)
            : [];

        const payload = {
            nama: wisataForm.data.nama,
            deskripsi: wisataForm.data.deskripsi,
            harga_tiket: Number(wisataForm.data.harga_tiket),
            koordinat_lokasi: wisataForm.data.koordinat_lokasi,
            alamat: wisataForm.data.alamat,
            jam_operasional: wisataForm.data.jam_operasional,
            foto_sampul_path: wisataForm.data.foto_sampul_path,
            galeri_foto: galeriArray,
        };

        if (editingWisata) {
            router.put(`/admin/wisata/${editingWisata.id}`, payload, {
                onSuccess: () => {
                    setEditingWisata(null);
                    wisataForm.reset();
                },
            });
        } else {
            router.post('/admin/wisata', payload, {
                onSuccess: () => {
                    wisataForm.reset();
                },
            });
        }
    };

    const handleDeleteWisata = (id: number) => {
        if (
            confirm('Apakah Anda yakin ingin menghapus destinasi wisata ini?')
        ) {
            router.delete(`/admin/wisata/${id}`);
        }
    };

    const handleEditWisata = (wisata: WisataItem) => {
        setEditingWisata(wisata);
        let galeriRaw = '';
        if (Array.isArray(wisata.galeri_foto)) {
            galeriRaw = wisata.galeri_foto.join(', ');
        } else if (typeof wisata.galeri_foto === 'string') {
            try {
                const parsed = JSON.parse(wisata.galeri_foto);
                if (Array.isArray(parsed)) {
                    galeriRaw = parsed.join(', ');
                }
            } catch (e) {
                galeriRaw = wisata.galeri_foto;
            }
        }
        wisataForm.setData({
            nama: wisata.nama,
            deskripsi: wisata.deskripsi,
            harga_tiket: String(wisata.harga_tiket),
            koordinat_lokasi: wisata.koordinat_lokasi,
            alamat: wisata.alamat,
            jam_operasional: wisata.jam_operasional,
            foto_sampul_path: wisata.foto_sampul_path,
            galeri_foto_raw: galeriRaw,
        });
    };

    const handleCancelEditWisata = () => {
        setEditingWisata(null);
        wisataForm.reset();
    };

    // Form Edit Kades (under Perangkat Desa Tab)
    const kadesForm = useForm({
        nama_kades: profilDesa?.nama_kades || 'Ahmad P',
        jabatan_kades: profilDesa?.jabatan_kades || 'Kepala Desa Batu Belerang',
        foto_kades:
            profilDesa?.foto_kades ||
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
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
    const pend = apbdesList.find((a) => a.jenis === 'pendapatan');
    const bel = apbdesList.find((a) => a.jenis === 'belanja');
    const pem = apbdesList.find((a) => a.jenis === 'pembiayaan');

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
    const [selectedPageSlug, setSelectedPageSlug] = useState<string>(
        'profil-tentang-kami',
    );
    const selectedHalaman = halamanKontenList?.find(
        (h) => h.slug === selectedPageSlug,
    );

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
        halamanForm.post(`/admin/halaman/${selectedPageSlug}`, {
            preserveScroll: true,
        });
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

    const addMisiItem = () => {
        if (!newMisiText.trim()) return;
        profilForm.setData('misi', [
            ...profilForm.data.misi,
            newMisiText.trim(),
        ]);
        setNewMisiText('');
    };

    const removeMisiItem = (index: number) => {
        profilForm.setData(
            'misi',
            profilForm.data.misi.filter((_, i) => i !== index),
        );
    };

    const handleImageSelect = (
        e: React.ChangeEvent<HTMLInputElement>,
        target: 'aparatur' | 'kades' = 'aparatur',
    ) => {
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
            tanggal_publikasi:
                berita.tanggal_publikasi ||
                new Date().toISOString().split('T')[0],
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
            aparaturForm.delete(`/admin/aparatur/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const deleteBerita = (id: number) => {
        if (confirm('Yakin ingin menghapus berita ini?')) {
            beritaForm.delete(`/admin/berita/${id}`, { preserveScroll: true });
        }
    };

    const pendingActionsCount =
        (stats?.surat?.menunggu || 0) +
        (stats?.pengaduan?.terkirim || 0) +
        (stats?.umkm?.pending || 0);

    return (
        <>
            <Head title="Admin Dashboard - Kelola Informasi Desa" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Hero Greeting Card */}
                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 text-white shadow-xl md:p-8">
                    <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
                                    <Sparkles className="size-3.5 text-emerald-400" />
                                    Portal Pemerintahan Desa Batu Belerang
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                                Dashboard Kelola Informasi,{' '}
                                <span className="text-emerald-300">
                                    {auth?.user?.name || 'Admin'}
                                </span>{' '}
                                👋
                            </h1>
                            <p className="max-w-2xl text-sm text-slate-300">
                                Kelola seluruh konten halaman depan (Hero,
                                Sambutan Kades, Perangkat Desa, Berita, APBDesa)
                                serta layanan kependudukan warga secara terpadu.
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                            <Link href={home()}>
                                <Button
                                    variant="outline"
                                    className="gap-2 border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                                >
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
                                <span className="text-xs font-semibold text-slate-500 uppercase">
                                    Total Penduduk
                                </span>
                                <div className="mt-2 text-2xl font-bold">
                                    {stats?.warga || 0} Warga
                                </div>
                                <span className="text-xs text-slate-400">
                                    {stats?.kk || 0} Kartu Keluarga
                                </span>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <span className="text-xs font-semibold text-slate-500 uppercase">
                                    Permohonan Surat
                                </span>
                                <div className="mt-2 text-2xl font-bold">
                                    {stats?.surat?.total || 0} Permohonan
                                </div>
                                <span className="text-xs font-semibold text-amber-600">
                                    {stats?.surat?.menunggu || 0} Menunggu
                                    Verifikasi
                                </span>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <span className="text-xs font-semibold text-slate-500 uppercase">
                                    Pengaduan Warga
                                </span>
                                <div className="mt-2 text-2xl font-bold">
                                    {stats?.pengaduan?.total || 0} Pengaduan
                                </div>
                                <span className="text-xs font-semibold text-rose-600">
                                    {stats?.pengaduan?.terkirim || 0} Belum
                                    Dibaca
                                </span>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <span className="text-xs font-semibold text-slate-500 uppercase">
                                    Potensi Desa
                                </span>
                                <div className="mt-2 text-2xl font-bold">
                                    {(stats?.umkm?.total || 0) +
                                        (stats?.wisata?.destinasi || 0)}{' '}
                                    Item
                                </div>
                                <span className="text-xs text-slate-400">
                                    {stats?.umkm?.total || 0} UMKM &{' '}
                                    {stats?.wisata?.destinasi || 0} Wisata
                                </span>
                            </div>
                        </div>

                        {/* Recent Activity Table */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h3 className="mb-4 text-sm font-bold">
                                Permohonan Surat Terbaru
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50 font-semibold text-slate-500 uppercase dark:bg-slate-800/60">
                                        <tr>
                                            <th className="px-3 py-2.5">
                                                Pemohon
                                            </th>
                                            <th className="px-3 py-2.5">NIK</th>
                                            <th className="px-3 py-2.5">
                                                Jenis Surat
                                            </th>
                                            <th className="px-3 py-2.5">
                                                Tanggal
                                            </th>
                                            <th className="px-3 py-2.5">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {suratTerbaru.map((s) => (
                                            <tr key={s.id}>
                                                <td className="px-3 py-2.5 font-semibold">
                                                    {s.nama_pemohon}
                                                </td>
                                                <td className="px-3 py-2.5 font-mono">
                                                    {s.nik}
                                                </td>
                                                <td className="px-3 py-2.5">
                                                    {s.nama_surat}
                                                </td>
                                                <td className="px-3 py-2.5 text-slate-500">
                                                    {formatDate(s.created_at)}
                                                </td>
                                                <td className="px-3 py-2.5">
                                                    <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
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
                    <form
                        onSubmit={submitProfil}
                        className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                    Pengaturan Halaman Depan & Profil Desa
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Ubah judul hero banner, sambutan kepala
                                    desa, visi misi, serta informasi kontak
                                    desa.
                                </p>
                            </div>
                            <Button
                                type="submit"
                                disabled={profilForm.processing}
                                className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                <Save className="size-4" /> Save Changes
                            </Button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">
                                    Judul Banner Utama (Hero Title)
                                </Label>
                                <Input
                                    value={profilForm.data.hero_title}
                                    onChange={(e) =>
                                        profilForm.setData(
                                            'hero_title',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Contoh: Membangun Desa Modern..."
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">
                                    Subjudul Banner Utama (Hero Subtitle)
                                </Label>
                                <textarea
                                    className="w-full rounded-md border border-slate-300 bg-transparent p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 dark:border-slate-700"
                                    rows={2}
                                    value={profilForm.data.hero_subtitle}
                                    onChange={(e) =>
                                        profilForm.setData(
                                            'hero_subtitle',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">
                                    Foto Background Banner Utama (Hero
                                    Background Image)
                                </Label>
                                <div className="flex flex-col items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:flex-row dark:border-slate-800 dark:bg-slate-900/50">
                                    <img
                                        src={profilForm.data.hero_bg_path}
                                        alt="Hero Background Preview"
                                        className="h-20 w-36 shrink-0 rounded-md border border-slate-300 object-cover shadow-sm dark:border-slate-700"
                                    />
                                    <div className="w-full space-y-2">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (file) {
                                                    profilForm.setData(
                                                        'hero_bg_file',
                                                        file,
                                                    );
                                                    profilForm.setData(
                                                        'hero_bg_path',
                                                        URL.createObjectURL(
                                                            file,
                                                        ),
                                                    );
                                                }
                                            }}
                                            className="bg-white text-xs dark:bg-slate-950"
                                        />
                                        <Input
                                            type="text"
                                            value={profilForm.data.hero_bg_path}
                                            onChange={(e) =>
                                                profilForm.setData(
                                                    'hero_bg_path',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Atau masukkan URL foto background..."
                                            className="text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">
                                    Nama Kepala Desa
                                </Label>
                                <Input
                                    value={profilForm.data.nama_kades}
                                    onChange={(e) =>
                                        profilForm.setData(
                                            'nama_kades',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">
                                    Jabatan Kepala Desa
                                </Label>
                                <Input
                                    value={profilForm.data.jabatan_kades}
                                    onChange={(e) =>
                                        profilForm.setData(
                                            'jabatan_kades',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">
                                    URL Foto Kepala Desa
                                </Label>
                                <Input
                                    value={profilForm.data.foto_kades}
                                    onChange={(e) =>
                                        profilForm.setData(
                                            'foto_kades',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">
                                    Teks Sambutan Kepala Desa
                                </Label>
                                <textarea
                                    className="w-full rounded-md border border-slate-300 bg-transparent p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 dark:border-slate-700"
                                    rows={4}
                                    value={profilForm.data.sambutan_kades}
                                    onChange={(e) =>
                                        profilForm.setData(
                                            'sambutan_kades',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">
                                    Visi Pembangunan Desa
                                </Label>
                                <textarea
                                    className="w-full rounded-md border border-slate-300 bg-transparent p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 dark:border-slate-700"
                                    rows={3}
                                    value={profilForm.data.visi}
                                    onChange={(e) =>
                                        profilForm.setData(
                                            'visi',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">
                                    Sejarah Desa (Tentang Kami)
                                </Label>
                                <textarea
                                    className="w-full rounded-md border border-slate-300 bg-transparent p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 dark:border-slate-700"
                                    rows={5}
                                    value={profilForm.data.sejarah}
                                    onChange={(e) =>
                                        profilForm.setData(
                                            'sejarah',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Tuliskan sejarah desa / tentang kami secara detail..."
                                />
                            </div>

                            <div className="space-y-3 sm:col-span-2">
                                <Label className="text-xs font-semibold">
                                    Misi Pembangunan Desa
                                </Label>

                                <div className="space-y-2">
                                    {profilForm.data.misi.map(
                                        (misiItem: string, idx: number) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/50 p-2 dark:border-slate-800 dark:bg-slate-950/20"
                                            >
                                                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                                    {idx + 1}
                                                </span>
                                                <span className="flex-1 text-xs text-slate-700 dark:text-slate-300">
                                                    {misiItem}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeMisiItem(idx)
                                                    }
                                                    className="cursor-pointer px-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        ),
                                    )}

                                    {profilForm.data.misi.length === 0 && (
                                        <p className="text-xs text-slate-400 italic">
                                            Belum ada misi yang ditambahkan.
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Input
                                        value={newMisiText}
                                        onChange={(e) =>
                                            setNewMisiText(e.target.value)
                                        }
                                        placeholder="Tambah butir misi baru..."
                                        className="flex-1 bg-white text-xs dark:bg-slate-950"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addMisiItem();
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        onClick={addMisiItem}
                                        className="bg-emerald-600 px-4 text-xs text-white hover:bg-emerald-700"
                                    >
                                        Tambah Misi
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">
                                    Alamat Kantor Desa
                                </Label>
                                <Input
                                    value={profilForm.data.alamat_kantor}
                                    onChange={(e) =>
                                        profilForm.setData(
                                            'alamat_kantor',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">
                                    Telepon Resmi
                                </Label>
                                <Input
                                    value={profilForm.data.telepon}
                                    onChange={(e) =>
                                        profilForm.setData(
                                            'telepon',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <Label className="text-xs font-semibold">
                                    Email Resmi
                                </Label>
                                <Input
                                    type="email"
                                    value={profilForm.data.email}
                                    onChange={(e) =>
                                        profilForm.setData(
                                            'email',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                disabled={profilForm.processing}
                                className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                <Save className="size-4" /> Simpan Pengaturan
                            </Button>
                        </div>
                    </form>
                )}

                {/* TAB 3: PERANGKAT DESA */}
                {mainTab === 'aparatur' && (
                    <div className="space-y-6">
                        {/* 👑 KEPALA DESA CARD & EDIT FORM */}
                        <div className="space-y-4 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-900/10 via-teal-900/10 to-slate-900/10 p-5 shadow-sm dark:border-emerald-500/20 dark:bg-slate-900">
                            <div className="flex flex-col justify-between gap-4 border-b border-emerald-200/50 pb-3 sm:flex-row sm:items-center dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <span className="text-base">👑</span>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                            Kepala Desa (Pemimpin Pemerintahan
                                            Desa)
                                        </h3>
                                        <p className="text-[11px] text-slate-500">
                                            Pemimpin utama Desa Batu Belerang
                                            yang tampil terdepan pada struktur
                                            organisasi di halaman depan.
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setIsEditingKades(!isEditingKades)
                                    }
                                    className="size-sm shrink-0 gap-1.5 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
                                >
                                    <Edit3 className="size-3.5" />
                                    {isEditingKades
                                        ? 'Tutup Form Kades'
                                        : 'Edit Kepala Desa & Foto'}
                                </Button>
                            </div>

                            {/* Card Display Kades */}
                            {!isEditingKades ? (
                                <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/80">
                                    <div className="relative aspect-4/5 w-16 shrink-0 overflow-hidden rounded-lg border border-emerald-300 bg-slate-100 shadow-sm dark:border-emerald-700">
                                        <img
                                            src={
                                                kadesForm.data.foto_kades ||
                                                'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
                                            }
                                            alt={kadesForm.data.nama_kades}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="inline-block rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                            Kepala Desa
                                        </span>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                            {kadesForm.data.nama_kades}
                                        </h4>
                                        <p className="text-xs text-slate-500">
                                            {kadesForm.data.jabatan_kades}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                /* Form Edit Kades */
                                <form
                                    onSubmit={submitKades}
                                    className="space-y-4 pt-2"
                                >
                                    <div className="grid gap-4 md:grid-cols-12">
                                        <div className="space-y-3 md:col-span-4">
                                            <div>
                                                <Label className="text-xs">
                                                    Nama Kepala Desa
                                                </Label>
                                                <Input
                                                    required
                                                    value={
                                                        kadesForm.data
                                                            .nama_kades
                                                    }
                                                    onChange={(e) =>
                                                        kadesForm.setData(
                                                            'nama_kades',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Nama & Gelar Kades"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-xs">
                                                    Jabatan Resmi
                                                </Label>
                                                <Input
                                                    required
                                                    value={
                                                        kadesForm.data
                                                            .jabatan_kades
                                                    }
                                                    onChange={(e) =>
                                                        kadesForm.setData(
                                                            'jabatan_kades',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Kepala Desa Batu Belerang"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-start gap-4 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/30 p-4 sm:flex-row sm:items-center md:col-span-8 dark:border-emerald-800 dark:bg-emerald-950/20">
                                            {/* Preview Box Kades */}
                                            <div className="relative flex aspect-4/5 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-emerald-300 bg-slate-900 shadow-sm dark:border-emerald-700">
                                                {kadesForm.data
                                                    .foto_kades_base64 ||
                                                kadesForm.data.foto_kades ? (
                                                    <img
                                                        src={
                                                            kadesForm.data
                                                                .foto_kades_base64 ||
                                                            kadesForm.data
                                                                .foto_kades
                                                        }
                                                        alt="Preview Kades"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="p-2 text-center">
                                                        <ImageIcon className="mx-auto mb-1 size-6 text-slate-500" />
                                                        <span className="text-[10px] text-slate-400">
                                                            Ratio 4:5
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 space-y-2">
                                                <Label className="text-xs font-bold text-slate-900 dark:text-white">
                                                    Upload & Crop Foto Kepala
                                                    Desa (Rasio 4:5)
                                                </Label>
                                                <p className="text-[11px] text-slate-500">
                                                    Unggah foto Kepala Desa dan
                                                    sesuaikan dengan alat potong
                                                    interaktif agar posisinya
                                                    presisi 400x500 piksel.
                                                </p>
                                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700">
                                                        <Upload className="size-3.5" />
                                                        <span>
                                                            {kadesForm.data
                                                                .foto_kades_base64
                                                                ? 'Ganti Foto Kades'
                                                                : 'Upload Foto Kepala Desa'}
                                                        </span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                handleImageSelect(
                                                                    e,
                                                                    'kades',
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                    {kadesForm.data
                                                        .foto_kades_base64 && (
                                                        <Badge className="bg-emerald-100 text-[10px] text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                                            ✓ Foto Kades Siap
                                                            Disimpan
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-1">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                setIsEditingKades(false)
                                            }
                                            className="size-sm text-xs"
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={kadesForm.processing}
                                            className="size-sm gap-1.5 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
                                        >
                                            <Save className="size-3.5" /> Simpan
                                            Data Kepala Desa
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Form Tambah / Edit Aparatur Lainnya */}
                        <form
                            onSubmit={submitAparatur}
                            className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                    {editingAparaturId ? (
                                        <>
                                            <Edit3 className="size-4 text-emerald-600" />{' '}
                                            Edit Data Perangkat Desa
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="size-4 text-emerald-600" />{' '}
                                            Tambah Perangkat Desa / Aparatur
                                            Baru
                                        </>
                                    )}
                                </h3>
                                {editingAparaturId && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={resetAparaturForm}
                                        className="size-xs text-xs text-rose-600"
                                    >
                                        Batal Edit
                                    </Button>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-12">
                                <div className="space-y-3 md:col-span-4">
                                    <div>
                                        <Label className="text-xs">
                                            Nama Lengkap & Gelar
                                        </Label>
                                        <Input
                                            required
                                            value={aparaturForm.data.nama}
                                            onChange={(e) =>
                                                aparaturForm.setData(
                                                    'nama',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Contoh: Sulaeman, S.Pd"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs">
                                            Jabatan Resmi
                                        </Label>
                                        <Input
                                            required
                                            value={aparaturForm.data.jabatan}
                                            onChange={(e) =>
                                                aparaturForm.setData(
                                                    'jabatan',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Contoh: Sekretaris Desa"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-4 sm:flex-row sm:items-center md:col-span-8 dark:border-slate-700 dark:bg-slate-800/30">
                                    {/* Preview Box */}
                                    <div className="relative flex aspect-4/5 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-300 bg-slate-900 shadow-sm dark:border-slate-700">
                                        {aparaturForm.data.foto_base64 ||
                                        aparaturForm.data.foto_path ? (
                                            <img
                                                src={
                                                    aparaturForm.data
                                                        .foto_base64 ||
                                                    aparaturForm.data.foto_path
                                                }
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="p-2 text-center">
                                                <ImageIcon className="mx-auto mb-1 size-6 text-slate-500" />
                                                <span className="text-[10px] text-slate-400">
                                                    Ratio 4:5
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <Label className="text-xs font-bold text-slate-900 dark:text-white">
                                            Upload & Crop Foto Perangkat (Fix
                                            Ratio 4:5)
                                        </Label>
                                        <p className="text-[11px] text-slate-500">
                                            Pilih foto dari komputer Anda,
                                            kemudian sistem akan membuka alat
                                            potong interaktif agar ukuran foto
                                            seragam 400x500 piksel.
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2 pt-1">
                                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700">
                                                <Upload className="size-3.5" />
                                                <span>
                                                    {aparaturForm.data
                                                        .foto_base64
                                                        ? 'Ganti Foto'
                                                        : 'Pilih Foto File'}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageSelect}
                                                />
                                            </label>
                                            {aparaturForm.data.foto_base64 && (
                                                <Badge className="bg-emerald-100 text-[10px] text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                                    ✓ Foto Siap Disimpan
                                                    (Uniform 400x500)
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    type="submit"
                                    disabled={aparaturForm.processing}
                                    className="size-sm gap-1.5 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
                                >
                                    <Save className="size-3.5" />
                                    {editingAparaturId
                                        ? 'Update Data Perangkat'
                                        : 'Simpan Perangkat Desa'}
                                </Button>
                            </div>
                        </form>

                        {/* List Aparatur */}
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {aparaturList.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative aspect-4/5 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700">
                                            <img
                                                src={
                                                    item.foto_path ||
                                                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
                                                }
                                                alt={item.nama}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                                {item.nama}
                                            </h4>
                                            <p className="text-[11px] text-slate-500">
                                                {item.jabatan}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() =>
                                                startEditAparatur(item)
                                            }
                                            className="text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                                            title="Edit Perangkat"
                                        >
                                            <Edit3 className="size-3.5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() =>
                                                deleteAparatur(item.id)
                                            }
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
                        <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center dark:border-slate-800">
                                <div>
                                    <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                                        <FileText className="size-5 text-emerald-600" />{' '}
                                        Pengelola Konten Sub-Menu Halaman
                                        Website
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        Pilih menu halaman yang ingin diubah
                                        judul, subjudul, atau isi konten
                                        utamanya.
                                    </p>
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
                                <Label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                    Pilih Halaman yang Ingin Di-Edit:
                                </Label>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {/* Group 1: Profil Desa */}
                                    <div className="space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/30">
                                        <span className="block border-b border-slate-200/60 pb-1 text-[11px] font-extrabold text-emerald-600 uppercase dark:border-slate-800 dark:text-emerald-400">
                                            Kategori: Profil Desa
                                        </span>
                                        <div className="space-y-1">
                                            {[
                                                {
                                                    slug: 'profil-tentang-kami',
                                                    label: 'Tentang Kami',
                                                },
                                                {
                                                    slug: 'profil-visi-misi',
                                                    label: 'Visi & Misi',
                                                },
                                                {
                                                    slug: 'profil-sejarah-desa',
                                                    label: 'Sejarah Desa',
                                                },
                                                {
                                                    slug: 'profil-geografis-desa',
                                                    label: 'Geografis Desa',
                                                },
                                                {
                                                    slug: 'profil-demografi-desa',
                                                    label: 'Demografi Desa',
                                                },
                                            ].map((item) => (
                                                <button
                                                    key={item.slug}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedPageSlug(
                                                            item.slug,
                                                        )
                                                    }
                                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-all ${
                                                        selectedPageSlug ===
                                                        item.slug
                                                            ? 'bg-emerald-600 text-white shadow-sm'
                                                            : 'text-slate-700 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800'
                                                    }`}
                                                >
                                                    <span>{item.label}</span>
                                                    {selectedPageSlug ===
                                                        item.slug && (
                                                        <Check className="size-3.5" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Group 2: Pemerintahan */}
                                    <div className="space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/30">
                                        <span className="block border-b border-slate-200/60 pb-1 text-[11px] font-extrabold text-emerald-600 uppercase dark:border-slate-800 dark:text-emerald-400">
                                            Kategori: Pemerintahan
                                        </span>
                                        <div className="space-y-1">
                                            {[
                                                {
                                                    slug: 'pemerintahan-struktur-organisasi',
                                                    label: 'Struktur Organisasi',
                                                },
                                                {
                                                    slug: 'pemerintahan-rpjmdes',
                                                    label: 'RPJMDes',
                                                },
                                                {
                                                    slug: 'pemerintahan-tata-kelola',
                                                    label: 'Tata Kelola',
                                                },
                                            ].map((item) => (
                                                <button
                                                    key={item.slug}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedPageSlug(
                                                            item.slug,
                                                        )
                                                    }
                                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-all ${
                                                        selectedPageSlug ===
                                                        item.slug
                                                            ? 'bg-emerald-600 text-white shadow-sm'
                                                            : 'text-slate-700 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800'
                                                    }`}
                                                >
                                                    <span>{item.label}</span>
                                                    {selectedPageSlug ===
                                                        item.slug && (
                                                        <Check className="size-3.5" />
                                                    )}
                                                </button>
                                            ))}
                                            <div className="px-2 pt-1 text-[11px] text-slate-500 italic">
                                                *Data Perangkat Desa di-edit via
                                                tab "Perangkat Desa".
                                            </div>
                                        </div>
                                    </div>

                                    {/* Group 3: Lembaga Desa */}
                                    <div className="space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/30">
                                        <span className="block border-b border-slate-200/60 pb-1 text-[11px] font-extrabold text-emerald-600 uppercase dark:border-slate-800 dark:text-emerald-400">
                                            Kategori: Lembaga Desa
                                        </span>
                                        <div className="space-y-1">
                                            {[
                                                {
                                                    slug: 'lembaga-bpd',
                                                    label: 'BPD',
                                                },
                                                {
                                                    slug: 'lembaga-pkk',
                                                    label: 'PKK',
                                                },
                                                {
                                                    slug: 'lembaga-karang-taruna',
                                                    label: 'Karang Taruna',
                                                },
                                                {
                                                    slug: 'lembaga-rt-rw',
                                                    label: 'RT & RW',
                                                },
                                                {
                                                    slug: 'lembaga-posyandu',
                                                    label: 'Posyandu',
                                                },
                                                {
                                                    slug: 'lembaga-bumdes',
                                                    label: 'BUMDes',
                                                },
                                            ].map((item) => (
                                                <button
                                                    key={item.slug}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedPageSlug(
                                                            item.slug,
                                                        )
                                                    }
                                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-all ${
                                                        selectedPageSlug ===
                                                        item.slug
                                                            ? 'bg-emerald-600 text-white shadow-sm'
                                                            : 'text-slate-700 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800'
                                                    }`}
                                                >
                                                    <span>{item.label}</span>
                                                    {selectedPageSlug ===
                                                        item.slug && (
                                                        <Check className="size-3.5" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Edit Konten Halaman Terpilih */}
                            <form
                                onSubmit={submitHalamanForm}
                                className="space-y-4 border-t border-slate-100 pt-4 dark:border-slate-800"
                            >
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="rounded bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 uppercase dark:bg-emerald-950 dark:text-emerald-300">
                                            {selectedHalaman?.kategori ||
                                                'Form Edit'}
                                        </span>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                            Form Edit:{' '}
                                            {selectedHalaman?.judul ||
                                                selectedPageSlug}
                                        </h4>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={halamanForm.processing}
                                        className="shrink-0 gap-2 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
                                    >
                                        <Save className="size-3.5" />
                                        <span>Simpan Perubahan Halaman</span>
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-xs font-semibold">
                                            Judul Utama Halaman
                                        </Label>
                                        <Input
                                            required
                                            value={halamanForm.data.judul}
                                            onChange={(e) =>
                                                halamanForm.setData(
                                                    'judul',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Judul halaman..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs font-semibold">
                                            Subjudul / Ringkasan Singkat
                                        </Label>
                                        <Input
                                            value={halamanForm.data.subjudul}
                                            onChange={(e) =>
                                                halamanForm.setData(
                                                    'subjudul',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Subjudul atau penjelasan singkat..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs font-semibold">
                                            Isi Konten Utama / Paragraf
                                            Deskripsi
                                        </Label>
                                        <textarea
                                            className="min-h-[160px] w-full rounded-md border border-slate-300 bg-transparent p-3 text-xs leading-relaxed focus:ring-2 focus:ring-emerald-500 dark:border-slate-700"
                                            rows={8}
                                            value={halamanForm.data.isi}
                                            onChange={(e) =>
                                                halamanForm.setData(
                                                    'isi',
                                                    e.target.value,
                                                )
                                            }
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
                        <form
                            onSubmit={submitBerita}
                            className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                {editingBeritaId ? (
                                    <>
                                        <Edit3 className="size-4 animate-pulse text-emerald-600" />
                                        <span>
                                            Edit Berita:{' '}
                                            <span className="text-emerald-600">
                                                {beritaForm.data.judul}
                                            </span>
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="size-4 text-emerald-600" />
                                        <span>
                                            Tulis Berita / Pengumuman Desa Baru
                                        </span>
                                    </>
                                )}
                            </h3>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <Label className="text-xs">
                                        Judul Berita
                                    </Label>
                                    <Input
                                        required
                                        value={beritaForm.data.judul}
                                        onChange={(e) =>
                                            beritaForm.setData(
                                                'judul',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Judul Berita..."
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs">Kategori</Label>
                                    <Input
                                        required
                                        value={beritaForm.data.kategori}
                                        onChange={(e) =>
                                            beritaForm.setData(
                                                'kategori',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Pariwisata / Pemerintahan / Kesejahteraan"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs">
                                        URL Foto Utama
                                    </Label>
                                    <Input
                                        value={beritaForm.data.foto_path}
                                        onChange={(e) =>
                                            beritaForm.setData(
                                                'foto_path',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label className="text-xs">
                                        Ringkasan Berita
                                    </Label>
                                    <textarea
                                        required
                                        rows={2}
                                        className="w-full rounded-md border border-slate-300 bg-transparent p-2 text-xs dark:border-slate-700"
                                        value={beritaForm.data.ringkasan}
                                        onChange={(e) =>
                                            beritaForm.setData(
                                                'ringkasan',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label className="text-xs">
                                        Isi Berita Lengkap
                                    </Label>
                                    <textarea
                                        rows={6}
                                        className="w-full rounded-md border border-slate-300 bg-transparent p-2 text-xs dark:border-slate-700"
                                        value={beritaForm.data.isi}
                                        onChange={(e) =>
                                            beritaForm.setData(
                                                'isi',
                                                e.target.value,
                                            )
                                        }
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
                                    className="size-sm gap-1.5 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
                                >
                                    <Save className="size-3.5" />
                                    <span>
                                        {editingBeritaId
                                            ? 'Simpan Perubahan'
                                            : 'Publish Berita'}
                                    </span>
                                </Button>
                            </div>
                        </form>

                        {/* List Berita */}
                        <div className="space-y-3">
                            {beritaList.map((b) => (
                                <div
                                    key={b.id}
                                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className="text-[10px]"
                                            >
                                                {b.kategori}
                                            </Badge>
                                            <span className="text-[11px] text-slate-400">
                                                {formatDate(
                                                    b.tanggal_publikasi,
                                                )}
                                            </span>
                                        </div>
                                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                            {b.judul}
                                        </h4>
                                        <p className="line-clamp-1 text-[11px] text-slate-500">
                                            {b.ringkasan}
                                        </p>
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
                    <form
                        onSubmit={submitApbdes}
                        className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                    Kelola Transparansi Keuangan APBDesa
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Update jumlah anggaran dan realisasi APBDesa
                                    tahunan untuk transparansi di halaman depan.
                                </p>
                            </div>
                            <Button
                                type="submit"
                                disabled={apbdesForm.processing}
                                className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                <Save className="size-4" /> Simpan APBDesa
                            </Button>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-3">
                            <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                                <h4 className="text-xs font-bold text-emerald-600 uppercase dark:text-emerald-400">
                                    1. Pendapatan Desa
                                </h4>
                                <div>
                                    <Label className="text-xs">
                                        Target Anggaran (Rp)
                                    </Label>
                                    <Input
                                        type="number"
                                        value={
                                            apbdesForm.data.pendapatan_anggaran
                                        }
                                        onChange={(e) =>
                                            apbdesForm.setData(
                                                'pendapatan_anggaran',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs">
                                        Realisasi Saat Ini (Rp)
                                    </Label>
                                    <Input
                                        type="number"
                                        value={
                                            apbdesForm.data.pendapatan_realisasi
                                        }
                                        onChange={(e) =>
                                            apbdesForm.setData(
                                                'pendapatan_realisasi',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                                <h4 className="text-xs font-bold text-blue-600 uppercase dark:text-blue-400">
                                    2. Belanja Desa
                                </h4>
                                <div>
                                    <Label className="text-xs">
                                        Target Anggaran (Rp)
                                    </Label>
                                    <Input
                                        type="number"
                                        value={apbdesForm.data.belanja_anggaran}
                                        onChange={(e) =>
                                            apbdesForm.setData(
                                                'belanja_anggaran',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs">
                                        Realisasi Saat Ini (Rp)
                                    </Label>
                                    <Input
                                        type="number"
                                        value={
                                            apbdesForm.data.belanja_realisasi
                                        }
                                        onChange={(e) =>
                                            apbdesForm.setData(
                                                'belanja_realisasi',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                                <h4 className="text-xs font-bold text-amber-600 uppercase dark:text-amber-400">
                                    3. Pembiayaan Desa
                                </h4>
                                <div>
                                    <Label className="text-xs">
                                        Target Anggaran (Rp)
                                    </Label>
                                    <Input
                                        type="number"
                                        value={
                                            apbdesForm.data.pembiayaan_anggaran
                                        }
                                        onChange={(e) =>
                                            apbdesForm.setData(
                                                'pembiayaan_anggaran',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs">
                                        Realisasi Saat Ini (Rp)
                                    </Label>
                                    <Input
                                        type="number"
                                        value={
                                            apbdesForm.data.pembiayaan_realisasi
                                        }
                                        onChange={(e) =>
                                            apbdesForm.setData(
                                                'pembiayaan_realisasi',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button
                                type="submit"
                                disabled={apbdesForm.processing}
                                className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                <Save className="size-4" /> Simpan Data APBDesa
                            </Button>
                        </div>
                    </form>
                )}

                {/* TAB 6: KELOLA PASAR MAYA */}
                {mainTab === 'pasar-maya' && (
                    <div className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-12">
                            {/* Left Column: Form */}
                            <div className="lg:col-span-5">
                                <form
                                    onSubmit={handleSaveProduk}
                                    className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                        {editingProduk ? (
                                            <>
                                                <Edit3 className="size-4 animate-pulse text-emerald-600" />
                                                <span>
                                                    Edit Produk:{' '}
                                                    <span className="text-emerald-600">
                                                        {produkForm.data.nama}
                                                    </span>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="size-4 text-emerald-600" />
                                                <span>Tambah Produk Baru</span>
                                            </>
                                        )}
                                    </h3>

                                    <div>
                                        <Label className="text-xs">
                                            Penjual (Penduduk Desa)
                                        </Label>
                                        <select
                                            required
                                            value={produkForm.data.penduduk_id}
                                            onChange={(e) =>
                                                produkForm.setData(
                                                    'penduduk_id',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        >
                                            <option value="">
                                                -- Pilih Penjual --
                                            </option>
                                            {pendudukList.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.nama} ({p.nik})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Kategori Produk
                                        </Label>
                                        <select
                                            required
                                            value={
                                                produkForm.data.kategori_umkm_id
                                            }
                                            onChange={(e) =>
                                                produkForm.setData(
                                                    'kategori_umkm_id',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        >
                                            <option value="">
                                                -- Pilih Kategori --
                                            </option>
                                            {kategoriUmkmList.map((cat) => (
                                                <option
                                                    key={cat.id}
                                                    value={cat.id}
                                                >
                                                    {cat.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Nama Produk
                                        </Label>
                                        <Input
                                            required
                                            value={produkForm.data.nama}
                                            onChange={(e) =>
                                                produkForm.setData(
                                                    'nama',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nama produk..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">
                                                Harga (Rp)
                                            </Label>
                                            <Input
                                                required
                                                type="number"
                                                value={produkForm.data.harga}
                                                onChange={(e) =>
                                                    produkForm.setData(
                                                        'harga',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="35000"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">
                                                Stok
                                            </Label>
                                            <Input
                                                required
                                                type="number"
                                                value={produkForm.data.stok}
                                                onChange={(e) =>
                                                    produkForm.setData(
                                                        'stok',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="10"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Nomor WhatsApp (Format: 628xxx)
                                        </Label>
                                        <Input
                                            required
                                            value={
                                                produkForm.data.nomor_whatsapp
                                            }
                                            onChange={(e) =>
                                                produkForm.setData(
                                                    'nomor_whatsapp',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="628123456789"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            URL Foto Produk (Pisahkan dengan
                                            koma jika multi-gambar)
                                        </Label>
                                        <Input
                                            required
                                            value={produkForm.data.foto_path}
                                            onChange={(e) =>
                                                produkForm.setData(
                                                    'foto_path',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Status Verifikasi
                                        </Label>
                                        <select
                                            required
                                            value={produkForm.data.status}
                                            onChange={(e) =>
                                                produkForm.setData(
                                                    'status',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        >
                                            <option value="aktif">
                                                Aktif (Tampil)
                                            </option>
                                            <option value="menunggu_verifikasi">
                                                Menunggu Verifikasi
                                            </option>
                                            <option value="non_aktif">
                                                Non Aktif
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Deskripsi Produk
                                        </Label>
                                        <textarea
                                            required
                                            value={produkForm.data.deskripsi}
                                            onChange={(e) =>
                                                produkForm.setData(
                                                    'deskripsi',
                                                    e.target.value,
                                                )
                                            }
                                            rows={3}
                                            placeholder="Deskripsi detail produk..."
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        {editingProduk && (
                                            <Button
                                                type="button"
                                                onClick={handleCancelEditProduk}
                                                className="dark:hover:bg-slate-750 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                Batal
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            disabled={produkForm.processing}
                                            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                                        >
                                            <Save className="size-4" /> Simpan
                                            Produk
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Right Column: List */}
                            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Daftar Produk Pasar Maya ({umkmList.length})
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
                                                <th className="py-2">Foto</th>
                                                <th className="py-2">
                                                    Nama Produk
                                                </th>
                                                <th className="py-2">
                                                    Kategori
                                                </th>
                                                <th className="py-2">Harga</th>
                                                <th className="py-2">
                                                    Penjual
                                                </th>
                                                <th className="py-2 text-right">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {umkmList.map((item) => {
                                                const firstImg = item.foto_path
                                                    ? item.foto_path.split(
                                                          ',',
                                                      )[0]
                                                    : '';
                                                return (
                                                    <tr
                                                        key={item.id}
                                                        className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                                    >
                                                        <td className="py-2.5">
                                                            <img
                                                                src={firstImg}
                                                                alt={item.nama}
                                                                className="size-10 animate-in rounded-md object-cover fade-in"
                                                            />
                                                        </td>
                                                        <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                                                            {item.nama}
                                                        </td>
                                                        <td className="py-2.5 text-slate-500">
                                                            {item.nama_kategori}
                                                        </td>
                                                        <td className="py-2.5 font-extrabold text-emerald-600">
                                                            {formatRupiah(
                                                                item.harga,
                                                            )}
                                                        </td>
                                                        <td className="py-2.5 text-slate-500">
                                                            {item.nama_penjual}
                                                        </td>
                                                        <td className="space-x-2 py-2.5 text-right">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleEditProduk(
                                                                        item,
                                                                    )
                                                                }
                                                                className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDeleteProduk(
                                                                        item.id,
                                                                    )
                                                                }
                                                                className="cursor-pointer font-semibold text-rose-600 hover:text-rose-700"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 7: KELOLA DESTINASI WISATA */}
                {mainTab === 'wisata' && (
                    <div className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-12">
                            {/* Left Column: Form */}
                            <div className="lg:col-span-5">
                                <form
                                    onSubmit={handleSaveWisata}
                                    className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                        {editingWisata ? (
                                            <>
                                                <Edit3 className="size-4 animate-pulse text-emerald-600" />
                                                <span>
                                                    Edit Wisata:{' '}
                                                    <span className="text-emerald-600">
                                                        {wisataForm.data.nama}
                                                    </span>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="size-4 text-emerald-600" />
                                                <span>
                                                    Tambah Destinasi Wisata Baru
                                                </span>
                                            </>
                                        )}
                                    </h3>

                                    <div>
                                        <Label className="text-xs">
                                            Nama Wisata
                                        </Label>
                                        <Input
                                            required
                                            value={wisataForm.data.nama}
                                            onChange={(e) =>
                                                wisataForm.setData(
                                                    'nama',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nama objek wisata..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">
                                                Harga Tiket (Rp)
                                            </Label>
                                            <Input
                                                required
                                                type="number"
                                                value={
                                                    wisataForm.data.harga_tiket
                                                }
                                                onChange={(e) =>
                                                    wisataForm.setData(
                                                        'harga_tiket',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="10000"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">
                                                Jam Operasional
                                            </Label>
                                            <Input
                                                required
                                                value={
                                                    wisataForm.data
                                                        .jam_operasional
                                                }
                                                onChange={(e) =>
                                                    wisataForm.setData(
                                                        'jam_operasional',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="08:00 - 17:00 WITA"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">
                                                Koordinat / Link Lokasi (Lat,
                                                Long atau URL)
                                            </Label>
                                            <Input
                                                required
                                                value={
                                                    wisataForm.data
                                                        .koordinat_lokasi
                                                }
                                                onChange={(e) =>
                                                    wisataForm.setData(
                                                        'koordinat_lokasi',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="-5.2974,120.0211 atau https://..."
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">
                                                Alamat / Dusun
                                            </Label>
                                            <Input
                                                required
                                                value={wisataForm.data.alamat}
                                                onChange={(e) =>
                                                    wisataForm.setData(
                                                        'alamat',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Dusun Bontoe, Desa Batu Belerang"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            URL Foto Sampul Utama
                                        </Label>
                                        <Input
                                            required
                                            value={
                                                wisataForm.data.foto_sampul_path
                                            }
                                            onChange={(e) =>
                                                wisataForm.setData(
                                                    'foto_sampul_path',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            URL Galeri Foto (Pisahkan dengan
                                            koma jika lebih dari satu)
                                        </Label>
                                        <textarea
                                            required
                                            value={
                                                wisataForm.data.galeri_foto_raw
                                            }
                                            onChange={(e) =>
                                                wisataForm.setData(
                                                    'galeri_foto_raw',
                                                    e.target.value,
                                                )
                                            }
                                            rows={2}
                                            placeholder="https://image1.com, https://image2.com"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Deskripsi Wisata
                                        </Label>
                                        <textarea
                                            required
                                            value={wisataForm.data.deskripsi}
                                            onChange={(e) =>
                                                wisataForm.setData(
                                                    'deskripsi',
                                                    e.target.value,
                                                )
                                            }
                                            rows={3}
                                            placeholder="Deskripsi detail objek wisata..."
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        {editingWisata && (
                                            <Button
                                                type="button"
                                                onClick={handleCancelEditWisata}
                                                className="dark:hover:bg-slate-750 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                Batal
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            disabled={wisataForm.processing}
                                            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                                        >
                                            <Save className="size-4" /> Simpan
                                            Wisata
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Right Column: List */}
                            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Daftar Destinasi Wisata ({wisataList.length}
                                    )
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
                                                <th className="py-2">Sampul</th>
                                                <th className="py-2">
                                                    Nama Wisata
                                                </th>
                                                <th className="py-2">Alamat</th>
                                                <th className="py-2">Tiket</th>
                                                <th className="py-2 text-right">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {wisataList.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                                >
                                                    <td className="py-2.5">
                                                        <img
                                                            src={
                                                                item.foto_sampul_path
                                                            }
                                                            alt={item.nama}
                                                            className="size-10 rounded-md object-cover"
                                                        />
                                                    </td>
                                                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                                                        {item.nama}
                                                    </td>
                                                    <td className="py-2.5 text-slate-500">
                                                        {item.alamat}
                                                    </td>
                                                    <td className="py-2.5 font-extrabold text-emerald-600">
                                                        {formatRupiah(
                                                            item.harga_tiket,
                                                        )}
                                                    </td>
                                                    <td className="space-x-2 py-2.5 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEditWisata(
                                                                    item,
                                                                )
                                                            }
                                                            className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteWisata(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="cursor-pointer font-semibold text-rose-600 hover:text-rose-700"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 9: KELOLA DATA PENDUDUK */}
                {mainTab === 'penduduk' && (
                    <div className="animate-in space-y-6 duration-300 fade-in">
                        <div className="grid gap-6 lg:grid-cols-12">
                            {/* Form */}
                            <div className="lg:col-span-4">
                                <form
                                    onSubmit={handleSavePenduduk}
                                    className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                        {editingPenduduk ? (
                                            <>
                                                <Edit3 className="size-4 animate-pulse text-emerald-600" />
                                                <span>
                                                    Edit Penduduk:{' '}
                                                    <span className="text-emerald-600">
                                                        {pendudukForm.data.nama}
                                                    </span>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="size-4 text-emerald-600" />
                                                <span>Tambah Penduduk</span>
                                            </>
                                        )}
                                    </h3>

                                    <div>
                                        <Label className="text-xs">NIK</Label>
                                        <Input
                                            required
                                            maxLength={16}
                                            value={pendudukForm.data.nik}
                                            onChange={(e) =>
                                                pendudukForm.setData(
                                                    'nik',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="16 Digit NIK..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Nama Lengkap
                                        </Label>
                                        <Input
                                            required
                                            value={pendudukForm.data.nama}
                                            onChange={(e) =>
                                                pendudukForm.setData(
                                                    'nama',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nama lengkap..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">
                                                Jenis Kelamin
                                            </Label>
                                            <select
                                                required
                                                value={
                                                    pendudukForm.data
                                                        .jenis_kelamin
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'jenis_kelamin',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            >
                                                <option value="L">
                                                    Laki-laki
                                                </option>
                                                <option value="P">
                                                    Perempuan
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <Label className="text-xs">
                                                Golongan Darah
                                            </Label>
                                            <select
                                                required
                                                value={
                                                    pendudukForm.data
                                                        .golongan_darah
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'golongan_darah',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            >
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="AB">AB</option>
                                                <option value="O">O</option>
                                                <option value="-">-</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">
                                                Tempat Lahir
                                            </Label>
                                            <Input
                                                required
                                                value={
                                                    pendudukForm.data
                                                        .tempat_lahir
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'tempat_lahir',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Tempat lahir..."
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">
                                                Tanggal Lahir
                                            </Label>
                                            <Input
                                                required
                                                type="date"
                                                value={
                                                    pendudukForm.data
                                                        .tanggal_lahir
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'tanggal_lahir',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">
                                                Agama
                                            </Label>
                                            <Input
                                                required
                                                value={pendudukForm.data.agama}
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'agama',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Islam, Kristen, dll..."
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">
                                                Status Perkawinan
                                            </Label>
                                            <select
                                                required
                                                value={
                                                    pendudukForm.data
                                                        .status_perkawinan
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'status_perkawinan',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            >
                                                <option value="belum_kawin">
                                                    Belum Kawin
                                                </option>
                                                <option value="kawin">
                                                    Kawin
                                                </option>
                                                <option value="cerai_hidup">
                                                    Cerai Hidup
                                                </option>
                                                <option value="cerai_mati">
                                                    Cerai Mati
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">
                                                Dusun
                                            </Label>
                                            <select
                                                required
                                                value={
                                                    pendudukForm.data.dusun_id
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'dusun_id',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            >
                                                <option value="">
                                                    -- Pilih Dusun --
                                                </option>
                                                {dusunList.map((d) => (
                                                    <option
                                                        key={d.id}
                                                        value={d.id}
                                                    >
                                                        {d.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <Label className="text-xs">
                                                Kartu Keluarga
                                            </Label>
                                            <select
                                                value={
                                                    pendudukForm.data
                                                        .kartu_keluarga_id
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'kartu_keluarga_id',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            >
                                                <option value="">
                                                    -- Pilih No KK --
                                                </option>
                                                {kartuKeluargaList.map((kk) => (
                                                    <option
                                                        key={kk.id}
                                                        value={kk.id}
                                                    >
                                                        {kk.no_kk}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">
                                                RT
                                            </Label>
                                            <Input
                                                required
                                                maxLength={3}
                                                value={pendudukForm.data.rt}
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'rt',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="001"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">
                                                RW
                                            </Label>
                                            <Input
                                                required
                                                maxLength={3}
                                                value={pendudukForm.data.rw}
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'rw',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="001"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Alamat Lengkap
                                        </Label>
                                        <textarea
                                            required
                                            value={pendudukForm.data.alamat}
                                            onChange={(e) =>
                                                pendudukForm.setData(
                                                    'alamat',
                                                    e.target.value,
                                                )
                                            }
                                            rows={2}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            placeholder="Alamat detail..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Status Warga
                                        </Label>
                                        <select
                                            required
                                            value={
                                                pendudukForm.data.status_warga
                                            }
                                            onChange={(e) =>
                                                pendudukForm.setData(
                                                    'status_warga',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        >
                                            <option value="aktif">Aktif</option>
                                            <option value="pindah">
                                                Pindah
                                            </option>
                                            <option value="meninggal">
                                                Meninggal
                                            </option>
                                        </select>
                                    </div>

                                    {/* Attributes (Checkboxes) */}
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <label className="flex cursor-pointer items-center gap-2 text-xs select-none">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    pendudukForm.data.is_hamil
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'is_hamil',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span>Hamil</span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-2 text-xs select-none">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    pendudukForm.data
                                                        .is_stunting
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'is_stunting',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span>Stunting</span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-2 text-xs select-none">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    pendudukForm.data
                                                        .is_disabilitas
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'is_disabilitas',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span>Disabilitas</span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-2 text-xs select-none">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    pendudukForm.data
                                                        .is_penerima_bansos
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'is_penerima_bansos',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span>Penerima Bansos</span>
                                        </label>
                                    </div>

                                    {pendudukForm.data.is_disabilitas && (
                                        <div>
                                            <Label className="text-xs">
                                                Jenis Disabilitas
                                            </Label>
                                            <Input
                                                value={
                                                    pendudukForm.data
                                                        .jenis_disabilitas
                                                }
                                                onChange={(e) =>
                                                    pendudukForm.setData(
                                                        'jenis_disabilitas',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Tuna wicara, netra, dll..."
                                            />
                                        </div>
                                    )}

                                    <div className="flex justify-end gap-2 pt-2">
                                        {editingPenduduk && (
                                            <Button
                                                type="button"
                                                onClick={
                                                    handleCancelEditPenduduk
                                                }
                                                className="dark:hover:bg-slate-750 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                Batal
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            disabled={pendudukForm.processing}
                                            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                                        >
                                            <Save className="size-4" /> Simpan
                                            Penduduk
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Table */}
                            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-8 dark:border-slate-800 dark:bg-slate-900">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Daftar Penduduk ({pendudukList.length})
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
                                                <th className="py-2">
                                                    NIK / Nama
                                                </th>
                                                <th className="py-2">L/P</th>
                                                <th className="py-2">
                                                    Umur / TTL
                                                </th>
                                                <th className="py-2">
                                                    Alamat / Dusun
                                                </th>
                                                <th className="py-2">Status</th>
                                                <th className="py-2 text-right">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendudukList.map((item) => {
                                                const age = item.tanggal_lahir
                                                    ? new Date().getFullYear() -
                                                      new Date(
                                                          item.tanggal_lahir,
                                                      ).getFullYear()
                                                    : '-';
                                                return (
                                                    <tr
                                                        key={item.id}
                                                        className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                                    >
                                                        <td className="py-2.5">
                                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                                {item.nama}
                                                            </div>
                                                            <div className="text-slate-450 font-mono text-[10px]">
                                                                {item.nik}
                                                            </div>
                                                        </td>
                                                        <td className="py-2.5">
                                                            {item.jenis_kelamin}
                                                        </td>
                                                        <td className="py-2.5 text-slate-500">
                                                            <div>
                                                                {age} Tahun
                                                            </div>
                                                            <div className="text-[10px] text-slate-400">
                                                                {
                                                                    item.tempat_lahir
                                                                }
                                                                ,{' '}
                                                                {formatDate(
                                                                    item.tanggal_lahir,
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="py-2.5 text-slate-500">
                                                            <div>
                                                                RT {item.rt} /
                                                                RW {item.rw}
                                                            </div>
                                                            <div className="text-[10px] text-slate-400">
                                                                Dusun{' '}
                                                                {item.nama_dusun ||
                                                                    '-'}
                                                            </div>
                                                        </td>
                                                        <td className="py-2.5">
                                                            <Badge
                                                                variant={
                                                                    item.status_warga ===
                                                                    'aktif'
                                                                        ? 'default'
                                                                        : 'secondary'
                                                                }
                                                                className={
                                                                    item.status_warga ===
                                                                    'aktif'
                                                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                                                        : ''
                                                                }
                                                            >
                                                                {
                                                                    item.status_warga
                                                                }
                                                            </Badge>
                                                        </td>
                                                        <td className="space-x-2 py-2.5 text-right">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleEditPenduduk(
                                                                        item,
                                                                    )
                                                                }
                                                                className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDeletePenduduk(
                                                                        item.id,
                                                                    )
                                                                }
                                                                className="cursor-pointer font-semibold text-rose-600 hover:text-rose-700"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 10: KELOLA KARTU KELUARGA */}
                {mainTab === 'kartu-keluarga' && (
                    <div className="animate-in space-y-6 duration-300 fade-in">
                        <div className="grid gap-6 lg:grid-cols-12">
                            {/* Form */}
                            <div className="lg:col-span-5">
                                <form
                                    onSubmit={handleSaveKK}
                                    className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                        {editingKK ? (
                                            <>
                                                <Edit3 className="size-4 animate-pulse text-emerald-600" />
                                                <span>Edit Kartu Keluarga</span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="size-4 text-emerald-600" />
                                                <span>
                                                    Tambah Kartu Keluarga
                                                </span>
                                            </>
                                        )}
                                    </h3>

                                    <div>
                                        <Label className="text-xs">
                                            Nomor Kartu Keluarga (No KK)
                                        </Label>
                                        <Input
                                            required
                                            maxLength={16}
                                            value={kkForm.data.no_kk}
                                            onChange={(e) =>
                                                kkForm.setData(
                                                    'no_kk',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="16 Digit No KK..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            NIK Kepala Keluarga
                                        </Label>
                                        <select
                                            value={
                                                kkForm.data.nik_kepala_keluarga
                                            }
                                            onChange={(e) =>
                                                kkForm.setData(
                                                    'nik_kepala_keluarga',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        >
                                            <option value="">
                                                -- Pilih Kepala Keluarga --
                                            </option>
                                            {pendudukList.map((p) => (
                                                <option
                                                    key={p.id}
                                                    value={p.nik}
                                                >
                                                    {p.nama} ({p.nik})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Alamat Keluarga
                                        </Label>
                                        <textarea
                                            required
                                            value={kkForm.data.alamat}
                                            onChange={(e) =>
                                                kkForm.setData(
                                                    'alamat',
                                                    e.target.value,
                                                )
                                            }
                                            rows={4}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            placeholder="Alamat lengkap..."
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        {editingKK && (
                                            <Button
                                                type="button"
                                                onClick={handleCancelEditKK}
                                                className="dark:hover:bg-slate-750 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                Batal
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            disabled={kkForm.processing}
                                            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                                        >
                                            <Save className="size-4" /> Simpan
                                            Kartu Keluarga
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Table */}
                            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Daftar Kartu Keluarga (
                                    {kartuKeluargaList.length})
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
                                                <th className="py-2">No KK</th>
                                                <th className="py-2">
                                                    NIK Kepala Keluarga
                                                </th>
                                                <th className="py-2">Alamat</th>
                                                <th className="py-2 text-right">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {kartuKeluargaList.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                                >
                                                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                                                        {item.no_kk}
                                                    </td>
                                                    <td className="py-2.5 font-mono text-slate-500">
                                                        {item.nik_kepala_keluarga ||
                                                            '-'}
                                                    </td>
                                                    <td className="max-w-[200px] truncate py-2.5 text-slate-500">
                                                        {item.alamat}
                                                    </td>
                                                    <td className="space-x-2 py-2.5 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEditKK(
                                                                    item,
                                                                )
                                                            }
                                                            className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteKK(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="cursor-pointer font-semibold text-rose-600 hover:text-rose-700"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 11: KELOLA DUSUN */}
                {mainTab === 'dusun' && (
                    <div className="animate-in space-y-6 duration-300 fade-in">
                        <div className="grid gap-6 lg:grid-cols-12">
                            {/* Form */}
                            <div className="lg:col-span-5">
                                <form
                                    onSubmit={handleSaveDusun}
                                    className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                        {editingDusun ? (
                                            <>
                                                <Edit3 className="size-4 animate-pulse text-emerald-600" />
                                                <span>
                                                    Edit Dusun:{' '}
                                                    <span className="text-emerald-600">
                                                        {dusunForm.data.nama}
                                                    </span>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="size-4 text-emerald-600" />
                                                <span>Tambah Dusun Baru</span>
                                            </>
                                        )}
                                    </h3>

                                    <div>
                                        <Label className="text-xs">
                                            Nama Dusun
                                        </Label>
                                        <Input
                                            required
                                            value={dusunForm.data.nama}
                                            onChange={(e) =>
                                                dusunForm.setData(
                                                    'nama',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nama dusun..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Kepala Dusun (Kadus)
                                        </Label>
                                        <select
                                            value={
                                                dusunForm.data.kepala_dusun_id
                                            }
                                            onChange={(e) =>
                                                dusunForm.setData(
                                                    'kepala_dusun_id',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        >
                                            <option value="">
                                                -- Pilih Kepala Dusun --
                                            </option>
                                            {pendudukList.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.nama} ({p.nik})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        {editingDusun && (
                                            <Button
                                                type="button"
                                                onClick={handleCancelEditDusun}
                                                className="dark:hover:bg-slate-750 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                Batal
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            disabled={dusunForm.processing}
                                            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                                        >
                                            <Save className="size-4" /> Simpan
                                            Dusun
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Table */}
                            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Daftar Dusun ({dusunList.length})
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
                                                <th className="py-2">
                                                    Nama Dusun
                                                </th>
                                                <th className="py-2">
                                                    Kepala Dusun
                                                </th>
                                                <th className="py-2 text-right">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dusunList.map((item) => {
                                                const lead = pendudukList.find(
                                                    (p) =>
                                                        p.id ===
                                                        item.kepala_dusun_id,
                                                );
                                                return (
                                                    <tr
                                                        key={item.id}
                                                        className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                                    >
                                                        <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                                                            {item.nama}
                                                        </td>
                                                        <td className="py-2.5 text-slate-500">
                                                            {lead
                                                                ? lead.nama
                                                                : '-'}
                                                        </td>
                                                        <td className="space-x-2 py-2.5 text-right">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleEditDusun(
                                                                        item,
                                                                    )
                                                                }
                                                                className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDeleteDusun(
                                                                        item.id,
                                                                    )
                                                                }
                                                                className="cursor-pointer font-semibold text-rose-600 hover:text-rose-700"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 12: KELOLA JENIS SURAT */}
                {mainTab === 'jenis-surat' && (
                    <div className="animate-in space-y-6 duration-300 fade-in">
                        <div className="grid gap-6 lg:grid-cols-12">
                            {/* Form */}
                            <div className="lg:col-span-5">
                                <form
                                    onSubmit={handleSaveJenisSurat}
                                    className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                        {editingJenisSurat ? (
                                            <>
                                                <Edit3 className="size-4 animate-pulse text-emerald-600" />
                                                <span>Edit Jenis Surat</span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="size-4 text-emerald-600" />
                                                <span>Tambah Jenis Surat</span>
                                            </>
                                        )}
                                    </h3>

                                    <div>
                                        <Label className="text-xs">
                                            Kode Surat (e.g., SKU, SKTM, SKP)
                                        </Label>
                                        <Input
                                            required
                                            value={jenisSuratForm.data.kode}
                                            onChange={(e) =>
                                                jenisSuratForm.setData(
                                                    'kode',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="SKU"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Nama Surat
                                        </Label>
                                        <Input
                                            required
                                            value={jenisSuratForm.data.nama}
                                            onChange={(e) =>
                                                jenisSuratForm.setData(
                                                    'nama',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Surat Keterangan Usaha..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Deskripsi / Persyaratan Pengurusan
                                        </Label>
                                        <textarea
                                            required
                                            value={
                                                jenisSuratForm.data.deskripsi
                                            }
                                            onChange={(e) =>
                                                jenisSuratForm.setData(
                                                    'deskripsi',
                                                    e.target.value,
                                                )
                                            }
                                            rows={4}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            placeholder="Persyaratan berkas pengurusan surat..."
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <label className="flex cursor-pointer items-center gap-2 text-xs select-none">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    jenisSuratForm.data.is_aktif
                                                }
                                                onChange={(e) =>
                                                    jenisSuratForm.setData(
                                                        'is_aktif',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span>
                                                Aktif (Tersedia bagi warga)
                                            </span>
                                        </label>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        {editingJenisSurat && (
                                            <Button
                                                type="button"
                                                onClick={
                                                    handleCancelEditJenisSurat
                                                }
                                                className="dark:hover:bg-slate-750 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                Batal
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            disabled={jenisSuratForm.processing}
                                            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                                        >
                                            <Save className="size-4" /> Simpan
                                            Jenis Surat
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Table */}
                            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Daftar Jenis Surat ({jenisSuratList.length})
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
                                                <th className="py-2">Kode</th>
                                                <th className="py-2">
                                                    Nama Surat
                                                </th>
                                                <th className="py-2">
                                                    Deskripsi
                                                </th>
                                                <th className="py-2">Status</th>
                                                <th className="py-2 text-right">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {jenisSuratList.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                                >
                                                    <td className="py-2.5 font-mono font-bold text-slate-900 dark:text-white">
                                                        {item.kode}
                                                    </td>
                                                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                                                        {item.nama}
                                                    </td>
                                                    <td className="max-w-[200px] truncate py-2.5 text-slate-500">
                                                        {item.deskripsi}
                                                    </td>
                                                    <td className="py-2.5">
                                                        <Badge
                                                            variant={
                                                                item.is_aktif
                                                                    ? 'default'
                                                                    : 'secondary'
                                                            }
                                                            className={
                                                                item.is_aktif
                                                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                                                    : ''
                                                            }
                                                        >
                                                            {item.is_aktif
                                                                ? 'Aktif'
                                                                : 'Nonaktif'}
                                                        </Badge>
                                                    </td>
                                                    <td className="space-x-2 py-2.5 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEditJenisSurat(
                                                                    item,
                                                                )
                                                            }
                                                            className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteJenisSurat(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="cursor-pointer font-semibold text-rose-600 hover:text-rose-700"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 13: VERIFIKASI PERMOHONAN SURAT */}
                {mainTab === 'permohonan-surat' && (
                    <div className="animate-in space-y-6 duration-300 fade-in">
                        <div className="grid gap-6 lg:grid-cols-12">
                            {/* Review Form */}
                            <div className="lg:col-span-5">
                                {selectedPermohonan ? (
                                    <form
                                        onSubmit={handleSavePermohonanStatus}
                                        className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                    >
                                        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                            <Edit3 className="size-4 text-emerald-600" />
                                            <span>
                                                Verifikasi Permohonan Surat
                                            </span>
                                        </h3>

                                        <div className="space-y-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-950">
                                            <div>
                                                <span className="font-bold">
                                                    Pemohon:
                                                </span>{' '}
                                                {
                                                    selectedPermohonan.nama_pemohon
                                                }
                                            </div>
                                            <div>
                                                <span className="font-bold">
                                                    NIK:
                                                </span>{' '}
                                                {selectedPermohonan.nik}
                                            </div>
                                            <div>
                                                <span className="font-bold">
                                                    Jenis Surat:
                                                </span>{' '}
                                                {selectedPermohonan.nama_surat}
                                            </div>
                                            <div>
                                                <span className="font-bold">
                                                    Tanggal:
                                                </span>{' '}
                                                {formatDate(
                                                    selectedPermohonan.created_at,
                                                )}
                                            </div>

                                            {/* Form fields filled by resident */}
                                            {selectedPermohonan.data_formulir && (
                                                <div className="mt-2 space-y-1 border-t border-slate-200 pt-2 dark:border-slate-800">
                                                    <span className="mb-1 block font-bold">
                                                        Isian Formulir Warga:
                                                    </span>
                                                    {Object.entries(
                                                        selectedPermohonan.data_formulir,
                                                    ).map(([key, val]) => (
                                                        <div
                                                            key={key}
                                                            className="grid grid-cols-3 gap-2"
                                                        >
                                                            <span className="text-slate-400 capitalize">
                                                                {key.replace(
                                                                    /_/g,
                                                                    ' ',
                                                                )}
                                                                :
                                                            </span>
                                                            <span className="col-span-2 font-medium text-slate-800 dark:text-slate-200">
                                                                {String(val)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <Label className="text-xs">
                                                Status Persetujuan
                                            </Label>
                                            <select
                                                required
                                                value={
                                                    permohonanStatusForm.data
                                                        .status
                                                }
                                                onChange={(e) =>
                                                    permohonanStatusForm.setData(
                                                        'status',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            >
                                                <option value="menunggu_persetujuan">
                                                    Menunggu Persetujuan
                                                </option>
                                                <option value="disetujui">
                                                    Setujui & Terbitkan Surat
                                                </option>
                                                <option value="ditolak">
                                                    Tolak Permohonan
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <Label className="text-xs">
                                                Catatan Admin (Terlihat oleh
                                                warga)
                                            </Label>
                                            <textarea
                                                value={
                                                    permohonanStatusForm.data
                                                        .catatan_admin
                                                }
                                                onChange={(e) =>
                                                    permohonanStatusForm.setData(
                                                        'catatan_admin',
                                                        e.target.value,
                                                    )
                                                }
                                                rows={3}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                placeholder="Catatan tambahan / alasan penolakan..."
                                            />
                                        </div>

                                        <div className="flex justify-end gap-2 pt-2">
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedPermohonan(null)
                                                }
                                                className="dark:hover:bg-slate-750 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                Batal
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={
                                                    permohonanStatusForm.processing
                                                }
                                                className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                                            >
                                                <Save className="size-4" />{' '}
                                                Simpan Verifikasi
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="border-slate-350 dark:border-slate-750 text-slate-450 rounded-xl border border-dashed bg-white p-8 text-center text-xs dark:bg-slate-900">
                                        Pilih salah satu permohonan surat dari
                                        daftar di samping kanan untuk meninjau
                                        berkas isian warga dan memperbarui
                                        status persetujuan.
                                    </div>
                                )}
                            </div>

                            {/* List */}
                            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Daftar Pengajuan Surat Warga (
                                    {suratList.length})
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
                                                <th className="py-2">
                                                    Pemohon
                                                </th>
                                                <th className="py-2">
                                                    Jenis Surat
                                                </th>
                                                <th className="py-2">
                                                    Tanggal
                                                </th>
                                                <th className="py-2">Status</th>
                                                <th className="py-2 text-right">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {suratList.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                                >
                                                    <td className="py-2.5">
                                                        <div className="font-semibold text-slate-900 dark:text-white">
                                                            {item.nama_pemohon}
                                                        </div>
                                                        <div className="font-mono text-[10px] text-slate-400">
                                                            {item.nik}
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 font-medium text-slate-700 dark:text-slate-300">
                                                        {item.nama_surat}
                                                    </td>
                                                    <td className="py-2.5 text-slate-500">
                                                        {formatDate(
                                                            item.created_at,
                                                        )}
                                                    </td>
                                                    <td className="py-2.5">
                                                        <Badge
                                                            variant={
                                                                item.status ===
                                                                'disetujui'
                                                                    ? 'default'
                                                                    : item.status ===
                                                                        'ditolak'
                                                                      ? 'destructive'
                                                                      : 'secondary'
                                                            }
                                                            className={
                                                                item.status ===
                                                                'disetujui'
                                                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                                                    : ''
                                                            }
                                                        >
                                                            {item.status ===
                                                            'menunggu_persetujuan'
                                                                ? 'Menunggu'
                                                                : item.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-2.5 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedPermohonan(
                                                                    item,
                                                                );
                                                                permohonanStatusForm.setData(
                                                                    {
                                                                        status: item.status,
                                                                        catatan_admin:
                                                                            item.catatan_admin ||
                                                                            '',
                                                                    },
                                                                );
                                                            }}
                                                            className="text-emerald-650 cursor-pointer font-semibold hover:text-emerald-700"
                                                        >
                                                            Proses
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 14: KELOLA PENGADUAN WARGA */}
                {mainTab === 'pengaduan' && (
                    <div className="animate-in space-y-6 duration-300 fade-in">
                        <div className="grid gap-6 lg:grid-cols-12">
                            {/* Form Tanggapan */}
                            <div className="lg:col-span-5">
                                {selectedPengaduan ? (
                                    <form
                                        onSubmit={handleSavePengaduanTanggapan}
                                        className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                    >
                                        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                            <MessageSquareWarning className="size-4 animate-pulse text-emerald-600" />
                                            <span>Beri Tanggapan Aduan</span>
                                        </h3>

                                        <div className="space-y-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-950">
                                            <div>
                                                <span className="font-bold">
                                                    Pelapor:
                                                </span>{' '}
                                                {selectedPengaduan.pelapor}
                                            </div>
                                            <div>
                                                <span className="font-bold">
                                                    Judul Laporan:
                                                </span>{' '}
                                                {selectedPengaduan.judul}
                                            </div>
                                            <div>
                                                <span className="mb-1 block font-bold">
                                                    Isi Laporan:
                                                </span>
                                            </div>
                                            <p className="dark:text-slate-350 max-h-40 overflow-y-auto rounded border border-slate-100 bg-white p-2.5 text-slate-700 dark:border-slate-950 dark:bg-slate-900">
                                                {selectedPengaduan.isi}
                                            </p>

                                            {selectedPengaduan.foto_path && (
                                                <div className="pt-2">
                                                    <span className="mb-1 block font-bold">
                                                        Lampiran Foto:
                                                    </span>
                                                    <img
                                                        src={
                                                            selectedPengaduan.foto_path
                                                        }
                                                        alt="Lampiran aduan"
                                                        className="border-slate-250 max-h-32 rounded border object-cover dark:border-slate-800"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <Label className="text-xs">
                                                Status Tindak Lanjut
                                            </Label>
                                            <select
                                                required
                                                value={
                                                    pengaduanTanggapanForm.data
                                                        .status
                                                }
                                                onChange={(e) =>
                                                    pengaduanTanggapanForm.setData(
                                                        'status',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            >
                                                <option value="terkirim">
                                                    Terkirim (Belum Diproses)
                                                </option>
                                                <option value="diproses">
                                                    Sedang Diproses
                                                </option>
                                                <option value="selesai">
                                                    Selesai Ditindaklanjuti
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <Label className="text-xs">
                                                Tanggapan Resmi Pemerintah Desa
                                            </Label>
                                            <textarea
                                                required
                                                value={
                                                    pengaduanTanggapanForm.data
                                                        .tanggapan_admin
                                                }
                                                onChange={(e) =>
                                                    pengaduanTanggapanForm.setData(
                                                        'tanggapan_admin',
                                                        e.target.value,
                                                    )
                                                }
                                                rows={4}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                placeholder="Berikan tanggapan / solusi tindak lanjut aduan..."
                                            />
                                        </div>

                                        <div className="flex justify-end gap-2 pt-2">
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedPengaduan(null)
                                                }
                                                className="dark:hover:bg-slate-750 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                Batal
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={
                                                    pengaduanTanggapanForm.processing
                                                }
                                                className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                                            >
                                                <Save className="size-4" />{' '}
                                                Simpan Tanggapan
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="border-slate-350 dark:border-slate-750 text-slate-450 rounded-xl border border-dashed bg-white p-8 text-center text-xs dark:bg-slate-900">
                                        Pilih salah satu laporan aduan warga
                                        dari daftar di samping kanan untuk
                                        memberikan tanggapan resmi atau merubah
                                        status penanganannya.
                                    </div>
                                )}
                            </div>

                            {/* List */}
                            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Daftar Laporan Pengaduan Warga (
                                    {pengaduanList.length})
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
                                                <th className="py-2">
                                                    Pelapor
                                                </th>
                                                <th className="py-2">
                                                    Subjek / Judul
                                                </th>
                                                <th className="py-2">
                                                    Tanggal
                                                </th>
                                                <th className="py-2">Status</th>
                                                <th className="py-2 text-right">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pengaduanList.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                                >
                                                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                                                        {item.pelapor}
                                                    </td>
                                                    <td className="text-slate-750 max-w-[200px] truncate py-2.5 font-medium dark:text-slate-300">
                                                        {item.judul}
                                                    </td>
                                                    <td className="py-2.5 text-slate-500">
                                                        {formatDate(
                                                            item.created_at,
                                                        )}
                                                    </td>
                                                    <td className="py-2.5">
                                                        <Badge
                                                            variant={
                                                                item.status ===
                                                                'selesai'
                                                                    ? 'default'
                                                                    : item.status ===
                                                                        'diproses'
                                                                      ? 'secondary'
                                                                      : 'destructive'
                                                            }
                                                            className={
                                                                item.status ===
                                                                'selesai'
                                                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                                                    : ''
                                                            }
                                                        >
                                                            {item.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-2.5 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedPengaduan(
                                                                    item,
                                                                );
                                                                pengaduanTanggapanForm.setData(
                                                                    {
                                                                        status: item.status,
                                                                        tanggapan_admin:
                                                                            item.tanggapan_admin ||
                                                                            '',
                                                                    },
                                                                );
                                                            }}
                                                            className="cursor-pointer font-semibold text-emerald-600 hover:text-emerald-700"
                                                        >
                                                            Tanggapi
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 15: KELOLA REGULASI DESA */}
                {mainTab === 'regulasi' && (
                    <div className="animate-in space-y-6 duration-300 fade-in">
                        <div className="grid gap-6 lg:grid-cols-12">
                            {/* Form */}
                            <div className="lg:col-span-5">
                                <form
                                    onSubmit={handleSaveRegulasi}
                                    className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                        {editingRegulasi ? (
                                            <>
                                                <Edit3 className="size-4 animate-pulse text-emerald-600" />
                                                <span>Edit Regulasi</span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="size-4 text-emerald-600" />
                                                <span>
                                                    Tambah Regulasi Baru
                                                </span>
                                            </>
                                        )}
                                    </h3>

                                    <div>
                                        <Label className="text-xs">
                                            Judul Regulasi
                                        </Label>
                                        <Input
                                            required
                                            value={regulasiForm.data.judul}
                                            onChange={(e) =>
                                                regulasiForm.setData(
                                                    'judul',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Judul regulasi desa..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">
                                                Jenis Regulasi
                                            </Label>
                                            <select
                                                required
                                                value={regulasiForm.data.jenis}
                                                onChange={(e) =>
                                                    regulasiForm.setData(
                                                        'jenis',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            >
                                                <option value="perdes">
                                                    Peraturan Desa (Perdes)
                                                </option>
                                                <option value="perkades">
                                                    Peraturan Kades (Perkades)
                                                </option>
                                                <option value="sk_kades">
                                                    Keputusan Kades (SK Kades)
                                                </option>
                                                <option value="instruksi">
                                                    Instruksi Kades
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <Label className="text-xs">
                                                Tahun Terbit
                                            </Label>
                                            <Input
                                                required
                                                type="number"
                                                value={regulasiForm.data.tahun}
                                                onChange={(e) =>
                                                    regulasiForm.setData(
                                                        'tahun',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="2026"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">
                                                Nomor Regulasi
                                            </Label>
                                            <Input
                                                required
                                                value={regulasiForm.data.nomor}
                                                onChange={(e) =>
                                                    regulasiForm.setData(
                                                        'nomor',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Nomor/Tahun..."
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">
                                                URL File Dokumen (PDF/Doc)
                                            </Label>
                                            <Input
                                                value={
                                                    regulasiForm.data.file_path
                                                }
                                                onChange={(e) =>
                                                    regulasiForm.setData(
                                                        'file_path',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Ringkasan / Deskripsi Regulasi
                                        </Label>
                                        <textarea
                                            value={regulasiForm.data.deskripsi}
                                            onChange={(e) =>
                                                regulasiForm.setData(
                                                    'deskripsi',
                                                    e.target.value,
                                                )
                                            }
                                            rows={4}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            placeholder="Ringkasan poin regulasi..."
                                        />
                                    </div>

                                    <div>
                                        <label className="flex cursor-pointer items-center gap-2 text-xs select-none">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    regulasiForm.data.status
                                                }
                                                onChange={(e) =>
                                                    regulasiForm.setData(
                                                        'status',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span>Aktif / Berlaku</span>
                                        </label>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        {editingRegulasi && (
                                            <Button
                                                type="button"
                                                onClick={
                                                    handleCancelEditRegulasi
                                                }
                                                className="dark:hover:bg-slate-750 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                Batal
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            disabled={regulasiForm.processing}
                                            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                                        >
                                            <Save className="size-4" /> Simpan
                                            Regulasi
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Table */}
                            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Daftar Regulasi Desa ({regulasiList.length})
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
                                                <th className="py-2">
                                                    Nomor / Tahun
                                                </th>
                                                <th className="py-2">
                                                    Judul Regulasi
                                                </th>
                                                <th className="py-2">Jenis</th>
                                                <th className="py-2">Status</th>
                                                <th className="py-2 text-right">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {regulasiList.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                                >
                                                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                                                        {item.nomor} /{' '}
                                                        {item.tahun}
                                                    </td>
                                                    <td className="py-2.5 font-medium text-slate-700 dark:text-slate-300">
                                                        {item.judul}
                                                    </td>
                                                    <td className="py-2.5 capitalize">
                                                        {item.jenis.replace(
                                                            '_',
                                                            ' ',
                                                        )}
                                                    </td>
                                                    <td className="py-2.5">
                                                        <Badge
                                                            variant={
                                                                item.status
                                                                    ? 'default'
                                                                    : 'secondary'
                                                            }
                                                            className={
                                                                item.status
                                                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                                                    : ''
                                                            }
                                                        >
                                                            {item.status
                                                                ? 'Berlaku'
                                                                : 'Tidak Berlaku'}
                                                        </Badge>
                                                    </td>
                                                    <td className="space-x-2 py-2.5 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEditRegulasi(
                                                                    item,
                                                                )
                                                            }
                                                            className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteRegulasi(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="cursor-pointer font-semibold text-rose-600 hover:text-rose-700"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 16: KELOLA AGENDA DESA */}
                {mainTab === 'agenda' && (
                    <div className="animate-in space-y-6 duration-300 fade-in">
                        <div className="grid gap-6 lg:grid-cols-12">
                            {/* Form */}
                            <div className="lg:col-span-5">
                                <form
                                    onSubmit={handleSaveAgenda}
                                    className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                        {editingAgenda ? (
                                            <>
                                                <Edit3 className="size-4 animate-pulse text-emerald-600" />
                                                <span>Edit Agenda</span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="size-4 text-emerald-600" />
                                                <span>
                                                    Tambah Agenda Kegiatan
                                                </span>
                                            </>
                                        )}
                                    </h3>

                                    <div>
                                        <Label className="text-xs">
                                            Judul Kegiatan
                                        </Label>
                                        <Input
                                            required
                                            value={agendaForm.data.judul}
                                            onChange={(e) =>
                                                agendaForm.setData(
                                                    'judul',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nama kegiatan..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Lokasi Kegiatan
                                        </Label>
                                        <Input
                                            required
                                            value={agendaForm.data.lokasi}
                                            onChange={(e) =>
                                                agendaForm.setData(
                                                    'lokasi',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Lokasi detail..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs">
                                                Waktu Mulai
                                            </Label>
                                            <Input
                                                required
                                                type="datetime-local"
                                                value={
                                                    agendaForm.data.waktu_mulai
                                                }
                                                onChange={(e) =>
                                                    agendaForm.setData(
                                                        'waktu_mulai',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">
                                                Waktu Selesai (Opsional)
                                            </Label>
                                            <Input
                                                type="datetime-local"
                                                value={
                                                    agendaForm.data
                                                        .waktu_selesai
                                                }
                                                onChange={(e) =>
                                                    agendaForm.setData(
                                                        'waktu_selesai',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Koordinator / PJ
                                        </Label>
                                        <Input
                                            value={agendaForm.data.koordinator}
                                            onChange={(e) =>
                                                agendaForm.setData(
                                                    'koordinator',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nama koordinator..."
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-xs">
                                            Deskripsi Kegiatan
                                        </Label>
                                        <textarea
                                            value={agendaForm.data.deskripsi}
                                            onChange={(e) =>
                                                agendaForm.setData(
                                                    'deskripsi',
                                                    e.target.value,
                                                )
                                            }
                                            rows={4}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            placeholder="Rincian acara..."
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        {editingAgenda && (
                                            <Button
                                                type="button"
                                                onClick={handleCancelEditAgenda}
                                                className="dark:hover:bg-slate-750 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                Batal
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            disabled={agendaForm.processing}
                                            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                                        >
                                            <Save className="size-4" /> Simpan
                                            Agenda
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Table */}
                            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Daftar Agenda Kegiatan (
                                    {agendaMendatang.length})
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
                                                <th className="py-2">
                                                    Nama Kegiatan
                                                </th>
                                                <th className="py-2">Waktu</th>
                                                <th className="py-2">Lokasi</th>
                                                <th className="py-2">PJ</th>
                                                <th className="py-2 text-right">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {agendaMendatang.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                                >
                                                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                                                        {item.judul}
                                                    </td>
                                                    <td className="py-2.5 text-slate-500">
                                                        <div>
                                                            Mulai:{' '}
                                                            {formatDate(
                                                                item.waktu_mulai,
                                                            )}
                                                        </div>
                                                        {item.waktu_selesai && (
                                                            <div className="text-[10px] text-slate-400">
                                                                Selesai:{' '}
                                                                {formatDate(
                                                                    item.waktu_selesai,
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="py-2.5 text-slate-500">
                                                        {item.lokasi}
                                                    </td>
                                                    <td className="py-2.5 text-slate-500">
                                                        {item.koordinator ||
                                                            '-'}
                                                    </td>
                                                    <td className="space-x-2 py-2.5 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEditAgenda(
                                                                    item,
                                                                )
                                                            }
                                                            className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteAgenda(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="cursor-pointer font-semibold text-rose-600 hover:text-rose-700"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
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
