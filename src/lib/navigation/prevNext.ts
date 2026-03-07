import type { ProcessedEntry, ProcessedGroup, Tab } from "./types";

interface PrevNextResult {
  prev?: { slug: string; label: string };
  next?: { slug: string; label: string };
}

/** Flatten all entries from the sidebar tab structure into an ordered list */
function flattenEntries(group: ProcessedGroup): ProcessedEntry[] {
  const entries: ProcessedEntry[] = [];

  if (group.children) {
    for (const child of group.children) {
      if ("slug" in child && !("groups" in child && "entries" in child)) {
        entries.push(child as ProcessedEntry);
      } else {
        entries.push(...flattenEntries(child as ProcessedGroup));
      }
    }
  } else {
    for (const entry of group.entries ?? []) {
      entries.push(entry);
    }
    for (const subgroup of group.groups ?? []) {
      entries.push(...flattenEntries(subgroup));
    }
  }

  return entries;
}

/** Get previous and next page links for a given slug */
export function getPrevNext(currentSlug: string, tabs: Tab[]): PrevNextResult {
  const allEntries: ProcessedEntry[] = [];

  for (const tab of tabs) {
    allEntries.push(...flattenEntries(tab.group));
  }

  const currentIndex = allEntries.findIndex((e) => e.slug === currentSlug);
  if (currentIndex === -1) return {};

  return {
    prev:
      currentIndex > 0
        ? { slug: allEntries[currentIndex - 1].slug, label: allEntries[currentIndex - 1].label }
        : undefined,
    next:
      currentIndex < allEntries.length - 1
        ? { slug: allEntries[currentIndex + 1].slug, label: allEntries[currentIndex + 1].label }
        : undefined,
  };
}
