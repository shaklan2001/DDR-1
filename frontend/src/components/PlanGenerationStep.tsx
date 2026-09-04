import React from "react";
import { View, Text } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { makeStyles, useTheme } from "@/src/theme";

const useStyles = makeStyles((t) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: t.spacing.md,
    paddingVertical: t.spacing.md,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  label: { fontFamily: t.fonts.semibold, fontSize: 15.5, color: t.colors.text, flex: 1 },
}));

export default function PlanGenerationStep({
  label,
  done,
  testID,
}: {
  label: string;
  done: boolean;
  testID?: string;
}) {
  const styles = useStyles();
  const t = useTheme();
  const s = useSharedValue(0);

  React.useEffect(() => {
    s.value = withTiming(done ? 1 : 0, { duration: 320, easing: Easing.out(Easing.cubic) });
  }, [done, s]);

  const circleStyle = useAnimatedStyle(() => ({
    backgroundColor: done ? t.colors.green : "transparent",
    borderColor: done ? t.colors.green : t.colors.border,
    transform: [{ scale: 0.9 + s.value * 0.1 }],
  }));
  const checkStyle = useAnimatedStyle(() => ({ opacity: s.value, transform: [{ scale: s.value }] }));
  const labelStyle = useAnimatedStyle(() => ({ opacity: 0.5 + s.value * 0.5 }));

  return (
    <View style={styles.row} testID={testID}>
      <Animated.View style={[styles.circle, circleStyle]}>
        <Animated.View style={checkStyle}>
          <Icon name="check" size={17} color="#FFFFFF" />
        </Animated.View>
      </Animated.View>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
    </View>
  );
}
