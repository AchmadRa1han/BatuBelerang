import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

export function LoadingScreen() {
    const [isNavigating, setIsNavigating] = useState(false);
    const [targetPath, setTargetPath] = useState('/');

    useEffect(() => {
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
            setIsNavigating(true);
        };

        const handleFinish = () => {
            setIsNavigating(false);
        };

        const removeStart = router.on('start', handleStart);
        const removeFinish = router.on('finish', handleFinish);

        return () => {
            removeStart();
            removeFinish();
        };
    }, []);

    const isHomepage = targetPath === '/';

    return (
        <AnimatePresence>
            {isNavigating && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm select-none"
                >
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                        @keyframes shimmer-move {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(300%); }
                        }
                        @keyframes spin-slow {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
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

                    {isHomepage ? (
                        /* SKELETON: PUBLIC LAYOUT (Only on Welcome / Home Page) */
                        <div className="w-full h-full overflow-y-auto bg-slate-50 dark:bg-slate-950">
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
                                <div className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/30" />
                                <div className="flex flex-col items-center space-y-2 md:items-start">
                                    <div className="h-6 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                    <div className="h-3 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                </div>
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
                    ) : (
                        /* PREMIUM CUSTOM SPINNER: For all other pages */
                        <div className="relative flex flex-col items-center justify-center p-8 bg-white/60 dark:bg-slate-900/60 rounded-3xl backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
                            {/* Rotating Circular Text SVG */}
                            <div className="relative w-44 h-44 flex items-center justify-center">
                                <svg
                                    viewBox="0 0 100 100"
                                    className="w-full h-full"
                                    style={{
                                        animation: 'spin-slow 10s linear infinite',
                                    }}
                                >
                                    <defs>
                                        <path
                                            id="circularTextPath"
                                            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                            fill="none"
                                        />
                                    </defs>
                                    <text className="fill-emerald-800 dark:fill-emerald-300 text-[6px] font-black tracking-[0.18em] uppercase">
                                        <textPath href="#circularTextPath" startOffset="0%">
                                            Batu Belerang • Sinjai Borong • Batu Belerang • Sinjai Borong •
                                        </textPath>
                                    </text>
                                </svg>

                                {/* Logo Sinjai in Center */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src="/images/lambang_kabupaten_sinjai.png"
                                        alt="Logo Sinjai"
                                        className="w-16 h-16 object-contain drop-shadow-md animate-pulse"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
