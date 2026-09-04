import React from "react";
import { View, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";
import { makeStyles, useTheme } from "@/src/theme";
import { MascotPath } from "@/src/mascots";

const useStyles = makeStyles((t) => ({
  row: { flexDirection: "row", alignItems: "center", gap: t.spacing.md },
  track: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: t.colors.border,
    overflow: "hidden",
  },
  fill: { height: 6, borderRadius: 999 },
  count: { fontFamily: t.fonts.bold, fontSize: 14, color: t.colors.textSecondary, minWidth: 34, textAlign: "right" },
}));

export default function OnboardingProgress({
  step,
  total = 7,
  path = "green",
}: {
  step: number;
  total?: number;
  path?: MascotPath;
}) {
  const styles = useStyles();
  const t = useTheme();
  const pct = useSharedValue(0);
  const target = Math.max(0, Math.min(1, step / total));

  React.useEffect(() => {
    pct.value = withTiming(target, { duration: 480, easing: Easing.out(Easing.cubic) });
  }, [target, pct]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${pct.value * 100}%` }));
  const color = path === "pink" ? t.colors.pink : t.colors.green;

  return (
    <View style={styles.row}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { backgroundColor: color }, fillStyle]} />
      </View>
      <Text style={styles.count}>{step}/{total}</Text>
    </View>
  );
}
