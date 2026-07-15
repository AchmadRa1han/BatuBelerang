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
        Schema::create('pengaduan', function (Blueprint $table) {
            $table->id();

            $table->foreignId('penduduk_id')
                ->nullable()
                ->constrained('penduduk')
                ->nullOnDelete();

            $table->string('judul');
            $table->text('isi');
            $table->string('foto_path')->nullable();
            $table->boolean('is_anonim')->default(false);
            $table->enum('status', ['terkirim', 'diproses', 'selesai'])->default('terkirim');
            $table->text('tanggapan_admin')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaduan');
    }
};
