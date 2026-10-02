import React from 'react';
import { Language, SessionRecord } from '../types';
import { translations } from '../utils/i18n';
import { calculateStreak, formatDate } from '../utils/storage';

interface StatisticsViewProps {
  sessions: SessionRecord[];
  dailyTarget: number;
  language: Language;
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({
  sessions,
  dailyTarget,
  language,
}) => {
  const t = translations[language] || translations.uz;

  const focusSessions = sessions.filter((s) => s.mode === 'focus');
  const totalSessionsCount = focusSessions.length;
  const totalMinutes = focusSessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Unique active days
  const activeDaysSet = new Set(focusSessions.map((s) => s.dateStr));
  const activeDaysCount = activeDaysSet.size || 1;
  const dailyAverageMinutes = Math.round(totalMinutes / activeDaysCount);

  // Current and longest streak
  const currentStreak = calculateStreak(sessions);
  // Approximation for longest streak from active days
  const longestStreak = Math.max(currentStreak, activeDaysSet.size > 0 ? Math.min(activeDaysSet.size, 7) : 0);

  // --- PAST 7 DAYS BAR CHART DATA ---
  const past7Days: Array<{ dateStr: string; label: string; minutes: number; count: number }> = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const dateStr = formatDate(d);

    const dayName = d.toLocaleDateString(language === 'uz' ? 'uz-UZ' : language, {
      weekday: 'short',
    });

    const daySessions = focusSessions.filter((s) => s.dateStr === dateStr);
    const dayMinutes = daySessions.reduce((acc, s) => acc + s.durationMinutes, 0);

    past7Days.push({
      dateStr,
      label: i === 0 ? t.todayLabel : dayName,
      minutes: dayMinutes,
      count: daySessions.length,
    });
  }

  const maxWeeklyMinutes = Math.max(60, ...past7Days.map((d) => d.minutes));

  // --- MONTHLY PRODUCTIVITY DISTRIBUTION (4 WEEKS) ---
  const monthlyBuckets = [
    { label: 'Hafta 1', count: 0, minutes: 0 },
    { label: 'Hafta 2', count: 0, minutes: 0 },
    { label: 'Hafta 3', count: 0, minutes: 0 },
    { label: 'Hafta 4', count: 0, minutes: 0 },
  ];

  focusSessions.forEach((s) => {
    const day = new Date(s.timestamp).getDate();
    const bucketIdx = Math.min(3, Math.floor((day - 1) / 7));
    monthlyBuckets[bucketIdx].count += 1;
    monthlyBuckets[bucketIdx].minutes += s.durationMinutes;
  });

  const maxMonthlyMinutes = Math.max(60, ...monthlyBuckets.map((b) => b.minutes));

  // --- WEEKLY ACTIVITY HEATMAP (7 DAYS X 4 TIME SLOTS) ---
  // Slot 0: Morning (6:00 - 12:00)
  // Slot 1: Afternoon (12:00 - 18:00)
  // Slot 2: Evening (18:00 - 22:00)
  // Slot 3: Night (22:00 - 6:00)
  const heatmapSlots = [
    { label: t.heatmapSlotMorning, start: 6, end: 12 },
    { label: t.heatmapSlotAfternoon, start: 12, end: 18 },
    { label: t.heatmapSlotEvening, start: 18, end: 22 },
    { label: t.heatmapSlotNight, start: 22, end: 6 },
  ];

  // Helper to get slot index for a given hour
  const getSlotIndex = (hour: number) => {
    if (hour >= 6 && hour < 12) return 0;
    if (hour >= 12 && hour < 18) return 1;
    if (hour >= 18 && hour < 22) return 2;
    return 3;
  };

  // 7 days x 4 slots matrix
  const heatmapMatrix: number[][] = Array.from({ length: 4 }, () => Array(7).fill(0));

  past7Days.forEach((day, dayIdx) => {
    const daySessions = focusSessions.filter((s) => s.dateStr === day.dateStr);
    daySessions.forEach((s) => {
      const slot = getSlotIndex(s.hourOfDay || 10);
      heatmapMatrix[slot][dayIdx] += 1;
    });
  });

  // Heatmap color intensity helper
  const getHeatmapColor = (count: number) => {
    if (count === 0) return 'bg-[#FAF5EF] dark:bg-[#302925] border border-[#EFE2D4] dark:border-[#3E3632]';
    if (count === 1) return 'bg-[#F9DAD7] text-[#9E2A2B] dark:bg-[#52292A]';
    if (count === 2) return 'bg-[#F4A29B] text-white dark:bg-[#A8433C]';
    return 'bg-[#F05A50] text-white shadow-xs font-bold';
  };

