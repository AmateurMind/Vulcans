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
    desc: "From CAD to final assembly, we build competition-ready robots with precision and reliability."
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    title: "Competitive Excellence",
    desc: "24+ competition wins and consistent national-level performances across major robotics events."
  },
  {
    icon: <Globe className="w-6 h-6 text-[var(--primary)]" />,
    title: "Club Ecosystem",
    desc: "A growing PESMCOE network of student builders, mentors, and alumni driving each season forward."
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
    icon: <Cpu className="w-7 h-7 text-[var(--primary)]" />,
    title: "AI Bot Project",
    desc: "Built an autonomous navigation bot using ROS2 and computer vision.",
    color: "from-[var(--primary)]/10 to-[var(--primary)]/5",
    border: "hover:border-[var(--primary)]/30",
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
      <section className="py-12 border-y border-[var(--border)] bg-[var(--background)]/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-bold text-shimmer">{s.value}</span>
              <span className="text-sm text-[var(--muted-foreground)] font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <p className="text-[var(--primary)] font-semibold text-sm tracking-widest uppercase mb-4">Who We Are</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Engineering the <span className="text-shimmer">future</span>, one bot at a time.
            </h2>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-8">
              Vulcans Robotics Club at PESMCOE is a student-led engineering team focused on design, manufacturing,
              embedded systems, and autonomous control. For 8+ years, our members have built robots that perform on
              national competition stages while mentoring the next generation of builders on campus.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] font-semibold transition-all duration-200 group shadow-lg shadow-[var(--primary-glow)]">
              Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[var(--foreground)]" />
            </Link>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-4">
            {features.map((f, i) => (
              <div key={i} className="glass p-5 rounded-2xl flex items-start gap-4 hover:border-[var(--primary)]/30 transition-all duration-300">
                <div className="p-2.5 rounded-xl bg-[var(--primary-maroon)]/50 shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-[var(--foreground)] mb-1">{f.title}</h3>
                  <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-6 w-full bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[var(--primary)] font-semibold text-sm tracking-widest uppercase mb-3 relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[var(--primary)] after:left-0 after:-bottom-1 after:shadow-[0_0_8px_var(--primary-glow)]">Recent Highlights</p>
            <h2 className="text-3xl md:text-4xl font-bold">Our Latest Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <div key={i} className={`p-7 rounded-2xl glass bg-[var(--card)] border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_0_20px_var(--primary-glow)] group`}>
                <div className="mb-4 p-3 rounded-xl bg-[var(--primary-maroon)]/30 w-fit group-hover:scale-110 transition-transform">{h.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{h.title}</h3>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/achievements" className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold transition-colors group">
              View All Achievements <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center relative overflow-hidden bg-gradient-to-b from-[var(--primary-maroon)] to-[var(--background)] border-[var(--primary)] border">
          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--primary)] shadow-[0_0_15px_var(--primary-glow)]" />
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[var(--primary)]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[var(--primary-dark)]/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative z-10">
            <Star className="w-10 h-10 text-[var(--primary)] mx-auto mb-5 drop-shadow-[0_0_10px_var(--primary)]" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Build Something Epic?</h2>
            <p className="text-[var(--muted-foreground)] mb-8 text-lg max-w-xl mx-auto">
              Join Vulcans and be part of a team that competes, innovates, and makes history.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0d0d0d] border border-[var(--primary)] hover:bg-[var(--primary)] rounded-full font-bold text-lg text-white transition-all duration-300 shadow-xl shadow-[var(--primary-glow)] group"
            >
              Join Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
