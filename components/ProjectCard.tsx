"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  completedSteps: Set<string>;
}

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/15 text-green-400 border-green-500/30",
  "beginner-intermediate": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  advanced: "bg-red-500/15 text-red-400 border-red-500/30",
};

const difficultyLabels: Record<string, string> = {
  beginner: "Beginner",
  "beginner-intermediate": "Beginner-Intermediate",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function ProjectCard({ project, completedSteps }: ProjectCardProps) {
  const projectStepIds = project.steps.map((s) => s.id);
  const completedCount = projectStepIds.filter((id) =>
    completedSteps.has(id)
  ).length;
  const totalSteps = project.steps.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);
  const isComplete = completedCount === totalSteps;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block p-6 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-border-hover transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        {isComplete && (
          <span className="flex-shrink-0 text-success text-lg">✓</span>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`inline-block px-2 py-0.5 text-xs rounded-full border ${
            difficultyColors[project.difficulty]
          }`}
        >
          {difficultyLabels[project.difficulty]}
        </span>
        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-muted/20 text-muted-foreground border border-border">
          {project.estimatedTime}
        </span>
        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-muted/20 text-muted-foreground border border-border">
          {totalSteps} steps
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <span className="text-base">📊</span>
        <span>{project.datasetName}</span>
      </div>

      {/* Progress bar */}
      <div className="progress-bar h-2">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {completedCount} / {totalSteps} steps completed
      </p>
    </Link>
  );
}