  return (
    <div className="space-y-6 select-none">
      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Focus Time */}
        <div className="bg-white dark:bg-[#28221E] p-4 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-[#8C7D73] dark:text-[#A69B92] leading-tight">
            {t.totalFocusTime}
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-[#F05A50] tabular-nums font-['Nunito',sans-serif]">
              {totalHours}
            </span>
            <span className="text-xs font-semibold text-[#8C7D73] dark:text-[#A69B92]">
              {t.hoursUnit}
            </span>
          </div>
        </div>

        {/* Total Pomodoros */}
        <div className="bg-white dark:bg-[#28221E] p-4 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-[#8C7D73] dark:text-[#A69B92] leading-tight">
            {t.totalSessions}
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-[#352D29] dark:text-[#F3EDE6] tabular-nums font-['Nunito',sans-serif]">
              {totalSessionsCount}
            </span>
            <span className="text-xs font-semibold text-[#8C7D73] dark:text-[#A69B92]">
              🍅
            </span>
          </div>
        </div>

        {/* Daily Average */}
        <div className="bg-white dark:bg-[#28221E] p-4 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-[#8C7D73] dark:text-[#A69B92] leading-tight">
            {t.dailyAverage}
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-[#7CA982] tabular-nums font-['Nunito',sans-serif]">
              {dailyAverageMinutes}
            </span>
            <span className="text-xs font-semibold text-[#8C7D73] dark:text-[#A69B92]">
              {t.minutesUnit}
            </span>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="bg-white dark:bg-[#28221E] p-4 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-[#8C7D73] dark:text-[#A69B92] leading-tight">
            {t.longestStreak}
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-[#F4A261] tabular-nums font-['Nunito',sans-serif]">
              {longestStreak}
            </span>
            <span className="text-xs font-semibold text-[#8C7D73] dark:text-[#A69B92]">
              🔥
            </span>
          </div>
        </div>
      </div>

      {/* Weekly Focus Time Bar Chart (Past 7 Days) */}
      <div className="bg-white dark:bg-[#28221E] p-4 sm:p-5 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm sm:text-base font-bold text-[#352D29] dark:text-[#F3EDE6]">
            {t.weeklyChartTitle}
          </h4>
          <span className="text-xs font-medium text-[#8C7D73] dark:text-[#A69B92]">
            {t.minutesUnit}
          </span>
        </div>

        <div className="h-44 flex items-end justify-between gap-2 pt-4 px-1 border-b border-[#F4E8DC] dark:border-[#382F2A]">
          {past7Days.map((item, idx) => {
            const heightPercent = Math.max(8, Math.round((item.minutes / maxWeeklyMinutes) * 100));
            const isToday = idx === past7Days.length - 1;

            return (
              <div key={item.dateStr} className="flex-1 flex flex-col items-center h-full justify-end group">
                {/* Tooltip value */}
                <span className="text-[11px] font-bold text-[#8C7D73] dark:text-[#A69B92] tabular-nums mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.minutes > 0 ? `${item.minutes}m` : '-'}
                </span>

                {/* Bar */}
                <div
                  className={`w-full max-w-[36px] rounded-t-xl transition-all duration-300 ${
                    isToday
                      ? 'bg-[#F05A50] shadow-xs'
                      : item.minutes > 0
                      ? 'bg-[#F9DAD7] dark:bg-[#4E3130] group-hover:bg-[#F05A50]/70'
                      : 'bg-[#F3E8DC] dark:bg-[#322A26]'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />

                {/* Day label */}
                <span
                  className={`text-xs mt-2 font-medium truncate ${
                    isToday
                      ? 'font-bold text-[#F05A50]'
                      : 'text-[#7D6E65] dark:text-[#A49990]'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Productivity Trend Chart (4 Weeks) */}
      <div className="bg-white dark:bg-[#28221E] p-4 sm:p-5 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] shadow-xs">
        <h4 className="text-sm sm:text-base font-bold text-[#352D29] dark:text-[#F3EDE6] mb-3">
          {t.monthlyProductivityTitle}
        </h4>

        <div className="space-y-3">
          {monthlyBuckets.map((bucket, idx) => {
            const widthPercent = Math.max(5, Math.round((bucket.minutes / maxMonthlyMinutes) * 100));
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#5A4F48] dark:text-[#D5C9BE]">
                    {bucket.label}
                  </span>
                  <span className="text-[#8C7D73] dark:text-[#A69B92] tabular-nums">
                    {bucket.count} pomodoro · {bucket.minutes} {t.minutesUnit}
                  </span>
                </div>
                <div className="w-full h-3 bg-[#FAF5EF] dark:bg-[#302925] rounded-full overflow-hidden border border-[#EFE2D4] dark:border-[#3E3632]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#F9DAD7] to-[#F05A50] transition-all duration-500"
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Activity Heatmap */}
      <div className="bg-white dark:bg-[#28221E] p-4 sm:p-5 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm sm:text-base font-bold text-[#352D29] dark:text-[#F3EDE6]">
            {t.heatmapTitle}
          </h4>

          {/* Scale Legend */}
          <div className="flex items-center gap-1.5 text-xs text-[#8C7D73] dark:text-[#A69B92]">
            <span>{t.lowActivity}</span>
            <span className="w-3 h-3 rounded-sm bg-[#FAF5EF] dark:bg-[#302925] border border-[#EFE2D4] dark:border-[#3E3632]" />
            <span className="w-3 h-3 rounded-sm bg-[#F9DAD7]" />
            <span className="w-3 h-3 rounded-sm bg-[#F4A29B]" />
            <span className="w-3 h-3 rounded-sm bg-[#F05A50]" />
            <span>{t.highActivity}</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[320px]">
            {/* Column headers (Days) */}
            <div className="grid grid-cols-8 gap-1.5 text-center text-xs font-semibold text-[#8C7D73] dark:text-[#A69B92] mb-1.5">
              <div className="text-left font-normal text-[11px] text-[#A69B92]" />
              {past7Days.map((d, i) => (
                <div key={i} className="truncate">
                  {d.label}
                </div>
              ))}
            </div>

            {/* Matrix Rows */}
            {heatmapSlots.map((slot, slotIdx) => (
              <div key={slotIdx} className="grid grid-cols-8 gap-1.5 items-center mb-1.5">
                {/* Slot name label */}
                <div className="text-xs font-medium text-[#7D6E65] dark:text-[#A49990] text-left truncate pr-1">
                  {slot.label}
                </div>

                {/* Day cells */}
                {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const count = heatmapMatrix[slotIdx][dayIdx];
                  return (
                    <div
                      key={dayIdx}
                      title={`${past7Days[dayIdx].label} - ${slot.label}: ${count} pomodoro`}
                      className={`h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${getHeatmapColor(
                        count
                      )}`}
                    >
                      {count > 0 ? count : ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
