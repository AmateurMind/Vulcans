'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, motion } from 'framer-motion';

const FRAME_COUNT = 128;
const MOBILE_BREAKPOINT = 768;
const DESKTOP_FRAME_BASE = '/frames/ezgif-frame-';
const MOBILE_FRAME_BASE = '/frames-mobile/ezgif-frame-';
const MOBILE_COVER_Y_OFFSET = 64;
const BRAND_RED = '#FF3B1F';
const BRAND_EMBER = '#FF6A3D';

function pad(n: number) {
    return n.toString().padStart(3, '0');
}

function drawFrameToCanvas(
    canvas: HTMLCanvasElement,
    img: HTMLImageElement,
    fillMode: 'contain' | 'cover',
    yOffset = 0
) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 64;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = fillMode === 'cover'
        ? Math.max(cw / iw, ch / ih)
        : Math.min(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2 + yOffset;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
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
        eyebrow: 'VULCANS ROBOTICS CLUB - PESMCOE',
        heading: 'Vulcans.',
        sub: 'Engineered Intelligence. Since 2011.',
    },
    {
        from: 0.22,
        to: 0.48,
        align: 'left',
        eyebrow: 'MECHANICAL SYSTEMS',
        heading: 'Precision\nDrive Systems.',
        sub: 'Designed, machined, and tuned by PESMCOE student engineers.',
    },
    {
        from: 0.48,
        to: 0.75,
        align: 'right',
        eyebrow: 'CONTROL AND AUTONOMY',
        heading: 'Code.\nControl.\nCompete.',
        sub: 'From embedded logic to autonomous routines, built inside the club.',
    },
    {
        from: 0.75,
        to: 1.0,
        align: 'center',
        eyebrow: 'ASSEMBLY',
        heading: 'Built by\nVulcans.',
        sub: '8+ years. 24+ competition wins. 60+ active members.',
    },
];

export default function RobotScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const framesRef = useRef<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [frameBase, setFrameBase] = useState(DESKTOP_FRAME_BASE);
    const [isMobile, setIsMobile] = useState(false);

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

    useEffect(() => {
        const updateFrameBase = () => {
            const mobile = window.innerWidth < MOBILE_BREAKPOINT;
            setIsMobile(mobile);
            setFrameBase(mobile ? MOBILE_FRAME_BASE : DESKTOP_FRAME_BASE);
        };

        updateFrameBase();
        window.addEventListener('resize', updateFrameBase);
        return () => window.removeEventListener('resize', updateFrameBase);
    }, []);

    useEffect(() => {
        let cancelled = false;
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];
        setLoaded(false);

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new window.Image();
            img.src = `${frameBase}${pad(i)}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (!cancelled && loadedCount === FRAME_COUNT) setLoaded(true);
            };
            img.onerror = () => {
                loadedCount++;
                if (!cancelled && loadedCount === FRAME_COUNT) setLoaded(true);
            };
            images.push(img);
        }
        framesRef.current = images;
        return () => {
            cancelled = true;
        };
    }, [frameBase]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (v) => {
            setProgress(v);
            const canvas = canvasRef.current;
            if (!canvas || !loaded) return;

            const idx = Math.min(Math.floor(v * FRAME_COUNT), FRAME_COUNT - 1);
            const img = framesRef.current[idx];
            if (!img || !img.complete) return;

            drawFrameToCanvas(
                canvas,
                img,
                isMobile ? 'cover' : 'contain',
                isMobile ? MOBILE_COVER_Y_OFFSET : 0
            );
        });
        return unsubscribe;
    }, [scrollYProgress, loaded, isMobile]);

    useEffect(() => {
        if (!loaded) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const img = framesRef.current[0];
        if (!img) return;
        drawFrameToCanvas(
            canvas,
            img,
            isMobile ? 'cover' : 'contain',
            isMobile ? MOBILE_COVER_Y_OFFSET : 0
        );
    }, [loaded, isMobile]);

    const activeOverlay = overlays.find(o => progress >= o.from && progress < o.to)
        ?? (progress >= 1 ? overlays[overlays.length - 1] : null);
    const isLandingHeadline = activeOverlay?.heading === 'Vulcans.' || activeOverlay?.heading === 'Built by\nVulcans.';
    const headingFontClass = isLandingHeadline ? 'font-landing' : 'font-tech';
    const isFirstSlide = activeOverlay?.heading === 'Vulcans.';
    const isFinalSlide = activeOverlay?.heading === 'Built by\nVulcans.';
    const finalSlidePositionClass = isFinalSlide
        ? (isMobile ? 'justify-start pt-20' : 'justify-start pt-16 md:pt-20 lg:pt-24')
        : '';

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            {!loaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--background)]">
                    <div className="w-12 h-12 border-2 border-white/10 border-t-[var(--primary)] rounded-full animate-spin mb-5" />
                    <p className="font-tech text-white/40 text-sm tracking-widest uppercase">Initialising</p>
                </div>
            )}

            <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ display: loaded ? 'block' : 'none' }}
                />

                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(ellipse 75% 100% at 50% 50%, transparent 20%, var(--background) 80%)',
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
                            } ${finalSlidePositionClass}`}
                    >
                        <p
                            className={`font-tech tracking-[0.3em] uppercase mb-3 font-semibold ${isFirstSlide ? 'text-[9px] sm:text-[10px]' : 'text-[10px] sm:text-xs'}`}
                            style={{ color: BRAND_EMBER }}
                        >
                            {activeOverlay.eyebrow}
                        </p>
                        <h2 className={`${headingFontClass} text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white/90 leading-tight whitespace-pre-line drop-shadow-2xl`}>
                            {activeOverlay.heading === 'Built by\nVulcans.' ? (
                                <>Built by{'\n'}<span style={{ color: BRAND_RED }}>Vulcans.</span></>
                            ) : activeOverlay.heading}
                        </h2>
                        <p className={`font-landing mt-4 text-white/70 max-w-sm font-medium tracking-wide ${isFirstSlide ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} ${isFinalSlide ? 'md:mt-40 lg:mt-40' : ''}`}>
                            {activeOverlay.sub}
                        </p>
                    </motion.div>
                )}

                {loaded && progress < 0.04 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <p className="font-tech text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll</p>
                        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
                    </motion.div>
                )}

                <div className="absolute bottom-0 left-0 h-px bg-white/5 w-full">
                    <motion.div
                        className="h-full bg-[var(--primary)]/50"
                        style={{ scaleX: progress, transformOrigin: 'left' }}
                    />
                </div>
            </div>
        </div>
    );
}
