"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Achievements", href: "#achievements" },
    { label: "Gallery", href: "#gallery" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "py-2 bg-white/10 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/10"
                : "py-4 bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 group"
                >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-[var(--primary-glow)] group-hover:shadow-[var(--primary-glow)] group-hover:scale-110 transition-transform duration-300"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}>
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--foreground)] fill-current">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="font-bold text-[var(--foreground)] text-lg tracking-tight">
                        Vul<span className="text-[var(--primary)]">cans</span> Admin
                    </span>
                </Link>

                {/* Desktop nav - glassmorphism pill */}
                <div className="hidden md:flex items-center gap-1 bg-[var(--background)]/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-[var(--border)] shadow-sm hover:bg-[var(--background)]/15 transition-all duration-300">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="relative px-4 py-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-full hover:bg-[var(--border)] transition-all duration-200 group"
                        >
                            {link.label}
                            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--primary)] rounded-full group-hover:w-4 transition-all duration-300" />
                        </Link>
                    ))}
                </div>

                {/* CTA + Mobile hamburger */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        href="#contact"
                        className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white backdrop-blur-sm shadow-lg hover:shadow-[0_0_20px_var(--primary-glow)] hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        Join Us
                    </Link>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen((p) => !p)}
                        className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="mx-4 mt-2 mb-3 bg-[var(--background)]/10 backdrop-blur-xl rounded-2xl border border-[var(--border)] shadow-xl p-3 flex flex-col gap-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-xl hover:bg-[var(--border)] transition-all duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="h-px bg-[var(--border)] my-1" />
                    <Link
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        className="px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-center transition-all duration-200"
                    >
                        Join Us
                    </Link>
                </div>
            </div>
        </header>
    );
}
