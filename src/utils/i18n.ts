import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  welcomeSubtitle: string;
  enterApp: string;

  // Onboarding
  onboardingStep: string;
  q1Title: string;
  q1_morning: string;
  q1_afternoon: string;
  q1_evening: string;
  q2Title: string;
  q2_study: string;
  q2_work: string;
  q2_habits: string;
  btnNext: string;
  btnBack: string;
  btnStart: string;

  // Dashboard & Greetings
  greetingMorning: string;
  greetingAfternoon: string;
  greetingEvening: string;
  goalSub_study: string;
  goalSub_work: string;
  goalSub_habits: string;
  focusStreak: string;
  daysStreak: string;
  dailyProgress: string;
  pomodoros: string;

  // Timer modes & controls
  modeFocus: string;
  modeShortBreak: string;
  modeLongBreak: string;
  btnStartTimer: string;
  btnPauseTimer: string;
  btnResumeTimer: string;
  btnResetTimer: string;
  btnSkipTimer: string;
  sessionCompletedTitle: string;
  sessionCompletedMsg: string;
  breakCompletedTitle: string;
  breakCompletedMsg: string;

  // Mascot climbing & state
  mascotStep: string;
  mascotRelaxing: string;
  mascotCelebrating: string;
  changeMascot: string;

  // Mascots
  mascot_tomato: string;
  mascot_strawberry: string;
  mascot_cherry: string;
  mascot_peach: string;
  mascot_green_tomato: string;
  mascot_tomato_desc: string;
  mascot_strawberry_desc: string;
  mascot_cherry_desc: string;
  mascot_peach_desc: string;
  mascot_green_tomato_desc: string;

  // Navigation / Sidebar
  navMenu: string;
  navCalendar: string;
  navStatistics: string;
  navGoals: string;
  navSettings: string;
  close: string;

  // Calendar
  calendarTitle: string;
  calendarLegendFull: string;
  calendarLegendPartial: string;
  calendarLegendNone: string;
  selectedDateStats: string;
  completedSessions: string;
  totalTime: string;
  dailyGoalReached: string;
  noActivityOnDate: string;
  minutesUnit: string;
  hoursUnit: string;

  // Statistics
  statsTitle: string;
  totalFocusTime: string;
  totalSessions: string;
  dailyAverage: string;
  longestStreak: string;
  weeklyChartTitle: string;
  monthlyProductivityTitle: string;
  heatmapTitle: string;
  heatmapSlotMorning: string;
  heatmapSlotAfternoon: string;
  heatmapSlotEvening: string;
  heatmapSlotNight: string;
  lowActivity: string;
  highActivity: string;
  todayLabel: string;

  // Goals
  goalsTitle: string;
  dailyTargetLabel: string;
  targetCount: string;
  addNewGoal: string;
  goalTitlePlaceholder: string;
  goalTargetPlaceholder: string;
  saveGoal: string;
  cancel: string;
  completedBadge: string;
  goalCheer: string;
  noGoalsYet: string;
  noGoalsDesc: string;
  deleteGoal: string;

  // Settings
  settingsTitle: string;
  tabGeneral: string;
  tabTimer: string;
  tabMascot: string;
  tabSound: string;
  tabData: string;
  languageSelect: string;
  themeSelect: string;
  themeLight: string;
  themeDark: string;
  themeSystem: string;
  focusDuration: string;
  shortBreakDuration: string;
  longBreakDuration: string;
  sessionsBeforeLongBreak: string;
  soundEffects: string;
  soundVolume: string;
  testSound: string;
  autoStartBreaks: string;
  autoStartFocus: string;
  notifications: string;
  resetStats: string;
  resetOnboarding: string;
  resetConfirmTitle: string;
  resetConfirmMessage: string;
  confirmYes: string;
  confirmNo: string;

  // Quotes
  quotes: string[];

  // Footer & Help
  footerLove: string;
  helpTip: string;
  quickTips: string[];
}

