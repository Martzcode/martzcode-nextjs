import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface Footer7Props {
  logo?: {
    url: string;
    src?: string;
    alt: string;
    title: string;
  };
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSocialLinks = [
  {
    icon: <i className="devicon-github-original text-lg" />,
    href: siteConfig.github.url,
    label: "GitHub",
  },
  {
    icon: <i className="devicon-linkedin-plain text-lg" />,
    href: siteConfig.linkedin.url,
    label: "LinkedIn",
  },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    src: undefined,
    alt: siteConfig.title,
    title: siteConfig.title,
  },
  description = `${siteConfig.role} crafting fast, thoughtful and accessible web experiences with React, Next.js and Tailwind CSS.`,
  socialLinks = defaultSocialLinks,
  copyright = `© ${siteConfig.copyrightYear} ${siteConfig.name}. All rights reserved.`,
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <footer className="border-t bg-background">
      <section className="py-12 md:py-20">
        <div className="container mx-auto">
          <div className="hidden w-full flex-col justify-between gap-10 md:flex md:items-center md:flex-row md:text-left">
            <div className="flex flex-col justify-between gap-6 lg:items-start">
              {/* Logo */}
              <div className="flex items-center gap-2 lg:justify-start">
                <Link href={logo.url} aria-label={logo.title}>
                  {logo.src ? (
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      title={logo.title}
                      width={32}
                      height={32}
                      className="h-8 w-auto"
                    />
                  ) : (
                    <span className="text-xl font-bold tracking-tight text-foreground">
                      {logo.title}
                    </span>
                  )}
                </Link>
              </div>
              <p className="max-w-[70%] text-sm text-muted-foreground">
                {description}
              </p>
            </div>
            <ul className="flex items-center space-x-6 text-muted-foreground md:justify-end">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
            <p className="order-2 lg:order-1">{copyright}</p>
            <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
              {legalLinks.map((link, idx) => (
                <li key={idx} className="hover:text-primary">
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
};
