"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Terminal } from "lucide-react";

const orbitRings: string[][] = [
  // Ring 1
  [
    "devicon-java-plain",
    "devicon-nodejs-plain",
    "devicon-typescript-plain",
    "devicon-rust-line",
  ],
  // Ring 2
  [
    "devicon-quarkus-plain",
    "devicon-spring-original",
    "devicon-angular-plain",
    "devicon-tauri-plain",
  ],
  // Ring 3
  [
    "devicon-github-original",
    "devicon-postman-plain",
    "devicon-googlecloud-plain",
    "devicon-pytorch-plain",
  ],
];

interface StackFeatureSectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function StackFeatureSection({
  title = "Build your idea",
  description = "RUIXEN is a modern and responsive UI kit for React, Next.js, and Tailwind CSS.",
  primaryLabel = "Get Started",
  primaryHref = "https://ruixen.com",
  secondaryLabel = "Learn More",
  secondaryHref = "#",
}: StackFeatureSectionProps) {
  const orbitGap = 8; // rem between orbits

  return (
    <section className="relative max-w-6xl mx-auto my-12 flex flex-col items-center justify-between gap-8 px-6 py-12 min-h-[34rem] border border-gray-200 dark:border-gray-700 bg-white dark:bg-black overflow-hidden rounded-3xl shadow-xl lg:my-32 lg:flex-row lg:gap-0 lg:px-0 lg:py-0 lg:pl-10 lg:h-[30rem]">
      {/* Left side: Heading and Text */}
      <div className="w-full z-10 lg:w-1/2">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white sm:text-4xl lg:text-6xl">
          {title}
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mb-6 max-w-lg">
          {description}
        </p>
        <div className="flex items-center gap-3">
          <Button variant="default" asChild>
            <Link
              href={primaryHref}
              {...(primaryHref.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {primaryLabel}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={secondaryHref}
              {...(secondaryHref.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {secondaryLabel}
            </Link>
          </Button>
        </div>
      </div>

      {/* Right side: Orbit animation cropped to 1/4 */}
      <div className="relative hidden w-full items-center justify-center overflow-hidden h-64 lg:flex lg:h-full lg:w-1/2 lg:justify-start">
        <div className="relative mx-auto flex h-[34rem] w-[34rem] items-center justify-center sm:h-[50rem] sm:w-[50rem] lg:mx-0 lg:translate-x-[50%]">
          {/* Center Circle */}
          <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-800 shadow-lg flex items-center justify-center">
            <Terminal className="h-12 w-12 text-blue-400" />
          </div>

          {/* Generate Orbits */}
          {orbitRings.map((ringIcons, orbitIdx) => {
            const size = `${12 + orbitGap * (orbitIdx + 1)}rem`; // equal spacing
            const angleStep = (2 * Math.PI) / ringIcons.length;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border-2 border-dotted border-gray-300 dark:border-gray-600"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${12 + orbitIdx * 6}s linear infinite`,
                }}
              >
                {ringIcons.map((cls, iconIdx) => {
                  const angle = iconIdx * angleStep;
                  const x = 50 + 50 * Math.cos(angle);
                  const y = 50 + 50 * Math.sin(angle);

                  return (
                    <div
                      key={iconIdx}
                      className="absolute bg-white dark:bg-gray-800 rounded-full p-1 shadow-md flex items-center justify-center"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <i className={`${cls} grayscale text-3xl`} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
