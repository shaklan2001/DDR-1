import React from "react";
import { View, StyleSheet, ViewStyle, DimensionValue } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from "react-native-reanimated";
import { useTheme } from "@/src/theme";
import { brand } from "@/src/mascots";

export type LeafProps = {
  size: number;
  top?: DimensionValue;
  left?: DimensionValue;
  right?: DimensionValue;
  bottom?: DimensionValue;
  rotate?: number;
  opacity?: number;
  tint?: string;
  sway?: boolean;
  delay?: number;
};

export default function LeafDecoration({
  size,
  top,
  left,
  right,
  bottom,
  rotate = 0,
  opacity = 1,
  tint,
  sway = false,
  delay = 0,
}: LeafProps) {
  const t = useTheme();
  const s = useSharedValue(0);

  React.useEffect(() => {
    if (sway) {
      s.value = withRepeat(
        withTiming(1, { duration: 3200 + delay, easing: Easing.inOut(Easing.sin) }),
        -1,
        true,
      );
    }
  }, [sway, delay, s]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate + (sway ? s.value * 6 - 3 : 0)}deg` }],
  }));

  const posStyle: ViewStyle = { position: "absolute", top, left, right, bottom, opacity };

  return (
    <Animated.View pointerEvents="none" style={[posStyle, animStyle]}>
      <Image
        source={brand.leaf}
        style={{ width: size, height: size }}
        contentFit="contain"
        tintColor={tint}
        transition={200}
      />
    </Animated.View>
  );
}

export const leafStyles = StyleSheet.create({});
