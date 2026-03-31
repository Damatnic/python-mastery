"use client";

import Link from "next/link";
import type { Module } from "@/lib/types";

const MODULE_ICONS = [
  "🎯", // Python Basics
  "📊", // Pandas Fundamentals
  "🧹", // Data Cleaning
  "🔗", // Grouping & Combining
  "📝", // String & File Ops
  "🌐", // Web & APIs
  "⚡", // Functions & Apply
];

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
  const isComplete = completedCount === totalLessons;

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
          : "border-border bg-card hover:bg-card-hover hover:border-accent/50 hover:shadow-accent/10"
      }`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-14 h-14 rounded-xl text-2xl ${
              isComplete
                ? "bg-success/20"
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
          <div className="flex items-center gap-2 text-sm">
            <span className={`font-medium ${isComplete ? "text-success" : "text-accent"}`}>
              {completedCount}/{totalLessons}
            </span>
            <span className="text-muted-foreground">lessons</span>
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
