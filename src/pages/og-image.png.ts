import type { APIRoute } from "astro";

import { SITE } from "@data/config";
import { renderOgImage } from "@/lib/og/render";

export const GET: APIRoute = async () => {
  const png = await renderOgImage({
    title: SITE.name,
    description: SITE.description,
  });

  return new Response(Uint8Array.from(png), {
    headers: { "Content-Type": "image/png" },
  });
};
