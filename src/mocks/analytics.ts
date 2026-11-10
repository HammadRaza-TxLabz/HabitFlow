import { AnalyticsKpi, DayBarData, HabitBreakdownStat } from '../types';

export const mockKpis: AnalyticsKpi[] = [
  {
    title: 'Current Streak',
    value: 14,
    unit: 'Days',
    subtitle: 'Personal best: 28 days',
    iconName: 'Flame',
  },
  {
    title: 'Completion',
    value: 88,
    unit: '%',
    changePercent: 4,
    subtitle: 'Vs. 84% last period',
    iconName: 'TrendingUp',
  },
  {
    title: 'Check-ins',
    value: 142,
    subtitle: 'Recorded this month',
    iconName: 'CheckCircle2',
  },
  {
    title: 'Top Practice',
    value: 'Meditation',
    subtitle: '100% adherence',
    iconName: 'Spa',
  },
];

export const mockWeeklyRhythm: DayBarData[] = [
  { dayLabel: 'M', completed: 5, total: 5 },
  { dayLabel: 'T', completed: 4, total: 5 },
  { dayLabel: 'W', completed: 5, total: 5 },
  { dayLabel: 'T', completed: 3, total: 5, isToday: true },
  { dayLabel: 'F', completed: 5, total: 5 },
  { dayLabel: 'S', completed: 4, total: 5 },
  { dayLabel: 'S', completed: 3, total: 5 },
];

export const mockHabitBreakdowns: HabitBreakdownStat[] = [
  {
    id: 'habit_1',
    title: 'Morning Meditation',
    category: 'Mind & Spirit',
    fulfilledDays: 14,
    totalDays: 14,
    ratePercent: 100,
    iconMotif: 'spa',
  },
  {
    id: 'habit_2',
    title: 'Cold Matcha & Hydration',
    category: 'Wellness',
    fulfilledDays: 13,
    totalDays: 14,
    ratePercent: 92,
    iconMotif: 'water_drop',
  },
  {
    id: 'habit_3',
    title: '30-Min Sunlight Walk',
    category: 'Movement',
    fulfilledDays: 12,
    totalDays: 14,
    ratePercent: 85,
    iconMotif: 'wb_sunny',
  },
  {
    id: 'habit_4',
    title: 'Deep Reading',
    category: 'Focus & Growth',
    fulfilledDays: 10,
    totalDays: 14,
    ratePercent: 71,
    iconMotif: 'auto_stories',
  },
];

export const mockAnalyticsKpis = mockKpis;
export const mockWeeklyBars = mockWeeklyRhythm;
export const mockHabitBreakdown = mockHabitBreakdowns;
