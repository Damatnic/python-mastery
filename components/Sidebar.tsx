"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Module } from "@/lib/types";

interface SidebarProps {
  modules: Module[];
  completedLessons: Set<string>;
}

export function Sidebar({ modules, completedLessons }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-full overflow-y-auto border-r border-border bg-card">
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐍</span>
          <span className="font-bold text-lg text-foreground">
            Python Mastery
          </span>
        </Link>
      </div>

      <nav className="p-2">
        {modules.map((module, moduleIndex) => (
          <div key={module.slug} className="mb-4">
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {moduleIndex + 1}. {module.title}
            </div>
            <ul className="space-y-0.5">
              {module.lessons.map((lesson) => {
                const lessonPath = `/learn/${module.slug}/${lesson.slug}`;
                const isActive = pathname === lessonPath;
                const isCompleted = completedLessons.has(
                  `${module.slug}/${lesson.slug}`
                );

                return (
                  <li key={lesson.slug}>
                    <Link
                      href={lessonPath}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive
                          ? "sidebar-item-active"
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
        ))}
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
