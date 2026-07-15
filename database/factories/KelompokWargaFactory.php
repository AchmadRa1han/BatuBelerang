<?php

namespace Database\Factories;

use App\Models\KelompokWarga;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<KelompokWarga>
 */
class KelompokWargaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $kategori = $this->faker->randomElement(['tani', 'nelayan', 'keagamaan', 'pemuda', 'ekonomi', 'lainnya']);
        $namaKelompok = 'Kelompok '.ucfirst($kategori).' '.$this->faker->word();

        return [
            'nama' => $namaKelompok,
            'kode' => strtoupper($this->faker->unique()->word()),
            'kategori' => $kategori,
            'deskripsi' => $this->faker->paragraph(),
        ];
    }
}
