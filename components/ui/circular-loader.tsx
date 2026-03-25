'use client';

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type CircularLoaderProps = {
    className?: string;
    text?: string;
};

export function CircularLoader({ className, text = "Loading" }: CircularLoaderProps) {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={cn("flex flex-col items-center justify-center gap-10", className)}>
            <div className="relative flex items-center justify-center">
                {/* Main Spinning Shiny Black Ring */}
                <div className="w-16 h-16 rounded-full border-[3px] border-black/5 border-t-black animate-[spin_1.1s_linear_infinite] shadow-inner" />
                
                {/* Secondary 'Shiny' Ring Overlay */}
                <div className="absolute w-16 h-16 rounded-full border-t border-white/40 animate-[spin_1.1s_linear_infinite]" />
                
                {/* Rotating Shiny Point (Orb) */}
                <div className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gray-200 to-black shadow-[0_0_8px_rgba(0,0,0,0.6),0_0_2px_white] -top-[3px] left-1/2 -translate-x-1/2" />
                
                {/* Secondary Fast Rolling Decorative Circle */}
                <div className="absolute w-12 h-12 rounded-full border border-transparent border-r-black/20 animate-[spin_0.7s_linear_infinite_reverse]" />
            </div>

            <div className="flex flex-col items-center gap-2">
                <div className="font-tech text-base md:text-lg uppercase tracking-[0.4em] text-black drop-shadow-sm min-w-[12rem] text-center font-bold">
                    {text}<span className="inline-block w-8 text-left">{dots}</span>
                </div>
                <div className="text-[10px] font-tech text-black/40 tracking-[0.2em] uppercase text-center font-bold animate-pulse">
                    Initiating System Core
                </div>
            </div>
        </div>
    );
}
