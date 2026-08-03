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
        Schema::create('penduduk', function (Blueprint $table) {
            $table->id();
            $table->string('nik', 16)->unique();
            $table->string('nama');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('golongan_darah', ['A', 'B', 'AB', 'O', '-']);
            $table->string('agama');

            $table->enum('status_perkawinan', ['belum_kawin', 'kawin', 'cerai_hidup', 'cerai_mati']);

            $table->foreignId('kartu_keluarga_id')
                ->nullable()
                ->constrained('kartu_keluarga')
                ->nullOnDelete();

            $table->foreignId('dusun_id')
                ->constrained('dusun')
                ->restrictOnDelete();

            $table->string('rt', 3);
            $table->string('rw', 3);
            $table->text('alamat');
            $table->enum('status_warga', ['aktif', 'pindah', 'meninggal'])->default('aktif');

            $table->boolean('is_hamil')->default(false);
            $table->boolean('is_stunting')->default(false);
            $table->boolean('is_disabilitas')->default(false);
            $table->string('jenis_disabilitas')->nullable();
            $table->boolean('is_penerima_bansos')->default(false);
            $table->timestamps();
        });

        // Menyelesaikan dependensi siklik dengan menambahkan foreign key di tabel dusun
        Schema::table('dusun', function (Blueprint $table) {
            $table->foreign('kepala_dusun_id')
                ->references('id')
                ->on('penduduk')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dusun', function (Blueprint $table) {
            $table->dropForeign(['kepala_dusun_id']);
        });

        Schema::dropIfExists('penduduk');
    }
};
