"use client";

import { useEffect, useState, type ReactNode } from "react";

export type DockTool = "reference" | "tutor";

interface LessonToolDockProps {
  tools: DockTool[];
  open: DockTool | null;
  onOpen: (tool: DockTool | null) => void;
  children: ReactNode;
}

const LABELS: Record<DockTool, string> = {
  reference: "$ reference.py",
  tutor: "$ ./ai-tutor",
};

const PULSE_SEEN_KEY = "python-mastery-tools-seen";

export default function LessonToolDock({
  tools,
  open,
  onOpen,
  children,
}: LessonToolDockProps) {
  const [expanded, setExpanded] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(PULSE_SEEN_KEY) === "1") return;
    } catch {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time first-visit pulse cue
    setPulse(true);
    const t = setTimeout(() => {
      setPulse(false);
      try {
        localStorage.setItem(PULSE_SEEN_KEY, "1");
      } catch {
        // ignore
      }
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {children}

      {open === null && (
        <div
          data-tour-target="tutor"
          className={`fixed bottom-4 right-4 z-40 font-mono text-xs border bg-background/95 backdrop-blur rounded shadow-2xl overflow-hidden ${
            pulse
              ? "border-accent ring-2 ring-accent/60 animate-pulse motion-reduce:animate-none"
              : "border-border"
          }`}
          role="region"
          aria-label="lesson tools"
        >
          <button
            type="button"
            onClick={() => {
              setExpanded((e) => !e);
              setPulse(false);
              try {
                localStorage.setItem(PULSE_SEEN_KEY, "1");
              } catch {
                // ignore
              }
            }}
            className="w-full flex items-center justify-between gap-3 px-3 py-1.5 hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-expanded={expanded}
            aria-controls="lesson-tool-dock-list"
            aria-label={expanded ? "collapse tools" : "expand tools"}
          >
            <span className="text-accent">$</span>
            <span className="text-foreground">tools</span>
            <span className="text-muted-foreground" aria-hidden="true">
              {expanded ? "▾" : "▸"}
            </span>
          </button>

          {expanded && (
            <ul
              id="lesson-tool-dock-list"
              className="border-t border-border divide-y divide-border/60"
            >
              {tools.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    onClick={() => {
                      onOpen(t);
                      setExpanded(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {LABELS[t]}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
