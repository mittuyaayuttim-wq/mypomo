import React from 'react';
import { Language, MascotType, Theme } from '../types';
import { translations } from '../utils/i18n';
import { playTapSound } from '../utils/sound';

interface NavbarProps {
  streak: number;
  mascot: MascotType;
  language: Language;
  theme: Theme;
  onOpenMenu: () => void;
  onOpenMascotSelector: () => void;
  onOpenSettings: () => void;
  onToggleTheme: () => void;
  onSelectLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  streak,
  mascot,
  language,
  theme,
  onOpenMenu,
  onOpenMascotSelector,
  onOpenSettings,
  onToggleTheme,
  onSelectLanguage,
}) => {
  const t = translations[language] || translations.uz;

  const mascotEmojiMap: Record<MascotType, string> = {
    tomato: '🍅',
    strawberry: '🍓',
    cherry: '🍒',
    peach: '🍑',
    green_tomato: '🍏',
  };

  return (
    <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between z-20 select-none">
      {/* Left Zone: Sidebar Menu Button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            playTapSound(0.2);
            onOpenMenu();
          }}
          className="h-10 px-3.5 rounded-2xl bg-white dark:bg-[#28221E] border border-[#EFE2D4] dark:border-[#382F2A] hover:border-[#F05A50]/40 text-[#4D423C] dark:text-[#E0D5CB] font-bold text-xs shadow-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          aria-label={t.navMenu}
        >
          <svg className="w-4 h-4 text-[#F05A50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="hidden sm:inline">{t.navMenu}</span>
        </button>

        {/* Brand Title */}
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={onOpenMascotSelector}>
          <span className="text-xl animate-bounce" style={{ animationDuration: '3s' }}>
            {mascotEmojiMap[mascot] || '🍅'}
          </span>
          <span className="text-xl font-black tracking-tight text-[#352D29] dark:text-[#F3EDE6] font-['Quicksand','Nunito',sans-serif]">
            {t.appName}
          </span>
        </div>
      </div>

      {/* Center / Right Zone: Streak + Quick Actions */}
      <div className="flex items-center gap-2">
        {/* Streak Indicator */}
        <div
          title={`${streak} ${t.daysStreak}`}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0EE] dark:bg-[#342422] border border-[#FCD3CE] dark:border-[#522927] text-xs font-bold text-[#D43D32] dark:text-[#FFAAA6]"
        >
          <span>🔥</span>
          <span>{streak}</span>
          <span className="text-[11px] font-medium opacity-80">{t.daysStreak}</span>
        </div>

        {/* Quick Mascot Selector Button */}
        <button
          type="button"
          onClick={() => {
            playTapSound(0.2);
            onOpenMascotSelector();
          }}
          title={t.changeMascot}
          className="w-10 h-10 rounded-2xl bg-white dark:bg-[#28221E] border border-[#EFE2D4] dark:border-[#382F2A] hover:border-[#F05A50]/40 text-[#4D423C] dark:text-[#E0D5CB] flex items-center justify-center text-lg shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          {mascotEmojiMap[mascot] || '🍅'}
        </button>

        {/* Language Switcher Pill */}
        <div className="relative group">
          <select
            value={language}
            onChange={(e) => {
              playTapSound(0.2);
              onSelectLanguage(e.target.value as Language);
            }}
            className="h-10 px-2.5 rounded-2xl bg-white dark:bg-[#28221E] border border-[#EFE2D4] dark:border-[#382F2A] text-xs font-bold text-[#4D423C] dark:text-[#E0D5CB] shadow-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F05A50]"
          >
            <option value="uz">UZ</option>
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="tr">TR</option>
            <option value="ko">KO</option>
          </select>
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={() => {
            playTapSound(0.2);
            onToggleTheme();
          }}
          title="Toggle theme"
          className="w-10 h-10 rounded-2xl bg-white dark:bg-[#28221E] border border-[#EFE2D4] dark:border-[#382F2A] hover:border-[#F05A50]/40 text-[#4D423C] dark:text-[#E0D5CB] flex items-center justify-center text-sm shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Settings Button */}
        <button
          type="button"
          onClick={() => {
            playTapSound(0.2);
            onOpenSettings();
          }}
          title={t.navSettings}
          className="w-10 h-10 rounded-2xl bg-white dark:bg-[#28221E] border border-[#EFE2D4] dark:border-[#382F2A] hover:border-[#F05A50]/40 text-[#4D423C] dark:text-[#E0D5CB] flex items-center justify-center text-base shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          ⚙️
        </button>
      </div>
    </header>
  );
};
