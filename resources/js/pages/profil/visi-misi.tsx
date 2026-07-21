import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface VisiMisiProps {
    category?: 'Profil Desa' | 'Pemerintahan';
}

export default function VisiMisi({ category = 'Profil Desa' }: VisiMisiProps) {
    const isPemerintahan = category === 'Pemerintahan';

    const sideMenuItems = isPemerintahan
        ? [
              { title: 'Visi dan Misi', href: '/pemerintahan/visi-misi', active: true },
              { title: 'Data Perangkat', href: '/pemerintahan/data-perangkat' },
              { title: 'Struktur Organisasi', href: '/pemerintahan/struktur-organisasi' },
              { title: 'RPJMDes', href: '/pemerintahan/rpjmdes' },
              { title: 'Tata Kelola', href: '/pemerintahan/tata-kelola' },
          ]
        : [
              { title: 'Tentang Kami', href: '/profil/tentang-kami' },
              { title: 'Visi & Misi', href: '/profil/visi-misi', active: true },
              { title: 'Sejarah Desa', href: '/profil/sejarah-desa' },
              { title: 'Geografis Desa', href: '/profil/geografis-desa' },
              { title: 'Demografi Desa', href: '/profil/demografi-desa' },
          ];

    const misiList = [
        'Mewujudkan tata kelola pemerintahan desa yang bersih, transparan, akuntabel, dan berorientasi pada pelayanan masyarakat.',
        'Mengembangkan potensi pariwisata alam air panas belerang dan sarana pendukungnya secara berkelanjutan.',
        'Meningkatkan infrastruktur jalan tani, sarana air bersih, serta fasilitas umum pemukiman warga.',
        'Meningkatkan kualitas sumber daya manusia melalui penguatan pendidikan, kesehatan, dan keagamaan.',
        'Mendorong pertumbuhan ekonomi warga melalui perkuatan usaha tani, peternakan, dan UMKM desa.',
    ];

    return (
        <PublicPageLayout
            title="Visi & Misi Desa Batu Belerang"
            subtitle="Arah kebijakan pembangunan dan komitmen jangka panjang Pemerintah Desa Batu Belerang."
            category={category}
            breadcrumbs={[{ label: 'Visi & Misi' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-8 text-sm">
                {/* Visi Section */}
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/40 p-6 dark:border-emerald-500/30 dark:bg-emerald-950/20">
                    <span className="text-xs font-extrabold tracking-widest text-emerald-700 uppercase dark:text-emerald-400">
                        VISI DESA
                    </span>
                    <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 md:text-2xl dark:text-white">
                        "Terwujudnya Desa Batu Belerang yang Mandiri, Sejahtera, Berdaya Saing, dan Berbasis Potensi Wisata Alami serta Pertanian Berkelanjutan."
                    </h2>
                </div>

                {/* Misi Section */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        MISI DESA
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300">
                        Untuk mewujudkan visi tersebut, Pemerintah Desa Batu Belerang menetapkan langkah-langkah strategis misi pembangunan berikut:
                    </p>
                    <div className="space-y-3">
                        {misiList.map((misi, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-colors dark:border-slate-800 dark:bg-slate-900/30"
                            >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-600 font-bold text-xs text-white">
                                    {idx + 1}
                                </span>
                                <p className="pt-0.5 font-medium text-slate-700 dark:text-slate-300">
                                    {misi}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicPageLayout>
    );
}
