export interface AnalyticsKpi {
  title: string;
  value: string | number;
  unit?: string;
  changePercent?: number;
  subtitle: string;
  iconName: string;
}

export interface DayBarData {
  dayLabel: string; // 'M', 'T', 'W'
  completed: number;
  total: number;
  isToday?: boolean;
}

export interface HabitBreakdownStat {
  id: string;
  title: string;
  category: string;
  fulfilledDays: number;
  totalDays: number;
  ratePercent: number;
  iconMotif: string;
}

