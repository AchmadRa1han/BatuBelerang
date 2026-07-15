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
        Schema::create('anggota_lembaga', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lembaga_id')
                ->constrained('lembaga')
                ->cascadeOnDelete();

            $table->foreignId('penduduk_id')
                ->constrained('penduduk')
                ->cascadeOnDelete();

            $table->string('jabatan'); // e.g. Ketua, Sekretaris, Anggota
            $table->year('periode_mulai');
            $table->year('periode_selesai');
            $table->string('nomor_sk_individu')->nullable();
            $table->string('foto_path')->nullable();
            $table->enum('status', ['aktif', 'non_aktif'])->default('aktif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggota_lembaga');
    }
};
