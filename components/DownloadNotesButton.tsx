"use client";

import { useState } from "react";
import type { Module } from "@/lib/types";
import { moduleNotesMarkdown, downloadMarkdown } from "@/lib/notes";

interface DownloadNotesButtonProps {
  module: Module;
  /** Compact icon-only variant for inline placement (e.g. home module rows). */
  compact?: boolean;
}

export function DownloadNotesButton({ module, compact = false }: DownloadNotesButtonProps) {
  const [done, setDone] = useState(false);

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    downloadMarkdown(`python-mastery-${module.slug}-notes.md`, moduleNotesMarkdown(module));
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handle}
        className="shrink-0 px-2 py-1 rounded text-[11px] text-muted-foreground hover:text-accent hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Download notes for ${module.title} as Markdown`}
        title={`Download ${module.title} notes (.md)`}
      >
        {done ? <span className="text-success">✓ .md</span> : <span>⤓ notes</span>}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      className="mt-3 block w-full text-left px-2 py-1.5 rounded text-[11px] text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Download notes for ${module.title} as Markdown`}
    >
      {done ? (
        <span className="text-success">✓ notes.md downloaded</span>
      ) : (
        <span>⤓ download notes (.md)</span>
      )}
    </button>
  );
}
