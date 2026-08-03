import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

interface PageProps {
    konten?: {
        judul?: string;
        subjudul?: string;
        isi?: string;
        meta_json?: {
            potensi?: string[];
        };
    };
}

export default function TentangKami({ konten }: PageProps) {
    const sideMenuItems = [
        { title: 'Tentang Kami', href: '/profil/tentang-kami', active: true },
        { title: 'Visi & Misi', href: '/profil/visi-misi' },
        { title: 'Sejarah Desa', href: '/profil/sejarah-desa' },
        { title: 'Geografis Desa', href: '/profil/geografis-desa' },
        { title: 'Demografi Desa', href: '/profil/demografi-desa' },
    ];

    const title = konten?.judul || 'Tentang Desa Batu Belerang';
    const subtitle = konten?.subjudul || 'Gambaran umum kawasan perkebunan, perbukitan, dan kelembagaan Desa Batu Belerang, Kecamatan Sinjai Borong.';
    
    const defaultIsi = 'Desa Batu Belerang adalah salah satu desa di Kecamatan Sinjai Borong, Kabupaten Sinjai, Provinsi Sulawesi Selatan, yang dianugerahi kekayaan alam melimpah serta keindahan pegunungan yang asri. Desa ini memiliki luas wilayah administratif sebesar 3.446,65 Ha dan dihuni oleh 2.141 jiwa (1.116 laki-laki dan 1.025 perempuan) dengan jumlah Kepala Keluarga sebanyak 688 KK.';
    const isi = konten?.isi || defaultIsi;

    const defaultPotensi = [
        'Kawasan Agraris Subur: Mayoritas masyarakat bekerja di sektor pertanian dan perkebunan karena tanahnya yang subur di dataran tinggi.',
        'Sumber Daya Manusia Memadai: Tingkat pendidikan masyarakat cukup tinggi, didukung kesadaran pendidikan yang terus meningkat.',
        'Sarana Prasarana Lengkap: Memiliki 6 sarana pendidikan dasar & menengah, 5 sarana peribadatan, 5 sarana kesehatan (termasuk 4 Posyandu), dan 59 lembaga kemasyarakatan aktif.'
    ];

    const potensi = konten?.meta_json?.potensi || defaultPotensi;

    return (
        <PublicPageLayout
            title={title}
            subtitle={subtitle}
            category="Profil Desa"
            breadcrumbs={[{ label: 'Tentang Kami' }]}
            sideMenuItems={sideMenuItems}
        >
            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Gambaran Umum
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                        {isi}
                    </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/30 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Potensi & Keadaan Desa
                    </h3>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-300 list-none pl-0">
                        {potensi.map((item, idx) => {
                            const colonIndex = item.indexOf(':');
                            const headline = colonIndex !== -1 ? item.substring(0, colonIndex) : '';
                            const detail = colonIndex !== -1 ? item.substring(colonIndex + 1) : item;
                            return (
                                <li key={idx} className="flex gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <div>
                                        {headline ? (
                                            <>
                                                <strong className="text-slate-900 dark:text-white">{headline}:</strong>
                                                <span>{detail}</span>
                                            </>
                                        ) : (
                                            <span>{detail}</span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </article>
        </PublicPageLayout>
    );
}
