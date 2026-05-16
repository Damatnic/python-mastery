import { isShowcase } from "@/lib/mode";

const STREAK_KEY = "python-mastery-streak";
const LAST_ACTIVE_KEY = "python-mastery-last-active";
const MAX_STREAK_KEY = "python-mastery-max-streak";

export interface StreakData {
  currentStreak: number;
  lastActiveDate: string | null;
  maxStreak: number;
}

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function getDaysDifference(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function readMaxStreak(): number {
  return parseInt(localStorage.getItem(MAX_STREAK_KEY) || "0", 10);
}

export function getStreakData(): StreakData {
  if (typeof window === "undefined") {
    return { currentStreak: 0, lastActiveDate: null, maxStreak: 0 };
  }

  const streakStr = localStorage.getItem(STREAK_KEY);
  const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
  const maxStreak = readMaxStreak();

  const currentStreak = streakStr ? parseInt(streakStr, 10) : 0;

  if (lastActive) {
    const today = getTodayString();
    const daysDiff = getDaysDifference(lastActive, today);

    if (daysDiff > 1) {
      return { currentStreak: 0, lastActiveDate: lastActive, maxStreak };
    }
  }

  return { currentStreak, lastActiveDate: lastActive, maxStreak };
}

export function updateStreak(): StreakData {
  if (typeof window === "undefined" || isShowcase()) {
    return { currentStreak: 0, lastActiveDate: null, maxStreak: 0 };
  }

  const today = getTodayString();
  const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
  let currentStreak = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);

  if (!lastActive) {
    currentStreak = 1;
  } else {
    const daysDiff = getDaysDifference(lastActive, today);

    if (daysDiff === 0) {
      // same day, no change
    } else if (daysDiff === 1) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }
  }

  const newMax = Math.max(readMaxStreak(), currentStreak);

  localStorage.setItem(STREAK_KEY, String(currentStreak));
  localStorage.setItem(LAST_ACTIVE_KEY, today);
  localStorage.setItem(MAX_STREAK_KEY, String(newMax));

  window.dispatchEvent(new Event("streak-updated"));

  return { currentStreak, lastActiveDate: today, maxStreak: newMax };
}

export function getCurrentStreak(): number {
  return getStreakData().currentStreak;
}

export function isActiveToday(): boolean {
  if (typeof window === "undefined") return false;

  const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
  if (!lastActive) return false;

  return lastActive === getTodayString();
}

export interface Rank {
  name: string;
  threshold: number;
  blurb: string;
}

const RANKS: Rank[] = [
  { name: "script kid", threshold: 0, blurb: "variables, loops, functions. you read errors instead of panicking." },
  { name: "pandas reader", threshold: 100, blurb: "DataFrame, Series, .loc/.iloc. you stop reaching for Excel for everything." },
  { name: "cleaner", threshold: 500, blurb: "NaN handling, type coercion, dedup, datetime parsing. you trust the data you ship." },
  { name: "groupby fluent", threshold: 1500, blurb: "groupby + agg, merge, pivot. you reshape without printing the intermediate frame ten times." },
  { name: "pipeline operator", threshold: 4000, blurb: "all lessons cleared. you write functions that take a frame and return a frame and that's the whole job." },
];

export function getRank(xp: number): Rank {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.threshold) current = r;
  }
  return current;
}

export function getRankLadder(): Rank[] {
  return RANKS;
}
