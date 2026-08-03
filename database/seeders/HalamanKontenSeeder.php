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
                'subjudul' => 'Gambaran umum kawasan perkebunan, perbukitan, dan kelembagaan Desa Batu Belerang, Kecamatan Sinjai Borong.',
                'isi' => 'Desa Batu Belerang terletak di wilayah Kecamatan Sinjai Borong, Kabupaten Sinjai, Provinsi Sulawesi Selatan. Desa ini berada di daerah dataran tinggi dan kawasan pegunungan yang memiliki udara sejuk serta keindahan panorama alam yang masih asri. Secara topografi, wilayah desa berupa perkebunan dan perbukitan yang berada pada ketinggian antara 900 M hingga 1400 M di atas permukaan laut dengan suhu rata-rata 25°C - 30°C.',
                'meta_json' => [
                    'potensi' => [
                        'Kawasan Agraris Subur: Mayoritas masyarakat bekerja di sektor pertanian dan perkebunan karena tanahnya yang subur di dataran tinggi.',
                        'Sumber Daya Manusia Memadai: Tingkat pendidikan masyarakat cukup tinggi, didukung kesadaran pendidikan yang terus meningkat.',
                        'Sarana Prasarana Lengkap: Memiliki 6 sarana pendidikan dasar & menengah, 5 sarana peribadatan, 5 sarana kesehatan (termasuk 4 Posyandu), dan 59 lembaga kemasyarakatan aktif.',
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
                'subjudul' => 'Asal usul penamaan, rekam jejak pembangunan, dan periodisasi kepemimpinan Desa Batu Belerang.',
                'isi' => "Sejak beberapa tahun yang lalu, ketika Sinjai Borong masih menjadi perwakilan Kecamatan Sinjai Barat, nama Batu Belerang sudah digunakan. Pemberi nama Desa Batu Belerang adalah A. Muh. Saleh.\n\nPada mulanya, wilayah desa ini hanya terdiri dari 3 dusun utama yaitu Dusun Kalimbu, Dusun Bontoe, dan Dusun Tajjuru, di bawah kepemimpinan Kepala Desa pertama, Mahmud, dari tahun 1960 hingga 1970.\n\nSeiring pesatnya laju kependudukan, atas inisiatif pemerintah desa bersama tokoh masyarakat, diadakan musyawarah pemekaran wilayah dusun pada tahun 1990 di bawah kepemimpinan Kepala Desa A. Ambo Tang. Musyawarah tersebut menyepakati pemekaran dari 3 dusun awal menjadi 7 dusun baru, dengan rincian:\n- Dusun Bontoe dibagi menjadi 2 dusun (salah satunya berkembang menjadi Dusun Jeppara).\n- Dusun Kalimbu dibagi menjadi 2 dusun (salah satunya berkembang menjadi Dusun Maccini).\n- Dusun Tajjuru dibagi menjadi 3 dusun (termasuk Dusun Pattiroang dan Dusun Balantieng).\n\nPada tahun 1998, diselenggarakan Pemilihan Kepala Desa (Pilkades) yang dimenangkan oleh M. Ali Hasan.\n\nMemasuki tahun 2002, BPD bersama tokoh masyarakat berinisiatif memekarkan kembali wilayah administratif dengan membentuk Desa Persiapan Bonto Tengnga pada bulan April 2002, yang kemudian resmi disahkan menjadi Desa Definitif pada bulan Juni 2002. Akibat dari pemekaran ini, Desa Batu Belerang memperbaharui tata kepengurusan pemerintahannya dengan menyisakan 4 dusun definitif yang ada hingga hari ini, yakni Dusun Jeppara, Dusun Bontoe, Dusun Kalimbu, dan Dusun Mattirotasi.\n\nSelanjutnya, sejak tahun 2015 sampai sekarang, kepemimpinan Pemerintah Desa Batu Belerang diamanahkan kepada Ahmad P yang menjabat selama 2 periode.",
                'meta_json' => [
                    'periodisasi' => [
                        ['periode' => '1960 - 1970', 'judul' => 'Mahmud', 'deskripsi' => 'Kepala Desa Definitif'],
                        ['periode' => '1970 - 1972', 'judul' => 'Baso Burhan', 'deskripsi' => 'Kepala Desa Definitif'],
                        ['periode' => '1972 - 1978', 'judul' => 'Muh. Jafar Sudja', 'deskripsi' => 'Kepala Desa Definitif'],
                        ['periode' => '1978 - 1986', 'judul' => 'Ambo Sakka', 'deskripsi' => 'Kepala Desa Definitif'],
                        ['periode' => '1987 - 1995', 'judul' => 'Ambo Tang', 'deskripsi' => 'Kepala Desa Definitif'],
                        ['periode' => '1995 - 1998', 'judul' => 'Pejabat Sementara', 'deskripsi' => 'Pjs Kepala Desa'],
                        ['periode' => '1998 - 2014', 'judul' => 'M. Ali Hasan', 'deskripsi' => 'Kepala Desa Definitif'],
                        ['periode' => '2014 - 2015', 'judul' => 'Abdul Salam', 'deskripsi' => 'Pjs Kepala Desa'],
                        ['periode' => '2015 - 2021', 'judul' => 'Ahmad P', 'deskripsi' => 'Kepala Desa Definitif'],
                        ['periode' => '2021 - 2022', 'judul' => 'Abdul Salam', 'deskripsi' => 'Pjs Kepala Desa'],
                        ['periode' => '2022 - Sekarang', 'judul' => 'Ahmad P', 'deskripsi' => 'Kepala Desa Definitif'],
                    ],
                ],
            ],
            [
                'slug' => 'profil-geografis-desa',
                'kategori' => 'Profil Desa',
                'judul' => 'Geografis & Peta Wilayah Desa',
                'subjudul' => 'Batas wilayah, luas wilayah, topografi perbukitan, orbitasi, dan sarana prasarana Desa Batu Belerang.',
                'isi' => "Desa Batu Belerang memiliki luas wilayah 3.446,65 Ha. Secara topografi dan kontur tanah, Desa Batu Belerang secara umum berupa perkebunan dan perbukitan yang berada pada ketinggian antara 900 M s/d 1400 M di atas permukaan laut dengan suhu rata-rata berkisar antara 25°C s/d 30°C.\n\nOrbitasi dan waktu tempuh:\n- Dari ibukota kecamatan: 6 Km dengan waktu tempuh 15 menit.\n- Dari ibukota kabupaten: 48 Km dengan waktu tempuh 1,5 jam.",
                'meta_json' => [
                    'batas' => [
                        'utara' => 'Desa Barambang',
                        'selatan' => 'Desa Bonto Tengnga dan Kabupaten Bulukumba',
                        'timur' => 'Desa Biji Nangka dan Desa Bonto Sinala',
                        'barat' => 'Kabupaten Gowa',
                    ],
                    'dusun' => ['Dusun Jeppara', 'Dusun Bontoe', 'Dusun Kalimbu', 'Dusun Mattirotasi'],
                    'luas_wilayah' => '3.446,65 Ha',
                    'ketinggian' => '900 - 1400 mdpl',
                    'suhu' => '25°C - 30°C',
                    'sarana' => [
                        'Pendidikan' => '2 PAUD, 1 TK, 2 SD/Madrasah, 1 SMA (Total 6)',
                        'Peribadatan' => '4 Masjid, 1 Musholla (Total 5)',
                        'Kesehatan' => '1 Pustu, 4 Posyandu (Total 5)',
                        'Lembaga' => '1 LPM, 1 PKK, 1 Karang Taruna, 1 PKBM, 1 BPD, 1 BKM, 1 KPM, 4 Remaja Masjid, 10 P3A, 28 Kelompok Tani, 1 KIM, 1 Kadarkum (Total 59)',
                    ],
                ],
            ],
            [
                'slug' => 'profil-demografi-desa',
                'kategori' => 'Profil Desa',
                'judul' => 'Demografi & Data Penduduk',
                'subjudul' => 'Statistik sebaran penduduk per dusun, mata pencaharian, dan tingkat pendidikan Desa Batu Belerang.',
                'isi' => "Penduduk Desa Batu Belerang tercatat sebanyak 2.141 Jiwa yang terdiri dari 1.116 laki-laki dan 1.025 perempuan dengan jumlah Kepala Keluarga sebanyak 688 KK.\n\nHampir seluruh masyarakat bekerja di sektor pertanian dan perkebunan sebagai daerah agraris.",
                'meta_json' => [
                    'penduduk' => '2.141 Jiwa',
                    'kk' => '688 KK',
                    'laki' => '1.116 Jiwa',
                    'perempuan' => '1.025 Jiwa',
                    'sebaran_dusun' => [
                        ['dusun' => 'Jeppara', 'kk' => 239, 'l' => 384, 'p' => 350, 'total' => 734],
                        ['dusun' => 'Bontoe', 'kk' => 320, 'l' => 366, 'p' => 328, 'total' => 694],
                        ['dusun' => 'Kalimbu', 'kk' => 123, 'l' => 210, 'p' => 197, 'total' => 407],
                        ['dusun' => 'Mattirotasi', 'kk' => 96, 'l' => 156, 'p' => 150, 'total' => 306],
                    ],
                    'pekerjaan' => [
                        ['pekerjaan' => 'Petani', 'jumlah' => 679],
                        ['pekerjaan' => 'Guru', 'jumlah' => 53],
                        ['pekerjaan' => 'PNS (Pegawai Negeri Sipil)', 'jumlah' => 30],
                        ['pekerjaan' => 'Tukang Batu', 'jumlah' => 26],
                        ['pekerjaan' => 'Tukang Kayu', 'jumlah' => 20],
                        ['pekerjaan' => 'Pedagang', 'jumlah' => 10],
                        ['pekerjaan' => 'Bidan/Perawat', 'jumlah' => 6],
                        ['pekerjaan' => 'Sopir', 'jumlah' => 6],
                        ['pekerjaan' => 'TNI / POLRI', 'jumlah' => 4],
                        ['pekerjaan' => 'Perbengkelan', 'jumlah' => 4],
                        ['pekerjaan' => 'Penjahit', 'jumlah' => 3],
                    ],
                    'pendidikan' => [
                        ['pendidikan' => 'Tidak Tamat SD', 'jumlah' => 124],
                        ['pendidikan' => 'Tamat SD', 'jumlah' => 378],
                        ['pendidikan' => 'Tamat SLTP', 'jumlah' => 174],
                        ['pendidikan' => 'Tamat SLTA', 'jumlah' => 190],
                        ['pendidikan' => 'Tamat Perguruan Tinggi', 'jumlah' => 65],
                    ],
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
