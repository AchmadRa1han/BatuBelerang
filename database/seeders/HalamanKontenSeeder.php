<?php

namespace Database\Seeders;

use App\Models\HalamanKonten;
use Illuminate\Database\Seeder;

class HalamanKontenSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            // PROFIL DESA
            [
                'slug' => 'profil-tentang-kami',
                'kategori' => 'Profil Desa',
                'judul' => 'Tentang Desa Batu Belerang',
                'subjudul' => 'Gambaran umum kawasan pegunungan dan destinasi wisata alami Desa Batu Belerang, Kecamatan Sinjai Borong.',
                'isi' => 'Desa Batu Belerang terletak di wilayah Kecamatan Sinjai Borong, Kabupaten Sinjai, Provinsi Sulawesi Selatan. Desa ini berada di daerah dataran tinggi dan kawasan pegunungan yang memiliki udara sejuk serta keindahan panorama alam yang masih asri.',
                'meta_json' => [
                    'potensi' => [
                        'Wisata Alami Air Panas Belerang: Sumber mata air panas alami yang dipercaya memiliki khasiat kesehatan serta menjadi daya tarik utama wisatawan.',
                        'Pertanian & Perkebunan: Penghasil sayur-sayuran segar, kopi, dan cengkeh berkualitas tinggi yang menjadi sumber mata pencaharian utama warga.',
                        'Keanekaragaman Budaya & Gotong Royong: Masyarakat yang menjunjung tinggi kearifan lokal Sipakatau, Sipakalebbi, dan Sipakainge.',
                    ],
                ],
            ],
            [
                'slug' => 'profil-visi-misi',
                'kategori' => 'Profil Desa',
                'judul' => 'Visi & Misi Desa Batu Belerang',
                'subjudul' => 'Arah kebijakan pembangunan dan komitmen jangka panjang Pemerintah Desa Batu Belerang.',
                'isi' => 'Terwujudnya Desa Batu Belerang yang Mandiri, Sejahtera, Berdaya Saing, dan Berbasis Potensi Wisata Alami serta Pertanian Berkelanjutan.',
                'meta_json' => [
                    'misi' => [
                        'Mewujudkan tata kelola pemerintahan desa yang bersih, transparan, akuntabel, dan berorientasi pada pelayanan masyarakat.',
                        'Mengembangkan potensi pariwisata alam air panas belerang dan sarana pendukungnya secara berkelanjutan.',
                        'Meningkatkan infrastruktur jalan tani, sarana air bersih, serta fasilitas umum pemukiman warga.',
                        'Meningkatkan kualitas sumber daya manusia melalui penguatan pendidikan, kesehatan, dan keagamaan.',
                        'Mendorong pertumbuhan ekonomi warga melalui perkuatan usaha tani, peternakan, dan UMKM desa.',
                    ],
                ],
            ],
            [
                'slug' => 'profil-sejarah-desa',
                'kategori' => 'Profil Desa',
                'judul' => 'Sejarah Desa Batu Belerang',
                'subjudul' => 'Asal usul penamaan dan rekam jejak perkembangan sejarah pemukiman warga Desa Batu Belerang.',
                'isi' => 'Penamaan Desa Batu Belerang diambil dari keberadaan batuan belerang alami dan sumber mata air panas alami yang mengalir dari perut bumi pegunungan Sinjai Borong.',
                'meta_json' => [
                    'periodisasi' => [
                        ['periode' => 'Era Dahulu', 'judul' => 'Pembentukan Awal', 'deskripsi' => 'Penataan wilayah adat dan pembentukan struktur pemerintahan tingkat desa.'],
                        ['periode' => '2010 - 2020', 'judul' => 'Pembangunan Infrastruktur', 'deskripsi' => 'Pembukaan akses jalan poros dan fasilitas pemandian air panas.'],
                        ['periode' => '2021 - Sekarang', 'judul' => 'Transformasi Digital', 'deskripsi' => 'Integrasi teknologi dalam pelayanan publik dan tata kelola transparan.'],
                    ],
                ],
            ],
            [
                'slug' => 'profil-geografis-desa',
                'kategori' => 'Profil Desa',
                'judul' => 'Geografis & Peta Wilayah Desa',
                'subjudul' => 'Batas wilayah, topografi dataran tinggi, iklim, dan kondisi letak geografis Desa Batu Belerang.',
                'isi' => 'Desa Batu Belerang berada pada kawasan bentang alam pegunungan dengan ketinggian bervariasi antara 700 hingga 1.200 meter di atas permukaan laut (mdpl).',
                'meta_json' => [
                    'batas' => [
                        'utara' => 'Desa Biji Nangka',
                        'selatan' => 'Desa Kassi Buleng',
                        'timur' => 'Kecamatan Sinjai Selatan',
                        'barat' => 'Kabupaten Bulukumba',
                    ],
                    'dusun' => ['Dusun Jeppara', 'Dusun Bontoe', 'Dusun Kalimbu', 'Dusun Mattirotasi'],
                ],
            ],
            [
                'slug' => 'profil-demografi-desa',
                'kategori' => 'Profil Desa',
                'judul' => 'Demografi & Data Penduduk',
                'subjudul' => 'Ringkasan sebaran statistik kependudukan, kelompok usia, dan profesi warga Desa Batu Belerang.',
                'isi' => 'Data kependudukan terdaftar secara resmi pada Sistem Informasi Desa Batu Belerang.',
                'meta_json' => [
                    'penduduk' => '1,248 Jiwa',
                    'kk' => '385 KK',
                    'laki' => '612 Jiwa',
                    'perempuan' => '636 Jiwa',
                ],
            ],

            // PEMERINTAHAN
            [
                'slug' => 'pemerintahan-struktur-organisasi',
                'kategori' => 'Pemerintahan',
                'judul' => 'Struktur Organisasi Pemerintah Desa',
                'subjudul' => 'Bagan garis koordinasi dan hirarki kepemimpinan Pemerintah Desa Batu Belerang.',
                'isi' => 'Sistem pembagian kerja hirarkis Pemerintah Desa Batu Belerang berdasarkan Peraturan Menteri Dalam Negeri Nomor 84 Tahun 2015.',
                'meta_json' => [],
            ],
            [
                'slug' => 'pemerintahan-rpjmdes',
                'kategori' => 'Pemerintahan',
                'judul' => 'Dokumen RPJMDes (2026 - 2031)',
                'subjudul' => 'Rencana Pembangunan Jangka Menengah Desa Batu Belerang mengenai arah kebijakan strategis pembangunan.',
                'isi' => 'RPJMDes merupakan dokumen perencanaan pembangunan desa untuk periode 6 (enam) tahun yang memuat visi, misi, arah kebijakan pembangunan desa, serta rencana kegiatan.',
                'meta_json' => [
                    'program' => [
                        ['bidang' => 'Penyelenggaraan Pemerintahan', 'fokus' => 'Peningkatan sarana kantor desa, tata kelola data berbasis digital, dan operasional RT/RW.'],
                        ['bidang' => 'Pembangunan Desa', 'fokus' => 'Pembangunan jalan tani, jembatan penghubung dusun, drainase pemukiman, serta penguatan sarana air bersih.'],
                        ['bidang' => 'Pembinaan Kemasyarakatan', 'fokus' => 'Pembinaan pemuda Karang Taruna, kegiatan keagamaan, olahraga desa, serta ketentraman warga.'],
                        ['bidang' => 'Pemberdayaan Masyarakat', 'fokus' => 'Pelatihan Usaha Kecil Menengah (UMKM), bantuan bibit unggul pertanian, dan perkuatan modal BUMDes.'],
                    ],
                ],
            ],
            [
                'slug' => 'pemerintahan-tata-kelola',
                'kategori' => 'Pemerintahan',
                'judul' => 'Tata Kelola Pemerintahan Desa',
                'subjudul' => 'Prinsip akuntabilitas, keterbukaan informasi, serta standar operasional pelayanan publik Desa Batu Belerang.',
                'isi' => 'Pemerintah Desa Batu Belerang menerapkan 4 pilar utama tata kelola pemerintahan yang baik: Transparansi, Akuntabilitas, Partisipatif, dan Ketertiban Hukum.',
                'meta_json' => [],
            ],

            // LEMBAGA DESA
            [
                'slug' => 'lembaga-bpd',
                'kategori' => 'Lembaga Desa',
                'judul' => 'Badan Permusyawaratan Desa (BPD)',
                'subjudul' => 'Lembaga permusyawaratan yang mengayomi aspirasi masyarakat serta mengawasi penyelenggaraan pemerintahan desa.',
                'isi' => 'Badan Permusyawaratan Desa (BPD) merupakan lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa yang beranggotakan wakil dari penduduk desa.',
                'meta_json' => [],
            ],
            [
                'slug' => 'lembaga-pkk',
                'kategori' => 'Lembaga Desa',
                'judul' => 'Tim Penggerak PKK Desa',
                'subjudul' => 'Lembaga kemasyarakatan mitra pemerintah desa dalam pemberdayaan kesejahteraan keluarga dan kesehatan.',
                'isi' => 'Tim Penggerak Pemberdayaan dan Kesejahteraan Keluarga (TP-PKK) Desa Batu Belerang aktif menggerakkan 10 Program Pokok PKK demi terwujudnya keluarga yang beriman dan sejahtera.',
                'meta_json' => [],
            ],
            [
                'slug' => 'lembaga-karang-taruna',
                'kategori' => 'Lembaga Desa',
                'judul' => 'Karang Taruna Desa Batu Belerang',
                'subjudul' => 'Wadah pengembangan generasi muda desa di bidang olahraga, kebudayaan, sosial, dan wirausaha.',
                'isi' => 'Karang Taruna merupakan wadah pengembangan generasi muda yang tumbuh atas dasar kesadaran dan tanggung jawab sosial.',
                'meta_json' => [],
            ],
            [
                'slug' => 'lembaga-rt-rw',
                'kategori' => 'Lembaga Desa',
                'judul' => 'Lembaga RT & RW Desa Batu Belerang',
                'subjudul' => 'Garda terdepan pelayanan kemasyarakatan dan kerukunan warga di tingkat rukun tetangga dan rukun warga.',
                'isi' => 'Rukun Tetangga (RT) dan Rukun Warga (RW) membantu Pemerintah Desa dalam penyelenggaraan urusan pelayanan pemerintahan.',
                'meta_json' => [],
            ],
            [
                'slug' => 'lembaga-posyandu',
                'kategori' => 'Lembaga Desa',
                'judul' => 'Posyandu Terpadu Desa',
                'subjudul' => 'Pos Pelayanan Terpadu untuk kesehatan ibu, balita, lansia, dan penanganan stunting Desa Batu Belerang.',
                'isi' => 'Posyandu di Desa Batu Belerang diselenggarakan setiap bulan di masing-masing dusun bekerja sama dengan Bidan Desa.',
                'meta_json' => [],
            ],
            [
                'slug' => 'lembaga-bumdes',
                'kategori' => 'Lembaga Desa',
                'judul' => 'BUMDes Batu Belerang',
                'subjudul' => 'Badan Usaha Milik Desa pendorong kemandirian ekonomi, pengelolaan wisata, dan pemasaran produk lokal.',
                'isi' => 'BUMDes Batu Belerang mengelola sektor-sektor strategis ekonomi desa guna menambah Pendapatan Asli Desa (PADes).',
                'meta_json' => [],
            ],
        ];

        foreach ($pages as $page) {
            HalamanKonten::updateOrCreate(
                ['slug' => $page['slug']],
                $page
            );
        }
    }
}
