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
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage
      setCompletedSteps(new Set(JSON.parse(saved)));
    }
  }, []);

  const totalSteps = projects.reduce((sum, p) => sum + p.steps.length, 0);
  const completedCount = completedSteps.size;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);
  const projectsComplete = projects.filter((p) =>
    p.steps.every((s) => completedSteps.has(s.id))
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-sm text-accent mb-4">
                <span>🚀</span>
                <span>Apply your skills</span>
              </div>
              <h1 className="text-4xl font-bold mb-3">Guided Projects</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Put your Python and pandas skills to work with real-world data
                analysis projects
              </p>
            </div>
            <Link href="/learn" className="btn-secondary inline-flex items-center gap-2">
              <span>📚</span>
              <span>Back to Lessons</span>
            </Link>
          </div>

          {/* Stats Card */}
          <div className="p-8 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <div className="text-4xl font-bold text-foreground mb-1">{projects.length}</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-foreground mb-1">{totalSteps}</div>
                  <div className="text-sm text-muted-foreground">Total Steps</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-foreground mb-1">{projectsComplete}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-foreground mb-1">{progressPercent}%</div>
                  <div className="text-sm text-muted-foreground">Progress</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="text-accent font-medium">
                    {completedCount} / {totalSteps} steps
                  </span>
                </div>
                <div className="progress-bar h-3 rounded-full">
                  <div
                    className="progress-bar-fill rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Available Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                completedSteps={completedSteps}
              />
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="p-8 rounded-2xl border border-border bg-card/50">
          <h2 className="text-2xl font-bold mb-8 text-center">How Projects Work</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center text-3xl mx-auto mb-4">
                📊
              </div>
              <h3 className="font-semibold text-lg mb-2">Real Datasets</h3>
              <p className="text-sm text-muted-foreground">
                Each project uses realistic datasets embedded directly in your browser.
                No downloads or setup required.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center text-3xl mx-auto mb-4">
                🎯
              </div>
              <h3 className="font-semibold text-lg mb-2">Step-by-Step Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Work through each project one step at a time. Each step builds
                on the previous one with clear goals and hints.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center text-3xl mx-auto mb-4">
                ✅
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Validation</h3>
              <p className="text-sm text-muted-foreground">
                Run your code and get immediate feedback. The system validates your
                output to verify you completed each step correctly.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
