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
    { icon: <Instagram className="w-4 h-4" />, href: 'https://www.instagram.com/mcoeteamvulcans/', label: 'Instagram' },
    { icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/company/teamvulcans/', label: 'LinkedIn' },
]

export function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--card)]/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[var(--border)]">
                    <div className="md:col-span-2 flex flex-col gap-5">
                        <Link href="/" className="flex items-center gap-2.5 group w-fit">
                            <span className="font-bold text-xl tracking-tight text-[var(--foreground)]">
                                Team <span className="text-[var(--primary)]">Vulcans</span>
                            </span>
                        </Link>

                        <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-xs">
                            A student-led robotics and engineering club competing at national and international levels.
                            We build, we compete, we innovate.
                        </p>

                        <div className="flex flex-col gap-2.5 text-sm text-[var(--muted-foreground)]">
                            <a href='mailto:robocon_teamvulcans@moderncoe.edu.in'><span className="flex items-center gap-2"><Mail className="w-4 h-4 text-[var(--primary)]" /> robocon_teamvulcans@moderncoe.edu.in</span></a>
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[var(--primary)]" /> PES&apos;s Modern College of Engineering, Pune</span>
                            <a href='tel:+917588248009'><span className="flex items-center gap-2"><Phone className="w-4 h-4 text-[var(--primary)]" /> +91 75882 48009</span></a>
                        </div>
                    </div>

                    {navColumns.map((col, i) => (
                        <div key={i}>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-5">{col.title}</h4>
                            <ul className="flex flex-col gap-3">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[var(--muted-foreground)] text-sm">
                        © {new Date().getFullYear()} <span className="text-[var(--primary)] font-semibold">Team Vulcans</span> Robotics Club PES MCOE. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2">
                        {socials.map((s, i) => (
                            <a
                                key={i}
                                href={s.href}
                                aria-label={s.label}
                                className="w-8 h-8 rounded-lg bg-[var(--background)]/50 flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-200"
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
