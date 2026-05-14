"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllModules } from "@/lib/lessons";
import { getAllProjects } from "@/lib/projects";
import { getRank, getRankLadder, getStreakData, type StreakData } from "@/lib/streak";
import { safeJsonParse, safeReadNumber, getReviewedMap } from "@/lib/storage";

function bar(pct: number, width = 12): string {
  const filled = Math.round((pct / 100) * width);
  return "█".repeat(filled) + "░".repeat(Math.max(0, width - filled));
}

function daysAgo(iso: string | null): string {
  if (!iso) return "never";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const last = new Date(iso);
  last.setHours(0, 0, 0, 0);
  const diff = Math.round((today.getTime() - last.getTime()) / 86_400_000);
  if (diff <= 0) return "today";
  if (diff === 1) return "yesterday";
  return `${diff} days ago`;
}

export default function StatsPage() {
  const [mounted, setMounted] = useState(false);
  const [xp, setXp] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [completedProjectSteps, setCompletedProjectSteps] = useState<Set<string>>(new Set());
  const [completedProjectChallenges, setCompletedProjectChallenges] = useState<Set<string>>(new Set());
  const [streakInfo, setStreakInfo] = useState<StreakData>({
    currentStreak: 0,
    lastActiveDate: null,
    maxStreak: 0,
  });
  const [reviewedAt, setReviewedAt] = useState<Record<string, string>>({});

  useEffect(() => {
    setXp(safeReadNumber(localStorage.getItem("python-mastery-xp"), 0));
    setCompletedLessons(
      new Set(safeJsonParse<string[]>(localStorage.getItem("python-mastery-completed"), [])),
    );
    setCompletedProjectSteps(
      new Set(safeJsonParse<string[]>(localStorage.getItem("python-mastery-project-progress"), [])),
    );
    setCompletedProjectChallenges(
      new Set(safeJsonParse<string[]>(localStorage.getItem("python-mastery-project-completed"), [])),
    );

    setStreakInfo(getStreakData());
    setReviewedAt(getReviewedMap());
    setMounted(true);
  }, []);

  const modules = getAllModules();
  const projects = getAllProjects();

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const totalProjectSteps = projects.reduce((s, p) => s + p.steps.length, 0);

  // Filter out stale slugs from localStorage that no longer match current lesson data
  const validLessonKeys = new Set(modules.flatMap((m) => m.lessons.map((l) => `${m.slug}/${l.slug}`)));
  const validProjectStepIds = new Set(projects.flatMap((p) => p.steps.map((s) => s.id)));
  const liveCompletedLessons = new Set([...completedLessons].filter((k) => validLessonKeys.has(k)));
  const liveCompletedProjectSteps = new Set([...completedProjectSteps].filter((s) => validProjectStepIds.has(s)));

  const rank = getRank(xp);
  const ladder = getRankLadder();
  const nextRank = ladder.find((r) => r.threshold > xp);
  const xpToNext = nextRank ? nextRank.threshold - xp : 0;
  const rankProgress = nextRank
    ? Math.min(
        100,
        Math.round(
          ((xp - rank.threshold) / (nextRank.threshold - rank.threshold)) * 100,
        ),
      )
    : 100;

  const moduleRows = modules.map((m) => {
    const done = m.lessons.filter((l) =>
      completedLessons.has(`${m.slug}/${l.slug}`),
    ).length;
    const total = m.lessons.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { slug: m.slug, done, total, pct };
  });

  const projectRows = projects.map((p) => {
    const done = p.steps.filter((s) => completedProjectSteps.has(s.id)).length;
    const total = p.steps.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { slug: p.slug, title: p.title, done, total, pct };
  });

  // Review queue: completed lessons sorted by oldest review timestamp.
  const lessonTitleByKey = new Map<string, string>();
  for (const m of modules) {
    for (const l of m.lessons) {
      lessonTitleByKey.set(`${m.slug}/${l.slug}`, l.title);
    }
  }
  const reviewQueue = [...liveCompletedLessons]
    .map((k) => {
      const [moduleSlug, lessonSlug] = k.split("/");
      return {
        key: k,
        moduleSlug,
        lessonSlug,
        title: lessonTitleByKey.get(k) ?? k,
        ts: reviewedAt[k] ?? "",
      };
    })
    .sort((a, b) => a.ts.localeCompare(b.ts))
    .slice(0, 5);

  const weakModules = moduleRows.filter((m) => m.pct < 50 && m.total > 0).slice(0, 5);

  const daysSinceReview = (iso: string): string => {
    if (!iso) return "never";
    const days = Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000);
    if (days <= 0) return "today";
    if (days === 1) return "1d ago";
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between text-xs font-mono">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            <span className="text-accent">$</span> cd ~
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
              lessons
            </Link>
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              projects
            </Link>
            <span className="text-foreground">&gt; stats</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 font-mono">
        <section className="text-sm">
          <p>
            <span className="text-accent">damato@python</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-muted-foreground">~$</span>{" "}
            <span>stats --all</span>
            <span className="ml-1 inline-block w-2 h-4 align-text-bottom bg-foreground terminal-cursor" aria-hidden="true" />
          </p>
        </section>

        {!mounted ? (
          <p className="mt-8 text-xs text-muted-foreground">loading state from localstorage…</p>
        ) : (
          <>
            <section className="mt-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground"># profile</p>
              <div className="mt-3 grid sm:grid-cols-2 gap-x-10 gap-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">rank</span>
                  {"  "}
                  <span className="text-accent">[{rank.name}]</span>
                </p>
                <p>
                  <span className="text-muted-foreground">xp</span>
                  {"    "}
                  <span className="text-foreground">{xp.toLocaleString()}</span>
                  {nextRank && (
                    <span className="text-muted-foreground">
                      {" · "}
                      {xpToNext} to <span className="text-accent">{nextRank.name}</span>
                    </span>
                  )}
                </p>
                <p>
                  <span className="text-muted-foreground">streak</span>
                  {" "}
                  <span className="text-amber-400">{streakInfo.currentStreak}d</span>
                  <span className="text-muted-foreground"> · max </span>
                  <span className="text-foreground">{streakInfo.maxStreak}d</span>
                </p>
                <p>
                  <span className="text-muted-foreground">last seen</span>
                  {" "}
                  <span className="text-foreground">{daysAgo(streakInfo.lastActiveDate)}</span>
                </p>
              </div>

              {nextRank && (
                <div className="mt-4 max-w-md">
                  <p className="text-[11px] text-muted-foreground mb-1">
                    progress to {nextRank.name}: {rankProgress}%
                  </p>
                  <div className="h-1 bg-card rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-300"
                      style={{ width: `${rankProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </section>

            <section className="mt-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground"># totals</p>
              <div className="mt-2 text-sm space-y-1">
                <p>
                  lessons{"    "}
                  <span className="text-foreground">{liveCompletedLessons.size}</span>
                  <span className="text-muted-foreground"> / {totalLessons}</span>
                </p>
                <p>
                  project steps{"  "}
                  <span className="text-foreground">{liveCompletedProjectSteps.size}</span>
                  <span className="text-muted-foreground"> / {totalProjectSteps}</span>
                </p>
                <p>
                  lesson projects{"  "}
                  <span className="text-foreground">{completedProjectChallenges.size}</span>
                </p>
              </div>
            </section>

            <section className="mt-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground"># lessons by module</p>
              <ul className="mt-3 text-xs space-y-1">
                {moduleRows.map((m) => (
                  <li key={m.slug} className="grid grid-cols-[1fr_auto_auto] gap-4 items-baseline">
                    <span className="text-foreground truncate">{m.slug}</span>
                    <span className={`tabular-nums ${m.pct === 100 ? "text-emerald-400" : "text-accent"}`}>
                      {bar(m.pct)}
                    </span>
                    <span className="text-muted-foreground tabular-nums">
                      {m.done}/{m.total}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground"># projects</p>
              <ul className="mt-3 text-xs space-y-1">
                {projectRows.map((p) => (
                  <li key={p.slug} className="grid grid-cols-[1fr_auto_auto] gap-4 items-baseline">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="text-foreground hover:text-accent truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                    >
                      {p.slug}
                    </Link>
                    <span className={`tabular-nums ${p.pct === 100 ? "text-emerald-400" : "text-accent"}`}>
                      {bar(p.pct)}
                    </span>
                    <span className="text-muted-foreground tabular-nums">
                      {p.done}/{p.total}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground"># review queue</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                completed lessons you haven&apos;t opened in a while. the top one is the most forgotten.
              </p>
              {reviewQueue.length === 0 ? (
                <p className="mt-3 text-xs text-muted-foreground">no completed lessons yet</p>
              ) : (
                <ul className="mt-3 text-xs space-y-1">
                  {reviewQueue.map((r) => (
                    <li key={r.key} className="grid grid-cols-[1fr_auto_auto] gap-4 items-baseline">
                      <Link
                        href={`/learn/${r.moduleSlug}/${r.lessonSlug}`}
                        className="text-foreground hover:text-accent truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                      >
                        {r.moduleSlug}/{r.lessonSlug}
                      </Link>
                      <span className="text-muted-foreground truncate hidden md:inline">{r.title}</span>
                      <span className="text-muted-foreground tabular-nums">{daysSinceReview(r.ts)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-[11px] text-muted-foreground/70">
                tip: from the home shell, type <span className="text-foreground/80">review</span> to open a random one.
              </p>
            </section>

            {weakModules.length > 0 && (
              <section className="mt-10">
                <p className="text-xs uppercase tracking-widest text-muted-foreground"># weak modules</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  under 50% complete. worth a pass.
                </p>
                <ul className="mt-3 text-xs space-y-1">
                  {weakModules.map((m) => (
                    <li key={m.slug} className="grid grid-cols-[1fr_auto] gap-4 items-baseline">
                      <span className="text-foreground truncate">{m.slug}</span>
                      <span className="text-error tabular-nums">{m.pct}%</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground"># rank ladder</p>
              <ul className="mt-3 text-xs space-y-2">
                {ladder.map((r) => {
                  const reached = xp >= r.threshold;
                  return (
                    <li key={r.name} className="grid grid-cols-[1.25rem_1fr_auto] gap-3 items-baseline">
                      <span className={reached ? "text-emerald-400" : "text-muted-foreground"}>
                        {reached ? "✓" : "·"}
                      </span>
                      <span className={reached ? "text-foreground" : "text-muted-foreground"}>
                        <span>{r.name}</span>
                        <span className="ml-2 text-muted-foreground">{r.blurb}</span>
                      </span>
                      <span className="text-muted-foreground tabular-nums">
                        {r.threshold} xp
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </>
        )}
      </main>

      <footer className="border-t border-border py-5 text-xs">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-muted-foreground font-mono">
          <span>
            <span className="text-emerald-400">exit 0</span> · personal use · all state lives in your browser
          </span>
          <Link
            href="/"
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            ~ home
          </Link>
        </div>
      </footer>
    </div>
  );
}
