import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

interface Column {
    name: string;
    type: string;
    nullable: boolean;
    default: any;
}

interface TableData {
    name: string;
    rows: number;
    columns: Column[];
}

interface Props {
    tables: TableData[];
}

export default function DatabaseExplorer({ tables }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTable, setSelectedTable] = useState<TableData | null>(
        tables[0] || null,
    );

    const filteredTables = tables.filter((t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="flex min-h-screen flex-col bg-slate-950 font-sans text-slate-100">
            <Head title="Database Inspector" />

            {/* Header */}
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 py-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white shadow-lg shadow-emerald-500/30">
                        DB
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-white">
                            Database Inspector
                        </h1>
                        <p className="text-xs text-slate-400">
                            Website Resmi Desa Batu Belerang
                        </p>
                    </div>
                </div>
                <div className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                    SQLite Local Database
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 overflow-hidden">
                {/* Left Pane - Table List */}
                <div className="flex w-1/3 flex-col border-r border-slate-800 bg-slate-900/20">
                    {/* Search Input */}
                    <div className="border-b border-slate-800 p-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari nama tabel..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-200 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute top-2.5 right-3 text-xs text-slate-500 hover:text-slate-300"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <div className="mt-2 flex justify-between px-1 text-xs text-slate-400">
                            <span>
                                Menampilkan {filteredTables.length} dari{' '}
                                {tables.length} tabel
                            </span>
                        </div>
                    </div>

                    {/* Tables Scroll list */}
                    <div className="flex-1 space-y-2 overflow-y-auto p-4">
                        {filteredTables.length > 0 ? (
                            filteredTables.map((table) => {
                                const isSelected =
                                    selectedTable?.name === table.name;

                                return (
                                    <button
                                        key={table.name}
                                        onClick={() => setSelectedTable(table)}
                                        className={`group flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all duration-200 ${
                                            isSelected
                                                ? 'border-emerald-500 bg-emerald-600/10 text-white'
                                                : 'border-slate-850 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80'
                                        }`}
                                    >
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium tracking-wide break-all transition-colors group-hover:text-white">
                                                {table.name}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                {table.columns.length} kolom
                                            </div>
                                        </div>
                                        <div
                                            className={`rounded-md border px-2 py-1 text-[10px] font-semibold ${
                                                isSelected
                                                    ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300'
                                                    : 'border-slate-700 bg-slate-800/80 text-slate-400'
                                            }`}
                                        >
                                            {table.rows} baris
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <div className="py-8 text-center text-sm text-slate-500">
                                Tidak ada tabel yang cocok
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Pane - Schema Details */}
                <div className="flex flex-1 flex-col overflow-y-auto bg-slate-950">
                    {selectedTable ? (
                        <div className="space-y-6 p-8">
                            {/* Table Header Details */}
                            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl shadow-slate-950/20">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="rounded-md border border-emerald-500/20 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold tracking-wider text-emerald-400">
                                            TABEL
                                        </span>
                                        <h2 className="text-2xl font-bold tracking-tight text-white">
                                            {selectedTable.name}
                                        </h2>
                                    </div>
                                    <p className="text-sm text-slate-400">
                                        Menampilkan rincian skema kolom dan
                                        metadata tabel di database.
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <div className="min-w-[100px] rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-3 text-center">
                                        <div className="text-2xl font-bold text-white">
                                            {selectedTable.rows}
                                        </div>
                                        <div className="mt-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                                            Baris Data
                                        </div>
                                    </div>
                                    <div className="min-w-[100px] rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-3 text-center">
                                        <div className="text-2xl font-bold text-white">
                                            {selectedTable.columns.length}
                                        </div>
                                        <div className="mt-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                                            Kolom Skema
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Columns Table */}
                            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/20 shadow-lg">
                                <table className="w-full border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-slate-800 bg-slate-900/60">
                                            <th className="px-6 py-4 text-xs font-bold tracking-wider text-slate-300 uppercase">
                                                #
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold tracking-wider text-slate-300 uppercase">
                                                Nama Kolom
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold tracking-wider text-slate-300 uppercase">
                                                Tipe Data
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold tracking-wider text-slate-300 uppercase">
                                                Nullable
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold tracking-wider text-slate-300 uppercase">
                                                Default
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/60">
                                        {selectedTable.columns.map(
                                            (col, index) => (
                                                <tr
                                                    key={col.name}
                                                    className="transition-colors hover:bg-slate-900/35"
                                                >
                                                    <td className="px-6 py-4.5 font-mono text-sm text-slate-500">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4.5 font-mono text-sm font-semibold text-white">
                                                        {col.name}
                                                    </td>
                                                    <td className="px-6 py-4.5 font-mono text-sm text-slate-300">
                                                        {col.type}
                                                    </td>
                                                    <td className="px-6 py-4.5 text-sm">
                                                        {col.nullable ? (
                                                            <span className="inline-flex rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                                                                YES
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex rounded border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-400">
                                                                NO
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4.5 font-mono text-sm text-slate-400">
                                                        {col.default !== null &&
                                                        col.default !==
                                                            undefined ? (
                                                            String(col.default)
                                                        ) : (
                                                            <span className="text-slate-600 italic">
                                                                NULL
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-slate-500">
                            <div className="border-slate-850 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border bg-slate-900 text-2xl">
                                📊
                            </div>
                            <h3 className="text-lg font-semibold text-slate-300">
                                Pilih Tabel
                            </h3>
                            <p className="mt-1 max-w-sm text-sm">
                                Silakan pilih tabel di panel samping untuk
                                melihat rincian skema database lengkap.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
