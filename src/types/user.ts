export interface UserProfile {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  bio: string;
  memberTier: string;
  membershipTier?: string;
  memberSince: string;
  joinedDate?: string;
  joinedDays?: number;
  bestStreak?: number;
  completionRate?: number;
  avatarUrl?: string;
  timezone: string;
}

export interface UserPreferences {
  dailyReminderTime: string;
  dailyReminderEnabled: boolean;
  dndEnabled: boolean;
  dndStartTime: string;
  dndEndTime: string;
  soundAndHaptics: boolean;
  hapticFeedback?: boolean;
  reminderNotifications?: boolean;
  startWeekOn: 'Monday' | 'Sunday';
  cloudSyncEnabled: boolean;
  offlineMode: boolean;
}
