import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

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
    const [selectedTable, setSelectedTable] = useState<TableData | null>(tables[0] || null);

    const filteredTables = tables.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
            <Head title="Database Inspector" />

            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                        DB
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-white">Database Inspector</h1>
                        <p className="text-xs text-slate-400">Website Resmi Desa Batu Belerang</p>
                    </div>
                </div>
                <div className="text-xs px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-full text-slate-300 font-medium">
                    SQLite Local Database
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left Pane - Table List */}
                <div className="w-1/3 border-r border-slate-800 flex flex-col bg-slate-900/20">
                    {/* Search Input */}
                    <div className="p-4 border-b border-slate-800">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari nama tabel..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm('')} 
                                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 text-xs"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <div className="mt-2 text-xs text-slate-400 flex justify-between px-1">
                            <span>Menampilkan {filteredTables.length} dari {tables.length} tabel</span>
                        </div>
                    </div>

                    {/* Tables Scroll list */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {filteredTables.length > 0 ? (
                            filteredTables.map((table) => {
                                const isSelected = selectedTable?.name === table.name;
                                return (
                                    <button
                                        key={table.name}
                                        onClick={() => setSelectedTable(table)}
                                        className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                                            isSelected
                                                ? 'bg-indigo-600/10 border-indigo-500 text-white'
                                                : 'bg-slate-900/40 border-slate-850 hover:bg-slate-900/80 hover:border-slate-700 text-slate-300'
                                        }`}
                                    >
                                        <div className="space-y-1">
                                            <div className="font-medium text-sm tracking-wide break-all group-hover:text-white transition-colors">
                                                {table.name}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                {table.columns.length} kolom
                                            </div>
                                        </div>
                                        <div className={`px-2 py-1 rounded-md text-[10px] font-semibold border ${
                                            isSelected 
                                                ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300' 
                                                : 'bg-slate-800/80 border-slate-700 text-slate-400'
                                        }`}>
                                            {table.rows} baris
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <div className="text-center py-8 text-slate-500 text-sm">
                                Tidak ada tabel yang cocok
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Pane - Schema Details */}
                <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto">
                    {selectedTable ? (
                        <div className="p-8 space-y-6">
                            {/* Table Header Details */}
                            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-xl shadow-slate-950/20">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs px-2.5 py-0.5 bg-indigo-500/15 text-indigo-400 rounded-md border border-indigo-500/20 font-semibold tracking-wider">
                                            TABEL
                                        </span>
                                        <h2 className="text-2xl font-bold text-white tracking-tight">{selectedTable.name}</h2>
                                    </div>
                                    <p className="text-sm text-slate-400">
                                        Menampilkan rincian skema kolom dan metadata tabel di database.
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-5 py-3 text-center min-w-[100px]">
                                        <div className="text-2xl font-bold text-white">{selectedTable.rows}</div>
                                        <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-1">Baris Data</div>
                                    </div>
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-5 py-3 text-center min-w-[100px]">
                                        <div className="text-2xl font-bold text-white">{selectedTable.columns.length}</div>
                                        <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-1">Kolom Skema</div>
                                    </div>
                                </div>
                            </div>

                            {/* Columns Table */}
                            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/20 shadow-lg">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-900/60 border-b border-slate-800">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-300 tracking-wider uppercase">#</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-300 tracking-wider uppercase">Nama Kolom</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-300 tracking-wider uppercase">Tipe Data</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-300 tracking-wider uppercase">Nullable</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-300 tracking-wider uppercase">Default</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/60">
                                        {selectedTable.columns.map((col, index) => (
                                            <tr key={col.name} className="hover:bg-slate-900/35 transition-colors">
                                                <td className="px-6 py-4.5 text-sm text-slate-500 font-mono">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4.5 text-sm text-white font-semibold font-mono">
                                                    {col.name}
                                                </td>
                                                <td className="px-6 py-4.5 text-sm text-slate-300 font-mono">
                                                    {col.type}
                                                </td>
                                                <td className="px-6 py-4.5 text-sm">
                                                    {col.nullable ? (
                                                        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                            YES
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                                            NO
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4.5 text-sm font-mono text-slate-400">
                                                    {col.default !== null && col.default !== undefined 
                                                        ? String(col.default) 
                                                        : <span className="text-slate-600 italic">NULL</span>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
                            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-850 mb-4 text-2xl">
                                📊
                            </div>
                            <h3 className="text-lg font-semibold text-slate-300">Pilih Tabel</h3>
                            <p className="text-sm max-w-sm mt-1">
                                Silakan pilih tabel di panel samping untuk melihat rincian skema database lengkap.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
