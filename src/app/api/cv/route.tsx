import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CVDocument } from "./cv-document";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

const CACHE_TTL = 3600_000;
const pdfCache = new Map<string, { buffer: Buffer; timestamp: number }>();

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") || "fr";
  const locale = isLocale(lang) ? lang : "fr";

  const cached = pdfCache.get(locale);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return pdfResponse(cached.buffer);
  }

  const dict = await getDictionary(locale);

  const pdf = await renderToBuffer(
    <CVDocument
      name={siteConfig.name}
      role={siteConfig.role}
      location={siteConfig.location}
      email={siteConfig.email}
      phone={siteConfig.phone}
      github={siteConfig.github.handle}
      linkedin={siteConfig.linkedin.handle}
      summary={dict.about.summary}
      aboutLabel={dict.about.aboutLabel}
      experience={dict.about.experienceItems as { date: string; title: string; content: string }[]}
      education={dict.about.educationItems as { date: string; title: string; content: string }[]}
      experienceLabel={dict.about.experience}
      educationLabel={dict.about.education}
    />
  );

  pdfCache.set(locale, { buffer: pdf, timestamp: Date.now() });

  return pdfResponse(pdf);
}

function pdfResponse(buffer: Buffer) {
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="cv-${siteConfig.name.toLowerCase().replace(/\s+/g, "-")}.pdf"`,
      "Cache-Control": `public, max-age=${CACHE_TTL / 1000}, stale-while-revalidate=${(CACHE_TTL / 1000) * 2}`,
    },
  });
}
