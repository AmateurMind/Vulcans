'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, MapPin, Phone, Send, Instagram, Linkedin } from 'lucide-react'
import Script from 'next/script'

const socials = [
    { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: 'https://www.instagram.com/mcoeteamvulcans/' },
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: 'https://www.linkedin.com/company/vulcan-robotics-team/' },
]

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ''
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

export default function ContactPage() {
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const mapRef = useRef<HTMLDivElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSending(true)
        setError('')

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    from_name: form.name,
                    subject: form.subject,
                    email: form.email,
                    message: form.message,
                    to: 'robocon_teamvulcans@moderncoe.edu.in',
                }),
            })

            const data = await response.json()
            if (data.success) {
                setSent(true)
            } else {
                setError('Something went wrong. Please try again.')
            }
        } catch {
            setError('Failed to send message. Please try again later.')
        } finally {
            setSending(false)
        }
    }

    // Initialize Google Maps after the official script loads
    const initMap = () => {
        if (!mapRef.current || typeof window === 'undefined' || !(window as any).google) return

        const google = (window as any).google

        const position = { lat: 18.5262, lng: 73.8465 } // Modern College of Engineering, Pune

        const map = new google.maps.Map(mapRef.current, {
            center: position,
            zoom: 16,
            disableDefaultUI: false, // Standard controls like Image 1
        })

        new google.maps.Marker({
            position,
            map,
            title: 'Team Vulcans - Modern College of Engineering, Pune',
        })
    }

    useEffect(() => {
        // Expose initMap to window so the script callback can find it
        (window as any).initMap = initMap
        
        // If google maps is already loaded (e.g., on navigation), init immediately
        if ((window as any).google) {
            initMap()
        }
    }, [])

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Official Google Maps Script */}
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`}
                strategy="afterInteractive"
            />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6 grid-bg relative">
                <div className="absolute top-20 right-1/3 w-80 h-80 bg-[var(--primary)]/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative">
                    <p className="text-[var(--primary)] font-semibold text-sm tracking-widest uppercase mb-4">Get In Touch</p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Contact <span className="text-shimmer">Vulcans</span>
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
                        Interested in joining, sponsoring, or just want to say hi? We&apos;d love to hear from you.
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
                                    { icon: <Mail className="w-5 h-5 text-[var(--primary)]" />, label: 'Email', value: 'robocon_teamvulcans@moderncoe.edu.in' },
                                    { icon: <MapPin className="w-5 h-5 text-[var(--primary)]" />, label: 'Location', value: 'PES\'s Modern College of Engineering, Pune, Maharashtra 411005' },
                                    { icon: <Phone className="w-5 h-5 text-[var(--primary)]" />, label: 'Phone', value: '+91 75882 48009' },
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
                                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--background)]/50 hover:bg-[var(--primary)]/15 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-all duration-200 text-sm font-medium">
                                        {s.icon} {s.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Google Map */}
                        <div className="glass rounded-2xl p-4 overflow-hidden">
                            <h2 className="text-xl font-bold mb-4 px-3 pt-3">Find Us</h2>
                            <div
                                ref={mapRef}
                                className="w-full h-64 rounded-xl overflow-hidden"
                                style={{ minHeight: '250px' }}
                            />
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
                                <p className="text-[var(--muted-foreground)]">We&apos;ll get back to you within 48 hours.</p>
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
                                {error && (
                                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                        {error}
                                    </div>
                                )}
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
                                            placeholder="What is this about?"
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
                                        disabled={sending}
                                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)] font-bold text-white transition-all duration-200 shadow-lg shadow-[0_0_15px_var(--primary-glow)] hover:shadow-[0_0_15px_var(--primary-glow)] group disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {sending ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
