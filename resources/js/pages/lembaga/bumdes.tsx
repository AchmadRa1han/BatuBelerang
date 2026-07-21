import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function Bumdes() {
    const sideMenuItems = [
        { title: 'Badan Permusyawaratan Desa', href: '/lembaga/bpd' },
        { title: 'Tim Penggerak PKK', href: '/lembaga/pkk' },
        { title: 'Karang Taruna', href: '/lembaga/karang-taruna' },
        { title: 'RT dan RW', href: '/lembaga/rt-rw' },
        { title: 'Posyandu', href: '/lembaga/posyandu' },
        { title: 'BUMDes', href: '/lembaga/bumdes', active: true },
    ];

    return (
        <PublicPageLayout
            title="BUMDes Batu Belerang"
            subtitle="Badan Usaha Milik Desa pendorong kemandirian ekonomi, pengelolaan wisata, dan pemasaran produk lokal."
            category="Lembaga Desa"
            breadcrumbs={[{ label: 'BUMDes' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Unit Usaha Unggulan BUMDes
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        BUMDes Batu Belerang mengelola sektor-sektor strategis ekonomi desa guna menambah Pendapatan Asli Desa (PADes) serta membuka lapangan kerja bagi warga lokal.
                    </p>
                </div>

                <div className="space-y-3">
                    {[
                        { title: 'Pengelolaan Objek Wisata Air Panas', desc: 'Pengelolaan tiket, tempat pemandian, gazebo, dan fasilitas pendukung pariwisata.' },
                        { title: 'Perdagangan & Kemitraan UMKM', desc: 'Penampungan dan pemasaran produk kopi, cengkeh, serta kerajinan tangan hasil olahan warga.' },
                        { title: 'Layanan Simpan Pinjam & Sarana Tani', desc: 'Penyediaan modal usaha mikro dan penyaluran sarana produksi pertanian (saprodi).' },
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
