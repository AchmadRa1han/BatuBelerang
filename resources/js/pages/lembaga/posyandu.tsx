import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
    };
}

export default function Posyandu({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd' },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk' },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna' },
        { title: 'RT dan RW', href: '/lembaga/rt-rw' },
        { title: 'Posyandu', href: '/lembaga/posyandu', active: true },
        { title: 'BUMDes', href: '/lembaga/bumdes' },
    ];

    const title = konten?.judul || 'Posyandu Terpadu Desa';
    const subtitle = konten?.subjudul || 'Pos Pelayanan Terpadu untuk kesehatan ibu, balita, lansia, dan penanganan stunting Desa Batu Belerang.';
    const isi = konten?.isi || 'Posyandu di Desa Batu Belerang diselenggarakan setiap bulan di masing-masing dusun bekerja sama dengan Bidan Desa dan Puskesmas Sinjai Borong.';

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'Posyandu' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Layanan Posyandu Rutin
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {isi}
                    </p>
                </div>
            </div>
        </PublicPageLayout>
    );
}
