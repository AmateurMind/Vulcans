'use client'

import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"

export function LandingHero() {
    return (
        <Card className="w-full h-[600px] bg-vulcan-bg-primary relative overflow-hidden border-0 rounded-none">
            {/* Background Red Glow */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ background: "radial-gradient(circle at center, rgba(225,6,0,0.18), #0B0B0F 70%)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />

            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20 z-10"
            />

            <div className="flex flex-col md:flex-row h-full">
                {/* Left content */}
                <div className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="text-5xl md:text-7xl font-bold text-vulcan-text-primary tracking-tight font-landing"
                    >
                        Interactive 3D
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="h-[2px] w-24 bg-vulcan-gradient mt-6 origin-left"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.16, ease: [0.4, 0, 0.2, 1] }}
                        className="mt-6 text-vulcan-text-muted text-lg max-w-lg font-tech"
                    >
                        Bring your UI to life with beautiful 3D scenes. Create immersive experiences
                        that capture attention and enhance your design.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.24, ease: [0.4, 0, 0.2, 1] }}
                        className="mt-10"
                    >
                        <motion.button
                            whileHover={{ y: -3, boxShadow: "0 0 25px rgba(225,6,0,0.45)" }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="px-8 py-3 bg-vulcan-gradient text-white font-bold rounded-sm shadow-vulcan-soft transition-all relative overflow-hidden group uppercase tracking-widest text-sm"
                        >
                            <span className="relative z-10">Get Started</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Right content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="flex-1 relative min-h-[300px] md:min-h-full z-10"
                >
                    <div className="w-full h-full bg-[radial-gradient(circle_at_50%_45%,rgba(225,6,0,0.30),rgba(225,6,0,0.12)_28%,transparent_65%)]" />
                </motion.div>
            </div>
        </Card>
    )
}
