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
        Schema::create('regulasi', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->enum('jenis', ['perdes', 'perkades', 'sk_kades', 'instruksi']);
            $table->year('tahun');
            $table->string('nomor');
            $table->text('deskripsi')->nullable();
            $table->string('file_path')->nullable();
            $table->boolean('status')->default(true); // true = aktif, false = tidak aktif
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('regulasi');
    }
};
