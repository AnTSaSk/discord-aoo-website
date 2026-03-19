export const languages = { en: "English", fr: "Français" } as const;
export const defaultLang = "en" as const;
export type Lang = keyof typeof languages;

export const ui = {
  en: {
    // --- Header nav ---
    "nav.docs": "Docs",
    "nav.commands": "Commands",
    "nav.faq": "FAQ",

    // --- Sidebar ---
    "sidebar.documentation": "Documentation",
    "sidebar.getting-started": "Getting Started",
    "sidebar.commands": "Commands",
    "sidebar.guides": "Guides",
    "sidebar.resources": "Resources",
    "sidebar.overview": "Overview",

    // --- Docs navigation ---
    "docs.previous": "Previous",
    "docs.next": "Next",
    "docs.pageNavigation": "Page navigation",

    // --- Search ---
    "search.ariaLabel": "Search documentation",
    "search.placeholder": "Search...",
    "search.dialog.title": "Search Documentation",
    "search.dialog.description": "Search for pages and headings in the documentation",
    "search.input.placeholder": "Search documentation...",
    "search.filters.pages": "Pages",
    "search.filters.headings": "Headings",
    "search.noResults": "No results found.",
    "search.groups.pages": "Pages",
    "search.groups.headings": "Headings",

    // --- Table of contents ---
    "toc.ariaLabel": "Table of contents",
    "toc.heading": "On this page",

    // --- Callouts ---
    "callout.tip": "Tip",
    "callout.warning": "Warning",
    "callout.danger": "Danger",
    "callout.info": "Info",
    "callout.note": "Note",

    // --- Theme & layout toggles ---
    "themeToggle.ariaLabel": "Toggle theme",
    "themeToggle.srOnly": "Toggle theme",
    "layoutToggle.ariaLabel": "Toggle layout width",
    "layoutToggle.titleWide": "Wide",

    // --- Header ---
    "header.mobileMenu.ariaLabel": "Toggle navigation menu",

    // --- Footer ---
    "footer.builtWith": "Built with",
    "footer.love": "love",

    // --- 404 ---
    "notFound.title": "404 - Page not found",
    "notFound.description": "Sorry, we couldn't find the page you're looking for.",

    // --- Social links ---
    "social.discord.linkTitle": "Join our Discord server",
    "social.github.linkTitle": "View on GitHub",

    // --- Homepage: Hero ---
    "home.hero.title": "Albion Online Objectives",
    "home.hero.subtitle":
      "Your guild's shared Black Zone tracker — report objectives, coordinate timers, and never miss a spawn. Right from Discord.",
    "home.meta.description":
      "Your guild's shared Black Zone tracker — report objectives, coordinate timers, and never miss a spawn. Free open-source Discord bot for Albion Online.",
    "home.cta.addToDiscord": "Add to Discord",
    "home.cta.getStarted": "Get Started",

    // --- Homepage: Stats ---
    "home.stats.maps.label": "Black Zone Maps",
    "home.stats.maps.sublabel": "Full coverage",
    "home.stats.objectiveTypes.label": "Objective Types",
    "home.stats.objectiveTypes.sublabel": "Nodes, Cores, Vortexes",
    "home.stats.variants.label": "Variants",
    "home.stats.variants.sublabel": "All rarities tracked",
    "home.stats.commands.label": "Commands",
    "home.stats.commands.sublabel": "Add, List, Remove",

    // --- Homepage: Features ---
    "home.features.heading": "Why AOO?",
    "home.features.report.title": "Report in Seconds",
    "home.features.report.description":
      "One slash command and your whole guild knows — type, rarity, map, and countdown.",
    "home.features.report.cta": "Learn about /add",
    "home.features.tracking.title": "Live Tracking",
    "home.features.tracking.description":
      "All active objectives at a glance — grouped by type with live countdowns. Always up to date.",
    "home.features.tracking.cta": "Learn about /list",
    "home.features.coordinate.title": "Coordinate Your Guild",
    "home.features.coordinate.description":
      "Shared Black Zone objective board for your whole guild. Everyone knows where to go and when.",
    "home.features.coordinate.cta": "Guild workflow guide",

    // --- Homepage: Demo ---
    "home.demo.heading": "See It In Action",
    "home.demo.subtitle": "Report an objective with a single command — the bot handles the rest.",

    // --- Homepage: How It Works ---
    "home.howItWorks.heading": "How It Works",
    "home.howItWorks.step1.title": "Ready in Minutes",
    "home.howItWorks.step1.description":
      "Add AOO to your server and set up a dedicated channel. No complex configuration — just invite and go.",
    "home.howItWorks.step2.title": "Report an Objective",
    "home.howItWorks.step2.description":
      "Use <code>/add</code> with type, rarity, map and time. The bot handles the rest.",
    "home.howItWorks.step3.title": "Track & Manage",
    "home.howItWorks.step3.description":
      "View active objectives with <code>/list</code>. Remove completed ones with <code>/remove</code>.",

    // --- Homepage: Community ---
    "home.community.heading": "Open Source & Free",
    "home.community.description":
      "Albion Online Objectives is built in the open and free to use. No ads, no tracking, no premium lock.",
    "home.community.badges.openSource": "Open Source",
    "home.community.badges.license": "GPL-3.0",
    "home.community.badges.freeToUse": "Free to Use",
    "home.community.badges.noApi": "No API Dependency",
    "home.community.cta.github": "View on GitHub",
    "home.community.cta.discord": "Join Discord",

    // --- Homepage: Docs CTA ---
    "home.docsCta.heading": "Explore the Documentation",
    "home.docsCta.subtitle": "Everything you need to set up and use AOO.",
    "home.docsCta.browseCommands": "Browse Commands",
    "home.docsCta.exploreGuides": "Explore Guides",
    "home.docsCta.readFaq": "Read the FAQ",

    // --- Command Preview ---
    "commandPreview.relativeTime": "in 10 minutes",
    "commandPreview.ephemeralNotice": "Only you can see this",
    "commandPreview.dismissMessage": "Dismiss message",
    "commandPreview.tabs.syntax": "Syntax",
    "commandPreview.tabs.example": "Example",
    "commandPreview.tabs.response": "Response",
    "commandPreview.parameters.heading": "Parameters",
    "commandPreview.parameters.required": "Required",

    // --- Map Browser ---
    "mapBrowser.searchPlaceholder": "Search {count} maps...",
    "mapBrowser.showing": "Showing {filtered} of {total} maps",
    "mapBrowser.noResults": "No maps found",

    // --- Image Preview ---
    "imagePreview.closeHint.before": "Click anywhere or press",
    "imagePreview.closeHint.after": "to close",

    // --- Source Button ---
    "sourceButton.label": "View as Markdown",

    // --- Install CTA ---
    "install.cta.addToServer": "Add to Discord",

    // --- Language switcher ---
    "languageSwitcher.ariaLabel": "Select language",
  },
  fr: {
    // --- Header nav ---
    "nav.docs": "Docs",
    "nav.commands": "Commandes",
    "nav.faq": "FAQ",

    // --- Sidebar ---
    "sidebar.documentation": "Documentation",
    "sidebar.getting-started": "Pour Commencer",
    "sidebar.commands": "Commandes",
    "sidebar.guides": "Guides",
    "sidebar.resources": "Ressources",
    "sidebar.overview": "Vue d'ensemble",

    // --- Docs navigation ---
    "docs.previous": "Précédent",
    "docs.next": "Suivant",
    "docs.pageNavigation": "Navigation de page",

    // --- Search ---
    "search.ariaLabel": "Rechercher dans la documentation",
    "search.placeholder": "Rechercher...",
    "search.dialog.title": "Rechercher dans la documentation",
    "search.dialog.description": "Rechercher des pages et des titres dans la documentation",
    "search.input.placeholder": "Rechercher dans la documentation...",
    "search.filters.pages": "Pages",
    "search.filters.headings": "Titres",
    "search.noResults": "Aucun résultat trouvé.",
    "search.groups.pages": "Pages",
    "search.groups.headings": "Titres",

    // --- Table of contents ---
    "toc.ariaLabel": "Table des matières",
    "toc.heading": "Sur cette page",

    // --- Callouts ---
    "callout.tip": "Astuce",
    "callout.warning": "Attention",
    "callout.danger": "Danger",
    "callout.info": "Info",
    "callout.note": "Note",

    // --- Theme & layout toggles ---
    "themeToggle.ariaLabel": "Changer de thème",
    "themeToggle.srOnly": "Changer de thème",
    "layoutToggle.ariaLabel": "Changer la largeur de mise en page",
    "layoutToggle.titleWide": "Large",

    // --- Header ---
    "header.mobileMenu.ariaLabel": "Ouvrir le menu de navigation",

    // --- Footer ---
    "footer.builtWith": "Fait avec",
    "footer.love": "amour",

    // --- 404 ---
    "notFound.title": "404 - Page non trouvée",
    "notFound.description": "Désolé, nous n'avons pas trouvé la page que vous recherchez.",

    // --- Social links ---
    "social.discord.linkTitle": "Rejoindre notre serveur Discord",
    "social.github.linkTitle": "Voir sur GitHub",

    // --- Homepage: Hero ---
    "home.hero.title": "Albion Online Objectives",
    "home.hero.subtitle":
      "Le tracker de Black Zone de votre guilde — rapportez les objectifs, coordonnez les timers, et ne ratez jamais un spawn. Directement depuis Discord.",
    "home.meta.description":
      "Le tracker de Black Zone de votre guilde — rapportez les objectifs, coordonnez les timers, ne ratez jamais un spawn. Bot Discord open source pour Albion Online.",
    "home.cta.addToDiscord": "Ajouter à Discord",
    "home.cta.getStarted": "Commencer",

    // --- Homepage: Stats ---
    "home.stats.maps.label": "Cartes Black Zone",
    "home.stats.maps.sublabel": "Couverture complète",
    "home.stats.objectiveTypes.label": "Types d'objectifs",
    "home.stats.objectiveTypes.sublabel": "Nodes, Cores, Vortex",
    "home.stats.variants.label": "Variantes",
    "home.stats.variants.sublabel": "Toutes les raretés",
    "home.stats.commands.label": "Commandes",
    "home.stats.commands.sublabel": "Add, List, Remove",

    // --- Homepage: Features ---
    "home.features.heading": "Pourquoi AOO ?",
    "home.features.report.title": "Rapportez en secondes",
    "home.features.report.description":
      "Une commande slash et toute votre guilde est informée — type, rareté, carte et compte à rebours.",
    "home.features.report.cta": "En savoir plus sur /add",
    "home.features.tracking.title": "Suivi en temps réel",
    "home.features.tracking.description":
      "Tous les objectifs actifs en un coup d'œil — regroupés par type avec des comptes à rebours en direct.",
    "home.features.tracking.cta": "En savoir plus sur /list",
    "home.features.coordinate.title": "Coordonnez votre guilde",
    "home.features.coordinate.description":
      "Un tableau d'objectifs de Black Zone partagé pour toute votre guilde. Tout le monde sait où aller et quand.",
    "home.features.coordinate.cta": "Guide de guilde",

    // --- Homepage: Demo ---
    "home.demo.heading": "Voyez-le en action",
    "home.demo.subtitle":
      "Rapportez un objectif avec une seule commande — le bot s'occupe du reste.",

    // --- Homepage: How It Works ---
    "home.howItWorks.heading": "Comment ça marche",
    "home.howItWorks.step1.title": "Prêt en quelques minutes",
    "home.howItWorks.step1.description":
      "Ajoutez AOO à votre serveur et configurez un salon dédié. Pas de configuration complexe — invitez et c'est parti.",
    "home.howItWorks.step2.title": "Rapportez un objectif",
    "home.howItWorks.step2.description":
      "Utilisez <code>/add</code> avec le type, la rareté, la carte et le temps. Le bot s'occupe du reste.",
    "home.howItWorks.step3.title": "Suivez et gérez",
    "home.howItWorks.step3.description":
      "Consultez les objectifs actifs avec <code>/list</code>. Supprimez ceux terminés avec <code>/remove</code>.",

    // --- Homepage: Community ---
    "home.community.heading": "Open Source et gratuit",
    "home.community.description":
      "Albion Online Objectives est développé en open source et gratuit. Pas de pub, pas de tracking, pas de premium.",
    "home.community.badges.openSource": "Open Source",
    "home.community.badges.license": "GPL-3.0",
    "home.community.badges.freeToUse": "Gratuit",
    "home.community.badges.noApi": "Sans dépendance API",
    "home.community.cta.github": "Voir sur GitHub",
    "home.community.cta.discord": "Rejoindre Discord",

    // --- Homepage: Docs CTA ---
    "home.docsCta.heading": "Explorez la documentation",
    "home.docsCta.subtitle": "Tout ce dont vous avez besoin pour configurer et utiliser AOO.",
    "home.docsCta.browseCommands": "Parcourir les commandes",
    "home.docsCta.exploreGuides": "Explorer les guides",
    "home.docsCta.readFaq": "Lire la FAQ",

    // --- Command Preview ---
    "commandPreview.relativeTime": "dans 10 minutes",
    "commandPreview.ephemeralNotice": "Toi seul(e) peux voir ceci",
    "commandPreview.dismissMessage": "Rejeter le message",
    "commandPreview.tabs.syntax": "Syntaxe",
    "commandPreview.tabs.example": "Exemple",
    "commandPreview.tabs.response": "Réponse",
    "commandPreview.parameters.heading": "Paramètres",
    "commandPreview.parameters.required": "Requis",

    // --- Map Browser ---
    "mapBrowser.searchPlaceholder": "Rechercher {count} cartes...",
    "mapBrowser.showing": "Affichage de {filtered} sur {total} cartes",
    "mapBrowser.noResults": "Aucune carte trouvée",

    // --- Image Preview ---
    "imagePreview.closeHint.before": "Cliquez n'importe où ou appuyez sur",
    "imagePreview.closeHint.after": "pour fermer",

    // --- Source Button ---
    "sourceButton.label": "Voir en Markdown",

    // --- Install CTA ---
    "install.cta.addToServer": "Ajouter à Discord",

    // --- Language switcher ---
    "languageSwitcher.ariaLabel": "Choisir la langue",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
