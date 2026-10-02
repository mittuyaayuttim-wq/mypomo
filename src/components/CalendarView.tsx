import React, { useState } from 'react';
import { Language, SessionRecord } from '../types';
import { translations } from '../utils/i18n';
import { formatDate } from '../utils/storage';
import { playTapSound } from '../utils/sound';

interface CalendarViewProps {
  sessions: SessionRecord[];
  dailyTarget: number;
  language: Language;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  sessions,
  dailyTarget,
  language,
}) => {
  const t = translations[language] || translations.uz;

  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(() => formatDate(new Date()));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Localized month name
  const monthNames: Record<Language, string[]> = {
    uz: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  };

  const dayHeaders: Record<Language, string[]> = {
    uz: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'],
    en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    tr: ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'],
    ko: ['월', '화', '수', '목', '금', '토', '일'],
  };

  const handlePrevMonth = () => {
    playTapSound(0.2);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    playTapSound(0.2);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Compute calendar days (Monday as first day of week)
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Day index: 0=Sunday, 1=Monday... We want Monday=0, Sunday=6
  let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6;

  const totalDays = lastDayOfMonth.getDate();

  // Aggregate session map: dateStr -> { count: number, totalMinutes: number }
  const activityMap = new Map<string, { count: number; totalMinutes: number }>();
  sessions.forEach((s) => {
    if (s.mode === 'focus') {
      const prev = activityMap.get(s.dateStr) || { count: 0, totalMinutes: 0 };
      activityMap.set(s.dateStr, {
        count: prev.count + 1,
        totalMinutes: prev.totalMinutes + s.durationMinutes,
      });
    }
  });

  // Selected date statistics
  const selectedDayData = activityMap.get(selectedDateStr) || { count: 0, totalMinutes: 0 };
  const goalPercent = Math.min(100, Math.round((selectedDayData.count / dailyTarget) * 100));

  return (
    <div className="space-y-6 select-none">
      {/* Header with Month/Year & Controls */}
      <div className="flex items-center justify-between bg-white dark:bg-[#28221E] p-4 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] shadow-xs">
        <div>
          <h3 className="text-xl font-bold text-[#352D29] dark:text-[#F3EDE6]">
            {monthNames[language][month]} {year}
          </h3>
          <p className="text-xs text-[#87786E] dark:text-[#A1958C]">
            {t.calendarTitle}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#FAF3EA] dark:bg-[#342C27] text-[#6E6157] dark:text-[#D5C8BD] hover:text-[#F05A50] hover:bg-[#F2E5D5] transition-colors cursor-pointer"
            aria-label="Previous month"
          >
            ←
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#FAF3EA] dark:bg-[#342C27] text-[#6E6157] dark:text-[#D5C8BD] hover:text-[#F05A50] hover:bg-[#F2E5D5] transition-colors cursor-pointer"
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-[#28221E] p-4 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] shadow-xs">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#8C7D73] dark:text-[#9A8D83] mb-2 pb-2 border-b border-[#F4E8DC] dark:border-[#382F2A]">
          {dayHeaders[language].map((dayName, idx) => (
            <div key={idx} className="py-1">
              {dayName}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {/* Empty prefix slots */}
          {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-10 sm:h-11 rounded-xl opacity-0" />
          ))}

          {/* Days of month */}
          {Array.from({ length: totalDays }).map((_, idx) => {
            const dayNum = idx + 1;
            const d = new Date(year, month, dayNum);
            const dateStr = formatDate(d);
            const data = activityMap.get(dateStr);
            const isSelected = selectedDateStr === dateStr;
            const isToday = formatDate(new Date()) === dateStr;

            // Coloring logic:
            // Full goal (count >= dailyTarget): tomato red (#F05A50)
            // Partial goal (count > 0 && count < dailyTarget): softer red / pastel pink (#F8A59E or #F9DAD7)
            // None: clean neutral
            const isFullGoal = data && data.count >= dailyTarget;
            const isPartialGoal = data && data.count > 0 && data.count < dailyTarget;

            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => {
                  playTapSound(0.2);
                  setSelectedDateStr(dateStr);
                }}
                className={`relative h-10 sm:h-11 rounded-xl text-sm font-semibold flex flex-col items-center justify-center transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-[#352D29] dark:ring-white scale-105 z-10'
                    : 'hover:scale-102'
                } ${
                  isFullGoal
                    ? 'bg-[#F05A50] text-white shadow-xs font-bold'
                    : isPartialGoal
                    ? 'bg-[#F9DAD7] text-[#D43D32] dark:bg-[#4E3130] dark:text-[#FFAAA6] font-bold'
                    : 'bg-[#FAF5EF] dark:bg-[#302925] text-[#554A44] dark:text-[#D5C9BE] hover:bg-[#F2E7DC]'
                }`}
              >
                <span>{dayNum}</span>

                {/* Little indicator dot or tomato pip */}
                {isFullGoal && <span className="text-[9px] -mt-1 leading-none">🍅</span>}
                {isPartialGoal && <span className="w-1.5 h-1.5 rounded-full bg-[#F05A50] -mt-0.5" />}
                {isToday && !data && (
                  <span className="w-1 h-1 rounded-full bg-[#A8988E] -mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 pt-3 border-t border-[#F4E8DC] dark:border-[#382F2A] flex flex-wrap items-center justify-around gap-2 text-xs text-[#7A6C63] dark:text-[#A89C92]">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-[#F05A50] inline-block" />
            <span>{t.calendarLegendFull}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-[#F9DAD7] dark:bg-[#4E3130] inline-block border border-[#F05A50]/30" />
            <span>{t.calendarLegendPartial}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-[#FAF5EF] dark:bg-[#302925] inline-block" />
            <span>{t.calendarLegendNone}</span>
          </div>
        </div>
      </div>

      {/* Selected Date Summary Card */}
      <div className="bg-[#FFFDFB] dark:bg-[#28221E] p-4 sm:p-5 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] shadow-xs">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F4E8DC] dark:border-[#382F2A]">
          <div>
            <span className="text-xs font-semibold text-[#F05A50] uppercase tracking-wider">
              {t.selectedDateStats}
            </span>
            <h4 className="text-base font-bold text-[#352D29] dark:text-[#F3EDE6]">
              {selectedDateStr}
            </h4>
          </div>
          {selectedDayData.count > 0 && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F05A50]/10 text-[#F05A50]">
              {goalPercent}% {t.dailyGoalReached}
            </span>
          )}
        </div>

        {selectedDayData.count > 0 ? (
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#FAF5EE] dark:bg-[#322A26]">
              <span className="text-2xl font-black text-[#F05A50] tabular-nums font-['Nunito',sans-serif]">
                {selectedDayData.count}
              </span>
              <p className="text-xs text-[#7A6C63] dark:text-[#A89C92] mt-0.5">
                {t.completedSessions}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF5EE] dark:bg-[#322A26]">
              <span className="text-2xl font-black text-[#352D29] dark:text-[#F3EDE6] tabular-nums font-['Nunito',sans-serif]">
                {selectedDayData.totalMinutes}
              </span>
              <span className="text-xs text-[#7A6C63] dark:text-[#A89C92] ml-1">
                {t.minutesUnit}
              </span>
              <p className="text-xs text-[#7A6C63] dark:text-[#A89C92] mt-0.5">
                {t.totalTime}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-sm text-[#8F8177] dark:text-[#9A8D83]">
            <span>🌱 {t.noActivityOnDate}</span>
          </div>
        )}
      </div>
    </div>
  );
};
