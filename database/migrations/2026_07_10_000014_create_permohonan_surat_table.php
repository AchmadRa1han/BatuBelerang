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
        Schema::create('permohonan_surat', function (Blueprint $table) {
            $table->id();

            $table->foreignId('penduduk_id')
                ->constrained('penduduk')
                ->cascadeOnDelete();

            $table->foreignId('jenis_surat_id')
                ->constrained('jenis_surat')
                ->restrictOnDelete();

            $table->json('data_formulir'); // Menyimpan isian kustom formulir surat (JSON)
            $table->enum('status', ['menunggu_persetujuan', 'disetujui', 'ditolak'])->default('menunggu_persetujuan');
            $table->text('catatan_admin')->nullable();

            $table->foreignId('disetujui_oleh_user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('disetujui_pada')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permohonan_surat');
    }
};
