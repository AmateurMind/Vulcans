import { AboutBot } from "@/components/ui/about-bot";

const introParagraphs = [
    "Established in 2011, Team Vulcans brings together students from E&TC, Mechanical, Computer, and Electrical engineering who share a strong passion for robotics and hands-on innovation.",
    "With access to a fully equipped robotics lab and mentorship from experienced faculty, members design, build, test, and refine real systems through workshops, tutorials, lectures, webinars, and project-based learning.",
    "The club culture focuses on disciplined engineering, collaborative execution, and continuous improvement, preparing students to perform confidently in high-pressure national and international competitions.",
    "Team Vulcans has built a strong competitive legacy over the years, including the Best Rookie Award in Robocon 2011, a First Prize finish at ESCLADE (IIT Guwahati), and top national performances across multiple Robocon seasons.",
    "Standout milestones include perfect scores in Robocon 2020 and 2022, Class A recognition in e-Yantra TBT at IIT Bombay, and consistent All India rankings, including a top-5 finish in Robocon 2017 and top-20 placements in recent editions.",
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-vulcan-bg-primary text-vulcan-text-primary">
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 grid-bg relative">
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-vulcan-red-primary/15 rounded-full blur-[120px] pointer-events-none z-10" />
                <div className="max-w-6xl mx-auto relative z-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="text-center md:text-left">
                        <p className="text-vulcan-red-primary font-semibold text-sm tracking-widest uppercase mb-4">About Us</p>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Team <span className="text-shimmer">Vulcans</span>
                        </h1>
                        <p className="text-vulcan-text-muted text-xl leading-relaxed max-w-2xl">
                            A robotics club driven by innovation, hands-on engineering, and competitive excellence since 2011.
                        </p>
                    </div>
                    <div>
                        <AboutBot />
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto glass bg-vulcan-bg-secondary border border-vulcan-border rounded-xs p-8 md:p-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Introduction</h2>
                    <div className="space-y-5">
                        {introParagraphs.map((paragraph, index) => (
                            <p key={index} className="text-vulcan-text-muted text-base md:text-lg leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
