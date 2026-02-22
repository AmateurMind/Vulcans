'use client'

import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

export default function SplinePreviewPage() {
    return (
        <main className="min-h-screen bg-vulcan-bg-primary text-vulcan-text-primary">
            <section className="pt-28 pb-10 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">Bot Preview</h1>
                <p className="text-vulcan-text-muted mt-3">Local Spline scene test page.</p>
            </section>

            <section className="px-6 pb-16">
                <div className="max-w-6xl mx-auto glass bg-vulcan-bg-secondary border-vulcan-border rounded-xs overflow-hidden">
                    <div className="h-[72vh] min-h-[520px] w-full">
                        <Spline
                            scene="/scene-clean%20%281%29.splinecode"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}
