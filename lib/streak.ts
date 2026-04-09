/**
 * Streak Tracking System
 * Tracks consecutive days of learning activity
 */

const STREAK_KEY = "python-mastery-streak";
const LAST_ACTIVE_KEY = "python-mastery-last-active";

export interface StreakData {
  currentStreak: number;
  lastActiveDate: string | null;
}

/**
 * Gets the current date in YYYY-MM-DD format (local time)
 */
function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/**
 * Calculates the difference in days between two date strings
 */
function getDaysDifference(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Gets the current streak data from localStorage
 */
export function getStreakData(): StreakData {
  if (typeof window === "undefined") {
    return { currentStreak: 0, lastActiveDate: null };
  }

  const streakStr = localStorage.getItem(STREAK_KEY);
  const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);

  const currentStreak = streakStr ? parseInt(streakStr, 10) : 0;

  // Check if streak is still valid
  if (lastActive) {
    const today = getTodayString();
    const daysDiff = getDaysDifference(lastActive, today);

    // If more than 1 day has passed, streak is broken
    if (daysDiff > 1) {
      return { currentStreak: 0, lastActiveDate: lastActive };
    }
  }

  return { currentStreak, lastActiveDate: lastActive };
}

/**
 * Updates the streak when a lesson is completed
 * Call this when the user completes a lesson
 */
export function updateStreak(): StreakData {
  if (typeof window === "undefined") {
    return { currentStreak: 0, lastActiveDate: null };
  }

  const today = getTodayString();
  const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
  let currentStreak = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);

  if (!lastActive) {
    // First lesson ever - start streak at 1
    currentStreak = 1;
  } else {
    const daysDiff = getDaysDifference(lastActive, today);

    if (daysDiff === 0) {
      // Same day - streak stays the same (already counted today)
      // No change needed
    } else if (daysDiff === 1) {
      // Consecutive day - increment streak
      currentStreak += 1;
    } else {
      // Streak broken - restart at 1
      currentStreak = 1;
    }
  }

  // Save updated values
  localStorage.setItem(STREAK_KEY, String(currentStreak));
  localStorage.setItem(LAST_ACTIVE_KEY, today);

  // Dispatch event for UI updates
  window.dispatchEvent(new Event("streak-updated"));

  return { currentStreak, lastActiveDate: today };
}

/**
 * Gets just the current streak count
 */
export function getCurrentStreak(): number {
  return getStreakData().currentStreak;
}

/**
 * Checks if the user has been active today
 */
export function isActiveToday(): boolean {
  if (typeof window === "undefined") return false;

  const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
  if (!lastActive) return false;

  return lastActive === getTodayString();
}
