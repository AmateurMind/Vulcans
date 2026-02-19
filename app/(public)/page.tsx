import { RobotScrollClient } from "@/components/ui/RobotScrollClient";
import { Trophy, Users, Cpu, Star, ArrowRight, Zap, Globe, Shield } from "lucide-react";
import Link from "next/link";



const stats = [
  { label: "National Ranks", value: "Top 5" },
  { label: "Competitions Won", value: "24+" },
  { label: "Active Members", value: "60+" },
  { label: "Years Active", value: "8+" },
];

const features = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "High-Performance Builds",
    desc: "We engineer robots that push the limits of speed, precision, and autonomy."
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    title: "Competitive Excellence",
    desc: "Consistently qualifying for national & international robotics competitions."
  },
  {
    icon: <Globe className="w-6 h-6 text-violet-400" />,
    title: "Global Community",
    desc: "A network of engineers, mentors, and alumni across the globe."
  },
];

const highlights = [
  {
    icon: <Trophy className="w-7 h-7 text-yellow-400" />,
    title: "Robocon 2024",
    desc: "Secured 3rd place nationally in ABU Robocon 2024.",
    color: "from-yellow-500/10 to-orange-500/5",
    border: "hover:border-yellow-500/30",
  },
  {
    icon: <Cpu className="w-7 h-7 text-violet-400" />,
    title: "AI Bot Project",
    desc: "Built an autonomous navigation bot using ROS2 and computer vision.",
    color: "from-violet-500/10 to-purple-500/5",
    border: "hover:border-violet-500/30",
  },
  {
    icon: <Users className="w-7 h-7 text-blue-400" />,
    title: "National Finalist",
    desc: "Participated in IIT Bombay Techfest robotics challenge as national finalists.",
    color: "from-blue-500/10 to-cyan-500/5",
    border: "hover:border-blue-500/30",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#030712] text-white">

      {/* Scrollytelling Hero */}
      <section className="relative w-full bg-[#050a14]">
        <RobotScrollClient />
      </section>



      {/* Stats strip */}
      <section className="py-12 border-y border-white/5 bg-black/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-bold text-shimmer">{s.value}</span>
              <span className="text-sm text-neutral-500 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <p className="text-violet-400 font-semibold text-sm tracking-widest uppercase mb-4">Who We Are</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Engineering the <span className="text-shimmer">future</span>, one bot at a time.
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              Vulcans is a student-led robotics and engineering club dedicated to innovation,
              collaboration, and competitive excellence. We design, build, and program robots
              that compete at national and international levels.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 font-semibold transition-all duration-200 group shadow-lg shadow-violet-500/20">
              Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-4">
            {features.map((f, i) => (
              <div key={i} className="glass p-5 rounded-2xl flex items-start gap-4 hover:border-white/15 transition-all duration-300">
                <div className="p-2.5 rounded-xl bg-white/5 shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-6 w-full bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-violet-400 font-semibold text-sm tracking-widest uppercase mb-3">Recent Highlights</p>
            <h2 className="text-3xl md:text-4xl font-bold">Our Latest Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <div key={i} className={`p-7 rounded-2xl glass bg-gradient-to-br ${h.color} border border-white/5 ${h.border} transition-all duration-300 hover:-translate-y-1`}>
                <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit">{h.icon}</div>
                <h3 className="text-xl font-bold mb-2">{h.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/achievements" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold transition-colors group">
              View All Achievements <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="relative">
            <Star className="w-10 h-10 text-violet-400 mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Something Epic?</h2>
            <p className="text-neutral-400 mb-8 text-lg max-w-xl mx-auto">
              Join Vulcans and be part of a team that competes, innovates, and makes history.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-full font-bold text-lg transition-all duration-200 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 group"
            >
              Join Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
