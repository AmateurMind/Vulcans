'use client'

import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

export function AboutBot() {
    return (
        <div className="w-full h-[320px] md:h-[420px]">
            <Spline
                scene="/scene-clean%20%281%29.splinecode"
                className="w-full h-full"
            />
        </div>
    )
}
