"use client";

import Fuse from "fuse.js";
import { FileTextIcon, HashIcon, FilterIcon } from "lucide-react";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Toggle } from "@/components/ui/toggle";
import { useTranslations, type Lang } from "@/i18n";
import { fuseOptions } from "@/lib/search/fuseConfig";
import type { SearchIndex, SearchItem } from "@/lib/search/types";

interface CommandPaletteProps {
  locale?: Lang;
}

export function CommandPalette({ locale = "en" }: CommandPaletteProps) {
  const t = useTranslations(locale);
  const [open, setOpen] = React.useState(false);
  const [searchIndex, setSearchIndex] = React.useState<SearchItem[]>([]);
  const [filteredResults, setFilteredResults] = React.useState<SearchItem[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const fuseRef = React.useRef<Fuse<SearchItem> | null>(null);

  // Filter states (inverted logic: OFF = show all, ON = filter)
  const [filterPages, setFilterPages] = React.useState(false);
  const [filterHeadings, setFilterHeadings] = React.useState(false);

  // Keyboard shortcut: Cmd/Ctrl + K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    // Custom event listener for opening search
    const handleOpenSearch = () => {
      setOpen(true);
    };

    document.addEventListener("keydown", down);
    window.addEventListener("open-search", handleOpenSearch);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, []);

  // Load search index when dialog opens, filtered to current locale
  React.useEffect(() => {
    if (open && searchIndex.length === 0) {
      fetch("/api/search-index.json")
        .then((res) => res.json())
        .then((data: SearchIndex) => {
          const localeItems = data.items.filter((item) => item.locale === locale);
          setSearchIndex(localeItems);
          fuseRef.current = new Fuse(localeItems, fuseOptions);
        })
        .catch((err) => {
          console.error("Failed to load search index:", err);
        });
    }
  }, [open, searchIndex.length, locale]);

  // Perform search and filtering when query or filters change
  React.useEffect(() => {
    if (!fuseRef.current) {
      setFilteredResults([]);
      return;
    }

    let results: SearchItem[];

    if (!searchQuery.trim()) {
      // Show all items when no search query
      results = searchIndex;
    } else {
      const searchResults = fuseRef.current.search(searchQuery);
      results = searchResults.map((result) => result.item);
    }

    // Apply type filters (inverted logic: no filter active = show all)
    const hasTypeFilter = filterPages || filterHeadings;
    const filtered = hasTypeFilter
      ? results.filter(
          (item) =>
            (filterPages && item.type === "page") || (filterHeadings && item.type === "heading"),
        )
      : results;

    setFilteredResults(filtered.slice(0, 20));
  }, [searchQuery, searchIndex, filterPages, filterHeadings]);

  // Handle item selection
  const handleSelect = (url: string) => {
    setOpen(false);
    window.location.assign(url);
  };

  // Group results by type
  const pageResults = filteredResults.filter((item) => item.type === "page");
  const headingResults = filteredResults.filter((item) => item.type === "heading");

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={t("search.dialog.title")}
      description={t("search.dialog.description")}
    >
      <CommandInput
        placeholder={t("search.input.placeholder")}
        value={searchQuery}
        onValueChange={setSearchQuery}
      />

      {/* Filter toggles */}
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <FilterIcon className="text-muted-foreground size-4" />
        <div className="flex flex-wrap items-center gap-1">
          <Toggle
            size="sm"
            pressed={filterPages}
            onPressedChange={setFilterPages}
            aria-label="Filter pages"
          >
            {t("search.filters.pages")}
          </Toggle>
          <Toggle
            size="sm"
            pressed={filterHeadings}
            onPressedChange={setFilterHeadings}
            aria-label="Filter headings"
          >
            {t("search.filters.headings")}
          </Toggle>
        </div>
      </div>

      <CommandList>
        <CommandEmpty>{t("search.noResults")}</CommandEmpty>

        {pageResults.length > 0 && (
          <CommandGroup heading={t("search.groups.pages")}>
            {pageResults.map((item) => {
              if (item.type !== "page") return null;
              return (
                <CommandItem
                  key={item.url}
                  value={`${item.title} ${item.description || ""}`}
                  onSelect={() => handleSelect(item.url)}
                >
                  <FileTextIcon />
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">{item.title}</div>
                    {item.description && (
                      <div className="text-muted-foreground line-clamp-1 text-xs">
                        {item.description}
                      </div>
                    )}
                  </div>
                  <span className="text-muted-foreground ml-auto text-xs">{item.collection}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {headingResults.length > 0 && (
          <CommandGroup heading={t("search.groups.headings")}>
            {headingResults.map((item) => {
              if (item.type !== "heading") return null;
              return (
                <CommandItem
                  key={item.url}
                  value={`${item.headingText} ${item.pageTitle}`}
                  onSelect={() => handleSelect(item.url)}
                >
                  <HashIcon />
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">{item.headingText}</div>
                    <div className="text-muted-foreground text-xs">{item.pageTitle}</div>
                  </div>
                  <span className="text-muted-foreground ml-auto text-xs">{item.collection}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
