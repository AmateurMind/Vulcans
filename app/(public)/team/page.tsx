"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Linkedin } from "lucide-react";
import { TeamSection } from "@/components/ui/team-section-1";
import Image from "next/image";

const ID_CARD_IMAGES = [
  "/ID CARD/core/shreyas.jpg",
  "/ID CARD/core/Asmi Patil.jpg",
  "/ID CARD/core/advait.jpeg",
  "/ID CARD/core/Passport (Sarvesh) .jpeg",
  "/ID CARD/Aditya_garad.jpg",
  "/ID CARD/ashwin.png",
  "/ID CARD/ayush tiwari.jpg",
  "/ID CARD/Harshal Raje.jpg",
  "/ID CARD/IMG_4546(Harsh Jain).PNG",
  "/ID CARD/jahnvi.jpg",
  "/ID CARD/Laukik_Meshram.jpeg",
  "/ID CARD/passport_photo_meherdeep_chapade.jpg",
  "/ID CARD/Pranav_Shinde.jpeg",
  "/ID CARD/Prathamesh_Shingade.jpg",
  "/ID CARD/Vedant Kaulgekar.jpeg",
  "/ID CARD/Yash Doke.jpg",
];
const GENERIC_PROFILE_IMAGE =
  "";
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

const NAME_ALIASES: Record<string, string[]> = {
  janhavipawar: ["jahnvi"],
  vaishnavisutar: ["vaishanvi"],
  athravghorpade: ["atharv"],
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getBestImageForName(name: string) {
  const normalizedName = normalize(name);
  const tokens = name
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
  const aliases = NAME_ALIASES[normalizedName] ?? [];

  let bestPath: string | null = null;
  let bestScore = 0;

  for (const imagePath of ID_CARD_IMAGES) {
    const normalizedPath = normalize(imagePath);
    let score = 0;

    if (normalizedPath.includes(normalizedName)) score += 100;
    for (const token of tokens) {
      if (normalizedPath.includes(token)) score += 10;
    }
    for (const alias of aliases) {
      if (normalizedPath.includes(normalize(alias))) score += 30;
    }

    if (score > bestScore) {
      bestScore = score;
      bestPath = imagePath;
    }
  }

  return bestScore > 0 ? bestPath : null;
}

export default function TeamPage() {
  const dbMembers = useQuery(api.teamMembers.list);

  // Hardcoded leaders to display exactly as requested at the very top
  const leaders = [
    {
      name: "Shreyas Kumbhar",
      designation: "Captain",
      socialLinks: [
        {
          icon: Linkedin,
          href: TEAM_LINKEDIN_URL,
        },
      ],
    },
    {
      name: "Chase Gunjal",
      designation: "Vice Captain",
      socialLinks: [
        {
          icon: Linkedin,
          href: TEAM_LINKEDIN_URL,
        },
      ],
    },
    {
      name: "Asmi Patil",
      designation: "Electronics Lead",
      socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
    },
    {
      name: "Advait Deo",
      designation: "Software Lead",
      socialLinks: [
        {
          icon: Linkedin,
          href: TEAM_LINKEDIN_URL,
        },
      ],
    },
    {
      name: "Sarvesh Daphale",
      designation: "Mechanical Lead",
      socialLinks: [
        {
          icon: Linkedin,
          href: TEAM_LINKEDIN_URL,
        },
      ],
    },
    {
      name: "Harshal Raje",
      designation: "Co-Secretary",
      socialLinks: [
        {
          icon: Linkedin,
          href: TEAM_LINKEDIN_URL,
        },
      ],
    },
    {
      name: "Vaishnavi Sutar",
      designation: "Co-Secretary",
      socialLinks: [
        {
          icon: Linkedin,
          href: TEAM_LINKEDIN_URL,
        },
      ],
    },
    {
      name: "Samiksha Mote",
      designation: "Joint Secretary",
      socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
    },
  ] as const;

  const getFallbackImage = () => GENERIC_PROFILE_IMAGE;

  const leadersWithImages = leaders.map((member) => ({
    ...member,
    imageSrc:
      member.name === "Samiksha Mote"
        ? "/ID CARD/FE/Samiksha mote.jpg"
        : getBestImageForName(member.name) ?? getFallbackImage(),
  }));

  const coreNames = new Set([
    ...leaders.map((member) => member.name.toLowerCase()),
    "shreayas kumbhar",
  ]);
  const otherMembers = (dbMembers ?? [])
    .filter((member) => {
      const lowerName = member.name.toLowerCase();
      const isShreyasVariant =
        lowerName.includes("kumbhar") && lowerName.includes("shre");
      return !coreNames.has(lowerName) && !isShreyasVariant;
    })
    .map((member) => ({
      name: member.name,
      designation: member.role && member.role !== "Team Member" ? member.role : "Team Member",
      department: member.department || "",
      imageSrc: getBestImageForName(member.name) ?? getFallbackImage(),
      socialLinks: [{ icon: Linkedin, href: TEAM_LINKEDIN_URL }],
    }));

  return (
    <main className="min-h-screen bg-background text-foreground pt-10">
      <TeamSection
        title="Core Team"
        description="The core team driving Team Vulcans forward with innovation, teamwork, and technical excellence."
        members={leadersWithImages}
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
