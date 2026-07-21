import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
    };
}

export default function GeografisDesa({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Tentang Kami', href: '/profil/tentang-kami' },
        { title: 'Visi & Misi', href: '/profil/visi-misi' },
        { title: 'Sejarah Desa', href: '/profil/sejarah-desa' },
        { title: 'Geografis Desa', href: '/profil/geografis-desa', active: true },
        { title: 'Demografi Desa', href: '/profil/demografi-desa' },
    ];

    const title = konten?.judul || 'Geografis & Peta Wilayah Desa';
    const subtitle = konten?.subjudul || 'Batas wilayah, topografi dataran tinggi, iklim, dan kondisi letak geografis Desa Batu Belerang.';
    const isi = konten?.isi || 'Desa Batu Belerang berada pada kawasan bentang alam pegunungan dengan ketinggian bervariasi antara 700 hingga 1.200 meter di atas permukaan laut (mdpl). Suhu udara rata-rata berkisar antara 19°C hingga 26°C dengan kelembapan udara yang tinggi.';

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Profil Desa"
            breadcrumbs={[{ label: 'Geografis Desa' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Letak & Topografi Wilayah
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {isi}
                    </p>
                </div>

                {/* Grid Batas Wilayah */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/30">
                    <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white">
                        Batas-Batas Administratif Wilayah
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Sebelah Utara</span>
                            <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">Desa Biji Nangka</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Sebelah Selatan</span>
                            <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">Desa Kassi Buleng</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Sebelah Timur</span>
                            <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">Kecamatan Sinjai Selatan</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Sebelah Barat</span>
                            <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">Kabupaten Bulukumba</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
