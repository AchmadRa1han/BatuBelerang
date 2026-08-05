# Website Resmi Desa Batu Belerang (Babel)

[![Laravel Version](https://img.shields.io/badge/Laravel-v13.x-red.svg)](https://laravel.com)
[![React Version](https://img.shields.io/badge/React-v19.x-blue.svg)](https://react.dev)
[![Inertia.js Version](https://img.shields.io/badge/Inertia.js-v3.x-purple.svg)](https://inertiajs.com)
[![Tailwind CSS Version](https://img.shields.io/badge/Tailwind%20CSS-v4.x-38bdf8.svg)](https://tailwindcss.com)

Website Resmi Desa Batu Belerang merupakan platform portal digital desa modern yang dirancang untuk meningkatkan transparansi informasi, kependudukan, pariwisata lokal, ekonomi kreatif (UMKM), serta mempermudah layanan administrasi dan pengaduan bagi warga secara mandiri.

Aplikasi ini dibangun menggunakan arsitektur modern **Single Page Application (SPA)** berbasis **Laravel 13**, **Inertia.js v3**, dan **React 19**, dengan visual premium dari **Tailwind CSS v4** serta sentuhan animasi mikro yang halus menggunakan **Anime.js** dan **Motion**.

---

## 🛠️ Stack Teknologi

Sistem ini didesain menggunakan teknologi terkini untuk menjamin kinerja yang optimal, responsif, dan mudah dipelihara:

| Komponen | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Backend & API** | Laravel 13 & PHP 8.4 | Kerangka kerja backend yang tangguh, aman, dan berkinerja tinggi. |
| **Frontend Bridge** | Inertia.js v3 | Menghubungkan Laravel & React tanpa kerumitan membangun REST API terpisah. |
| **Frontend SPA** | React 19 & TypeScript | UI dinamis berkinerja tinggi berbasis komponen dengan tipe data yang ketat. |
| **Styling (CSS)** | Tailwind CSS v4 | Desain premium dengan glassmorphism, gradien modern, dan dark/light mode toggle. |
| **Visualisasi Data**| Recharts | Render grafik demografi kependudukan & APBDes yang interaktif. |
| **Peta Interaktif** | Leaflet JS | Menampilkan spot wisata, batas wilayah dusun, dan penginapan desa. |
| **Animasi Mikro**  | Anime.js & Motion | Tweening stats counter, cascading entrance, collapse/expand, dan scroll trigger. |
| **Database** | MySQL / MariaDB | Penyimpanan data relasional terstruktur untuk kependudukan & konten desa. |

---

## ⭐ Fitur-Fitur Unggulan

Platform ini dilengkapi dengan fitur-fitur berkelas premium guna memberikan pengalaman pengguna (UX) terbaik:

* **⚡ Navigasi Instan & Prefetching (Inertia v3)**
  Menggunakan fitur `prefetch` pada menu utama. Data halaman tujuan mulai diunduh di latar belakang saat kursor pengguna mendekati (*hover*) menu, sehingga perpindahan halaman terasa instan tanpa reload.
* **⏳ Deferred Props & Suspense Shimmer**
  Data kependudukan dan statistik yang berat dimuat secara asinkron (*deferred props*). Halaman utama termuat seketika dengan animasi *pulsing skeleton (shimmer)*, kemudian grafik *Recharts* akan ter-render otomatis setelah datanya selesai dimuat di latar belakang.
* **🗺️ Peta Interaktif Leaflet JS**
  Peta terpadu untuk memplot destinasi wisata desa serta akomodasi (*homestay/guesthouse*) secara visual menggunakan penanda (*marker*) kustom.
* **💹 Pasar Maya & Sistem Pemesanan WhatsApp**
  Etalase produk UMKM warga desa yang dilengkapi filter kategori dinamis, galeri masonry, dan tombol pemesanan langsung (*direct message*) ke nomor WhatsApp penjual.
* **🛏️ Booking Wisata & Penginapan Warga**
  Informasi lengkap spot wisata (tiket, rute, jam operasional) dan homestay warga dengan tombol reservasi instan via WhatsApp pengelola.
* **📨 Layanan Mandiri & Pengajuan Surat Mandiri**
  Warga dapat mengajukan permohonan surat administrasi (seperti Surat Pengantar, Keterangan Usaha, dll.) secara mandiri hanya dengan menggunakan kredensial **NIK + PIN**, mengurangi beban antrean di kantor desa.
* **📊 Panel Admin & Statistik Kependudukan Kaya Visual**
  Statistik demografis interaktif (berdasarkan Dusun, Usia, Pendidikan, Pekerjaan, Golongan Darah) yang dapat difilter secara multi-faceted. Didukung manajemen data penduduk yang mendukung **Bulk Import & Export via Excel/CSV**.
* **✨ Animasi Mikro Premium (Anime.js & Motion)**
  Menghidupkan antarmuka melalui efek *tweening* penghitung angka (stats counting up), tumpukan masuk kartu (staggered entrance), transisi lipatan menu (smooth height collapse), serta animasi berbasis scroll (scroll-triggered motion).

---

## 📂 Fitur Lengkap Website Desa

Website ini terbagi menjadi dua sisi utama: **Sisi Publik** (untuk Warga & Wisatawan) dan **Sisi Dashboard Admin** (untuk Perangkat & Operator Desa).

### A. Sisi Publik (Portal Warga & Wisatawan)

1. **Beranda Utama & Slider Potensi**
   * Visualisasi modern keindahan alam dan potensi air panas belerang Desa Batu Belerang.
   * Widget statistik cepat (Jumlah Penduduk, KK, Dusun, UMKM, Wisata) dengan efek counting up.
   * Transparansi APBDesa tahun berjalan secara grafis.
   * Kabar Desa Terbaru (Grid kartu berita estetik) dan Agenda Desa mendatang.
2. **Profil Desa Lengkap**
   * *Tentang Kami*: Gambaran umum wilayah administratif desa.
   * *Visi & Misi*: Arah pembangunan jangka panjang desa.
   * *Sejarah Desa*: Narasi sejarah berdirinya desa dilengkapi galeri arsip foto kuno.
   * *Geografis & Batas Wilayah*: Peta batas dusun, luas wilayah pertanian, pemukiman, dan kehutanan.
3. **Pemerintahan & Aparatur Desa**
   * Struktur Organisasi Pemerintah Desa.
   * Data Aparatur Desa (Nama, Jabatan, Foto, status aktif).
   * Akses dokumen RPJMDes dan pedoman Tata Kelola Desa.
4. **Kelembagaan Desa Dinamis**
   * Halaman khusus untuk BPD, PKK, Karang Taruna, LPM, RT-RW, Posyandu, dan BUMDes.
   * Setiap lembaga memuat: Deskripsi peran, Landasan Hukum pendirian, Tugas & Fungsi, Dokumentasi SK Keputusan (dapat diunduh dalam format PDF), serta Struktur Kepengurusan lengkap.
5. **Pasar Maya (Lapak UMKM Warga)**
   * Showcase produk kerajinan, kuliner khas, dan hasil bumi Desa Batu Belerang.
   * Pemesanan langsung terintegrasi WhatsApp penjual.
6. **Batu Belerang Tourism (Wisata & Akomodasi)**
   * Portal pariwisata lokal yang memetakan spot pemandian air belerang, air terjun, spot foto, dan homestay milik warga setempat.
7. **Layanan Mandiri Warga & Pengaduan**
   * Permohonan dokumen surat menggunakan login NIK + PIN.
   * Layanan pengaduan masyarakat (publik/anonim) untuk transparansi pengawasan pembangunan desa.

### B. Sisi Dashboard Admin (Manajemen & Operasional)

1. **Dashboard Utama (Executive Summary)**
   * Grafik pemantauan surat masuk, status pengaduan, kehadiran harian aparatur desa, dan pengajuan UMKM baru secara real-time.
2. **Manajemen Konten & CMS**
   * Pengelolaan Berita/Artikel Desa (Tulis, Edit, Publikasi, Draft).
   * Pengelolaan Halaman Dinamis (Profil, Geografis, Sejarah, Lembaga).
   * Publikasi Dokumen Regulasi Desa dan Agenda Kegiatan Desa.
3. **Manajemen Kependudukan (Master Data)**
   * CRUD data Dusun, Kartu Keluarga, dan Penduduk.
   * Fitur ekspor seluruh data penduduk ke format Excel dan import data penduduk secara bulk dari template spreadsheet.
4. **Moderasi Pasar Maya & Wisata**
   * Verifikasi kelayakan produk UMKM warga sebelum tayang di sisi publik (Optimistic Update approval).
   * Input spot pariwisata baru dan homestay yang terdaftar.
5. **Layanan Surat & Verifikasi**
   * Manajemen jenis surat dan templat formulir dinamis.
   * Verifikasi permohonan surat warga (Setujui / Tolak dengan catatan admin).
6. **Respon Pengaduan**
   * Penanganan aduan masuk dari warga, pelacakan proses tindak lanjut, dan pengiriman tanggapan resmi admin ke sistem pengaduan publik.

---

## 🚀 Panduan Instalasi & Pemasangan

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di lingkungan lokal Anda:

### Prasyarat (Prerequisites)
Pastikan komputer Anda sudah terinstal:
* PHP >= 8.4
* Composer
* Node.js >= 18 (disertai NPM / PNPM)
* Laragon atau XAMPP (dengan MySQL/MariaDB)

### Langkah Pemasangan

1. **Clone Repositori**
   ```bash
   git clone https://github.com/AchmadRa1han/BatuBelerang.git
   cd BatuBelerang
   ```

2. **Instalasi Dependensi PHP**
   ```bash
   composer install
   ```

3. **Instalasi Dependensi Frontend**
   ```bash
   npm install
   # atau jika menggunakan pnpm
   pnpm install
   ```

4. **Konfigurasi Lingkungan (`.env`)**
   Salin file konfigurasi contoh dan sesuaikan konfigurasi database Anda:
   ```bash
   copy .env.example .env
   # Kemudian buka .env dan isi DB_DATABASE, DB_USERNAME, DB_PASSWORD sesuai lokal Anda
   ```

5. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

6. **Migrasi Database & Seeding Data Awal**
   Jalankan migrasi untuk membuat tabel beserta data dummy awal untuk pengujian:
   ```bash
   php artisan migrate --seed
   ```

7. **Jalankan Server Lokal**
   Nyalakan server Laravel Artisan dan Vite bundling secara bersamaan:
   * **Terminal 1** (Laravel Dev Server):
     ```bash
     php artisan serve
     ```
   * **Terminal 2** (Vite Dev Server):
     ```bash
     npm run dev
     # atau
     pnpm dev
     ```

Akses website melalui browser di alamat default: `http://127.0.0.1:8000`.

---

## 🧼 Standardisasi Kode & Pint

Proyek ini menerapkan aturan penulisan kode PHP yang bersih dan terstandar. Sebelum mengirimkan perubahan (*commit*), pastikan untuk menjalankan **Laravel Pint** guna memformat file PHP Anda secara otomatis:

```bash
vendor/bin/pint --dirty --format agent
```

---

## 🗺️ Batas Wilayah & Dusun Terdaftar

Desa Batu Belerang terdiri atas beberapa dusun administratif yang terintegrasi secara dinamis dalam database kependudukan:
1. Dusun Bonto (Pusat Pemerintahan)
2. Dusun Belerang (Kawasan Destinasi Wisata Pemandian Air Panas Belerang)
3. Dusun Lembang (Kawasan Pertanian & Hortikultura)
4. Dusun Karampuang (Kawasan Budaya & Kesenian Lokal)
