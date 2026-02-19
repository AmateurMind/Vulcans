'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Achievements', href: '/achievements' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
]

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [hideNav, setHideNav] = useState(true)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            const robotZone = window.innerHeight * 4 // 400vh
            setScrolled(y > 20)
            // Hide navbar while inside the scrollytelling section, show after
            setHideNav(y < robotZone - window.innerHeight * 0.5)
        }
        // Run once on mount
        onScroll()
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Only collapse nav links on homepage during robot scroll
    const isHome = pathname === '/'
    const minimalMode = isHome && hideNav

    return (
        <header className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
            scrolled
                ? 'py-2 backdrop-blur-xl border-b border-white/5'
                : 'py-4 bg-transparent'
        )}>

            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow shrink-0"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
                    >
                        <Cpu className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">
                        Vul<span className="text-violet-400">cans</span>
                    </span>
                </Link>


                {/* Desktop Nav — hidden during robot scroll */}
                <nav className={cn("hidden md:flex items-center gap-1 transition-all duration-300", minimalMode && "invisible opacity-0 w-0 overflow-hidden")}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                pathname === link.href
                                    ? 'bg-violet-500/15 text-violet-300'
                                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/contact"
                        className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-violet-500/20 hover:shadow-violet-500/40"
                    >
                        Join Us
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden mt-2 mx-4 rounded-2xl bg-[#0d1117]/95 backdrop-blur-xl border border-white/8 shadow-2xl overflow-hidden">
                    <nav className="flex flex-col p-3 gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    'px-4 py-3 rounded-xl text-sm font-medium transition-all',
                                    pathname === link.href
                                        ? 'bg-violet-500/15 text-violet-300'
                                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setOpen(false)}
                            className="mt-2 px-4 py-3 rounded-xl bg-violet-600 text-center text-sm font-semibold text-white"
                        >
                            Join Us
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
