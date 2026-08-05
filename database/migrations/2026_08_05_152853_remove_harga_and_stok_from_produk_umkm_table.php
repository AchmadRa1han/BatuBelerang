<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('produk_umkm', function (Blueprint $table) {
            $table->dropColumn(['harga', 'stok']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produk_umkm', function (Blueprint $table) {
            $table->decimal('harga', 10, 2)->default(0);
            $table->integer('stok')->default(0);
        });
    }
};
