import { useMemo } from "react";
import { StyleSheet } from "react-native";

/**
 * Diet Done Right — LIGHT THEME ONLY (splash is the single dark surface, handled locally).
 * All colors live here. Components read colors via useTheme().colors and build
 * StyleSheets via makeStyles(). Never hardcode colors in screens/components.
 */
export const colors = {
  // Surfaces
  background: "#F9FAFB",
  surface: "#FFFFFF",
  surfaceAlt: "#F3F4F6",

  // Text
  charcoal: "#111827",
  text: "#1F2937",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  onDark: "#FFFFFF",
  onDarkMuted: "rgba(255,255,255,0.72)",

  // Lines
  border: "#E5E7EB",
  borderStrong: "#D1D5DB",

  // Brand
  green: "#16A34A",
  greenDark: "#15803D",
  greenTint: "#ECFDF5",
  greenTintStrong: "#DCFCE7",
  greenBorder: "#86EFAC",

  amber: "#F59E0B",
  amberDark: "#D97706",
  amberTint: "#FEF3C7",

  xpYellow: "#EAB308",
  protein: "#3B82F6",
  proteinTint: "#DBEAFE",
  carbTint: "#FEF3C7",
  fatTint: "#F3F4F6",

  // Female accent path
  pink: "#EC4899",
  pinkDark: "#DB2777",
  pinkTint: "#FDF2F8",
  pinkTintStrong: "#FCE7F3",
  pinkBorder: "#F9A8D4",

  // Splash / dark scene
  charcoalDeep: "#0B1120",

  // Utility
  shadow: "#111827",
  overlay: "rgba(17,24,39,0.55)",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  xxl: 44,
} as const;

export const radius = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const fonts = {
  regular: "Inter-Regular",
  medium: "Inter-Medium",
  semibold: "Inter-SemiBold",
  bold: "Inter-Bold",
  extrabold: "Inter-ExtraBold",
  black: "Inter-Black",
} as const;

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  radius: typeof radius;
  fonts: typeof fonts;
};

const theme: Theme = { colors, spacing, radius, fonts };

export function useTheme(): Theme {
  return theme;
}

/**
 * makeStyles — wraps StyleSheet.create with theme access.
 * Usage:
 *   const useStyles = makeStyles((t) => ({ box: { backgroundColor: t.colors.surface } }));
 *   const styles = useStyles();
 */
export function makeStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: (t: Theme) => T,
) {
  return function useStyles(): T {
    const t = useTheme();
    return useMemo(() => StyleSheet.create(factory(t)), [t]);
  };
}
