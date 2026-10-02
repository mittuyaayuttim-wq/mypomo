import React from 'react';
import { Language, MascotType } from '../types';
import { MASCOT_SKINS, Mascot } from './Mascot';
import { translations } from '../utils/i18n';
import { playTapSound } from '../utils/sound';

interface MascotSelectorProps {
  currentMascot: MascotType;
  onSelectMascot: (mascot: MascotType) => void;
  language: Language;
  onClose?: () => void;
}

export const MascotSelector: React.FC<MascotSelectorProps> = ({
  currentMascot,
  onSelectMascot,
  language,
  onClose,
}) => {
  const t = translations[language] || translations.uz;

  const mascotList: Array<{
    type: MascotType;
    emoji: string;
    nameKey: keyof typeof t;
    descKey: keyof typeof t;
  }> = [
    { type: 'tomato', emoji: '🍅', nameKey: 'mascot_tomato', descKey: 'mascot_tomato_desc' },
    { type: 'strawberry', emoji: '🍓', nameKey: 'mascot_strawberry', descKey: 'mascot_strawberry_desc' },
    { type: 'cherry', emoji: '🍒', nameKey: 'mascot_cherry', descKey: 'mascot_cherry_desc' },
    { type: 'peach', emoji: '🍑', nameKey: 'mascot_peach', descKey: 'mascot_peach_desc' },
    { type: 'green_tomato', emoji: '🍏', nameKey: 'mascot_green_tomato', descKey: 'mascot_green_tomato_desc' },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#352D29] dark:text-[#F3EDE6]">
            {t.changeMascot}
          </h3>
          <p className="text-xs text-[#87786E] dark:text-[#A1958C]">
            {t.mascot_tomato_desc}
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F5EADB] dark:bg-[#342D28] text-[#6E6157] dark:text-[#C5B9AF] hover:text-[#F05A50]"
          >
            {t.close}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {mascotList.map((item) => {
          const isSelected = currentMascot === item.type;
          const skin = MASCOT_SKINS[item.type];
          const name = String(t[item.nameKey] || skin.name);
          const desc = String(t[item.descKey] || '');

          return (
            <button
              key={item.type}
              type="button"
              onClick={() => {
                playTapSound(0.3);
                onSelectMascot(item.type);
              }}
              className={`p-3.5 rounded-2xl flex items-center gap-3.5 text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-[#2A231F] border-2 border-[#F05A50] shadow-md shadow-[#F05A50]/15 ring-2 ring-[#F05A50]/10 scale-[1.01]'
                  : 'bg-white/80 dark:bg-[#231D1A]/90 border border-[#EFE2D4] dark:border-[#382F2A] hover:border-[#F05A50]/50 hover:bg-white'
              }`}
            >
              {/* Mini visual preview */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner overflow-hidden"
                style={{
                  background: isSelected
                    ? `${skin.bodyColor}15`
                    : 'transparent',
                }}
              >
                <div className="scale-65 transform origin-center">
                  <Mascot type={item.type} mode="focus" progress={0.3} size="sm" />
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{item.emoji}</span>
                  <span className="font-bold text-sm text-[#352D29] dark:text-[#F3EDE6] truncate">
                    {name}
                  </span>
                </div>
                <p className="text-xs text-[#87786E] dark:text-[#A1958C] line-clamp-2 mt-0.5 leading-snug">
                  {desc}
                </p>
              </div>

              {/* Selection Checkmark */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                  isSelected
                    ? 'bg-[#F05A50] border-[#F05A50] text-white'
                    : 'border-[#D9C8B7] dark:border-[#4E433C] text-transparent'
                }`}
              >
                ✓
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
