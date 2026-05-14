"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Module } from "@/lib/types";
import { getStreakData, getRank } from "@/lib/streak";

interface SidebarProps {
  modules: Module[];
  completedLessons: Set<string>;
}

export function Sidebar({ modules, completedLessons: initialCompleted }: SidebarProps) {
  const pathname = usePathname();
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [localCompleted, setLocalCompleted] = useState<Set<string>>(initialCompleted);

  useEffect(() => {
    setLocalCompleted(initialCompleted);
  }, [initialCompleted]);

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = localCompleted.size;

  useEffect(() => {
    const savedXp = localStorage.getItem("python-mastery-xp");
    if (savedXp) setXp(parseInt(savedXp, 10) || 0);

    const savedLessons = localStorage.getItem("python-mastery-completed");
    if (savedLessons) setLocalCompleted(new Set(JSON.parse(savedLessons)));

    const streakData = getStreakData();
    setStreak(streakData.currentStreak);

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

    const handleXpUpdate = () => {
      const currentXp = localStorage.getItem("python-mastery-xp");
      if (currentXp) setXp(parseInt(currentXp, 10) || 0);
    };

    const handleLessonsUpdate = () => {
      const savedLessons = localStorage.getItem("python-mastery-completed");
      if (savedLessons) setLocalCompleted(new Set(JSON.parse(savedLessons)));
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
    <aside className="w-72 h-full overflow-y-auto border-r border-border bg-card flex flex-col font-mono text-sm">
      <div className="p-4 border-b border-border">
        <Link
          href="/"
          className="font-medium hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
        >
          python-mastery
        </Link>
      </div>

      <div className="px-4 py-3 border-b border-border text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>lessons</span>
          <span className="text-accent">{completedCount}/{totalLessons}</span>
        </div>
        {(streak > 0 || xp > 0) && (
          <p className="mt-1.5">
            <Link
              href="/stats"
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              aria-label="open stats"
            >
              <span className="text-accent">[{getRank(xp).name}]</span>
              {xp > 0 && (
                <>
                  <span> · </span>
                  <span>{xp} xp</span>
                </>
              )}
              {streak > 0 && (
                <>
                  <span> · </span>
                  <span>{streak}d</span>
                </>
              )}
            </Link>
          </p>
        )}
      </div>

      <nav className="p-2 flex-1 overflow-y-auto" aria-label="Lesson navigation">
        {modules.map((module, moduleIndex) => {
          const moduleCompletedCount = module.lessons.filter(
            (l) => localCompleted.has(`${module.slug}/${l.slug}`)
          ).length;
          const isModuleComplete = moduleCompletedCount === module.lessons.length;

          return (
            <div key={module.slug} className="mb-4">
              <div className="px-3 py-1.5 text-[11px] text-muted-foreground flex items-center gap-2">
                <span className={isModuleComplete ? "text-success" : "text-accent"}>
                  {String(moduleIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground truncate">{module.title}</span>
                <span className="ml-auto text-[10px]">
                  {moduleCompletedCount}/{module.lessons.length}
                </span>
              </div>
              <ul className="space-y-0.5">
                {module.lessons.map((lesson) => {
                  const lessonPath = `/learn/${module.slug}/${lesson.slug}`;
                  const isActive = pathname === lessonPath;
                  const isCompleted = localCompleted.has(`${module.slug}/${lesson.slug}`);
                  const marker = isCompleted ? "✓" : isActive ? ">" : " ";
                  const markerClass = isCompleted
                    ? "text-success"
                    : isActive
                    ? "text-accent"
                    : "text-muted-foreground";

                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={lessonPath}
                        className={`flex items-baseline gap-2 px-3 py-1.5 rounded text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          isActive
                            ? "bg-accent/10 text-accent"
                            : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span aria-hidden="true" className={`w-3 ${markerClass}`}>{marker}</span>
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

      <div className="p-4 border-t border-border text-xs text-muted-foreground space-y-1.5">
        <Link
          href="/projects"
          className="block hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
        >
          projects/
        </Link>
        <Link
          href="/learn"
          className="block hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
        >
          cd ~/lessons
        </Link>
      </div>
    </aside>
  );
}
