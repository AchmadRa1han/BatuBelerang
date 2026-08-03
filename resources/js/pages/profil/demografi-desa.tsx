import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
        meta_json?: {
            penduduk?: string;
            kk?: string;
            laki?: string;
            perempuan?: string;
            sebaran_dusun?: Array<{
                dusun: string;
                kk: number;
                l: number;
                p: number;
                total: number;
            }>;
            pekerjaan?: Array<{
                pekerjaan: string;
                jumlah: number;
            }>;
            pendidikan?: Array<{
                pendidikan: string;
                jumlah: number;
            }>;
        };
    };
}

export default function DemografiDesa({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Tentang Kami', href: '/profil/tentang-kami' },
        { title: 'Visi & Misi', href: '/profil/visi-misi' },
        { title: 'Sejarah Desa', href: '/profil/sejarah-desa' },
        { title: 'Geografis Desa', href: '/profil/geografis-desa' },
        { title: 'Demografi Desa', href: '/profil/demografi-desa', active: true },
    ];

    const title = konten?.judul || 'Demografi & Data Penduduk';
    const subtitle = konten?.subjudul || 'Ringkasan sebaran statistik kependudukan, kelompok usia, dan profesi warga Desa Batu Belerang.';
    const isi = konten?.isi || 'Penduduk Desa Batu Belerang tercatat sebanyak 2.141 Jiwa yang terdiri dari 1.116 laki-laki dan 1.025 perempuan dengan jumlah Kepala Keluarga sebanyak 688 KK.';

    const statsSummary = [
        { label: 'Jumlah Penduduk', value: konten?.meta_json?.penduduk || '2.141 Jiwa' },
        { label: 'Jumlah Kepala Keluarga', value: konten?.meta_json?.kk || '688 KK' },
        { label: 'Laki-laki', value: konten?.meta_json?.laki || '1.116 Jiwa' },
        { label: 'Perempuan', value: konten?.meta_json?.perempuan || '1.025 Jiwa' },
    ];

    const sebaranDusun = konten?.meta_json?.sebaran_dusun || [
        { dusun: 'Jeppara', kk: 239, l: 384, p: 350, total: 734 },
        { dusun: 'Bontoe', kk: 320, l: 366, p: 328, total: 694 },
        { dusun: 'Kalimbu', kk: 123, l: 210, p: 197, total: 407 },
        { dusun: 'Mattirotasi', kk: 96, l: 156, p: 150, total: 306 },
    ];

    const pekerjaanList = konten?.meta_json?.pekerjaan || [
        { pekerjaan: 'Petani', jumlah: 679 },
        { pekerjaan: 'Guru', jumlah: 53 },
        { pekerjaan: 'PNS (Pegawai Negeri Sipil)', jumlah: 30 },
        { pekerjaan: 'Tukang Batu', jumlah: 26 },
        { pekerjaan: 'Tukang Kayu', jumlah: 20 },
        { pekerjaan: 'Pedagang', jumlah: 10 },
        { pekerjaan: 'Bidan/Perawat', jumlah: 6 },
        { pekerjaan: 'Sopir', jumlah: 6 },
        { pekerjaan: 'TNI / POLRI', jumlah: 4 },
        { pekerjaan: 'Perbengkelan', jumlah: 4 },
        { pekerjaan: 'Penjahit', jumlah: 3 },
    ];

    const pendidikanList = konten?.meta_json?.pendidikan || [
        { pendidikan: 'Tidak Tamat SD', jumlah: 124 },
        { pendidikan: 'Tamat SD', jumlah: 378 },
        { pendidikan: 'Tamat SLTP', jumlah: 174 },
        { pendidikan: 'Tamat SLTA', jumlah: 190 },
        { pendidikan: 'Tamat Perguruan Tinggi', jumlah: 65 },
    ];

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Profil Desa"
            breadcrumbs={[{ label: 'Demografi Desa' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-8 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Ringkasan Demografi
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {isi}
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

                {/* Tabel Sebaran Dusun */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/30">
                    <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white">
                        Sebaran Penduduk per Wilayah Dusun
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 uppercase text-[10px] tracking-wider">
                                    <th className="pb-2">Nama Dusun</th>
                                    <th className="pb-2">Jumlah KK</th>
                                    <th className="pb-2">Laki-Laki</th>
                                    <th className="pb-2">Perempuan</th>
                                    <th className="pb-2">Total Penduduk</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sebaranDusun.map((row, idx) => (
                                    <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/40 last:border-0">
                                        <td className="py-2.5 font-bold text-slate-900 dark:text-white">{row.dusun}</td>
                                        <td className="py-2.5 font-mono">{row.kk} KK</td>
                                        <td className="py-2.5 font-mono">{row.l} Jiwa</td>
                                        <td className="py-2.5 font-mono">{row.p} Jiwa</td>
                                        <td className="py-2.5 font-bold text-emerald-600 dark:text-emerald-400 font-mono">{row.total} Jiwa</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Grid Pendidikan & Pekerjaan */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Pendidikan */}
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/30">
                        <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white">
                            Tingkat Pendidikan Penduduk
                        </h3>
                        <div className="space-y-3">
                            {pendidikanList.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-2 last:border-0 dark:border-slate-800/40">
                                    <span className="text-slate-700 dark:text-slate-350">{item.pendidikan}</span>
                                    <span className="font-bold text-slate-900 dark:text-white font-mono">{item.jumlah} Orang</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pekerjaan */}
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/30">
                        <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white">
                            Mata Pencaharian Utama
                        </h3>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                            {pekerjaanList.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-2 last:border-0 dark:border-slate-800/40">
                                    <span className="text-slate-700 dark:text-slate-350">{item.pekerjaan}</span>
                                    <span className="font-bold text-slate-900 dark:text-white font-mono">{item.jumlah} Orang</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
