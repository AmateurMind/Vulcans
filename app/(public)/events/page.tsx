import { EventsList } from "@/components/ui/EventsList";

export default function EventsPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 grid-bg relative">
                <div className="absolute top-20 right-1/3 w-96 h-96 bg-blue-700/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative">
                    <p className="text-[var(--primary)] font-semibold text-sm tracking-widest uppercase mb-4">Our Events</p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Past & Upcoming <span className="text-shimmer">Events</span>
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-xl leading-relaxed max-w-2xl mx-auto">
                        Discover what we've been up to, from workshops and seminars to national robotics competitions.
                    </p>
                </div>
            </section>

            {/* Events List */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <EventsList />
                </div>
            </section>
        </main>
    );
}
