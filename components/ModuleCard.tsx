"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Module } from "@/lib/types";

const MODULE_ICONS = [
  "🐍", // Python Basics
  "🐼", // Pandas Fundamentals
  "🧹", // Data Cleaning
  "🔗", // Grouping & Combining
  "📝", // String & File Ops
  "🌐", // Web & APIs
  "λ",  // Functions & Apply (lambda symbol)
  "🎮", // Game Dev with Pygame
  "📊", // Data Manipulation (WCTC)
];

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
    const saved = localStorage.getItem("python-mastery-project-completed");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage
      setProjectCompletions(new Set(JSON.parse(saved)));
    }
  }, []);

  const completedCount = module.lessons.filter((l) =>
    completedLessons.has(`${module.slug}/${l.slug}`)
  ).length;
  const totalLessons = module.lessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  const isComplete = completedCount === totalLessons;

  // Module 1 is always unlocked, others need 3+ lessons from previous module
  const requiredFromPrevious = Math.min(3, previousModuleTotalLessons);
  const isLocked = moduleIndex > 0 && previousModuleCompletedCount < requiredFromPrevious;
  const previousModuleName = moduleIndex > 0 ? `Module ${moduleIndex}` : "";

  // Project challenge tracking
  const lessonsWithProjects = module.lessons.filter((l) => l.projectChallenge);
  const totalProjectTasks = lessonsWithProjects.length;
  const completedProjectTasks = lessonsWithProjects.filter((l) =>
    projectCompletions.has(`${module.slug}/${l.slug}`)
  ).length;

  const firstIncompleteLesson =
    module.lessons.find(
      (l) => !completedLessons.has(`${module.slug}/${l.slug}`)
    ) || module.lessons[0];

  return (
    <Link
      href={`/learn/${module.slug}/${firstIncompleteLesson.slug}`}
      className={`group relative block p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
        isComplete
          ? "border-success/30 bg-success/5 hover:border-success/50 hover:shadow-success/10"
          : isLocked
          ? "border-border/50 bg-card/50 hover:bg-card hover:border-border"
          : "border-border bg-card hover:bg-card-hover hover:border-accent/50 hover:shadow-accent/10"
      }`}
      title={isLocked ? `Complete ${requiredFromPrevious}+ lessons in ${previousModuleName} first` : undefined}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity ${isLocked ? "hidden" : ""}`} />

      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/20 border border-border text-xs text-muted-foreground">
          <span>🔒</span>
          <span>Complete {previousModuleName}</span>
        </div>
      )}

      <div className={`relative ${isLocked ? "opacity-60" : ""}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-14 h-14 rounded-xl text-2xl ${
              isComplete
                ? "bg-success/20"
                : isLocked
                ? "bg-muted/20"
                : "bg-gradient-to-br from-accent/20 to-purple-500/20"
            }`}>
              {isComplete ? "✓" : MODULE_ICONS[moduleIndex] || "📚"}
            </div>
            <div>
              <span className="text-xs font-mono text-muted-foreground">
                Module {String(moduleIndex + 1).padStart(2, "0")}
              </span>
              <h3 className={`font-semibold text-lg transition-colors ${
                isComplete
                  ? "text-success"
                  : "text-foreground group-hover:text-accent"
              }`}>
                {module.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
          {module.description}
        </p>

        {/* Lesson Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {module.lessons.map((lesson, i) => {
            const isLessonComplete = completedLessons.has(`${module.slug}/${lesson.slug}`);
            return (
              <div
                key={lesson.slug}
                className={`w-6 h-1.5 rounded-full transition-colors ${
                  isLessonComplete
                    ? "bg-success"
                    : "bg-border group-hover:bg-accent/30"
                }`}
                title={`Lesson ${i + 1}: ${lesson.title}`}
              />
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className={`font-medium ${isComplete ? "text-success" : "text-accent"}`}>
                {completedCount}/{totalLessons}
              </span>
              <span className="text-muted-foreground">lessons</span>
            </div>
            {totalProjectTasks > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-amber-400/70">•</span>
                <span className={`font-medium ${completedProjectTasks === totalProjectTasks && totalProjectTasks > 0 ? "text-amber-400" : "text-amber-400/60"}`}>
                  {completedProjectTasks}/{totalProjectTasks}
                </span>
                <span className="text-muted-foreground">🏗️</span>
              </div>
            )}
          </div>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            isComplete
              ? "bg-success/20 text-success"
              : progressPercent > 0
              ? "bg-accent/20 text-accent"
              : "bg-border text-muted-foreground"
          }`}>
            {isComplete ? "Complete" : progressPercent > 0 ? `${progressPercent}%` : "Start"}
          </div>
        </div>
      </div>
    </Link>
  );
}
