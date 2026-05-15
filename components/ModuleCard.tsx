"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Module } from "@/lib/types";
import { safeJsonParse } from "@/lib/storage";

interface ModuleCardProps {
  module: Module;
  moduleIndex: number;
  completedLessons: Set<string>;
  previousModuleCompletedCount?: number;
  previousModuleTotalLessons?: number;
}

export function ModuleCard({
  module,
  moduleIndex,
  completedLessons,
  previousModuleCompletedCount = 0,
  previousModuleTotalLessons = 0,
}: ModuleCardProps) {
  const [projectCompletions, setProjectCompletions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const list = safeJsonParse<string[]>(
      localStorage.getItem("python-mastery-project-completed"),
      [],
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage
    setProjectCompletions(new Set(list));
  }, []);

  const completedCount = module.lessons.filter((l) =>
    completedLessons.has(`${module.slug}/${l.slug}`)
  ).length;
  const totalLessons = module.lessons.length;
  const isComplete = completedCount === totalLessons;

  const requiredFromPrevious = Math.min(3, previousModuleTotalLessons);
  const isLocked = moduleIndex > 0 && previousModuleCompletedCount < requiredFromPrevious;

  const lessonsWithProjects = module.lessons.filter((l) => l.projectChallenge);
  const totalProjectTasks = lessonsWithProjects.length;
  const completedProjectTasks = lessonsWithProjects.filter((l) =>
    projectCompletions.has(`${module.slug}/${l.slug}`)
  ).length;

  const firstIncompleteLesson =
    module.lessons.find(
      (l) => !completedLessons.has(`${module.slug}/${l.slug}`)
    ) || module.lessons[0];

  const statusText = isLocked
    ? "locked"
    : isComplete
    ? "✓ complete"
    : completedCount > 0
    ? `${completedCount}/${totalLessons}`
    : "─";
  const statusClass = isLocked
    ? "text-muted-foreground"
    : isComplete
    ? "text-success"
    : completedCount > 0
    ? "text-accent"
    : "text-muted-foreground";

  return (
    <Link
      href={`/learn/${module.slug}/${firstIncompleteLesson.slug}`}
      className={`group block font-mono p-4 rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isLocked
          ? "border-border/50 bg-card/30"
          : "border-border bg-card hover:bg-card-hover hover:border-accent/50"
      }`}
      aria-label={`Open module ${module.title}${isLocked ? ", locked" : ""}`}
      aria-disabled={isLocked || undefined}
    >
      <div className="flex items-baseline gap-2 text-sm">
        <span className="text-accent">{String(moduleIndex + 1).padStart(2, "0")}</span>
        <span className={isLocked ? "text-muted-foreground" : "text-foreground"}>
          modules/{module.slug}/
        </span>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
        {module.description}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {totalLessons} lessons
          {totalProjectTasks > 0 && (
            <span className="ml-2">
              · {completedProjectTasks}/{totalProjectTasks} projects
            </span>
          )}
        </span>
        <span className={statusClass}>{statusText}</span>
      </div>

      {isLocked && (
        <p className="mt-2 text-[10px] text-muted-foreground">
          # complete module {moduleIndex} first
        </p>
      )}
    </Link>
  );
}
