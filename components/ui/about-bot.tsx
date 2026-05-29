'use client'

import Image from 'next/image'

export function AboutBot() {
    return (
        <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden border border-vulcan-border bg-vulcan-bg-secondary shadow-2xl group transition-all duration-500 hover:shadow-vulcan-soft">
            <Image
                src="/about-soldering.jpg"
                alt="Team Vulcans Electronics & Hardware Engineering"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Overlay gradient to blend nicely with the theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-vulcan-bg-primary/50 via-transparent to-transparent pointer-events-none" />
        </div>
    )
}
