"use client";

import { useState } from "react";
import { Trophy, Medal, Star, Award, Target, Zap, Rocket, Crosshair } from "lucide-react";

const achievements = [
    {
        year: "2022",
        rank: "Stage 1: 100/100",
        icon: <Target className="w-10 h-10 text-purple-400" />,
        title: "ROBOCON 2022",
        theme: "Lagori",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Based on South Indian traditional game. Seeker throws ball to break stone tower, while Hitter interrupts as seekers rebuild.",
        fullDesc: [
            "Based on South Indian traditional game Lagori",
            "Seeker throws ball to break stone tower",
            "Hitter interrupts as seekers rebuild",
            "Stage 1 Score: 100/100"
        ],
        badge: "Perfect Score",
        color: "from-purple-500/10 to-violet-500/5",
        badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    },
    {
        year: "2021",
        rank: "Participants",
        icon: <Crosshair className="w-10 h-10 text-indigo-400" />,
        title: "ROBOCON 2021",
        theme: "Throwing Arrows Into Pots",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Manual throwing robot moves and throws arrows into pots in outer area. Manual defensive robot performs defensive tasks in inner area.",
        fullDesc: [
            "Manual throwing robot for outer area",
            "Throws arrows into pots",
            "Manual defensive robot for inner area",
            "Performs defensive tasks"
        ],
        badge: "National Participant",
        color: "from-indigo-500/10 to-blue-500/5",
        badgeColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
    },
    {
        year: "2020",
        rank: "Stage 1: 100/100",
        icon: <Trophy className="w-10 h-10 text-red-400" />,
        title: "ROBOCON 2020",
        theme: "ROBO RUGBY 7s",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Based on Rugby. Two robots collaborate to score Try and Goal Kick against five defending obstacles.",
        fullDesc: [
            "Based on Rugby gameplay",
            "Two robots collaborate",
            "Score Try and Goal Kick",
            "Against five defending obstacles",
            "Stage 1 Score: 100/100"
        ],
        badge: "Perfect Score",
        color: "from-red-500/10 to-orange-500/5",
        badgeColor: "bg-red-500/15 text-red-400 border-red-500/20",
    },
    {
        year: "2019",
        rank: "AIR 21",
        icon: <Award className="w-10 h-10 text-teal-400" />,
        title: "ROBOCON 2019",
        theme: "Sharing the Knowledge",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Based on Mongolia's 'GREAT URTUU'. Featured one wheeled manual robot and one autonomous quadruped robot.",
        fullDesc: [
            "Based on Mongolia's 'GREAT URTUU'",
            "One wheeled manual robot",
            "One autonomous quadruped robot",
            "All India Rank: 21"
        ],
        badge: "AIR 21",
        color: "from-teal-500/10 to-cyan-500/5",
        badgeColor: "bg-teal-500/15 text-teal-400 border-teal-500/20",
    },
    {
        year: "2018",
        rank: "AIR 20",
        icon: <Rocket className="w-10 h-10 text-amber-400" />,
        title: "ROBOCON 2018",
        theme: "NEM CON – The Throwing Dragon",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Based on Vietnamese shuttlecock throwing game. Autonomous robot throws shuttlecock through rings into Golden Cup. Completed Rongbay for the first time.",
        fullDesc: [
            "Based on Vietnamese shuttlecock throwing game",
            "Autonomous robot throws shuttlecock",
            "Through rings of different heights",
            "Into a Golden Cup",
            "Completed Rongbay (Winning Task) for first time",
            "All India Rank: 20"
        ],
        badge: "AIR 20",
        color: "from-amber-500/10 to-yellow-500/5",
        badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    },
    {
        year: "2017",
        rank: "AIR 5",
        icon: <Trophy className="w-10 h-10 text-pink-400" />,
        title: "ROBOCON 2017",
        theme: "ASOBI – The Landing Disc",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Based on Japanese game of Tosenkyo. A flying Frisbee is thrown to dislodge balls kept on platforms of various heights.",
        fullDesc: [
            "Based on Japanese game of Tosenkyo",
            "Flying Frisbee is thrown",
            "Dislodge balls from platforms",
            "Platforms of various heights",
            "Highest points scored in single game",
            "All India Rank: 5"
        ],
        badge: "Top 5",
        color: "from-pink-500/10 to-rose-500/5",
        badgeColor: "bg-pink-500/15 text-pink-400 border-pink-500/20",
    },
    {
        year: "2017",
        rank: "National Champions",
        icon: <Medal className="w-10 h-10 text-yellow-400" />,
        title: "ESCALADE 2017",
        theme: "Autonomous Maze Solver & Wall Climbing",
        org: "IIT Guwahati",
        shortDesc: "Won Regional Championship (Rank 1) at AIT Pune and National Championship (Rank 1) at IIT Guwahati.",
        fullDesc: [
            "Regional Championship: Winners (Rank 1) – AIT, Pune",
            "National Championship: Winners (Rank 1) – IIT Guwahati",
            "Innovative roller concept for climbing wall",
            "High current rating battery",
            "Budget motor driver IC L293D"
        ],
        badge: "National Winner",
        color: "from-yellow-500/10 to-amber-500/5",
        badgeColor: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    },
    {
        year: "2016",
        rank: "AIR 14",
        icon: <Zap className="w-10 h-10 text-lime-400" />,
        title: "ROBOCON 2016",
        theme: "Clean Energy Recharging the World",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Featured derived energy sources like wind power, innovative pole climbing mechanism, PID logic with LSA08 line tracing.",
        fullDesc: [
            "Derived energy sources like wind power",
            "Innovative pole climbing mechanism",
            "PID logic with LSA08 line tracing array",
            "5x3 Pneumatic DCV",
            "BLDC motors",
            "All India Rank: 14"
        ],
        badge: "AIR 14",
        color: "from-lime-500/10 to-green-500/5",
        badgeColor: "bg-lime-500/15 text-lime-400 border-lime-500/20",
    },
    {
        year: "2015",
        rank: "AIR 20",
        icon: <Star className="w-10 h-10 text-cyan-400" />,
        title: "ROBOCON 2015",
        theme: "Robominion",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Gameplay was Badminton doubles using robots. Featured 4-wheel suspension, X-configuration Drive, and wireless Bluetooth PS3 controller.",
        fullDesc: [
            "Gameplay: Badminton doubles using robots",
            "4 wheel Suspension",
            "X-configuration Drive",
            "Microcontroller ATMEGA 2560 with Arduino platform",
            "Wireless Bluetooth PS3 controller",
            "All India Rank: 20"
        ],
        badge: "AIR 20",
        color: "from-cyan-500/10 to-sky-500/5",
        badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    },
    {
        year: "2014",
        rank: "AIR 15",
        icon: <Award className="w-10 h-10 text-orange-400" />,
        title: "ROBOCON 2014",
        theme: "Salute to the Parenthood",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Manual parent robot and autonomous child robot working together. Featured extensive pneumatic systems and helical wheels.",
        fullDesc: [
            "Manual parent robot",
            "Autonomous child robot",
            "Microcontroller ATMEGA 2560 with Arduino platform",
            "Extensive Pneumatic systems",
            "Helical wheels",
            "All India Rank: 15"
        ],
        badge: "AIR 15",
        color: "from-orange-500/10 to-red-500/5",
        badgeColor: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    },
    {
        year: "2013",
        rank: "AIR 11",
        icon: <Target className="w-10 h-10 text-emerald-400" />,
        title: "ROBOCON 2013",
        theme: "Green Planet",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Task was to plant seeds with robots and then projectile a plant on a pole. First 3D CAD model and featured bi-directional wheels.",
        fullDesc: [
            "Task: Plant seeds with robots",
            "Projectile a plant on a pole",
            "First 3D CAD model",
            "Bi-directional wheels",
            "Microcontroller ATMEGA 2560 with Arduino platform",
            "All India Rank: 11"
        ],
        badge: "AIR 11",
        color: "from-emerald-500/10 to-green-500/5",
        badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    },
    {
        year: "2012",
        rank: "AIR 17",
        icon: <Medal className="w-10 h-10 text-violet-400" />,
        title: "ROBOCON 2012",
        theme: "Pursuit of Peace and Prosperity",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Featured innovative pneumatic technology and heavy duty PMDC motors.",
        fullDesc: [
            "Innovative Pneumatic technology",
            "Microcontroller ATMEGA 2560 with Arduino platform",
            "Heavy duty PMDC motors",
            "All India Rank: 17"
        ],
        badge: "AIR 17",
        color: "from-violet-500/10 to-purple-500/5",
        badgeColor: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    },
    {
        year: "2011",
        rank: "AIR 15",
        icon: <Trophy className="w-10 h-10 text-sky-400" />,
        title: "ROBOCON 2011",
        theme: "Happiness with Friendship",
        org: "ABU Asia-Pacific Robot Contest",
        shortDesc: "Constructed a two-stage cake using three robots. First team to put the candle on the cake won.",
        fullDesc: [
            "Construct a two stage cake using three robots",
            "First team to put candle on cake wins",
            "Two autonomous and one manual robot",
            "Microcontroller ATMEGA 2560 with Arduino platform",
            "10 array line tracers with PID logic",
            "All India Rank: 15"
        ],
        badge: "AIR 15",
        color: "from-sky-500/10 to-blue-500/5",
        badgeColor: "bg-sky-500/15 text-sky-400 border-sky-500/20",
    },
];

