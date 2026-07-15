<?php

namespace Database\Factories;

use App\Models\AgendaDesa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AgendaDesa>
 */
class AgendaDesaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $waktuMulai = $this->faker->dateTimeBetween('-1 month', '+1 month');
        $waktuSelesai = (clone $waktuMulai)->modify('+2 hours');

        return [
            'judul' => $this->faker->sentence(5),
            'deskripsi' => $this->faker->paragraph(),
            'lokasi' => $this->faker->randomElement([
                'Aula Kantor Desa Batu Belerang',
                'Dusun Cempae',
                'Pemandian Air Panas Belerang',
                'Lapangan Olahraga Desa',
            ]),
            'waktu_mulai' => $waktuMulai,
            'waktu_selesai' => $waktuSelesai,
            'koordinator' => $this->faker->name(),
        ];
    }
}
