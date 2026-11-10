import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Check,
  MoreHorizontal,
  Sparkles,
  Droplet,
  Sun,
  BookOpen,
  Moon,
  Footprints,
  Heart,
  Snowflake,
  PenTool,
} from 'lucide-react-native';
import { Habit } from '../../types';
import { colors, typography, radius, spacing } from '../../theme';
import { StreakBadge } from '../common/StreakBadge';

interface HabitCardProps {
  habit: Habit;
  onToggleComplete: (id: string) => void;
  onOptionsPress?: (habit: Habit) => void;
  style?: ViewStyle;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggleComplete,
  onOptionsPress,
  style,
}) => {
  const router = useRouter();

  const getMotifIcon = () => {
    switch (habit.iconMotif) {
      case 'water_drop':
        return Droplet;
      case 'wb_sunny':
        return Sun;
      case 'auto_stories':
        return BookOpen;
      case 'bedtime':
        return Moon;
      case 'directions_walk':
        return Footprints;
      case 'favorite':
        return Heart;
      case 'ac_unit':
        return Snowflake;
      case 'brush':
        return PenTool;
      case 'spa':
      default:
        return Sparkles;
    }
  };

  const MotifIcon = getMotifIcon();

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={() => router.push(`/habits/${habit.id}`)}
      style={[
        styles.card,
        habit.isCompletedToday && styles.cardCompleted,
        style,
      ]}
    >
      <View style={styles.contentRow}>
        {/* Toggle Checkbox Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={(e) => {
            e.stopPropagation();
            onToggleComplete(habit.id);
          }}
          style={[
            styles.checkbox,
            habit.isCompletedToday
              ? styles.checkboxChecked
              : styles.checkboxUnchecked,
          ]}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: habit.isCompletedToday }}
          accessibilityLabel={`Mark ${habit.title} as ${
            habit.isCompletedToday ? 'incomplete' : 'complete'
          }`}
        >
          {habit.isCompletedToday && (
            <Check size={18} color={colors.onPrimary} strokeWidth={2.5} />
          )}
        </TouchableOpacity>

        {/* Info Column */}
        <View style={styles.infoArea}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.title,
                habit.isCompletedToday && styles.titleCompleted,
              ]}
              numberOfLines={1}
            >
              {habit.title}
            </Text>

            {habit.currentStreak > 0 && (
              <StreakBadge streakDays={habit.currentStreak} size="sm" />
            )}
          </View>

          {/* Metadata bullet line */}
          <View style={styles.metadataRow}>
            <View style={styles.categoryPill}>
              <MotifIcon size={12} color={colors.primary} style={{ marginRight: 3 }} />
              <Text style={styles.categoryText}>{habit.category}</Text>
            </View>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.metaText}>{habit.durationString}</Text>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.timeText}>{habit.timeString}</Text>
          </View>
        </View>

        {/* Options Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={(e) => {
            e.stopPropagation();
            if (onOptionsPress) {
              onOptionsPress(habit);
            } else {
              router.push(`/habits/${habit.id}/edit`);
            }
          }}
          style={styles.moreButton}
          accessibilityLabel="Habit options"
        >
          <MoreHorizontal size={18} color={colors.outline} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: spacing.sm + 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  cardCompleted: {
    backgroundColor: '#FAFDFB',
    borderColor: colors.surfaceContainer,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkboxUnchecked: {
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
  },
  checkboxChecked: {
    backgroundColor: colors.primaryContainer,
  },
  infoArea: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    ...typography.titleMd,
    color: colors.onSurface,
    flexShrink: 1,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.onSurfaceVariant,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  bulletDot: {
    ...typography.caption,
    color: colors.outlineVariant,
    marginHorizontal: 5,
  },
  metaText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  timeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
});

