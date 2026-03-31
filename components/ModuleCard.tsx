"use client";

import Link from "next/link";
import type { Module } from "@/lib/types";

interface ModuleCardProps {
  module: Module;
  moduleIndex: number;
  completedLessons: Set<string>;
}

export function ModuleCard({
  module,
  moduleIndex,
  completedLessons,
}: ModuleCardProps) {
  const completedCount = module.lessons.filter((l) =>
    completedLessons.has(`${module.slug}/${l.slug}`)
  ).length;
  const totalLessons = module.lessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const firstIncompleteLesson =
    module.lessons.find(
      (l) => !completedLessons.has(`${module.slug}/${l.slug}`)
    ) || module.lessons[0];

  return (
    <Link
      href={`/learn/${module.slug}/${firstIncompleteLesson.slug}`}
      className="group block p-6 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-border-hover transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-bg text-accent font-bold text-lg">
            {moduleIndex + 1}
          </span>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
              {module.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {totalLessons} lessons
            </p>
          </div>
        </div>
        {completedCount === totalLessons && (
          <span className="text-success text-xl">✓</span>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {module.description}
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {completedCount} of {totalLessons} complete
          </span>
          <span className="text-accent font-medium">{progressPercent}%</span>
        </div>
        <div className="progress-bar h-1.5">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
