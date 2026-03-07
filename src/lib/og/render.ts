import satori from "satori";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { OgImage, type OgImageProps } from "./template";

// ---------------------------------------------------------------------------
// Font & logo caching (loaded once per build)
// ---------------------------------------------------------------------------
let fontsPromise: Promise<SatoriFont[]> | null = null;
let logoPromise: Promise<string> | null = null;

type SatoriFont = {
  name: string;
  data: Buffer;
  weight: 400 | 700;
  style: "normal";
};

function loadFonts(): Promise<SatoriFont[]> {
  if (!fontsPromise) {
    const fontDir = join(process.cwd(), "src/assets/fonts/og");
    fontsPromise = Promise.all([
      readFile(join(fontDir, "inter-latin-400-normal.woff")),
      readFile(join(fontDir, "cormorant-garamond-latin-700-normal.woff")),
    ]).then(([inter, cormorant]) => [
      { name: "Inter", data: inter, weight: 400 as const, style: "normal" as const },
      {
        name: "Cormorant Garamond",
        data: cormorant,
        weight: 700 as const,
        style: "normal" as const,
      },
    ]);
  }
  return fontsPromise;
}

function loadLogo(): Promise<string> {
  if (!logoPromise) {
    const logoPath = join(process.cwd(), "public/LogoAOO.svg");
    logoPromise = readFile(logoPath)
      .then((svg) =>
        sharp(svg)
          .resize({ height: 360 }) // 2x for retina clarity at 180px display
          .png()
          .toBuffer(),
      )
      .then((png) => `data:image/png;base64,${png.toString("base64")}`);
  }
  return logoPromise;
}

// ---------------------------------------------------------------------------
// Public render function
// ---------------------------------------------------------------------------
export async function renderOgImage(props: Omit<OgImageProps, "logoBase64">): Promise<Buffer> {
  const [fonts, logoBase64] = await Promise.all([loadFonts(), loadLogo()]);

  const svg = await satori(OgImage({ ...props, logoBase64 }), {
    width: 1200,
    height: 630,
    fonts,
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
}
