'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { Cpu, LayoutDashboard, Calendar, Award, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Events", href: "/admin/dashboard/events", icon: Calendar },
    { label: "Certificates", href: "/admin/dashboard/certificates", icon: Award },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { signOut } = useAuthActions();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-[#030712] text-white flex">
            {/* Sidebar */}
            <aside className="w-60 shrink-0 border-r border-white/5 flex flex-col bg-[#0a0a12] fixed h-full z-40">
                {/* Brand */}
                <div className="px-5 py-5 border-b border-white/5 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary)] flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-sm">Vul<span className="text-[var(--primary)]">cans</span> Admin</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
                    {navItems.map(({ label, href, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                pathname === href
                                    ? "bg-[var(--primary)]/15 text-[var(--primary)]"
                                    : "text-neutral-500 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Sign Out */}
                <div className="px-3 py-4 border-t border-white/5">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="ml-60 flex-1 min-h-screen">
                {children}
            </main>
        </div>
    );
}
