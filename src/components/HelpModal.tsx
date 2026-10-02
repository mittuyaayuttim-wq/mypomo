import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { playTapSound } from '../utils/sound';

interface HelpModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onRetakeOnboarding: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  language,
  onClose,
  onRetakeOnboarding,
}) => {
  const t = translations[language] || translations.uz;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none animate-fadeIn">
      <div className="bg-[#FFFDFB] dark:bg-[#231D1A] w-full max-w-md p-6 rounded-3xl border border-[#EFE2D4] dark:border-[#382F2A] shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#F4E8DC] dark:border-[#382F2A]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍅</span>
            <h3 className="text-lg font-bold text-[#352D29] dark:text-[#F3EDE6]">
              {t.helpTip}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              playTapSound(0.2);
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#FAF5EE] dark:bg-[#342C27] text-[#7A6C63] hover:text-[#F05A50]"
          >
            ✕
          </button>
        </div>

        {/* Tips list */}
        <div className="space-y-3">
          {t.quickTips.map((tip, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#FAF5EE] dark:bg-[#2C2420] text-xs sm:text-sm text-[#4A3E37] dark:text-[#DDD1C5] flex items-start gap-3"
            >
              <span className="w-5 h-5 rounded-full bg-[#F05A50] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>

        {/* Re-take questionnaire link */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              playTapSound(0.3);
              onRetakeOnboarding();
            }}
            className="text-xs text-[#F05A50] hover:underline font-semibold cursor-pointer"
          >
            {t.resetOnboarding}
          </button>

          <button
            type="button"
            onClick={() => {
              playTapSound(0.2);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#F05A50] text-white text-xs font-bold hover:bg-[#DE493F] cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
