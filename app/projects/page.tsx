"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

const STORAGE_KEY = "python-mastery-project-progress";

export default function ProjectsPage() {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const projects = getAllProjects();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCompletedSteps(new Set(JSON.parse(saved)));
    }
  }, []);

  const totalSteps = projects.reduce((sum, p) => sum + p.steps.length, 0);
  const completedCount = completedSteps.size;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐍</span>
            <span className="font-bold text-xl">Python Mastery</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/learn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Lessons
            </Link>
            <Link href="/projects" className="text-accent font-medium">
              Projects
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Guided Projects</h1>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Put your Python and pandas skills to work with real-world data
            analysis projects. Each project guides you step-by-step through
            building something practical from scratch.
          </p>

          {/* Overall Progress */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Overall Progress</span>
              <span className="text-accent font-bold">{progressPercent}%</span>
            </div>
            <div className="progress-bar h-3">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {completedCount} of {totalSteps} steps completed across{" "}
              {projects.length} projects
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              completedSteps={completedSteps}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 p-8 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-semibold mb-4">How Projects Work</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-medium text-foreground mb-1">
                Real Datasets
              </h3>
              <p>
                Each project uses a realistic dataset embedded directly in your
                browser. No downloads or setup required.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-medium text-foreground mb-1">
                Step-by-Step Guidance
              </h3>
              <p>
                Work through each project one step at a time. Each step builds
                on the previous one with clear goals and hints.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-medium text-foreground mb-1">
                Instant Validation
              </h3>
              <p>
                Run your code and get immediate feedback. The system checks your
                output to verify you completed each step correctly.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
