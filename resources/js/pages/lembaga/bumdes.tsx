import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
    };
}

export default function Bumdes({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd' },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk' },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna' },
        { title: 'RT dan RW', href: '/lembaga/rt-rw' },
        { title: 'Posyandu', href: '/lembaga/posyandu' },
        { title: 'BUMDes', href: '/lembaga/bumdes', active: true },
    ];

    const title = konten?.judul || 'BUMDes Batu Belerang';
    const subtitle = konten?.subjudul || 'Badan Usaha Milik Desa pendorong kemandirian ekonomi, pengelolaan wisata, dan pemasaran produk lokal.';
    const isi = konten?.isi || 'BUMDes Batu Belerang mengelola sektor-sektor strategis ekonomi desa guna menambah Pendapatan Asli Desa (PADes) serta membuka lapangan kerja bagi warga lokal.';

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'BUMDes' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Unit Usaha Unggulan BUMDes
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {isi}
                    </p>
                </div>
            </div>
        </PublicPageLayout>
    );
}
