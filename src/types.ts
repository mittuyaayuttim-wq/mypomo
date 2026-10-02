export type TimerMode = 'focus' | 'short_break' | 'long_break';
export type TimerState = 'idle' | 'running' | 'paused';
export type Language = 'uz' | 'en' | 'ru' | 'tr' | 'ko';
export type Theme = 'light' | 'dark' | 'system';
export type MascotType = 'tomato' | 'strawberry' | 'cherry' | 'peach' | 'green_tomato';

export interface UserPreferences {
  bestTime: 'morning' | 'afternoon' | 'evening' | '';
  mainGoal: 'study' | 'work' | 'habits' | '';
  onboardingDone: boolean;
}

export interface Settings {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number;
  soundEnabled: boolean;
  soundVolume: number;
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
  notificationsEnabled: boolean;
  theme: Theme;
  language: Language;
  mascot: MascotType;
}

export interface SessionRecord {
  id: string;
  timestamp: number;
  dateStr: string; // YYYY-MM-DD
  durationMinutes: number;
  mode: TimerMode;
  hourOfDay: number;
}

export interface Goal {
  id: string;
  title: string;
  targetPomodoros: number;
  completedPomodoros: number;
  completed: boolean;
  category: string;
  createdAt: string;
}

export type SidebarTab = 'calendar' | 'statistics' | 'goals';
