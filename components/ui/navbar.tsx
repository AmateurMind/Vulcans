'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Achievements', href: '/achievements' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Models', href: '/obj-viewer' },
    { label: 'Events', href: '/events' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
]

export function Navbar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const { resolvedTheme } = useTheme()
    const collegeLogo = resolvedTheme === 'dark' ? '/dark-good.png' : '/colg-logo-nobg.png'

    return (
        <header className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
            'bg-[var(--background)]/70 md:bg-transparent',
            'py-2 md:backdrop-blur-xl md:border-b md:border-[var(--border)] md:bg-[var(--background)]/70'
        )}>

            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <Image
                        src="/reference/text-transparent.png"
                        alt="Vulcans"
                        width={220}
                        height={66}
                        priority
                        className="h-10 sm:h-11 w-auto"
                    />
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

                {/* CTA / College Logo */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <a href="https://moderncoe.edu.in/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                        <Image
                            src={collegeLogo}
                            alt="PES MCOE Logo"
                            width={56}
                            height={56}
                            priority
                            className="h-11 sm:h-12 w-auto object-contain"
                        />
                    </a>
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
                        <div className="mt-4 pb-2 flex justify-center border-t border-[var(--border)]">
                            <a href="https://moderncoe.edu.in/" target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                                <Image
                                    src={collegeLogo}
                                    alt="PES MCOE Logo"
                                    width={44}
                                    height={44}
                                    className="h-10 w-auto object-contain"
                                />
                                <span>PES MCOE</span>
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
