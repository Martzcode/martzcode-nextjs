import React from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

interface Footer7Props {
  logo?: {
    url: string;
    src?: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
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

const defaultSections = [
  {
    title: "Explore",
    links: [
      { name: "Home", href: "/" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Projects", href: "/projects" },
      { name: "Uses", href: "#" },
      { name: "Now", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const defaultSocialLinks = [
  {
    icon: <FaGithub className="size-5" />,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin className="size-5" />,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: <FaTwitter className="size-5" />,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: <FaInstagram className="size-5" />,
    href: "https://instagram.com",
    label: "Instagram",
  },
];

export const Footer7 = ({
  logo = {
    url: "/",
    src: undefined,
    alt: "Martzcode",
    title: "Martzcode",
  },
  sections = defaultSections,
  description = "Creative full-stack engineer crafting fast, thoughtful and accessible web experiences with React, Next.js and Tailwind CSS.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 Martin Leroux. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <footer className="border-t bg-background">
      <section className="py-12 md:py-20">
        <div className="container mx-auto">
          <div className="hidden w-full flex-col justify-between gap-10 md:flex md:flex-row md:items-start md:text-left">
            <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
              {/* Logo */}
              <div className="flex items-center gap-2 lg:justify-start">
                <Link href={logo.url} aria-label={logo.title}>
                  {logo.src ? (
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      title={logo.title}
                      className="h-8"
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
              <ul className="flex items-center space-x-6 text-muted-foreground">
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
            <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-4 font-bold text-foreground">
                    {section.title}
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="font-medium hover:text-primary"
                      >
                        {link.href.startsWith("/") ? (
                          <Link href={link.href}>{link.name}</Link>
                        ) : (
                          <a href={link.href}>{link.name}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
