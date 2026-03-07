import { readFile } from "fs/promises";
import { join } from "path";

import { CONTENT } from "@data/config";
import type { APIRoute } from "astro";
import type { CollectionKey } from "astro:content";

import type { ContentSystem } from "@/lib/types";

export const getStaticPaths = async () => {
  const { getCollection } = await import("astro:content");
  const paths: {
    params: { collection: CollectionKey; slug: string };
    props: { entryId: string };
  }[] = [];

  // Generate static paths for all registered systems (EN entries only, strip locale prefix)
  for (const sys of CONTENT.systems) {
    const entries = await getCollection(sys.id as CollectionKey);
    const enEntries = entries.filter((e) => e.id.startsWith("en/"));
    for (const doc of enEntries) {
      paths.push({
        params: { collection: sys.id as CollectionKey, slug: doc.id.replace(/^en\//, "") },
        props: { entryId: doc.id },
      });
    }
  }

  return paths;
};

export const GET: APIRoute = async ({ params }) => {
  const collection = params?.collection;
  const slug = params?.slug;

  if (!collection || !slug) {
    return new Response("Not found", { status: 404 });
  }

  const sys = CONTENT.systems.find((s: ContentSystem) => s.id === collection);
  if (!sys) {
    return new Response("Collection not found", { status: 404 });
  }

  try {
    const contentDir = join(process.cwd(), sys.dir);
    let filePath = join(contentDir, `en/${slug}.mdx`);
    let content = "";

    try {
      content = await readFile(filePath, "utf-8");
    } catch {
      // Try .md extension
      try {
        filePath = join(contentDir, `en/${slug}.md`);
        content = await readFile(filePath, "utf-8");
      } catch {
        // Try index file inside directory (e.g. commands → commands/index.mdx)
        try {
          filePath = join(contentDir, `en/${slug}/index.mdx`);
          content = await readFile(filePath, "utf-8");
        } catch {
          filePath = join(contentDir, `en/${slug}/index.md`);
          content = await readFile(filePath, "utf-8");
        }
      }
    }

    return new Response(content, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": `inline; filename="${slug}.md"`,
      },
    });
  } catch (error) {
    console.error("Error reading file:", error);
    return new Response("File not found", { status: 404 });
  }
};
