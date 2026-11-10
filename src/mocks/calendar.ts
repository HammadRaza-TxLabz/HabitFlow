import { CalendarDayInfo, DayHabitLog } from '../types';

export const mockCalendarSummary = {
  monthName: 'October 2024',
  completionPercentage: 84,
  activeDaysRatio: '21 of 24 days active',
  currentStreakDays: 14,
  streakMessage: '14-Day Active Flow • Your longest sanctuary rhythm this autumn',
  streakPercentile: 'Top 5%',
  selectedDateTitle: 'Thursday, Oct 24',
  selectedCompletedRatio: '3 of 5 habits',
};

// October 2024 starts on Tuesday (offset 1 in 0-indexed Mon-Sun grid)
export const mockCalendarDays: CalendarDayInfo[] = [
  // Sept 30 previous month filler
  { dayNumber: 30, dateKey: '2024-09-30', status: 'empty', completedCount: 0, totalCount: 5, isToday: false, isCurrentMonth: false },
  // Oct 1 to 24 (past & today)
  { dayNumber: 1, dateKey: '2024-10-01', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 2, dateKey: '2024-10-02', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 3, dateKey: '2024-10-03', status: 'partial', completedCount: 3, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 4, dateKey: '2024-10-04', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 5, dateKey: '2024-10-05', status: 'missed', completedCount: 1, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 6, dateKey: '2024-10-06', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 7, dateKey: '2024-10-07', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 8, dateKey: '2024-10-08', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 9, dateKey: '2024-10-09', status: 'partial', completedCount: 4, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 10, dateKey: '2024-10-10', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 11, dateKey: '2024-10-11', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 12, dateKey: '2024-10-12', status: 'missed', completedCount: 2, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 13, dateKey: '2024-10-13', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 14, dateKey: '2024-10-14', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 15, dateKey: '2024-10-15', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 16, dateKey: '2024-10-16', status: 'partial', completedCount: 3, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 17, dateKey: '2024-10-17', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 18, dateKey: '2024-10-18', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 19, dateKey: '2024-10-19', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 20, dateKey: '2024-10-20', status: 'partial', completedCount: 4, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 21, dateKey: '2024-10-21', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 22, dateKey: '2024-10-22', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 23, dateKey: '2024-10-23', status: 'complete', completedCount: 5, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 24, dateKey: '2024-10-24', status: 'partial', completedCount: 3, totalCount: 5, isToday: true, isCurrentMonth: true },
  // Oct 25 to 31 (future days)
  { dayNumber: 25, dateKey: '2024-10-25', status: 'future', completedCount: 0, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 26, dateKey: '2024-10-26', status: 'future', completedCount: 0, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 27, dateKey: '2024-10-27', status: 'future', completedCount: 0, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 28, dateKey: '2024-10-28', status: 'future', completedCount: 0, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 29, dateKey: '2024-10-29', status: 'future', completedCount: 0, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 30, dateKey: '2024-10-30', status: 'future', completedCount: 0, totalCount: 5, isToday: false, isCurrentMonth: true },
  { dayNumber: 31, dateKey: '2024-10-31', status: 'future', completedCount: 0, totalCount: 5, isToday: false, isCurrentMonth: true },
  // Next month fillers
  { dayNumber: 1, dateKey: '2024-11-01', status: 'empty', completedCount: 0, totalCount: 5, isToday: false, isCurrentMonth: false },
  { dayNumber: 2, dateKey: '2024-11-02', status: 'empty', completedCount: 0, totalCount: 5, isToday: false, isCurrentMonth: false },
  { dayNumber: 3, dateKey: '2024-11-03', status: 'empty', completedCount: 0, totalCount: 5, isToday: false, isCurrentMonth: false },
];

export const mockMonthDays = mockCalendarDays;

export const mockDayLogs: DayHabitLog[] = [
  {
    habitId: 'habit_1',
    habitTitle: 'Morning Meditation',
    category: 'Mind & Spirit',
    completedAt: '7:45 AM',
    isCompleted: true,
    duration: '20 mins',
    iconMotif: 'spa',
  },
  {
    habitId: 'habit_2',
    habitTitle: 'Cold Matcha & Hydration',
    category: 'Wellness',
    completedAt: '9:15 AM',
    isCompleted: true,
    duration: '750ml Infusion',
    iconMotif: 'water_drop',
  },
  {
    habitId: 'habit_3',
    habitTitle: '30-Min Sunlight Walk',
    category: 'Movement',
    completedAt: '12:30 PM',
    isCompleted: true,
    duration: 'Outdoor Park',
    iconMotif: 'wb_sunny',
  },
  {
    habitId: 'habit_4',
    habitTitle: 'Deep Reading',
    category: 'Focus & Growth',
    isCompleted: false,
    duration: '30 mins quiet room',
    iconMotif: 'auto_stories',
  },
  {
    habitId: 'habit_5',
    habitTitle: 'Evening Screen Curfew',
    category: 'Rest & Unwind',
    isCompleted: false,
    duration: 'Scheduled 10:30 PM',
    iconMotif: 'bedtime',
  },
];
