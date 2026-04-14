"use client";
import { Linkedin, Github, Star } from "lucide-react";
import { TeamSection } from "@/components/ui/team-section-1";
import Image from "next/image";

const TEAM_LINKEDIN_URL = "https://www.linkedin.com/company/teamvulcans/";

const FE_STUDENTS = [
  { name: "Aditya Jadhav", imageSrc: "/ID CARD/FE/Aditya jadhav.jpg" },
  { name: "Anushri Patil", imageSrc: "/ID CARD/FE/Anushri patil.jpg" },
  { name: "Arjun Mangale", imageSrc: "/ID CARD/FE/Arjun mangale.jpg" },
  { name: "Dimple Thakare", imageSrc: "/ID CARD/FE/Dimple thakare.jpg" },
  { name: "Krish More", imageSrc: "/ID CARD/FE/Krish more.jpg" },
  { name: "Mrunal Mali", imageSrc: "/ID CARD/FE/Mrunal mali.jpg" },
  { name: "Parth Kantule", imageSrc: "/ID CARD/FE/Parth kantule.jpg" },
  { name: "Rugved Bhor", imageSrc: "/ID CARD/FE/Rugved bhor.jpg" },
  { name: "Samiksha Mote", imageSrc: "/ID CARD/FE/Samiksha mote.jpg" },
  { name: "Sanika Sane", imageSrc: "/ID CARD/FE/Sanika sane.jpg" },
  { name: "Shreyank Samdole", imageSrc: "/ID CARD/FE/Shreyank samdole.png" },
  { name: "Soham Lawate", imageSrc: "/ID CARD/FE/Soham lawate.jpg" },
  { name: "Swara Shashtri", imageSrc: "/ID CARD/FE/Swarashashtri.jpg" },
  { name: "Vedant Agale", imageSrc: "/ID CARD/FE/Vedant agale.jpg" },
  { name: "Venkatesh Deore", imageSrc: "/ID CARD/FE/Venkatesh deore.jpg" },
];

interface SocialLink {
    icon: React.ElementType;
    href: string;
}

interface TeamMember {
    name: string;
    designation: string;
    imageSrc: string;
    socialLinks?: readonly SocialLink[];
}

