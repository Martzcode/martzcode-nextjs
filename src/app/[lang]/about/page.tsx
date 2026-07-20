import {
  Mail,
  MapPin,
  Code2,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import Timeline_02, { type TimelineEntry } from "@/components/ui/timeline-02";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80"
          alt="Portrait of Martin"
          className="h-28 w-28 rounded-full object-cover ring-2 ring-border shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Martin Leroux
          </h1>
          <p className="mt-1 text-lg font-medium text-cyan-500">
            Creative Full-Stack Engineer
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground sm:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} /> Montréal, Canada
            </span>
            <a
              href="mailto:hello@martzcode.dev"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Mail size={15} /> hello@martzcode.dev
            </a>
            <a
              href="https://github.com"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <GithubIcon /> github.com/martzcode
            </a>
            <a
              href="https://linkedin.com"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <LinkedinIcon /> in/martzcode
            </a>
          </div>
        </div>
      </header>

      {/* Summary */}
      <section className="mt-12">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-foreground">
          <Code2 size={20} className="text-cyan-500" /> About
        </h2>
        <p className="max-w-2xl leading-8 text-muted-foreground">
          {dict.about.summary}
        </p>
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
