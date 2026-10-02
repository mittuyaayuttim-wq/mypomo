import React, { useState } from 'react';
import { Language, UserPreferences } from '../types';
import { translations } from '../utils/i18n';
import { playTapSound } from '../utils/sound';

interface OnboardingProps {
  language: Language;
  onComplete: (prefs: UserPreferences) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ language, onComplete }) => {
  const t = translations[language] || translations.uz;

  const [step, setStep] = useState<1 | 2>(1);
  const [bestTime, setBestTime] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [mainGoal, setMainGoal] = useState<'study' | 'work' | 'habits'>('study');

  const handleNext = () => {
    playTapSound(0.4);
    if (step === 1) {
      setStep(2);
    } else {
      onComplete({
        bestTime,
        mainGoal,
        onboardingDone: true,
      });
    }
  };

  const handleBack = () => {
    playTapSound(0.3);
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF8EF] dark:bg-[#1E1B18] text-[#3D3A38] dark:text-[#E8E2D9] flex flex-col items-center justify-between p-6 sm:p-10 select-none transition-colors duration-300">
      {/* Top Header & Progress Indicator */}
      <div className="w-full max-w-lg mx-auto">
        <div className="flex items-center justify-between text-xs font-medium text-[#8D7F75] dark:text-[#A69B92] mb-2">
          <span className="font-semibold text-[#F05A50]">
            {t.appName} · {t.onboardingStep} {step} / 2
          </span>
          <span>{step === 1 ? '50%' : '100%'}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#F3E6D8] dark:bg-[#342D29] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#F05A50] rounded-full transition-all duration-500 ease-out"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-md my-auto py-6 flex flex-col items-center">
        {step === 1 ? (
          <div className="w-full space-y-6">
            <div className="text-center space-y-2">
              <span className="text-3xl">⏰</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#332A26] dark:text-[#F3EDE6]">
                {t.q1Title}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {[
                { key: 'morning', label: t.q1_morning, icon: '🌅' },
                { key: 'afternoon', label: t.q1_afternoon, icon: '☀️' },
                { key: 'evening', label: t.q1_evening, icon: '🌙' },
              ].map((option) => {
                const isSelected = bestTime === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => {
                      playTapSound(0.2);
                      setBestTime(option.key as 'morning' | 'afternoon' | 'evening');
                    }}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F05A50] text-white shadow-md shadow-[#F05A50]/20 ring-2 ring-[#F05A50] scale-[1.02]'
                        : 'bg-white dark:bg-[#282320] border border-[#EEDFD1] dark:border-[#3E3632] hover:border-[#F05A50]/50 text-[#3D3A38] dark:text-[#E8E2D9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-semibold text-base sm:text-lg">{option.label}</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'border-white bg-white/20 text-white'
                          : 'border-[#D5C4B4] dark:border-[#524944]'
                      }`}
                    >
                      {isSelected && <span className="text-xs">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full space-y-6">
            <div className="text-center space-y-2">
              <span className="text-3xl">🌱</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#332A26] dark:text-[#F3EDE6]">
                {t.q2Title}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {[
                { key: 'study', label: t.q2_study, icon: '📚' },
                { key: 'work', label: t.q2_work, icon: '💻' },
                { key: 'habits', label: t.q2_habits, icon: '🌱' },
              ].map((option) => {
                const isSelected = mainGoal === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => {
                      playTapSound(0.2);
                      setMainGoal(option.key as 'study' | 'work' | 'habits');
                    }}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F05A50] text-white shadow-md shadow-[#F05A50]/20 ring-2 ring-[#F05A50] scale-[1.02]'
                        : 'bg-white dark:bg-[#282320] border border-[#EEDFD1] dark:border-[#3E3632] hover:border-[#F05A50]/50 text-[#3D3A38] dark:text-[#E8E2D9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-semibold text-base sm:text-lg">{option.label}</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'border-white bg-white/20 text-white'
                          : 'border-[#D5C4B4] dark:border-[#524944]'
                      }`}
                    >
                      {isSelected && <span className="text-xs">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Controls */}
      <div className="w-full max-w-md flex items-center justify-between gap-4">
        {step === 2 ? (
          <button
            type="button"
            onClick={handleBack}
            className="py-3 px-5 rounded-xl border border-[#E2D2C2] dark:border-[#423A36] text-[#786D65] dark:text-[#ABA097] hover:bg-[#F5E8DB] dark:hover:bg-[#2E2825] font-semibold text-sm transition-colors cursor-pointer"
          >
            ← {t.btnBack}
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={handleNext}
          className="ml-auto py-3.5 px-8 rounded-xl bg-[#F05A50] hover:bg-[#E0493F] active:scale-[0.98] text-white font-bold text-base shadow-md shadow-[#F05A50]/20 transition-all cursor-pointer"
        >
          {step === 1 ? t.btnNext : t.btnStart} →
        </button>
      </div>
    </div>
  );
};