export const translations: Record<Language, Translations> = {
  uz: {
    appName: 'mypomo',
    tagline: 'Little steps, big dreams.',
    welcomeSubtitle: 'Kichik qadamlar, buyuk orzular sari yo\'l.',
    enterApp: 'Kirish',

    onboardingStep: 'Qadam',
    q1Title: "Siz qaysi vaqtda ko'proq diqqat bilan ishlaysiz?",
    q1_morning: 'Ertalab',
    q1_afternoon: 'Kunduzi',
    q1_evening: 'Kechqurun',
    q2Title: 'Pomodoro orqali nimaga erishmoqchisiz?',
    q2_study: 'Darslarimni samarali qilish',
    q2_work: 'Ishlarimni tartibga solish',
    q2_habits: 'Yangi odatlar shakllantirish',
    btnNext: 'Keyingisi',
    btnBack: 'Orqaga',
    btnStart: 'Boshlash',

    greetingMorning: 'Xayrli tong!',
    greetingAfternoon: 'Xayrli kun!',
    greetingEvening: 'Xayrli oqshom!',
    goalSub_study: 'Bugungi darslaringizda omad tilaymiz! 📚',
    goalSub_work: 'Ishlarni tartibli va xotirjam bajaramiz 💻',
    goalSub_habits: 'Yangi odatlaringiz mustahkam bo\'lsin 🌱',
    focusStreak: 'Seriya',
    daysStreak: 'kunlik seriya',
    dailyProgress: 'Bugungi reja',
    pomodoros: 'pomodoro',

    modeFocus: 'Diqqat vaqti',
    modeShortBreak: 'Qisqa tanaffus',
    modeLongBreak: 'Uzoq tanaffus',
    btnStartTimer: 'Boshlash',
    btnPauseTimer: 'To\'xtatib turish',
    btnResumeTimer: 'Davom etish',
    btnResetTimer: 'Qayta o\'rnatish',
    btnSkipTimer: 'Keyingisiga o\'tish',
    sessionCompletedTitle: 'Ajoyib natija! 🎉',
    sessionCompletedMsg: 'Diqqat sessiyasi yakunlandi. Endi biroz dam oling!',
    breakCompletedTitle: 'Tanaffus tugadi! ☕',
    breakCompletedMsg: 'Yangi quvvat bilan ishlashga tayyormisiz?',

    mascotStep: 'zinapoyada',
    mascotRelaxing: 'Dam olmoqda...',
    mascotCelebrating: 'G\'alaba! Barakalla!',
    changeMascot: 'Qahramonni almashtirish',

    mascot_tomato: 'Klassik pomidor',
    mascot_strawberry: 'Qulupnayvoy',
    mascot_cherry: 'Gilosvoy',
    mascot_peach: 'Shaftolivoy',
    mascot_green_tomato: 'Yashil pomidor',
    mascot_tomato_desc: 'Mehribon, qizil va doimo quvnoq klassik do\'st',
    mascot_strawberry_desc: 'Shirin, muloyim va ilhom baxsh etuvchi qulupnay',
    mascot_cherry_desc: 'Jozibali, chaqqon va shijoatli giloscha',
    mascot_peach_desc: 'Iliq, sokin va xotirjam shaftoli',
    mascot_green_tomato_desc: 'Tiniq, tetik va o\'sishga intiluvchi yashil nihol',

    navMenu: 'Menyu',
    navCalendar: 'Kunlik faoliyat',
    navStatistics: 'Mening statistikam',
    navGoals: 'Maqsadlarim',
    navSettings: 'Sozlamalar',
    close: 'Yopish',

    calendarTitle: 'Oylik faoliyat taqvimi',
    calendarLegendFull: 'Maqsad bajarilgan kun',
    calendarLegendPartial: 'Qisman bajarilgan kun',
    calendarLegendNone: 'Faoliyatsiz kun',
    selectedDateStats: 'Sanadagi natijalar',
    completedSessions: 'Tugallangan sessiyalar',
    totalTime: 'Jami diqqat vaqti',
    dailyGoalReached: 'Kunlik reja bajarilishi',
    noActivityOnDate: 'Bu kunda faoliyat qayd etilmagan',
    minutesUnit: 'daq',
    hoursUnit: 'soat',

    statsTitle: 'Mening statistikam',
    totalFocusTime: 'Jami diqqat vaqti',
    totalSessions: 'Jami pomodorolar',
    dailyAverage: 'Kunlik o\'rtacha',
    longestStreak: 'Eng uzun seriya',
    weeklyChartTitle: 'Haftalik diqqat vaqti (oxirgi 7 kun)',
    monthlyProductivityTitle: 'Oylik samaradorlik dinamikasi',
    heatmapTitle: 'Haftalik faollik xaritasi (Heatmap)',
    heatmapSlotMorning: 'Ertalab',
    heatmapSlotAfternoon: 'Kunduzi',
    heatmapSlotEvening: 'Kechqurun',
    heatmapSlotNight: 'Tun',
    lowActivity: 'Kam',
    highActivity: 'Ko\'p',
    todayLabel: 'Bugun',

    goalsTitle: 'Shaxsiy maqsadlarim',
    dailyTargetLabel: 'Kunlik pomodoro maqsadi',
    targetCount: 'ta pomodoro',
    addNewGoal: 'Yangi maqsad qo\'shish',
    goalTitlePlaceholder: 'Masalan: Ingliz tili lug\'at yodlash',
    goalTargetPlaceholder: 'Maqsad soni (masalan: 4)',
    saveGoal: 'Saqlash',
    cancel: 'Bekor qilish',
    completedBadge: 'Bajarildi! 🍅',
    goalCheer: 'Tabriklaymiz! Siz bugungi maqsadingizga yetdingiz! 🌟',
    noGoalsYet: 'Hozircha maqsadlar yo\'q',
    noGoalsDesc: 'Yangi maqsad qo\'shib, diqqatingizni yo\'naltiring.',
    deleteGoal: 'O\'chirish',

    settingsTitle: 'Sozlamalar',
    tabGeneral: 'Umumiy',
    tabTimer: 'Taymer',
    tabMascot: 'Qahramon',
    tabSound: 'Ovoz',
    tabData: 'Xotira',
    languageSelect: 'Tilni tanlash',
    themeSelect: 'Mavzu (Theme)',
    themeLight: 'Yorug\'',
    themeDark: 'Qorong\'u',
    themeSystem: 'Tizim bo\'yicha',
    focusDuration: 'Diqqat vaqti (daqiqa)',
    shortBreakDuration: 'Qisqa tanaffus (daqiqa)',
    longBreakDuration: 'Uzoq tanaffus (daqiqa)',
    sessionsBeforeLongBreak: 'Uzoq tanaffusgacha sessiyalar soni',
    soundEffects: 'Ovozli bildirishnomalar',
    soundVolume: 'Ovoz balandligi',
    testSound: 'Ovozni sinab ko\'rish',
    autoStartBreaks: 'Tanaffuslarni avtomatik boshlash',
    autoStartFocus: 'Diqqat vaqtini avtomatik boshlash',
    notifications: 'Brauzer bildirishnomalari',
    resetStats: 'Statistikani tozalash',
    resetOnboarding: 'Kirish so\'rovnomasini qayta o\'tkazish',
    resetConfirmTitle: 'Ma\'lumotlarni qayta tiklash',
    resetConfirmMessage: 'Haqiqatan ham barcha ma\'lumotlarni o\'chirib, qayta boshlamoqchimisiz? Bu amalni ortga qaytarib bo\'lmaydi.',
    confirmYes: 'Ha, tozalansin',
    confirmNo: 'Yo\'q, qolsin',

    quotes: [
      'Kichik qadamlar har kuni sizni orzuingiz sari yaqinlashtiradi.',
      'Diqqat — bu quvvat. Uni eng muhim ishlarga sarflang.',
      'Bitta pomodoro, bitta g\'alaba.',
      'Sabr va tartib har qanday iste\'doddan ustundir.',
      'Bugun ekilgan urug\' ertaga katta daraxt bo\'ladi.'
    ],

    footerLove: 'Made with 🍅 and love',
    helpTip: 'Yordam va maslahatlar',
    quickTips: [
      '25 daqiqa faqat bitta vazifaga e\'tiboringizni qarating.',
      '5 daqiqalik tanaffusda ko\'zingizni ekrandan oling va chuqur nafas oling.',
      'Har 4 ta sessiyadan so\'ng 15 daqiqa to\'liq hordiq chiqaring.'
    ]
  },

  en: {
    appName: 'mypomo',
    tagline: 'Little steps, big dreams.',
    welcomeSubtitle: 'Gentle focus, mindful rhythm, and joyful progress.',
    enterApp: 'Kirish', // The prompt specifies "Kirish" for the welcome button!

    onboardingStep: 'Step',
    q1Title: 'What time of day do you focus best?',
    q1_morning: 'Morning',
    q1_afternoon: 'Afternoon',
    q1_evening: 'Evening',
    q2Title: 'What is your primary goal with Pomodoro?',
    q2_study: 'Boost my study efficiency',
    q2_work: 'Organize my daily work',
    q2_habits: 'Cultivate mindful habits',
    btnNext: 'Next',
    btnBack: 'Back',
    btnStart: 'Get Started',

    greetingMorning: 'Good morning!',
    greetingAfternoon: 'Good afternoon!',
    greetingEvening: 'Good evening!',
    goalSub_study: 'Wishing you clarity and focus on your studies! 📚',
    goalSub_work: 'Stay calm and organized with your tasks today 💻',
    goalSub_habits: 'Every mindful moment builds strong habits 🌱',
    focusStreak: 'Streak',
    daysStreak: 'days streak',
    dailyProgress: 'Daily Target',
    pomodoros: 'pomodoros',

    modeFocus: 'Focus Time',
    modeShortBreak: 'Short Break',
    modeLongBreak: 'Long Break',
    btnStartTimer: 'Start',
    btnPauseTimer: 'Pause',
    btnResumeTimer: 'Resume',
    btnResetTimer: 'Reset',
    btnSkipTimer: 'Skip to next',
    sessionCompletedTitle: 'Splendid work! 🎉',
    sessionCompletedMsg: 'Focus session complete. Time to breathe and take a rest!',
    breakCompletedTitle: 'Break finished! ☕',
    breakCompletedMsg: 'Ready to bring your fresh energy into focus?',

    mascotStep: 'on stairs',
    mascotRelaxing: 'Resting peacefully...',
    mascotCelebrating: 'Hooray! You did it!',
    changeMascot: 'Change Character',

    mascot_tomato: 'Classic Tomato',
    mascot_strawberry: 'Sweet Berry',
    mascot_cherry: 'Ruby Cherry',
    mascot_peach: 'Cozy Peach',
    mascot_green_tomato: 'Green Sprout',
    mascot_tomato_desc: 'Warm, cheerful, and your trusty little productivity guide',
    mascot_strawberry_desc: 'Sweet, bright, and inspiring companion',
    mascot_cherry_desc: 'Zesty, energetic, and playful',
    mascot_peach_desc: 'Gentle, soothing, and relaxing friend',
    mascot_green_tomato_desc: 'Fresh, crisp, and eager for steady growth',

    navMenu: 'Menu',
    navCalendar: 'Daily Activity',
    navStatistics: 'My Statistics',
    navGoals: 'My Goals',
    navSettings: 'Settings',
    close: 'Close',

    calendarTitle: 'Monthly Activity Calendar',
    calendarLegendFull: 'Daily goal completed',
    calendarLegendPartial: 'Partially completed day',
    calendarLegendNone: 'No activity',
    selectedDateStats: 'Activity for selected day',
    completedSessions: 'Completed sessions',
    totalTime: 'Total focus duration',
    dailyGoalReached: 'Daily goal progress',
    noActivityOnDate: 'No focus recorded on this day',
    minutesUnit: 'min',
    hoursUnit: 'hrs',

    statsTitle: 'My Statistics',
    totalFocusTime: 'Total Focus Time',
    totalSessions: 'Completed Pomodoros',
    dailyAverage: 'Daily Average',
    longestStreak: 'Longest Streak',
    weeklyChartTitle: 'Weekly Focus Time (Past 7 Days)',
    monthlyProductivityTitle: 'Monthly Productivity Trend',
    heatmapTitle: 'Weekly Activity Heatmap',
    heatmapSlotMorning: 'Morning',
    heatmapSlotAfternoon: 'Afternoon',
    heatmapSlotEvening: 'Evening',
    heatmapSlotNight: 'Night',
    lowActivity: 'Low',
    highActivity: 'High',
    todayLabel: 'Today',

    goalsTitle: 'Personal Goals',
    dailyTargetLabel: 'Daily Pomodoro Target',
    targetCount: 'pomodoros',
    addNewGoal: 'Add New Goal',
    goalTitlePlaceholder: 'e.g. Master React hooks, Read 20 pages',
    goalTargetPlaceholder: 'Target count (e.g. 4)',
    saveGoal: 'Save Goal',
    cancel: 'Cancel',
    completedBadge: 'Completed! 🍅',
    goalCheer: 'Magnificent! You conquered your goal today! 🌟',
    noGoalsYet: 'No active goals yet',
    noGoalsDesc: 'Create a tailored goal to channel your focus effortlessly.',
    deleteGoal: 'Delete',

    settingsTitle: 'Settings',
    tabGeneral: 'General',
    tabTimer: 'Timer',
    tabMascot: 'Character',
    tabSound: 'Sound',
    tabData: 'Data',
    languageSelect: 'Select Language',
    themeSelect: 'Color Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System Default',
    focusDuration: 'Focus Duration (minutes)',
    shortBreakDuration: 'Short Break Duration (minutes)',
    longBreakDuration: 'Long Break Duration (minutes)',
    sessionsBeforeLongBreak: 'Sessions before Long Break',
    soundEffects: 'Sound Notifications',
    soundVolume: 'Sound Volume',
    testSound: 'Play Test Chime',
    autoStartBreaks: 'Auto-start Breaks',
    autoStartFocus: 'Auto-start Focus Sessions',
    notifications: 'Browser Notifications',
    resetStats: 'Reset Statistics',
    resetOnboarding: 'Reset Onboarding Questionnaire',
    resetConfirmTitle: 'Reset Data Confirmation',
    resetConfirmMessage: 'Are you sure you want to erase this data? This action cannot be undone.',
    confirmYes: 'Yes, reset',
    confirmNo: 'Cancel',

    quotes: [
      'Little steps each day add up to monumental achievements.',
      'Focus is a muscle; gentle rhythm makes it stronger.',
      'One calm pomodoro at a time.',
      'Consistency is peaceful when rooted in care.',
      'Small seeds planted today grow into tomorrow’s orchard.'
    ],

    footerLove: 'Made with 🍅 and love',
    helpTip: 'Mindful Tips',
    quickTips: [
      'Focus purely on one singular task for the 25-minute cycle.',
      'During breaks, look into the distance, hydrate, and stretch.',
      'Rest deeply during the 15-minute long break every 4 sessions.'
    ]
  },

  ru: {
    appName: 'mypomo',
    tagline: 'Little steps, big dreams.',
    welcomeSubtitle: 'Маленькие шаги ведут к великим мечтам.',
    enterApp: 'Kirish',

    onboardingStep: 'Шаг',
    q1Title: 'В какое время суток вам легче всего сосредоточиться?',
    q1_morning: 'Утром',
    q1_afternoon: 'Днём',
    q1_evening: 'Вечером',
    q2Title: 'Чего вы хотите достичь с помощью Pomodoro?',
    q2_study: 'Повысить продуктивность в учебе',
    q2_work: 'Навести порядок в рабочих делах',
    q2_habits: 'Сформировать полезные привычки',
    btnNext: 'Далее',
    btnBack: 'Назад',
    btnStart: 'Начать',

    greetingMorning: 'Доброе утро!',
    greetingAfternoon: 'Добрый день!',
    greetingEvening: 'Добрый вечер!',
    goalSub_study: 'Успехов и ясного ума в сегодняшней учебе! 📚',
    goalSub_work: 'Спокойно и уверенно справляемся с задачами 💻',
    goalSub_habits: 'Каждый осознанный шаг растит новые привычки 🌱',
    focusStreak: 'Серия',
    daysStreak: 'дн. подряд',
    dailyProgress: 'План на день',
    pomodoros: 'помодоро',

    modeFocus: 'Время фокуса',
    modeShortBreak: 'Короткий перерыв',
    modeLongBreak: 'Длинный перерыв',
    btnStartTimer: 'Старт',
    btnPauseTimer: 'Пауза',
    btnResumeTimer: 'Продолжить',
    btnResetTimer: 'Сбросить',
    btnSkipTimer: 'Пропустить',
    sessionCompletedTitle: 'Отличная работа! 🎉',
    sessionCompletedMsg: 'Сессия фокуса завершена. Время немного передохнуть!',
    breakCompletedTitle: 'Перерыв окончен! ☕',
    breakCompletedMsg: 'Готовы вернуться к делам с новыми силами?',

    mascotStep: 'на ступеньках',
    mascotRelaxing: 'Отдыхает...',
    mascotCelebrating: 'Ура! Победа!',
    changeMascot: 'Сменить персонажа',

    mascot_tomato: 'Классический томатик',
    mascot_strawberry: 'Клубничка',
    mascot_cherry: 'Вишенка',
    mascot_peach: 'Персик',
    mascot_green_tomato: 'Зеленый томатик',
    mascot_tomato_desc: 'Добрый, теплый и верный друг продуктивности',
    mascot_strawberry_desc: 'Сладкая, нежная и вдохновляющая подружка',
    mascot_cherry_desc: 'Бодрая, яркая и энергичная ягодка',
    mascot_peach_desc: 'Мягкий, умиротворяющий и уютный спутник',
    mascot_green_tomato_desc: 'Свежий, бодрый и стремящийся к росту',

    navMenu: 'Меню',
    navCalendar: 'Ежедневная активность',
    navStatistics: 'Моя статистика',
    navGoals: 'Мои цели',
    navSettings: 'Настройки',
    close: 'Закрыть',

    calendarTitle: 'Календарь активности',
    calendarLegendFull: 'Цель на день достигнута',
    calendarLegendPartial: 'Частично выполненный день',
    calendarLegendNone: 'Нет активности',
    selectedDateStats: 'Результаты за день',
    completedSessions: 'Завершенные сессии',
    totalTime: 'Общее время фокуса',
    dailyGoalReached: 'Выполнение цели',
    noActivityOnDate: 'В этот день не было зафиксировано занятий',
    minutesUnit: 'мин',
    hoursUnit: 'ч',

    statsTitle: 'Моя статистика',
    totalFocusTime: 'Всего времени фокуса',
    totalSessions: 'Завершено помодоро',
    dailyAverage: 'Среднее за день',
    longestStreak: 'Лучшая серия',
    weeklyChartTitle: 'Время фокуса за неделю (последние 7 дней)',
    monthlyProductivityTitle: 'Динамика продуктивности по месяцам',
    heatmapTitle: 'Тепловая карта активности (Heatmap)',
    heatmapSlotMorning: 'Утро',
    heatmapSlotAfternoon: 'День',
    heatmapSlotEvening: 'Вечер',
    heatmapSlotNight: 'Ночь',
    lowActivity: 'Мало',
    highActivity: 'Много',
    todayLabel: 'Сегодня',

    goalsTitle: 'Мои цели',
    dailyTargetLabel: 'Цель на день (помодоро)',
    targetCount: 'помодоро',
    addNewGoal: 'Добавить цель',
    goalTitlePlaceholder: 'Например: Изучение слов, Чтение книги',
    goalTargetPlaceholder: 'Количество помодоро (например: 4)',
    saveGoal: 'Сохранить',
    cancel: 'Отмена',
    completedBadge: 'Выполнено! 🍅',
    goalCheer: 'Превосходно! Вы достигли цели на сегодня! 🌟',
    noGoalsYet: 'Пока нет целей',
    noGoalsDesc: 'Добавьте цель, чтобы сосредоточиться на главном.',
    deleteGoal: 'Удалить',

    settingsTitle: 'Настройки',
    tabGeneral: 'Общие',
    tabTimer: 'Таймер',
    tabMascot: 'Персонаж',
    tabSound: 'Звук',
    tabData: 'Данные',
    languageSelect: 'Выбор языка',
    themeSelect: 'Тема оформления',
    themeLight: 'Светлая',
    themeDark: 'Тёмная',
    themeSystem: 'Системная',
    focusDuration: 'Длительность фокуса (минуты)',
    shortBreakDuration: 'Короткий перерыв (минуты)',
    longBreakDuration: 'Длинный перерыв (минуты)',
    sessionsBeforeLongBreak: 'Сессий до длинного перерыва',
    soundEffects: 'Звуковые оповещения',
    soundVolume: 'Громкость звука',
    testSound: 'Проверить звук',
    autoStartBreaks: 'Автостарт перерывов',
    autoStartFocus: 'Автостарт времени фокуса',
    notifications: 'Уведомления браузера',
    resetStats: 'Сбросить статистику',
    resetOnboarding: 'Пройти анкету заново',
    resetConfirmTitle: 'Подтверждение сброса',
    resetConfirmMessage: 'Вы уверены, что хотите удалить эти данные? Это действие необратимо.',
    confirmYes: 'Да, сбросить',
    confirmNo: 'Отмена',

    quotes: [
      'Маленькие шаги каждый день приводят к большим переменам.',
      'Концентрация — это бережное отношение к своему времени.',
      'Одно спокойное помодоро за раз.',
      'Постоянство важнее спешки.',
      'Посеянное сегодня зерно завтра станет пышным садом.'
    ],

    footerLove: 'Made with 🍅 and love',
    helpTip: 'Советы по концентрации',
    quickTips: [
      '25 минут держите внимание только на одной задаче.',
      'На 5-минутном перерыве отведите взгляд от экрана и потянитесь.',
      'Каждые 4 помодоро отдыхайте полноценно 15 минут.'
    ]
  },

  tr: {
    appName: 'mypomo',
    tagline: 'Little steps, big dreams.',
    welcomeSubtitle: 'Küçük adımlar, büyük hayaller yolculuğu.',
    enterApp: 'Kirish',

    onboardingStep: 'Adım',
    q1Title: 'Günün hangi vaktinde daha odaklı çalışırsınız?',
    q1_morning: 'Sabah',
    q1_afternoon: 'Öğlen',
    q1_evening: 'Akşam',
    q2Title: 'Pomodoro tekniği ile neye ulaşmak istiyorsunuz?',
    q2_study: 'Derslerimde verimliliği artırmak',
    q2_work: 'İşlerimi düzenlemek ve planlamak',
    q2_habits: 'Yeni ve kalıcı alışkanlıklar edinmek',
    btnNext: 'İleri',
    btnBack: 'Geri',
    btnStart: 'Başla',

    greetingMorning: 'Günaydın!',
    greetingAfternoon: 'Tünaydın!',
    greetingEvening: 'İyi akşamlar!',
    goalSub_study: 'Bugünkü derslerinizde başarılar ve zihin açıklığı dileriz! 📚',
    goalSub_work: 'İşlerinizi huzur ve düzenle tamamlayın 💻',
    goalSub_habits: 'Her küçük odaklanma yeni alışkanlıklar yeşertir 🌱',
    focusStreak: 'Seri',
    daysStreak: 'günlük seri',
    dailyProgress: 'Günlük Hedef',
    pomodoros: 'pomodoro',

    modeFocus: 'Odak Zamanı',
    modeShortBreak: 'Kısa Mola',
    modeLongBreak: 'Uzun Mola',
    btnStartTimer: 'Başlat',
    btnPauseTimer: 'Duraklat',
    btnResumeTimer: 'Devam Et',
    btnResetTimer: 'Sıfırla',
    btnSkipTimer: 'Sonrakine Geç',
    sessionCompletedTitle: 'Harika bir başarı! 🎉',
    sessionCompletedMsg: 'Odaklanma oturumu tamamlandı. Şimdi güzel bir mola verin!',
    breakCompletedTitle: 'Mola sona erdi! ☕',
    breakCompletedMsg: 'Taze bir enerjiyle odaklanmaya hazır mısınız?',

    mascotStep: 'merdivende',
    mascotRelaxing: 'Dinleniyor...',
    mascotCelebrating: 'Tebrikler! Başardın!',
    changeMascot: 'Karakteri Değiştir',

    mascot_tomato: 'Klasik Domates',
    mascot_strawberry: 'Çilek Hanım',
    mascot_cherry: 'Kiraz Bey',
    mascot_peach: 'Tatlı Şeftali',
    mascot_green_tomato: 'Yeşil Domates',
    mascot_tomato_desc: 'Sıcakkanlı, sevimli ve sadık odak arkadaşınız',
    mascot_strawberry_desc: 'Tatlı, neşeli ve ilham dolu çilek',
    mascot_cherry_desc: 'Enerjik, kıpır kıpır ve sevecen kiraz',
    mascot_peach_desc: 'Sakin, huzurlu ve dinlendirici şeftali',
    mascot_green_tomato_desc: 'Taze, ferah ve gelişime açık yeşil filiz',

    navMenu: 'Menü',
    navCalendar: 'Günlük Etkinlik',
    navStatistics: 'İstatistiklerim',
    navGoals: 'Hedeflerim',
    navSettings: 'Ayarlar',
    close: 'Kapat',

    calendarTitle: 'Aylık Etkinlik Takvimi',
    calendarLegendFull: 'Hedef tamamlanan gün',
    calendarLegendPartial: 'Kısmen tamamlanan gün',
    calendarLegendNone: 'Etkinlik yok',
    selectedDateStats: 'Seçili günün özeti',
    completedSessions: 'Tamamlanan oturumlar',
    totalTime: 'Toplam odak süresi',
    dailyGoalReached: 'Günlük hedef oranı',
    noActivityOnDate: 'Bu günde odak kaydı bulunmuyor',
    minutesUnit: 'dk',
    hoursUnit: 'saat',

    statsTitle: 'İstatistiklerim',
    totalFocusTime: 'Toplam Odaklanma',
    totalSessions: 'Tamamlanan Pomodoro',
    dailyAverage: 'Günlük Ortalama',
    longestStreak: 'En Uzun Seri',
    weeklyChartTitle: 'Haftalık Odaklanma Süresi (Son 7 Gün)',
    monthlyProductivityTitle: 'Aylık Verimlilik Grafiği',
    heatmapTitle: 'Haftalık Aktivite Yoğunluğu (Heatmap)',
    heatmapSlotMorning: 'Sabah',
    heatmapSlotAfternoon: 'Öğlen',
    heatmapSlotEvening: 'Akşam',
    heatmapSlotNight: 'Gece',
    lowActivity: 'Az',
    highActivity: 'Çok',
    todayLabel: 'Bugün',

    goalsTitle: 'Kişisel Hedeflerim',
    dailyTargetLabel: 'Günlük Pomodoro Hedefi',
    targetCount: 'pomodoro',
    addNewGoal: 'Yeni Hedef Ekle',
    goalTitlePlaceholder: 'Örn: Kelime ezberi, Kitap okuma',
    goalTargetPlaceholder: 'Hedef pomodoro sayısı (örn: 4)',
    saveGoal: 'Kaydet',
    cancel: 'İptal',
    completedBadge: 'Tamamlandı! 🍅',
    goalCheer: 'Mükemmel! Bugünkü hedefinize ulaştınız! 🌟',
    noGoalsYet: 'Henüz hedef yok',
    noGoalsDesc: 'Odağınızı netleştirmek için yeni bir hedef belirleyin.',
    deleteGoal: 'Sil',

    settingsTitle: 'Ayarlar',
    tabGeneral: 'Genel',
    tabTimer: 'Zamanlayıcı',
    tabMascot: 'Karakter',
    tabSound: 'Ses',
    tabData: 'Veriler',
    languageSelect: 'Dil Seçimi',
    themeSelect: 'Tema',
    themeLight: 'Açık',
    themeDark: 'Karanlık',
    themeSystem: 'Sistem',
    focusDuration: 'Odak Süresi (dakika)',
    shortBreakDuration: 'Kısa Mola (dakika)',
    longBreakDuration: 'Uzun Mola (dakika)',
    sessionsBeforeLongBreak: 'Uzun molaya kalan oturum',
    soundEffects: 'Sesli Bildirimler',
    soundVolume: 'Ses Seviyesi',
    testSound: 'Sesi Dene',
    autoStartBreaks: 'Molaları otomatik başlat',
    autoStartFocus: 'Odak oturumunu otomatik başlat',
    notifications: 'Tarayıcı Bildirimleri',
    resetStats: 'İstatistikleri Sıfırla',
    resetOnboarding: 'Anketi Baştan Yap',
    resetConfirmTitle: 'Verileri Sıfırlama Onayı',
    resetConfirmMessage: 'Tüm verilerinizi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    confirmYes: 'Evet, sıfırla',
    confirmNo: 'Vazgeç',

    quotes: [
      'Her gün atılan küçük bir adım, yarının büyük başarısıdır.',
      'Odaklanmak zihnin en tatlı dinlencesidir.',
      'Sakin kal, her seferinde sadece tek bir pomodoro.',
      'İstikrar, aceleden her zaman daha güçlüdür.',
      'Bugün sevgiyle diktiğin tohum yarın çiçek açar.'
    ],

    footerLove: 'Made with 🍅 and love',
    helpTip: 'İpuçları',
    quickTips: [
      '25 dakika boyunca sadece tek bir göreve yoğunlaşın.',
      '5 dakikalık molada ekrandan uzaklaşın ve su için.',
      'Her 4 pomodoro sonrasında 15 dakikalık uzun mola verin.'
    ]
  },

  ko: {
    appName: 'mypomo',
    tagline: 'Little steps, big dreams.',
    welcomeSubtitle: '작은 발걸음이 모여 이루는 큰 꿈.',
    enterApp: 'Kirish',

    onboardingStep: '단계',
    q1Title: '하루 중 언제 가장 집중이 잘 되시나요?',
    q1_morning: '아침',
    q1_afternoon: '낮',
    q1_evening: '저녁',
    q2Title: '뽀모도로를 통해 무엇을 이루고 싶으신가요?',
    q2_study: '학습 효율 극대화',
    q2_work: '업무 정리 및 생산성 향상',
    q2_habits: '좋은 습관 형성',
    btnNext: '다음',
    btnBack: '뒤로',
    btnStart: '시작하기',

    greetingMorning: '좋은 아침이에요!',
    greetingAfternoon: '즐거운 오후예요!',
    greetingEvening: '편안한 저녁이에요!',
    goalSub_study: '오늘의 배움에 명쾌함과 즐거움이 가득하길! 📚',
    goalSub_work: '차분하고 정돈된 마음으로 일을 마쳐봐요 💻',
    goalSub_habits: '마음 챙김 한 걸음이 튼튼한 습관을 만듭니다 🌱',
    focusStreak: '연속',
    daysStreak: '일 연속 집중',
    dailyProgress: '오늘의 목표',
    pomodoros: '뽀모도로',

    modeFocus: '집중 시간',
    modeShortBreak: '짧은 휴식',
    modeLongBreak: '긴 휴식',
    btnStartTimer: '시작',
    btnPauseTimer: '일시정지',
    btnResumeTimer: '이어하기',
    btnResetTimer: '초기화',
    btnSkipTimer: '건너뛰기',
    sessionCompletedTitle: '정말 멋져요! 🎉',
    sessionCompletedMsg: '집중 세션이 끝났습니다. 이제 달콤한 휴식을 즐기세요!',
    breakCompletedTitle: '휴식 끝! ☕',
    breakCompletedMsg: '새로운 에너지로 다시 몰입해 볼까요?',

    mascotStep: '계단 오르는 중',
    mascotRelaxing: '편안히 휴식 중...',
    mascotCelebrating: '축하해요! 해냈어요!',
    changeMascot: '캐릭터 변경',

    mascot_tomato: '클래식 토마토',
    mascot_strawberry: '달콤 딸기',
    mascot_cherry: '체리 친구',
    mascot_peach: '포근 복숭아',
    mascot_green_tomato: '초록 토마토',
    mascot_tomato_desc: '다정하고 밝은 나의 든든한 뽀모 친구',
    mascot_strawberry_desc: '상큼하고 영감을 주는 달콤한 딸기',
    mascot_cherry_desc: '활기차고 톡톡 튀는 사랑스러운 체리',
    mascot_peach_desc: '부드럽고 마음을 편안하게 해주는 복숭아',
    mascot_green_tomato_desc: '싱그럽고 성장을 꿈꾸는 초록 새싹',

    navMenu: '메뉴',
    navCalendar: '일일 활동',
    navStatistics: '나의 통계',
    navGoals: '나의 목표',
    navSettings: '설정',
    close: '닫기',

    calendarTitle: '월간 활동 캘린더',
    calendarLegendFull: '목표 달성한 날',
    calendarLegendPartial: '부분 달성한 날',
    calendarLegendNone: '기록 없음',
    selectedDateStats: '선택한 날의 결과',
    completedSessions: '완료한 세션',
    totalTime: '총 집중 시간',
    dailyGoalReached: '일일 목표 달성도',
    noActivityOnDate: '이 날짜에는 기록된 세션이 없습니다',
    minutesUnit: '분',
    hoursUnit: '시간',

    statsTitle: '나의 통계',
    totalFocusTime: '총 집중 시간',
    totalSessions: '완료한 뽀모도로',
    dailyAverage: '일일 평균',
    longestStreak: '최장 연속 기록',
    weeklyChartTitle: '주간 집중 시간 (최근 7일)',
    monthlyProductivityTitle: '월간 생산성 추이',
    heatmapTitle: '주간 활동 히트맵',
    heatmapSlotMorning: '아침',
    heatmapSlotAfternoon: '낮',
    heatmapSlotEvening: '저녁',
    heatmapSlotNight: '밤',
    lowActivity: '적음',
    highActivity: '많음',
    todayLabel: '오늘',

    goalsTitle: '개인 목표 관리',
    dailyTargetLabel: '하루 목표 뽀모도로',
    targetCount: '개 뽀모도로',
    addNewGoal: '새 목표 추가',
    goalTitlePlaceholder: '예: 단어 외우기, 리액트 공부',
    goalTargetPlaceholder: '목표 뽀모도로 수 (예: 4)',
    saveGoal: '저장',
    cancel: '취소',
    completedBadge: '달성 완료! 🍅',
    goalCheer: '축하합니다! 오늘의 목표를 훌륭히 달성하셨어요! 🌟',
    noGoalsYet: '등록된 목표가 없습니다',
    noGoalsDesc: '새로운 목표를 세우고 집중력을 발휘해 보세요.',
    deleteGoal: '삭제',

    settingsTitle: '설정',
    tabGeneral: '일반',
    tabTimer: '타이머',
    tabMascot: '캐릭터',
    tabSound: '소리',
    tabData: '데이터',
    languageSelect: '언어 선택',
    themeSelect: '테마',
    themeLight: '라이트',
    themeDark: '다크',
    themeSystem: '시스템 설정',
    focusDuration: '집중 시간 (분)',
    shortBreakDuration: '짧은 휴식 (분)',
    longBreakDuration: '긴 휴식 (분)',
    sessionsBeforeLongBreak: '긴 휴식 전 세션 수',
    soundEffects: '효과음 알림',
    soundVolume: '볼륨',
    testSound: '소리 테스트',
    autoStartBreaks: '휴식 자동 시작',
    autoStartFocus: '집중 세션 자동 시작',
    notifications: '브라우저 알림',
    resetStats: '통계 초기화',
    resetOnboarding: '설문 다시 진행',
    resetConfirmTitle: '데이터 초기화 확인',
    resetConfirmMessage: '정말로 모든 데이터를 삭제하고 처음부터 시작하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    confirmYes: '초기화',
    confirmNo: '취소',

    quotes: [
      '매일의 작은 걸음들이 모여 거대한 꿈을 이룹니다.',
      '몰입은 마음에 주는 가장 따뜻한 선물입니다.',
      '차분하게, 한 번에 뽀모 하나씩.',
      '꾸준함은 조급함보다 언제나 강합니다.',
      '오늘 심은 작은 씨앗이 내일 울창한 숲이 됩니다.'
    ],

    footerLove: 'Made with 🍅 and love',
    helpTip: '뽀모도로 팁',
    quickTips: [
      '25분 동안은 오직 한 가지 일에만 주의를 집중하세요.',
      '5분의 휴식 동안 화면에서 눈을 떼고 기지개를 켜세요.',
      '4번의 뽀모도로 후에는 15분간 여유롭게 쉬어주세요.'
    ]
  }
};
