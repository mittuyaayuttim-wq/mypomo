import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { playTapSound } from '../utils/sound';

interface WelcomeScreenProps {
  onEnter: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onEnter,
  language,
  onLanguageChange,
}) => {
  const t = translations[language] || translations.uz;

  const handleStart = () => {
    playTapSound(0.5);
    onEnter();
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF8EF] dark:bg-[#1E1B18] text-[#3D3A38] dark:text-[#E8E2D9] flex flex-col items-center justify-between p-6 sm:p-10 relative overflow-hidden select-none transition-colors duration-300">
      {/* Soft decorative background circles & stars */}
      <div className="absolute top-12 left-10 text-xl text-[#F9DAD7] dark:text-[#382E2B] select-none animate-pulse">
        ✦
      </div>
      <div className="absolute top-36 right-12 text-lg text-[#F9DAD7] dark:text-[#382E2B] select-none">
        ★
      </div>
      <div className="absolute bottom-28 left-16 text-2xl text-[#F9DAD7] dark:text-[#382E2B] select-none">
        ✦
      </div>
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#F9DAD7]/40 dark:bg-[#2C2422]/30 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#F5E5D8]/50 dark:bg-[#2C2422]/20 blur-3xl pointer-events-none" />

      {/* Top Bar with Language Selector */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#A8988D] dark:text-[#8C8077] uppercase">
          <span>mypomo</span>
          <span aria-hidden="true">·</span>
          <span>mindful rhythm</span>
        </div>

        {/* Language switch buttons */}
        <div className="flex items-center gap-1 bg-[#FAF3EA] dark:bg-[#2A2522] border border-[#EFE4D6] dark:border-[#3D3631] rounded-full p-1 text-xs">
          {(['uz', 'en', 'ru', 'tr', 'ko'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => onLanguageChange(l)}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                language === l
                  ? 'bg-[#F05A50] text-white shadow-xs'
                  : 'text-[#7D736A] dark:text-[#A89E96] hover:text-[#F05A50]'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Center Welcome Card */}
      <div className="flex flex-col items-center text-center max-w-md my-auto z-10 py-6">
        {/* Animated Tomato Logo with Analog Clock Inside & Green Leaf on Top */}
        <div className="relative group cursor-pointer mb-8 transition-transform duration-500 hover:scale-105 active:scale-95">
          {/* Subtle outer glow */}
          <div className="absolute -inset-4 bg-[#F05A50]/15 dark:bg-[#F05A50]/10 rounded-full blur-xl animate-pulse" />

          <svg
            viewBox="0 0 160 160"
            className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-md animate-[bounce_4s_infinite]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="welcomeTomatoGrad" cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#FF7A70" />
                <stop offset="60%" stopColor="#F05A50" />
                <stop offset="100%" stopColor="#D9382E" />
              </radialGradient>
              <linearGradient id="welcomeLeafGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6EAF72" />
                <stop offset="100%" stopColor="#438347" />
              </linearGradient>
            </defs>

            {/* Shadow underneath */}
            <ellipse cx="80" cy="148" rx="42" ry="7" fill="#E8D9CD" opacity="0.8" />

            {/* Tomato Main Body */}
            <circle
              cx="80"
              cy="88"
              r="52"
              fill="url(#welcomeTomatoGrad)"
              stroke="#B82E25"
              strokeWidth="2"
            />

            {/* Highlights */}
            <path
              d="M 52 56 C 60 48 76 46 92 48"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* Rosy Cheeks */}
            <ellipse cx="50" cy="90" rx="6.5" ry="4" fill="#FFAAA6" opacity="0.85" />
            <ellipse cx="110" cy="90" rx="6.5" ry="4" fill="#FFAAA6" opacity="0.85" />

            {/* Sweet Kawaii Eyes */}
            <circle cx="58" cy="78" r="4.8" fill="#2E2321" />
            <circle cx="56.5" cy="76" r="1.8" fill="#FFFFFF" />
            <circle cx="102" cy="78" r="4.8" fill="#2E2321" />
            <circle cx="100.5" cy="76" r="1.8" fill="#FFFFFF" />

            {/* Cute smile */}
            <path
              d="M 76 86 Q 80 90 84 86"
              fill="none"
              stroke="#2E2321"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* --- ANALOG CLOCK FACE INSIDE THE TOMATO --- */}
            <g transform="translate(80, 108)">
              {/* Dial Background */}
              <circle cx="0" cy="0" r="16.5" fill="#FFFDF8" stroke="#ECDDCF" strokeWidth="1.5" />
              {/* Dial tick dots (12, 3, 6, 9) */}
              <circle cx="0" cy="-12" r="1.1" fill="#8F786C" />
              <circle cx="12" cy="0" r="1.1" fill="#8F786C" />
              <circle cx="0" cy="12" r="1.1" fill="#8F786C" />
              <circle cx="-12" cy="0" r="1.1" fill="#8F786C" />

              {/* Hour hand pointing at ~10 */}
              <line x1="0" y1="0" x2="-6" y2="-6" stroke="#5E4E46" strokeWidth="1.8" strokeLinecap="round" />
              {/* Minute hand pointing at ~2 */}
              <line x1="0" y1="0" x2="8" y2="-7" stroke="#F05A50" strokeWidth="1.5" strokeLinecap="round" />
              {/* Center pivot */}
              <circle cx="0" cy="0" r="2" fill="#5E4E46" />
              <circle cx="0" cy="0" r="0.8" fill="#FFF" />
            </g>

            {/* --- GREEN LEAF & STEM ON TOP --- */}
            <g transform="translate(80, 36)">
              {/* Stem */}
              <path
                d="M 0 0 Q -3 -12 -6 -15"
                fill="none"
                stroke="#376739"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Center Leaf */}
              <path
                d="M 0 0 C -6 -14 6 -14 0 0"
                fill="url(#welcomeLeafGrad)"
                stroke="#2F5B31"
                strokeWidth="1"
              />
              {/* Left Leaf */}
              <path
                d="M 0 0 C -18 -8 -14 4 0 0"
                fill="url(#welcomeLeafGrad)"
                stroke="#2F5B31"
                strokeWidth="1"
              />
              {/* Right Leaf */}
              <path
                d="M 0 0 C 18 -8 14 4 0 0"
                fill="url(#welcomeLeafGrad)"
                stroke="#2F5B31"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="3" fill="#3D7440" />
            </g>
          </svg>
        </div>

        {/* Wordmark and Subtitle */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#362E2B] dark:text-[#F3EDE6] mb-2 font-['Quicksand','Nunito',sans-serif]">
          mypomo
        </h1>
        <p className="text-lg font-medium text-[#F05A50] mb-2 italic">
          "{t.tagline}"
        </p>
        <p className="text-sm text-[#7D726A] dark:text-[#AAA096] max-w-xs mb-8 leading-relaxed">
          {t.welcomeSubtitle}
        </p>

        {/* Large Rounded Red Button labeled "Kirish" per specification */}
        <button
          onClick={handleStart}
          className="group w-full max-w-xs py-4 px-8 bg-[#F05A50] hover:bg-[#E0493F] active:scale-[0.98] text-white font-bold text-lg rounded-2xl shadow-lg shadow-[#F05A50]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t.enterApp}</span>
          <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* Bottom aesthetic footer note */}
      <div className="w-full text-center text-xs text-[#A8988D] dark:text-[#7D726A] z-10">
        <span>{t.footerLove}</span>
      </div>
    </div>
  );
};
