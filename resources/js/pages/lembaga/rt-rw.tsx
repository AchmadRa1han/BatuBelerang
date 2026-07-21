import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function RtRw() {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd' },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk' },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna' },
        { title: 'RT dan RW', href: '/lembaga/rt-rw', active: true },
        { title: 'Posyandu', href: '/lembaga/posyandu' },
        { title: 'BUMDes', href: '/lembaga/bumdes' },
    ];

    return (
        <PublicPageLayout
            title="Lembaga RT & RW Desa Batu Belerang"
            subtitle="Garda terdepan pelayanan kemasyarakatan dan kerukunan warga di tingkat rukun tetangga dan rukun warga."
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'RT & RW' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Tugas Pokok RT & RW
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        Rukun Tetangga (RT) dan Rukun Warga (RW) membantu Pemerintah Desa dalam penyelenggaraan urusan pelayanan pemerintahan, ketentraman warga, dan pendataan kependudukan di tingkat lingkungan terdekat.
                    </p>
                </div>

                <div className="space-y-3">
                    {[
                        { title: 'Pelayanan Pengantar Surat Keterangan', desc: 'Memberikan verifikasi awal dan surat pengantar administrasi warga.' },
                        { title: 'Pendataan Kependudukan & BLT', desc: 'Membantu pendataan penerima bantuan sosial serta mutasi warga masuk/keluar.' },
                        { title: 'Menjaga Kamtibmas Lingkungan', desc: 'Mengoordinasikan pos ronda malam dan kerja bakti kebersihan di lingkungan RT/RW.' },
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
