<?php

namespace Database\Seeders;

use App\Models\AnggaranApbdes;
use App\Models\AparaturDesa;
use App\Models\BeritaDesa;
use App\Models\ProfilDesa;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class HomepageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Profil Desa
        ProfilDesa::updateOrCreate(
            ['id' => 1],
            [
                'nama_desa' => 'Batu Belerang',
                'nama_kecamatan' => 'Sinjai Borong',
                'nama_kabupaten' => 'Sinjai',
                'nama_provinsi' => 'Sulawesi Selatan',
                'sejarah' => 'Desa Batu Belerang memiliki sejarah panjang dalam pengembangan kawasan pemandian air panas alami dan keindahan potensi alam pegunungan yang asri.',
                'visi' => 'Terwujudnya Desa Batu Belerang yang Mandiri, Sejahtera, Berdaya Saing, dan Berbasis Potensi Wisata Alami serta Pertanian Berkelanjutan.',
                'misi' => [
                    'Meningkatkan kualitas pelayanan publik berbasis teknologi informasi.',
                    'Mengembangkan potensi pariwisata pemandian air panas belerang secara profesional.',
                    'Meningkatkan pemberdayaan ekonomi warga melalui perkuatan UMKM desa.',
                ],
                'alamat_kantor' => 'Jl. Poros Biji Nangka - Batu Belerang, Kec. Sinjai Borong',
                'telepon' => '(0482) 123-4567',
                'email' => 'pemdes@batubelerang.desa.id',
                'nama_kades' => 'H. Ahmad Supardi, S.Sos',
                'jabatan_kades' => 'Kepala Desa Batu Belerang',
                'sambutan_kades' => 'Selamat datang di website resmi Desa Batu Belerang. Kami berkomitmen menyajikan pelayanan publik yang transparan, mudah, dan akuntabel demi kemajuan seluruh masyarakat desa.',
                'foto_kades' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
                'hero_title' => 'Desa Batu Belerang',
                'hero_subtitle' => 'Kecamatan Sinjai Borong, Kabupaten Sinjai, Provinsi Sulawesi Selatan',
                'hero_bg_path' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=80',
            ]
        );

        // 2. Aparatur Desa
        $aparaturData = [
            ['nama' => 'Sulaeman', 'jabatan' => 'Sekretaris Desa', 'foto_path' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80', 'urutan' => 1],
            ['nama' => 'Sadar Syam, S.Pd', 'jabatan' => 'Kepala Seksi Pemerintahan', 'foto_path' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80', 'urutan' => 2],
            ['nama' => 'Hartati', 'jabatan' => 'Kepala Seksi Pelayanan', 'foto_path' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80', 'urutan' => 3],
            ['nama' => 'Lukman, S.Pd', 'jabatan' => 'Kepala Seksi Kesejahteraan', 'foto_path' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', 'urutan' => 4],
            ['nama' => 'Kartini, S.Pd', 'jabatan' => 'Kepala Urusan Tata Usaha dan Umum', 'foto_path' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', 'urutan' => 5],
            ['nama' => 'Fitriani', 'jabatan' => 'Kepala Urusan Keuangan', 'foto_path' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', 'urutan' => 6],
            ['nama' => 'Nirmawati, SP', 'jabatan' => 'Kepala Urusan Perencanaan', 'foto_path' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80', 'urutan' => 7],
            ['nama' => 'Muh. Darwis', 'jabatan' => 'Kepala Dusun Jeppara', 'foto_path' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', 'urutan' => 8],
            ['nama' => 'Aditya Saputra', 'jabatan' => 'Kepala Dusun Bontoe', 'foto_path' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80', 'urutan' => 9],
            ['nama' => 'Muh. Tahir', 'jabatan' => 'Kepala Dusun Kalimbu', 'foto_path' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80', 'urutan' => 10],
            ['nama' => 'Ahmad', 'jabatan' => 'Kepala Dusun Mattirotasi', 'foto_path' => 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80', 'urutan' => 11],
        ];

        foreach ($aparaturData as $item) {
            AparaturDesa::updateOrCreate(
                ['nama' => $item['nama']],
                array_merge($item, ['status' => true])
            );
        }

        // 3. Berita Desa
        $beritaData = [
            [
                'judul' => 'Peresmian Kolam Rendam Air Panas Belerang Baru',
                'kategori' => 'Pariwisata',
                'ringkasan' => 'Pemerintah Desa meresmikan kawasan baru fasilitas pemandian air panas belerang yang dilengkapi dengan kolam rendam keluarga dan gazebo bersantai.',
                'isi' => 'Pemerintah Desa Batu Belerang meresmikan kawasan baru fasilitas pemandian air panas belerang yang dilengkapi fasilitas umum modern...',
                'foto_path' => 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-07-09',
                'is_headline' => true,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Penyaluran Bantuan Langsung Tunai (BLT) Tahap Kedua Sukses Terlaksana',
                'kategori' => 'Kesejahteraan Warga',
                'ringkasan' => 'Sebanyak 78 keluarga penerima manfaat di seluruh dusun menerima penyaluran bantuan tunai guna mendukung perekonomian lokal.',
                'isi' => 'Penyaluran BLT Dana Desa tahap kedua telah sukses direalisasikan di Aula Kantor Desa dengan pengawasan ketat pendamping desa...',
                'foto_path' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-07-07',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) TA 2027',
                'kategori' => 'Pemerintahan',
                'ringkasan' => 'Warga berkumpul mendiskusikan rencana pembangunan infrastruktur jalan tani dan perluasan jangkauan air bersih.',
                'isi' => 'Musrenbangdes TA 2027 dihadiri oleh tokoh masyarakat, perwakilan BPD, Karang Taruna, dan aparatur pemerintah desa...',
                'foto_path' => 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-07-02',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Kunjungan Kerja Tim Penggerak PKK Kabupaten Sinjai ke Desa Batu Belerang',
                'kategori' => 'Kelembagaan',
                'ringkasan' => 'Peninjauan program ketahanan pangan keluarga dan pelatihan kerajinan bambu khas warga desa.',
                'isi' => 'Tim Penggerak PKK melakukan peninjauan kebun ketahanan pangan dan mengapresiasi inovasi ibu-ibu PKK desa...',
                'foto_path' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-06-28',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Pelatihan Digitalisasi Produk UMKM Pertanian & Olahan Hasil Alami',
                'kategori' => 'Ekonomi UMKM',
                'ringkasan' => 'Pelaku usaha lokal dilatih memasarkan produk kopi olahan dan buah markisa secara digital di marketplace.',
                'isi' => 'Dinas Koperasi dan UMKM bekerja sama dengan Pemdes mengadakan workshop pemasaran digital bagi puluhan perajin...',
                'foto_path' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-06-22',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Kerja Bakti Masal Membersihkan Saluran Irigasi Persawahan Dusun',
                'kategori' => 'Gotong Royong',
                'ringkasan' => 'Ratusan petani bersama aparatur desa bahu-membahu merapikan saluran air jelang musim tanam padi.',
                'isi' => 'Aksi gotong royong serentak di 4 dusun berhasil membersihkan sepanjang 2 km saluran irigasi utama persawahan...',
                'foto_path' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-06-18',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Pemeriksaan Kesehatan Gratis & Pembagian Vitamin untuk Lansia',
                'kategori' => 'Kesehatan',
                'ringkasan' => 'Pemerintah desa bekerja sama dengan Puskesmas menggelar posyandu integrasi rutin di kantor desa.',
                'isi' => 'Layanan kesehatan gratis meliputi cek gula darah, kolesterol, dan konsultasi dokter diikuti 120 warga lansia...',
                'foto_path' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-06-12',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Pengembangan Destinasi Wisata Air Terjun Lembang Sauk',
                'kategori' => 'Pariwisata',
                'ringkasan' => 'Pemerintah Desa menata jalur trekking dan memasang wahana spot foto baru di sekeliling kawasan wisata air terjun.',
                'isi' => 'Pengembangan sarana prasana wisata air terjun Lembang Sauk terus dipacukan guna meningkatkan daya tarik pengunjung...',
                'foto_path' => 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-06-05',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Sosialisasi Program Desa Digital & Pemanfaatan Aplikasi Mandiri',
                'kategori' => 'Pemerintahan',
                'ringkasan' => 'Aparatur desa mensosialisasikan tata cara pengajuan surat secara daring lewat platform portal desa.',
                'isi' => 'Kegiatan sosialisasi aplikasi digital dihadiri para kepala dusun dan ketua RT untuk mempermudah pelayanan warga...',
                'foto_path' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-05-29',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Pembentukan Karang Taruna "Batu Belerang Bangkit" Periode 2026-2029',
                'kategori' => 'Kelembagaan',
                'ringkasan' => 'Generasi muda desa secara mufakat memilih kepengurusan baru Karang Taruna untuk memperkuat pemuda kreatif.',
                'isi' => 'Musyawarah pemuda desa sukses menetapkan susunan pengurus baru Karang Taruna yang siap memajukan kegiatan kepemudaan...',
                'foto_path' => 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-05-20',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Pelatihan Budidaya Ikan Nila & Lele untuk Kelompok Tani Mandiri',
                'kategori' => 'Ekonomi UMKM',
                'ringkasan' => 'Dinas Perikanan memberikan bantuan bibit ikan nila dan pelatihan pakan organik kepada 4 kelompok tani desa.',
                'isi' => 'Program pemberdayaan sektor perikanan darat bertujuan meningkatkan konsumsi gizi dan nilai jual hasil budidaya...',
                'foto_path' => 'https://images.unsplash.com/photo-1534951009808-7d6105b81a4c?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-05-14',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Pemasangan Penerangan Jalan Umum (PJU) Tenaga Surya di Dusun Bontoe',
                'kategori' => 'Pemerintahan',
                'ringkasan' => 'Sebanyak 30 unit lampu jalan solar cell telah terpasang di sepanjang jalan poros dusun guna keamanan warga.',
                'isi' => 'Pemasangan lampu penerangan jalan umum berbasis tenaga surya direalisasikan mengggunakan alokasi dana desa...',
                'foto_path' => 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-05-08',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Peringatan Hari Kemerdekaan RI di Lapangan Sepak Bola Desa Batu Belerang',
                'kategori' => 'Kelembagaan',
                'ringkasan' => 'Berbagai perlombaan rakyat seperti panjat pinang, sepak bola antar-dusun, dan pentas seni meriah diselenggarakan.',
                'isi' => 'Semarak pesta rakyat dalam rangka menyambut Hari Kemerdekaan mempererat silaturahmi antar warga di 4 dusun...',
                'foto_path' => 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-04-30',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Penanaman 1.000 Bibit Pohon Pelindung & Buah di Kawasan Sumber Air',
                'kategori' => 'Gotong Royong',
                'ringkasan' => 'Masyarakat bersama mahasiswa KKN menggelar aksi hijau penanaman pohon untuk menjaga kelestarian sumber mata air.',
                'isi' => 'Aksi konservasi lingkungan hidup berhasil menanam bibit pohon durian, alpukat, dan mahoni di hulu sungai desa...',
                'foto_path' => 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-04-22',
                'is_headline' => false,
                'status' => 'terbit',
            ],
            [
                'judul' => 'Penyuluhan Pencegahan Stunting & Pembagian Makanan Tambahan Balita',
                'kategori' => 'Kesehatan',
                'ringkasan' => 'Kader Posyandu dan Bidan Desa memberikan makanan bergizi serta edukasi pola asuh seimbang bagi ibu hamil.',
                'isi' => 'Upaya percepatan penurunan angka stunting dilakukan melalui pemberian MP-ASI dan vitamin berkala...',
                'foto_path' => 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=60',
                'tanggal_publikasi' => '2026-04-15',
                'is_headline' => false,
                'status' => 'terbit',
            ],
        ];

        foreach ($beritaData as $item) {
            BeritaDesa::updateOrCreate(
                ['judul' => $item['judul']],
                array_merge($item, ['slug' => Str::slug($item['judul'])])
            );
        }

        // 4. Anggaran APBDesa
        $apbdesItems = [
            ['tahun' => 2026, 'jenis' => 'pendapatan', 'kategori' => 'Pendapatan Desa', 'jumlah_anggaran' => 1200000000.00, 'jumlah_realisasi' => 980000000.00],
            ['tahun' => 2026, 'jenis' => 'belanja', 'kategori' => 'Belanja Desa', 'jumlah_anggaran' => 1150000000.00, 'jumlah_realisasi' => 720000000.00],
            ['tahun' => 2026, 'jenis' => 'pembiayaan', 'kategori' => 'Pembiayaan Desa', 'jumlah_anggaran' => 50000000.00, 'jumlah_realisasi' => 50000000.00],
        ];

        foreach ($apbdesItems as $item) {
            AnggaranApbdes::updateOrCreate(
                ['tahun' => $item['tahun'], 'jenis' => $item['jenis']],
                $item
            );
        }
    }
}
