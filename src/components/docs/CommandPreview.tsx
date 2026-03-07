import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLangFromUrl, useTranslations, type UIKey } from "@/i18n";

/** Discord emoji codes → Unicode emoji mapping */
const EMOJI_MAP: Record<string, string> = {
  ":green_circle:": "🟢",
  ":blue_circle:": "🔵",
  ":purple_circle:": "🟣",
  ":orange_circle:": "🟠",
  ":white_check_mark:": "✅",
  ":x:": "❌",
};

interface CommandPreviewProps {
  command: string;
  syntax: string;
  ephemeral?: boolean;
  example?: {
    input: string;
    output: string;
    listOutput?: string;
  };
  parameters?: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
}

function SyntaxHighlight({ text }: { text: string }) {
  // Parse slash command syntax: /command param:<value> param:<value>
  const parts = text.split(/(\S+:<[^>]+>|\S+:\S+)/g);

  return (
    <span>
      {parts.map((part, i) => {
        const paramMatch = part.match(/^(\S+):(<[^>]+>|\S+)$/);
        if (paramMatch) {
          return (
            <span key={i}>
              <span className="text-[#00b0f4]">{paramMatch[1]}</span>
              <span className="text-[#949ba4]">:</span>
              <span className="text-[#dbdee1]">{paramMatch[2]}</span>
            </span>
          );
        }
        if (part.startsWith("/")) {
          return (
            <span key={i} className="text-[#00b0f4]">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

function ExampleHighlight({ text }: { text: string }) {
  // Parse filled-in command: /command param:value param:value
  const parts = text.split(/(\S+:\S+)/g);

  return (
    <span>
      {parts.map((part, i) => {
        const paramMatch = part.match(/^(\S+):(.+)$/);
        if (paramMatch && !part.startsWith("/")) {
          return (
            <span key={i}>
              <span className="text-[#00b0f4]">{paramMatch[1]}</span>
              <span className="text-[#949ba4]">:</span>
              <span className="text-[#dbdee1]">{paramMatch[2]}</span>
            </span>
          );
        }
        if (part.startsWith("/")) {
          return (
            <span key={i} className="text-[#00b0f4]">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

/** Replace Discord emoji codes and format inline markdown (bold, timestamps) */
function formatInlineText(text: string, relativeTime: string): React.ReactNode[] {
  // Replace emoji codes with Unicode emojis
  let processed = text;
  for (const [code, emoji] of Object.entries(EMOJI_MAP)) {
    processed = processed.replaceAll(code, emoji);
  }

  // Replace <t:...:R> with a static placeholder
  processed = processed.replace(/<t:\d+:R>/g, relativeTime);

  // Split on bold markers **...**
  const parts = processed.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, i) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      return (
        <span key={i} className="font-bold">
          {boldMatch[1]}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/** Renders a single Discord markdown line */
function DiscordLine({ line, relativeTime }: { line: string; relativeTime: string }) {
  // ## Heading ## → category header
  const headingMatch = line.match(/^## (.+) ##$/);
  if (headingMatch) {
    return <p className="text-base font-bold leading-snug text-[#f2f3f5]">{headingMatch[1]}</p>;
  }

  // -# subtext → small muted text (tight to the bullet above)
  if (line.startsWith("-# ")) {
    return (
      <p className="ml-4 text-xs leading-tight text-[#949ba4]">
        {formatInlineText(line.slice(3), relativeTime)}
      </p>
    );
  }

  // - bullet item → list item
  if (line.startsWith("- ")) {
    return (
      <p className="ml-1 text-sm leading-snug text-[#dcddde]">
        <span className="mr-1">•</span>
        {formatInlineText(line.slice(2), relativeTime)}
      </p>
    );
  }

  // ---separator---
  if (line === "---") {
    return <hr className="my-1 border-[#3f4147]" />;
  }

  // Empty line → minimal spacer
  if (!line) {
    return <div className="h-0.5" />;
  }

  // Regular text
  return (
    <p className="text-sm leading-snug text-[#dcddde]">{formatInlineText(line, relativeTime)}</p>
  );
}

function EphemeralResponse({ text, t }: { text: string; t: (key: UIKey) => string }) {
  const lines = text.split("\n");
  const relativeTime = t("commandPreview.relativeTime");

  const processLine = (line: string) => line.replace(/<t:\d+:R>/g, relativeTime);

  return (
    <div className="border-l-2 border-l-[#5865f2] pl-3">
      <div className="flex items-start gap-3">
        <img
          src="/LogoAOO.svg"
          alt=""
          className="size-10 shrink-0 rounded-full"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-sm font-semibold text-[#f2f3f5]">AlbionOnlineObjectives</span>
            <span className="rounded bg-[#5865f2] px-1 py-0.5 text-[10px] font-semibold uppercase text-white">
              APP
            </span>
          </div>
          <div className="[&_p]:!mt-0">
            {lines.map((line, i) => (
              <p key={i} className="text-sm leading-snug text-[#dcddde]">
                {processLine(line) || "\u00A0"}
              </p>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-[#949ba4]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 5C5.648 5 1 12 1 12s4.648 7 11 7 11-7 11-7-4.648-7-11-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
            <span>{t("commandPreview.ephemeralNotice")}</span>
            <span className="mx-0.5">—</span>
            <span className="text-[#00a8fc]">{t("commandPreview.dismissMessage")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BotResponse({ text, relativeTime }: { text: string; relativeTime: string }) {
  const lines = text.split("\n");

  return (
    <div className="flex items-start gap-3">
      <img src="/LogoAOO.svg" alt="" className="size-10 shrink-0 rounded-full" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-[#f2f3f5]">AlbionOnlineObjectives</span>
          <span className="rounded bg-[#5865f2] px-1 py-0.5 text-[10px] font-semibold uppercase text-white">
            APP
          </span>
        </div>
        <div className="[&_p]:!mt-0">
          {lines.map((line, i) => (
            <DiscordLine key={i} line={line} relativeTime={relativeTime} />
          ))}
        </div>
      </div>
    </div>
  );
}

const tabTriggerClass =
  "rounded-none border-b-2 border-transparent px-3 pb-2 text-xs font-medium text-[#949ba4] data-[state=active]:border-b-[#5865f2] data-[state=active]:bg-transparent data-[state=active]:text-[#f2f3f5] data-[state=active]:shadow-none";

export default function CommandPreview({
  command: _command,
  syntax,
  ephemeral,
  example,
  parameters,
}: CommandPreviewProps) {
  const [activeTab, setActiveTab] = useState("syntax");
  const lang = typeof window !== "undefined" ? getLangFromUrl(new URL(window.location.href)) : "en";
  const t = useTranslations(lang);
  const relativeTime = t("commandPreview.relativeTime");

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-[#1e1f22] bg-[#2b2d31]">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b border-[#1e1f22] bg-[#232428] px-4 pt-2">
          <TabsList className="h-auto gap-0 rounded-none bg-transparent p-0">
            <TabsTrigger value="syntax" className={tabTriggerClass}>
              {t("commandPreview.tabs.syntax")}
            </TabsTrigger>
            {example && (
              <TabsTrigger value="example" className={tabTriggerClass}>
                {t("commandPreview.tabs.example")}
              </TabsTrigger>
            )}
            {example?.output && (
              <TabsTrigger value="response" className={tabTriggerClass}>
                {t("commandPreview.tabs.response")}
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <div className="p-4">
          <TabsContent value="syntax" className="mt-0">
            <div className="rounded bg-[#1e1f22] px-3 py-2 font-mono text-sm text-[#dbdee1]">
              <SyntaxHighlight text={syntax} />
            </div>
            {parameters && parameters.length > 0 && (
              <div className="mt-3 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#949ba4]">
                  {t("commandPreview.parameters.heading")}
                </p>
                <div className="space-y-1">
                  {parameters.map((param) => (
                    <div key={param.name} className="flex items-start gap-2 text-sm">
                      <code className="shrink-0 rounded bg-[#1e1f22] px-1.5 py-0.5 text-xs text-[#00b0f4]">
                        {param.name}
                      </code>
                      <span className="shrink-0 text-xs text-[#949ba4]">{param.type}</span>
                      {param.required && (
                        <span className="shrink-0 rounded bg-[#5865f2]/20 px-1 py-0.5 text-[10px] font-medium text-[#5865f2]">
                          {t("commandPreview.parameters.required")}
                        </span>
                      )}
                      <span className="text-xs text-[#dbdee1]">{param.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {example && (
            <TabsContent value="example" className="mt-0">
              <div className="rounded bg-[#1e1f22] px-3 py-2 font-mono text-sm text-[#dbdee1]">
                <ExampleHighlight text={example.input} />
              </div>
            </TabsContent>
          )}

          {example?.output && (
            <TabsContent value="response" className="mt-0 space-y-4">
              {ephemeral ? (
                <EphemeralResponse text={example.output} t={t} />
              ) : (
                <BotResponse text={example.output} relativeTime={relativeTime} />
              )}
              {example.listOutput && (
                <BotResponse text={example.listOutput} relativeTime={relativeTime} />
              )}
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
}
