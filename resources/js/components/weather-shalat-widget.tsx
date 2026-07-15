import {
    Cloud,
    CloudRain,
    Sun,
    CloudSun,
    CloudDrizzle,
    CloudLightning,
    Moon,
    Sunset,
    Sunrise,
    Clock,
    ChevronDown,
    ChevronUp,
    MapPin,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

// Koordinat Akurat Desa Batu Belerang (Kecamatan Sinjai Borong, Kawasan Pegunungan)
const LATITUDE = -5.325;
const LONGITUDE = 120.055;

// Types
interface WeatherData {
    temp: number;
    condition: string;
    icon: React.ComponentType<any>;
    forecast: Array<{
        day: string;
        tempMax: number;
        tempMin: number;
        icon: React.ComponentType<any>;
    }>;
}

interface PrayerTimes {
    imsak: string;
    subuh: string;
    dzuhur: string;
    ashar: string;
    magrib: string;
    isya: string;
}

// Kabupaten Sinjai Authentic Shield Logo SVG
const SinjaiLogo = () => (
    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm md:h-14 md:w-14 dark:border-slate-800 dark:bg-slate-900">
        <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M50 5 L85 25 V60 C85 80 50 95 50 95 C50 95 15 80 15 60 V25 L50 5 Z"
                fill="#1e3a8a"
                stroke="#fbbf24"
                strokeWidth="2.5"
            />
            <path
                d="M50 14 L78 30 V57 C78 70 50 83 50 83 C50 83 22 70 22 57 V30 L50 14 Z"
                fill="#16a34a"
            />
            <path
                d="M22 55 C30 51 40 59 50 55 C60 51 70 59 78 55 V63 C78 73 50 83 50 83 C50 83 22 73 22 63 V55 Z"
                fill="#0284c7"
            />
            <path
                d="M50 20 L53 27 L61 27 L55 32 L57 39 L50 35 L43 39 L45 32 L39 27 L47 27 Z"
                fill="#fbbf24"
            />
            <rect x="47" y="37" width="6" height="23" fill="#ffffff" rx="0.5" />
            <circle cx="50" cy="37" r="3.5" fill="#dc2626" />
        </svg>
    </div>
);

export default function WeatherShalatWidget() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [nextPrayer, setNextPrayer] = useState<{
        name: string;
        time: string;
        minutesLeft: number;
    } | null>(null);

    // Weather State with hardcoded screenshot fallback values
    const [weather, setWeather] = useState<WeatherData>({
        temp: 23,
        condition: 'broken clouds',
        icon: Cloud,
        forecast: [
            { day: 'Mon', tempMax: 28, tempMin: 22, icon: CloudRain },
            { day: 'Tue', tempMax: 28, tempMin: 22, icon: CloudRain },
            { day: 'Wed', tempMax: 29, tempMin: 23, icon: CloudRain },
            { day: 'Thu', tempMax: 27, tempMin: 23, icon: CloudRain },
            { day: 'Fri', tempMax: 28, tempMin: 23, icon: CloudRain },
            { day: 'Sat', tempMax: 28, tempMin: 24, icon: CloudRain },
            { day: 'Sun', tempMax: 27, tempMin: 23, icon: CloudRain },
        ],
    });

    // Prayer Times State with screenshot fallback values
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>({
        imsak: '04:39',
        subuh: '04:49',
        dzuhur: '12:08',
        ashar: '15:30',
        magrib: '18:03',
        isya: '19:17',
    });

    // Helper to get Indonesian date
    const getIndonesianDate = () => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const today = new Date();

        return today.toLocaleDateString('id-ID', options);
    };

    // Mapping Open-Meteo weather codes to labels and icons
    const mapWeatherCode = (
        code: number,
    ): { label: string; icon: React.ComponentType<any> } => {
        if (code === 0) {
            return { label: 'Cerah', icon: Sun };
        }

        if (code >= 1 && code <= 3) {
            return { label: 'Cerah Berawan', icon: CloudSun };
        }

        if (code === 45 || code === 48) {
            return { label: 'Berkabut', icon: Cloud };
        }

        if (code >= 51 && code <= 55) {
            return { label: 'Gerimis', icon: CloudDrizzle };
        }

        if (code >= 61 && code <= 65) {
            return { label: 'Hujan', icon: CloudRain };
        }

        if (code >= 80 && code <= 82) {
            return { label: 'Hujan Deras', icon: CloudRain };
        }

        if (code >= 95 && code <= 99) {
            return { label: 'Badai Petir', icon: CloudLightning };
        }

        return { label: 'Berawan', icon: Cloud };
    };

    // Fetch Weather from Open-Meteo API
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FMakassar`,
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                const currentInfo = mapWeatherCode(data.current.weather_code);
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

                const forecastData = data.daily.time.map(
                    (timeStr: string, idx: number) => {
                        const dateObj = new Date(timeStr);
                        const dayName = days[dateObj.getDay()];
                        const info = mapWeatherCode(
                            data.daily.weather_code[idx],
                        );

                        return {
                            day: dayName,
                            tempMax: Math.round(
                                data.daily.temperature_2m_max[idx],
                            ),
                            tempMin: Math.round(
                                data.daily.temperature_2m_min[idx],
                            ),
                            icon: info.icon,
                        };
                    },
                );

                setWeather({
                    temp: Math.round(data.current.temperature_2m),
                    condition: currentInfo.label.toLowerCase(),
                    icon: currentInfo.icon,
                    forecast: forecastData,
                });
            } catch (error) {
                console.error('Failed to fetch weather:', error);
            }
        };

        fetchWeather();
    }, []);

    // Fetch Prayer Times from AlAdhan API
    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                const response = await fetch(
                    `https://api.aladhan.com/v1/timings?latitude=${LATITUDE}&longitude=${LONGITUDE}&method=20`,
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                const timings = result.data.timings;

                setPrayerTimes({
                    imsak: timings.Imsak,
                    subuh: timings.Fajr,
                    dzuhur: timings.Dhuhr,
                    ashar: timings.Asr,
                    magrib: timings.Maghrib,
                    isya: timings.Isha,
                });
            } catch (error) {
                console.error('Failed to fetch prayer times:', error);
            }
        };

        fetchPrayerTimes();
    }, []);

    // Clock and Next Prayer calculation
    useEffect(() => {
        const updateClockAndNextPrayer = () => {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            const parseToMinutes = (timeStr: string) => {
                const [h, m] = timeStr.split(':').map(Number);

                return h * 60 + m;
            };

            const prayers = [
                { name: 'Imsak', time: prayerTimes.imsak },
                { name: 'Subuh', time: prayerTimes.subuh },
                { name: 'Dzuhur', time: prayerTimes.dzuhur },
                { name: 'Ashar', time: prayerTimes.ashar },
                { name: 'Magrib', time: prayerTimes.magrib },
                { name: 'Isya', time: prayerTimes.isya },
            ];

            let next = null;

            for (const p of prayers) {
                const prayerMin = parseToMinutes(p.time);

                if (prayerMin > currentMinutes) {
                    next = {
                        name: p.name,
                        time: p.time,
                        minutesLeft: prayerMin - currentMinutes,
                    };
                    break;
                }
            }

            if (!next) {
                const imsakMin = parseToMinutes(prayerTimes.imsak);
                next = {
                    name: 'Imsak',
                    time: prayerTimes.imsak,
                    minutesLeft: 24 * 60 - currentMinutes + imsakMin,
                };
            }

            setNextPrayer(next);
        };

        updateClockAndNextPrayer();
        const interval = setInterval(updateClockAndNextPrayer, 60000);

        return () => clearInterval(interval);
    }, [prayerTimes]);

    const WeatherIcon = weather.icon;

    const formatTimeRemaining = (minutes: number) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;

        if (h > 0) {
            return `${h} jam ${m} menit lagi`;
        }

        return `${m} menit lagi`;
    };

    return (
        <div className="w-full animate-in space-y-4 duration-500 fade-in slide-in-from-bottom-4">
            {/* --- Weather Widget --- */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-500/20 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-white shadow-lg transition-all duration-300 dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-zinc-950">
                <div className="pointer-events-none absolute inset-0 opacity-10">
                    <svg
                        className="absolute -bottom-10 -left-10 h-64 w-64 text-white"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                    >
                        <path d="M70,40 C70,30 60,20 48,20 C38,20 30,28 30,38 C20,38 10,48 10,60 C10,72 20,80 32,80 L72,80 C80,80 88,72 88,62 C88,52 80,42 70,40 Z" />
                    </svg>
                    <svg
                        className="absolute -top-10 -right-10 h-80 w-80 text-white"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                    >
                        <path d="M70,40 C70,30 60,20 48,20 C38,20 30,28 30,38 C20,38 10,48 10,60 C10,72 20,80 32,80 L72,80 C80,80 88,72 88,62 C88,52 80,42 70,40 Z" />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col justify-between gap-6 p-6 md:p-8 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-slate-200 uppercase md:text-xs">
                                <MapPin className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
                                Cuaca Desa Batu Belerang
                            </span>
                            <div className="mt-2 flex items-center gap-4">
                                <WeatherIcon
                                    className="h-16 w-16 animate-pulse text-blue-100 drop-shadow-md md:h-20 md:w-20"
                                    strokeWidth={1.5}
                                />
                                <div className="flex flex-col">
                                    <span className="flex items-start text-4xl font-extrabold tracking-tight md:text-5xl">
                                        {weather.temp}
                                        <span className="mt-1 text-xl font-medium">
                                            °C
                                        </span>
                                    </span>
                                    <span className="mt-0.5 text-xs font-semibold text-slate-200 capitalize md:text-sm">
                                        {weather.condition}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/10 lg:hidden" />

                    <div className="-mb-2 scrollbar-none overflow-x-auto pb-2 lg:mb-0 lg:pb-0">
                        <div className="flex min-w-[450px] items-center justify-between gap-5 md:gap-7 lg:min-w-0 lg:justify-end">
                            {weather.forecast.map((f, idx) => {
                                const ForecastDayIcon = f.icon;

                                return (
                                    <div
                                        key={idx}
                                        className="group flex flex-1 flex-col items-center space-y-2 text-center"
                                    >
                                        <span className="text-[10px] font-semibold text-slate-300 transition-colors group-hover:text-white md:text-xs dark:text-slate-400">
                                            {f.day}
                                        </span>
                                        <div className="rounded-xl border border-white/5 bg-white/5 p-2 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/10">
                                            <ForecastDayIcon
                                                className="h-6 w-6 text-blue-200 md:h-7 md:w-7"
                                                strokeWidth={1.8}
                                            />
                                        </div>
                                        <div className="flex flex-col font-mono text-[10px] leading-tight md:text-[11px]">
                                            <span className="font-bold text-white">
                                                {f.tempMax}°
                                            </span>
                                            <span className="text-slate-350 dark:text-slate-400">
                                                {f.tempMin}°
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Prayer Time Widget --- */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-4 md:p-6 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <SinjaiLogo />
                        <div>
                            <h2 className="text-xs font-bold tracking-tight text-slate-900 md:text-sm dark:text-white">
                                Jadwal Imsak & Shalat Desa Batu Belerang
                            </h2>
                            <p className="mt-0.5 text-[10px] font-medium text-slate-500 md:text-xs dark:text-slate-400">
                                {getIndonesianDate()}
                            </p>
                        </div>
                    </div>

                    <div className="ml-auto flex items-center gap-3 md:ml-0">
                        {nextPrayer && (
                            <div className="hidden items-center gap-2 rounded-full border border-indigo-100/60 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 sm:flex dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
                                <Clock
                                    className="h-3.5 w-3.5 animate-spin"
                                    style={{ animationDuration: '4s' }}
                                />
                                <span>
                                    {nextPrayer.name} {nextPrayer.time}
                                </span>
                                <span className="opacity-60">•</span>
                                <span className="font-mono text-[10px]">
                                    {formatTimeRemaining(
                                        nextPrayer.minutesLeft,
                                    )}
                                </span>
                            </div>
                        )}

                        {nextPrayer && (
                            <div className="text-xs font-bold text-slate-800 sm:hidden dark:text-slate-200">
                                {nextPrayer.name} {nextPrayer.time}
                            </div>
                        )}

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-600 transition-colors hover:bg-slate-50 hover:text-indigo-500 dark:text-indigo-400 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
                        >
                            <span>
                                {isExpanded ? 'Sembunyikan' : 'Selengkapnya'}
                            </span>
                            {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>

                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded
                            ? 'max-h-[500px] opacity-100'
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:p-6 lg:grid-cols-6">
                        {/* 1. Imsak */}
                        <div
                            className={`group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:shadow-md dark:bg-slate-950 ${
                                nextPrayer?.name === 'Imsak'
                                    ? 'scale-[1.02] border-transparent ring-2 shadow-indigo-100 ring-indigo-500 dark:shadow-none'
                                    : 'border-slate-200 dark:border-slate-800'
                            }`}
                        >
                            <div className="relative flex flex-col items-center justify-center bg-[#0e7490] p-4 text-white">
                                <CloudRain
                                    className="h-7 w-7"
                                    strokeWidth={2}
                                />
                                {nextPrayer?.name === 'Imsak' && (
                                    <span className="absolute top-1 right-2 animate-pulse rounded bg-white/20 px-1 text-[8px] font-bold tracking-widest uppercase">
                                        Berikutnya
                                    </span>
                                )}
                            </div>
                            <div className="p-3.5 text-center">
                                <div className="text-[10px] font-bold tracking-wide text-slate-600 uppercase dark:text-slate-400">
                                    Imsak
                                </div>
                                <div className="mt-1 font-mono text-lg font-extrabold text-slate-800 dark:text-slate-200">
                                    {prayerTimes.imsak}
                                </div>
                            </div>
                        </div>

                        {/* 2. Subuh */}
                        <div
                            className={`group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:shadow-md dark:bg-slate-950 ${
                                nextPrayer?.name === 'Subuh'
                                    ? 'scale-[1.02] border-transparent ring-2 shadow-indigo-100 ring-indigo-500 dark:shadow-none'
                                    : 'border-slate-200 dark:border-slate-800'
                            }`}
                        >
                            <div className="relative flex flex-col items-center justify-center bg-[#0891b2] p-4 text-white">
                                <Sunrise className="h-7 w-7" strokeWidth={2} />
                                {nextPrayer?.name === 'Subuh' && (
                                    <span className="absolute top-1 right-2 animate-pulse rounded bg-white/20 px-1 text-[8px] font-bold tracking-widest uppercase">
                                        Berikutnya
                                    </span>
                                )}
                            </div>
                            <div className="p-3.5 text-center">
                                <div className="text-[10px] font-bold tracking-wide text-slate-600 uppercase dark:text-slate-400">
                                    Subuh
                                </div>
                                <div className="mt-1 font-mono text-lg font-extrabold text-slate-800 dark:text-slate-200">
                                    {prayerTimes.subuh}
                                </div>
                            </div>
                        </div>

                        {/* 3. Dzuhur */}
                        <div
                            className={`group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:shadow-md dark:bg-slate-950 ${
                                nextPrayer?.name === 'Dzuhur'
                                    ? 'scale-[1.02] border-transparent ring-2 shadow-indigo-100 ring-indigo-500 dark:shadow-none'
                                    : 'border-slate-200 dark:border-slate-800'
                            }`}
                        >
                            <div className="relative flex flex-col items-center justify-center bg-[#eab308] p-4 text-white">
                                <Sun className="h-7 w-7" strokeWidth={2} />
                                {nextPrayer?.name === 'Dzuhur' && (
                                    <span className="absolute top-1 right-2 animate-pulse rounded bg-white/20 px-1 text-[8px] font-bold tracking-widest uppercase">
                                        Berikutnya
                                    </span>
                                )}
                            </div>
                            <div className="p-3.5 text-center">
                                <div className="text-[10px] font-bold tracking-wide text-slate-600 uppercase dark:text-slate-400">
                                    Dzuhur
                                </div>
                                <div className="mt-1 font-mono text-lg font-extrabold text-slate-800 dark:text-slate-200">
                                    {prayerTimes.dzuhur}
                                </div>
                            </div>
                        </div>

                        {/* 4. Ashar */}
                        <div
                            className={`group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:shadow-md dark:bg-slate-950 ${
                                nextPrayer?.name === 'Ashar'
                                    ? 'scale-[1.02] border-transparent ring-2 shadow-indigo-100 ring-indigo-500 dark:shadow-none'
                                    : 'border-slate-200 dark:border-slate-800'
                            }`}
                        >
                            <div className="relative flex flex-col items-center justify-center bg-[#ea580c] p-4 text-white">
                                <CloudSun className="h-7 w-7" strokeWidth={2} />
                                {nextPrayer?.name === 'Ashar' && (
                                    <span className="absolute top-1 right-2 animate-pulse rounded bg-white/20 px-1 text-[8px] font-bold tracking-widest uppercase">
                                        Berikutnya
                                    </span>
                                )}
                            </div>
                            <div className="p-3.5 text-center">
                                <div className="text-[10px] font-bold tracking-wide text-slate-600 uppercase dark:text-slate-400">
                                    Ashar
                                </div>
                                <div className="mt-1 font-mono text-lg font-extrabold text-slate-800 dark:text-slate-200">
                                    {prayerTimes.ashar}
                                </div>
                            </div>
                        </div>

                        {/* 5. Magrib */}
                        <div
                            className={`group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:shadow-md dark:bg-slate-950 ${
                                nextPrayer?.name === 'Magrib'
                                    ? 'scale-[1.02] border-transparent ring-2 shadow-indigo-100 ring-indigo-500 dark:shadow-none'
                                    : 'border-slate-200 dark:border-slate-800'
                            }`}
                        >
                            <div className="relative flex flex-col items-center justify-center bg-[#c2410c] p-4 text-white">
                                <Sunset className="h-7 w-7" strokeWidth={2} />
                                {nextPrayer?.name === 'Magrib' && (
                                    <span className="absolute top-1 right-2 animate-pulse rounded bg-white/20 px-1 text-[8px] font-bold tracking-widest uppercase">
                                        Berikutnya
                                    </span>
                                )}
                            </div>
                            <div className="p-3.5 text-center">
                                <div className="text-[10px] font-bold tracking-wide text-slate-600 uppercase dark:text-slate-400">
                                    Magrib
                                </div>
                                <div className="mt-1 font-mono text-lg font-extrabold text-slate-800 dark:text-slate-200">
                                    {prayerTimes.magrib}
                                </div>
                            </div>
                        </div>

                        {/* 6. Isya */}
                        <div
                            className={`group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:shadow-md dark:bg-slate-950 ${
                                nextPrayer?.name === 'Isya'
                                    ? 'scale-[1.02] border-transparent ring-2 shadow-indigo-100 ring-indigo-500 dark:shadow-none'
                                    : 'border-slate-200 dark:border-slate-800'
                            }`}
                        >
                            <div className="relative flex flex-col items-center justify-center bg-[#4338ca] p-4 text-white">
                                <Moon className="h-7 w-7" strokeWidth={2} />
                                {nextPrayer?.name === 'Isya' && (
                                    <span className="absolute top-1 right-2 animate-pulse rounded bg-white/20 px-1 text-[8px] font-bold tracking-widest uppercase">
                                        Berikutnya
                                    </span>
                                )}
                            </div>
                            <div className="p-3.5 text-center">
                                <div className="text-[10px] font-bold tracking-wide text-slate-600 uppercase dark:text-slate-400">
                                    Isya
                                </div>
                                <div className="mt-1 font-mono text-lg font-extrabold text-slate-800 dark:text-slate-200">
                                    {prayerTimes.isya}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
