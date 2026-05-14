"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ModuleCard } from "@/components/ModuleCard";
import { getAllModules } from "@/lib/lessons";
import { getStreakData } from "@/lib/streak";

export default function LearnDashboard() {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const modules = getAllModules();

  useEffect(() => {
    const saved = localStorage.getItem("python-mastery-completed");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage
      setCompletedLessons(new Set(JSON.parse(saved)));
    }
    const savedXP = localStorage.getItem("python-mastery-xp");
    if (savedXP) setTotalXP(parseInt(savedXP, 10));
    const streakData = getStreakData();
    setStreak(streakData.currentStreak);
  }, []);

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = completedLessons.size;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-medium hover:text-accent transition-colors">
            python-mastery
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/learn" className="text-accent font-medium">Lessons</Link>
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <section className="flex flex-wrap items-baseline justify-between gap-3 mb-8">
          <div>
            <h1 className="font-mono text-xl">lessons</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {completedCount} of {totalLessons} done across {modules.length} modules.
            </p>
          </div>
          {(totalXP > 0 || streak > 0) && (
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              {streak > 0 && <span>🔥 {streak}d streak</span>}
              {totalXP > 0 && <span>⚡ {totalXP} xp</span>}
            </div>
          )}
        </section>

        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const prevModule = index > 0 ? modules[index - 1] : null;
              const prevModuleCompletedCount = prevModule
                ? prevModule.lessons.filter((l) =>
                    completedLessons.has(`${prevModule.slug}/${l.slug}`)
                  ).length
                : 0;
              const prevModuleTotalLessons = prevModule ? prevModule.lessons.length : 0;

              return (
                <ModuleCard
                  key={module.slug}
                  module={module}
                  moduleIndex={index}
                  completedLessons={completedLessons}
                  previousModuleCompletedCount={prevModuleCompletedCount}
                  previousModuleTotalLessons={prevModuleTotalLessons}
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
