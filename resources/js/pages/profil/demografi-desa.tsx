import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function DemografiDesa() {
    const sideMenuItems = [
        { title: 'Tentang Kami', href: '/profil/tentang-kami' },
        { title: 'Visi & Misi', href: '/profil/visi-misi' },
        { title: 'Sejarah Desa', href: '/profil/sejarah-desa' },
        { title: 'Geografis Desa', href: '/profil/geografis-desa' },
        { title: 'Demografi Desa', href: '/profil/demografi-desa', active: true },
    ];

    const statsSummary = [
        { label: 'Jumlah Penduduk', value: '1,248 Jiwa' },
        { label: 'Jumlah Kepala Keluarga', value: '385 KK' },
        { label: 'Laki-laki', value: '612 Jiwa' },
        { label: 'Perempuan', value: '636 Jiwa' },
    ];

    return (
        <PublicPageLayout
            title="Demografi & Data Penduduk"
            subtitle="Ringkasan sebaran statistik kependudukan, kelompok usia, dan profesi warga Desa Batu Belerang."
            category="Profil Desa"
            breadcrumbs={[{ label: 'Demografi Desa' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Ringkasan Demografi
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        Data kependudukan terdaftar secara resmi pada Sistem Informasi Desa Batu Belerang.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {statsSummary.map((item, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-center dark:border-slate-800 dark:bg-slate-900/30">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{item.label}</span>
                            <p className="mt-1 text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* Sebaran Pekerjaan Utama */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/30">
                    <h3 className="mb-3 text-base font-bold text-slate-900 dark:text-white">
                        Mata Pencaharian Utama Warga
                    </h3>
                    <div className="space-y-2.5">
                        {[
                            { job: 'Petani & Pekebun', pct: 68 },
                            { job: 'Pedagang & UMKM', pct: 14 },
                            { job: 'Pegawai Negeri / Guru / PNS', pct: 8 },
                            { job: 'Karyawan Swasta & Buruh', pct: 6 },
                            { job: 'Lainnya', pct: 4 },
                        ].map((row, idx) => (
                            <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-700 dark:text-slate-300">{row.job}</span>
                                    <span className="text-slate-500">{row.pct}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${row.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
