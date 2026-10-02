import React from 'react';
import { Goal, Language, SessionRecord, SidebarTab } from '../types';
import { translations } from '../utils/i18n';
import { playTapSound } from '../utils/sound';
import { CalendarView } from './CalendarView';
import { StatisticsView } from './StatisticsView';
import { GoalsView } from './GoalsView';

interface SidebarDrawerProps {
  isOpen: boolean;
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  onClose: () => void;
  sessions: SessionRecord[];
  goals: Goal[];
  dailyTarget: number;
  onUpdateDailyTarget: (newTarget: number) => void;
  onAddGoal: (newGoal: Goal) => void;
  onUpdateGoal: (updatedGoal: Goal) => void;
  onDeleteGoal: (goalId: string) => void;
  language: Language;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
  sessions,
  goals,
  dailyTarget,
  onUpdateDailyTarget,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  language,
}) => {
  const t = translations[language] || translations.uz;

  if (!isOpen) return null;

  const handleTabClick = (tab: SidebarTab) => {
    playTapSound(0.2);
    onTabChange(tab);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-lg sm:max-w-xl h-full bg-[#FFFDFB] dark:bg-[#1E1B18] shadow-2xl flex flex-col z-10 overflow-hidden border-r border-[#EFE2D4] dark:border-[#382F2A] animate-slideInLeft">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#F4E8DC] dark:border-[#382F2A] bg-[#FFF8EF] dark:bg-[#231E1B]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍅</span>
            <div>
              <h2 className="text-lg font-black text-[#352D29] dark:text-[#F3EDE6] tracking-tight">
                {t.appName}
              </h2>
              <p className="text-xs text-[#8C7D73] dark:text-[#A69B92]">
                {activeTab === 'calendar' ? t.navCalendar : activeTab === 'statistics' ? t.navStatistics : t.navGoals}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playTapSound(0.2);
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#FAF5EE] dark:bg-[#342C27] text-[#7A6C63] dark:text-[#C5B8AD] hover:text-[#F05A50] hover:bg-[#F2E5D6] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* 3 Section Nav Tabs */}
        <div className="grid grid-cols-3 gap-1 p-2 bg-[#FAF5EE] dark:bg-[#28211E] border-b border-[#F4E8DC] dark:border-[#382F2A]">
          <button
            type="button"
            onClick={() => handleTabClick('calendar')}
            className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-white dark:bg-[#1E1B18] text-[#F05A50] shadow-xs'
                : 'text-[#87786E] dark:text-[#A1958C] hover:text-[#352D29]'
            }`}
          >
            <span className="text-sm">📅</span>
            <span className="truncate">{t.navCalendar}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabClick('statistics')}
            className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'statistics'
                ? 'bg-white dark:bg-[#1E1B18] text-[#F05A50] shadow-xs'
                : 'text-[#87786E] dark:text-[#A1958C] hover:text-[#352D29]'
            }`}
          >
            <span className="text-sm">📊</span>
            <span className="truncate">{t.navStatistics}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabClick('goals')}
            className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'goals'
                ? 'bg-white dark:bg-[#1E1B18] text-[#F05A50] shadow-xs'
                : 'text-[#87786E] dark:text-[#A1958C] hover:text-[#352D29]'
            }`}
          >
            <span className="text-sm">🎯</span>
            <span className="truncate">{t.navGoals}</span>
          </button>
        </div>

        {/* Drawer Scrollable Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'calendar' && (
            <CalendarView
              sessions={sessions}
              dailyTarget={dailyTarget}
              language={language}
            />
          )}

          {activeTab === 'statistics' && (
            <StatisticsView
              sessions={sessions}
              dailyTarget={dailyTarget}
              language={language}
            />
          )}

          {activeTab === 'goals' && (
            <GoalsView
              goals={goals}
              dailyTarget={dailyTarget}
              onUpdateDailyTarget={onUpdateDailyTarget}
              onAddGoal={onAddGoal}
              onUpdateGoal={onUpdateGoal}
              onDeleteGoal={onDeleteGoal}
              language={language}
            />
          )}
        </div>
      </div>
    </div>
  );
};
