<?php

namespace Database\Factories;

use App\Models\Regulasi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Regulasi>
 */
class RegulasiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jenis = $this->faker->randomElement(['perdes', 'perkades', 'sk_kades', 'instruksi']);
        $tahun = $this->faker->numberBetween(2020, 2026);
        $nomor = $this->faker->numberBetween(1, 15);

        return [
            'judul' => $this->faker->sentence(6),
            'jenis' => $jenis,
            'tahun' => $tahun,
            'nomor' => "Nomor {$nomor} Tahun {$tahun}",
            'deskripsi' => $this->faker->paragraph(),
            'file_path' => 'uploads/regulasi/'.$this->faker->slug().'.pdf',
            'status' => true,
        ];
    }
}