function FlipCard({ achievement, index }: { achievement: typeof achievements[0]; index: number }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative h-[280px] cursor-pointer group perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
                    }`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front Side */}
                <div
                    className={`absolute inset-0 glass p-6 rounded-2xl bg-gradient-to-br ${achievement.color} border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all duration-300 flex flex-col ${index % 2 === 1 ? 'items-end text-right' : ''
                        }`}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className={`flex items-start gap-4 w-full ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                        <div className="p-3 rounded-xl bg-[var(--background)]/50 shrink-0">
                            {achievement.icon}
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <div className={`flex items-center gap-2 flex-wrap ${index % 2 === 1 ? 'justify-end' : ''}`}>
                                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--background)]/60 text-[var(--muted-foreground)] border border-[var(--border)]">
                                    {achievement.year}
                                </span>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${achievement.badgeColor}`}>
                                    {achievement.badge}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-[var(--foreground)]">{achievement.title}</h3>
                            <p className="text-sm font-semibold text-[var(--primary)]">{achievement.theme}</p>
                            <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">{achievement.org}</p>
                        </div>
                    </div>
                    <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mt-4 flex-1">
                        {achievement.shortDesc}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-3 opacity-60">Click to see details →</p>
                </div>

                {/* Back Side */}
                <div
                    className={`absolute inset-0 glass p-5 rounded-2xl bg-gradient-to-br ${achievement.color} border border-[var(--primary)]/30 flex flex-col
                        }`}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
                            Technical Specifications:
                        </p>
                        <ul className="space-y-2">
                            {achievement.fullDesc.map((item, i) => (
                                <li key={i} className="text-sm text-[var(--foreground)] flex items-start gap-2">
                                    <span className="text-[var(--primary)] mt-1.5 shrink-0">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xs text-[var(--muted-foreground)] mt-2 opacity-60">← Click to go back</p>
                </div>
            </div>
        </div>
    );
}

export default function AchievementsPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 grid-bg relative">
                <div className="absolute top-20 left-1/3 w-96 h-96 bg-yellow-700/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative">
                    <p className="text-[var(--primary)] font-semibold text-sm tracking-widest uppercase mb-4">Our Track Record</p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Built on <span className="text-shimmer">Victories</span>
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-xl leading-relaxed max-w2xl mx-auto">
                        From local competitions to national championships — Vulcans consistently delivers excellence.
                    </p>
                    <p className="text-[var(--muted-foreground)] text-sm mt-4">Click on any card to see detailed specifications</p>
                </div>
            </section>

            {/* Achievement Cards */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((a, i) => (
                        <FlipCard key={i} achievement={a} index={i} />
                    ))}
                </div>
            </section>
        </main>
    );
}
