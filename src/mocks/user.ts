import { UserProfile, UserPreferences } from '../types';

export const mockUser: UserProfile = {
  id: 'usr_elena_rostova',
  fullName: 'Elena Rostova',
  displayName: 'Elena',
  email: 'elena.rostova@editorial.design',
  bio: 'Committed to unhurried mornings, intentional movement, and quiet evening reflection.',
  memberTier: 'Founding Member',
  membershipTier: 'Founding Member',
  memberSince: 'June 2024',
  joinedDate: 'June 2024',
  joinedDays: 142,
  bestStreak: 18,
  completionRate: 84,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  timezone: 'Pacific Time (US & Canada) — GMT-7',
};

export const mockPreferences: UserPreferences = {
  dailyReminderTime: '07:30 AM',
  dailyReminderEnabled: true,
  dndEnabled: true,
  dndStartTime: '10:30 PM',
  dndEndTime: '06:30 AM',
  soundAndHaptics: true,
  hapticFeedback: true,
  reminderNotifications: true,
  startWeekOn: 'Monday',
  cloudSyncEnabled: true,
  offlineMode: true,
};
