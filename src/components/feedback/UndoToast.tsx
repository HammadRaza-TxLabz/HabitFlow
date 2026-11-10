import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { useMockStore } from '@/store/useMockStore';

interface UndoToastProps {
  message?: string;
  onUndo?: () => void;
  onDismiss?: () => void;
  duration?: number;
}

export const UndoToast: React.FC<UndoToastProps> = ({
  message,
  onUndo,
  onDismiss,
  duration = 4000,
}) => {
  const progressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    progressAnim.setValue(1);
    const anim = Animated.timing(progressAnim, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    });

    anim.start(({ finished }) => {
      if (finished && onDismiss) {
        onDismiss();
      }
    });

    return () => anim.stop();
  }, [duration, onDismiss, progressAnim]);

  return (
    <View style={styles.toastContainer}>
      <View style={styles.contentRow}>
        <Text style={styles.messageText} numberOfLines={1}>
          {message || 'Habit updated'}
        </Text>
        {onUndo && (
          <TouchableOpacity onPress={onUndo} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.undoText}>UNDO</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.progressBarTrack}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

export const GlobalUndoToast: React.FC = () => {
  const undoToast = useMockStore((state) => state.undoToast);
  const hideUndoToast = useMockStore((state) => state.hideUndoToast);
  const undoLastCompletion = useMockStore((state) => state.undoLastCompletion);

  if (!undoToast?.visible) return null;

  return (
    <View style={styles.globalPositioner}>
      <UndoToast
        message={`Completed ${undoToast.habitTitle}`}
        onUndo={() => {
          undoLastCompletion();
        }}
        onDismiss={hideUndoToast}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  globalPositioner: {
    position: 'absolute',
    bottom: 84, // Above standard bottom navigation bar
    left: spacing.md,
    right: spacing.md,
    zIndex: 9999,
  },
  toastContainer: {
    backgroundColor: colors.inverseSurface,
    borderRadius: spacing.radius.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  messageText: {
    ...typography.bodySm,
    color: colors.inverseOnSurface,
    flex: 1,
    marginRight: spacing.sm,
  },
  undoText: {
    ...typography.labelSm,
    fontFamily: 'Manrope_700Bold',
    color: colors.secondaryContainer,
    letterSpacing: 0.8,
  },
  progressBarTrack: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.secondaryContainer,
  },
});

