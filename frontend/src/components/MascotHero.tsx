import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  FadeIn,
} from "react-native-reanimated";
import { makeStyles } from "@/src/theme";
import { MascotPath, MascotStage, MascotPose, mascotSource } from "@/src/mascots";

const useStyles = makeStyles((t) => ({
  wrap: { alignItems: "center", justifyContent: "flex-end" },
  shadow: {
    position: "absolute",
    bottom: 6,
    height: 16,
    borderRadius: 999,
    backgroundColor: "rgba(17,24,39,0.18)",
  },
}));

export default function MascotHero({
  path,
  stage,
  pose = "default",
  height,
  float = true,
  shadow = true,
  flip = false,
  style,
}: {
  path: MascotPath;
  stage: MascotStage;
  pose?: MascotPose;
  height: number;
  float?: boolean;
  shadow?: boolean;
  flip?: boolean;
  style?: any;
}) {
  const styles = useStyles();
  const y = useSharedValue(0);

  React.useEffect(() => {
    if (float) {
      y.value = withRepeat(
        withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
        -1,
        true,
      );
    }
  }, [float, y]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: float ? -(y.value * 7) : 0 },
      { scaleX: flip ? -1 : 1 },
    ],
  }));

  const width = height * 0.86;

  return (
    <Animated.View entering={FadeIn.duration(500)} style={[styles.wrap, { height: height + 8 }, style]}>
      {shadow && (
        <Animated.View
          style={[styles.shadow, { width: width * 0.62 }, useAnimatedStyle(() => ({ transform: [{ scaleX: 1 - y.value * 0.06 }], opacity: 1 - y.value * 0.12 }))]}
        />
      )}
      <Animated.View style={animStyle}>
        <Image
          source={mascotSource(path, stage, pose)}
          style={{ width, height }}
          contentFit="contain"
          transition={200}
        />
      </Animated.View>
    </Animated.View>
  );
}
