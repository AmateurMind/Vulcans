'use client'

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Cpu, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";

export default function AdminSetupPage() {
    const { signIn } = useAuthActions();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signIn("password", { email, password, flow: "signUp" });
            router.push("/admin/dashboard");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to create account.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4 grid-bg">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--primary)]/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative w-full max-w-md">
                <div className="flex flex-col items-center mb-8 gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary)] flex items-center justify-center shadow-xl shadow-[0_0_15px_var(--primary-glow)]">
                        <Cpu className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[var(--foreground)]">Admin Setup</h1>
                        <p className="text-[var(--muted-foreground)] text-sm mt-1">Create the admin account (one-time only)</p>
                    </div>
                </div>

                <div className="glass rounded-2xl p-8">
                    {error && (
                        <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]/50 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Password (min 8 chars)</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                                <input
                                    type={showPwd ? "text" : "password"}
                                    required
                                    minLength={8}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="********"
                                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]/50 transition-all text-sm"
                                />
                                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)] disabled:opacity-60 font-bold text-white transition-all shadow-lg shadow-[0_0_15px_var(--primary-glow)] group"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Create Account <UserPlus className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <p className="mt-5 text-center text-xs text-[var(--muted-foreground)]">
                        Already have an account?{" "}
                        <Link href="/admin/login" className="text-[var(--primary)] hover:text-[var(--primary)] font-medium">Sign in</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
