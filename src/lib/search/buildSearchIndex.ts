import { CONTENT } from "@data/config";
import type { CollectionEntry, CollectionKey } from "astro:content";
import { getCollection } from "astro:content";
import { render } from "astro:content";

import { defaultLang } from "@/i18n";

import type { SearchIndex, SearchItem } from "./types";

/**
 * Build the search index by extracting pages and headings from all content collections.
 * Entries are expected to have locale-prefixed IDs (e.g. "en/getting-started/installation").
 */
export async function buildSearchIndex(): Promise<SearchIndex> {
  const items: SearchItem[] = [];

  for (const sys of CONTENT.systems) {
    try {
      const collectionId = sys.id as CollectionKey;
      const entries = (await getCollection(collectionId)) as CollectionEntry<CollectionKey>[];

      for (const entry of entries) {
        // Extract locale and canonical slug from entry ID (e.g. "fr/commands/add" → "fr", "commands/add")
        const slashIdx = entry.id.indexOf("/");
        const locale = slashIdx > 0 ? entry.id.slice(0, slashIdx) : defaultLang;
        const canonicalSlug = slashIdx > 0 ? entry.id.slice(slashIdx + 1) : entry.id;
        const localePrefix = locale === defaultLang ? "" : `/${locale}`;

        items.push({
          type: "page",
          slug: canonicalSlug,
          title: entry.data.title,
          description: entry.data.description,
          collection: sys.id,
          url: `${localePrefix}${sys.route}/${canonicalSlug}`,
          locale,
        });

        try {
          const { headings } = await render(entry);
          const filteredHeadings = headings.filter((h) => h.depth >= 2 && h.depth <= 4);

          for (const heading of filteredHeadings) {
            items.push({
              type: "heading",
              slug: canonicalSlug,
              headingId: heading.slug,
              headingText: heading.text,
              pageTitle: entry.data.title,
              collection: sys.id,
              url: `${localePrefix}${sys.route}/${canonicalSlug}#${heading.slug}`,
              depth: heading.depth,
              locale,
            });
          }
        } catch (renderError) {
          console.warn(`Failed to extract headings from ${sys.id}/${entry.id}:`, renderError);
        }
      }
    } catch (error) {
      console.error(`Failed to build index for collection ${sys.id}:`, error);
    }
  }

  return {
    items,
    timestamp: Date.now(),
  };
}
