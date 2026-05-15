"use client";

import { useState, useEffect, useCallback, useRef, use } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { LessonView } from "@/components/LessonView";
import { TutorChat, type TutorChatHandle } from "@/components/TutorChat";
import { MobileModuleNav } from "@/components/MobileModuleNav";
import { InterfaceOnboarding } from "@/components/InterfaceOnboarding";
import { getAllModules, getLessonBySlug, getNextLesson, getPreviousLesson } from "@/lib/lessons";
import { updateStreak } from "@/lib/streak";
import { safeJsonParse, safeSetItem, markReviewed } from "@/lib/storage";

interface LessonPageProps {
  params: Promise<{
    moduleSlug: string;
    lessonSlug: string;
  }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { moduleSlug, lessonSlug } = use(params);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [tutorCode, setTutorCode] = useState("");
  const tutorRef = useRef<TutorChatHandle | null>(null);

  const modules = getAllModules();
  const lesson = getLessonBySlug(moduleSlug, lessonSlug);
  const nextLesson = lesson ? getNextLesson(moduleSlug, lessonSlug) : null;
  const prevLesson = lesson ? getPreviousLesson(moduleSlug, lessonSlug) : null;
  const isAlreadyComplete = completedLessons.has(`${moduleSlug}/${lessonSlug}`);

  useEffect(() => {
    const list = safeJsonParse<string[]>(localStorage.getItem("python-mastery-completed"), []);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage
    setCompletedLessons(new Set(list));

    const lessonKey = `${moduleSlug}/${lessonSlug}`;
    if (list.includes(lessonKey)) {
      markReviewed(lessonKey);
    }
  }, [moduleSlug, lessonSlug]);

  const handleComplete = useCallback(() => {
    const lessonKey = `${moduleSlug}/${lessonSlug}`;
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.add(lessonKey);
      safeSetItem("python-mastery-completed", JSON.stringify([...next]));
      window.dispatchEvent(new Event("lessons-updated"));
      return next;
    });

    updateStreak();
  }, [moduleSlug, lessonSlug]);

  const handleAskTutor = useCallback((prompt: string) => {
    tutorRef.current?.openWithPrompt(prompt);
  }, []);

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
      <MobileModuleNav
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        modules={modules}
        completedLessons={completedLessons}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <LessonView
          lesson={lesson}
          onComplete={handleComplete}
          prevLesson={prevLesson ? { slug: prevLesson.slug, moduleSlug: prevLesson.moduleSlug, title: prevLesson.title } : null}
          nextLesson={nextLesson ? { slug: nextLesson.slug, moduleSlug: nextLesson.moduleSlug, title: nextLesson.title } : null}
          isAlreadyComplete={isAlreadyComplete}
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onOpenTutorWithPrompt={handleAskTutor}
          onActiveCodeChange={setTutorCode}
        />
      </main>
      <TutorChat
        ref={tutorRef}
        lessonTitle={lesson.title}
        moduleSlug={moduleSlug}
        currentCode={tutorCode}
      />
      <InterfaceOnboarding />
    </div>
  );
}
