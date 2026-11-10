import { create } from 'zustand';
import { Habit, UserProfile, UserPreferences, FilterPeriod } from '../types';
import { mockHabits, mockUser, mockPreferences } from '../mocks';

interface MockStoreState {
  // Auth state (Isolated mock demonstration)
  isAuthenticated: boolean;
  loginMock: () => void;
  logoutMock: () => void;

  // Habits State
  habits: Habit[];
  filterPeriod: FilterPeriod;
  setFilterPeriod: (period: FilterPeriod) => void;
  toggleHabitCompletion: (id: string) => Habit | undefined;
  addHabit: (habitData: Partial<Habit>) => Habit;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  pauseHabit: (id: string) => void;
  resumeHabit: (id: string) => void;

  // Undo Toast transient state
  undoToast: {
    visible: boolean;
    habitId: string;
    habitTitle: string;
  } | null;
  showUndoToast: (habitId: string, habitTitle: string) => void;
  hideUndoToast: () => void;
  undoLastCompletion: () => void;

  // User Profile & Preferences
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

export const useMockStore = create<MockStoreState>((set, get) => ({
  isAuthenticated: true, // Defaults to authenticated for direct preview, toggleable in Auth Flow
  loginMock: () => set({ isAuthenticated: true }),
  logoutMock: () => set({ isAuthenticated: false }),

  habits: mockHabits,
  filterPeriod: 'all',
  setFilterPeriod: (period) => set({ filterPeriod: period }),

  toggleHabitCompletion: (id: string) => {
    let toggledHabit: Habit | undefined;
    set((state) => {
      const updated = state.habits.map((h) => {
        if (h.id === id) {
          const nextState = !h.isCompletedToday;
          const nextStreak = nextState ? h.currentStreak + 1 : Math.max(0, h.currentStreak - 1);
          toggledHabit = {
            ...h,
            isCompletedToday: nextState,
            completedToday: nextState,
            currentStreak: nextStreak,
            streak: nextStreak,
          };
          return toggledHabit;
        }
        return h;
      });
      return { habits: updated };
    });

    if (toggledHabit && toggledHabit.isCompletedToday) {
      get().showUndoToast(toggledHabit.id, toggledHabit.title);
    }
    return toggledHabit;
  },

  addHabit: (habitData) => {
    const newHabit: Habit = {
      id: `habit_${Date.now()}`,
      title: habitData.title || 'New Mindful Habit',
      intention: habitData.intention || '',
      category: habitData.category || 'Mindfulness',
      period: habitData.period || 'morning',
      status: 'active',
      currentStreak: 0,
      longestStreak: 0,
      adherenceRate: 100,
      timeString: habitData.timeString || '07:30 AM',
      durationString: habitData.durationString || '15 mins',
      iconMotif: habitData.iconMotif || 'spa',
      paletteColor: habitData.paletteColor || habitData.colorHex || '#1D4233',
      colorHex: habitData.colorHex || habitData.paletteColor || '#1D4233',
      isCompletedToday: false,
      completedToday: false,
      streak: 0,
      frequency: habitData.frequency || 'daily',
      activeDays: habitData.activeDays || [0, 1, 2, 3, 4, 5, 6],
      reminderEnabled: habitData.reminderEnabled ?? true,
      reminderChime: habitData.reminderChime || 'Singing Bowl',
      reminderTime: habitData.reminderTime || habitData.timeString || '07:30 AM',
      past30Days: Array(30).fill(false),
      history30Days: Array(30).fill(false),
    };

    set((state) => ({ habits: [newHabit, ...state.habits] }));
    return newHabit;
  },

  updateHabit: (id, updates) => {
    set((state) => ({
      habits: state.habits.map((h) => (h.id === id ? { ...h, ...updates } : h)),
    }));
  },

  deleteHabit: (id) => {
    set((state) => ({
      habits: state.habits.filter((h) => h.id !== id),
    }));
  },

  pauseHabit: (id) => {
    set((state) => ({
      habits: state.habits.map((h) => (h.id === id ? { ...h, status: 'paused' as const } : h)),
    }));
  },

  resumeHabit: (id) => {
    set((state) => ({
      habits: state.habits.map((h) => (h.id === id ? { ...h, status: 'active' as const } : h)),
    }));
  },

  undoToast: null,
  showUndoToast: (habitId, habitTitle) => {
    set({
      undoToast: {
        visible: true,
        habitId,
        habitTitle,
      },
    });
  },
  hideUndoToast: () => set({ undoToast: null }),
  undoLastCompletion: () => {
    const currentToast = get().undoToast;
    if (currentToast) {
      set((state) => ({
        habits: state.habits.map((h) =>
          h.id === currentToast.habitId
            ? { ...h, isCompletedToday: false, currentStreak: Math.max(0, h.currentStreak - 1) }
            : h
        ),
        undoToast: null,
      }));
    }
  },

  user: mockUser,
  updateUser: (updates) => {
    set((state) => ({ user: { ...state.user, ...updates } }));
  },

  preferences: mockPreferences,
  updatePreferences: (updates) => {
    set((state) => ({ preferences: { ...state.preferences, ...updates } }));
  },
}));
