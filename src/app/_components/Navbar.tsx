"use client";

import { Home, FolderKanban, Newspaper, User, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const items = [
  { name: "Home", url: "/", icon: Home },
  { name: "Projects", url: "/projects", icon: FolderKanban },
  { name: "Blog", url: "/blog", icon: Newspaper },
  { name: "About", url: "/about", icon: User },
  { name: "Contact", url: "/contact", icon: Mail },
];

export default function Navbar() {
  return <NavBar items={items} />;
}
