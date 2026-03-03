'use client'

import dynamic from 'next/dynamic'

const OBJViewer = dynamic(
    () => import('../../components/obj-viewer').then(mod => ({ default: mod.OBJViewer })),
    { ssr: false }
)

export default function OBJViewerPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <section className="pt-28 pb-6 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">3D OBJ Viewer</h1>
                <p className="text-[var(--muted-foreground)] mt-3">
                    R2 Robot Model (Base + Drive + Shooter)
                </p>
            </section>

            <section className="px-6 pb-16">
                <div className="max-w-6xl mx-auto border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--card)]">
                    <div className="h-[72vh] min-h-[520px] w-full relative">
                        <OBJViewer src="/models/R2.obj" className="w-full h-full" />

                        {/* HUD Overlay */}
                        <div className="absolute top-4 left-4 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20 text-sm text-white/90">
                            <div className="font-semibold">Model: R2.obj</div>
                            <div className="text-white/70 text-xs">Drag to orbit • Scroll to zoom</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
