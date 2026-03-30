'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { CircularLoader } from '@/components/ui/circular-loader'

interface OBJViewerProps {
    src: string
    className?: string
    modelName?: string
}

export function OBJViewer({ src, className = '', modelName = '2025 basketball bot' }: OBJViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [loadError, setLoadError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        let cancelled = false
        setLoadError(null)
        setLoading(true)
        setProgress(0)

        // Scene setup
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0xe7e7e7)
        scene.fog = new THREE.Fog(0xe7e7e7, 260, 760)

        // Camera
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            2000
        )
        camera.position.set(180, 120, 180)

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.05
        container.appendChild(renderer.domElement)

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.06
        controls.target.set(0, 20, 0)

        // Lights
        scene.add(new THREE.HemisphereLight(0xffffff, 0xdadada, 1.05))

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.1)
        keyLight.position.set(120, 160, 90)
        scene.add(keyLight)

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.55)
        fillLight.position.set(-80, 90, -80)
        scene.add(fillLight)

        const rimLight = new THREE.DirectionalLight(0xffffff, 0.28)
        rimLight.position.set(-120, 60, -100)
        scene.add(rimLight)

        // Subtle ground cue
        const grid = new THREE.GridHelper(440, 16, 0xd2d2d2, 0xd8d8d8)
        grid.position.y = -0.005
        ;(grid.material as THREE.Material).transparent = true
        ;(grid.material as THREE.Material).opacity = 0.35
        scene.add(grid)

        const fitCameraToObject = (object: THREE.Object3D) => {
            const box = new THREE.Box3().setFromObject(object)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())
            const maxSize = Math.max(size.x, size.y, size.z) || 1
            const fitHeightDistance = maxSize / (2 * Math.tan((Math.PI * camera.fov) / 360))
            const fitWidthDistance = fitHeightDistance / camera.aspect
            const distance = Math.max(fitHeightDistance, fitWidthDistance) * 1.35
            const direction = new THREE.Vector3(1, 0.65, 1).normalize()

            controls.target.copy(center)
            camera.position.copy(center.clone().add(direction.multiplyScalar(distance)))
            camera.near = Math.max(distance / 100, 0.01)
            camera.far = distance * 100
            camera.updateProjectionMatrix()
            controls.update()
        }

        let loadedObject: THREE.Object3D | null = null
        const normalizeLoadedObject = (object: THREE.Object3D, shouldOverrideMaterial: boolean) => {
            const box = new THREE.Box3().setFromObject(object)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())
            const maxDimension = Math.max(size.x, size.y, size.z) || 1
            const targetSize = 120
            const scale = targetSize / maxDimension

            object.position.sub(center)
            object.scale.setScalar(scale)
            object.position.y += (size.y * scale) / 2

            if (shouldOverrideMaterial) {
                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshPhysicalMaterial({
                            color: 0xbfc8d8,
                            metalness: 0.2,
                            roughness: 0.5,
                            clearcoat: 0.25,
                            clearcoatRoughness: 0.35
                        })
                    }
                })
            }

            loadedObject = object
            scene.add(object)
            fitCameraToObject(object)
            setLoading(false)
        }

        const onProgress = (xhr: ProgressEvent) => {
            if (xhr.lengthComputable) {
                const percentComplete = (xhr.loaded / xhr.total) * 100
                setProgress(Math.round(percentComplete))
            }
        }

        if (src.toLowerCase().includes('.glb')) {
            const gltfLoader = new GLTFLoader()
            const loadGlb = async () => {
                try {
                    const GLB_MAGIC = 0x46546c67 // "glTF" in little-endian
                    const buildAttemptUrl = (attempt: number) => {
                        if (attempt === 0) return src
                        const sep = src.includes('?') ? '&' : '?'
                        return `${src}${sep}cb=${Date.now()}-${attempt}`
                    }

                    const fetchGlbWithRetry = async (maxAttempts = 3) => {
                        let lastError: unknown = null
                        for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
                            try {
                                const url = buildAttemptUrl(attempt)
                                const response = await fetch(url, { cache: 'no-store' })
                                if (!response.ok) {
                                    throw new Error(`HTTP ${response.status} while fetching model`)
                                }

                                const buffer = await response.arrayBuffer()
                                const probeSize = Math.min(buffer.byteLength, 160)
                                const probeText = new TextDecoder().decode(new Uint8Array(buffer.slice(0, probeSize)))
                                if (probeText.startsWith('version https://git-lfs.github.com/spec/v1')) {
                                    throw new Error('Model URL returned a Git LFS pointer file, not a GLB binary')
                                }

                                const trimmedProbe = probeText.trimStart().toLowerCase()
                                if (trimmedProbe.startsWith('<!doctype') || trimmedProbe.startsWith('<html')) {
                                    throw new Error('Model URL returned HTML instead of a GLB file')
                                }

                                if (buffer.byteLength < 12) {
                                    throw new Error('GLB response is too small to be valid')
                                }

                                const header = new DataView(buffer, 0, 12)
                                const magic = header.getUint32(0, true)
                                const declaredLength = header.getUint32(8, true)
                                if (magic !== GLB_MAGIC) {
                                    throw new Error('Response is not a valid GLB binary (missing glTF header)')
                                }
                                if (declaredLength !== buffer.byteLength) {
                                    throw new Error(
                                        `GLB size mismatch: declared ${declaredLength} bytes, received ${buffer.byteLength} bytes`
                                    )
                                }
                                return buffer
                            } catch (error) {
                                lastError = error
                            }
                        }
                        throw lastError ?? new Error('Unknown GLB fetch error')
                    }

                    const buffer = await fetchGlbWithRetry()

                    gltfLoader.parse(
                        buffer,
                        '',
                        (gltf) => {
                            if (cancelled) return
                            normalizeLoadedObject(gltf.scene, false)
                        },
                        (error) => {
                            if (cancelled) return
                            console.error('Failed to parse GLB:', error)
                            setLoadError('Failed to parse GLB model.')
                            setLoading(false)
                        }
                    )
                } catch (error) {
                    if (cancelled) return
                    console.error('Failed to load GLB:', error)
                    const message = error instanceof Error ? error.message : 'Unknown GLB loading error'
                    setLoadError(`${message}.`)
                    setLoading(false)
                }
            }
            void loadGlb()
        } else {
            const objLoader = new OBJLoader()
            objLoader.load(
                src,
                (object) => normalizeLoadedObject(object, true),
                onProgress,
                (error) => {
                    console.error('Failed to load OBJ:', error)
                    setLoadError('Failed to load OBJ model.')
                    setLoading(false)
                }
            )
        }

        // Resize handler
        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(container.clientWidth, container.clientHeight)
        }
        window.addEventListener('resize', handleResize)

        // Animation loop
        let animationId: number
        const animate = () => {
            animationId = requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }
        animate()

        // Cleanup
        return () => {
            cancelled = true
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', handleResize)
            if (loadedObject) {
                scene.remove(loadedObject)
            }
            renderer.dispose()
            container.removeChild(renderer.domElement)
        }
    }, [src])

    return (
        <div className={`relative w-full h-full group ${className}`} style={{ minHeight: '400px' }}>
            <div ref={containerRef} className="w-full h-full" />
            
            {/* Info Overlay */}
            <div className="absolute top-4 left-4 pointer-events-none select-none">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-2xl">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-white/50 font-tech uppercase tracking-[0.2em]">Model System</span>
                        <h3 className="text-sm text-white/90 font-bold font-tech tracking-wide leading-none">{modelName}</h3>
                        <p className="text-[9px] text-white/40 font-medium mt-1 uppercase tracking-wider">Drag to orbit | Scroll to zoom</p>
                    </div>
                </div>
            </div>

            {/* Error State */}
            {loadError && (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm font-tech text-red-500 bg-[#0B0B0F]/90 backdrop-blur-sm z-30">
                    <div className="max-w-xs space-y-2">
                        <div className="text-xl">⚠️</div>
                        <p className="leading-relaxed opacity-90">{loadError}</p>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && !loadError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B0B0F]/5 z-20 backdrop-blur-[2px]">
                    <div className="relative flex flex-col items-center p-8 rounded-2xl w-full">
                        <CircularLoader text="Loading" className="scale-90" />
                        {progress > 0 && (
                            <div className="mt-8 flex flex-col items-center gap-2">
                                <span className="text-[10px] font-tech text-black/40 uppercase tracking-[0.3em] font-bold">
                                    Decoding Stream
                                </span>
                                <div className="text-xs font-tech text-black/60 font-medium">
                                    {progress}%
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
