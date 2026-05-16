// Single chokepoint for "what lessons are complete".
// Showcase: every lesson reads complete and writes are no-ops (visitors can't
// change the frozen portfolio state). Learn: real localStorage tracking.
import { getAllModules } from "@/lib/lessons";
import { isShowcase } from "@/lib/mode";
import { safeJsonParse, safeSetItem } from "@/lib/storage";

const COMPLETED_KEY = "python-mastery-completed";

export function getAllLessonKeys(): string[] {
  return getAllModules().flatMap((m) => m.lessons.map((l) => `${m.slug}/${l.slug}`));
}

export function getCompletedLessons(): Set<string> {
  if (isShowcase()) return new Set(getAllLessonKeys());
  if (typeof window === "undefined") return new Set();
  return new Set(safeJsonParse<string[]>(localStorage.getItem(COMPLETED_KEY), []));
}

export function isLessonComplete(key: string): boolean {
  if (isShowcase()) return true;
  return getCompletedLessons().has(key);
}

export function markLessonComplete(key: string): boolean {
  if (isShowcase()) return false;
  if (typeof window === "undefined") return false;
  const set = getCompletedLessons();
  if (set.has(key)) return false;
  set.add(key);
  safeSetItem(COMPLETED_KEY, JSON.stringify([...set]));
  window.dispatchEvent(new Event("lessons-updated"));
  return true;
}
