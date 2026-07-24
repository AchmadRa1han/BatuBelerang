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
        Schema::create('halaman_kontens', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('kategori');
            $table->string('judul');
            $table->string('subjudul')->nullable();
            $table->longText('isi')->nullable();
            $table->json('meta_json')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('halaman_kontens');
    }
};
