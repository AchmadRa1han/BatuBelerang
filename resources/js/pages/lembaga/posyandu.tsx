import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function Posyandu() {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd' },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk' },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna' },
        { title: 'RT dan RW', href: '/lembaga/rt-rw' },
        { title: 'Posyandu', href: '/lembaga/posyandu', active: true },
        { title: 'BUMDes', href: '/lembaga/bumdes' },
    ];

    return (
        <PublicPageLayout
            title="Posyandu Terpadu Desa"
            subtitle="Pos Pelayanan Terpadu untuk kesehatan ibu, balita, lansia, dan penanganan stunting Desa Batu Belerang."
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'Posyandu' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Layanan Posyandu Rutin
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        Posyandu di Desa Batu Belerang diselenggarakan setiap bulan di masing-masing dusun bekerja sama dengan Bidan Desa dan Puskesmas Sinjai Borong.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">POSYANDU BALITA</span>
                        <h3 className="mt-1 font-bold text-slate-900 dark:text-white">Kesehatan Ibu & Balita</h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Penimbangan berat badan, imunisasi, pemberian PMT gizi, dan pemeriksaan tumbuh kembang balita.</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">POSYANDU LANSIA</span>
                        <h3 className="mt-1 font-bold text-slate-900 dark:text-white">Pemeriksaan Kesehatan Lansia</h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Pemeriksaan tekanan darah, gula darah, penyuluhan pola hidup sehat, dan senam lansia.</p>
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
