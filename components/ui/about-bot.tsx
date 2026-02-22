'use client'

import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })
const SCENE_URL = '/about-bot.splinecode'

export function AboutBot() {
    return (
        <div className="w-full h-[320px] md:h-[420px]">
            <Spline
                scene={SCENE_URL}
                className="w-full h-full"
            />
        </div>
    )
}
