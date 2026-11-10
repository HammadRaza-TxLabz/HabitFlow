import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors, typography, radius, spacing } from '../../theme';

interface FormTextareaProps extends TextInputProps {
  label?: string;
  tag?: string;
  error?: string;
  helperText?: string;
  charCount?: number;
  maxChars?: number;
  containerStyle?: ViewStyle;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  tag,
  error,
  helperText,
  charCount,
  maxChars,
  containerStyle,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {(label || tag || (charCount !== undefined && maxChars !== undefined)) && (
        <View style={styles.labelRow}>
          {label && <Text style={styles.labelText}>{label}</Text>}
          {charCount !== undefined && maxChars !== undefined ? (
            <Text
              style={[
                styles.charCountText,
                charCount > maxChars ? styles.charCountOver : undefined,
              ]}
            >
              {charCount}/{maxChars}
            </Text>
          ) : tag ? (
            <Text style={styles.tagText}>{tag}</Text>
          ) : null}
        </View>
      )}

      <View
        style={[
          styles.textareaContainer,
          {
            borderColor: error
              ? colors.error
              : isFocused
              ? colors.primaryContainer
              : colors.outlineVariant,
            backgroundColor: error ? '#FFF5F5' : colors.surfaceContainerLowest,
          },
        ]}
      >
        <TextInput
          multiline
          numberOfLines={3}
          style={[styles.textarea, style]}
          placeholderTextColor={colors.outlineVariant}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          textAlignVertical="top"
          {...props}
        />
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelText: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
  tagText: {
    ...typography.caption,
    color: colors.secondary,
    fontWeight: '600',
  },
  charCountText: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
  },
  charCountOver: {
    color: colors.error,
  },
  textareaContainer: {
    minHeight: 80,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: 12,
  },
  textarea: {
    ...typography.bodyMd,
    color: colors.onSurface,
    minHeight: 60,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: 4,
    marginLeft: 2,
  },
  helperText: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    marginLeft: 2,
  },
});

