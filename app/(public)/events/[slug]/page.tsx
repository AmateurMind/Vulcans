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
        return <main className="min-h-screen pt-32 px-6 text-center text-[var(--muted-foreground)]">Loading event...</main>;
    }

    if (!event) {
        return (
            <main className="min-h-screen pt-32 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
                    <p className="text-[var(--muted-foreground)] mb-6">This event link is invalid or was removed.</p>
                    <Link href="/events" className="text-[var(--primary)] hover:underline">Back to Events</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <Link href="/events" className="text-sm text-[var(--primary)] hover:underline">Back to Events</Link>
                <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-3">{event.title}</h1>
                <p className="text-[var(--muted-foreground)] mb-8">{new Date(event.date).toLocaleDateString()}</p>

                {!!event.imageUrls?.length && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        {event.imageUrls.map((url, idx) => (
                            <div key={`${url}-${idx}`} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                                <img src={url} alt={`${event.title} image ${idx + 1}`} className="w-full h-72 object-cover" />
                            </div>
                        ))}
                    </div>
                )}

                <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-8 whitespace-pre-wrap leading-8 text-[var(--muted-foreground)]">
                    {event.description || "No description added yet."}
                </article>
            </div>
        </main>
    );
}
