'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
        scene.background = new THREE.Color(0x0d131c)

        // Camera
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            2000
        )
        camera.position.set(220, 140, 220)

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(container.clientWidth, container.clientHeight)
        container.appendChild(renderer.domElement)

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.06
        controls.target.set(0, 20, 0)

        // Lights
        scene.add(new THREE.HemisphereLight(0x9fc5ff, 0x243042, 0.9))

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.05)
        keyLight.position.set(140, 180, 100)
        scene.add(keyLight)

        const rimLight = new THREE.DirectionalLight(0x7fb3ff, 0.45)
        rimLight.position.set(-120, 80, -100)
        scene.add(rimLight)

        // Grid
        const grid = new THREE.GridHelper(500, 20, 0x516278, 0x2a3442)
        grid.position.y = -0.01
        scene.add(grid)

        // Load OBJ
        const loader = new OBJLoader()
        loader.load(
            src,
            (object) => {
                // Center and scale the model
                const box = new THREE.Box3().setFromObject(object)
                const center = box.getCenter(new THREE.Vector3())
                const size = box.getSize(new THREE.Vector3())
                const maxDimension = Math.max(size.x, size.y, size.z)
                const targetSize = 120
                const scale = targetSize / maxDimension

                object.position.sub(center)
                object.scale.setScalar(scale)
                object.position.y += size.y * scale / 2

                // Apply material to all meshes
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

                scene.add(object)
                controls.target.set(0, 0, 0)
            },
            undefined,
            (error) => {
                console.error('Failed to load OBJ:', error)
            }
        )

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
