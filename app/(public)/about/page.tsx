import { Cpu, Target, Heart, Rocket } from "lucide-react";

const values = [
    { icon: <Target className="w-6 h-6 text-violet-400" />, title: "Excellence", desc: "We strive for the highest standards in everything we build." },
    { icon: <Heart className="w-6 h-6 text-rose-400" />, title: "Collaboration", desc: "Every great robot is built by a great team working together." },
    { icon: <Rocket className="w-6 h-6 text-blue-400" />, title: "Innovation", desc: "We push boundaries and explore unconventional solutions." },
    { icon: <Cpu className="w-6 h-6 text-yellow-400" />, title: "Precision", desc: "Engineering isn't forgiving — we sweat the details." },
];

const timeline = [
    { year: "2016", title: "Club Founded", desc: "Vulcans Robotics Club was established with just 8 passionate members." },
    { year: "2018", title: "First National Win", desc: "Won the state-level robotics championship for the first time." },
    { year: "2020", title: "Robocon Debut", desc: "Competed in ABU Robocon for the first time; reached national finals." },
    { year: "2022", title: "AI Integration", desc: "Launched our AI and Computer Vision sub-team." },
    { year: "2024", title: "Top 3 Nationally", desc: "Secured 3rd place in ABU Robocon national qualifiers." },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#030712] text-white">
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 grid-bg relative">
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-violet-700/15 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative">
                    <p className="text-violet-400 font-semibold text-sm tracking-widest uppercase mb-4">About Us</p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        We Are <span className="text-shimmer">Vulcans</span>
                    </h1>
                    <p className="text-neutral-400 text-xl leading-relaxed max-w-2xl mx-auto">
                        A student-run robotics and engineering club on a mission to push the boundaries of technology
                        through competition, innovation, and relentless curiosity.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1 glass rounded-3xl p-10 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-700/20 rounded-full blur-3xl" />
                        <h2 className="text-2xl font-bold mb-4 relative">Our Mission</h2>
                        <p className="text-neutral-400 leading-relaxed relative">
                            To nurture the next generation of engineers and roboticists by providing hands-on experience,
                            mentorship, and a platform to compete at the highest levels.
                        </p>
                    </div>
                    <div className="flex-1 glass rounded-3xl p-10 relative overflow-hidden">
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-700/20 rounded-full blur-3xl" />
                        <h2 className="text-2xl font-bold mb-4 relative">Our Vision</h2>
                        <p className="text-neutral-400 leading-relaxed relative">
                            To be a globally recognized center of robotics excellence, producing engineers who lead the
                            technological transformation of tomorrow.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 px-6 bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <div key={i} className="glass p-6 rounded-2xl hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1">
                                <div className="p-3 rounded-xl bg-white/5 w-fit mb-4">{v.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-14">Our Journey</h2>
                    <div className="relative">
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600/50 via-purple-500/30 to-transparent" />
                        <div className="flex flex-col gap-10">
                            {timeline.map((item, i) => (
                                <div key={i} className={`flex gap-8 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className="flex-1 glass rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-300">
                                        <span className="text-violet-400 font-bold text-sm mb-2 block">{item.year}</span>
                                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                        <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                    <div className="w-4 h-4 rounded-full bg-violet-500 border-2 border-violet-300 shadow-lg shadow-violet-500/50 mt-6 shrink-0 z-10 relative" />
                                    <div className="flex-1 hidden md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
