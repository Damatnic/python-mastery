"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  completedSteps: Set<string>;
}

const difficultyLabel: Record<string, string> = {
  beginner: "beginner",
  "beginner-intermediate": "beginner+",
  intermediate: "intermediate",
  advanced: "advanced",
};

export function ProjectCard({ project, completedSteps }: ProjectCardProps) {
  const projectStepIds = project.steps.map((s) => s.id);
  const completedCount = projectStepIds.filter((id) => completedSteps.has(id)).length;
  const totalSteps = project.steps.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);
  const isComplete = completedCount === totalSteps;

  const statusText = isComplete
    ? "✓ complete"
    : completedCount > 0
    ? `${progressPercent}%`
    : "─";
  const statusClass = isComplete
    ? "text-success"
    : completedCount > 0
    ? "text-accent"
    : "text-muted-foreground";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block font-mono p-4 rounded border border-border bg-card hover:bg-card-hover hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Open project ${project.title}`}
    >
      <div className="text-sm">
        <span className="text-foreground">projects/{project.slug}/</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{project.datasetName}</p>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
        <span>[{difficultyLabel[project.difficulty] ?? project.difficulty}]</span>
        <span>·</span>
        <span>{project.estimatedTime}</span>
        <span>·</span>
        <span>{totalSteps} steps</span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {completedCount} of {totalSteps} done
        </span>
        <span className={statusClass}>{statusText}</span>
      </div>
    </Link>
  );
}
