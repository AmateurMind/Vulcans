'use client'

import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

const OBJViewer = dynamic(
    () => import('@/components/ui/obj-viewer').then((mod) => ({ default: mod.OBJViewer })),
    { ssr: false }
)

export default function OBJViewerPage() {
    const models = useMemo(
        () => [
            {
                id: 'r2-base-drive-shooter-glb',
                label: 'R2 (base+drive+shooter) GLB',
                src: '/models/R2%20(base%2Bdrive%2Bshooter).glb',
            },
            {
                id: 'r2-2k24',
                label: 'R2 2k24',
                src: '/models/R2-2k24.obj',
            },
        ],
        []
    )

    const [selectedModelId, setSelectedModelId] = useState(models[0].id)
    const selectedModel = models.find((model) => model.id === selectedModelId) ?? models[0]

    return (
        <main className="min-h-screen bg-vulcan-bg-primary text-vulcan-text-primary">
            <section className="pt-28 pb-6 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">3D Model Viewer</h1>
                <p className="text-vulcan-text-muted mt-3">Switch between your R2 OBJ and GLB models</p>
            </section>

            <section className="px-6 pb-16">
                <div className="max-w-6xl mx-auto mb-4 flex flex-wrap items-center justify-center gap-2">
                    {models.map((model) => {
                        const isActive = model.id === selectedModel.id
                        return (
                            <button
                                key={model.id}
                                type="button"
                                onClick={() => setSelectedModelId(model.id)}
                                className={`px-3 py-2 rounded-xs border text-sm transition-colors ${isActive
                                        ? 'bg-vulcan-accent text-white border-vulcan-accent'
                                        : 'bg-vulcan-bg-secondary border-vulcan-border text-vulcan-text-muted hover:text-vulcan-text-primary'
                                    }`}
                            >
                                {model.label}
                            </button>
                        )
                    })}
                </div>

                <div className="max-w-6xl mx-auto glass bg-vulcan-bg-secondary border-vulcan-border rounded-xs overflow-hidden">
                    <div className="h-[72vh] min-h-[520px] w-full relative">
                        <OBJViewer src={selectedModel.src} className="w-full h-full" />

                        <div className="absolute top-4 left-4 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20 text-sm text-white/90">
                            <div className="font-semibold">Model: {selectedModel.label}</div>
                            <div className="text-white/70 text-xs">Drag to orbit | Scroll to zoom</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
