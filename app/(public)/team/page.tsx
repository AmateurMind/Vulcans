import { Github, Linkedin, Mail } from "lucide-react";

const teams = [
    {
        title: "Leadership",
        members: [
            { name: "Arjun Mehta", role: "Club President", domain: "Mechanical & Strategy", initials: "AM" },
            { name: "Priya Sharma", role: "Vice President", domain: "Electrical Systems", initials: "PS" },
            { name: "Rohit Kumar", role: "Technical Lead", domain: "Software & AI", initials: "RK" },
        ],
    },
    {
        title: "Mechanical Team",
        members: [
            { name: "Siddharth Jain", role: "Mech Lead", domain: "CAD & Fabrication", initials: "SJ" },
            { name: "Ananya Patel", role: "Design Engineer", domain: "Structural Analysis", initials: "AP" },
            { name: "Vikram Rao", role: "Fabrication Head", domain: "3D Printing & CNC", initials: "VR" },
        ],
    },
    {
        title: "Electrical Team",
        members: [
            { name: "Kiran Bose", role: "Electronics Lead", domain: "PCB Design", initials: "KB" },
            { name: "Meghna Iyer", role: "Embedded Systems", domain: "Microcontrollers", initials: "MI" },
            { name: "Tarun Singh", role: "Power Systems", domain: "Battery & Motors", initials: "TS" },
        ],
    },
    {
        title: "Software & AI Team",
        members: [
            { name: "Neha Gupta", role: "Software Lead", domain: "ROS2 & Navigation", initials: "NG" },
            { name: "Aditya Das", role: "CV Engineer", domain: "Computer Vision", initials: "AD" },
            { name: "Riya Kapoor", role: "Firmware Dev", domain: "STM32 & Arduino", initials: "RK" },
        ],
    },
];

const avatarColors = [
    "from-violet-600 to-purple-700",
    "from-blue-600 to-cyan-700",
    "from-rose-600 to-pink-700",
    "from-orange-600 to-amber-700",
];

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-[#030712] text-white">
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 grid-bg relative">
                <div className="absolute top-20 right-1/3 w-96 h-96 bg-blue-700/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative">
                    <p className="text-violet-400 font-semibold text-sm tracking-widest uppercase mb-4">The People</p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Meet the <span className="text-shimmer">Team</span>
                    </h1>
                    <p className="text-neutral-400 text-xl leading-relaxed max-w-2xl mx-auto">
                        Vulcans is powered by passionate engineers, designers, and innovators working as one.
                    </p>
                </div>
            </section>

            {/* Teams */}
            <section className="py-10 px-6 pb-24">
                <div className="max-w-6xl mx-auto flex flex-col gap-16">
                    {teams.map((team, ti) => (
                        <div key={ti}>
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <span className="w-8 h-px bg-violet-500" />
                                {team.title}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                {team.members.map((m, mi) => (
                                    <div
                                        key={mi}
                                        className="glass p-6 rounded-2xl hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center text-center"
                                    >
                                        {/* Avatar */}
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatarColors[(ti + mi) % avatarColors.length]} flex items-center justify-center text-xl font-bold text-white shadow-lg mb-4 group-hover:scale-105 transition-transform`}>
                                            {m.initials}
                                        </div>
                                        <h3 className="font-bold text-lg text-white">{m.name}</h3>
                                        <p className="text-violet-400 text-sm font-semibold mt-1">{m.role}</p>
                                        <p className="text-neutral-500 text-xs mt-1">{m.domain}</p>

                                        {/* Social Links */}
                                        <div className="flex gap-3 mt-4">
                                            {[Github, Linkedin, Mail].map((Icon, idx) => (
                                                <button key={idx} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all">
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
