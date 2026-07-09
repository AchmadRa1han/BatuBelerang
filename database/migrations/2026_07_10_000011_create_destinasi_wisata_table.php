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
        Schema::create('destinasi_wisata', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('slug')->unique();
            $table->text('deskripsi');
            $table->decimal('harga_tiket', 10, 2)->default(0.00);
            $table->string('koordinat_lokasi'); // Lat, Long GPS
            $table->text('alamat');
            $table->string('jam_operasional');
            $table->string('foto_sampul_path');
            $table->json('galeri_foto'); // Menyimpan array path foto galeri
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('destinasi_wisata');
    }
};
