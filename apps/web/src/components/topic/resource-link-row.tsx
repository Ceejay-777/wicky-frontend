import type { ResourceLink } from "@wicky/types";
import { ArticleIcon, ExternalIcon, VideoIcon, WikiIcon } from "./icons";

const TYPES = {
  wikipedia: { label: "WIKIPEDIA", icon: <WikiIcon /> },
  video: { label: "VIDEO", icon: <VideoIcon /> },
  article: { label: "ARTICLE", icon: <ArticleIcon /> },
} as const;

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

type Props = { link: ResourceLink; onOpen: () => void };

// Opens externally. The title clamps to 2 lines; the type tile never shrinks.
export function ResourceLinkRow({ link, onOpen }: Props) {
  const type = TYPES[link.type] ?? TYPES.article;
  const site = host(link.url);
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onOpen}
      onAuxClick={onOpen}
      className="flex min-h-16 items-center gap-3 rounded-[12px] border-[1.5px] border-ink bg-field px-3.5 py-2.5 text-ink no-underline"
    >
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-cobalt text-cobalt">{type.icon}</span>
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 text-[15px] leading-[1.3] font-semibold [hyphens:auto] [overflow-wrap:break-word]">{link.title}</span>
        <span className="mt-[3px] block truncate font-mono text-[10px] font-bold tracking-[0.08em] text-muted-ink">
          {type.label}
          {site && <> &middot; {site.toUpperCase()}</>}
        </span>
      </span>
      <span className="text-muted-ink">
        <ExternalIcon />
        <span className="sr-only">Opens in a new tab</span>
      </span>
    </a>
  );
}
