import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Theme colors — must match dark mode values in src/styles/global.css (.dark {})
// ---------------------------------------------------------------------------
const colors = {
  background: "hsl(28, 10%, 8%)",
  foreground: "hsl(36, 18%, 92%)",
  primary: "hsl(38, 87%, 54%)",
  border: "hsl(28, 10%, 22%)",
  muted: "hsl(30, 8%, 68%)",
  secondary: "hsl(28, 10%, 16%)",
} as const;

// ---------------------------------------------------------------------------
// Shared wrapper
// ---------------------------------------------------------------------------
function OgWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        width: 1200,
        height: 630,
        backgroundColor: colors.background,
        padding: 60,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Logo column (left side)
// ---------------------------------------------------------------------------
function LogoColumn({ logoBase64 }: { logoBase64: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 280,
        flexShrink: 0,
        paddingRight: 48,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoBase64} width={180} height={180} alt="" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Footer bar
// ---------------------------------------------------------------------------
function FooterBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: `1px solid ${colors.border}`,
        paddingTop: 20,
        width: "100%",
      }}
    >
      <span
        style={{
          fontFamily: "Inter",
          fontSize: 16,
          color: colors.muted,
        }}
      >
        albion-online-objectives.com
      </span>
      <span
        style={{
          fontFamily: "Inter",
          fontSize: 16,
          color: colors.muted,
        }}
      >
        AOO
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------
export interface OgImageProps {
  logoBase64: string;
  title: string;
  description?: string;
  section?: string;
}

// ---------------------------------------------------------------------------
// OG Image template
// ---------------------------------------------------------------------------
export function OgImage({ logoBase64, title, description, section }: OgImageProps) {
  return (
    <OgWrapper>
      {/* Logo */}
      <LogoColumn logoBase64={logoBase64} />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Main content area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          {section && (
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 18,
                color: colors.primary,
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 12,
              }}
            >
              {section}
            </span>
          )}

          <span
            style={{
              fontFamily: "Cormorant Garamond",
              fontWeight: 700,
              fontSize: title.length > 40 ? 40 : 48,
              color: colors.foreground,
              lineHeight: 1.2,
            }}
          >
            {title}
          </span>

          {description && (
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 20,
                color: colors.muted,
                marginTop: 16,
                lineHeight: 1.4,
              }}
            >
              {description.length > 120 ? `${description.slice(0, 117)}...` : description}
            </span>
          )}
        </div>

        {/* Footer */}
        <FooterBar />
      </div>
    </OgWrapper>
  );
}
