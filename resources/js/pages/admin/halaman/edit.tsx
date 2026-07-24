import { Head, Link, useForm } from '@inertiajs/react';
import {
    Save,
    Globe,
    ExternalLink,
    ArrowLeft,
    FileText,
    Sparkles,
    Check,
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HalamanData {
    id: number;
    slug: string;
    kategori: string;
    judul: string;
    subjudul?: string | null;
    isi?: string | null;
    meta_json?: any;
}

interface EditHalamanProps {
    halaman: HalamanData;
}

export default function EditHalaman({ halaman }: EditHalamanProps) {
    const form = useForm({
        judul: halaman.judul || '',
        subjudul: halaman.subjudul || '',
        isi: halaman.isi || '',
    });

    const publicUrl = `/${halaman.slug.replace('-', '/')}`;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(`/admin/halaman/${halaman.slug}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Edit Halaman - ${halaman.judul}`} />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 md:p-8 text-white shadow-xl">
                    <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="size-3.5" />
                                    <span>Kembali ke Dashboard</span>
                                </Link>
                                <span className="text-slate-600">•</span>
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase text-emerald-300">
                                    {halaman.kategori}
                                </span>
                            </div>

                            <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                                Edit Halaman: <span className="text-emerald-300">{halaman.judul}</span>
                            </h1>
                            <p className="max-w-2xl text-xs text-slate-300 md:text-sm">
                                Kelola judul, subjudul, serta rincian isi konten halamanpublik ini secara mandiri.
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                            <a
                                href={publicUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
                            >
                                <Globe className="size-4" />
                                <span>Pratinjau Halaman Publik</span>
                                <ExternalLink className="size-3.5 opacity-70" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Form CRUD Editor */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2.5">
                            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <FileText className="size-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                                    Formulir Edit Konten Halaman
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Slug Rute: <code className="font-mono text-emerald-600 dark:text-emerald-400">{publicUrl}</code>
                                </p>
                            </div>
                        </div>

                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={form.processing}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-2"
                        >
                            <Save className="size-4" />
                            <span>Simpan Perubahan</span>
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2 sm:col-span-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                    Judul Utama Halaman
                                </Label>
                                <Input
                                    required
                                    value={form.data.judul}
                                    onChange={(e) => form.setData('judul', e.target.value)}
                                    placeholder="Contoh: Tentang Desa Batu Belerang"
                                    className="text-sm font-semibold"
                                />
                                {form.errors.judul && (
                                    <p className="text-xs text-rose-600">{form.errors.judul}</p>
                                )}
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                    Subjudul / Ringkasan Singkat
                                </Label>
                                <Input
                                    value={form.data.subjudul}
                                    onChange={(e) => form.setData('subjudul', e.target.value)}
                                    placeholder="Contoh: Gambaran umum kawasan pegunungan dan destinasi..."
                                    className="text-xs"
                                />
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                        Isi Konten Utama Halaman (Rich Text Editor)
                                    </Label>
                                    <span className="text-[11px] text-slate-500">
                                        Dukungan pemisahan baris paragraf otomatis
                                    </span>
                                </div>
                                <textarea
                                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-4 text-xs md:text-sm leading-relaxed focus:ring-2 focus:ring-emerald-500 min-h-[220px]"
                                    rows={10}
                                    value={form.data.isi}
                                    onChange={(e) => form.setData('isi', e.target.value)}
                                    placeholder="Tuliskan penjelasan, narasi, atau informasi lengkap yang ingin ditampilkan pada halaman ini..."
                                />
                            </div>
                        </div>

                        {/* Action Bottom Bar */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                            <Link
                                href="/dashboard"
                                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                            >
                                Cancel / Batal
                            </Link>

                            <Button
                                type="submit"
                                disabled={form.processing}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-2"
                            >
                                <Save className="size-4" />
                                <span>{form.processing ? 'Menyimpan...' : 'Simpan Perubahan Halaman'}</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
