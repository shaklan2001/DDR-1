import React from "react";
import { Text, Pressable, ViewStyle, ActivityIndicator, View } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons";
import * as Haptics from "expo-haptics";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { makeStyles, useTheme } from "@/src/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Variant = "dark" | "amber" | "pink";

const useStyles = makeStyles((t) => ({
  base: {
    height: 58,
    borderRadius: t.radius.pill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: t.spacing.lg,
    gap: t.spacing.sm,
    shadowColor: t.colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  dark: { backgroundColor: t.colors.charcoal },
  amber: { backgroundColor: t.colors.amber },
  pink: { backgroundColor: t.colors.pink },
  disabled: { backgroundColor: t.colors.borderStrong, shadowOpacity: 0, elevation: 0 },
  label: { fontFamily: t.fonts.bold, fontSize: 17, letterSpacing: 0.2 },
  labelLight: { color: t.colors.onDark },
  labelDisabled: { color: "#FFFFFF" },
}));

export default function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = "dark",
  icon = "arrow-right",
  showIcon = true,
  style,
  testID,
}: {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  icon?: string;
  showIcon?: boolean;
  style?: ViewStyle;
  testID?: string;
}) {
  const styles = useStyles();
  const t = useTheme();
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const inactive = disabled || loading;

  return (
    <AnimatedPressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={inactive}
      onPressIn={() => { scale.value = withSpring(0.97, { damping: 15 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 15 }); }}
      onPress={() => {
        if (inactive) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress?.();
      }}
      style={[styles.base, inactive ? styles.disabled : styles[variant], animStyle, style]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <>
          <Text style={[styles.label, inactive ? styles.labelDisabled : styles.labelLight]}>{label}</Text>
          {showIcon && (
            <Icon name={icon as any} size={22} color="#FFFFFF" />
          )}
        </>
      )}
    </AnimatedPressable>
  );
}
