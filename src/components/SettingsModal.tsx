import React, { useState } from 'react';
import { Language, MascotType, Settings, Theme } from '../types';
import { translations } from '../utils/i18n';
import { playCompletionSound, playTapSound } from '../utils/sound';
import { MascotSelector } from './MascotSelector';

interface SettingsModalProps {
  isOpen: boolean;
  settings: Settings;
  onClose: () => void;
  onUpdateSettings: (newSettings: Settings) => void;
  onResetStatistics: () => void;
  onResetOnboarding: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onClose,
  onUpdateSettings,
  onResetStatistics,
  onResetOnboarding,
}) => {
  const t = translations[settings.language] || translations.uz;

  const [activeTab, setActiveTab] = useState<'timer' | 'general' | 'mascot' | 'sound' | 'data'>('timer');
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: 'stats' | 'onboarding';
  }>({ open: false, type: 'stats' });

  if (!isOpen) return null;

  const updateSetting = <K extends keyof Settings>(key: K, val: Settings[K]) => {
    onUpdateSettings({
      ...settings,
      [key]: val,
    });
  };

  const handleTestSound = () => {
    playCompletionSound(settings.soundVolume);
  };

  const handleRequestNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateSetting('notificationsEnabled', true);
        new Notification('mypomo', {
          body: 'Bildirishnomalar muvaffaqiyatli yoqildi! 🍅',
          icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍅</text></svg>',
        });
      } else {
        updateSetting('notificationsEnabled', false);
      }
    }
  };

  const handleExecuteReset = () => {
    playTapSound(0.4);
    if (confirmDialog.type === 'stats') {
      onResetStatistics();
    } else {
      onResetOnboarding();
    }
    setConfirmDialog({ open: false, type: 'stats' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none animate-fadeIn">
      {/* Modal Dialog Box */}
      <div className="bg-[#FFFDFB] dark:bg-[#231D1A] w-full max-w-xl max-h-[90vh] rounded-3xl border border-[#EFE2D4] dark:border-[#382F2A] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 border-b border-[#F4E8DC] dark:border-[#382F2A]">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h3 className="text-lg font-bold text-[#352D29] dark:text-[#F3EDE6]">
              {t.settingsTitle}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              playTapSound(0.2);
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#FAF5EE] dark:bg-[#342C27] text-[#7A6C63] dark:text-[#C5B8AD] hover:text-[#F05A50] hover:bg-[#F2E5D6] transition-colors cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Settings Navigation Tabs */}
        <div className="flex items-center px-5 pt-3 gap-1 overflow-x-auto border-b border-[#F4E8DC] dark:border-[#382F2A] bg-[#FAF5EE]/60 dark:bg-[#28211E]">
          {[
            { id: 'timer', label: t.tabTimer, icon: '⏱️' },
            { id: 'general', label: t.tabGeneral, icon: '🌍' },
            { id: 'mascot', label: t.tabMascot, icon: '🍅' },
            { id: 'sound', label: t.tabSound, icon: '🔔' },
            { id: 'data', label: t.tabData, icon: '💾' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playTapSound(0.2);
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#FFFDFB] dark:bg-[#231D1A] text-[#F05A50] border-t-2 border-[#F05A50] shadow-xs'
                  : 'text-[#87786E] dark:text-[#A1958C] hover:text-[#352D29]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body / Tab Contents */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: TIMER SETTINGS */}
          {activeTab === 'timer' && (
            <div className="space-y-4">
              {/* Focus Duration */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF5EE] dark:bg-[#2D2622]">
                <div>
                  <span className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
                    {t.focusDuration}
                  </span>
                  <p className="text-xs text-[#87786E] dark:text-[#A1958C]">
                    Standart: 25 daqiqa
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={settings.focusMinutes}
                    onChange={(e) => updateSetting('focusMinutes', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-2.5 py-1.5 rounded-xl border border-[#E0D2C3] dark:border-[#443B35] bg-white dark:bg-[#231D1A] text-sm font-bold text-center text-[#F05A50]"
                  />
                  <span className="text-xs text-[#87786E]">{t.minutesUnit}</span>
                </div>
              </div>

              {/* Short Break Duration */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF5EE] dark:bg-[#2D2622]">
                <div>
                  <span className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
                    {t.shortBreakDuration}
                  </span>
                  <p className="text-xs text-[#87786E] dark:text-[#A1958C]">
                    Standart: 5 daqiqa
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={settings.shortBreakMinutes}
                    onChange={(e) => updateSetting('shortBreakMinutes', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-2.5 py-1.5 rounded-xl border border-[#E0D2C3] dark:border-[#443B35] bg-white dark:bg-[#231D1A] text-sm font-bold text-center text-[#7CA982]"
                  />
                  <span className="text-xs text-[#87786E]">{t.minutesUnit}</span>
                </div>
              </div>

              {/* Long Break Duration */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF5EE] dark:bg-[#2D2622]">
                <div>
                  <span className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
                    {t.longBreakDuration}
                  </span>
                  <p className="text-xs text-[#87786E] dark:text-[#A1958C]">
                    Standart: 15 daqiqa
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={settings.longBreakMinutes}
                    onChange={(e) => updateSetting('longBreakMinutes', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-2.5 py-1.5 rounded-xl border border-[#E0D2C3] dark:border-[#443B35] bg-white dark:bg-[#231D1A] text-sm font-bold text-center text-[#E08D79]"
                  />
                  <span className="text-xs text-[#87786E]">{t.minutesUnit}</span>
                </div>
              </div>

              {/* Sessions Before Long Break */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF5EE] dark:bg-[#2D2622]">
                <div>
                  <span className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
                    {t.sessionsBeforeLongBreak}
                  </span>
                  <p className="text-xs text-[#87786E] dark:text-[#A1958C]">
                    Standart: 4 sessiya
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={settings.longBreakInterval}
                    onChange={(e) => updateSetting('longBreakInterval', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-2.5 py-1.5 rounded-xl border border-[#E0D2C3] dark:border-[#443B35] bg-white dark:bg-[#231D1A] text-sm font-bold text-center text-[#352D29] dark:text-[#F3EDE6]"
                  />
                </div>
              </div>

              {/* Auto start toggles */}
              <div className="p-3.5 rounded-2xl bg-[#FAF5EE] dark:bg-[#2D2622] space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs sm:text-sm font-semibold text-[#352D29] dark:text-[#F3EDE6]">
                    {t.autoStartBreaks}
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.autoStartBreaks}
                    onChange={(e) => updateSetting('autoStartBreaks', e.target.checked)}
                    className="w-4 h-4 text-[#F05A50] rounded-sm accent-[#F05A50]"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs sm:text-sm font-semibold text-[#352D29] dark:text-[#F3EDE6]">
                    {t.autoStartFocus}
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.autoStartFocus}
                    onChange={(e) => updateSetting('autoStartFocus', e.target.checked)}
                    className="w-4 h-4 text-[#F05A50] rounded-sm accent-[#F05A50]"
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: GENERAL (Language & Theme) */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              {/* Language Selection */}
              <div className="p-4 rounded-2xl bg-[#FAF5EE] dark:bg-[#2D2622] space-y-2">
                <span className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
                  {t.languageSelect}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { code: 'uz', name: 'O\'zbekcha 🇺🇿' },
                    { code: 'en', name: 'English 🇬🇧' },
                    { code: 'ru', name: 'Русский 🇷🇺' },
                    { code: 'tr', name: 'Türkçe 🇹🇷' },
                    { code: 'ko', name: '한국어 🇰🇷' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        playTapSound(0.2);
                        updateSetting('language', lang.code as Language);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        settings.language === lang.code
                          ? 'bg-[#F05A50] border-[#F05A50] text-white shadow-xs'
                          : 'bg-white dark:bg-[#231D1A] border-[#E0D2C3] dark:border-[#443B35] text-[#352D29] dark:text-[#F3EDE6] hover:border-[#F05A50]'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selection */}
              <div className="p-4 rounded-2xl bg-[#FAF5EE] dark:bg-[#2D2622] space-y-2">
                <span className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
                  {t.themeSelect}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'light', label: t.themeLight, icon: '☀️' },
                    { key: 'dark', label: t.themeDark, icon: '🌙' },
                    { key: 'system', label: t.themeSystem, icon: '💻' },
                  ].map((thm) => (
                    <button
                      key={thm.key}
                      type="button"
                      onClick={() => {
                        playTapSound(0.2);
                        updateSetting('theme', thm.key as Theme);
                      }}
                      className={`p-3 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        settings.theme === thm.key
                          ? 'bg-[#F05A50] border-[#F05A50] text-white shadow-xs'
                          : 'bg-white dark:bg-[#231D1A] border-[#E0D2C3] dark:border-[#443B35] text-[#352D29] dark:text-[#F3EDE6] hover:border-[#F05A50]'
                      }`}
                    >
                      <span className="text-base">{thm.icon}</span>
                      <span>{thm.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Browser notifications */}
              <div className="p-4 rounded-2xl bg-[#FAF5EE] dark:bg-[#2D2622] flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
                    {t.notifications}
                  </span>
                  <p className="text-xs text-[#87786E] dark:text-[#A1958C]">
                    Tanaffus va sessiya tugaganda ogohlantirish
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRequestNotifications}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F05A50] text-white text-xs font-bold hover:bg-[#DE493F] cursor-pointer"
                >
                  {settings.notificationsEnabled ? 'Yoqilgan ✓' : 'Ruxsat berish'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: MASCOT SELECTION */}
          {activeTab === 'mascot' && (
            <MascotSelector
              currentMascot={settings.mascot}
              onSelectMascot={(m) => updateSetting('mascot', m)}
              language={settings.language}
            />
          )}

          {/* TAB 4: SOUND SETTINGS */}
          {activeTab === 'sound' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF5EE] dark:bg-[#2D2622] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
                      {t.soundEffects}
                    </span>
                    <p className="text-xs text-[#87786E] dark:text-[#A1958C]">
                      Sessiya yakunida sokin qo'ng'iroq ovozi
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.soundEnabled}
                    onChange={(e) => updateSetting('soundEnabled', e.target.checked)}
                    className="w-5 h-5 accent-[#F05A50] rounded-sm cursor-pointer"
                  />
                </div>

                {settings.soundEnabled && (
                  <div className="space-y-2 pt-2 border-t border-[#EAE0D3] dark:border-[#3E352F]">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#87786E]">
                      <span>{t.soundVolume}</span>
                      <span>{Math.round(settings.soundVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={settings.soundVolume}
                      onChange={(e) => updateSetting('soundVolume', parseFloat(e.target.value))}
                      className="w-full accent-[#F05A50]"
                    />
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={handleTestSound}
                        className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#231D1A] border border-[#E0D2C3] dark:border-[#443B35] text-xs font-bold text-[#F05A50] hover:bg-[#FAF3EA] transition-colors cursor-pointer"
                      >
                        🔔 {t.testSound}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DATA & RESET */}
          {activeTab === 'data' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF5EE] dark:bg-[#2D2622] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
                      {t.resetStats}
                    </span>
                    <p className="text-xs text-[#87786E] dark:text-[#A1958C]">
                      Barcha faoliyat tarixi va statistikani tozalash
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConfirmDialog({ open: true, type: 'stats' })}
                    className="px-3 py-1.5 rounded-xl bg-[#FDE8E7] text-[#D43D32] hover:bg-[#FCD3D1] text-xs font-bold border border-[#F05A50]/20 cursor-pointer"
                  >
                    {t.resetStats}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF5EE] dark:bg-[#2D2622] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-[#352D29] dark:text-[#F3EDE6]">
                      {t.resetOnboarding}
                    </span>
                    <p className="text-xs text-[#87786E] dark:text-[#A1958C]">
                      Kirish so'rovnomasini qayta o'tkazish
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConfirmDialog({ open: true, type: 'onboarding' })}
                    className="px-3 py-1.5 rounded-xl bg-[#F5E8DC] text-[#786D65] hover:bg-[#EDDCCF] text-xs font-bold border border-[#E0D2C3] cursor-pointer"
                  >
                    {t.resetOnboarding}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF5EE]/70 dark:bg-[#28211E] border-t border-[#F4E8DC] dark:border-[#382F2A] flex justify-end">
          <button
            type="button"
            onClick={() => {
              playTapSound(0.2);
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#F05A50] hover:bg-[#DE493F] text-white text-sm font-bold shadow-xs cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for Reset */}
      {confirmDialog.open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-[#28221E] w-full max-w-sm p-6 rounded-3xl border border-[#EFE2D4] dark:border-[#382F2A] shadow-2xl text-center space-y-4">
            <span className="text-3xl">⚠️</span>
            <h4 className="text-lg font-bold text-[#352D29] dark:text-[#F3EDE6]">
              {t.resetConfirmTitle}
            </h4>
            <p className="text-xs text-[#87786E] dark:text-[#A1958C] leading-relaxed">
              {t.resetConfirmMessage}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDialog({ open: false, type: 'stats' })}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#87786E] hover:bg-[#FAF3EA] cursor-pointer"
              >
                {t.confirmNo}
              </button>
              <button
                type="button"
                onClick={handleExecuteReset}
                className="px-5 py-2 rounded-xl bg-[#F05A50] hover:bg-[#DE493F] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                {t.confirmYes}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
