"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  completedSteps: Set<string>;
}

const difficultyConfig: Record<string, { color: string; label: string; icon: string }> = {
  beginner: {
    color: "bg-green-500/15 text-green-400 border-green-500/30",
    label: "Beginner",
    icon: "🌱",
  },
  "beginner-intermediate": {
    color: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    label: "Beginner-Intermediate",
    icon: "📈",
  },
  intermediate: {
    color: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    label: "Intermediate",
    icon: "⚡",
  },
  advanced: {
    color: "bg-red-500/15 text-red-400 border-red-500/30",
    label: "Advanced",
    icon: "🔥",
  },
};

const projectIcons: Record<string, string> = {
  "survey-explorer": "📋",
  "sales-dashboard": "💰",
  "building-permits": "🏗️",
};

export function ProjectCard({ project, completedSteps }: ProjectCardProps) {
  const projectStepIds = project.steps.map((s) => s.id);
  const completedCount = projectStepIds.filter((id) =>
    completedSteps.has(id)
  ).length;
  const totalSteps = project.steps.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);
  const isComplete = completedCount === totalSteps;
  const difficulty = difficultyConfig[project.difficulty];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block rounded-2xl border transition-all duration-300 hover:shadow-xl overflow-hidden ${
        isComplete
          ? "border-success/30 bg-success/5 hover:border-success/50 hover:shadow-success/10"
          : "border-border bg-card hover:bg-card-hover hover:border-accent/50 hover:shadow-accent/10"
      }`}
    >
      {/* Header with gradient */}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
              isComplete
                ? "bg-success/20"
                : "bg-gradient-to-br from-accent/20 to-purple-500/20"
            }`}>
              {isComplete ? "✓" : projectIcons[project.slug] || "📊"}
            </div>
            <div>
              <h3 className={`font-semibold text-lg transition-colors ${
                isComplete
                  ? "text-success"
                  : "text-foreground group-hover:text-accent"
              }`}>
                {project.title}
              </h3>
              <span className="text-xs text-muted-foreground">
                {project.datasetName}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border ${difficulty.color}`}>
            <span>{difficulty.icon}</span>
            {difficulty.label}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-card-hover text-muted-foreground border border-border">
            <span>⏱️</span>
            {project.estimatedTime}
          </span>
        </div>
      </div>

      {/* Progress section */}
      <div className="p-6 pt-4 border-t border-border/50 bg-background/30">
        {/* Step indicators */}
        <div className="flex gap-1 mb-3">
          {project.steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                completedSteps.has(step.id)
                  ? "bg-success"
                  : "bg-border group-hover:bg-accent/30"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {completedCount} of {totalSteps} steps
          </span>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            isComplete
              ? "bg-success/20 text-success"
              : progressPercent > 0
              ? "bg-accent/20 text-accent"
              : "bg-border text-muted-foreground"
          }`}>
            {isComplete ? "Complete" : progressPercent > 0 ? `${progressPercent}%` : "Start"}
          </span>
        </div>
      </div>
    </Link>
  );
}
