"use client";

export function DeviconStyles() {
  return (
    <link
      rel="stylesheet"
      href="/devicon.min.css"
      media="print"
      onLoad={(e) => { (e.target as HTMLLinkElement).media = "all" }}
    />
  );
}