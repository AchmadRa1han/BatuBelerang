<?php

namespace Database\Seeders;

use App\Models\Dusun;
use App\Models\KartuKeluarga;
use App\Models\Penduduk;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PendudukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = database_path('seeders/data/bip_batu_belerang.json');

        if (! file_exists($jsonPath)) {
            $this->command->error("JSON file not found at: {$jsonPath}");

            return;
        }

        $jsonData = file_get_contents($jsonPath);

        if ($jsonData === false) {
            $this->command->error('Failed to read JSON data.');

            return;
        }

        $records = json_decode($jsonData, true);

        if (! is_array($records)) {
            $this->command->error('Failed to decode JSON data.');

            return;
        }

        $this->command->info('Seeding '.count($records).' penduduk records...');

        DB::transaction(function () use ($records) {
            // Step 1: Pre-process Kartu Keluarga
            $kkData = [];
            foreach ($records as $record) {
                $noKk = $record['no_kk'];
                if (! $noKk) {
                    continue;
                }

                if (! isset($kkData[$noKk])) {
                    $kkData[$noKk] = [
                        'no_kk' => $noKk,
                        'nik_kepala_keluarga' => null,
                        'alamat' => $record['alamat'] ?: '-',
                    ];
                }

                if (strtolower($record['hubungan']) === 'kepala keluarga') {
                    $kkData[$noKk]['nik_kepala_keluarga'] = $record['nik'];
                }
            }

            // Fill missing heads of family with first NIK in the KK
            foreach ($records as $record) {
                $noKk = $record['no_kk'];
                if ($noKk && isset($kkData[$noKk]) && $kkData[$noKk]['nik_kepala_keluarga'] === null) {
                    $kkData[$noKk]['nik_kepala_keluarga'] = $record['nik'];
                }
            }

            // Insert/update Kartu Keluarga and keep their IDs
            $kkMap = [];
            foreach ($kkData as $noKk => $data) {
                $kk = KartuKeluarga::updateOrCreate(
                    ['no_kk' => $noKk],
                    [
                        'nik_kepala_keluarga' => $data['nik_kepala_keluarga'],
                        'alamat' => $data['alamat'],
                    ]
                );
                $kkMap[$noKk] = $kk->id;
            }

            // Step 2: Pre-process Dusun
            $dusunMap = [];
            $dusunNames = array_unique(array_filter(array_column($records, 'dusun')));
            foreach ($dusunNames as $name) {
                $dusun = Dusun::firstOrCreate(['nama' => $name]);
                $dusunMap[strtolower($name)] = $dusun->id;
            }

            // Step 3: Insert residents
            foreach ($records as $record) {
                $dusunKey = strtolower($record['dusun']);
                $dusunId = $dusunMap[$dusunKey] ?? null;

                if (! $dusunId && $record['dusun']) {
                    $dusun = Dusun::firstOrCreate(['nama' => $record['dusun']]);
                    $dusunId = $dusun->id;
                    $dusunMap[$dusunKey] = $dusunId;
                }

                $noKk = $record['no_kk'];
                $kkId = $noKk ? ($kkMap[$noKk] ?? null) : null;

                Penduduk::updateOrCreate(
                    ['nik' => $record['nik']],
                    [
                        'nama' => $record['nama'],
                        'jenis_kelamin' => $record['jenis_kelamin'],
                        'tempat_lahir' => $record['tempat_lahir'] ?: '-',
                        'tanggal_lahir' => $record['tanggal_lahir'],
                        'golongan_darah' => $record['golongan_darah'] ?: '-',
                        'agama' => $record['agama'] ?: 'Islam',
                        'kewarganegaraan' => $record['kewarganegaraan'] ?: 'WNI',
                        'suku' => $record['suku'] ?: '-',
                        'pendidikan' => $record['pendidikan'] ?: '-',
                        'pekerjaan' => $record['pekerjaan'] ?: '-',
                        'status_perkawinan' => $record['status_perkawinan'] ?: 'belum_kawin',
                        'hubungan' => $record['hubungan'] ?: '-',
                        'kartu_keluarga_id' => $kkId,
                        'dusun_id' => $dusunId,
                        'rt' => $record['rt'] ?: '000',
                        'rw' => $record['rw'] ?: '000',
                        'alamat' => $record['alamat'] ?: '-',
                        'status_warga' => 'aktif',
                        'is_hamil' => false,
                        'is_stunting' => false,
                        'is_disabilitas' => false,
                        'is_penerima_bansos' => false,
                    ]
                );
            }
        });
    }
}
