import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/images/lambang_kabupaten_sinjai.png"
            alt="Lambang Kabupaten Sinjai"
            {...props}
        />
    );
}
