# HabitFlow — Premium Habit Tracker (Day 0 UI Implementation)

> **Design Language:** *Quiet Editorial Wellness* / *Quiet Luxury*  
> **Source of Truth:** Google Stitch Project `4729673776677281429` (`projects/4729673776677281429`)  
> **Platform Target:** Android-first React Native with Expo SDK 58 & Expo Router

---

## 🌿 Overview

**HabitFlow** is an architectural, editorial mobile application crafted for conscious habit design, quiet accountability, and mindful reflection. Rejecting neon gamification, frantic streaks, and dopamine exploitation loops, HabitFlow treats daily rituals with intentionality through tactile warm linen surfaces (`#F2FCF2`), deep forest green structural accents (`#1D4233`), warm champagne gold milestones (`#745A34`), and editorial typography (*Playfair Display* & *Manrope*).

This repository contains the **complete, production-grade Day 0 Mobile UI implementation** with working navigation, interactive mock states, full component libraries, and strict TypeScript compliance.

---

## 📱 Implemented Screen Inventory (15 Screens)

| # | Screen Name | Stitch Screen Ref | Route File | Purpose & Focus |
|---|-------------|-------------------|------------|-----------------|
| **1** | **Splash** | `07_Splash` | `app/(auth)/splash.tsx` | Clean splash screen, brand logo, ready status, get started button. |
| **2** | **Welcome** | `08_Welcome` | `app/(auth)/welcome.tsx` | App introduction, 3 feature pillars, create account and sign in buttons, demo link. |
| **3** | **Login** | `10_Login` | `app/(auth)/login.tsx` | Standard email & password inputs, forgot password link, fingerprint login trigger. |
| **4** | **Register** | `09_Register` | `app/(auth)/register.tsx` | Name, email, password strength meter, daily morning reminder toggle. |
| **5** | **Today Dashboard** | `05. Home Dashboard` | `app/(tabs)/today.tsx` | Daily progress, circular progress gauge, morning/afternoon/evening filters, habit cards. |
| **6** | **All Habits** | `11_All_Habits` | `app/habits/all.tsx` | Search bar, active/paused filters, 30-day mini consistency heatmaps, habit list. |
| **7** | **Create Habit** | `07. Create Habit` | `app/habits/create.tsx` | Habit name, categories, icon picker, color swatches, repeat schedule, daily reminder time. |
| **8** | **Habit Details** | `09. Habit Details` | `app/habits/[id]/index.tsx` | Streak and repeat metrics, 30-day calendar grid, complete button, pause and delete actions. |
| **9** | **Edit Habit** | `12_Edit_Habit` | `app/habits/[id]/edit.tsx` | Edit habit details, streak protection notice, pause/resume, delete confirmation. |
| **10** | **Calendar History** | `10. Calendar History` | `app/(tabs)/calendar.tsx` | Monthly calendar grid with completion dots, daily habit history, completion percentage. |
| **11** | **Insights & Analytics** | `11. Insights & Analytics` | `app/(tabs)/insights.tsx` | Timeframe filters (7d/30d/Quarter), 4 stats cards, weekly bar chart, habit breakdown list. |
| **12** | **Profile & Settings** | `12. Profile & Settings` | `app/(tabs)/profile.tsx` | User profile card, active days & streaks, notification preferences, log out button. |
| **13** | **Edit Profile** | `13_Edit_Profile` | `app/profile/edit.tsx` | Profile photo trigger, full name, username, verified email, short bio input. |
| **14** | **Reminder Settings** | `14_Reminder_Settings` | `app/profile/reminders.tsx` | Master reminder switch, Do Not Disturb hours, sound picker, per-habit reminder times. |
| **15** | **UI States & Specs** | `15_UI_States_Components` | `app/ui-states.tsx` | Component gallery: loading skeletons, empty states, undo toast, confirmation modal, errors. |

---

## 🎨 Design Tokens & System

### Palette (Quiet Luxury & Material 3)
- **Primary (Forest Green):** `#1D4233`
- **Primary Container:** `#355A49` (Text: `#FFFFFF`, Dim: `#A7D0BA`)
- **Secondary (Champagne Gold):** `#745A34`
- **Secondary Container (Gold Tint):** `#FEDAAA` (Text: `#785E37`)
- **Surface / Linen Background:** `#F2FCF2`
- **Card Surface:** `#FFFFFF`
- **Surface Container (Warm Muted):** `#E6F1E7`
- **Outline / Hairline Borders:** `#C1C8C2` & `#717974`
- **Error / Crimson Accent:** `#BA1A1A` (Container: `#FFDAD6`)
- **Success Tone:** `#42745A`

### Typography Pairing
- **Editorial Headings:** `@expo-google-fonts/playfair-display` (*Playfair Display* serif, Semibold, Bold, Italic)
- **UI & Controls:** `@expo-google-fonts/manrope` (*Manrope* sans-serif, Regular 400, Medium 500, Semibold 600, Bold 700)

### Spacing & Metrics
- **Base Grid:** 8-point base grid (`xs: 4`, `sm: 8`, `md: 16`, `lg: 24`, `xl: 32`)
- **Corner Radii:** `sm: 6`, `md: 12`, `lg: 16`, `xl: 24`, `full: 9999`
- **Touch Targets:** Minimum 44×44px interactive areas across all buttons, swatches, and toggles.

---

## 📂 Architecture & Directory Structure

