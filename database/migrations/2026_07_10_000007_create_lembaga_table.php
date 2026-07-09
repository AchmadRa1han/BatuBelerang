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
        Schema::create('lembaga', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique(); // e.g. BPD, PKK, KRT
            $table->string('nama');
            $table->longText('deskripsi');
            $table->text('landasan_hukum');
            $table->longText('fungsi');
            $table->longText('tugas');
            $table->string('nomor_sk')->nullable();
            $table->string('file_sk_path')->nullable();
            $table->string('logo_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lembaga');
    }
};
