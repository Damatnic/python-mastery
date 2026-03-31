"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ModuleCard } from "@/components/ModuleCard";
import { getAllModules } from "@/lib/lessons";

export default function LearnDashboard() {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );
  const modules = getAllModules();

  useEffect(() => {
    const saved = localStorage.getItem("python-mastery-completed");
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)));
    }
  }, []);

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐍</span>
            <span className="font-bold text-xl">Python Mastery</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Progress Overview */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Your Learning Path</h1>
          <p className="text-muted-foreground mb-6">
            Master Python through {totalLessons} interactive lessons across{" "}
            {modules.length} modules.
          </p>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Overall Progress</span>
              <span className="text-accent font-bold">{progressPercent}%</span>
            </div>
            <div className="progress-bar h-3">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {completedCount} of {totalLessons} lessons completed
            </p>
          </div>
        </div>

        {/* Module Grid */}
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
      </main>
    </div>
  );
}
