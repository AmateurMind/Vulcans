'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const FRAME_COUNT = 128;
const FRAME_BASE = '/frames/ezgif-frame-';

function pad(n: number) {
    return n.toString().padStart(3, '0');
}

type TextOverlay = {
    from: number;
    to: number;
    align: 'left' | 'right' | 'center';
    eyebrow: string;
    heading: string;
    sub: string;
};

const overlays: TextOverlay[] = [
    {
        from: 0,
        to: 0.22,
        align: 'center',
        eyebrow: 'VULCANS ROBOTICS CLUB',
        heading: 'Vulcan X.',
        sub: 'Engineered Intelligence.',
    },
    {
        from: 0.22,
        to: 0.48,
        align: 'left',
        eyebrow: 'MECHANICS',
        heading: 'Precision\nMechanics.',
        sub: 'Every panel, every joint — crafted to nanometer tolerance.',
    },
    {
        from: 0.48,
        to: 0.75,
        align: 'right',
        eyebrow: 'NEURAL CORE',
        heading: 'Neural Core\nProcessing.',
        sub: 'Real-time cognition at 400 TOPS. The mind of a machine.',
    },
    {
        from: 0.75,
        to: 1.0,
        align: 'center',
        eyebrow: 'ASSEMBLY',
        heading: 'Built by\nVulcans.',
        sub: 'The next generation of robotics starts here.',
    },
];

export default function RobotScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const framesRef = useRef<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    const { scrollYProgress } = useScroll({ target: containerRef });

    // Preload all frames
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new window.Image();
            img.src = `${FRAME_BASE}${pad(i)}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) setLoaded(true);
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) setLoaded(true);
            };
            images.push(img);
        }
        framesRef.current = images;
    }, []);

    // Draw frame on scroll
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (v) => {
            setProgress(v);
            const canvas = canvasRef.current;
            if (!canvas || !loaded) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const idx = Math.min(Math.floor(v * FRAME_COUNT), FRAME_COUNT - 1);
            const img = framesRef.current[idx];
            if (!img || !img.complete) return;

            // Resize canvas to window minus navbar height
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - 64;

            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;

            // contain-fit: show full image, letterbox with background
            const scale = Math.min(cw / iw, ch / ih);
            const dw = iw * scale;
            const dh = ih * scale;
            const dx = (cw - dw) / 2;
            const dy = (ch - dh) / 2;

            ctx.clearRect(0, 0, cw, ch);
            // fill background matching the image edge colors (dark navy)
            ctx.fillStyle = '#050a14';
            ctx.fillRect(0, 0, cw, ch);
            ctx.drawImage(img, dx, dy, dw, dh);
        });
        return unsubscribe;
    }, [scrollYProgress, loaded]);

    // Draw first frame when loaded
    useEffect(() => {
        if (!loaded) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const img = framesRef.current[0];
        if (!img) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 64;
        const cw = canvas.width;
        const ch = canvas.height;
        const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        ctx.fillStyle = '#050a14';
        ctx.fillRect(0, 0, cw, ch);
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }, [loaded]);

    const activeOverlay = overlays.find(o => progress >= o.from && progress < o.to)
        ?? (progress >= 1 ? overlays[overlays.length - 1] : null);

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            {/* Loading Screen */}
            {!loaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050a14]">
                    <div className="w-12 h-12 border-2 border-white/10 border-t-blue-400 rounded-full animate-spin mb-5" />
                    <p className="text-white/40 text-sm tracking-widest uppercase">Initialising</p>
                </div>
            )}

            {/* Sticky canvas */}
            <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ display: loaded ? 'block' : 'none' }}
                />

                {/* Overlay gradient vignette */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #050a14 100%)',
                }} />

                {loaded && activeOverlay && (
                    <motion.div
                        key={activeOverlay.heading}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className={`absolute inset-0 flex flex-col justify-center pointer-events-none px-8 sm:px-16 lg:px-24 ${activeOverlay.align === 'center'
                            ? 'items-center text-center'
                            : activeOverlay.align === 'left'
                                ? 'items-start text-left'
                                : 'items-end text-right'
                            }`}
                    >
                        <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-blue-400/70 mb-3 font-medium">
                            {activeOverlay.eyebrow}
                        </p>
                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white/90 leading-tight whitespace-pre-line drop-shadow-2xl">
                            {activeOverlay.heading === 'Built by\nVulcans.' ? (
                                <>Built by{'\n'}<span style={{ color: '#7c3aed' }}>Vulcans.</span></>
                            ) : activeOverlay.heading}
                        </h2>
                        <p className="mt-4 text-sm sm:text-base text-white/50 max-w-sm font-light tracking-wide">
                            {activeOverlay.sub}
                        </p>
                    </motion.div>
                )}

                {/* Scroll indicator */}
                {loaded && progress < 0.04 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll</p>
                        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
                    </motion.div>
                )}

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 h-px bg-white/5 w-full">
                    <motion.div
                        className="h-full bg-blue-400/40"
                        style={{ scaleX: progress, transformOrigin: 'left' }}
                    />
                </div>
            </div>
        </div>
    );
}
