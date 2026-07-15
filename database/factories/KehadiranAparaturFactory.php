<?php

namespace Database\Factories;

use App\Models\KehadiranAparatur;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<KehadiranAparatur>
 */
class KehadiranAparaturFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['hadir', 'sakit', 'izin', 'dinas_luar', 'alpa']);

        return [
            'user_id' => User::factory(),
            'tanggal' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'jam_masuk' => $status === 'hadir' ? '08:00:00' : null,
            'jam_pulang' => $status === 'hadir' ? '16:00:00' : null,
            'status' => $status,
            'keterangan' => $status !== 'hadir' ? $this->faker->sentence() : null,
        ];
    }
}
