"use client";

import Link from "next/link";

interface NextLessonCardProps {
  nextLesson?: { slug: string; moduleSlug: string; title: string } | null;
}

export function NextLessonCard({ nextLesson }: NextLessonCardProps) {
  if (!nextLesson) {
    return (
      <div className="mt-8 rounded border border-success/40 bg-success/[0.04] p-5 font-mono">
        <p className="text-xs text-success">✓ lesson done</p>
        <p className="mt-2 text-sm text-foreground">
          you finished the last lesson in this module.
        </p>
        <Link
          href="/learn"
          className="mt-4 inline-flex items-baseline gap-2 px-3 py-2 rounded border border-success text-success hover:bg-success/10 transition-colors text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span>exit 0</span>
          <span className="text-muted-foreground">·</span>
          <span>back to ~/lessons</span>
        </Link>
      </div>
    );
  }
  return (
    <div className="mt-8 rounded border border-success/40 bg-success/[0.04] p-5 font-mono">
      <p className="text-xs text-success">✓ lesson done</p>
      <p className="mt-2 text-sm text-foreground">
        next up:{" "}
        <span className="text-accent">{nextLesson.title}</span>
      </p>
      <Link
        href={`/learn/${nextLesson.moduleSlug}/${nextLesson.slug}`}
        className="mt-4 inline-flex items-baseline gap-2 px-3 py-2 rounded border border-accent text-accent hover:bg-accent/10 transition-colors text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span>go to next lesson</span>
        <span>→</span>
      </Link>
    </div>
  );
}
