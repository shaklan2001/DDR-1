import React from "react";
import { View, Text, Pressable, ViewStyle } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons";
import * as Haptics from "expo-haptics";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { makeStyles } from "@/src/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const useStyles = makeStyles((t) => ({
  base: {
    height: 56,
    borderRadius: t.radius.pill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: t.spacing.md,
    backgroundColor: t.colors.surface,
    borderWidth: 1.5,
    borderColor: t.colors.border,
  },
  label: { fontFamily: t.fonts.semibold, fontSize: 15.5, color: t.colors.text },
}));

export default function SocialAuthButton({
  label = "Continue with Google",
  onPress,
  style,
  testID,
}: {
  label?: string;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}) {
  const styles = useStyles();
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPressIn={() => { scale.value = withSpring(0.98, { damping: 15 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 15 }); }}
      onPress={() => { Haptics.selectionAsync(); onPress?.(); }}
      style={[styles.base, animStyle, style]}
    >
      <Icon name="google" size={20} color="#EA4335" />
      <Text style={styles.label}>{label}</Text>
    </AnimatedPressable>
  );
}
