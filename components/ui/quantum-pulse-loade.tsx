'use client';

import { cn } from "@/lib/utils";

type QuantumPulseLoadeProps = {
    className?: string;
    text?: string;
};

export const Component = ({ className, text = "Initializing" }: QuantumPulseLoadeProps) => {
    const letters = text.split("");

    return (
        <div className={cn("generating-loader-wrapper", className)}>
            <div className="generating-loader-text" aria-label={text}>
                {letters.map((letter, index) => (
                    <span
                        key={`${letter}-${index}`}
                        className="generating-loader-letter"
                        style={{ animationDelay: `${index * 0.08}s` }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </span>
                ))}
            </div>
            <div className="generating-loader-bar" />
        </div>
    );
};
