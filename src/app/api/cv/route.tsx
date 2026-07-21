import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CVDocument } from "./cv-document";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") || "fr";
  const locale = isLocale(lang) ? lang : "fr";

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

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="cv-${siteConfig.name.toLowerCase().replace(/\s+/g, "-")}.pdf"`,
    },
  });
}
