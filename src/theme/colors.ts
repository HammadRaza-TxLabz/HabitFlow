export const colors = {
  // Primary (Deep Forest Green)
  primary: '#1D4233',
  primaryContainer: '#355A49',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#A7D0BA',
  primaryFixed: '#C3ECD5',
  primaryFixedDim: '#A7D0BA',
  onPrimaryFixed: '#002115',
  onPrimaryFixedVariant: '#294E3D',
  surfaceTint: '#416654',

  // Secondary (Warm Champagne Gold)
  secondary: '#745A34',
  secondaryContainer: '#FEDAAA',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#785E37',
  secondaryFixed: '#FFDDB0',
  secondaryFixedDim: '#E3C192',
  onSecondaryFixed: '#281800',
  onSecondaryFixedVariant: '#5A431E',

  // Tertiary (Slate Sage)
  tertiary: '#363E37',
  tertiaryContainer: '#4D554E',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#C1C9C0',
  tertiaryFixed: '#DDE5DB',
  tertiaryFixedDim: '#C1C9BF',

  // Surfaces & Grounds (Warm Linen / Ivory tones)
  surface: '#F2FCF2',
  surfaceBright: '#F2FCF2',
  surfaceDim: '#D3DDD3',
  card: '#FFFFFF',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#ECF6ED',
  surfaceContainer: '#E6F1E7',
  surfaceContainerHigh: '#E1EBE1',
  surfaceContainerHighest: '#DBE5DC',
  surfaceVariant: '#DBE5DC',
  background: '#F2FCF2',

  // Ink Typography & Outlines
  onSurface: '#151E18',
  onSurfaceVariant: '#414844',
  onBackground: '#151E18',
  outline: '#717974',
  outlineVariant: '#C1C8C2',
  inverseSurface: '#29332C',
  inverseOnSurface: '#E9F3EA',
  inversePrimary: '#A7D0BA',

  // Semantic & Alerts
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#93000A',
  success: '#42745A',
} as const;

export type ColorToken = keyof typeof colors;
