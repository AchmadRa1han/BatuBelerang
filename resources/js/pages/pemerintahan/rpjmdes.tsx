import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function Rpjmdes() {
    const sideMenuItems = [
        { title: 'Visi dan Misi', href: '/pemerintahan/visi-misi' },
        { title: 'Data Perangkat', href: '/pemerintahan/data-perangkat' },
        { title: 'Struktur Organisasi', href: '/pemerintahan/struktur-organisasi' },
        { title: 'RPJMDes', href: '/pemerintahan/rpjmdes', active: true },
        { title: 'Tata Kelola', href: '/pemerintahan/tata-kelola' },
    ];

    const programPrioritas = [
        { bidang: 'Penyelenggaraan Pemerintahan', fokus: 'Peningkatan sarana kantor desa, tata kelola data berbasis digital, dan operasional RT/RW.' },
        { bidang: 'Pembangunan Desa', fokus: 'Pembangunan jalan tani, jembatan penghubung dusun, drainase pemukiman, serta penguatan sarana air bersih.' },
        { bidang: 'Pembinaan Kemasyarakatan', fokus: 'Pembinaan pemuda Karang Taruna, kegiatan keagamaan, olahraga desa, serta ketentraman warga.' },
        { bidang: 'Pemberdayaan Masyarakat', fokus: 'Pelatihan Usaha Kecil Menengah (UMKM), bantuan bibit unggul pertanian, dan perkuatan modal BUMDes.' },
    ];

    return (
        <PublicPageLayout
            title="Dokumen RPJMDes (2026 - 2031)"
            subtitle="Rencana Pembangunan Jangka Menengah Desa Batu Belerang mengenai arah kebijakan strategis pembangunan."
            category="Pemerintahan"
            breadcrumbs={[{ label: 'RPJMDes' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Dokumen Perencanaan 6 Tahun
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        RPJMDes merupakan dokumen perencanaan pembangunan desa untuk periode 6 (enam) tahun yang memuat visi, misi, arah kebijakan pembangunan desa, serta rencana kegiatan yang meliputi bidang penyelenggaraan pemerintahan desa, pembangunan desa, pembinaan kemasyarakatan desa, dan pemberdayaan masyarakat desa.
                    </p>
                </div>

                <div className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Bidang Program Prioritas
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {programPrioritas.map((item, idx) => (
                            <div key={idx} className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">BIDANG {idx + 1}</span>
                                <h4 className="mt-1 font-bold text-slate-900 dark:text-white">{item.bidang}</h4>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.fokus}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
