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
        Schema::create('anggaran_apbdes', function (Blueprint $table) {
            $table->id();
            $table->year('tahun');
            $table->enum('jenis', ['pendapatan', 'belanja', 'pembiayaan']);
            $table->string('kategori'); // e.g. Dana Desa, Bidang Pembangunan, dsb.
            $table->decimal('jumlah_anggaran', 12, 2);
            $table->decimal('jumlah_realisasi', 12, 2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggaran_apbdes');
    }
};
