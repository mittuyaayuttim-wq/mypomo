/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Goal,
  Language,
  MascotType,
  SessionRecord,
  Settings,
  SidebarTab,
  Theme,
  TimerMode,
  TimerState,
  UserPreferences,
} from './types';
import {
  addCompletedSession,
  calculateStreak,
  formatDate,
  loadDailyTarget,
  loadGoals,
  loadSessions,
  loadSettings,
  loadUserPrefs,
  resetAllStatistics,
  resetOnboardingState,
  saveDailyTarget,
  saveGoals,
  saveSettings,
  saveUserPrefs,
} from './utils/storage';
import { translations } from './utils/i18n';
import { playCompletionSound, playTapSound } from './utils/sound';
import { Mascot } from './components/Mascot';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Onboarding } from './components/Onboarding';
import { TimerControls } from './components/TimerControls';
import { Navbar } from './components/Navbar';
import { SidebarDrawer } from './components/SidebarDrawer';
import { SettingsModal } from './components/SettingsModal';
import { MascotSelector } from './components/MascotSelector';
import { Footer } from './components/Footer';
import { HelpModal } from './components/HelpModal';

export default function App() {
  // --- USER PREFERENCES & SETTINGS ---
  const [userPrefs, setUserPrefs] = useState<UserPreferences>(() => loadUserPrefs());
  const [settings, setSettings] = useState<Settings>(() => loadSettings());
  const [sessions, setSessions] = useState<SessionRecord[]>(() => loadSessions());
  const [goals, setGoals] = useState<Goal[]>(() => loadGoals());
  const [dailyTarget, setDailyTarget] = useState<number>(() => loadDailyTarget());

  // Screen flow: 'welcome' | 'onboarding' | 'dashboard'
  const [screen, setScreen] = useState<'welcome' | 'onboarding' | 'dashboard'>(() => {
    return userPrefs.onboardingDone ? 'dashboard' : 'welcome';
  });

  // Current translation dictionary
  const t = translations[settings.language] || translations.uz;

  // Modals & Drawers
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('calendar');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMascotSelectorOpen, setIsMascotSelectorOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Motivational Quote
  const [quoteIndex, setQuoteIndex] = useState(0);

  // --- TIMER STATE ---
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [completedFocusCount, setCompletedFocusCount] = useState(0);
  const [isCompletedCelebration, setIsCompletedCelebration] = useState(false);

  // Duration in seconds for current mode
  const getModeDurationSeconds = (m: TimerMode): number => {
    if (m === 'focus') return settings.focusMinutes * 60;
    if (m === 'short_break') return settings.shortBreakMinutes * 60;
    return settings.longBreakMinutes * 60;
  };

  const [totalDuration, setTotalDuration] = useState<number>(() => getModeDurationSeconds('focus'));
  const [timeLeft, setTimeLeft] = useState<number>(() => getModeDurationSeconds('focus'));

  // Target end time for accurate timestamp calculation across tab pauses
  const targetEndTimeRef = useRef<number | null>(null);

  // --- SYNC THEME WITH DOCUMENT ---
  useEffect(() => {
    const root = document.documentElement;
    const isDark =
      settings.theme === 'dark' ||
      (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  // When timer durations in settings change while idle, update timeLeft
  useEffect(() => {
    if (timerState === 'idle') {
      const dur = getModeDurationSeconds(mode);
      setTotalDuration(dur);
      setTimeLeft(dur);
    }
  }, [settings.focusMinutes, settings.shortBreakMinutes, settings.longBreakMinutes, mode, timerState]);

  // --- ACCURATE COUNTDOWN TIMER ENGINE ---
  useEffect(() => {
    if (timerState !== 'running') {
      targetEndTimeRef.current = null;
      return;
    }

    if (!targetEndTimeRef.current) {
      targetEndTimeRef.current = Date.now() + timeLeft * 1000;
    }

    const interval = setInterval(() => {
      if (!targetEndTimeRef.current) return;
      const remainingMs = targetEndTimeRef.current - Date.now();
      const nextSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

      setTimeLeft(nextSeconds);

      // Session finished!
      if (nextSeconds <= 0) {
        clearInterval(interval);
        handleSessionCompleted();
      }
    }, 250);

    return () => clearInterval(interval);
  }, [timerState, timeLeft, mode]);

  // Handle session completion logic
  const handleSessionCompleted = () => {
    targetEndTimeRef.current = null;

    // Play celebration sound if enabled
    if (settings.soundEnabled) {
      playCompletionSound(settings.soundVolume);
    }

    // Browser Notification
    if (settings.notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
      const notifTitle = mode === 'focus' ? t.sessionCompletedTitle : t.breakCompletedTitle;
      const notifMsg = mode === 'focus' ? t.sessionCompletedMsg : t.breakCompletedMsg;
      new Notification(notifTitle, {
        body: notifMsg,
        icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍅</text></svg>',
      });
    }

    if (mode === 'focus') {
      // Confetti & Mascot celebration
      setIsCompletedCelebration(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F05A50', '#F9DAD7', '#7CA982', '#FFD166'],
        });
      } catch {}

      setTimeout(() => setIsCompletedCelebration(false), 5000);

      // Record completed session to local storage
      const durationMin = settings.focusMinutes;
      const newRecord = addCompletedSession('focus', durationMin);
      setSessions((prev) => [newRecord, ...prev]);

      const nextCycle = completedFocusCount + 1;
      setCompletedFocusCount(nextCycle);

      // Determine next mode: Long break if threshold reached, else Short break
      const isLongBreakTime = nextCycle % settings.longBreakInterval === 0;
      const nextMode: TimerMode = isLongBreakTime ? 'long_break' : 'short_break';

      setMode(nextMode);
      const nextDur = getModeDurationSeconds(nextMode);
      setTotalDuration(nextDur);
      setTimeLeft(nextDur);

      if (settings.autoStartBreaks) {
        setTimerState('running');
      } else {
        setTimerState('idle');
      }
    } else {
      // Break finished, transition back to focus mode
      setMode('focus');
      const nextDur = getModeDurationSeconds('focus');
      setTotalDuration(nextDur);
      setTimeLeft(nextDur);

      if (settings.autoStartFocus) {
        setTimerState('running');
      } else {
        setTimerState('idle');
      }
    }
  };

  // --- TIMER CONTROLS ---
  const handleStartTimer = () => {
    setTimerState('running');
    targetEndTimeRef.current = Date.now() + timeLeft * 1000;
  };

  const handlePauseTimer = () => {
    setTimerState('paused');
    targetEndTimeRef.current = null;
  };

  const handleResetTimer = () => {
    setTimerState('idle');
    targetEndTimeRef.current = null;
    const dur = getModeDurationSeconds(mode);
    setTimeLeft(dur);
    setTotalDuration(dur);
  };

  const handleSkipTimer = () => {
    targetEndTimeRef.current = null;
    if (mode === 'focus') {
      const nextCycle = completedFocusCount + 1;
      setCompletedFocusCount(nextCycle);
      const isLongBreak = nextCycle % settings.longBreakInterval === 0;
      const nextMode: TimerMode = isLongBreak ? 'long_break' : 'short_break';
      setMode(nextMode);
      const dur = getModeDurationSeconds(nextMode);
      setTotalDuration(dur);
      setTimeLeft(dur);
    } else {
      setMode('focus');
      const dur = getModeDurationSeconds('focus');
      setTotalDuration(dur);
      setTimeLeft(dur);
    }
    setTimerState('idle');
  };

  const handleModeChange = (newMode: TimerMode) => {
    targetEndTimeRef.current = null;
    setMode(newMode);
    setTimerState('idle');
    const dur = getModeDurationSeconds(newMode);
    setTotalDuration(dur);
    setTimeLeft(dur);
  };

  // --- USER ONBOARDING COMPLETION ---
  const handleOnboardingComplete = (prefs: UserPreferences) => {
    saveUserPrefs(prefs);
    setUserPrefs(prefs);
    setScreen('dashboard');
  };

  // --- STATS CALCULATIONS FOR DASHBOARD ---
  const todayStr = formatDate(new Date());
  const todaySessions = sessions.filter((s) => s.dateStr === todayStr && s.mode === 'focus');
  const todayCount = todaySessions.length;
  const streak = calculateStreak(sessions);

  // Personalized Greeting
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? t.greetingMorning
      : currentHour < 18
      ? t.greetingAfternoon
      : t.greetingEvening;

  const goalSubtitle =
    userPrefs.mainGoal === 'work'
      ? t.goalSub_work
      : userPrefs.mainGoal === 'habits'
      ? t.goalSub_habits
      : t.goalSub_study;

  // Shuffle quotes
  const currentQuote = t.quotes[quoteIndex % t.quotes.length];
  const handleNextQuote = () => {
    playTapSound(0.2);
    setQuoteIndex((prev) => (prev + 1) % t.quotes.length);
  };

  // --- GOAL ACTIONS ---
  const handleAddGoal = (g: Goal) => {
    const updated = [g, ...goals];
    setGoals(updated);
    saveGoals(updated);
  };

  const handleUpdateGoal = (g: Goal) => {
    const updated = goals.map((item) => (item.id === g.id ? g : item));
    setGoals(updated);
    saveGoals(updated);
  };

  const handleDeleteGoal = (id: string) => {
    const updated = goals.filter((item) => item.id !== id);
    setGoals(updated);
    saveGoals(updated);
  };

  const handleUpdateDailyTarget = (newTarget: number) => {
    setDailyTarget(newTarget);
    saveDailyTarget(newTarget);
  };

  // --- SETTINGS ACTIONS ---
  const handleUpdateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleResetStatistics = () => {
    resetAllStatistics();
    setSessions([]);
    setCompletedFocusCount(0);
  };

  const handleResetOnboarding = () => {
    resetOnboardingState();
    setUserPrefs({ bestTime: '', mainGoal: '', onboardingDone: false });
    setIsSettingsOpen(false);
    setIsHelpOpen(false);
    setScreen('onboarding');
  };

  // Progress ratio 0..1 for the mascot & staircase animation
  const progressRatio = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;

  // --- 1. WELCOME SCREEN ---
  if (screen === 'welcome') {
    return (
      <WelcomeScreen
        onEnter={() => setScreen('onboarding')}
        language={settings.language}
        onLanguageChange={(lang) => handleUpdateSettings({ ...settings, language: lang })}
      />
    );
  }

  // --- 2. ONBOARDING SCREEN ---
  if (screen === 'onboarding') {
    return (
      <Onboarding
        language={settings.language}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  // --- 3. MAIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#FFF8EF] dark:bg-[#1E1B18] text-[#3D3A38] dark:text-[#E8E2D9] flex flex-col justify-between select-none transition-colors duration-300 relative overflow-x-hidden">
      {/* Subtle background ambient decorations */}
      <div className="absolute top-20 left-6 text-xl text-[#F9DAD7] dark:text-[#382E2B] select-none animate-pulse">
        ✦
      </div>
      <div className="absolute top-44 right-8 text-sm text-[#F9DAD7] dark:text-[#382E2B] select-none">
        ★
      </div>
      <div className="absolute bottom-40 left-12 text-2xl text-[#F9DAD7] dark:text-[#382E2B] select-none">
        ✦
      </div>

      {/* Top Navigation Bar */}
      <Navbar
        streak={streak}
        mascot={settings.mascot}
        language={settings.language}
        theme={settings.theme}
        onOpenMenu={() => setIsSidebarOpen(true)}
        onOpenMascotSelector={() => setIsMascotSelectorOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleTheme={() => {
          const next = settings.theme === 'dark' ? 'light' : 'dark';
          handleUpdateSettings({ ...settings, theme: next });
        }}
        onSelectLanguage={(lang) => handleUpdateSettings({ ...settings, language: lang })}
      />

      {/* Main Center Content */}
      <main className="w-full max-w-xl mx-auto px-4 sm:px-6 py-2 sm:py-4 flex flex-col items-center flex-1">
        {/* Personalized Welcome & Goal Banner */}
        <div className="w-full text-center space-y-1 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#352D29] dark:text-[#F3EDE6] tracking-tight">
            {greeting}
          </h2>
          <p className="text-xs sm:text-sm text-[#87786E] dark:text-[#A89D93] max-w-sm mx-auto leading-relaxed">
            {goalSubtitle}
          </p>

          {/* Daily Progress Pip */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="text-xs font-semibold text-[#8C7D73] dark:text-[#A69B92]">
              {t.dailyProgress}: {todayCount} / {dailyTarget} {t.pomodoros}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: dailyTarget }).map((_, idx) => (
                <span
                  key={idx}
                  className={`text-sm transition-transform duration-200 ${
                    idx < todayCount ? 'scale-110 drop-shadow-xs' : 'opacity-25 grayscale'
                  }`}
                >
                  🍅
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mascot Center Stage with 5-Step Staircase & Clock on Belly */}
        <div className="my-2 relative flex flex-col items-center justify-center">
          <Mascot
            type={settings.mascot}
            mode={mode}
            progress={progressRatio}
            isCompleted={isCompletedCelebration}
            size="lg"
          />

          {/* Quick Mascot Switch link */}
          <button
            type="button"
            onClick={() => {
              playTapSound(0.2);
              setIsMascotSelectorOpen(true);
            }}
            className="text-[11px] font-semibold text-[#9C8C80] dark:text-[#8E8278] hover:text-[#F05A50] mt-1 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{t.changeMascot}</span>
            <span>⇄</span>
          </button>
        </div>

        {/* Functional Pomodoro Timer Controls */}
        <div className="w-full mt-2">
          <TimerControls
            mode={mode}
            state={timerState}
            timeLeft={timeLeft}
            totalDuration={totalDuration}
            completedCycles={completedFocusCount}
            longBreakInterval={settings.longBreakInterval}
            language={settings.language}
            onModeChange={handleModeChange}
            onStart={handleStartTimer}
            onPause={handlePauseTimer}
            onReset={handleResetTimer}
            onSkip={handleSkipTimer}
          />
        </div>

        {/* Daily Motivational Quote Card */}
        <div className="w-full max-w-sm mt-6 p-4 rounded-2xl bg-white/70 dark:bg-[#28221E]/80 border border-[#EFE2D4] dark:border-[#382F2A] shadow-xs flex items-center justify-between gap-3 text-left">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">✨</span>
            <p className="text-xs text-[#5D5048] dark:text-[#D5C9BE] italic font-medium leading-relaxed">
              "{currentQuote}"
            </p>
          </div>
          <button
            type="button"
            onClick={handleNextQuote}
            className="w-7 h-7 rounded-lg text-[#9C8C80] hover:text-[#F05A50] hover:bg-[#FAF3EA] dark:hover:bg-[#342C27] flex items-center justify-center text-xs shrink-0 cursor-pointer"
            title="Next quote"
          >
            ↻
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer language={settings.language} onOpenHelp={() => setIsHelpOpen(true)} />

      {/* --- SIDEBAR DRAWER (Calendar, Stats, Goals) --- */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        activeTab={sidebarTab}
        onTabChange={setSidebarTab}
        onClose={() => setIsSidebarOpen(false)}
        sessions={sessions}
        goals={goals}
        dailyTarget={dailyTarget}
        onUpdateDailyTarget={handleUpdateDailyTarget}
        onAddGoal={handleAddGoal}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={handleDeleteGoal}
        language={settings.language}
      />

      {/* --- SETTINGS MODAL --- */}
      <SettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        onClose={() => setIsSettingsOpen(false)}
        onUpdateSettings={handleUpdateSettings}
        onResetStatistics={handleResetStatistics}
        onResetOnboarding={handleResetOnboarding}
      />

      {/* --- MASCOT SELECTOR MODAL --- */}
      {isMascotSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none animate-fadeIn">
          <div className="bg-[#FFFDFB] dark:bg-[#231D1A] w-full max-w-lg p-5 rounded-3xl border border-[#EFE2D4] dark:border-[#382F2A] shadow-2xl">
            <MascotSelector
              currentMascot={settings.mascot}
              onSelectMascot={(m) => {
                handleUpdateSettings({ ...settings, mascot: m });
                setIsMascotSelectorOpen(false);
              }}
              language={settings.language}
              onClose={() => setIsMascotSelectorOpen(false)}
            />
          </div>
        </div>
      )}

      {/* --- HELP / TIPS MODAL --- */}
      <HelpModal
        isOpen={isHelpOpen}
        language={settings.language}
        onClose={() => setIsHelpOpen(false)}
        onRetakeOnboarding={handleResetOnboarding}
      />
    </div>
  );
}