```
c:\Users\Hammad Raza\Documents\HabbitFlow
├── app/
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── splash.tsx          # Screen 1: Serene splash
│   │   ├── welcome.tsx         # Screen 2: Editorial welcome
│   │   ├── login.tsx           # Screen 3: Sign in
│   │   └── register.tsx        # Screen 4: Founding member signup
│   ├── (tabs)/
│   │   ├── _layout.tsx         # 4-tab bottom navigation bar
│   │   ├── today.tsx           # Screen 5: Home dashboard
│   │   ├── calendar.tsx        # Screen 10: History & daily archive
│   │   ├── insights.tsx        # Screen 11: Analytics & weekly rhythm
│   │   └── profile.tsx         # Screen 12: Profile & preferences
│   ├── habits/
│   │   ├── _layout.tsx
│   │   ├── all.tsx             # Screen 6: Habit archive
│   │   ├── create.tsx          # Screen 7: Ritual composer
│   │   ├── [id]/
│   │   │   ├── index.tsx       # Screen 8: Habit details
│   │   │   └── edit.tsx        # Screen 9: Edit habit & safeguard
│   ├── profile/
│   │   ├── _layout.tsx
│   │   ├── edit.tsx            # Screen 13: Edit profile
│   │   └── reminders.tsx       # Screen 14: Reminder sanctuary
│   ├── ui-states.tsx           # Screen 15: Living component specification
│   ├── _layout.tsx             # Root layout with font loading & global toast
│   └── index.tsx               # Entry router switch
├── src/
│   ├── components/
│   │   ├── common/             # AppHeader, PrimaryButton, SecondaryButton, FormInput, FormTextarea, etc.
│   │   ├── habits/             # HabitCard, ProgressRing, WeekdaySelector, IconSelector, ColorSelector
│   │   ├── calendar/           # CalendarDayCell, AdherenceHeatmap
│   │   ├── analytics/          # WeeklyBarChart
│   │   ├── feedback/           # EmptyState, LoadingSkeleton, ErrorState, OfflineBanner, ConfirmationSheet, UndoToast
│   │   └── index.ts
│   ├── mocks/                  # Typed mock data (habits, user, preferences, calendar, analytics)
│   ├── store/                  # Zustand mock store (useMockStore.ts)
│   ├── theme/                  # Centralized tokens (colors, typography, spacing)
│   └── types/                  # Strict TypeScript definitions
├── app.json
├── package.json
└── tsconfig.json
```

---

## ⚡ Mock UI Interactions

All screens are fully interactive locally without any external backend dependencies:
- **Mock Authentication:** Sign In, Register, Direct Demo access, and Sign Out seamlessly toggle navigation state.
- **Habit Completion:** Tap any circular checkbox on Today or Habit Details to toggle completion state, increment streak count, update the circular gauge, and trigger the floating `UndoToast`.
- **Undo Toast:** Provides a 4-second decaying timer bar with an interactive `UNDO` button that instantly reverts check-in state.
- **Ritual Composer:** Pick categories, 8 motifs, 5 aura colors, and 7-day cadence schedules to frame new habits into the local store.
- **Interactive Modals:** Destructive confirmation sheet opens and closes with smooth backdrop dismissals.
- **Living Spec Sheet:** Accessible directly from Profile > *UI States & Components Spec* (`/ui-states`) to inspect all 10 component states.

---

## 🚀 Commands to Run

### Development Server
```bash
# Start Expo development server
npx expo start

# Run directly on connected Android device / emulator
npx expo start --android

# Run in Web preview mode
npx expo start --web
```

### Verification & Diagnostic Checks
```bash
# Strict TypeScript Typecheck (0 errors)
npx tsc --noEmit

# Expo Project Diagnostics (20/20 checks passed)
npx expo-doctor
```

---

## 🔌 Day 1 API & Backend Integration Points

When transitioning to Milestone 1 (Backend & API connectivity), replace the mock store with real endpoints at the following exact file locations:

1. **Authentication (`app/(auth)/login.tsx` & `app/(auth)/register.tsx`)**:
   - Replace `loginMock()` and `updateUser()` with real JWT/session tokens from `POST /api/v1/auth/login` and `POST /api/v1/auth/register`.
   - Store access/refresh tokens in `expo-secure-store`.
2. **Habit Data Layer (`src/store/useMockStore.ts` -> React Query / Zustand API slice)**:
   - Replace `mockHabits` with `GET /api/v1/habits`.
   - Replace `toggleHabitCompletion()` with optimistic mutation `POST /api/v1/habits/:id/check-in`.
   - Replace `addHabit()` with `POST /api/v1/habits`.
   - Replace `updateHabit()` and `deleteHabit()` with `PATCH /api/v1/habits/:id` and `DELETE /api/v1/habits/:id`.
3. **Calendar History (`app/(tabs)/calendar.tsx`)**:
   - Fetch monthly grid and day logs via `GET /api/v1/calendar?month=2024-10` and `GET /api/v1/calendar/:dateKey`.
4. **Analytics (`app/(tabs)/insights.tsx`)**:
   - Fetch adherence aggregates via `GET /api/v1/analytics?period=7d`.
5. **Reminders & Push Notifications (`app/profile/reminders.tsx`)**:
   - Integrate `expo-notifications` to schedule local daily notifications with acoustic sound assets.

#   H a b i t F l o w  
 