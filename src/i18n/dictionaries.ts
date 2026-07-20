import "server-only";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

const dictionaries = {
  fr: () => import("@/dictionaries/fr.json"),
  en: () => import("@/dictionaries/en.json"),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["fr"]>>["default"];

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: { label: string; text: string }[];
  paragraphsAfter?: string[];
}

export function getLocale(value: string | undefined | null): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const mod = await dictionaries[locale]();
  return mod.default as Dictionary;
}
