import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function SejarahDesa() {
    const sideMenuItems = [
        { title: 'Tentang Kami', href: '/profil/tentang-kami' },
        { title: 'Visi & Misi', href: '/profil/visi-misi' },
        { title: 'Sejarah Desa', href: '/profil/sejarah-desa', active: true },
        { title: 'Geografis Desa', href: '/profil/geografis-desa' },
        { title: 'Demografi Desa', href: '/profil/demografi-desa' },
    ];

    return (
        <PublicPageLayout
            title="Sejarah Desa Batu Belerang"
            subtitle="Asal usul penamaan dan rekam jejak perkembangan sejarah pemukiman warga Desa Batu Belerang."
            category="Profil Desa"
            breadcrumbs={[{ label: 'Sejarah Desa' }]}
            sideMenuItems={sideMenuItems}
        >
            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Asal Usul Penamaan Desa
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Penamaan <strong className="text-slate-900 dark:text-white">Desa Batu Belerang</strong> diambil dari keberadaan batuan belerang alami dan sumber mata air panas alami yang mengalir dari perut bumi pegunungan Sinjai Borong. Sejak jaman dahulu, sumber air panas belerang ini dimanfaatkan oleh para leluhur sebagai sarana penyembuhan alami dan pemandian warga sekitar.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/30 space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Periodisasi Kepemimpinan Desa
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-start justify-between border-b border-slate-200/60 pb-2.5 dark:border-slate-800">
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Periode Pembentukan Awal</h4>
                                <p className="text-xs text-slate-500">Penataan wilayah adat dan pembentukan struktur pemerintahan tingkat desa.</p>
                            </div>
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Era Dahulu</span>
                        </div>
                        <div className="flex items-start justify-between border-b border-slate-200/60 pb-2.5 dark:border-slate-800">
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Periode Pembangunan Infrastruktur</h4>
                                <p className="text-xs text-slate-500">Pembukaan akses jalan poros dan fasilitas pemandian air panas.</p>
                            </div>
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">2010 - 2020</span>
                        </div>
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Periode Transformasi Digital</h4>
                                <p className="text-xs text-slate-500">Integrasi teknologi dalam pelayanan publik dan tata kelola transparan.</p>
                            </div>
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">2021 - Sekarang</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Perkembangan Kekinian
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Saat ini, Desa Batu Belerang terus bertransformasi menjadi salah satu desa mandiri di Kabupaten Sinjai 
                        dengan mengandalkan komoditas unggulan pertanian serta potensi kawasan objek wisata pemandian air panas alami.
                    </p>
                </div>
            </article>
        </PublicPageLayout>
    );
}
