import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
    };
}

export default function Pkk({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd' },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk', active: true },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna' },
        { title: 'RT dan RW', href: '/lembaga/rt-rw' },
        { title: 'Posyandu', href: '/lembaga/posyandu' },
        { title: 'BUMDes', href: '/lembaga/bumdes' },
    ];

    const title = konten?.judul || 'Tim Penggerak PKK Desa';
    const subtitle = konten?.subjudul || 'Lembaga kemasyarakatan mitra pemerintah desa dalam pemberdayaan kesejahteraan keluarga dan kesehatan.';
    const isi = konten?.isi || 'Tim Penggerak Pemberdayaan dan Kesejahteraan Keluarga (TP-PKK) Desa Batu Belerang aktif menggerakkan 10 Program Pokok PKK demi terwujudnya keluarga yang beriman, sejahtera, dan bertaqwa.';

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'PKK' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        10 Program Pokok PKK
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {isi}
                    </p>
                </div>
            </div>
        </PublicPageLayout>
    );
}
