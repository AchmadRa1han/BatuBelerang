import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
    };
}

export default function RtRw({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd' },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk' },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna' },
        { title: 'RT dan RW', href: '/lembaga/rt-rw', active: true },
        { title: 'Posyandu', href: '/lembaga/posyandu' },
        { title: 'BUMDes', href: '/lembaga/bumdes' },
    ];

    const title = konten?.judul || 'Lembaga RT & RW Desa Batu Belerang';
    const subtitle = konten?.subjudul || 'Garda terdepan pelayanan kemasyarakatan dan kerukunan warga di tingkat rukun tetangga dan rukun warga.';
    const isi = konten?.isi || 'Rukun Tetangga (RT) dan Rukun Warga (RW) membantu Pemerintah Desa dalam penyelenggaraan urusan pelayanan pemerintahan, ketentraman warga, dan pendataan kependudukan di tingkat lingkungan terdekat.';

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'RT & RW' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Tugas Pokok RT & RW
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {isi}
                    </p>
                </div>
            </div>
        </PublicPageLayout>
    );
}
