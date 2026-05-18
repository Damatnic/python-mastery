"use client";

import { useState } from "react";
import type { Module } from "@/lib/types";
import { moduleNotesMarkdown, downloadMarkdown } from "@/lib/notes";

interface DownloadNotesButtonProps {
  module: Module;
}

export function DownloadNotesButton({ module }: DownloadNotesButtonProps) {
  const [done, setDone] = useState(false);

  const handle = () => {
    downloadMarkdown(`python-mastery-${module.slug}-notes.md`, moduleNotesMarkdown(module));
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

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
