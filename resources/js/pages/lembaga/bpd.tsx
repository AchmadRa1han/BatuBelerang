import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
    };
}

export default function Bpd({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd', active: true },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk' },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna' },
        { title: 'RT dan RW', href: '/lembaga/rt-rw' },
        { title: 'Posyandu', href: '/lembaga/posyandu' },
        { title: 'BUMDes', href: '/lembaga/bumdes' },
    ];

    const title = konten?.judul || 'Badan Permusyawaratan Desa (BPD)';
    const subtitle = konten?.subjudul || 'Lembaga permusyawaratan yang mengayomi aspirasi masyarakat serta mengawasi penyelenggaraan pemerintahan desa.';
    const isi = konten?.isi || 'Badan Permusyawaratan Desa (BPD) merupakan lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa yang beranggotakan wakil dari penduduk desa berdasarkan keterwakilan wilayah.';

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'BPD' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Tugas & Fungsi Utama BPD
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {isi}
                    </p>
                </div>
            </div>
        </PublicPageLayout>
    );
}
