'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

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
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
            'bg-[var(--background)]/95 md:bg-transparent',
            scrolled
                ? 'py-2 md:backdrop-blur-xl md:border-b md:border-[var(--border)] md:bg-[var(--background)]/70'
                : 'py-4'
        )}>

            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-[var(--primary-glow)] group-hover:shadow-[var(--primary-glow)] transition-shadow shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
                    >
                        <Cpu className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-[var(--foreground)]">
                        Vul<span className="text-[var(--primary)]">cans</span>
                    </span>
                </Link>


                {/* Desktop Nav — glassmorphism pill, always visible */}
                <nav className="hidden md:flex items-center gap-1 bg-[var(--card)]/70 backdrop-blur-md rounded-full px-3 py-1.5 border border-[var(--border)] shadow-sm transition-all duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 group',
                                pathname === link.href
                                    ? 'bg-[var(--primary)]/15 text-[var(--primary)]'
                                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)]'
                            )}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--primary)]" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        href="/contact"
                        className="px-5 py-2 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_var(--primary-glow)]"
                    >
                        Join Us
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden mt-2 mx-4 rounded-2xl bg-[var(--background)]/95 backdrop-blur-xl border border-[var(--border)] shadow-2xl overflow-hidden">
                    <nav className="flex flex-col p-3 gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    'px-4 py-3 rounded-xl text-sm font-medium transition-all',
                                    pathname === link.href
                                        ? 'bg-[var(--primary)]/15 text-[var(--primary)]'
                                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)]'
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setOpen(false)}
                            className="mt-2 px-4 py-3 rounded-xl bg-[var(--primary)] text-center text-sm font-semibold text-white"
                        >
                            Join Us
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
