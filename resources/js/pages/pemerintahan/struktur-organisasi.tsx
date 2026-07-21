import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function StrukturOrganisasi() {
    const sideMenuItems = [
        { title: 'Visi dan Misi', href: '/profil/visi-misi' },
        { title: 'Data Perangkat', href: '/pemerintahan/data-perangkat' },
        { title: 'Struktur Organisasi', href: '/pemerintahan/struktur-organisasi', active: true },
        { title: 'RPJMDes', href: '/pemerintahan/rpjmdes' },
        { title: 'Tata Kelola', href: '/pemerintahan/tata-kelola' },
    ];

    return (
        <PublicPageLayout
            title="Struktur Organisasi Pemerintah Desa"
            subtitle="Bagan garis koordinasi dan hirarki kepemimpinan Pemerintah Desa Batu Belerang."
            category="Pemerintahan"
            breadcrumbs={[{ label: 'Struktur Organisasi' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Bagan Tata Kerja Organisasi
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        Sistem pembagian kerja hirarkis Pemerintah Desa Batu Belerang berdasarkan Peraturan Menteri Dalam Negeri Nomor 84 Tahun 2015.
                    </p>
                </div>

                {/* Structure Visual Tree Diagram */}
                <div className="space-y-4 rounded-xl border border-slate-200/80 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-900/30 text-center">
                    {/* Level 1: Kades */}
                    <div className="mx-auto max-w-xs rounded-xl border-2 border-emerald-500 bg-white p-4 shadow-sm dark:bg-slate-900">
                        <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">KEPALA DESA</span>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">H. Ahmad Supardi, S.Sos</h3>
                    </div>

                    <div className="mx-auto h-6 w-0.5 bg-slate-300 dark:bg-slate-700" />

                    {/* Level 2: Sekdes */}
                    <div className="mx-auto max-w-xs rounded-xl border border-slate-300 bg-white p-3.5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">SEKRETARIS DESA</span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sulaeman</h3>
                    </div>

                    <div className="mx-auto h-6 w-0.5 bg-slate-300 dark:bg-slate-700" />

                    {/* Level 3: Kasi & Kaur */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-left dark:border-slate-800 dark:bg-slate-900">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase">KEPALA SEKSI (KASI)</span>
                            <ul className="mt-1 space-y-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                                <li>• Kasi Pemerintahan: Sadar Syam, S.Pd</li>
                                <li>• Kasi Pelayanan: Hartati</li>
                                <li>• Kasi Kesejahteraan: Lukman, S.Pd</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-left dark:border-slate-800 dark:bg-slate-900">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase">KEPALA URUSAN (KAUR)</span>
                            <ul className="mt-1 space-y-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                                <li>• Kaur TU & Umum: Kartini, S.Pd</li>
                                <li>• Kaur Keuangan: Fitriani</li>
                                <li>• Kaur Perencanaan: Nirmawati, SP</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mx-auto h-6 w-0.5 bg-slate-300 dark:bg-slate-700" />

                    {/* Level 4: Kadus */}
                    <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-left dark:border-slate-800 dark:bg-slate-900">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">KEPALA DUSUN (KADUS)</span>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                            <p>• Kadus Jeppara: Muh. Darwis</p>
                            <p>• Kadus Bontoe: Aditya Saputra</p>
                            <p>• Kadus Kalimbu: Muh. Tahir</p>
                            <p>• Kadus Mattirotasi: Ahmad</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
