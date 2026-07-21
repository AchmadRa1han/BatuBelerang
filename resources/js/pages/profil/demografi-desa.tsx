import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
    };
}

export default function DemografiDesa({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Tentang Kami', href: '/profil/tentang-kami' },
        { title: 'Visi & Misi', href: '/profil/visi-misi' },
        { title: 'Sejarah Desa', href: '/profil/sejarah-desa' },
        { title: 'Geografis Desa', href: '/profil/geografis-desa' },
        { title: 'Demografi Desa', href: '/profil/demografi-desa', active: true },
    ];

    const title = konten?.judul || 'Demografi & Data Penduduk';
    const subtitle = konten?.subjudul || 'Ringkasan sebaran statistik kependudukan, kelompok usia, dan profesi warga Desa Batu Belerang.';
    const isi = konten?.isi || 'Data kependudukan terdaftar secara resmi pada Sistem Informasi Desa Batu Belerang.';

    const statsSummary = [
        { label: 'Jumlah Penduduk', value: '1,248 Jiwa' },
        { label: 'Jumlah Kepala Keluarga', value: '385 KK' },
        { label: 'Laki-laki', value: '612 Jiwa' },
        { label: 'Perempuan', value: '636 Jiwa' },
    ];

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Profil Desa"
            breadcrumbs={[{ label: 'Demografi Desa' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Ringkasan Demografi
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {isi}
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {statsSummary.map((item, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-center dark:border-slate-800 dark:bg-slate-900/30">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{item.label}</span>
                            <p className="mt-1 text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PublicPageLayout>
    );
}
