'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useScroll, motion } from 'framer-motion';
import Image from 'next/image';
import { Component as QuantumPulseLoade } from '@/components/ui/quantum-pulse-loade';

const FRAME_COUNT = 128;
const MOBILE_BREAKPOINT = 768;
const DESKTOP_FRAME_BASE = '/frames/ezgif-frame-';
const MOBILE_FRAME_BASE = '/frames-mobile/ezgif-frame-';
const MOBILE_VIDEO_SRC = '/robot-scroll-mobile.mp4';
const MOBILE_FOCUS_SCALE = 1.14;
const MOBILE_FOCUS_Y_OFFSET = 20;
const BRAND_EMBER = '#FF6A3D';
const MOBILE_PRELOAD_BATCH_SIZE = 4;
const DESKTOP_PRELOAD_BATCH_SIZE = 12;
const MOBILE_PRELOAD_DELAY_MS = 120;
const DESKTOP_PRELOAD_DELAY_MS = 16;

function pad(n: number) {
    return n.toString().padStart(3, '0');
}

function getInitialIsMobile() {
    return typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;
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

    const nextWidth = window.innerWidth;
    const nextHeight = fullHeight ? window.innerHeight : window.innerHeight - 64;

    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
    }

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
        sub: '15+ years. 20+ competition . 50+ active members.',
    },
];

