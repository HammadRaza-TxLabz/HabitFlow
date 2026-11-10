export type HabitCategory =
  | 'Mindfulness'
  | 'Movement'
  | 'Nutrition'
  | 'Focus'
  | 'Rest'
  | 'Creativity'
  | 'Wellness';

export type HabitPeriod = 'morning' | 'afternoon' | 'evening';
export type PeriodOfDay = HabitPeriod;

export type HabitStatus = 'active' | 'paused' | 'archived';

export type DayOfWeek = 'M' | 'T' | 'W' | 'T_THU' | 'F' | 'S' | 'S_SUN';

export interface Habit {
  id: string;
  title: string;
  intention?: string;
  category: HabitCategory;
  period: HabitPeriod;
  status: HabitStatus;
  currentStreak: number;
  streak?: number;
  longestStreak: number;
  adherenceRate: number; // 0 to 100
  timeString: string; // e.g. "07:00 AM"
  durationString: string; // e.g. "20 mins"
  iconMotif: string; // e.g. "spa", "flower", "sun", "moon", "book", "walk", "cup"
  paletteColor: string; // Hex color for tone
  colorHex?: string;
  isCompletedToday: boolean;
  completedToday?: boolean;
  frequency: 'daily' | 'specific_days' | string[];
  activeDays: number[]; // 0 for Monday through 6 for Sunday
  reminderEnabled: boolean;
  reminderChime: string; // e.g. "Singing Bowl", "Rain Drop", "Wood Block"
  reminderTime?: string;
  past30Days: boolean[]; // completion history for 30 days
  history30Days?: boolean[];
}
