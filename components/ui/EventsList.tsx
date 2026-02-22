"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CalendarDays } from "lucide-react";
import { useMemo } from "react";

export function EventsList() {
    const events = useQuery(api.events.list);

    const upcomingEvents = useMemo(() => {
        if (!events) return [];
        return events.filter(e => e.status === "upcoming");
    }, [events]);

    const pastEvents = useMemo(() => {
        if (!events) return [];
        return events.filter(e => e.status === "past");
    }, [events]);

    if (events === undefined) {
        return <div className="text-center text-[var(--muted-foreground)]">Loading events...</div>;
    }

    if (events.length === 0) {
        return <div className="text-center text-[var(--muted-foreground)]">No recent events found.</div>;
    }

    return (
        <div className="flex flex-col gap-16">
            {upcomingEvents.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-px bg-[var(--primary)]" />
                        Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {upcomingEvents.map((h, i) => (
                            <div key={i} className="p-7 rounded-2xl glass bg-[var(--card)] border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_0_20px_var(--primary-glow)] group">
                                <div className="mb-4 p-3 rounded-xl bg-[var(--primary-maroon)]/30 w-fit group-hover:scale-110 transition-transform">
                                    <CalendarDays className="w-7 h-7 text-[var(--primary)]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{h.title}</h3>
                                <p className="text-[var(--primary)] text-sm mb-2 font-medium">{h.date}</p>
                                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{h.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {pastEvents.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-px bg-[var(--primary)]" />
                        Past Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                        {pastEvents.map((h, i) => (
                            <div key={i} className="p-7 rounded-2xl glass bg-[var(--card)] border border-[var(--border)] transition-all duration-300 group">
                                <div className="mb-4 p-3 rounded-xl bg-[var(--muted)] w-fit group-hover:scale-110 transition-transform">
                                    <CalendarDays className="w-7 h-7 text-[var(--muted-foreground)]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{h.title}</h3>
                                <p className="text-[var(--muted-foreground)] text-sm mb-2 font-medium">{h.date}</p>
                                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{h.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
