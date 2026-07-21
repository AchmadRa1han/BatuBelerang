import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
    };
}

export default function KarangTaruna({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd' },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk' },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna', active: true },
        { title: 'RT dan RW', href: '/lembaga/rt-rw' },
        { title: 'Posyandu', href: '/lembaga/posyandu' },
        { title: 'BUMDes', href: '/lembaga/bumdes' },
    ];

    const title = konten?.judul || 'Karang Taruna Desa Batu Belerang';
    const subtitle = konten?.subjudul || 'Wadah pengembangan generasi muda desa di bidang olahraga, kebudayaan, sosial, dan wirausaha.';
    const isi = konten?.isi || 'Karang Taruna merupakan wadah pengembangan generasi muda yang tumbuh atas dasar kesadaran dan tanggung jawab sosial dari, oleh, dan untuk masyarakat terutama generasi muda di wilayah Desa Batu Belerang.';

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'Karang Taruna' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Peran Pemuda Karang Taruna
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {isi}
                    </p>
                </div>
            </div>
        </PublicPageLayout>
    );
}
