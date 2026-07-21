import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface AparaturItem {
    id?: number;
    nama: string;
    jabatan: string;
    foto_path?: string | null;
    tugas?: string;
}

interface ProfilDesaData {
    nama_kades?: string;
    jabatan_kades?: string;
    foto_kades?: string;
}

interface DataPerangkatProps {
    profilDesa?: ProfilDesaData;
    aparaturDesa?: AparaturItem[];
}

export default function DataPerangkat({ profilDesa, aparaturDesa }: DataPerangkatProps) {
    const sideMenuItems = [
        { title: 'Visi dan Misi', href: '/pemerintahan/visi-misi' },
        { title: 'Data Perangkat', href: '/pemerintahan/data-perangkat', active: true },
        { title: 'Struktur Organisasi', href: '/pemerintahan/struktur-organisasi' },
        { title: 'RPJMDes', href: '/pemerintahan/rpjmdes' },
        { title: 'Tata Kelola', href: '/pemerintahan/tata-kelola' },
    ];

    const getTugasByJabatan = (jabatan: string) => {
        const lower = jabatan.toLowerCase();
        if (lower.includes('sekretaris')) return 'Mengoordinasikan sekretariat dan administrasi keuangan & umum.';
        if (lower.includes('pemerintahan')) return 'Menyusun serta melaksanakan kebijakan urusan tata pemerintahan.';
        if (lower.includes('pelayanan')) return 'Mengelola pelayanan administrasi kependudukan dan surat publik.';
        if (lower.includes('kesejahteraan')) return 'Mengelola program pembinaan kesejahteraan sosial dan pemberdayaan.';
        if (lower.includes('tata usaha') || lower.includes('umum')) return 'Melaksanakan urusan persuratan, inventaris, dan rumah tangga kantor.';
        if (lower.includes('keuangan')) return 'Mengelola penatausahaan keuangan dan pembukuan APBDesa.';
        if (lower.includes('perencanaan')) return 'Menyusun dokumen RKPDes, RPJMDes, dan laporan realisasi.';
        if (lower.includes('dusun')) return `Penyelenggaraan urusan pemerintahan di wilayah ${jabatan}.`;
        return 'Pelayanan dan penyelenggaraan tugas pemerintahan desa.';
    };

    const kadesNama = profilDesa?.nama_kades || 'Ahmad P';
    const kadesJabatan = profilDesa?.jabatan_kades || 'Kepala Desa Batu Belerang';
    const kadesFoto = profilDesa?.foto_kades || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80';

    const defaultAparaturList: AparaturItem[] = [
        { nama: 'Sulaeman', jabatan: 'Sekretaris Desa', foto_path: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },
        { nama: 'Sadar Syam, S.Pd', jabatan: 'Kepala Seksi Pemerintahan', foto_path: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },
        { nama: 'Hartati', jabatan: 'Kepala Seksi Pelayanan', foto_path: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80' },
        { nama: 'Lukman, S.Pd', jabatan: 'Kepala Seksi Kesejahteraan', foto_path: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
        { nama: 'Kartini, S.Pd', jabatan: 'Kepala Urusan Tata Usaha dan Umum', foto_path: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' },
        { nama: 'Fitriani', jabatan: 'Kepala Urusan Keuangan', foto_path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
        { nama: 'Nirmawati, SP', jabatan: 'Kepala Urusan Perencanaan', foto_path: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80' },
        { nama: 'Muh. Darwis', jabatan: 'Kepala Dusun Jeppara', foto_path: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
        { nama: 'Aditya Saputra', jabatan: 'Kepala Dusun Bontoe', foto_path: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80' },
        { nama: 'Muh. Tahir', jabatan: 'Kepala Dusun Kalimbu', foto_path: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' },
        { nama: 'Ahmad', jabatan: 'Kepala Dusun Mattirotasi', foto_path: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80' },
    ];

    const listData = (aparaturDesa && aparaturDesa.length > 0) ? aparaturDesa : defaultAparaturList;

    return (
        <PublicPageLayout
            title="Data Perangkat Pemerintah Desa"
            subtitle="Daftar nama, foto resmi, jabatan, serta rincian tugas jajaran aparatur Desa Batu Belerang."
            category="Pemerintahan"
            breadcrumbs={[{ label: 'Data Perangkat' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-8 text-sm">
                {/* Header Info */}
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Daftar Aparatur Pemerintah Desa
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        Jajaran pengabdi masyarakat Desa Batu Belerang yang siap melayani kebutuhan warga secara profesional, transparan, dan akuntabel.
                    </p>
                </div>

                {/* Featured Kades Card */}
                <div className="overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-900/10 via-emerald-800/5 to-transparent p-5 sm:p-6 dark:border-emerald-500/30 dark:bg-emerald-950/20">
                    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                        <div className="relative shrink-0 overflow-hidden rounded-2xl border-2 border-emerald-500/50 shadow-md shadow-emerald-950/20">
                            <img
                                src={kadesFoto}
                                alt={kadesNama}
                                className="h-28 w-24 object-cover sm:h-32 sm:w-28"
                            />
                            <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded bg-emerald-600 px-2 py-0.5 text-[9px] font-extrabold tracking-wider uppercase text-white shadow-sm">
                                KADES
                            </span>
                        </div>
                        <div className="space-y-1.5 text-center sm:text-left">
                            <span className="inline-block rounded-md bg-emerald-600/20 px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest uppercase text-emerald-700 dark:text-emerald-400">
                                PEMIMPIN DESA
                            </span>
                            <h3 className="text-lg font-extrabold text-slate-900 md:text-xl dark:text-white">
                                {kadesNama}
                            </h3>
                            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                {kadesJabatan}
                            </p>
                            <p className="pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                                Memimpin penyelenggaraan pemerintahan desa, pelaksana pembangunan, pembinaan kemasyarakatan, serta pemberdayaan masyarakat Desa Batu Belerang.
                            </p>
                        </div>
                    </div>
                </div>

                {/* List Perangkat Desa with Photos */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Jajaran Perangkat & Kepala Dusun
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {listData.map((item, idx) => (
                            <div
                                key={item.id || idx}
                                className="flex items-center gap-4 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/30 dark:hover:bg-slate-900/60"
                            >
                                <img
                                    src={item.foto_path || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80'}
                                    alt={item.nama}
                                    className="h-16 w-14 shrink-0 rounded-xl border border-slate-200 object-cover shadow-sm dark:border-slate-700"
                                />
                                <div className="space-y-0.5 min-w-0 flex-1">
                                    <h4 className="font-bold text-slate-900 dark:text-white truncate text-sm">
                                        {item.nama}
                                    </h4>
                                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                                        {item.jabatan}
                                    </p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                                        {item.tugas || getTugasByJabatan(item.jabatan)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