export default function RobotScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const framesRef = useRef<HTMLImageElement[]>([]);
    const loadedFramesRef = useRef<Set<number>>(new Set());
    const progressRef = useRef(0);
    const isMobileRef = useRef(getInitialIsMobile());
    const drawRafRef = useRef<number | null>(null);
    const videoRafRef = useRef<number | null>(null);
    const videoDurationRef = useRef(0);
    const [sequenceReady, setSequenceReady] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const [frameBase, setFrameBase] = useState(() => getInitialIsMobile() ? MOBILE_FRAME_BASE : DESKTOP_FRAME_BASE);
    const [isMobile, setIsMobile] = useState(getInitialIsMobile);
    const loaded = isMobile ? videoReady : sequenceReady;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
        trackContentSize: true,
    });

    const getDrawableFrameIndex = useCallback((targetIndex: number) => {
        if (loadedFramesRef.current.has(targetIndex + 1)) return targetIndex;

        for (let distance = 1; distance < FRAME_COUNT; distance++) {
            const previous = targetIndex - distance;
            const next = targetIndex + distance;

            if (previous >= 0 && loadedFramesRef.current.has(previous + 1)) {
                return previous;
            }

            if (next < FRAME_COUNT && loadedFramesRef.current.has(next + 1)) {
                return next;
            }
        }

        return -1;
    }, []);

    const drawProgressFrame = useCallback((value = progressRef.current) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const targetIndex = Math.min(Math.floor(value * FRAME_COUNT), FRAME_COUNT - 1);
        const drawableIndex = getDrawableFrameIndex(targetIndex);
        if (drawableIndex < 0) return;

        const img = framesRef.current[drawableIndex];
        if (!img || !img.complete) return;

        drawFrameToCanvas(
            canvas,
            img,
            isMobileRef.current ? 'cover' : 'contain',
            0,
            isMobileRef.current
        );
    }, [getDrawableFrameIndex]);

    const requestDrawProgressFrame = useCallback((value = progressRef.current) => {
        progressRef.current = value;

        if (drawRafRef.current !== null) {
            window.cancelAnimationFrame(drawRafRef.current);
        }

        drawRafRef.current = window.requestAnimationFrame(() => {
            drawRafRef.current = null;
            drawProgressFrame(progressRef.current);
        });
    }, [drawProgressFrame]);

    const requestScrubVideo = useCallback((value = progressRef.current) => {
        progressRef.current = value;

        if (videoRafRef.current !== null) {
            window.cancelAnimationFrame(videoRafRef.current);
        }

        videoRafRef.current = window.requestAnimationFrame(() => {
            videoRafRef.current = null;

            const video = videoRef.current;
            if (!video || !videoDurationRef.current) return;

            const maxTime = Math.max(videoDurationRef.current - 0.001, 0);
            const nextTime = Math.min(videoDurationRef.current * progressRef.current, maxTime);

            if (Math.abs(video.currentTime - nextTime) > 0.03) {
                video.currentTime = nextTime;
            }
        });
    }, []);

    useEffect(() => {
        const updateFrameBase = () => {
            const mobile = window.innerWidth < MOBILE_BREAKPOINT;
            isMobileRef.current = mobile;
            setIsMobile(mobile);
            setFrameBase(mobile ? MOBILE_FRAME_BASE : DESKTOP_FRAME_BASE);
        };

        updateFrameBase();
        window.addEventListener('resize', updateFrameBase);
        return () => window.removeEventListener('resize', updateFrameBase);
    }, []);

    useEffect(() => {
        let cancelled = false;
        const images: HTMLImageElement[] = [];
        loadedFramesRef.current = new Set();
        setSequenceReady(false);

        if (isMobile) {
            framesRef.current = [];
            return () => {
                cancelled = true;
            };
        }

        const loadFrame = (index: number) => {
            const img = images[index - 1];
            if (!img || img.src) return;

            const markReady = () => {
                loadedFramesRef.current.add(index);
                if (!cancelled && index === 1) setSequenceReady(true);
                if (!cancelled) requestDrawProgressFrame();
            };

            img.onload = () => {
                // Ensure browsers that support decode() only mark as ready once drawable.
                if (typeof img.decode === 'function') {
                    img.decode().then(markReady).catch(markReady);
                    return;
                }
                markReady();
            };
            img.onerror = markReady;

            img.src = `${frameBase}${pad(index)}.jpg`;
        };

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new window.Image();
            img.decoding = 'async';
            images.push(img);
        }
        framesRef.current = images;

        loadFrame(1);

        const priorityFrames = isMobile
            ? [16, 32, 48, 64, 80, 96, 112, 128]
            : [32, 64, 96, 128];
        priorityFrames.forEach(loadFrame);

        const remainingFrames = Array.from({ length: FRAME_COUNT - 1 }, (_, i) => i + 2)
            .filter((index) => !priorityFrames.includes(index));
        const batchSize = isMobile ? MOBILE_PRELOAD_BATCH_SIZE : DESKTOP_PRELOAD_BATCH_SIZE;
        const batchDelay = isMobile ? MOBILE_PRELOAD_DELAY_MS : DESKTOP_PRELOAD_DELAY_MS;

        let preloadTimer: number | null = null;

        const preloadNextBatch = () => {
            for (let i = 0; i < batchSize && remainingFrames.length > 0; i++) {
                loadFrame(remainingFrames.shift()!);
            }

            if (remainingFrames.length > 0) {
                preloadTimer = window.setTimeout(preloadNextBatch, batchDelay);
            }
        };

        preloadTimer = window.setTimeout(preloadNextBatch, batchDelay);

        return () => {
            cancelled = true;
            if (preloadTimer !== null) window.clearTimeout(preloadTimer);
        };
    }, [frameBase, isMobile, requestDrawProgressFrame]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (v) => {
            setProgress(v);
            if (isMobileRef.current) {
                requestScrubVideo(v);
            } else {
                requestDrawProgressFrame(v);
            }
        });
        return unsubscribe;
    }, [requestDrawProgressFrame, requestScrubVideo, scrollYProgress]);

    useEffect(() => {
        if (!loaded) return;
        if (isMobile) {
            requestScrubVideo();
        } else {
            requestDrawProgressFrame();
        }
    }, [isMobile, loaded, requestDrawProgressFrame, requestScrubVideo]);

    useEffect(() => {
        const redrawAfterLayoutSettles = () => {
            if (isMobileRef.current) {
                requestScrubVideo();
            } else {
                requestDrawProgressFrame();
            }
        };

        window.addEventListener('load', redrawAfterLayoutSettles);
        window.addEventListener('resize', redrawAfterLayoutSettles);
        document.fonts?.ready.then(redrawAfterLayoutSettles).catch(() => undefined);

        return () => {
            window.removeEventListener('load', redrawAfterLayoutSettles);
            window.removeEventListener('resize', redrawAfterLayoutSettles);
        };
    }, [requestDrawProgressFrame, requestScrubVideo]);

    useEffect(() => {
        return () => {
            if (drawRafRef.current !== null) {
                window.cancelAnimationFrame(drawRafRef.current);
            }
            if (videoRafRef.current !== null) {
                window.cancelAnimationFrame(videoRafRef.current);
            }
        };
    }, []);

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
                    <QuantumPulseLoade text="Initializing" />
                </div>
            )}

            <div className={`sticky w-full overflow-hidden bg-[#0B0B0F] ${isMobile ? 'top-0 h-[100dvh]' : 'top-16 h-[calc(100vh-4rem)]'}`}>
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ display: loaded && !isMobile ? 'block' : 'none' }}
                />

                {isMobile && (
                    <video
                        ref={videoRef}
                        src={MOBILE_VIDEO_SRC}
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ display: loaded ? 'block' : 'none' }}
                        onLoadedMetadata={(event) => {
                            videoDurationRef.current = event.currentTarget.duration;
                            setVideoReady(true);
                            requestScrubVideo();
                        }}
                        onCanPlay={(event) => {
                            videoDurationRef.current = event.currentTarget.duration;
                            setVideoReady(true);
                            requestScrubVideo();
                        }}
                    />
                )}

                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(ellipse 75% 100% at 50% 50%, transparent 20%, #0B0B0F 80%)',
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
