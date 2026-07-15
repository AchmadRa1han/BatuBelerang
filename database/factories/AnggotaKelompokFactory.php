<?php

namespace Database\Factories;

use App\Models\AnggotaKelompok;
use App\Models\KelompokWarga;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends Factory<AnggotaKelompok>
 */
class AnggotaKelompokFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kelompok_warga_id' => KelompokWarga::factory(),
            'penduduk_id' => ($warga = DB::table('penduduk')->inRandomOrder()->first()) ? $warga->id : 1,
            'jabatan' => $this->faker->randomElement(['Ketua', 'Wakil Ketua', 'Sekretaris', 'Bendahara', 'Anggota']),
            'tanggal_bergabung' => $this->faker->date(),
        ];
    }
}
