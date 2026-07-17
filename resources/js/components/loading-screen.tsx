import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

export function LoadingScreen() {
    const [isNavigating, setIsNavigating] = useState(false);
    const [targetPath, setTargetPath] = useState('/');

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const handleStart = (event: any) => {
            try {
                const urlObj = new URL(
                    event.detail.visit.url.toString(),
                    window.location.origin,
                );
                setTargetPath(urlObj.pathname);
            } catch {
                setTargetPath('/');
            }

            timeoutId = setTimeout(() => {
                setIsNavigating(true);
            }, 150);
        };

        const handleFinish = () => {
            clearTimeout(timeoutId);
            setIsNavigating(false);
        };

        const removeStart = router.on('start', handleStart);
        const removeFinish = router.on('finish', handleFinish);

        return () => {
            clearTimeout(timeoutId);
            removeStart();
            removeFinish();
        };
    }, []);

    const isSidebarLayout =
        targetPath.startsWith('/dashboard') ||
        targetPath.startsWith('/settings') ||
        targetPath.startsWith('/debug');

    return (
        <AnimatePresence>
            {isNavigating && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate-55 fixed inset-0 z-[9999] overflow-y-auto select-none dark:bg-slate-950"
                >
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                        @keyframes shimmer-move {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(300%); }
                        }
                    `,
                        }}
                    />

                    {/* Shimmer Bar Indicator at Top */}
                    <div className="fixed top-0 right-0 left-0 z-[10000] h-1 overflow-hidden bg-emerald-100 dark:bg-emerald-950/50">
                        <div
                            className="h-full w-1/3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"
                            style={{
                                animation: 'shimmer-move 1.5s infinite linear',
                            }}
                        />
                    </div>

                    {isSidebarLayout ? (
                        /* SKELETON: SIDEBAR LAYOUT (Dashboard / Settings / Debug) */
                        <div className="flex min-h-screen">
                            {/* Left Sidebar Skeleton */}
                            <div className="flex hidden w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white p-6 md:flex dark:border-slate-800 dark:bg-slate-900/50">
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                                        <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                    </div>

                                    <div className="space-y-4">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 py-1"
                                            >
                                                <div className="h-4 w-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                                <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                                    <div className="space-y-1.5">
                                        <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                        <div className="h-2 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                    </div>
                                </div>
                            </div>

                            {/* Main Content Skeleton */}
                            <div className="flex min-w-0 flex-1 flex-col">
                                {/* Top Header */}
                                <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900/50">
                                    <div className="flex items-center gap-2">
                                        <div className="hidden h-3.5 w-16 animate-pulse rounded bg-slate-200 sm:block dark:bg-slate-800" />
                                        <div className="hidden h-3 w-3 animate-pulse rounded bg-slate-200 sm:block dark:bg-slate-800" />
                                        <div className="h-3.5 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                                        <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="flex-1 space-y-8 p-6 md:p-8">
                                    <div className="space-y-2">
                                        <div className="h-7 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                        <div className="h-3 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/30"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                                    <div className="h-4 w-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                                </div>
                                                <div className="h-6 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                                <div className="h-2 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2 dark:border-slate-800 dark:bg-slate-900/30">
                                            <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                            <div className="space-y-3">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="h-10 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800/50"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/30">
                                            <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                            <div className="flex justify-center py-4">
                                                <div className="h-28 w-28 animate-pulse rounded-full border-8 border-slate-100 dark:border-slate-800/80" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                                <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* SKELETON: PUBLIC LAYOUT (Welcome / Home Page) */
                        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
                            {/* Navbar Skeleton */}
                            <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-900 dark:bg-slate-950/80">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                                    <div className="h-4.5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                </div>
                                <div className="hidden items-center gap-8 md:flex">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="h-3 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800"
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                                    <div className="h-8 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                                </div>
                            </header>

                            {/* Hero Banner Area Skeleton */}
                            <section className="flex flex-col items-center bg-gradient-to-b from-emerald-50/50 via-slate-50 to-slate-50 px-6 pt-32 pb-24 text-center dark:from-emerald-900/10 dark:via-slate-950 dark:to-slate-950">
                                <div className="mb-6 h-6 w-36 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                                <div className="mb-3 h-12 w-3/4 max-w-2xl animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                                <div className="mb-6 h-12 w-1/2 max-w-md animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                                <div className="mb-8 h-3 w-5/6 max-w-lg animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="flex items-center gap-4">
                                    <div className="h-11 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                                    <div className="h-11 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                                </div>
                            </section>

                            {/* Main Cards Grid & Widgets */}
                            <main className="mx-auto w-full max-w-7xl space-y-20 px-6 py-20">
                                {/* Weather widget block */}
                                <div className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/30" />

                                {/* Demographic section header */}
                                <div className="flex flex-col items-center space-y-2 md:items-start">
                                    <div className="h-6 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                    <div className="h-3 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                </div>

                                {/* Demographics Grid */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="flex h-[320px] flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/30"
                                        >
                                            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                            <div className="flex h-40 animate-pulse items-center justify-center rounded-lg bg-slate-100/50 dark:bg-slate-800/30">
                                                <div className="h-16 w-16 rounded-full border-4 border-slate-200 dark:border-slate-700" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                                <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </main>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
