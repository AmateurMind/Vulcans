import { Trophy, Medal, Star, Award } from "lucide-react";

const achievements = [
    {
        year: "2024",
        icon: <Trophy className="w-8 h-8 text-yellow-400" />,
        title: "ABU Robocon National – 3rd Place",
        org: "ABU Asia-Pacific Robot Contest",
        desc: "Competed against 60+ teams and clinched the bronze position in the national round of ABU Robocon 2024.",
        badge: "Podium Finish",
        color: "from-yellow-500/10 to-orange-500/5",
        badgeColor: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    },
    {
        year: "2024",
        icon: <Star className="w-8 h-8 text-[var(--primary)]" />,
        title: "IIT Bombay Techfest Robotics – Finalist",
        org: "Asia's Largest Science & Technology Festival",
        desc: "Selected as one of the top 10 teams nationwide for the Techfest autonomous robotics challenge.",
        badge: "National Finalist",
        color: "from-[var(--primary)]/10 to-[var(--primary)]/5",
        badgeColor: "bg-[var(--primary)]/15 text-[var(--primary)] border-[var(--primary)]/20",
    },
    {
        year: "2023",
        icon: <Medal className="w-8 h-8 text-blue-400" />,
        title: "National Robotics Championship – 1st Place",
        org: "All India Robotics Association",
        desc: "Won gold in the line follower and maze solver challenges at the national level.",
        badge: "Gold Medal",
        color: "from-blue-500/10 to-cyan-500/5",
        badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    {
        year: "2023",
        icon: <Award className="w-8 h-8 text-rose-400" />,
        title: "Best Engineering Design Award",
        org: "State Robotics Expo",
        desc: "Received special recognition for our innovative modular robot chassis design.",
        badge: "Special Award",
        color: "from-rose-500/10 to-pink-500/5",
        badgeColor: "bg-rose-500/15 text-rose-400 border-rose-500/20",
    },
    {
        year: "2022",
        icon: <Trophy className="w-8 h-8 text-orange-400" />,
        title: "ABU Robocon National – Qualified",
        org: "ABU Asia-Pacific Robot Contest",
        desc: "Successfully qualified for the national stage of Robocon for the third consecutive year.",
        badge: "National Qualifier",
        color: "from-orange-500/10 to-amber-500/5",
        badgeColor: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    },
    {
        year: "2022",
        icon: <Star className="w-8 h-8 text-green-400" />,
        title: "Smart India Hackathon – Hardware Edition",
        org: "Ministry of Education, India",
        desc: "Won at the college level and proceeded to national round of SIH Hardware Edition.",
        badge: "Hackathon Winner",
        color: "from-green-500/10 to-emerald-500/5",
        badgeColor: "bg-green-500/15 text-green-400 border-green-500/20",
    },
];

export default function AchievementsPage() {
    return (
        <main className="min-h-screen bg-[#030712] text-white">
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 grid-bg relative">
                <div className="absolute top-20 left-1/3 w-96 h-96 bg-yellow-700/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative">
                    <p className="text-[var(--primary)] font-semibold text-sm tracking-widest uppercase mb-4">Our Track Record</p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Built on <span className="text-shimmer">Victories</span>
                    </h1>
                    <p className="text-neutral-400 text-xl leading-relaxed max-w-2xl mx-auto">
                        From local competitions to national championships — Vulcans consistently delivers excellence.
                    </p>
                </div>
            </section>

            {/* Achievement Cards */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((a, i) => (
                        <div
                            key={i}
                            className={`glass p-7 rounded-2xl bg-gradient-to-br ${a.color} border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 flex gap-5`}
                        >
                            <div className="p-3 rounded-xl bg-white/5 h-fit shrink-0">{a.icon}</div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/8">{a.year}</span>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${a.badgeColor}`}>{a.badge}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white">{a.title}</h3>
                                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{a.org}</p>
                                <p className="text-neutral-400 text-sm leading-relaxed">{a.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
