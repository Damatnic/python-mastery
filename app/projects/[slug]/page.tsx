"use client";

import { useState, useEffect, useCallback, use } from "react";
import { notFound } from "next/navigation";
import { ProjectView } from "@/components/ProjectView";
import { getProjectBySlug } from "@/lib/projects";

const STORAGE_KEY = "python-mastery-project-progress";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage
      setCompletedSteps(new Set(JSON.parse(saved)));
    }
    setIsLoaded(true);
  }, []);

  const handleStepComplete = useCallback((stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(stepId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  if (!project) {
    notFound();
  }

  // Don't render until we've loaded progress from localStorage
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading project...</div>
      </div>
    );
  }

  return (
    <ProjectView
      project={project}
      completedSteps={completedSteps}
      onStepComplete={handleStepComplete}
    />
  );
}
