import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { FormInput } from '@/components/common/FormInput';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { registerUser } from '@/features/auth/auth.service';
import { getAuthErrorMessage } from '@/features/auth/auth.errors';
import { signInWithGoogle } from '@/features/auth/google-auth.service';
import { SecondaryButton } from '@/components/common/SecondaryButton';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [receiveDigest, setReceiveDigest] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleRegister = async () => {
    if (loading || googleLoading) return;
    setError('');

    // Full name validation
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    // Email validation
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      await registerUser(
        name.trim(),
        email.trim(),
        password
      );

      // AuthProvider handles navigation automatically
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Calculate password strength
  const passwordScore = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const strengthLabel =
    password.length === 0
      ? 'Enter password'
      : passwordScore <= 1
        ? 'Weak'
        : passwordScore <= 3
          ? 'Medium'
          : 'Strong';

  const strengthColor =
    password.length === 0
      ? colors.outline
      : passwordScore <= 1
        ? colors.error
        : passwordScore <= 3
          ? colors.secondary
          : colors.success;


  const handleGoogleSignIn = async () => {
    if (loading || googleLoading) return;

    setError('');

    try {
      setGoogleLoading(true);

      await signInWithGoogle();

      // AuthProvider handles navigation automatically
    } catch (err) {
      if (
        err instanceof Error &&
        err.message === 'GOOGLE_SIGN_IN_EXPO_GO'
      ) {
        Alert.alert(
          'Google Sign-In',
          'Google Sign-In will be available in the next app build.'
        );

        return;
      }

      setError(
        'Unable to sign in with Google. Please try again.'
      );
    } finally {
      setGoogleLoading(false);
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
        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.eyebrow}>GET STARTED</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start tracking your daily habits and building streaks.</Text>
        </View>

        {/* Inputs */}
        <View style={styles.formSection}>
          <FormInput
            label="FULL NAME"
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            leftIcon={User}
          />

          <FormInput
            label="EMAIL"
            value={email}
            onChangeText={setEmail}
            placeholder="name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={Mail}
          />

          <FormInput
            label="PASSWORD"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••••••"
            secureTextEntry
            leftIcon={Lock}
          />

          <FormInput
            label="CONFIRM PASSWORD"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="••••••••••••"
            secureTextEntry
            leftIcon={Lock}
          />


          {/* Password Strength Indicator */}
          <View style={styles.strengthCard}>
            <View style={styles.strengthHeader}>
              <ShieldCheck
                size={14}
                color={strengthColor}
                strokeWidth={2}
              />

              <Text
                style={[
                  styles.strengthText,
                  { color: strengthColor },
                ]}
              >
                Password Strength: {strengthLabel}
              </Text>
            </View>

            <View style={styles.strengthBars}>
              {[1, 2, 3, 4].map((level) => (
                <View
                  key={level}
                  style={[
                    styles.strengthBar,
                    {
                      backgroundColor:
                        passwordScore >= level
                          ? strengthColor
                          : colors.outlineVariant,
                    },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Digest Toggle */}
          <View style={styles.digestRow}>
            <View style={styles.digestContent}>
              <Text style={styles.digestTitle}>Daily Morning Reminder</Text>
              <Text style={styles.digestSubtitle}>Get a quick reminder at 07:00 AM to check your habits.</Text>
            </View>
            <ToggleSwitch
              checked={receiveDigest}
              onToggle={setReceiveDigest}
            />
          </View>
        </View>
        {error ? (
          <Text style={styles.errorText}>
            {error}
          </Text>
        ) : null}


        {/* Submit */}
        <View style={styles.actions}>
          <PrimaryButton
            label={
              loading
                ? 'Creating account...'
                : 'Create Account'
            }
            onPress={handleRegister}
            loading={loading}
          />

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Sign-Up */}
          <SecondaryButton
            label={
              googleLoading
                ? 'Connecting to Google...'
                : 'Sign Up with Google'
            }
            onPress={handleGoogleSignIn}
            variant="surface"
          />
        </View>


        {/* Footnote */}
        <View style={styles.footer}>
          <Text style={styles.footerPrompt}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.footerLink}> Sign In</Text>
          </TouchableOpacity>
        </View>
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
  },
  formSection: {
    marginBottom: spacing.lg,
  },
  strengthCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.md,
  },
  strengthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  strengthText: {
    ...typography.caption,
    color: colors.success,
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 10,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 4,
  },
  strengthBar: {
    flex: 1,
    height: 3,
    borderRadius: 1.5,
  },
  digestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginVertical: spacing.sm,
  },
  digestContent: {
    flex: 1,
    marginRight: spacing.sm,
  },
  digestTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    fontSize: 14,
  },
  digestSubtitle: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  actions: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  footerPrompt: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  footerLink: {
    ...typography.bodySm,
    color: colors.primary,
    fontFamily: 'Manrope_700Bold',
  },
  errorText: {
    ...typography.bodySm,
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.sm,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },

  dividerText: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 11,
  },

});
