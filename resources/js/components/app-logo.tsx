export default function AppLogo() {
    return (
        <div className="flex items-center gap-2.5">
            <img
                src="/images/lambang_kabupaten_sinjai.png"
                alt="Lambang Kabupaten Sinjai"
                className="size-8 object-contain"
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-slate-900 dark:text-white">
                    Desa Batu Belerang
                </span>
                <span className="truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    Kec. Sinjai Borong
                </span>
            </div>
        </div>
    );
}
