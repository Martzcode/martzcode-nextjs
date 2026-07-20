"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

export default function LocaleSwitcher({
  current,
}: {
  current: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(locale: Locale) {
    if (locale === current) return;
    const segments = pathname.split("/");
    // segments[0] is "" (leading slash), segments[1] is the current locale
    segments[1] = locale;
    router.push(segments.join("/") || `/${locale}`);
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-background/60 px-2 py-1 text-xs backdrop-blur">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchTo(locale)}
          aria-pressed={locale === current}
          className={
            locale === current
              ? "rounded-full bg-primary px-2 py-0.5 font-semibold text-primary-foreground"
              : "rounded-full px-2 py-0.5 text-muted-foreground transition-colors hover:text-foreground"
          }
        >
          {localeNames[locale]}
        </button>
      ))}
    </div>
  );
}
