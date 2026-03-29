import * as React from "react";
import { cn } from "@/lib/utils";

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

interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    members: TeamMember[];
    registerLink?: string;
    logo?: React.ReactNode;
    socialLinksMain?: SocialLink[];
}

export const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
    (
        {
            title,
            description,
            members,
            registerLink,
            logo,
            socialLinksMain,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <section
                ref={ref}
                className={cn(
                    "relative w-full overflow-hidden bg-background py-12 md:py-24 lg:py-32",
                    className
                )}
                {...props}
            >
                <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
                    <div className="absolute inset-0 z-0 opacity-5">
                        <svg className="h-full w-full" fill="none">
                            <defs>
                                <pattern
                                    id="grid"
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
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="relative z-10 flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-start md:text-left lg:gap-8">
                        <div className="grid gap-2 text-center md:text-left mx-auto md:mx-0">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-muted-foreground">
                                <span className="text-primary block text-xl sm:text-2xl md:text-3xl font-medium font-serif italic mb-2">
                                    Our
                                </span>
                                {title}
                            </h1>
                            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Logo and Register Link could go here */}
                        {registerLink || logo ? (
                            <div className="flex flex-col items-center gap-4 md:items-end">
                                {logo && <div className="text-2xl font-bold">{logo}</div>}
                                {registerLink && (
                                    <a
                                        href={registerLink}
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        REGISTER NOW
                                    </a>
                                )}
                            </div>
                        ) : null}
                    </div>

                    {socialLinksMain && socialLinksMain.length > 0 && (
                        <div className="relative z-10 flex w-full items-center justify-center gap-4 py-4 md:justify-center">
                            {socialLinksMain.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <link.icon className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                    )}

                    <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 mt-12">
                        {members.map((member, index) => (
                            <div
                                key={index}
                                className="group relative flex flex-col justify-end overflow-hidden rounded-xl shadow-lg transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-xl aspect-[4/5] bg-background"
                            >
                                <img
                                    src={member.imageSrc}
                                    alt={member.name}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                
                                {/* Subtle dark gradient for text readability at the bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300" />

                                {/* Social links - Top Right square overlays */}
                                {member.socialLinks && member.socialLinks.length > 0 && (
                                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                                        {member.socialLinks.map((link, linkIndex) => (
                                            <a
                                                key={linkIndex}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center h-8 w-8 text-foreground hover:text-primary-foreground hover:bg-primary transition-colors bg-background/60 backdrop-blur-md rounded-sm shadow-sm"
                                            >
                                                <link.icon className="h-4 w-4" />
                                            </a>
                                        ))}
                                    </div>
                                )}

                                {/* Text - Bottom Left */}
                                <div className="relative z-10 p-6 flex flex-col justify-end items-start text-left w-full mt-auto bg-gradient-to-t from-black/90 pt-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-sm mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm md:text-base font-medium text-primary drop-shadow-sm">
                                        {member.designation}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
);

TeamSection.displayName = "TeamSection";
