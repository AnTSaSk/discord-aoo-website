import type { SidebarNavigation } from "@/lib/docs/types";
import type {
  BotConfig,
  ContentConfig,
  HeaderFeatures,
  LocaleConfig,
  NavItem,
  SiteConfig,
  SocialObjects,
  TableOfContentsConfig,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Bot configuration (documented Discord bot)
// ---------------------------------------------------------------------------
export const BOT: BotConfig = {
  repo: "https://github.com/AnTSaSk/discord-aoo-bot",
  clientId: "1401556946435440872",
  discordInvite: "https://discord.gg/qBSbrE8EAZ",
};

// ---------------------------------------------------------------------------
// System-wide configuration
// ---------------------------------------------------------------------------
export const LOCALE: LocaleConfig = {
  lang: "en",
};

export const CONTENT: ContentConfig = {
  systems: [
    {
      id: "docs",
      dir: "content/docs",
      defaultDocRedirect: "/docs/getting-started/installation",
      route: "/docs",
    },
  ],
};

export const SITE: SiteConfig = {
  website: "https://albion-online-objectives.com",
  author: "AnTSaSk",
  repo: "https://github.com/AnTSaSk/discord-aoo-website",
  name: "Albion Online Objectives",
  title: "AOO — Albion Online Objectives",
  description:
    "Your guild's shared Black Zone tracker — report objectives, coordinate timers, and never miss a spawn. Free open-source Discord bot for Albion Online.",
  image: "/og-image.png",
  imageAlt: "AOO — Albion Online Objectives",
};

// ---------------------------------------------------------------------------
// Header-specific configuration
// ---------------------------------------------------------------------------
export const HEADER_FEATURES: HeaderFeatures = {
  enableGitHubButton: true,
  starCountThreshold: 0,
  enableLayoutWidthToggle: true,
};

export const HEADER_NAV_ITEMS: NavItem[] = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/commands", label: "Commands" },
  { href: "/docs/faq", label: "FAQ" },
];

const SOCIAL_LINKS: SocialObjects[] = [
  {
    name: "discord",
    href: BOT.discordInvite,
    linkTitle: "Join our Discord server",
    active: true,
  },
  {
    name: "github",
    href: BOT.repo,
    linkTitle: "View on GitHub",
    active: true,
  },
];

export const HEADER_SOCIAL_LINKS = SOCIAL_LINKS;

// ---------------------------------------------------------------------------
// Footer-specific configuration
// ---------------------------------------------------------------------------
export const FOOTER_SOCIAL_LINKS = SOCIAL_LINKS;

// ---------------------------------------------------------------------------
// Sidebar navigation structure for docs content
// ---------------------------------------------------------------------------
export const SIDEBAR_NAVIGATION: SidebarNavigation = {
  docs: {
    defaultTab: {
      label: "Documentation",
      icon: "📖",
    },
    groups: [
      {
        id: "getting-started",
        label: "Getting Started",
        entries: [
          { slug: "getting-started/installation" },
          { slug: "getting-started/first-objective" },
        ],
      },
      {
        id: "commands",
        label: "Commands",
        entries: [
          { slug: "commands", label: "Overview" },
          { slug: "commands/add" },
          { slug: "commands/list" },
          { slug: "commands/remove" },
        ],
      },
      {
        id: "guides",
        label: "Guides",
        entries: [
          { slug: "guides/objective-types" },
          { slug: "guides/black-zone-maps" },
          { slug: "guides/cores-and-vortexes" },
          { slug: "guides/resource-nodes" },
          { slug: "guides/guild-workflow" },
          { slug: "guides/bot-responses" },
        ],
      },
      {
        id: "resources",
        label: "Resources",
        entries: [{ slug: "faq" }, { slug: "changelog" }, { slug: "about" }],
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Right-side table of contents configuration
// ---------------------------------------------------------------------------
export const TABLE_OF_CONTENTS: TableOfContentsConfig = {
  enableExtra: false,
};