const leaders: TeamMember[] = [
  {
    name: "Shreyas Kumbhar",
    designation: "Captain",
    imageSrc: "/ID CARD/core/Shreyas Kumbhar.png",
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Chase Gunjal",
    designation: "Vice Captain",
    imageSrc: "/ID CARD/core/Chase Gunjal.png",
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Asmi Patil",
    designation: "Electronics Lead",
    imageSrc: "/ID CARD/core/Asmi Patil.png",
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Advait Deo",
    designation: "Software Lead",
    imageSrc: "/ID CARD/core/Advait Deo.png",
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Sarvesh Daphale",
    designation: "Mechanical Lead",
    imageSrc: "/ID CARD/core/sarvesh Daphale.jpg",
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Harshal Raje",
    designation: "Co-Secretary",
    imageSrc: "/ID CARD/core/Harshal Raje.png",
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Vaishnavi Sutar",
    designation: "Co-Secretary",
    imageSrc: "/ID CARD/core/Vaishnavi Sutar.png",
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Samiksha Mote",
    designation: "Joint Secretary",
    imageSrc: "/ID CARD/FE/Samiksha mote.jpg",
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
] as const;

const otherMembers: TeamMember[] = [
  {
    name: "Laukik Mesharam",
    designation: "Jr. Embedded Engineer",
    imageSrc: "/ID CARD/Laukik Meshram.png", // Fixed extension & space
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Vedant Kaulgekar",
    designation: "Jr. AI/ML Engineer",
    imageSrc: "/ID CARD/Vedant Kaulgekar.jpeg", // Matches explorer
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Aditya Garad",
    designation: "Jr. Embedded Engineer",
    imageSrc: "/ID CARD/Aditya Garad.png", // Fixed extension & casing
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Yash Doke",
    designation: "Jr. ROS Engineer",
    imageSrc: "/ID CARD/Yash Doke.jpg", // Matches explorer
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Viraj Jadhao",
    designation: "Jr. Software Developer",
    imageSrc: "", // Not found in image
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Harsh Jain",
    designation: "Jr. AI/ML Engineer",
    imageSrc: "/ID CARD/IMG_4546(Harsh Jain).PNG", // Matches exact casing
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Meherdeep Chapade",
    designation: "Jr. Electronics Engineer",
    imageSrc: "/ID CARD/Meherdeep Chapade.png", // Updated to match explorer filename
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Ashwin Bobade",
    designation: "Jr. Electronics Engineer",
    imageSrc: "/ID CARD/Ashwin Bobade.png", // Fixed casing
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Anand Jad",
    designation: "Jr. Embedded Engineer",
    imageSrc: "/ID CARD/Anand Jad.png", // Added from explorer
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Athrav Ghorpade",
    designation: "Jr. Electrical Engineer",
    imageSrc: "", 
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Yashodhan Kulkarni",
    designation: "Jr. Software Developer",
    imageSrc: "", 
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Prathamesh Shingade",
    designation: "Jr. Design Engineer (CAD)",
    imageSrc: "/ID CARD/Prathamesh Shingade.png", // Fixed spelling & extension
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Aditya Darekar",
    designation: "Jr. Embedded Engineer",
    imageSrc: "/ID CARD/Aditya Darekar.png", // Fixed filename
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Vaibhav Pawar",
    designation: "Jr. PCB Design Engineer",
    imageSrc: "/ID CARD/Vaibhav Pawar.png", // Added from explorer
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Pranav Shinde",
    designation: "Jr. Embedded Engineer",
    imageSrc: "/ID CARD/Pranav Shinde.png", // Fixed extension
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Ayush Tiwari",
    designation: "Jr. Embedded Engineer",
    imageSrc: "/ID CARD/Ayush Tiwari.png", // Fixed extension
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Pradyumna Rawas",
    designation: "Jr. Circuit Design Engineer",
    imageSrc: "/ID CARD/Pradyumna Rawas.png", // Added from explorer
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Janhavi Pawar",
    designation: "Jr. Media & Content Executive",
    imageSrc: "/ID CARD/Janhavi Pawar.jpeg", // Fixed extension
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Aryan Shirkhe",
    designation: "Jr. Embedded Engineer",
    imageSrc: "", 
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
  {
    name: "Snehal Shirur",
    designation: "Jr. Electronics Engineer",
    imageSrc: "/ID CARD/Snehal_Shirur.jpg", // Added from explorer
    socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
  },
];

export default function TeamPage() {

  return (
    <main className="min-h-screen bg-background text-foreground pt-10">
      <TeamSection
        title="Core Team"
        description="The core team driving Team Vulcans forward with innovation, teamwork, and technical excellence."
        members={leaders}
        className="pt-6 md:pt-10 lg:pt-12"
      />

      {otherMembers.length > 0 && (
        <TeamSection
          title="Team Members"
          description="Our talented members across all departments."
          members={otherMembers}
          className="pt-0 md:pt-4 lg:pt-6"
        />
      )}

      <section className="relative w-full overflow-hidden bg-background py-12 md:py-24">
        <div className="absolute inset-0 z-0 opacity-5">
          <svg className="h-full w-full" fill="none">
            <defs>
              <pattern
                id="grid-fe"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 0L0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-muted-foreground"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-fe)" />
          </svg>
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-muted-foreground">
              <span className="text-primary block text-lg sm:text-xl md:text-2xl font-medium font-serif italic mb-2">
                Newest Additions
              </span>
              FE Students
            </h2>
          </div>

          <div className="relative flex overflow-hidden w-full group/marquee pb-8 px-4">
            <style>{`
              @keyframes marquee {
                0% { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(-100%, 0, 0); }
              }
              .animate-marquee {
                animation: marquee 36s linear infinite;
                transform: translate3d(0, 0, 0);
              }
            `}</style>

            <div className="flex shrink-0 animate-marquee will-change-transform group-hover/marquee:paused items-center gap-8 pr-8">
              {FE_STUDENTS.map((student, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 min-w-30 group/student"
                >
                  <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-border/50 bg-background/20 transition-transform duration-150 ease-out transform-gpu will-change-transform group-hover/student:scale-[1.03] shadow-md">
                    <Image
                      src={student.imageSrc}
                      alt={student.name}
                      width={112}
                      height={112}
                      sizes="112px"
                      quality={75}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-150 ease-out transform-gpu will-change-transform group-hover/student:scale-[1.06]"
                    />
                  </div>
                  <span className="text-base font-semibold text-foreground text-center leading-tight whitespace-nowrap">
                    {student.name}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="flex shrink-0 animate-marquee will-change-transform group-hover/marquee:paused items-center gap-8 pr-8"
              aria-hidden="true"
            >
              {FE_STUDENTS.map((student, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex flex-col items-center gap-4 min-w-30 group/student"
                >
                  <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-border/50 bg-background/20 transition-transform duration-150 ease-out transform-gpu will-change-transform group-hover/student:scale-[1.03] shadow-md">
                    <Image
                      src={student.imageSrc}
                      alt={student.name}
                      width={112}
                      height={112}
                      sizes="112px"
                      quality={75}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-150 ease-out transform-gpu will-change-transform group-hover/student:scale-[1.06]"
                    />
                  </div>
                  <span className="text-base font-semibold text-foreground text-center leading-tight whitespace-nowrap">
                    {student.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-12 md:pb-24 max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-lg dark:bg-[#0a0a0f] dark:border-white/10 dark:shadow-[0_0_100px_rgba(100,50,255,0.05)]">
          {/* Subtle glow effects */}
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 h-64 rounded-full bg-purple-500/10 dark:bg-purple-900/40 blur-[80px] dark:blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-64 h-64 rounded-full bg-blue-500/5 dark:bg-blue-900/20 blur-[80px] dark:blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-2 items-center p-5 md:p-6 lg:p-8">
            <div className="flex flex-col gap-3 md:pr-4">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
                Open Source Project
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-sm leading-relaxed font-medium">
                We have made this project open source and available on GitHub. Feel free to contribute! Don't forget to star us on GitHub! ✨
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href="https://github.com/AmateurMind/Vulcans"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm font-semibold transition-all duration-300 shadow-sm border border-border/50 bg-slate-100 text-slate-800 hover:bg-slate-200 hover:-translate-y-0.5 dark:bg-[#1c1c24] dark:text-white dark:border-white/10 dark:hover:bg-[#2a2a35] dark:hover:border-white/20"
                >
                  <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>View on GitHub</span>
                </a>
                <a
                  href="https://github.com/AmateurMind/Vulcans"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm font-semibold transition-all duration-300 shadow-sm border border-border/50 bg-slate-100 text-slate-800 hover:bg-slate-200 hover:-translate-y-0.5 dark:bg-[#1c1c24] dark:text-white dark:border-white/10 dark:hover:bg-[#2a2a35] dark:hover:border-white/20"
                >
                  <span>Star</span>
                  <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
                </a>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-border shadow-md transform transition-all hover:scale-[1.02] duration-500 bg-background lg:mt-0 mt-4 mx-auto w-full max-w-md lg:max-w-sm xl:max-w-md dark:border-white/10 dark:bg-[#0d1117] dark:shadow-[0_0_30px_rgba(100,50,255,0.15)] ring-1 ring-border/50 dark:ring-white/5">
              {/* Fake browser header */}
              <div className="flex items-center gap-2 px-3 py-2 border-b relative bg-slate-100 border-border/50 dark:bg-[#161b22] dark:border-white/10">
                <div className="flex gap-1.5 pl-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400 dark:bg-red-500/90 shadow-sm"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 dark:bg-yellow-500/90 shadow-sm"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-500/90 shadow-sm"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 rounded-md px-6 py-0.5 text-[9.5px] flex items-center gap-1.5 border bg-white border-border/50 text-slate-500 shadow-sm dark:bg-[#0d1117] dark:border-white/10 dark:text-white/50 dark:shadow-inner">
                   <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current opacity-70"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                   Vulcans
                </div>
              </div>
              <Image 
                src="/github.png" 
                alt="Vulcans Repository on GitHub" 
                width={600}
                height={350}
                className="w-full h-auto object-cover opacity-90 transition-opacity duration-300 hover:opacity-100 min-h-[150px] max-h-[200px] object-top"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
