# Rancangan & Implementasi Skeletal Loading

Dokumen ini berfungsi sebagai referensi desain dan implementasi untuk **Skeletal Loading** (Shimmer Skeleton) terpadu di Website Resmi Desa Batu Belerang. Rancang bangun ini menggantikan transisi overlay penuh yang konvensional dengan visualisasi tata letak halaman sementara (*skeleton layout*) yang selaras dengan halaman tujuan pengguna menggunakan **React 19**, **Tailwind CSS v4**, dan **Motion**.

---

## 1. Fitur Utama

### A. Deteksi Rute Pintar (Smart Route Detection)
* **Deskripsi**: Sistem mendeteksi halaman tujuan navigasi secara *real-time* ketika event `start` dari Inertia dipicu.
* **Mekanisme**:
  * Mengambil objek URL dari kunjungan Inertia (`event.detail.visit.url`).
  * Mengekstrak properti `pathname` untuk menentukan jenis *skeleton* yang cocok.
  * Membagi tampilan menjadi dua jenis kerangka utama:
    1. **Public Layout Skeleton**: Untuk rute beranda publik (`/`).
    2. **Sidebar Layout Skeleton**: Untuk rute dashboard, pengaturan, dan admin (`/dashboard`, `/settings/*`, `/debug/*`).

### B. Animasi Shimmer Efek Berdenyut (Pulse & Shimmer Animation)
* **Deskripsi**: Setiap elemen di dalam kerangka kerja (skeleton) dirancang agar memiliki efek berdenyut halus (`animate-pulse`) dengan warna latar belakang abu-abu adaptif (`bg-slate-200` di mode terang dan `bg-slate-800` di mode gelap).
* **Efek Gradasi Bergerak**: Menambahkan gradasi horizontal bergerak (shimmer) menggunakan animasi CSS murni untuk mensimulasikan pemuatan yang dinamis dan modern.

### C. Mencegah Interaksi Ganda (Overlay Intercept)
* **Deskripsi**: Meskipun menampilkan representasi kerangka kerja halaman tujuan di layar penuh, kerangka kerja ini dilapisi dengan *invisible/semi-transparent interceptor* untuk memblokir klik ganda atau interaksi lain selama data halaman dimuat dari server.

---

## 2. Struktur Skeleton Layouts

### A. Public Layout Skeleton (Home / Welcome)
Menggambarkan struktur halaman [welcome.tsx](file:///C:/laragon/www/Babel/resources/js/pages/welcome.tsx):
1. **Header**: Kotak logo kecil, 4 baris menu navigasi horizontal (nav items), tombol tema, dan tombol masuk.
2. **Hero Banner Area**:
   - Badge info desa (pulsing rounded-full).
   - Baris headline besar (dua baris tebal).
   - Baris deskripsi sub-headline.
   - Dua buah tombol berdampingan.
3. **Widget Cuaca & Shalat**: Kotak lebar memanjang dengan rounded-2xl.
4. **Data Demografi**: Grid 3 kolom dengan visualisasi lingkaran dan grafik batang abu-abu.
5. **Kabar Berita Desa**: Grid 3 kolom kartu berita (masing-masing memiliki wadah gambar, tanggal, judul, dan ringkasan).

### B. Sidebar Layout Skeleton (Dashboard / Settings / Debug)
Menggambarkan struktur [app-sidebar-layout.tsx](file:///C:/laragon/www/Babel/resources/js/layouts/app/app-sidebar-layout.tsx):
1. **Sidebar (Kiri)**: Kotak logo sidebar, 5 tautan navigasi vertikal, dan panel profil user di bagian bawah.
2. **Header Konten (Atas)**: Breadcrumb skeleton, tombol toggle tema, dan lingkaran avatar pengguna.
3. **Area Konten Utama**:
   - Judul halaman (kotak teks sedang).
   - Grid 3 kolom stats cards.
   - Layout dua kolom lebar (kotak utama + widget samping).

---

## 3. Integrasi Global

Sama halnya dengan loading screen lama, kerangka pemuatan global ini diletakkan pada pembungkus utama di [app.tsx](file:///C:/laragon/www/Babel/resources/js/app.tsx) dan dipicu oleh event `router.on('start')` dan `router.on('finish')` dari Inertia.js v3.

Untuk mencegah kedipan (flickering) pada koneksi yang sangat cepat, kerangka kerja ini akan muncul jika proses pemuatan data dari server memakan waktu lebih dari **150ms**.
