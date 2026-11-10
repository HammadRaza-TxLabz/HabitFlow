import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Camera, Lock, Sparkles, User, AtSign, Mail } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { useMockStore } from '@/store/useMockStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function EditProfileScreen() {
  const user = useMockStore((state) => state.user);
  const updateUser = useMockStore((state) => state.updateUser);

  const [fullName, setFullName] = useState(user.fullName);
  const [handle, setHandle] = useState('@elena.architect');
  const [bio, setBio] = useState(user.bio);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      updateUser({
        fullName: fullName.trim(),
        bio: bio.trim(),
      });
      setLoading(false);
      router.back();
    }, 350);
  };

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="Edit Profile"
        subtitle="HabitFlow"
        showBack
        onBack={() => router.back()}
        showAvatar={false}
        showNotification={false}
      />

      <View style={styles.content}>
        {/* Avatar Portrait Trigger */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            {user.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarInitial}>
                  {fullName.split(' ').map((n) => n[0]).join('')}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.cameraBadge}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Change Portrait"
            >
              <Camera size={14} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarHint}>Tap to change photo</Text>
        </View>

        {/* Inputs */}
        <View style={styles.formSection}>
          <FormInput
            label="FULL NAME"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Your name"
            leftIcon={User}
          />

          <FormInput
            label="USERNAME"
            value={handle}
            onChangeText={setHandle}
            placeholder="@username"
            leftIcon={AtSign}
          />

          {/* Email Read-only with Passkey badge */}
          <View style={styles.readOnlyContainer}>
            <View style={styles.readOnlyHeader}>
              <Text style={styles.readOnlyLabel}>EMAIL</Text>
              <View style={styles.passkeyBadge}>
                <Lock size={10} color={colors.secondary} strokeWidth={2} />
                <Text style={styles.passkeyText}>Verified</Text>
              </View>
            </View>
            <View style={styles.readOnlyBox}>
              <Mail size={16} color={colors.outline} />
              <Text style={styles.readOnlyEmail}>{user.email}</Text>
            </View>
          </View>

          {/* Bio Textarea */}
          <FormTextarea
            label="ABOUT YOU (BIO)"
            value={bio}
            onChangeText={setBio}
            placeholder="A short note about your goals..."
            charCount={bio.length}
            maxChars={140}
          />

          {/* Membership Tier Card */}
          <View style={styles.tierCard}>
            <View style={styles.tierIconCircle}>
              <Sparkles size={18} color={colors.secondary} strokeWidth={2} />
            </View>
            <View style={styles.tierInfo}>
              <Text style={styles.tierTitle}>{user.membershipTier}</Text>
              <Text style={styles.tierSub}>
                Member since {user.joinedDate}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <PrimaryButton
            label={loading ? 'Saving...' : 'Save Profile'}
            onPress={handleSave}
            loading={loading}
          />
          <SecondaryButton
            label="Cancel"
            onPress={() => router.back()}
            variant="ghost"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2,
    borderColor: colors.secondaryContainer,
  },
  avatarFallback: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    ...typography.headlineMd,
    color: '#FFFFFF',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.card,
  },
  avatarHint: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
  },
  formSection: {
    marginBottom: spacing.lg,
  },
  readOnlyContainer: {
    marginVertical: spacing.xs,
  },
  readOnlyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  readOnlyLabel: {
    ...typography.labelSm,
    color: colors.outline,
    letterSpacing: 1.2,
  },
  passkeyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryContainer,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: spacing.radius.xs,
  },
  passkeyText: {
    ...typography.caption,
    fontSize: 9,
    fontFamily: 'Manrope_700Bold',
    color: colors.secondary,
  },
  readOnlyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceContainer,
    borderRadius: spacing.radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  readOnlyEmail: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  tierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginTop: spacing.md,
  },
  tierIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  tierInfo: {
    flex: 1,
  },
  tierTitle: {
    ...typography.titleMd,
    fontSize: 14,
    color: colors.onSurface,
  },
  tierSub: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});

