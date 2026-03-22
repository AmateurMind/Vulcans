'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

interface OBJViewerProps {
    src: string
    className?: string
}

export function OBJViewer({ src, className = '' }: OBJViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current

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

        // Subtle ground cue (no strong blue grid)
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
        }

        if (src.toLowerCase().endsWith('.glb')) {
            const gltfLoader = new GLTFLoader()
            gltfLoader.load(
                src,
                (gltf) => normalizeLoadedObject(gltf.scene, false),
                undefined,
                (error) => {
                    console.error('Failed to load GLB:', error)
                }
            )
        } else {
            const objLoader = new OBJLoader()
            objLoader.load(
                src,
                (object) => normalizeLoadedObject(object, true),
                undefined,
                (error) => {
                    console.error('Failed to load OBJ:', error)
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
        <div
            ref={containerRef}
            className={`w-full h-full ${className}`}
            style={{ minHeight: '400px' }}
        />
    )
}
