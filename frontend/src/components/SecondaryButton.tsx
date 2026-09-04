import React from "react";
import { Text, Pressable, ViewStyle } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons";
import * as Haptics from "expo-haptics";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { makeStyles } from "@/src/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const useStyles = makeStyles((t) => ({
  base: {
    height: 54,
    borderRadius: t.radius.pill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: t.spacing.lg,
    gap: t.spacing.sm,
    backgroundColor: t.colors.surface,
    borderWidth: 1.5,
    borderColor: t.colors.border,
  },
  label: { fontFamily: t.fonts.semibold, fontSize: 16, color: t.colors.text },
}));

export default function SecondaryButton({
  label,
  onPress,
  icon,
  style,
  testID,
}: {
  label: string;
  onPress?: () => void;
  icon?: string;
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
      onPressIn={() => { scale.value = withSpring(0.97, { damping: 15 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 15 }); }}
      onPress={() => { Haptics.selectionAsync(); onPress?.(); }}
      style={[styles.base, animStyle, style]}
    >
      {icon && <Icon name={icon as any} size={20} color="#1F2937" />}
      <Text style={styles.label}>{label}</Text>
    </AnimatedPressable>
  );
}
