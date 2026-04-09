"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ModuleCard } from "@/components/ModuleCard";
import { getAllModules } from "@/lib/lessons";

export default function LearnDashboard() {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );
  const [totalXP, setTotalXP] = useState(0);
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
            {modules.map((module, index) => (
              <ModuleCard
                key={module.slug}
                module={module}
                moduleIndex={index}
                completedLessons={completedLessons}
              />
            ))}
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
