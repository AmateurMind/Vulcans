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
                id: 'r2-base-drive-shooter-obj',
                label: 'R2 (base+drive+shooter) OBJ',
                src: '/models/r2-base-drive-shooter.obj',
            },
            {
                id: 'r2-2k24',
                label: 'R2 2k24',
                src: '/models/r2-2k24.obj',
            },
        ],
        []
    )

    const [availableModels] = useState(models)
    const [selectedModelId, setSelectedModelId] = useState(models[0].id)

    const selectedModel = availableModels.find((model) => model.id === selectedModelId) ?? availableModels[0]

    return (
        <main className="min-h-screen bg-vulcan-bg-primary text-vulcan-text-primary">
            <section className="pt-28 pb-6 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-vulcan-text-primary">3D Model Viewer</h1>
                <p className="text-vulcan-text-muted mt-3">Switch between your R2 OBJ models</p>
            </section>

            <section className="px-6 pb-16">
                <div className="max-w-6xl mx-auto mb-4 flex flex-wrap items-center justify-center gap-2">
                    {availableModels.map((model) => {
                        const isActive = model.id === selectedModel?.id
                        return (
                            <button
                                key={model.id}
                                type="button"
                                onClick={() => setSelectedModelId(model.id)}
                                className={`px-4 py-2 rounded-xs border text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary text-white border-primary shadow-sm'
                                    : 'bg-vulcan-bg-secondary border-vulcan-border text-vulcan-text-primary hover:bg-vulcan-bg-primary hover:border-vulcan-text-muted'
                                    }`}
                            >
                                {model.label}
                            </button>
                        )
                    })}
                </div>

                <div className="max-w-6xl mx-auto glass bg-vulcan-bg-secondary border-vulcan-border rounded-xs overflow-hidden shadow-xl">
                    <div className="h-[72vh] min-h-[520px] w-full relative">
                        {selectedModel ? (
                            <OBJViewer src={selectedModel.src} className="w-full h-full" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-vulcan-text-muted px-6 text-center">
                                No model files found in <code className="mx-1">public/models</code>. Add a <code className="mx-1">.obj</code> or <code className="mx-1">.glb</code> file and refresh.
                            </div>
                        )}

                        {selectedModel && (
                            <div className="absolute top-4 left-4 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20 text-sm text-white/90">
                                <div className="font-semibold">Model: {selectedModel.label}</div>
                                <div className="text-white/70 text-xs">Drag to orbit | Scroll to zoom</div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}
