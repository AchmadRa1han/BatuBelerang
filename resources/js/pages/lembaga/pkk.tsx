import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function Pkk() {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd' },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk', active: true },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna' },
        { title: 'RT dan RW', href: '/lembaga/rt-rw' },
        { title: 'Posyandu', href: '/lembaga/posyandu' },
        { title: 'BUMDes', href: '/lembaga/bumdes' },
    ];

    return (
        <PublicPageLayout
            title="Tim Penggerak PKK Desa"
            subtitle="Lembaga kemasyarakatan mitra pemerintah desa dalam pemberdayaan kesejahteraan keluarga dan kesehatan."
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'PKK' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        10 Program Pokok PKK
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        Tim Penggerak Pemberdayaan dan Kesejahteraan Keluarga (TP-PKK) Desa Batu Belerang aktif menggerakkan 10 Program Pokok PKK demi terwujudnya keluarga yang beriman, sejahtera, dan bertaqwa.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                        'Penghayatan dan Pengamalan Pancasila',
                        'Gotong Royong',
                        'Pangan',
                        'Sandang',
                        'Perumahan dan Tata Taksana Rumah Tangga',
                        'Pendidikan dan Keterampilan',
                        'Kesehatan',
                        'Pengembangan Kehidupan Berkoperasi',
                        'Kelestarian Lingkungan Hidup',
                        'Perencanaan Kesehatan',
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/30 font-medium text-slate-800 dark:text-slate-200">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-xs font-bold text-white">{idx + 1}</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </PublicPageLayout>
    );
}
