"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { LessonView } from "@/components/LessonView";
import { getAllModules, getLessonBySlug, getNextLesson } from "@/lib/lessons";

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

  useEffect(() => {
    const saved = localStorage.getItem("python-mastery-completed");
    if (saved) {
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
      return next;
    });

    // Auto-advance to next lesson after a short delay
    if (nextLesson) {
      setTimeout(() => {
        router.push(`/learn/${nextLesson.moduleSlug}/${nextLesson.slug}`);
      }, 1500);
    }
  }, [moduleSlug, lessonSlug, nextLesson, router]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The lesson you&apos;re looking for doesn&apos;t exist.
          </p>
          <a href="/learn" className="btn-primary">
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar modules={modules} completedLessons={completedLessons} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <LessonView lesson={lesson} onComplete={handleComplete} />
      </main>
    </div>
  );
}
