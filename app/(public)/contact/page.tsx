'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone, Send, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'

const socials = [
    { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: '#' },
    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#' },
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#' },
    { icon: <Youtube className="w-5 h-5" />, label: 'YouTube', href: '#' },
]

export default function ContactPage() {
    const [sent, setSent] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSent(true)
    }

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Hero */}
            <section className="pt-32 pb-16 px-6 grid-bg relative">
                <div className="absolute top-20 right-1/3 w-80 h-80 bg-[var(--primary)]/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative">
                    <p className="text-[var(--primary)] font-semibold text-sm tracking-widest uppercase mb-4">Get In Touch</p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Contact <span className="text-shimmer">Vulcans</span>
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
                        Interested in joining, sponsoring, or just want to say hi? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="py-12 px-6 pb-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

                    {/* Info Side */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <div className="glass rounded-2xl p-7">
                            <h2 className="text-xl font-bold mb-6">Contact Info</h2>
                            <div className="flex flex-col gap-5">
                                {[
                                    { icon: <Mail className="w-5 h-5 text-[var(--primary)]" />, label: 'Email', value: 'vulcans@college.edu' },
                                    { icon: <MapPin className="w-5 h-5 text-[var(--primary)]" />, label: 'Location', value: 'Robotics Lab, Block C, College Campus' },
                                    { icon: <Phone className="w-5 h-5 text-[var(--primary)]" />, label: 'Phone', value: '+91 98765 43210' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="p-2 rounded-xl bg-[var(--background)]/50 shrink-0">{item.icon}</div>
                                        <div>
                                            <p className="text-xs text-[var(--muted-foreground)] font-semibold uppercase tracking-wider">{item.label}</p>
                                            <p className="text-[var(--foreground)] text-sm mt-0.5">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass rounded-2xl p-7">
                            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {socials.map((s, i) => (
                                    <a key={i} href={s.href} className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--background)]/50 hover:bg-[var(--primary)]/15 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-all duration-200 text-sm font-medium">
                                        {s.icon} {s.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="md:col-span-3 glass rounded-2xl p-8">
                        {sent ? (
                            <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-[var(--primary)]/15 flex items-center justify-center mb-2">
                                    <Send className="w-8 h-8 text-[var(--primary)]" />
                                </div>
                                <h2 className="text-2xl font-bold">Message Sent!</h2>
                                <p className="text-[var(--muted-foreground)]">We'll get back to you within 48 hours.</p>
                                <button
                                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                                    className="mt-4 px-6 py-2 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)] text-white font-semibold transition-all"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Arjun Mehta' },
                                            { name: 'email', label: 'Email Address', type: 'email', placeholder: 'arjun@example.com' },
                                        ].map(field => (
                                            <div key={field.name}>
                                                <label className="block text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">{field.label}</label>
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    required
                                                    placeholder={field.placeholder}
                                                    value={(form as Record<string, string>)[field.name]}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]/50 focus:bg-[var(--card)] transition-all text-sm"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            required
                                            placeholder="I want to join the team..."
                                            value={form.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]/50 focus:bg-[var(--card)] transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={5}
                                            placeholder="Tell us more about your interest or query..."
                                            value={form.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]/50 focus:bg-[var(--card)] transition-all text-sm resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)] font-bold text-white transition-all duration-200 shadow-lg shadow-[0_0_15px_var(--primary-glow)] hover:shadow-[0_0_15px_var(--primary-glow)] group"
                                    >
                                        Send Message <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}
