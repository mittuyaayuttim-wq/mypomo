import React, { useState } from 'react';
import { Goal, Language } from '../types';
import { translations } from '../utils/i18n';
import { playTapSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface GoalsViewProps {
  goals: Goal[];
  dailyTarget: number;
  onUpdateDailyTarget: (newTarget: number) => void;
  onAddGoal: (newGoal: Goal) => void;
  onUpdateGoal: (updatedGoal: Goal) => void;
  onDeleteGoal: (goalId: string) => void;
  language: Language;
}

export const GoalsView: React.FC<GoalsViewProps> = ({
  goals,
  dailyTarget,
  onUpdateDailyTarget,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  language,
}) => {
  const t = translations[language] || translations.uz;

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState(4);
  const [newCategory, setNewCategory] = useState<'study' | 'work' | 'habits'>('study');
  const [celebrationMsg, setCelebrationMsg] = useState<string | null>(null);

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    playTapSound(0.4);
    const goal: Goal = {
      id: `goal-${Date.now()}`,
      title: newTitle.trim(),
      targetPomodoros: Math.max(1, Number(newTarget) || 1),
      completedPomodoros: 0,
      completed: false,
      category: newCategory,
      createdAt: new Date().toISOString(),
    };

    onAddGoal(goal);
    setNewTitle('');
    setNewTarget(4);
    setIsAdding(false);
  };

  const handleIncrement = (goal: Goal) => {
    playTapSound(0.3);
    const newCount = goal.completedPomodoros + 1;
    const isNowDone = newCount >= goal.targetPomodoros;

    if (isNowDone && !goal.completed) {
      // Trigger celebration confetti & sound!
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#F05A50', '#F9DAD7', '#7CA982', '#FFD166'],
        });
      } catch {}
      setCelebrationMsg(t.goalCheer);
      setTimeout(() => setCelebrationMsg(null), 4000);
    }

    onUpdateGoal({
      ...goal,
      completedPomodoros: newCount,
      completed: isNowDone,
    });
  };

  const handleToggleComplete = (goal: Goal) => {
    playTapSound(0.3);
    const nextCompleted = !goal.completed;
    if (nextCompleted) {
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#F05A50', '#FFD166'],
        });
      } catch {}
      setCelebrationMsg(t.goalCheer);
      setTimeout(() => setCelebrationMsg(null), 4000);
    }

    onUpdateGoal({
      ...goal,
      completed: nextCompleted,
      completedPomodoros: nextCompleted ? Math.max(goal.completedPomodoros, goal.targetPomodoros) : goal.completedPomodoros,
    });
  };

  return (
    <div className="space-y-6 select-none">
      {/* Motivational Celebration Alert */}
      {celebrationMsg && (
        <div className="p-4 rounded-2xl bg-[#FFF3E8] border border-[#F05A50]/30 text-[#D43D32] flex items-center gap-3 animate-bounce shadow-sm">
          <span className="text-2xl">🎉</span>
          <span className="text-sm font-bold">{celebrationMsg}</span>
        </div>
      )}

      {/* Daily & Weekly Target Configuration Card */}
      <div className="bg-white dark:bg-[#28221E] p-4 sm:p-5 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-[#352D29] dark:text-[#F3EDE6]">
              {t.dailyTargetLabel}
            </h4>
            <p className="text-xs text-[#8C7D73] dark:text-[#A69B92]">
              {dailyTarget} {t.targetCount} / kun · ({dailyTarget * 5} {t.targetCount} / hafta)
            </p>
          </div>

          {/* Stepper buttons for daily target */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={() => {
                playTapSound(0.2);
                onUpdateDailyTarget(Math.max(1, dailyTarget - 1));
              }}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#FAF3EA] dark:bg-[#342C27] text-[#6E6157] dark:text-[#D5C8BD] hover:text-[#F05A50] font-bold text-lg cursor-pointer"
            >
              -
            </button>
            <span className="w-12 text-center text-lg font-black text-[#F05A50] tabular-nums font-['Nunito',sans-serif]">
              {dailyTarget}
            </span>
            <button
              type="button"
              onClick={() => {
                playTapSound(0.2);
                onUpdateDailyTarget(Math.min(16, dailyTarget + 1));
              }}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#FAF3EA] dark:bg-[#342C27] text-[#6E6157] dark:text-[#D5C8BD] hover:text-[#F05A50] font-bold text-lg cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Add New Goal Header & Trigger */}
      <div className="flex items-center justify-between">
        <h4 className="text-base font-bold text-[#352D29] dark:text-[#F3EDE6]">
          {t.goalsTitle}
        </h4>

        {!isAdding && (
          <button
            type="button"
            onClick={() => {
              playTapSound(0.3);
              setIsAdding(true);
            }}
            className="py-2 px-3.5 rounded-xl bg-[#F05A50] hover:bg-[#E0493F] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
          >
            <span>+</span>
            <span>{t.addNewGoal}</span>
          </button>
        )}
      </div>

      {/* Add Goal Form Modal / Accordion */}
      {isAdding && (
        <form
          onSubmit={handleSaveGoal}
          className="bg-white dark:bg-[#28221E] p-4 sm:p-5 rounded-2xl border-2 border-[#F05A50]/30 shadow-md space-y-4"
        >
          <h5 className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
            {t.addNewGoal}
          </h5>

          <div>
            <label className="block text-xs font-medium text-[#8C7D73] dark:text-[#A69B92] mb-1">
              {t.goalTitlePlaceholder}
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={t.goalTitlePlaceholder}
              autoFocus
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D2C3] dark:border-[#443B35] bg-[#FAF5EF] dark:bg-[#302824] text-sm text-[#352D29] dark:text-[#F3EDE6] focus:outline-none focus:ring-2 focus:ring-[#F05A50]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#8C7D73] dark:text-[#A69B92] mb-1">
                {t.goalTargetPlaceholder}
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={newTarget}
                onChange={(e) => setNewTarget(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D2C3] dark:border-[#443B35] bg-[#FAF5EF] dark:bg-[#302824] text-sm text-[#352D29] dark:text-[#F3EDE6] focus:outline-none focus:ring-2 focus:ring-[#F05A50]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8C7D73] dark:text-[#A69B92] mb-1">
                Kategoriya
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as 'study' | 'work' | 'habits')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D2C3] dark:border-[#443B35] bg-[#FAF5EF] dark:bg-[#302824] text-sm text-[#352D29] dark:text-[#F3EDE6] focus:outline-none focus:ring-2 focus:ring-[#F05A50]"
              >
                <option value="study">📚 Dars / Ta'lim</option>
                <option value="work">💻 Ish / Loyiha</option>
                <option value="habits">🌱 Odat / Hayot</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8C7D73] hover:bg-[#FAF3EA] transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#F05A50] hover:bg-[#DE493F] text-white text-xs font-bold shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              {t.saveGoal}
            </button>
          </div>
        </form>
      )}

      {/* Goals List */}
      <div className="space-y-3">
        {goals.length === 0 ? (
          <div className="bg-white dark:bg-[#28221E] p-8 rounded-2xl border border-[#EFE2D4] dark:border-[#3A322C] text-center space-y-2">
            <span className="text-3xl">🌱</span>
            <h5 className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
              {t.noGoalsYet}
            </h5>
            <p className="text-xs text-[#8C7D73] dark:text-[#A69B92] max-w-xs mx-auto">
              {t.noGoalsDesc}
            </p>
          </div>
        ) : (
          goals.map((goal) => {
            const percent = Math.min(100, Math.round((goal.completedPomodoros / goal.targetPomodoros) * 100));
            const categoryIcon = goal.category === 'study' ? '📚' : goal.category === 'work' ? '💻' : '🌱';

            return (
              <div
                key={goal.id}
                className={`bg-white dark:bg-[#28221E] p-4 rounded-2xl border transition-all ${
                  goal.completed
                    ? 'border-[#7CA982]/50 bg-[#F4F9F5] dark:bg-[#232B25]'
                    : 'border-[#EFE2D4] dark:border-[#3A322C]'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleComplete(goal)}
                      title="Toggle completion"
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                        goal.completed
                          ? 'bg-[#7CA982] border-[#7CA982] text-white font-bold text-xs'
                          : 'border-[#D9C8B7] dark:border-[#4E433C] hover:border-[#7CA982]'
                      }`}
                    >
                      {goal.completed && '✓'}
                    </button>
                    <div>
                      <h5
                        className={`text-sm font-bold ${
                          goal.completed
                            ? 'line-through text-[#8C7D73] dark:text-[#8E837B]'
                            : 'text-[#352D29] dark:text-[#F3EDE6]'
                        }`}
                      >
                        {goal.title}
                      </h5>
                      <span className="text-[11px] text-[#A69B92]">
                        {categoryIcon} {goal.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {goal.completed ? (
                      <span className="text-xs font-bold text-[#4E8752] flex items-center gap-1">
                        <span>🍅</span>
                        <span>{t.completedBadge}</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleIncrement(goal)}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF5EF] dark:bg-[#342D29] hover:bg-[#F05A50] hover:text-white text-xs font-bold text-[#F05A50] border border-[#E8DACB] dark:border-[#423933] transition-colors cursor-pointer"
                        title="+1 pomodoro"
                      >
                        +1 🍅
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        playTapSound(0.2);
                        onDeleteGoal(goal.id);
                      }}
                      className="w-7 h-7 rounded-lg text-[#B5A599] hover:text-[#D43D32] hover:bg-[#FDF0EE] flex items-center justify-center transition-colors cursor-pointer"
                      title={t.deleteGoal}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 mt-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C7D73] dark:text-[#A69B92]">
                    <span>
                      {goal.completedPomodoros} / {goal.targetPomodoros} {t.pomodoros}
                    </span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#FAF5EF] dark:bg-[#302925] rounded-full overflow-hidden border border-[#EFE2D4] dark:border-[#3E3632]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        goal.completed ? 'bg-[#7CA982]' : 'bg-[#F05A50]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
