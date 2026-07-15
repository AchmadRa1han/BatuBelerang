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
        Schema::create('anggota_kelompok', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelompok_warga_id')
                ->constrained('kelompok_warga')
                ->cascadeOnDelete();
            $table->foreignId('penduduk_id')
                ->constrained('penduduk')
                ->cascadeOnDelete();
            $table->string('jabatan')->default('Anggota');
            $table->date('tanggal_bergabung')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggota_kelompok');
    }
};
