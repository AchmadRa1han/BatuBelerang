import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function KarangTaruna() {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd' },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk' },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna', active: true },
        { title: 'RT dan RW', href: '/lembaga/rt-rw' },
        { title: 'Posyandu', href: '/lembaga/posyandu' },
        { title: 'BUMDes', href: '/lembaga/bumdes' },
    ];

    return (
        <PublicPageLayout
            title="Karang Taruna Desa Batu Belerang"
            subtitle="Wadah pengembangan generasi muda desa di bidang olahraga, kebudayaan, sosial, dan wirausaha."
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'Karang Taruna' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Peran Pemuda Karang Taruna
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        Karang Taruna merupakan wadah pengembangan generasi muda yang tumbuh atas dasar kesadaran dan tanggung jawab sosial dari, oleh, dan untuk masyarakat terutama generasi muda di wilayah Desa Batu Belerang.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                        <h3 className="font-bold text-slate-900 dark:text-white">Olahraga & Seni</h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Penyelenggaraan turnamen sepak bola, bola voli, dan seni kebudayaan daerah.</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                        <h3 className="font-bold text-slate-900 dark:text-white">Aksi Kemanusiaan</h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Kesiapsiagaan bencana alam, bakti sosial, dan kerja bakti kebersihan lingkungan.</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                        <h3 className="font-bold text-slate-900 dark:text-white">Kreativitas Pemuda</h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Pengembangan usaha pemuda desa, digitalisasi media, dan promosi wisata.</p>
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
