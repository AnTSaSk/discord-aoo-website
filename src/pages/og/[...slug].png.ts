import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import type { CollectionKey } from "astro:content";

import { CONTENT, SIDEBAR_NAVIGATION } from "@data/config";
import { defaultLang } from "@/i18n";
import { renderOgImage } from "@/lib/og/render";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  for (const sys of CONTENT.systems) {
    const entries = await getCollection(sys.id as CollectionKey);

    for (const doc of entries) {
      // Extract locale and canonical slug from entry ID (e.g. "fr/commands/add")
      const slashIdx = doc.id.indexOf("/");
      const locale = slashIdx > 0 ? doc.id.slice(0, slashIdx) : defaultLang;
      const canonicalSlug = slashIdx > 0 ? doc.id.slice(slashIdx + 1) : doc.id;
      const localePrefix = locale === defaultLang ? "" : `${locale}/`;
      const section = findSectionLabel(sys.id, canonicalSlug);

      paths.push({
        params: { slug: `${localePrefix}${sys.id}/${canonicalSlug}` },
        props: {
          title: doc.data.title,
          description: doc.data.description,
          section,
        },
      });
    }
  }

  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description, section } = props as {
    title: string;
    description: string;
    section?: string;
  };

  const png = await renderOgImage({ title, description, section });

  return new Response(Uint8Array.from(png), {
    headers: { "Content-Type": "image/png" },
  });
};

function findSectionLabel(collectionId: string, slug: string): string | undefined {
  const nav = SIDEBAR_NAVIGATION[collectionId];
  if (!nav) return undefined;

  for (const group of nav.groups) {
    if (!("entries" in group) || !group.entries) continue;
    for (const entry of group.entries) {
      if (entry.slug === slug) return group.label;
    }
  }

  return undefined;
}
