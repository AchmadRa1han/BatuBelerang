<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@batubelerang.desa.id'],
            [
                'name' => 'Admin Utama Desa',
                'password' => Hash::make('password'),
                'role' => 'super_admin',
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'operator@batubelerang.desa.id'],
            [
                'name' => 'Operator Layanan Desa',
                'password' => Hash::make('password'),
                'role' => 'operator_layanan',
                'email_verified_at' => now(),
            ]
        );
    }
}
