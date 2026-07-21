import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function GeografisDesa() {
    const sideMenuItems = [
        { title: 'Tentang Kami', href: '/profil/tentang-kami' },
        { title: 'Visi & Misi', href: '/profil/visi-misi' },
        { title: 'Sejarah Desa', href: '/profil/sejarah-desa' },
        { title: 'Geografis Desa', href: '/profil/geografis-desa', active: true },
        { title: 'Demografi Desa', href: '/profil/demografi-desa' },
    ];

    return (
        <PublicPageLayout
            title="Geografis & Peta Wilayah Desa"
            subtitle="Batas wilayah, topografi dataran tinggi, iklim, dan kondisi letak geografis Desa Batu Belerang."
            category="Profil Desa"
            breadcrumbs={[{ label: 'Geografis Desa' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Letak & Topografi Wilayah
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        Desa Batu Belerang berada pada kawasan bentang alam pegunungan dengan ketinggian bervariasi antara 700 hingga 1.200 meter di atas permukaan laut (mdpl). Suhu udara rata-rata berkisar antara 19°C hingga 26°C dengan kelembapan udara yang tinggi.
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

                {/* Dusun Administratif */}
                <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Pembagian Dusun Administratif
                    </h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">
                        Secara administratif, Desa Batu Belerang terbagi atas 4 wilayah dusun:
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {['Dusun Jeppara', 'Dusun Bontoe', 'Dusun Kalimbu', 'Dusun Mattirotasi'].map((dusun, idx) => (
                            <div key={idx} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center font-bold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                                {dusun}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
