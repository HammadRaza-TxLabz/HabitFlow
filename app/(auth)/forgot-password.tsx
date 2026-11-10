
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Mail, CheckCircle2 } from 'lucide-react-native';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { FormInput } from '@/components/common/FormInput';
import { PrimaryButton } from '@/components/common/PrimaryButton';

import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

import { resetPassword } from '@/features/auth/auth.service';
import { getAuthErrorMessage } from '@/features/auth/auth.errors';

export default function ForgotPasswordScreen() {
  const params = useLocalSearchParams<{ email?: string }>();

  const [email, setEmail] = useState(params.email ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (loading) return;

    setError('');

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);

      await resetPassword(normalizedEmail);

      setEmailSent(true);
    } catch (err) {
      // Avoid revealing whether an account exists.
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        err.code === 'auth/user-not-found'
      ) {
        setEmailSent(true);
      } else {
        setError(getAuthErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer scrollable>
      <AppHeader
        showBack
        onBack={() => router.back()}
        title=""
        showAvatar={false}
        showNotification={false}
      />

      <View style={styles.content}>
        {emailSent ? (
          <>
            <View style={styles.successIcon}>
              <CheckCircle2
                size={42}
                color={colors.success}
                strokeWidth={1.5}
              />
            </View>

            <View style={styles.headingContainer}>
              <Text style={styles.eyebrow}>
                PASSWORD RECOVERY
              </Text>

              <Text style={styles.title}>
                Check Your Email
              </Text>

              <Text style={styles.subtitle}>
                If an account exists for this email,
                you will receive a password reset link.
              </Text>

              <Text style={styles.emailText}>
                {email.trim()}
              </Text>

              <Text style={styles.helperText}>
                Check your inbox and spam folder.
                Follow the link to create a new password.
              </Text>
            </View>

            <PrimaryButton
              label="Back to Sign In"
              onPress={() =>
                router.replace('/(auth)/login')
              }
            />

            <TouchableOpacity
              style={styles.footer}
              onPress={() => {
                setEmailSent(false);
                setError('');
              }}
            >
              <Text style={styles.footerLink}>
                Try another email
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.headingContainer}>
              <Text style={styles.eyebrow}>
                PASSWORD RECOVERY
              </Text>

              <Text style={styles.title}>
                Forgot Password?
              </Text>

              <Text style={styles.subtitle}>
                Enter your registered email address.
                We'll send you a secure link to reset
                your password.
              </Text>
            </View>

            <View style={styles.formSection}>
              <FormInput
                label="EMAIL ADDRESS"
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  setError('');
                }}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={Mail}
              />

              {error ? (
                <Text style={styles.errorText}>
                  {error}
                </Text>
              ) : null}
            </View>

            <PrimaryButton
              label={
                loading
                  ? 'Sending reset link...'
                  : 'Send Reset Link'
              }
              onPress={handleResetPassword}
              loading={loading}
            />

            <TouchableOpacity
              style={styles.footer}
              onPress={() => router.back()}
            >
              <Text style={styles.footerLink}>
                Back to Sign In
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },

  headingContainer: {
    marginBottom: spacing.xl,
  },

  eyebrow: {
    ...typography.caption,
    letterSpacing: 1.5,
    color: colors.secondary,
    fontFamily: 'Manrope_700Bold',
    fontSize: 9,
    marginBottom: spacing.xs,
  },

  title: {
    ...typography.headlineLg,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },

  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },

  formSection: {
    marginBottom: spacing.lg,
  },

  errorText: {
    ...typography.bodySm,
    color: colors.error,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },

  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },

  emailText: {
    ...typography.titleMd,
    color: colors.primary,
    marginTop: spacing.md,
  },

  helperText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: spacing.sm,
    lineHeight: 20,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },

  footerLink: {
    ...typography.bodySm,
    color: colors.primary,
    fontFamily: 'Manrope_700Bold',
  },
});