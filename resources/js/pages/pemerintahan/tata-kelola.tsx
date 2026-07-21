import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
    };
}

export default function TataKelola({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Visi dan Misi', href: '/pemerintahan/visi-misi' },
        { title: 'Data Perangkat', href: '/pemerintahan/data-perangkat' },
        { title: 'Struktur Organisasi', href: '/pemerintahan/struktur-organisasi' },
        { title: 'RPJMDes', href: '/pemerintahan/rpjmdes' },
        { title: 'Tata Kelola', href: '/pemerintahan/tata-kelola', active: true },
    ];

    const title = konten?.judul || 'Tata Kelola Pemerintahan Desa';
    const subtitle = konten?.subjudul || 'Prinsip akuntabilitas, keterbukaan informasi, serta standar operasional pelayanan publik Desa Batu Belerang.';
    const isi = konten?.isi || 'Pemerintah Desa Batu Belerang menerapkan 4 pilar utama tata kelola pemerintahan yang baik: Transparansi, Akuntabilitas, Partisipatif, dan Ketertiban Hukum.';

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Pemerintahan"
            breadcrumbs={[{ label: 'Tata Kelola' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Prinsip Utama Tata Kelola (Good Village Governance)
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {isi}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30 space-y-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">1. Transparansi</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Keterbukaan informasi keuangan APBDesa, regulasi desa, serta kegiatan pembangunan publik.</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30 space-y-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">2. Akuntabilitas</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Setiap alokasi anggaran dan kebijakan dapat dipertanggungjawabkan secara hukum dan sosial.</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30 space-y-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">3. Partisipatif</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Mendorong keterlibatan aktif warga dalam Musyawarah Dusun (Musdus) dan Musrenbangdes.</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30 space-y-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">4. Ketertiban Hukum</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Penegakan regulasi dan Peraturan Desa (Perdes) secara konsisten dan adil.</p>
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
