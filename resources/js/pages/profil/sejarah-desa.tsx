import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
    };
}

export default function SejarahDesa({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Tentang Kami', href: '/profil/tentang-kami' },
        { title: 'Visi & Misi', href: '/profil/visi-misi' },
        { title: 'Sejarah Desa', href: '/profil/sejarah-desa', active: true },
        { title: 'Geografis Desa', href: '/profil/geografis-desa' },
        { title: 'Demografi Desa', href: '/profil/demografi-desa' },
    ];

    const title = konten?.judul || 'Sejarah Desa Batu Belerang';
    const subtitle = konten?.subjudul || 'Asal usul penamaan dan rekam jejak perkembangan sejarah pemukiman warga Desa Batu Belerang.';
    const isi = konten?.isi || 'Penamaan Desa Batu Belerang diambil dari keberadaan batuan belerang alami dan sumber mata air panas alami yang mengalir dari perut bumi pegunungan Sinjai Borong. Sejak jaman dahulu, sumber air panas belerang ini dimanfaatkan oleh para leluhur sebagai sarana penyembuhan alami dan pemandian warga sekitar.';

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Profil Desa"
            breadcrumbs={[{ label: 'Sejarah Desa' }]}
            sideMenuItems={sideMenuItems}
        >
            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Asal Usul Penamaan Desa
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                        {isi}
                    </p>
                </div>
            </article>
        </PublicPageLayout>
    );
}
