export function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeSetItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // private mode or quota
  }
}

export function safeReadNumber(raw: string | null, fallback = 0): number {
  if (raw === null) return fallback;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : fallback;
}

// --- Spaced repetition --------------------------------------------------
// A completed lesson enters a review schedule. Boxes widen the gap each
// successful review: review now -> +1d -> +3d -> +7d -> +16d -> +35d.
// This is what makes the material actually stick instead of being read once.
const REVIEWED_KEY = "python-mastery-reviewed";
const DAY = 86_400_000;
export const SRS_INTERVALS_DAYS = [1, 3, 7, 16, 35];

export interface ReviewState {
  at: string; // ISO of last review
  box: number; // 0..SRS_INTERVALS_DAYS.length-1
}

type StoredReview = string | ReviewState;

function normalize(v: StoredReview | undefined): ReviewState | null {
  if (!v) return null;
  if (typeof v === "string") return { at: v, box: 0 };
  if (typeof v.at === "string" && typeof v.box === "number") return v;
  return null;
}

export function getReviewedMap(): Record<string, ReviewState> {
  if (typeof window === "undefined") return {};
  const raw = safeJsonParse<Record<string, StoredReview>>(
    localStorage.getItem(REVIEWED_KEY),
    {},
  );
  const out: Record<string, ReviewState> = {};
  for (const [k, v] of Object.entries(raw)) {
    const n = normalize(v);
    if (n) out[k] = n;
  }
  return out;
}

export function isDue(slug: string, map = getReviewedMap()): boolean {
  const r = map[slug];
  if (!r) return true; // completed but never reviewed -> due now
  return Date.now() >= new Date(r.at).getTime() + SRS_INTERVALS_DAYS[r.box] * DAY;
}

export function getDueLessons(completedSlugs: string[]): string[] {
  const map = getReviewedMap();
  return completedSlugs.filter((s) => isDue(s, map));
}

// Only advances the box if the lesson was actually due. Casually reopening a
// not-yet-due lesson must not inflate the interval.
export function markReviewed(slug: string): void {
  if (typeof window === "undefined") return;
  const map = getReviewedMap();
  const cur = map[slug];
  if (cur && !isDue(slug, map)) return;
  const nextBox = cur ? Math.min(cur.box + 1, SRS_INTERVALS_DAYS.length - 1) : 0;
  map[slug] = { at: new Date().toISOString(), box: nextBox };
  safeSetItem(REVIEWED_KEY, JSON.stringify(map));
  window.dispatchEvent(new Event("reviewed-updated"));
}

// --- Module checkpoints -------------------------------------------------
// A checkpoint is the end-of-module quiz. Completing one awards XP and enters
// the same spaced-review schedule so it comes back for retrieval practice.
const CHECKPOINTS_KEY = "python-mastery-checkpoints";
const XP_KEY = "python-mastery-xp";
export const CHECKPOINT_XP = 30;

export function checkpointKey(moduleSlug: string): string {
  return `checkpoint:${moduleSlug}`;
}

export function getCompletedCheckpoints(): string[] {
  if (typeof window === "undefined") return [];
  return safeJsonParse<string[]>(localStorage.getItem(CHECKPOINTS_KEY), []);
}

export function isCheckpointCompleted(moduleSlug: string): boolean {
  return getCompletedCheckpoints().includes(moduleSlug);
}

// Caller must gate on learn mode; this writes unconditionally.
export function completeCheckpoint(moduleSlug: string): void {
  if (typeof window === "undefined") return;
  const done = getCompletedCheckpoints();
  if (done.includes(moduleSlug)) {
    // Re-doing a completed checkpoint counts as a spaced review.
    markReviewed(checkpointKey(moduleSlug));
    return;
  }
  safeSetItem(CHECKPOINTS_KEY, JSON.stringify([...done, moduleSlug]));
  const xp = safeReadNumber(localStorage.getItem(XP_KEY), 0);
  safeSetItem(XP_KEY, String(xp + CHECKPOINT_XP));
  markReviewed(checkpointKey(moduleSlug));
  window.dispatchEvent(new Event("checkpoints-updated"));
}
