"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Github, Linkedin, Mail, User } from "lucide-react";
import { useMemo } from "react";

const avatarColors = [
    "from-[var(--primary)] to-[var(--primary)]",
    "from-blue-600 to-cyan-700",
    "from-rose-600 to-pink-700",
    "from-orange-600 to-amber-700",
];

export default function TeamPage() {
    const members = useQuery(api.teamMembers.list);

    const groupedTeams = useMemo(() => {
        if (!members) return {};
        return members.reduce((acc, m) => {
            const dept = m.department || "Other";
            if (!acc[dept]) acc[dept] = [];
            acc[dept].push(m);
            return acc;
        }, {} as Record<string, typeof members>);
    }, [members]);

    const getInitials = (name: string) => {
        return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
    };

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 grid-bg relative">
                <div className="absolute top-20 right-1/3 w-96 h-96 bg-blue-700/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative">
                    <p className="text-[var(--primary)] font-semibold text-sm tracking-widest uppercase mb-4">The People</p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Meet the <span className="text-shimmer">Team</span>
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-xl leading-relaxed max-w-2xl mx-auto">
                        Vulcans is powered by passionate engineers, designers, and innovators working as one.
                    </p>
                </div>
            </section>

            {/* Teams */}
            <section className="py-10 px-6 pb-24">
                <div className="max-w-6xl mx-auto flex flex-col gap-16">
                    {members === undefined && (
                        <div className="text-center text-[var(--muted-foreground)]">Loading team members...</div>
                    )}

                    {members && members.length === 0 && (
                        <div className="text-center text-[var(--muted-foreground)]">No team members found.</div>
                    )}

                    {Object.entries(groupedTeams).map(([department, teamMembers], ti) => (
                        <div key={ti}>
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <span className="w-8 h-px bg-[var(--primary)]" />
                                {department}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                {teamMembers.map((m, mi) => (
                                    <div
                                        key={mi}
                                        className="glass p-6 rounded-2xl hover:border-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center text-center"
                                    >
                                        {/* Avatar */}
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatarColors[(ti + mi) % avatarColors.length]} flex items-center justify-center text-xl font-bold text-white shadow-lg mb-4 group-hover:scale-105 transition-transform`}>
                                            {m.name ? getInitials(m.name) : <User className="w-8 h-8" />}
                                        </div>
                                        <h3 className="font-bold text-lg text-[var(--foreground)]">{m.name}</h3>
                                        <p className="text-[var(--primary)] text-sm font-semibold mt-1">{m.role}</p>

                                        {/* Social Links */}
                                        <div className="flex gap-3 mt-4">
                                            {[Github, Linkedin, Mail].map((Icon, idx) => (
                                                <button key={idx} className="p-2 rounded-lg bg-[var(--background)]/60 hover:bg-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all">
                                                    <Icon className="w-4 h-4" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
