<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produk_umkm', function (Blueprint $table) {
            $table->id();

            $table->foreignId('penduduk_id')
                ->constrained('penduduk')
                ->cascadeOnDelete();

            $table->foreignId('kategori_umkm_id')
                ->constrained('kategori_umkm')
                ->restrictOnDelete();

            $table->string('nama');
            $table->string('slug')->unique();
            $table->text('deskripsi');
            $table->decimal('harga', 10, 2);
            $table->integer('stok')->default(0);
            $table->string('nomor_whatsapp');
            $table->string('foto_path');
            $table->enum('status', ['menunggu_verifikasi', 'aktif', 'non_aktif'])->default('menunggu_verifikasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produk_umkm');
    }
};
