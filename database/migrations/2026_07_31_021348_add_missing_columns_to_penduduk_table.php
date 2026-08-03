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
        Schema::table('kartu_keluarga', function (Blueprint $table) {
            $table->string('no_kk', 30)->change();
            $table->string('nik_kepala_keluarga', 30)->nullable()->change();
        });

        Schema::table('penduduk', function (Blueprint $table) {
            $table->string('nik', 30)->change();
            $table->string('status_perkawinan')->change();
            $table->string('hubungan')->nullable()->after('status_perkawinan');
            $table->string('kewarganegaraan')->nullable()->after('agama');
            $table->string('suku')->nullable()->after('kewarganegaraan');
            $table->string('pendidikan')->nullable()->after('suku');
            $table->string('pekerjaan')->nullable()->after('pendidikan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('penduduk', function (Blueprint $table) {
            $table->dropColumn(['hubungan', 'kewarganegaraan', 'suku', 'pendidikan', 'pekerjaan']);
            $table->string('nik', 16)->change();
            $table->enum('status_perkawinan', ['belum_kawin', 'kawin', 'cerai_hidup', 'cerai_mati'])->change();
        });

        Schema::table('kartu_keluarga', function (Blueprint $table) {
            $table->string('no_kk', 16)->change();
            $table->string('nik_kepala_keluarga', 16)->change();
        });
    }
};
