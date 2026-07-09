<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class DebugDatabaseController extends Controller
{
    public function index(): Response
    {
        $rawTables = Schema::getTables();
        $tables = [];

        foreach ($rawTables as $table) {
            $name = $table['name'] ?? null;
            if (! $name) {
                continue;
            }

            // Abaikan tabel internal sqlite jika ada
            if (str_starts_with($name, 'sqlite_')) {
                continue;
            }

            try {
                $rowCount = DB::table($name)->count();
            } catch (\Exception $e) {
                $rowCount = 0;
            }

            try {
                $rawColumns = Schema::getColumns($name);
                $columns = array_map(function ($col) {
                    return [
                        'name' => $col['name'],
                        'type' => $col['type'] ?? $col['type_name'] ?? 'unknown',
                        'nullable' => $col['nullable'] ?? false,
                        'default' => $col['default'] ?? null,
                    ];
                }, $rawColumns);
            } catch (\Exception $e) {
                $columns = [];
            }

            $tables[] = [
                'name' => $name,
                'rows' => $rowCount,
                'columns' => $columns,
            ];
        }

        return Inertia::render('debug/database', [
            'tables' => $tables,
        ]);
    }
}
