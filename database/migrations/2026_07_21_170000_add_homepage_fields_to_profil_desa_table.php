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
        Schema::table('profil_desa', function (Blueprint $table) {
            $table->string('nama_kades')->nullable()->after('email');
            $table->string('jabatan_kades')->default('Kepala Desa Batu Belerang')->after('nama_kades');
            $table->text('sambutan_kades')->nullable()->after('jabatan_kades');
            $table->string('foto_kades')->nullable()->after('sambutan_kades');
            $table->string('hero_title')->nullable()->after('foto_kades');
            $table->text('hero_subtitle')->nullable()->after('hero_title');
            $table->string('hero_bg_path')->nullable()->after('hero_subtitle');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profil_desa', function (Blueprint $table) {
            $table->dropColumn([
                'nama_kades',
                'jabatan_kades',
                'sambutan_kades',
                'foto_kades',
                'hero_title',
                'hero_subtitle',
            ]);
        });
    }
};
