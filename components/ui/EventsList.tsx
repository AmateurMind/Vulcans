"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CalendarDays } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";

export function EventsList() {
    const events = useQuery(api.events.listWithImageUrls);

    const upcomingEvents = useMemo(() => {
        if (!events) return [];
        return events.filter(e => e.status === "upcoming");
    }, [events]);

    const pastEvents = useMemo(() => {
        if (!events) return [];
        return events.filter(e => e.status === "past" || !e.status);
    }, [events]);

    if (events === undefined) {
        return <div className="text-center text-muted-foreground">Loading events...</div>;
    }

    if (events.length === 0) {
        return <div className="text-center text-muted-foreground">No recent events found.</div>;
    }

    return (
        <div className="flex flex-col gap-16">
            {upcomingEvents.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-px bg-primary" />
                        Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {upcomingEvents.map((h, i) => (
                            <Link key={i} href={`/events/${h.pathId}`} className="block p-7 rounded-2xl glass bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_20px_var(--primary-glow)] group">
                                {h.imageUrls?.[0] && (
                                    <div className="mb-4 overflow-hidden rounded-xl border border-border bg-black/5 dark:bg-white/5 flex items-center justify-center">
                                        <img src={h.imageUrls[0]} alt={h.title} className="w-full h-auto max-h-[350px] object-contain group-hover:scale-[1.03] transition-transform duration-300" />
                                    </div>
                                )}
                                <div className="mb-4 p-3 rounded-xl bg-primary-maroon/30 w-fit group-hover:scale-110 transition-transform">
                                    <CalendarDays className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-foreground">{h.title}</h3>
                                <p className="text-primary text-sm font-medium">{h.date}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {pastEvents.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-px bg-primary" />
                        Past Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                        {pastEvents.map((h, i) => (
                            <Link key={i} href={`/events/${h.pathId}`} className="block p-7 rounded-2xl glass bg-card border border-border transition-all duration-300 group">
                                {h.imageUrls?.[0] && (
                                    <div className="mb-4 overflow-hidden rounded-xl border border-border bg-black/5 dark:bg-white/5 flex items-center justify-center">
                                        <img src={h.imageUrls[0]} alt={h.title} className="w-full h-auto max-h-[350px] object-contain group-hover:scale-[1.03] transition-transform duration-300" />
                                    </div>
                                )}
                                <div className="mb-4 p-3 rounded-xl bg-muted w-fit group-hover:scale-110 transition-transform">
                                    <CalendarDays className="w-7 h-7 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-foreground">{h.title}</h3>
                                <p className="text-muted-foreground text-sm font-medium">{h.date}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
