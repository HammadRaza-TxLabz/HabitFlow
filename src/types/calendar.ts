export type CalendarDayStatus = 'complete' | 'partial' | 'missed' | 'future' | 'empty';

export interface CalendarDayInfo {
  dayNumber: number;
  dateKey: string; // "2024-10-24"
  status: CalendarDayStatus;
  completedCount: number;
  totalCount: number;
  isToday: boolean;
  isCurrentMonth: boolean;
}

export interface DayHabitLog {
  habitId: string;
  habitTitle: string;
  category: string;
  completedAt?: string;
  isCompleted: boolean;
  notes?: string;
  duration?: string;
  iconMotif: string;
}

