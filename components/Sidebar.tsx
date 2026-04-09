"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Module } from "@/lib/types";
import { getStreakData } from "@/lib/streak";

interface SidebarProps {
  modules: Module[];
  completedLessons: Set<string>;
}

export function Sidebar({ modules, completedLessons: initialCompleted }: SidebarProps) {
  const pathname = usePathname();
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [localCompleted, setLocalCompleted] = useState<Set<string>>(initialCompleted);

  // Sync with prop changes
  useEffect(() => {
    setLocalCompleted(initialCompleted);
  }, [initialCompleted]);

  // Calculate total lessons
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = localCompleted.size;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Load XP, streak, and completed lessons from localStorage
  useEffect(() => {
    const savedXp = localStorage.getItem("python-mastery-xp");
    if (savedXp) {
      setXp(parseInt(savedXp, 10) || 0);
    }

    const savedLessons = localStorage.getItem("python-mastery-completed");
    if (savedLessons) {
      setLocalCompleted(new Set(JSON.parse(savedLessons)));
    }

    // Load streak data
    const streakData = getStreakData();
    setStreak(streakData.currentStreak);

    // Listen for storage changes (cross-tab sync)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "python-mastery-xp" && e.newValue) {
        setXp(parseInt(e.newValue, 10) || 0);
      }
      if (e.key === "python-mastery-completed" && e.newValue) {
        setLocalCompleted(new Set(JSON.parse(e.newValue)));
      }
      if (e.key === "python-mastery-streak" && e.newValue) {
        setStreak(parseInt(e.newValue, 10) || 0);
      }
    };

    // Listen for custom events for same-tab updates
    const handleXpUpdate = () => {
      const currentXp = localStorage.getItem("python-mastery-xp");
      if (currentXp) {
        setXp(parseInt(currentXp, 10) || 0);
      }
    };

    const handleLessonsUpdate = () => {
      const savedLessons = localStorage.getItem("python-mastery-completed");
      if (savedLessons) {
        setLocalCompleted(new Set(JSON.parse(savedLessons)));
      }
    };

    const handleStreakUpdate = () => {
      const streakData = getStreakData();
      setStreak(streakData.currentStreak);
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("xp-updated", handleXpUpdate);
    window.addEventListener("lessons-updated", handleLessonsUpdate);
    window.addEventListener("streak-updated", handleStreakUpdate);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("xp-updated", handleXpUpdate);
      window.removeEventListener("lessons-updated", handleLessonsUpdate);
      window.removeEventListener("streak-updated", handleStreakUpdate);
    };
  }, []);

  return (
    <aside className="w-72 h-full overflow-y-auto border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐍</span>
          <span className="font-bold text-lg text-foreground">
            Python Mastery
          </span>
        </Link>
      </div>

      {/* Progress Section */}
      <div className="px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Progress</span>
          <span className="text-xs font-semibold text-accent">{completedCount}/{totalLessons}</span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-accent to-purple-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <span className="text-orange-400">🔥</span>
            <span className="text-sm font-semibold text-orange-400">{streak} day{streak !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <span className="text-amber-400">⚡</span>
            <span className="text-sm font-semibold text-amber-400">{xp} XP</span>
          </div>
        </div>
      </div>

      <nav className="p-2 flex-1 overflow-y-auto">
        {modules.map((module, moduleIndex) => {
          const moduleCompletedCount = module.lessons.filter(
            (l) => localCompleted.has(`${module.slug}/${l.slug}`)
          ).length;
          const isModuleComplete = moduleCompletedCount === module.lessons.length;

          return (
          <div key={module.slug} className="mb-4">
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <span className="flex items-center gap-1.5">
                {isModuleComplete && <span className="text-success">✓</span>}
                {moduleIndex + 1}. {module.title}
              </span>
              <span className="text-[10px] font-normal normal-case">
                ({moduleCompletedCount}/{module.lessons.length})
              </span>
              {moduleIndex === 0 && localCompleted.size === 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent text-white rounded animate-pulse">
                  START HERE →
                </span>
              )}
            </div>
            <ul className="space-y-0.5">
              {module.lessons.map((lesson) => {
                const lessonPath = `/learn/${module.slug}/${lesson.slug}`;
                const isActive = pathname === lessonPath;
                const isCompleted = localCompleted.has(
                  `${module.slug}/${lesson.slug}`
                );

                return (
                  <li key={lesson.slug}>
                    <Link
                      href={lessonPath}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive
                          ? "bg-accent/10 border-l-3 border-accent text-accent font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                          isCompleted
                            ? "bg-success text-white"
                            : isActive
                            ? "bg-accent text-white"
                            : "bg-border text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? "✓" : lesson.lessonNumber}
                      </span>
                      <span className="truncate">{lesson.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto space-y-2">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>🚀</span>
          <span>Projects</span>
        </Link>
        <Link
          href="/gameplan"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>🎮</span>
          <span>Game Plan</span>
        </Link>
        <Link
          href="/learn"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </aside>
  );
}
