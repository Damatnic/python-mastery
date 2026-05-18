"use client";

import Link from "next/link";
import HomeTerminal from "@/components/HomeTerminal";
import { getAllModules } from "@/lib/lessons";

const modules = getAllModules().map((m, i) => ({
  num: String(i + 1).padStart(2, "0"),
  slug: m.slug,
  firstLesson: m.lessons[0]?.slug ?? "",
  title: m.slug,
  desc: m.description,
  lessons: m.lessons.length,
}));

const moduleCount = modules.length;
const lessonCount = modules.reduce((sum, m) => sum + m.lessons, 0);

export default function Home() {
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
          <p className="text-xs uppercase tracking-widest text-muted-foreground"># lessons</p>
          <Link
            href="/learn"
            className="mt-3 group flex items-center justify-between gap-3 py-3 px-3 -mx-3 rounded border border-border/60 hover:bg-card/60 hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="min-w-0 truncate">
              <span className="text-foreground">cd ~/lessons</span>
              <span className="ml-3 text-muted-foreground text-xs">
                {lessonCount} lessons · {moduleCount} modules · progress, review queue &amp; per-module notes
              </span>
            </span>
            <span className="text-muted-foreground group-hover:text-accent transition-colors">→</span>
          </Link>
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
          </span>
        </div>
      </footer>
    </div>
  );
}
