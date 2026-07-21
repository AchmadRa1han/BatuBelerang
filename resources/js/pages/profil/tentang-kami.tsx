import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function TentangKami() {
    const sideMenuItems = [
        { title: 'Tentang Kami', href: '/profil/tentang-kami', active: true },
        { title: 'Visi & Misi', href: '/profil/visi-misi' },
        { title: 'Sejarah Desa', href: '/profil/sejarah-desa' },
        { title: 'Geografis Desa', href: '/profil/geografis-desa' },
        { title: 'Demografi Desa', href: '/profil/demografi-desa' },
    ];

    return (
        <PublicPageLayout
            title="Tentang Desa Batu Belerang"
            subtitle="Gambaran umum kawasan pegunungan dan destinasi wisata alami Desa Batu Belerang, Kecamatan Sinjai Borong."
            category="Profil Desa"
            breadcrumbs={[{ label: 'Tentang Kami' }]}
            sideMenuItems={sideMenuItems}
        >
            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Gambaran Umum
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Desa Batu Belerang terletak di wilayah Kecamatan Sinjai Borong, Kabupaten Sinjai, Provinsi Sulawesi Selatan. 
                        Desa ini berada di daerah dataran tinggi dan kawasan pegunungan yang memiliki udara sejuk serta keindahan panorama alam yang masih asri.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/30 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Potensi Unggulan Desa
                    </h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                        <li>
                            <strong className="text-slate-900 dark:text-white">Wisata Alami Air Panas Belerang:</strong> Sumber mata air panas alami yang dipercaya memiliki khasiat kesehatan serta menjadi daya tarik utama wisatawan.
                        </li>
                        <li>
                            <strong className="text-slate-900 dark:text-white">Pertanian & Perkebunan:</strong> Penghasil sayur-sayuran segar, kopi, dan cengkeh berkualitas tinggi yang menjadi sumber mata pencaharian utama warga.
                        </li>
                        <li>
                            <strong className="text-slate-900 dark:text-white">Keanekaragaman Budaya & Gotong Royong:</strong> Masyarakat yang menjunjung tinggi kearifan lokal Sipakatau, Sipakalebbi, dan Sipakainge.
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Komitmen Komunitas & Pelayanan
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Pemerintah Desa Batu Belerang bertekad memberikan pelayanan publik yang transparan, profesional, dan berbasis teknologi informasi 
                        guna mempermudah seluruh kebutuhan administrasi masyarakat.
                    </p>
                </div>
            </article>
        </PublicPageLayout>
    );
}
