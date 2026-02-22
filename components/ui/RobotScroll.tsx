'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, motion } from 'framer-motion';
import Image from 'next/image';

const FRAME_COUNT = 128;
const MOBILE_BREAKPOINT = 768;
const DESKTOP_FRAME_BASE = '/frames/ezgif-frame-';
const MOBILE_FRAME_BASE = '/frames-mobile/ezgif-frame-';
const MOBILE_FOCUS_SCALE = 1.14;
const MOBILE_FOCUS_Y_OFFSET = 20;
const BRAND_EMBER = '#FF6A3D';

function pad(n: number) {
    return n.toString().padStart(3, '0');
}

function drawFrameToCanvas(
    canvas: HTMLCanvasElement,
    img: HTMLImageElement,
    fillMode: 'contain' | 'cover',
    yOffset = 0,
    fullHeight = false
) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = fullHeight ? window.innerHeight : window.innerHeight - 64;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = fillMode === 'cover'
        ? Math.max(cw / iw, ch / ih)
        : Math.min(cw / iw, ch / ih);
    const focusScale = fullHeight && fillMode === 'cover' ? MOBILE_FOCUS_SCALE : 1;
    const dw = iw * scale * focusScale;
    const dh = ih * scale * focusScale;
    const dx = (cw - dw) / 2;
    const focusYOffset = fullHeight && fillMode === 'cover' ? MOBILE_FOCUS_Y_OFFSET : 0;
    const dy = (ch - dh) / 2 + yOffset + focusYOffset;

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
        eyebrow: 'ROBOTICS CLUB',
        heading: 'Vulcans.',
        sub: 'PESMCOE',
    },
    {
        from: 0.22,
        to: 0.48,
        align: 'left',
        eyebrow: 'MECHANICAL SYSTEMS',
        heading: 'Precision\nDrive \nSystems.',
        sub: 'Designed, machined, and tuned by PESMCOE student engineers.',
    },
    {
        from: 0.48,
        to: 0.75,
        align: 'right',
        eyebrow: 'CONTROL AND AUTONOMY',
        heading: 'Code.\nCompete.\nControl.',
        sub: 'From embedded logic to autonomous routines, built inside the club.',
    },
    {
        from: 0.75,
        to: 1.0,
        align: 'center',
        eyebrow: 'WE ARE',
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
                0,
                isMobile
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
            0,
            isMobile
        );
    }, [loaded, isMobile]);

    const activeOverlay = overlays.find(o => progress >= o.from && progress < o.to)
        ?? (progress >= 1 ? overlays[overlays.length - 1] : null);
    const isLandingHeadline = activeOverlay?.heading === 'Vulcans.' || activeOverlay?.heading === 'Built by\nVulcans.';
    const headingFontClass = isLandingHeadline ? 'font-landing' : 'font-tech';
    const isFirstSlide = activeOverlay?.heading === 'Vulcans.';
    const isFinalSlide = activeOverlay?.heading === 'Built by\nVulcans.';
    const isMiddleSlide = !!activeOverlay && !isLandingHeadline;
    const finalSlidePositionClass = isFinalSlide
        ? (isMobile ? 'justify-start pt-28' : 'justify-start pt-16 md:pt-20 lg:pt-24')
        : '';
    const middleSlidePositionClass = isMiddleSlide
        ? (isMobile ? 'justify-between pt-14 pb-8' : '')
        : '';

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            {!loaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--background)]">
                    <div className="w-12 h-12 border-2 border-white/10 border-t-[var(--primary)] rounded-full animate-spin mb-5" />
                    <p className="font-tech text-white/40 text-sm tracking-widest uppercase">Initialising</p>
                </div>
            )}

            <div className={`sticky w-full overflow-hidden ${isMobile ? 'top-0 h-[100dvh]' : 'top-16 h-[calc(100vh-4rem)]'}`}>
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
                            } ${finalSlidePositionClass} ${middleSlidePositionClass}`}
                    >
                        <p
                            className={`font-tech tracking-[0.3em] uppercase mb-3 ${isFirstSlide ? 'text-sm sm:text-base lg:text-xl tracking-[0.5em] font-extrabold' : isFinalSlide ? (isMobile ? 'text-xl tracking-[0.45em] font-bold mb-5' : 'text-[10px] sm:text-xs font-semibold') : isMobile ? 'text-sm font-bold' : 'text-[10px] sm:text-xs font-semibold'}`}
                            style={{ color: BRAND_EMBER }}
                        >
                            {activeOverlay.eyebrow}
                        </p>
                        <h2
                            className={`${headingFontClass} ${isFirstSlide ? 'text-6xl sm:text-8xl lg:text-[10rem] mb-6' : isFinalSlide ? 'text-5xl sm:text-7xl lg:text-8xl mb-8' : isMobile ? 'text-[3.35rem] leading-[0.95]' : 'text-4xl sm:text-6xl lg:text-7xl'} font-bold tracking-tight leading-tight whitespace-pre-line ${isMobile && !isLandingHeadline ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFD2AC] via-[#FF9D63] to-[#FF5B2D] drop-shadow-[0_3px_12px_rgba(0,0,0,0.65)]' : 'text-white/90 drop-shadow-2xl'}`}
                        >
                            {activeOverlay.heading === 'Built by\nVulcans.' ? (
                                <Image
                                    src="/reference/text-transparent.png"
                                    alt="Vulcans"
                                    width={320}
                                    height={96}
                                    priority
                                    className={`${isMobile ? 'h-36' : 'h-24 sm:h-28 lg:h-36'} w-auto`}
                                />
                            ) : activeOverlay.heading === 'Vulcans.' ? (
                                <Image
                                    src="/reference/text-transparent.png"
                                    alt="Vulcans"
                                    width={320}
                                    height={96}
                                    priority
                                    className="h-24 sm:h-28 lg:h-36 w-auto"
                                />
                            ) : activeOverlay.heading}
                        </h2>
                        <p
                            className={`font-landing font-medium tracking-wide ${isMobile ? 'mt-[35vh] text-center self-center' : 'mt-2'} ${isFirstSlide ? 'max-w-2xl text-base sm:text-lg lg:text-2xl text-white/75 not-italic' : isFinalSlide ? (isMobile ? 'max-w-sm text-sm text-[#FFDCC4] italic mb-2' : 'max-w-md text-base sm:text-lg mt-[33vh] sm:mt-12 md:mt-44 lg:mt-44 text-white/75 not-italic') : isMobile ? 'max-w-sm text-sm text-[#FFDCC4] italic mb-2' : 'max-w-sm text-sm sm:text-base text-white/70'}`}
                            style={isLandingHeadline ? undefined : { textShadow: '0 2px 8px rgba(0,0,0,0.75)' }}
                        >
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
