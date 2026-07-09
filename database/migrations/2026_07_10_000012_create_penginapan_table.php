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
        Schema::create('penginapan', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('destinasi_wisata_id')
                ->constrained('destinasi_wisata')
                ->cascadeOnDelete();
                
            $table->foreignId('pemilik_penduduk_id')
                ->nullable()
                ->constrained('penduduk')
                ->nullOnDelete();
                
            $table->string('nama');
            $table->enum('tipe', ['homestay', 'guest_house', 'villa', 'cottage']);
            $table->text('deskripsi');
            $table->decimal('harga_per_malam', 10, 2);
            $table->integer('kapasitas');
            $table->json('fasilitas'); // Menyimpan array fasilitas (e.g. WiFi, AC)
            $table->text('alamat');
            $table->string('whatsapp_booking');
            $table->string('foto_sampul_path');
            $table->json('galeri_foto');
            $table->boolean('is_tersedia')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penginapan');
    }
};
