import { Goal, Language, MascotType, SessionRecord, Settings, Theme, UserPreferences } from '../types';

const STORAGE_KEYS = {
  PREFS: 'mypomo_user_prefs_v1',
  SETTINGS: 'mypomo_settings_v1',
  SESSIONS: 'mypomo_sessions_v1',
  GOALS: 'mypomo_goals_v1',
  DAILY_TARGET: 'mypomo_daily_target_v1',
  LAST_QUOTE_IDX: 'mypomo_quote_idx_v1',
};

export const DEFAULT_PREFS: UserPreferences = {
  bestTime: '',
  mainGoal: '',
  onboardingDone: false,
};

export const DEFAULT_SETTINGS: Settings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakInterval: 4,
  soundEnabled: true,
  soundVolume: 0.7,
  autoStartBreaks: false,
  autoStartFocus: false,
  notificationsEnabled: false,
  theme: 'light',
  language: 'uz', // Default language per requirement is Uzbek!
  mascot: 'tomato',
};

export const DEFAULT_DAILY_TARGET = 4;

export const DEFAULT_GOALS: Goal[] = [
  {
    id: 'g-1',
    title: 'Darslarni reja asosida o\'qish',
    targetPomodoros: 4,
    completedPomodoros: 2,
    completed: false,
    category: 'study',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'g-2',
    title: 'Kitob mutolaasi (20 sahifa)',
    targetPomodoros: 2,
    completedPomodoros: 2,
    completed: true,
    category: 'habits',
    createdAt: new Date().toISOString(),
  },
];

// Helper to format YYYY-MM-DD
export function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Generate realistic starter sessions for recent days so stats and calendar are delightfully populated
function getInitialSeedSessions(): SessionRecord[] {
  const list: SessionRecord[] = [];
  const now = new Date();

  // Create friendly recent sessions over the past 4 days
  const pastDays = [3, 2, 1, 0];
  const counts = [3, 4, 4, 2];

  pastDays.forEach((offset, idx) => {
    const d = new Date(now);
    d.setDate(now.getDate() - offset);
    const dateStr = formatDate(d);
    const count = counts[idx];

    for (let i = 0; i < count; i++) {
      const hour = 9 + i * 2;
      list.push({
        id: `seed-${dateStr}-${i}`,
        timestamp: new Date(d.setHours(hour, 15, 0, 0)).getTime(),
        dateStr,
        durationMinutes: 25,
        mode: 'focus',
        hourOfDay: hour,
      });
    }
  });

  return list;
}

export function loadUserPrefs(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user prefs', e);
  }
  return DEFAULT_PREFS;
}

export function saveUserPrefs(prefs: UserPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(prefs));
  } catch (e) {
    console.error('Failed to save user prefs', e);
  }
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load settings', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export function loadSessions(): SessionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load sessions', e);
  }
  const initial = getInitialSeedSessions();
  saveSessions(initial);
  return initial;
}

export function saveSessions(sessions: SessionRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (e) {
    console.error('Failed to save sessions', e);
  }
}

export function addCompletedSession(mode: 'focus' | 'short_break' | 'long_break', durationMinutes: number): SessionRecord {
  const sessions = loadSessions();
  const now = new Date();
  const newRecord: SessionRecord = {
    id: `sess-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: now.getTime(),
    dateStr: formatDate(now),
    durationMinutes,
    mode,
    hourOfDay: now.getHours(),
  };

  const updated = [newRecord, ...sessions];
  saveSessions(updated);
  return newRecord;
}

export function loadGoals(): Goal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GOALS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load goals', e);
  }
  return DEFAULT_GOALS;
}

export function saveGoals(goals: Goal[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  } catch (e) {
    console.error('Failed to save goals', e);
  }
}

export function loadDailyTarget(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_TARGET);
    if (raw) {
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load daily target', e);
  }
  return DEFAULT_DAILY_TARGET;
}

export function saveDailyTarget(target: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_TARGET, target.toString());
  } catch (e) {
    console.error('Failed to save daily target', e);
  }
}

/**
 * Calculates current streak in days (consecutive days with at least 1 focus session,
 * counting backwards from today or yesterday).
 */
export function calculateStreak(sessions: SessionRecord[]): number {
  const focusSessions = sessions.filter((s) => s.mode === 'focus');
  if (focusSessions.length === 0) return 0;

  const datesWithFocus = new Set(focusSessions.map((s) => s.dateStr));
  const todayStr = formatDate(new Date());

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDate(yesterday);

  let current = new Date();
  // If user completed today, streak starts today; if not yet today, check if yesterday was completed
  if (!datesWithFocus.has(todayStr)) {
    if (!datesWithFocus.has(yesterdayStr)) {
      return 0;
    }
    current = yesterday;
  }

  let streak = 0;
  while (true) {
    const dateStr = formatDate(current);
    if (datesWithFocus.has(dateStr)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Reset all user sessions and statistics.
 */
export function resetAllStatistics(): void {
  saveSessions([]);
}

/**
 * Reset onboarding state.
 */
export function resetOnboardingState(): void {
  saveUserPrefs({
    bestTime: '',
    mainGoal: '',
    onboardingDone: false,
  });
}
