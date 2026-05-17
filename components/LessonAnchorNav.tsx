"use client";

import { useEffect, useState } from "react";

export interface AnchorSection {
  id: string;
  label: string;
  badge?: string;
}

interface LessonAnchorNavProps {
  sections: AnchorSection[];
}

export function LessonAnchorNav({ sections }: LessonAnchorNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      data-tour-target="anchor-nav"
      aria-label="lesson sections"
      className="sticky top-12 z-30 -mx-6 px-6 py-2 bg-background/95 backdrop-blur border-b border-border/60 font-mono text-xs"
    >
      <ul className="flex items-center gap-4 overflow-x-auto">
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className={`inline-flex items-baseline gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded ${
                  active ? "text-accent" : "text-foreground/70 hover:text-foreground"
                }`}
                aria-current={active ? "true" : undefined}
              >
                <span aria-hidden="true">{active ? ">" : " "}</span>
                <span>{s.label}</span>
                {s.badge && (
                  <span className="text-[10px] text-foreground/60">[{s.badge}]</span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
