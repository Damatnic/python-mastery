export function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeReadNumber(raw: string | null, fallback = 0): number {
  if (raw === null) return fallback;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : fallback;
}

const REVIEWED_KEY = "python-mastery-reviewed";

export function getReviewedMap(): Record<string, string> {
  if (typeof window === "undefined") return {};
  return safeJsonParse<Record<string, string>>(localStorage.getItem(REVIEWED_KEY), {});
}

export function markReviewed(slug: string): void {
  if (typeof window === "undefined") return;
  const map = getReviewedMap();
  map[slug] = new Date().toISOString();
  localStorage.setItem(REVIEWED_KEY, JSON.stringify(map));
  window.dispatchEvent(new Event("reviewed-updated"));
}
