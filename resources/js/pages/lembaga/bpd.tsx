import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function Bpd() {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd', active: true },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk' },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna' },
        { title: 'RT dan RW', href: '/lembaga/rt-rw' },
        { title: 'Posyandu', href: '/lembaga/posyandu' },
        { title: 'BUMDes', href: '/lembaga/bumdes' },
    ];

    return (
        <PublicPageLayout
            title="Badan Permusyawaratan Desa (BPD)"
            subtitle="Lembaga permusyawaratan yang mengayomi aspirasi masyarakat serta mengawasi penyelenggaraan pemerintahan desa."
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'BPD' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Tugas & Fungsi Utama BPD
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        Badan Permusyawaratan Desa (BPD) merupakan lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa yang beranggotakan wakil dari penduduk desa berdasarkan keterwakilan wilayah.
                    </p>
                </div>

                <div className="space-y-3">
                    {[
                        { title: '1. Membahas & Menyepakati Perdes', desc: 'Bersama Kepala Desa membahas serta menyepakati Peraturan Desa (Perdes).' },
                        { title: '2. Menampung & Menyalurkan Aspirasi', desc: 'Menyerap aspirasi, masukan, serta keluhan warga untuk disampaikan kepada pemerintah desa.' },
                        { title: '3. Mengawasi Kinerja Kepala Desa', desc: 'Melakukan pengawasan terhadap pelaksanaan APBDesa dan proyek pembangunan desa.' },
                    ].map((item, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PublicPageLayout>
    );
}
