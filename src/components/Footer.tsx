import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { playTapSound } from '../utils/sound';

interface FooterProps {
  language: Language;
  onOpenHelp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenHelp }) => {
  const t = translations[language] || translations.uz;

  return (
    <footer className="w-full max-w-4xl mx-auto px-4 py-6 text-center select-none text-xs text-[#8C7E74] dark:text-[#9A8D83] flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#F2E5D6] dark:border-[#2D2622] mt-8">
      {/* Love badge */}
      <div className="flex items-center gap-1.5 font-medium">
        <span>{t.footerLove}</span>
        <span>·</span>
        <span className="text-[#F05A50] font-semibold">{t.tagline}</span>
      </div>

      {/* Helpful tips button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            playTapSound(0.2);
            onOpenHelp();
          }}
          className="hover:text-[#F05A50] transition-colors flex items-center gap-1 cursor-pointer font-semibold"
        >
          <span>💡</span>
          <span>{t.helpTip}</span>
        </button>
      </div>
    </footer>
  );
};
