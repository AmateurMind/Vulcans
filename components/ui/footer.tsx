import Link from 'next/link'
import { Cpu, Instagram, Twitter, Linkedin, Youtube, Github, Mail, MapPin, Phone } from 'lucide-react'

const navColumns = [
    {
        title: 'Club',
        links: [
            { label: 'About Us', href: '/about' },
            { label: 'Our Team', href: '/team' },
            { label: 'Gallery', href: '/gallery' },
        ],
    },
    {
        title: 'Compete',
        links: [
            { label: 'Achievements', href: '/achievements' },
            { label: 'Past Projects', href: '/gallery' },
        ],
    },
    {
        title: 'Connect',
        links: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'Join the Club', href: '/contact' },
            { label: 'Sponsor Us', href: '/contact' },
        ],
    },
]

const socials = [
    { icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
    { icon: <Twitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
    { icon: <Youtube className="w-4 h-4" />, href: '#', label: 'YouTube' },
    { icon: <Github className="w-4 h-4" />, href: '#', label: 'GitHub' },
]

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-14">

                {/* Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/5">

                    {/* Brand block */}
                    <div className="md:col-span-2 flex flex-col gap-5">
                        <Link href="/" className="flex items-center gap-2.5 group w-fit">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-[var(--primary-glow)]" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}>
                                <Cpu className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">
                                Vul<span className="text-[var(--primary)]">cans</span>
                            </span>
                        </Link>

                        <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                            A student-led robotics and engineering club competing at national & international levels.
                            We build, we compete, we innovate.
                        </p>

                        <div className="flex flex-col gap-2.5 text-sm text-neutral-500">
                            <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-[var(--primary)]" /> vulcans@college.edu</span>
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[var(--primary)]" /> Robotics Lab, Block C, Campus</span>
                            <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-[var(--primary)]" /> +91 98765 43210</span>
                        </div>
                    </div>

                    {/* Nav columns */}
                    {navColumns.map((col, i) => (
                        <div key={i}>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-5">{col.title}</h4>
                            <ul className="flex flex-col gap-3">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-500 hover:text-[var(--primary)] transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Row */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-neutral-600 text-sm">
                        © {new Date().getFullYear()} <span className="text-[var(--primary)] font-semibold">Vulcans</span> Robotics Club. All rights reserved.
                    </p>

                    {/* Socials */}
                    <div className="flex items-center gap-2">
                        {socials.map((s, i) => (
                            <a
                                key={i}
                                href={s.href}
                                aria-label={s.label}
                                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-500 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-200"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
