"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { LessonView } from "@/components/LessonView";
import { getAllModules, getLessonBySlug, getNextLesson, getPreviousLesson } from "@/lib/lessons";
import { updateStreak } from "@/lib/streak";

interface LessonPageProps {
  params: Promise<{
    moduleSlug: string;
    lessonSlug: string;
  }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { moduleSlug, lessonSlug } = use(params);
  const router = useRouter();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );

  const modules = getAllModules();
  const lesson = getLessonBySlug(moduleSlug, lessonSlug);
  const nextLesson = lesson ? getNextLesson(moduleSlug, lessonSlug) : null;
  const prevLesson = lesson ? getPreviousLesson(moduleSlug, lessonSlug) : null;

  useEffect(() => {
    const saved = localStorage.getItem("python-mastery-completed");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage
      setCompletedLessons(new Set(JSON.parse(saved)));
    }
  }, []);

  const handleComplete = useCallback(() => {
    const lessonKey = `${moduleSlug}/${lessonSlug}`;
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.add(lessonKey);
      localStorage.setItem(
        "python-mastery-completed",
        JSON.stringify([...next])
      );
      // Notify sidebar to update in same-tab
      window.dispatchEvent(new Event("lessons-updated"));
      return next;
    });

    // Update streak tracking
    updateStreak();

    // Auto-advance to next lesson after a short delay
    if (nextLesson) {
      setTimeout(() => {
        router.push(`/learn/${nextLesson.moduleSlug}/${nextLesson.slug}`);
      }, 1500);
    }
  }, [moduleSlug, lessonSlug, nextLesson, router]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col items-start justify-center bg-background text-foreground font-mono text-sm px-6 max-w-2xl mx-auto">
        <p>
          <span className="text-accent">damato@python</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-muted-foreground">~$</span>{" "}
          cat /learn/{moduleSlug}/{lessonSlug}
        </p>
        <p className="mt-2 text-error">cat: no such lesson</p>
        <Link
          href="/learn"
          className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded border border-border hover:border-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="text-accent">→</span> back to ~/lessons
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar modules={modules} completedLessons={completedLessons} />
      </div>
      <main className="flex-1 flex flex-col overflow-hidden">
        <LessonView
          lesson={lesson}
          onComplete={handleComplete}
          prevLesson={prevLesson ? { slug: prevLesson.slug, moduleSlug: prevLesson.moduleSlug, title: prevLesson.title } : null}
          nextLesson={nextLesson ? { slug: nextLesson.slug, moduleSlug: nextLesson.moduleSlug, title: nextLesson.title } : null}
        />
      </main>
    </div>
  );
}
