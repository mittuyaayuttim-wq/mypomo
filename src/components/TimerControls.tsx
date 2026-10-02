import React from 'react';
import { Language, TimerMode, TimerState } from '../types';
import { translations } from '../utils/i18n';
import { playTapSound } from '../utils/sound';

interface TimerControlsProps {
  mode: TimerMode;
  state: TimerState;
  timeLeft: number; // in seconds
  totalDuration: number; // in seconds
  completedCycles: number;
  longBreakInterval: number;
  language: Language;
  onModeChange: (newMode: TimerMode) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  mode,
  state,
  timeLeft,
  totalDuration,
  completedCycles,
  longBreakInterval,
  language,
  onModeChange,
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  const t = translations[language] || translations.uz;

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Progress for circle & bar: 0 (start) to 1 (done)
  const progressRatio = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;
  const clampedProgress = Math.max(0, Math.min(1, progressRatio));

  // Circular indicator constants (radius 75)
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - clampedProgress * circumference;

  const handleTabClick = (newMode: TimerMode) => {
    if (newMode !== mode) {
      playTapSound(0.3);
      onModeChange(newMode);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto select-none">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center p-1 bg-[#F5EADB] dark:bg-[#28221E] border border-[#E9DACB] dark:border-[#3A322C] rounded-2xl mb-6 shadow-inner">
        <button
          type="button"
          onClick={() => handleTabClick('focus')}
          className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
            mode === 'focus'
              ? 'bg-[#F05A50] text-white shadow-sm'
              : 'text-[#7D6F66] dark:text-[#A89D93] hover:text-[#F05A50]'
          }`}
        >
          {t.modeFocus}
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('short_break')}
          className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
            mode === 'short_break'
              ? 'bg-[#7CA982] text-white shadow-sm'
              : 'text-[#7D6F66] dark:text-[#A89D93] hover:text-[#7CA982]'
          }`}
        >
          {t.modeShortBreak}
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('long_break')}
          className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
            mode === 'long_break'
              ? 'bg-[#E08D79] text-white shadow-sm'
              : 'text-[#7D6F66] dark:text-[#A89D93] hover:text-[#E08D79]'
          }`}
        >
          {t.modeLongBreak}
        </button>
      </div>

      {/* Large Countdown with Circular Progress Ring */}
      <div className="relative flex items-center justify-center my-2">
        <svg className="w-56 h-56 sm:w-64 sm:h-64 -rotate-90 transform" viewBox="0 0 180 180">
          {/* Background track circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            className="stroke-[#F5E8DC] dark:stroke-[#312A26]"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress stroke */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            className={`transition-[stroke-dashoffset] duration-500 ease-out ${
              mode === 'focus'
                ? 'stroke-[#F05A50]'
                : mode === 'short_break'
                ? 'stroke-[#7CA982]'
                : 'stroke-[#E08D79]'
            }`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Digital Time Inside Ring */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-5xl sm:text-6xl font-black tracking-tight tabular-nums text-[#362D2A] dark:text-[#F4EDE5] font-['Nunito',sans-serif]">
            {timeFormatted}
          </span>
          <span className="text-xs uppercase tracking-widest font-semibold mt-1 text-[#98887D] dark:text-[#8E837A]">
            {mode === 'focus' ? t.modeFocus : mode === 'short_break' ? t.modeShortBreak : t.modeLongBreak}
          </span>

          {/* Cycle indicators (e.g. 4 dots before long break) */}
          <div className="flex items-center gap-1.5 mt-3">
            {Array.from({ length: longBreakInterval }).map((_, idx) => {
              const isFilled = idx < completedCycles % longBreakInterval;
              return (
                <div
                  key={idx}
                  title={`Session ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isFilled
                      ? 'bg-[#F05A50] scale-110 shadow-xs'
                      : 'bg-[#EAD8C7] dark:bg-[#3E342F]'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Action Buttons */}
      <div className="flex items-center justify-center gap-3 w-full mt-6">
        {/* Reset button */}
        <button
          type="button"
          onClick={() => {
            playTapSound(0.2);
            onReset();
          }}
          title={t.btnResetTimer}
          aria-label={t.btnResetTimer}
          className="w-12 h-12 rounded-2xl bg-white dark:bg-[#28221E] border border-[#E8D9CB] dark:border-[#3D352F] text-[#7A6C63] dark:text-[#B3A79E] hover:text-[#F05A50] hover:border-[#F05A50]/40 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {/* Primary Start / Pause button */}
        {state === 'running' ? (
          <button
            type="button"
            onClick={() => {
              playTapSound(0.4);
              onPause();
            }}
            className="flex-1 max-w-[170px] h-14 rounded-2xl bg-[#E08D79] hover:bg-[#D57E6A] text-white font-bold text-lg shadow-md shadow-[#E08D79]/25 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
            <span>{t.btnPauseTimer}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              playTapSound(0.4);
              onStart();
            }}
            className="flex-1 max-w-[170px] h-14 rounded-2xl bg-[#F05A50] hover:bg-[#DE493F] text-white font-bold text-lg shadow-md shadow-[#F05A50]/25 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>{state === 'paused' ? t.btnResumeTimer : t.btnStartTimer}</span>
          </button>
        )}

        {/* Skip button */}
        <button
          type="button"
          onClick={() => {
            playTapSound(0.2);
            onSkip();
          }}
          title={t.btnSkipTimer}
          aria-label={t.btnSkipTimer}
          className="w-12 h-12 rounded-2xl bg-white dark:bg-[#28221E] border border-[#E8D9CB] dark:border-[#3D352F] text-[#7A6C63] dark:text-[#B3A79E] hover:text-[#F05A50] hover:border-[#F05A50]/40 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
