"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
                    <div className="w-8 h-8 rounded-lg bg-violet-500/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="font-bold text-white text-lg tracking-tight">
                        Robotics
                    </span>
                </Link>

                {/* Desktop nav - glassmorphism pill */}
                <div className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20 shadow-sm hover:bg-white/15 transition-all duration-300">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="relative px-4 py-1.5 text-sm font-medium text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200 group"
                        >
                            {link.label}
                            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-violet-400 rounded-full group-hover:w-4 transition-all duration-300" />
                        </Link>
                    ))}
                </div>

                {/* CTA + Mobile hamburger */}
                <div className="flex items-center gap-3">
                    <Link
                        href="#contact"
                        className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-violet-500/80 hover:bg-violet-500 text-white backdrop-blur-sm border border-violet-400/30 shadow-lg hover:shadow-violet-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
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
                <div className="mx-4 mt-2 mb-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-3 flex flex-col gap-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="h-px bg-white/10 my-1" />
                    <Link
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        className="px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-violet-500/80 hover:bg-violet-500 text-center transition-all duration-200"
                    >
                        Join Us
                    </Link>
                </div>
            </div>
        </header>
    );
}
