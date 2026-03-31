"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function EventDetailPage() {
    const params = useParams<{ slug: string }>();
    const pathId = params?.slug;
    const event = useQuery(api.events.getByPathId, pathId ? { pathId } : "skip");

    if (event === undefined) {
        return <main className="min-h-screen pt-32 px-6 text-center text-muted-foreground">Loading event...</main>;
    }

    if (!event) {
        return (
            <main className="min-h-screen pt-32 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
                    <p className="text-muted-foreground mb-6">This event link is invalid or was removed.</p>
                    <Link href="/events" className="text-primary hover:underline">Back to Events</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <Link href="/events" className="text-sm text-primary hover:underline inline-flex items-center gap-1 mb-8">
                    &larr; Back to Events
                </Link>
                
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
                    {/* Left: Beautiful Event Image(s) */}
                    {!!event.imageUrls?.length && (
                        <div className="w-full flex-shrink-0 relative rounded-3xl overflow-hidden shadow-2xl glass-effect border border-white/10 dark:border-white/5">
                            <div className="flex flex-col gap-4 items-center justify-center p-4 bg-zinc-950/80">
                                {event.imageUrls.map((url, idx) => (
                                    <img 
                                        key={`${url}-${idx}`} 
                                        src={url} 
                                        alt={`${event.title} image ${idx + 1}`} 
                                        className="w-full max-h-[75vh] object-contain rounded-xl"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Right: The Title and Description Details */}
                    <div className="flex flex-col justify-start w-full">
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight leading-tight">{event.title}</h1>
                            <div className="flex items-center gap-4 text-sm md:text-base">
                                <span className="text-primary font-semibold tracking-wide">
                                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                <span className={`uppercase font-bold px-3 py-1 rounded-md border text-xs tracking-wider ${event.status === "upcoming" ? "bg-primary/10 text-primary border-primary/30" : "bg-muted/50 text-muted-foreground border-border"}`}>
                                    {event.status === "upcoming" ? "Upcoming" : "Past"}
                                </span>
                            </div>
                        </div>

                        <article className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            <div className="border-t border-border pt-6 mt-2">
                                <h3 className="text-xl font-bold mb-4 text-foreground uppercase tracking-widest text-sm">About the Event</h3>
                                {event.description || <span className="italic opacity-50">No description available for this event.</span>}
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </main>
    );
}
