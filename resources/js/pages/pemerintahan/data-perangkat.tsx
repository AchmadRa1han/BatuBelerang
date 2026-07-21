import React from 'react';
import PublicPageLayout from '@/components/public-page-layout';

export default function DataPerangkat() {
    const sideMenuItems = [
        { title: 'Visi dan Misi', href: '/pemerintahan/visi-misi' },
        { title: 'Data Perangkat', href: '/pemerintahan/data-perangkat', active: true },
        { title: 'Struktur Organisasi', href: '/pemerintahan/struktur-organisasi' },
        { title: 'RPJMDes', href: '/pemerintahan/rpjmdes' },
        { title: 'Tata Kelola', href: '/pemerintahan/tata-kelola' },
    ];

    const perangkatData = [
        { nama: 'H. Ahmad Supardi, S.Sos', jabatan: 'Kepala Desa', tugas: 'Memimpin penyelenggaraan pemerintahan, pembangunan, dan kemasyarakatan.' },
        { nama: 'Sulaeman', jabatan: 'Sekretaris Desa', tugas: 'Mengoordinasikan sekretariat dan administrasi keuangan & umum.' },
        { nama: 'Sadar Syam, S.Pd', jabatan: 'Kasi Pemerintahan', tugas: 'Menyusun serta melaksanakan kebijakan urusan tata pemerintahan.' },
        { nama: 'Hartati', jabatan: 'Kasi Pelayanan', tugas: 'Mengelola pelayanan administrasi kependudukan dan surat publik.' },
        { nama: 'Lukman, S.Pd', jabatan: 'Kasi Kesejahteraan', tugas: 'Mengelola program pembinaan kesejahteraan sosial dan pemberdayaan.' },
        { nama: 'Kartini, S.Pd', jabatan: 'Kaur TU & Umum', tugas: 'Melaksanakan urusan persuratan, inventaris, dan rumah tangga kantor.' },
        { nama: 'Fitriani', jabatan: 'Kaur Keuangan', tugas: 'Mengelola penatausahaan keuangan dan pembukuan APBDesa.' },
        { nama: 'Nirmawati, SP', jabatan: 'Kaur Perencanaan', tugas: 'Menyusun dokumen RKPDes, RPJMDes, dan laporan realisasi.' },
    ];

    return (
        <PublicPageLayout
            title="Data Perangkat Pemerintah Desa"
            subtitle="Daftar nama, jabatan, serta rincian tugas jajaran aparat pelayan masyarakat Desa Batu Belerang."
            category="Pemerintahan"
            breadcrumbs={[{ label: 'Data Perangkat' }]}
            sideMenuItems={sideMenuItems}
        >
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Daftar Aparatur Pemerintah Desa
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                        Jajaran pengabdi masyarakat yang siap melayani kebutuhan warga secara profesional.
                    </p>
                </div>

                <div className="space-y-3">
                    {perangkatData.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col justify-between gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-colors sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900/30"
                        >
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{item.nama}</h3>
                                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{item.jabatan}</p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.tugas}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PublicPageLayout>
    );
}
