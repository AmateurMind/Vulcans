"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Linkedin } from "lucide-react";
import { TeamSection } from "@/components/ui/team-section-1";

const ID_CARD_IMAGES = [
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
            socialLinks: [{ icon: Linkedin, href: "https://www.linkedin.com/in/shreyaskumbhar185" }],
        },
        {
            name: "Chase Gunjal",
            designation: "Vice Captain",
            socialLinks: [{ icon: Linkedin, href: "https://www.linkedin.com/in/chase-gunjal-b5a1b92b4" }],
        },
        {
            name: "Asmi Patil",
            designation: "Electronics Lead",
            socialLinks: [{ icon: Linkedin, href: "https://www.linkedin.com/in/asmipatil/" }],
        },
        {
            name: "Advait Deo",
            designation: "Software Lead",
            socialLinks: [{ icon: Linkedin, href: "https://www.linkedin.com/in/advait-deo-20b179345/" }],
        },
        {
            name: "Sarvesh Daphale",
            designation: "Mechanical Lead",
            socialLinks: [{ icon: Linkedin, href: "https://www.linkedin.com/in/sarvesh-daphale-3443a8316" }],
        },
        {
            name: "Harshal Raje",
            designation: "Co-Secretary",
            socialLinks: [{ icon: Linkedin, href: "https://www.linkedin.com/in/harshal-raje-a0b391323" }],
        },
        {
            name: "Vaishnavi Sutar",
            designation: "Co-Secretary",
            socialLinks: [{ icon: Linkedin, href: "https://www.linkedin.com/in/vaishnavi-sutar-2bba892b4" }],
        },
        {
            name: "Samiksha Mote",
            designation: "Joint Secretary",
            socialLinks: [{ icon: Linkedin, href: "#" }],
        }
    ] as const;

    const matchedPool = [
        ...leaders.map((member) => getBestImageForName(member.name)).filter(Boolean),
        ...(dbMembers ?? []).map((member) => getBestImageForName(member.name)).filter(Boolean),
    ] as string[];
    const fallbackPool = matchedPool.length > 0 ? matchedPool : ["/ID CARD/core/Asmi Patil.jpg"];
    let fallbackCursor = 0;
    const getFallbackImage = () => {
        const image = fallbackPool[fallbackCursor % fallbackPool.length];
        fallbackCursor += 1;
        return image;
    };

    const leadersWithImages = leaders.map((member) => ({
        ...member,
        imageSrc: getBestImageForName(member.name) ?? getFallbackImage(),
    }));

    const coreNames = new Set(leaders.map((member) => member.name.toLowerCase()));
    const otherMembers = (dbMembers ?? [])
        .filter((member) => !coreNames.has(member.name.toLowerCase()))
        .map((member) => ({
            name: member.name,
            designation:
                member.role === "Team Member"
                    ? member.department || "NA"
                    : member.department
                        ? `${member.role} - ${member.department}`
                        : member.role || "Team Member",
            imageSrc: getBestImageForName(member.name) ?? getFallbackImage(),
            socialLinks: [{ icon: Linkedin, href: member.linkedIn || "#" }],
        }));

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-10">
            <TeamSection
                title="Core Team"
                description="The core team driving Team Vulcans forward with innovation, teamwork, and technical excellence."
                members={leadersWithImages}
                className="pt-6 md:pt-10 lg:pt-12"
            />

            {otherMembers.length > 0 && (
                <TeamSection
                    title="Other Members"
                    description="Our extended team members across departments."
                    members={otherMembers}
                    className="pt-0 md:pt-4 lg:pt-6"
                />
            )}

        </main>
    );
}
