import { ui, defaultLang, languages, type Lang, type UIKey } from "./ui";

/**
 * Extract language from URL pathname.
 * /fr/docs/... → "fr", /docs/... → "en"
 */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split("/");
  if (maybeLang in languages) return maybeLang as Lang;
  return defaultLang;
}

/**
 * Returns a t() function bound to the given locale.
 * Falls back to defaultLang if a key is missing.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang]?.[key] ?? ui[defaultLang][key];
  };
}

/**
 * Returns a function that prefixes a path with the locale
 * (no prefix for defaultLang).
 */
export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string): string {
    if (lang === defaultLang) return path;
    return `/${lang}${path}`;
  };
}

/**
 * Strip locale prefix from a URL pathname to get the canonical route.
 * /fr/docs/faq → /docs/faq
 * /docs/faq → /docs/faq
 */
export function getRouteFromUrl(url: URL): string {
  const [, maybeLang, ...rest] = url.pathname.split("/");
  if (maybeLang in languages && maybeLang !== defaultLang) {
    return `/${rest.join("/")}`;
  }
  return url.pathname;
}

/**
 * Strip locale prefix from a content entry ID.
 * "en/getting-started/installation" → "getting-started/installation"
 * "fr/commands/add" → "commands/add"
 */
export function stripLangFromSlug(slug: string): string {
  const parts = slug.split("/");
  if (parts[0] in languages) {
    return parts.slice(1).join("/");
  }
  return slug;
}

/**
 * Extract locale from a content entry ID.
 * "en/getting-started/installation" → "en"
 * "fr/commands/add" → "fr"
 */
export function getLangFromSlug(slug: string): Lang {
  const first = slug.split("/")[0];
  if (first in languages) return first as Lang;
  return defaultLang;
}
