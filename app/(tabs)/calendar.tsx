import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Sparkles } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { CalendarDayCell } from '@/components/calendar/CalendarDayCell';
import { mockMonthDays, mockDayLogs } from '@/mocks/calendar';
import { CalendarDayInfo } from '@/types/calendar';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function CalendarScreen() {
  const [selectedDateKey, setSelectedDateKey] = useState<string>('2024-10-24');
  const [days] = useState<CalendarDayInfo[]>(mockMonthDays);

  const selectedDay = days.find((d) => d.dateKey === selectedDateKey) || days[23];
  const dayLogs = mockDayLogs;

  const weekHeaders = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="Calendar & History"
        subtitle="HabitFlow"
        showAvatar={false}
        showNotification={false}
      />

      {/* Month Switcher & Consistency Pill */}
      <View style={styles.monthHeader}>
        <View style={styles.monthControls}>
          <TouchableOpacity style={styles.navArrow} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <ChevronLeft size={18} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>October 2024</Text>
          <TouchableOpacity style={styles.navArrow} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <ChevronRight size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.consistencyPill}>
          <Sparkles size={12} color={colors.secondary} strokeWidth={2} />
          <Text style={styles.consistencyText}>84% COMPLETED</Text>
        </View>
      </View>

      {/* Calendar Card */}
      <View style={styles.calendarCard}>
        {/* Day of Week Headers */}
        <View style={styles.weekHeaderRow}>
          {weekHeaders.map((day, idx) => (
            <Text key={`header-${idx}`} style={styles.weekHeaderText}>
              {day}
            </Text>
          ))}
        </View>

        {/* 35 Calendar Cells */}
        <View style={styles.gridContainer}>
          {days.map((day, idx) => (
            <CalendarDayCell
              key={`day-${day.dateKey}-${idx}`}
              day={day}
              isSelected={day.dateKey === selectedDateKey}
              onSelect={(selected) => setSelectedDateKey(selected.dateKey)}
            />
          ))}
        </View>
      </View>

      {/* Selected Day Log */}
      <View style={styles.logSection}>
        <View style={styles.logHeader}>
          <View>
            <Text style={styles.logSectionEyebrow}>DAILY HABITS</Text>
            <Text style={styles.logSectionTitle}>
              {selectedDay.isToday ? 'Today, Oct 24' : `October ${selectedDay.dayNumber}, 2024`}
            </Text>
          </View>
          <View style={styles.logRatioBadge}>
            <Text style={styles.logRatioText}>
              {selectedDay.completedCount} of {selectedDay.totalCount} completed
            </Text>
          </View>
        </View>

        {/* Habit Logs */}
        <View style={styles.logsList}>
          {dayLogs.map((log) => (
            <View key={log.habitId} style={styles.logCard}>
              <View
                style={[
                  styles.logStatusCircle,
                  log.isCompleted && styles.logStatusCompleted,
                ]}
              >
                {log.isCompleted ? (
                  <CheckCircle2 size={16} color="#FFFFFF" strokeWidth={2.5} />
                ) : (
                  <Clock size={16} color={colors.outline} strokeWidth={2} />
                )}
              </View>

              <View style={styles.logInfo}>
                <Text
                  style={[
                    styles.logTitle,
                    log.isCompleted && styles.logTitleCompleted,
                  ]}
                >
                  {log.habitTitle}
                </Text>
                <View style={styles.logMetaRow}>
                  <Text style={styles.logCategory}>{log.category}</Text>
                  {log.duration ? (
                    <Text style={styles.logDetail}>• {log.duration}</Text>
                  ) : null}
                  {log.completedAt ? (
                    <Text style={styles.logDetail}>• {log.completedAt}</Text>
                  ) : (
                    <Text style={styles.logDetailPending}>• Scheduled</Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* James Clear Quote Sanctuary */}
      <View style={styles.quoteCard}>
        <Text style={styles.quoteText}>
          “You do not rise to the level of your goals. You fall to the level of your systems.”
        </Text>
        <Text style={styles.quoteAuthor}>— James Clear, Atomic Habits</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing.sm,
  },
  monthControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  navArrow: {
    padding: 6,
    borderRadius: spacing.radius.full,
    backgroundColor: colors.surfaceContainer,
  },
  monthTitle: {
    ...typography.titleLg,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: colors.onSurface,
    marginHorizontal: 4,
  },
  consistencyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryContainer,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: spacing.radius.full,
  },
  consistencyText: {
    ...typography.caption,
    fontFamily: 'Manrope_700Bold',
    color: colors.secondary,
    letterSpacing: 0.8,
    fontSize: 9,
  },
  calendarCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.lg,
  },
  weekHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.xs,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  weekHeaderText: {
    ...typography.caption,
    fontFamily: 'Manrope_600SemiBold',
    color: colors.outline,
    width: '14.28%',
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  logSection: {
    marginBottom: spacing.lg,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  logSectionEyebrow: {
    ...typography.caption,
    letterSpacing: 1.2,
    color: colors.secondary,
    fontFamily: 'Manrope_700Bold',
    fontSize: 9,
  },
  logSectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  logRatioBadge: {
    backgroundColor: colors.surfaceContainer,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: spacing.radius.full,
  },
  logRatioText: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    fontFamily: 'Manrope_600SemiBold',
  },
  logsList: {
    gap: spacing.xs,
  },
  logCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  logStatusCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  logStatusCompleted: {
    backgroundColor: colors.primary,
  },
  logInfo: {
    flex: 1,
  },
  logTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
  },
  logTitleCompleted: {
    color: colors.onSurface,
  },
  logMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  logCategory: {
    ...typography.caption,
    color: colors.primary,
    fontFamily: 'Manrope_600SemiBold',
  },
  logDetail: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
  },
  logDetailPending: {
    ...typography.caption,
    color: colors.secondary,
    fontStyle: 'italic',
  },
  quoteCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.xl,
  },
  quoteText: {
    ...typography.bodyMd,
    fontFamily: 'PlayfairDisplay_700Bold_Italic',
    color: colors.onSurface,
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
  quoteAuthor: {
    ...typography.caption,
    fontFamily: 'Manrope_600SemiBold',
    color: colors.secondary,
    letterSpacing: 0.5,
  },
});
