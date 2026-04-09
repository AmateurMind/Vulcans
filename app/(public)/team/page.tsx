"use client";
import { Linkedin } from "lucide-react";
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
    </main>
  );
}
