"use client";

import { Home, FolderKanban, Newspaper, User, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import type { Locale } from "@/i18n/config";

const icons = {
  home: Home,
  projects: FolderKanban,
  blog: Newspaper,
  about: User,
  contact: Mail,
} as const;

export default function Navbar({
  locale,
  labels,
}: {
  locale: Locale;
  labels: {
    home: string;
    projects: string;
    blog: string;
    about: string;
    contact: string;
  };
}) {
  const base = `/${locale}`;
  const items = [
    { name: labels.home, url: base, icon: icons.home },
    { name: labels.projects, url: `${base}/projects`, icon: icons.projects },
    { name: labels.blog, url: `${base}/blog`, icon: icons.blog },
    { name: labels.about, url: `${base}/about`, icon: icons.about },
    { name: labels.contact, url: `${base}/contact`, icon: icons.contact },
  ];

  return <NavBar items={items} />;
}
