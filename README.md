# AOO — Albion Online Objectives Documentation

Documentation website for the [AOO Discord bot](https://github.com/AnTSaSk/discord-aoo-bot), an open-source Discord bot for Albion Online guilds to report and track Black Zone objectives in real time.

**Live site:** https://albion-online-objectives.com

## Stack

- [Astro](https://astro.build/) — Static site generator
- [React](https://react.dev/) + [Radix UI](https://www.radix-ui.com/) — Interactive components
- [Tailwind CSS 4](https://tailwindcss.com/) — Styling
- [MDX](https://mdxjs.com/) — Enhanced markdown with component support
- [Fuse.js](https://www.fusejs.io/) — Client-side full-text search

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [pnpm](https://pnpm.io/) 10+

### Development

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server (http://localhost:4321)
pnpm check      # TypeScript type checking
pnpm build      # Production build to dist/
pnpm preview    # Preview production build locally
```

## Project Structure

```
content/docs/       MDX documentation pages (en + fr)
data/config.ts      Site configuration (nav, sidebar, metadata)
src/
  components/       Astro + React components
  layouts/          Page layouts (Base, Docs)
  lib/              Utilities (navigation, search, OG images)
  pages/            Astro page routes
  styles/           Global CSS + Tailwind theme
public/             Static assets (logo, favicon, images)
```

## Deployment

Multi-stage Docker build: Node 24 builds the static site, nginx serves it. CI/CD via GitHub Actions deploys to Docker Swarm with automatic rollback on failure.

## License

This project is licensed under the [GPL-3.0 License](LICENSE).
