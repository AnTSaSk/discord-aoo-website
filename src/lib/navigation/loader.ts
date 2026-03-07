import { getCollection } from "astro:content";
import type { CollectionKey } from "astro:content";

import { defaultLang, type Lang } from "@/i18n";

import type { DocEntry } from "./types";

/**
 * Get entries for a collection, filtered by locale and with locale prefix stripped.
 * Returns canonical slugs (e.g. "getting-started/installation" not "en/getting-started/installation").
 */
export async function getCollectionFromFilesystem(
  collectionId: string,
  locale: Lang = defaultLang,
): Promise<DocEntry[]> {
  const entries = await getCollection(collectionId as CollectionKey);
  const prefix = `${locale}/`;

  return entries
    .filter((doc) => doc.id.startsWith(prefix))
    .map((doc) => ({
      id: doc.id.slice(prefix.length),
      slug: doc.id.slice(prefix.length),
      data: {
        title: (doc.data as DocEntry["data"]).title,
        navLabel: (doc.data as DocEntry["data"]).navLabel,
        navIcon: (doc.data as DocEntry["data"]).navIcon,
        navHidden: (doc.data as DocEntry["data"]).navHidden,
        authors: (doc.data as DocEntry["data"]).authors,
      },
    }));
}
