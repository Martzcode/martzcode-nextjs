import Image from "next/image";
import { Mail, MapPin, Code2, GraduationCap, Briefcase, Download, Languages } from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { siteConfig } from "@/config/site";
import Timeline_02, { type TimelineEntry } from "@/components/ui/timeline-02";

type ExperienceEntry = {
  date: string;
  title: string;
  content: string;
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "fr") as Locale;
  const dict = await getDictionary(locale);

  const experience: TimelineEntry[] = (
    dict.about.experienceItems as ExperienceEntry[]
  ).map((item) => ({
    date: item.date,
    title: item.title,
    content: item.content,
  }));

  const education: TimelineEntry[] = (
    dict.about.educationItems as ExperienceEntry[]
  ).map((item) => ({
    date: item.date,
    title: item.title,
    content: item.content,
  }));

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      {/* Profile header */}
      <header className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
          alt="Portrait of Marcello"
          width={112}
          height={112}
          className="h-28 w-28 rounded-full object-cover ring-2 ring-border shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {siteConfig.name}
          </h1>
          <p className="mt-1 text-lg font-medium text-cyan-500">
            {siteConfig.role}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground sm:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} /> {siteConfig.location}
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Mail size={15} /> {siteConfig.email}
            </a>
            <a
              href={siteConfig.github.url}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <i className="devicon-github-original" style={{ fontSize: 15 }} />
              {siteConfig.github.handle}
            </a>
            <a
              href={siteConfig.linkedin.url}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <i className="devicon-linkedin-plain" style={{ fontSize: 15 }} />
              {siteConfig.linkedin.handle}
            </a>
          </div>
          <div className="mt-6">
            <a
              href={`/api/cv?lang=${locale}`}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              <Download size={16} />
              {dict.about.downloadLabel}
            </a>
          </div>
        </div>
      </header>

      {/* Summary */}
      <section className="mt-12">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-foreground">
          <Code2 size={20} className="text-cyan-500" /> {dict.about.aboutLabel}
        </h2>
        <p className="max-w-2xl leading-8 text-muted-foreground">
          {dict.about.summary}
        </p>
      </section>

      {/* Languages */}
      <section className="mt-12">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-foreground">
          <Languages size={20} className="text-cyan-500" /> {dict.about.languagesLabel}
        </h2>
        <div className="flex flex-wrap gap-4">
          {dict.about.languages.map((lang: { name: string; level: string }) => (
            <span
              key={lang.name}
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-muted-foreground"
            >
              <span className="font-medium text-foreground">{lang.name}</span>
              <span className="text-xs opacity-60">—</span>
              {lang.level}
            </span>
          ))}
        </div>
      </section>

      {/* Experience timeline */}
      <section className="mt-16">
        <h2 className="mb-8 flex items-center gap-2 text-xl font-semibold text-foreground">
          <Briefcase size={20} className="text-cyan-500" /> {dict.about.experience}
        </h2>
        <Timeline_02 title="" items={experience} className="py-0" />
      </section>

      {/* Education timeline */}
      <section className="mt-16">
        <h2 className="mb-8 flex items-center gap-2 text-xl font-semibold text-foreground">
          <GraduationCap size={20} className="text-cyan-500" /> {dict.about.education}
        </h2>
        <Timeline_02 title="" items={education} className="py-0" />
      </section>
    </main>
  );
}
