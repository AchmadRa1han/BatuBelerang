import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
        meta_json?: {
            periodisasi?: Array<{
                periode: string;
                judul: string;
                deskripsi: string;
            }>;
        };
    };
}

export default function SejarahDesa({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Tentang Kami', href: '/profil/tentang-kami' },
        { title: 'Visi & Misi', href: '/profil/visi-misi' },
        { title: 'Sejarah Desa', href: '/profil/sejarah-desa', active: true },
        { title: 'Geografis Desa', href: '/profil/geografis-desa' },
        { title: 'Demografi Desa', href: '/profil/demografi-desa' },
    ];

    const title = konten?.judul || 'Sejarah Desa Batu Belerang';
    const subtitle = konten?.subjudul || 'Asal usul penamaan dan rekam jejak kepemimpinan Kepala Desa Batu Belerang.';
    const isi = konten?.isi || 'Penamaan Desa Batu Belerang diambil dari keberadaan batuan belerang alami dan sumber mata air panas alami yang mengalir dari perut bumi pegunungan Sinjai Borong.';

    const periodisasi = konten?.meta_json?.periodisasi || [
        { periode: '1960 - 1970', judul: 'Mahmud', deskripsi: 'Kepala Desa Definitif' },
        { periode: '1970 - 1972', judul: 'Baso Burhan', deskripsi: 'Kepala Desa Definitif' },
        { periode: '1972 - 1978', judul: 'Muh. Jafar Sudja', deskripsi: 'Kepala Desa Definitif' },
        { periode: '1978 - 1986', judul: 'Ambo Sakka', deskripsi: 'Kepala Desa Definitif' },
        { periode: '1987 - 1995', judul: 'Ambo Tang', deskripsi: 'Kepala Desa Definitif' },
        { periode: '1995 - 1998', judul: 'Pejabat Sementara', deskripsi: 'Pjs Kepala Desa' },
        { periode: '1998 - 2014', judul: 'M. Ali Hasan', deskripsi: 'Kepala Desa Definitif' },
        { periode: '2014 - 2015', judul: 'Abdul Salam', deskripsi: 'Pjs Kepala Desa' },
        { periode: '2015 - 2021', judul: 'Ahmad P', deskripsi: 'Kepala Desa Definitif' },
        { periode: '2021 - 2022', judul: 'Abdul Salam', deskripsi: 'Pjs Kepala Desa' },
        { periode: '2022 - Sekarang', judul: 'Ahmad P', deskripsi: 'Kepala Desa Definitif' },
    ];

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Profil Desa"
            breadcrumbs={[{ label: 'Sejarah Desa' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-8 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Asal Usul Penamaan Desa
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                        {isi}
                    </p>
                </div>

                {/* Timeline Sejarah Kepala Desa */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/30">
                    <h3 className="mb-6 text-base font-bold text-slate-900 dark:text-white">
                        Daftar Nama Kepala Desa Batu Belerang
                    </h3>
                    <div className="relative border-l border-slate-200 pl-4 ml-2 dark:border-slate-800 space-y-6">
                        {periodisasi.map((item, idx) => (
                            <div key={idx} className="relative">
                                {/* Dot */}
                                <div className="absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-600 dark:border-slate-950" />
                                
                                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-550">
                                    Periode {item.periode}
                                </span>
                                <h4 className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                                    {item.judul}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {item.deskripsi}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
