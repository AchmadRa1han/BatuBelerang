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

const SinjaiLogo = () => (
    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-white p-1 shadow-sm md:h-14 md:w-14 dark:border-slate-800 dark:bg-slate-900">
        <img
            src="/images/lambang_kabupaten_sinjai.png"
            alt="Lambang Kabupaten Sinjai"
            className="h-full w-full object-contain"
        />
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
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
            {/* ☀️ Left Side: Cuaca Desa Batu Belerang (Col 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-5 text-white shadow-sm border border-slate-800 space-y-4">
                {/* Header Cuaca */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <MapPin className="size-4 text-emerald-400 shrink-0" />
                        <span>Desa Batu Belerang</span>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                        {weather.condition}
                    </span>
                </div>

                {/* Main Temp & Weather Icon */}
                <div className="my-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <WeatherIcon className="size-11 text-amber-400 drop-shadow-md shrink-0" />
                        <div>
                            <div className="text-3xl font-extrabold tracking-tight">
                                {weather.temp}°C
                            </div>
                            <div className="text-[11px] text-slate-300 capitalize">
                                Cuaca Hari Ini
                            </div>
                        </div>
                    </div>
                    <div className="text-right text-[11px] text-slate-400 leading-tight">
                        <div className="font-semibold text-slate-300">Kec. Sinjai Borong</div>
                        <div className="text-[10px]">Kab. Sinjai</div>
                    </div>
                </div>

                {/* Horizontal 7-Day Forecast */}
                <div className="pt-3 border-t border-slate-800/80 grid grid-cols-7 gap-1 text-center">
                    {weather.forecast.map((f, idx) => {
                        const Icon = f.icon;
                        return (
                            <div key={idx} className="flex flex-col items-center space-y-1">
                                <span className="text-[10px] font-medium text-slate-400">{f.day}</span>
                                <Icon className="size-4 text-blue-300" />
                                <span className="text-[10px] font-bold text-white">{f.tempMax}°</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 🕌 Right Side: Jadwal Shalat Desa (Col 7) */}
            <div className="lg:col-span-7 flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 space-y-4">
                {/* Header Shalat */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                        <SinjaiLogo />
                        <div>
                            <h3 className="text-xs md:text-sm font-extrabold text-slate-900 dark:text-white">
                                Jadwal Imsak & Shalat Desa
                            </h3>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                {getIndonesianDate()}
                            </p>
                        </div>
                    </div>

                    {nextPrayer && (
                        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                            <Clock className="size-3.5 animate-spin text-emerald-600 dark:text-emerald-400" style={{ animationDuration: '4s' }} />
                            <span>{nextPrayer.name} {nextPrayer.time}</span>
                            <span className="opacity-50">•</span>
                            <span className="font-mono text-[10px]">{formatTimeRemaining(nextPrayer.minutesLeft)}</span>
                        </div>
                    )}
                </div>

                {/* 6 Prayer Pills Grid (Compact Row) */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                    {[
                        { label: 'Imsak', time: prayerTimes.imsak, icon: CloudRain, bg: 'bg-cyan-600' },
                        { label: 'Subuh', time: prayerTimes.subuh, icon: Sunrise, bg: 'bg-cyan-700' },
                        { label: 'Dzuhur', time: prayerTimes.dzuhur, icon: Sun, bg: 'bg-amber-500' },
                        { label: 'Ashar', time: prayerTimes.ashar, icon: CloudSun, bg: 'bg-orange-600' },
                        { label: 'Magrib', time: prayerTimes.magrib, icon: Sunset, bg: 'bg-rose-600' },
                        { label: 'Isya', time: prayerTimes.isya, icon: Moon, bg: 'bg-indigo-700' },
                    ].map((p) => {
                        const Icon = p.icon;
                        const isNext = nextPrayer?.name.toLowerCase() === p.label.toLowerCase();
                        return (
                            <div
                                key={p.label}
                                className={`flex flex-col items-center justify-between rounded-xl border p-2.5 text-center transition-all ${
                                    isNext
                                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 ring-2 ring-emerald-500/40'
                                        : 'border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40'
                                }`}
                            >
                                <div className={`flex size-7 items-center justify-center rounded-lg ${p.bg} text-white shadow-sm mb-1`}>
                                    <Icon className="size-4" />
                                </div>
                                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">{p.label}</span>
                                <span className="text-xs font-extrabold font-mono text-slate-900 dark:text-white mt-0.5">{p.time}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
