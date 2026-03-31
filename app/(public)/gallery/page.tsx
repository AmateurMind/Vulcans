'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const categories = ['All', 'Bots', 'Competitions', 'Workshop', 'Team', 'Builds']

const botGallery = [
    { id: 101, category: 'Bots', url: '/gallery/bots/2013 BOT.png', title: '2013 Bot', desc: 'Vulcans competition robot - 2013', cols: '' },
    { id: 102, category: 'Bots', url: '/gallery/bots/2014 BOT.png', title: '2014 Bot', desc: 'Vulcans competition robot - 2014', cols: '' },
    { id: 103, category: 'Bots', url: '/gallery/bots/2015 BOT.png', title: '2015 Bot', desc: 'Vulcans competition robot - 2015', cols: '' },
    { id: 104, category: 'Bots', url: '/gallery/bots/2016 BOT.png', title: '2016 Bot', desc: 'Vulcans competition robot - 2016', cols: '' },
    { id: 105, category: 'Bots', url: '/gallery/bots/2017 BOT.png', title: '2017 Bot', desc: 'Vulcans competition robot - 2017', cols: '' },
    { id: 106, category: 'Bots', url: '/gallery/bots/2018 BOT.png', title: '2018 Bot', desc: 'Vulcans competition robot - 2018', cols: '' },
    { id: 107, category: 'Bots', url: '/gallery/bots/2019 BOT.png', title: '2019 Bot', desc: 'Vulcans competition robot - 2019', cols: '' },
    { id: 108, category: 'Bots', url: '/gallery/bots/2022 BOT 1.png', title: '2022 Bot 1', desc: 'Vulcans competition robot - 2022', cols: 'md:col-span-2' },
    { id: 109, category: 'Bots', url: '/gallery/bots/2022 BOT 2.png', title: '2022 Bot 2', desc: 'Vulcans competition robot - 2022', cols: '' },
    { id: 110, category: 'Bots', url: '/gallery/bots/2023 BOT 1.png', title: '2023 Bot 1', desc: 'Vulcans competition robot - 2023', cols: 'md:col-span-2' },
    { id: 111, category: 'Bots', url: '/gallery/bots/2023 BOT 2.png', title: '2023 Bot 2', desc: 'Vulcans competition robot - 2023', cols: '' },
    { id: 112, category: 'Bots', url: '/gallery/bots/2024 BOT 1.png', title: '2024 Bot 1', desc: 'Vulcans competition robot - 2024', cols: 'md:col-span-2' },
    { id: 113, category: 'Bots', url: '/gallery/bots/2024 BOT 2.png', title: '2024 Bot 2', desc: 'Vulcans competition robot - 2024', cols: '' },
    { id: 114, category: 'Bots', url: '/gallery/bots/2025 BOT 1.jpg', title: '2025 Bot 1', desc: 'Vulcans competition robot - 2025', cols: '' },
    { id: 115, category: 'Bots', url: '/gallery/bots/2025 BOT 2.jpg', title: '2025 Bot 2', desc: 'Vulcans competition robot - 2025', cols: '' },
]

const gallery = [
    ...botGallery,
    {
        id: 1, category: 'Competitions',
        url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
        title: 'Robocon 2024', desc: 'Our bot taking the field at nationals',
        cols: 'md:col-span-2',
    },
    {
        id: 2, category: 'Builds',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
        title: 'Circuit Design', desc: 'Precision PCB work by the electrical team',
        cols: '',
    },
    {
        id: 3, category: 'Workshop',
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
        title: 'CAD Session', desc: 'Mechanical designs coming to life',
        cols: '',
    },
    {
        id: 4, category: 'Team',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
        title: 'Team Celebration', desc: 'After our national semi-final win',
        cols: '',
    },
    {
        id: 5, category: 'Builds',
        url: 'https://images.unsplash.com/photo-1563207153-f403bf289163?w=600&q=80',
        title: 'Arm Mechanism', desc: 'Building our signature 6-DOF arm',
        cols: 'md:col-span-2',
    },
    {
        id: 6, category: 'Competitions',
        url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80',
        title: 'Award Ceremony', desc: 'Accepting 3rd place at Robocon nationals',
        cols: '',
    },
    {
        id: 7, category: 'Workshop',
        url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80',
        title: 'ROS2 Workshop', desc: 'Training session for software team',
        cols: '',
    },
    {
        id: 8, category: 'Team',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
        title: 'Strategy Planning', desc: 'Pre-competition strategy session',
        cols: '',
    },
]

export default function GalleryPage() {
    const [active, setActive] = useState('All')
    const [selectedImage, setSelectedImage] = useState<null | { url: string; title: string; desc: string }>(null)
    const filtered = active === 'All' ? gallery : gallery.filter(g => g.category === active)

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedImage(null)
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Hero */}
            <section className="pt-32 pb-16 px-6 grid-bg relative">
                <div className="absolute top-20 left-1/3 w-80 h-80 bg-rose-700/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative">
                    <p className="text-[var(--primary)] font-semibold text-sm tracking-widest uppercase mb-4">Our Story In Images</p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        The <span className="text-shimmer">Gallery</span>
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
                        A glimpse into our workshops, competitions, builds, and the moments we celebrate together.
                    </p>
                </div>
            </section>

            {/* Filter Tabs */}
            <div className="sticky top-16 z-30 py-4 px-6 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]">
                <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={cn(
                                'px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200',
                                active === cat
                                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-[0_0_15px_var(--primary-glow)]'
                                    : 'bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)]'
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid */}
            <section className="py-10 px-6 pb-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[280px]">
                    {filtered.map(item => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedImage({ url: item.url, title: item.title, desc: item.desc })}
                            className={cn(
                                'group relative overflow-hidden rounded-2xl border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all duration-300 hover:-translate-y-1 cursor-zoom-in',
                                item.cols
                            )}
                        >
                            <img
                                src={item.url}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                <span className="text-xs text-[var(--primary)] font-semibold uppercase tracking-widest mb-1">{item.category}</span>
                                <h3 className="font-bold text-lg text-white">{item.title}</h3>
                                <p className="text-white/80 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="max-w-6xl w-full max-h-[92vh] flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.title}
                            className="w-full max-h-[82vh] object-contain rounded-xl border border-white/20 bg-black/40"
                        />
                        <div className="text-center">
                            <h3 className="text-white font-semibold text-lg">{selectedImage.title}</h3>
                            <p className="text-white/75 text-sm">{selectedImage.desc}</p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
