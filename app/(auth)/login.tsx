import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, Fingerprint } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { FormInput } from '@/components/common/FormInput';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { loginUser } from '@/features/auth/auth.service';
import { getAuthErrorMessage } from '@/features/auth/auth.errors';
import { signInWithGoogle } from '@/features/auth/google-auth.service';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);


  const handleLogin = async () => {
    if (loading || googleLoading) return;
    setError('');

    // Validate required fields
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);

      await loginUser(email, password);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleBiometric = () => {
    Alert.alert(
      'Coming Soon',
      'Biometric authentication is not available yet.'
    );
  };


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
          <Text style={styles.eyebrow}>SIGN IN</Text>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Enter your email and password to continue.</Text>
        </View>

        {/* Inputs */}
        <View style={styles.formSection}>
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

          {error ? (
            <Text style={styles.errorText}>
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.forgotLink}
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: '/(auth)/forgot-password',
                params: { email: email.trim() },
              })
            }
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>


        {/* Submit Actions */}
        <View style={styles.actions}>
          <PrimaryButton
            label={loading ? 'Signing in...' : 'Sign In'}
            onPress={handleLogin}
            loading={loading}
          />

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Sign-In */}
          <SecondaryButton
            label={
              googleLoading
                ? 'Connecting to Google...'
                : 'Continue with Google'
            }
            onPress={handleGoogleSignIn}
            variant="surface"
          />

          <SecondaryButton
            label="Unlock with Fingerprint / Face ID"
            onPress={handleBiometric}
            icon={Fingerprint}
            variant="surface"
          />
        </View>


        {/* Footnote */}
        <View style={styles.footer}>
          <Text style={styles.footerPrompt}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.footerLink}> Sign Up</Text>
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
  forgotLink: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: spacing.md,
  },
  forgotText: {
    ...typography.caption,
    color: colors.secondary,
    fontFamily: 'Manrope_600SemiBold',
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
    color: '#BA1A1A',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
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