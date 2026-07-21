import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { ZoomIn, ZoomOut, RotateCw, Check, X } from 'lucide-react';

interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ImageCropperModalProps {
    isOpen: boolean;
    imageSrc: string | null;
    onClose: () => void;
    onCropComplete: (croppedBase64: string) => void;
    aspectRatio?: number; // default 4/5 (portrait)
}

/**
 * Helper to create HTML Image element from URL
 */
const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

/**
 * Crops image on HTML Canvas and returns JPEG base64 data URL with fixed high resolution
 */
async function getCroppedImg(
    imageSrc: string,
    pixelCrop: PixelCrop,
    rotation = 0,
    targetWidth = 400,
    targetHeight = 500
): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Canvas context not available');
    }

    // Set fixed target output dimensions (e.g. 400x500 for uniform profile cards)
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Draw the cropped portion scaled directly to target dimensions
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        targetWidth,
        targetHeight
    );

    return canvas.toDataURL('image/jpeg', 0.9);
}

export default function ImageCropperModal({
    isOpen,
    imageSrc,
    onClose,
    onCropComplete,
    aspectRatio = 4 / 5,
}: ImageCropperModalProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const handleCropComplete = useCallback((_croppedArea: any, croppedPixels: PixelCrop) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleSave = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        try {
            setIsSaving(true);
            const croppedBase64 = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation,
                400,
                500
            );
            onCropComplete(croppedBase64);
            onClose();
        } catch (error) {
            console.error('Failed to crop image', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!imageSrc) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md w-full p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl">
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-base font-bold text-slate-900 dark:text-white">
                        Sesuaikan & Potong Foto (Aspect Ratio 4:5)
                    </DialogTitle>
                    <p className="text-xs text-slate-500">
                        Geser dan perbesar foto agar posisinya pas dan seragam untuk kartu perangkat desa.
                    </p>
                </DialogHeader>

                <div className="relative w-full h-72 bg-slate-950 rounded-xl overflow-hidden my-4 border border-slate-800">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={handleCropComplete}
                        showGrid={true}
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <ZoomOut className="size-4 text-slate-400 shrink-0" />
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                        <ZoomIn className="size-4 text-slate-400 shrink-0" />
                    </div>
                </div>

                <DialogFooter className="mt-4 flex gap-2 justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="size-sm text-xs gap-1.5"
                    >
                        <X className="size-3.5" /> Batal
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white size-sm text-xs gap-1.5"
                    >
                        <Check className="size-3.5" />
                        {isSaving ? 'Memotong...' : 'Gunakan Foto Ini'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
