# Arsitektur & Teknologi Stack Website Desa Batu Belerang

Dokumen ini menjelaskan arsitektur sistem, teknologi pendukung, serta pustaka (library) utama yang digunakan dalam pengembangan Website Resmi Desa Batu Belerang.

---

## Detail Teknologi Stack

* **Backend & API**: Laravel 13 (PHP 8.4)
* **Frontend SPA**: Inertia.js v3 + React 19 (TypeScript)
* **Styling (CSS)**: Tailwind CSS v4 (Sleek dark/light mode, micro-animations, glassmorphism)
* **Database**: MySQL / MariaDB (Kompatibel dengan Laragon lokal)
* **Library Utama Frontend**:
  * `lucide-react` (Icons)
  * `recharts` (Visualisasi grafik demografi & APBDesa)
  * `sonner` (Toast notifications)
  * `leaflet` (Peta lokasi spot wisata, penginapan, dan batas wilayah dusun)
