import type { TimelineEntry } from "@/data/timeline";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="space-y-10 border-l border-muted/20 pl-6">
      {entries.map((entry, index) => (
        <li key={index} className="relative">
          <span className="absolute -left-7.25 top-1 h-2.5 w-2.5 rounded-full bg-signal" />
          <time className="font-mono text-xs text-accent">{entry.period}</time>
          <h3 className="mt-1 font-display text-lg font-medium">{entry.title}</h3>
          <p className="text-sm text-muted">{entry.org}</p>
          <p className="mt-2 text-sm text-muted">{entry.description}</p>
        </li>
      ))}
    </ol>
  );
}