'use client'

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Calendar, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const events = useQuery(api.events.list);
    const certs = useQuery(api.certificates.list);

    const stats = [
        {
            label: "Total Events",
            value: events?.length ?? "—",
            icon: <Calendar className="w-6 h-6 text-[var(--primary)]" />,
            href: "/admin/dashboard/events",
            color: "from-[var(--primary)]/10 to-[var(--primary)]/5",
        },
        {
            label: "Certificates Issued",
            value: certs?.length ?? "—",
            icon: <Award className="w-6 h-6 text-yellow-400" />,
            href: "/admin/dashboard/certificates",
            color: "from-yellow-500/10 to-orange-500/5",
        },
    ];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
            <p className="text-[var(--muted-foreground)] text-sm mb-8">Welcome back, Admin.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {stats.map((s, i) => (
                    <Link key={i} href={s.href} className={`glass p-6 rounded-2xl bg-gradient-to-br ${s.color} hover:border-[var(--primary)]/30 transition-all duration-200 hover:-translate-y-0.5 group`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-[var(--background)]/50">{s.icon}</div>
                            <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <div className="text-3xl font-bold text-[var(--foreground)] mb-1">{s.value}</div>
                        <div className="text-sm text-[var(--muted-foreground)]">{s.label}</div>
                    </Link>
                ))}
            </div>

            <div className="glass rounded-2xl p-6">
                <h2 className="font-semibold text-sm text-[var(--muted-foreground)] uppercase tracking-wider mb-4">Quick Actions</h2>
                <div className="flex gap-3 flex-wrap">
                    <Link href="/admin/dashboard/events" className="px-4 py-2 rounded-lg bg-[var(--primary)]/20 text-[var(--primary)] hover:bg-[var(--primary)]/30 text-sm font-medium transition-colors flex items-center gap-2"><Calendar className="w-4 h-4" /> Add Event</Link>
                    <Link href="/admin/dashboard/certificates" className="px-4 py-2 rounded-lg bg-yellow-600/20 text-yellow-300 hover:bg-yellow-600/30 text-sm font-medium transition-colors flex items-center gap-2"><Award className="w-4 h-4" />   Issue Certificate</Link>
                </div>
            </div>
        </div>
    );
}
