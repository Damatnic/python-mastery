"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HomeTerminal from "@/components/HomeTerminal";
import { getAllModules } from "@/lib/lessons";
import { getCompletedLessons } from "@/lib/progress";

const modules = getAllModules().map((m, i) => ({
  num: String(i + 1).padStart(2, "0"),
  slug: m.slug,
  firstLesson: m.lessons[0]?.slug ?? "",
  title: m.slug,
  desc: m.description,
  lessons: m.lessons.length,
}));

export default function Home() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [lastTouched, setLastTouched] = useState<string | null>(null);

  useEffect(() => {
    setCompleted(getCompletedLessons());
    try {
      const ts = localStorage.getItem("python-mastery-last-active");
      if (ts) {
        const d = new Date(parseInt(ts, 10));
        if (!Number.isNaN(d.getTime())) {
          setLastTouched(d.toISOString().slice(0, 10));
        }
      }
    } catch {}
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-mono text-sm">
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 sm:py-16">
        <section className="flex flex-wrap items-baseline justify-between gap-3">
          <div className="flex-1 min-w-0">
            <HomeTerminal modules={modules} />
          </div>
          <p className="text-xs text-muted-foreground">
            {'// type '}
            <span className="text-foreground/80">help</span>
            {' · ↑↓ history · tab completes'}
          </p>
        </section>

        <section className="mt-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground"># modules</p>
          <ul className="mt-3 border-y border-border/60 divide-y divide-border/40">
            {modules.map((m) => {
              const doneCount = (() => {
                try {
                  return Array.from(completed).filter((k) => k.startsWith(`${m.slug}/`)).length;
                } catch { return 0; }
              })();
              const status = doneCount === 0
                ? "─"
                : doneCount === m.lessons
                ? "✓ complete"
                : `${doneCount}/${m.lessons}`;
              const statusClass = doneCount === m.lessons
                ? "text-success"
                : doneCount > 0
                ? "text-accent"
                : "text-muted-foreground";
              return (
                <li key={m.slug}>
                  <Link
                    href={`/learn/${m.slug}/${m.firstLesson}`}
                    className="group grid grid-cols-[2.5rem_minmax(0,1fr)_5rem_7rem_1rem] gap-3 items-center py-2 px-2 -mx-2 rounded hover:bg-card/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label={`Open module ${m.title}`}
                  >
                    <span className="text-muted-foreground">{m.num}</span>
                    <span className="min-w-0 truncate">
                      <span className="text-foreground">modules/{m.title}/</span>
                      <span className="text-muted-foreground hidden md:inline">  {m.desc}</span>
                    </span>
                    <span className="text-muted-foreground text-xs">{m.lessons} lessons</span>
                    <span className={`text-xs ${statusClass}`}>{status}</span>
                    <span className="text-muted-foreground group-hover:text-accent transition-colors">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-10 grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground"># projects</p>
            <Link
              href="/projects"
              className="mt-3 block py-2 px-2 -mx-2 rounded hover:bg-card/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="text-foreground">projects/</span>
              <span className="ml-3 text-muted-foreground">→</span>
            </Link>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground"># stats</p>
            <Link
              href="/stats"
              className="mt-3 block py-2 px-2 -mx-2 rounded hover:bg-card/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="text-foreground">stats/</span>
              <span className="ml-3 text-muted-foreground">→</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-5 font-mono text-xs">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-muted-foreground">
          <span>
            <span className="text-success">exit 0</span> · personal use · next.js + pyodide
          </span>
          <span className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/projects" className="hover:text-foreground transition-colors">projects/</Link>
            <a
              href="https://python-practice-omega.vercel.app"
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              practice/
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
