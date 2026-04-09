"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ModuleCard } from "@/components/ModuleCard";
import { getAllModules } from "@/lib/lessons";
import { getStreakData } from "@/lib/streak";

export default function LearnDashboard() {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [projectCompletions, setProjectCompletions] = useState<Set<string>>(
    new Set()
  );
  const modules = getAllModules();

  useEffect(() => {
    const saved = localStorage.getItem("python-mastery-completed");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage
      setCompletedLessons(new Set(JSON.parse(saved)));
    }

    const savedXP = localStorage.getItem("python-mastery-xp");
    if (savedXP) {

      setTotalXP(parseInt(savedXP, 10));
    }

    const savedProjects = localStorage.getItem("python-mastery-project-completed");
    if (savedProjects) {

      setProjectCompletions(new Set(JSON.parse(savedProjects)));
    }

    // Load streak data
    const streakData = getStreakData();
    setStreak(streakData.currentStreak);
  }, []);

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  const modulesComplete = modules.filter(
    (m) => m.lessons.every((l) => completedLessons.has(`${m.slug}/${l.slug}`))
  ).length;

  // Project challenge stats
  const completedProjectChallenges = projectCompletions.size;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐍</span>
            <span className="font-bold text-xl">Python Mastery</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/learn" className="text-accent font-medium">
              Lessons
            </Link>
            <Link
              href="/projects"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/gameplan"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              🎮 Game Plan
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Continue Learning Section */}
        {(() => {
          // Find first incomplete lesson
          let continueLesson = null;
          let continueModule = null;

          for (const mod of modules) {
            for (const lesson of mod.lessons) {
              if (!completedLessons.has(`${mod.slug}/${lesson.slug}`)) {
                continueLesson = lesson;
                continueModule = mod;
                break;
              }
            }
            if (continueLesson) break;
          }

          // Default to first lesson if nothing started
          if (!continueLesson && modules.length > 0 && modules[0].lessons.length > 0) {
            continueLesson = modules[0].lessons[0];
            continueModule = modules[0];
          }

          if (continueLesson && continueModule) {
            const isFirstLesson = completedLessons.size === 0;
            return (
              <div className="mb-8 p-6 rounded-2xl border-2 border-accent/30 bg-gradient-to-r from-accent/10 via-purple-500/5 to-accent/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl" />
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-accent text-lg">{isFirstLesson ? "🚀" : "📚"}</span>
                      <span className="text-sm font-medium text-accent">
                        {isFirstLesson ? "Start Here" : "Continue where you left off"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{continueLesson.title}</h3>
                    <p className="text-sm text-muted-foreground">in {continueModule.title}</p>
                  </div>
                  <Link
                    href={`/learn/${continueModule.slug}/${continueLesson.slug}`}
                    className="btn-primary px-6 py-3 text-lg font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow flex items-center gap-2 whitespace-nowrap"
                  >
                    {isFirstLesson ? "Start Learning" : "Resume"} →
                  </Link>
                </div>
              </div>
            );
          }
          return null;
        })()}

        {/* Quick Stats Row */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <span className="text-orange-400 text-xl">🔥</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">{streak}</div>
              <div className="text-xs text-muted-foreground">day streak</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <span className="text-amber-400 text-xl">⚡</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{totalXP}</div>
              <div className="text-xs text-muted-foreground">XP earned</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-accent text-xl">📚</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{completedLessons.size}/{modules.reduce((sum, m) => sum + m.lessons.length, 0)}</div>
              <div className="text-xs text-muted-foreground">lessons done</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <span className="text-success text-xl">🏆</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{modules.filter(m => m.lessons.every(l => completedLessons.has(`${m.slug}/${l.slug}`))).length}</div>
              <div className="text-xs text-muted-foreground">modules complete</div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">Your Learning Path</h1>
              <p className="text-xl text-muted-foreground">
                {totalLessons} interactive lessons across {modules.length} modules
              </p>
            </div>
            {completedCount > 0 && (
              <Link
                href="/projects"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <span>🚀</span>
                <span>Try a Project</span>
              </Link>
            )}
          </div>

          {/* Progress Card */}
          <div className="p-8 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                <div>
                  <div className="text-4xl font-bold text-foreground mb-1">
                    {progressPercent}%
                  </div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-foreground mb-1">
                    {completedCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Lessons Done</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-amber-400 mb-1">
                    {completedProjectChallenges}
                  </div>
                  <div className="text-sm text-muted-foreground">🏗️ Project Tasks</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-foreground mb-1">
                    {modulesComplete}
                  </div>
                  <div className="text-sm text-muted-foreground">Modules Complete</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-amber-300 mb-1">
                    {totalXP}
                  </div>
                  <div className="text-sm text-muted-foreground">⭐ Total XP</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="text-accent font-medium">
                    {completedCount} / {totalLessons}
                  </span>
                </div>
                <div className="progress-bar h-3 rounded-full">
                  <div
                    className="progress-bar-fill rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Learning Path */}
        <div className="mb-12 p-6 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/5 via-purple-500/5 to-accent/5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🗺️</span>
            <h2 className="text-lg font-semibold">Recommended Learning Path</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {[
              { name: "Python Basics", slug: "python-basics" },
              { name: "Pandas", slug: "pandas-fundamentals" },
              { name: "Data Cleaning", slug: "data-cleaning" },
              { name: "Grouping & Combining", slug: "grouping-combining" },
              { name: "String & File Ops", slug: "string-file-ops" },
              { name: "Web & APIs", slug: "web-apis" },
              { name: "Functions & Apply", slug: "functions-apply" },
              { name: "Game Dev", slug: "game-dev-pygame" },
              { name: "WCTC Data", slug: "data-manipulation-school" },
            ].map((step, i, arr) => (
              <span key={step.slug} className="flex items-center gap-2">
                <Link
                  href={`/learn/${step.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-card border border-border hover:border-accent hover:text-accent transition-colors"
                >
                  {step.name}
                </Link>
                {i < arr.length - 1 && (
                  <span className="text-muted-foreground">→</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Module Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Modules</h2>
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
        </div>

        {/* Quick Actions */}
        {completedCount > 0 && completedCount < totalLessons && (
          <div className="mt-12 p-6 rounded-2xl border border-border bg-card text-center">
            <p className="text-muted-foreground mb-4">
              Great progress! Keep going to complete your Python journey.
            </p>
            <Link
              href={`/learn/${
                modules.find((m) =>
                  m.lessons.some((l) => !completedLessons.has(`${m.slug}/${l.slug}`))
                )?.slug
              }/${
                modules
                  .find((m) =>
                    m.lessons.some((l) => !completedLessons.has(`${m.slug}/${l.slug}`))
                  )
                  ?.lessons.find((l) => !completedLessons.has(`${modules.find((m) =>
                    m.lessons.some((l2) => !completedLessons.has(`${m.slug}/${l2.slug}`))
                  )?.slug}/${l.slug}`))?.slug
              }`}
              className="btn-primary"
            >
              Continue Learning
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
