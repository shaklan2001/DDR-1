import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { makeStyles, useTheme } from "@/src/theme";
import { MascotPath, StageInfo } from "@/src/mascots";
import MascotHero from "./MascotHero";

const useStyles = makeStyles((t) => ({
  row: { flexDirection: "row", alignItems: "center", gap: t.spacing.base },
  mascotCol: { width: 118, alignItems: "center" },
  youBadge: {
    position: "absolute",
    bottom: 2,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    zIndex: 2,
  },
  youText: { fontFamily: t.fonts.extrabold, fontSize: 11, color: "#FFFFFF", letterSpacing: 0.5 },
  info: { flex: 1 },
  title: { fontFamily: t.fonts.extrabold, fontSize: 18, color: t.colors.charcoal },
  xp: { fontFamily: t.fonts.bold, fontSize: 13.5, marginTop: 1 },
  tagline: { fontFamily: t.fonts.medium, fontSize: 13, color: t.colors.textSecondary, marginTop: 3, lineHeight: 18 },
}));

export default function MascotStageCard({
  path,
  info,
  current,
  index,
  reverse = false,
}: {
  path: MascotPath;
  info: StageInfo;
  current: boolean;
  index: number;
  reverse?: boolean;
}) {
  const styles = useStyles();
  const t = useTheme();
  const accent = path === "pink" ? t.colors.pink : t.colors.green;
  const size = info.stage === "cub" ? 96 : info.stage === "pup" ? 104 : info.stage === "wild" ? 112 : 118;

  const Mascot = (
    <View style={styles.mascotCol}>
      {current && (
        <View style={[styles.youBadge, { backgroundColor: accent }]}>
          <Text style={styles.youText}>YOU</Text>
        </View>
      )}
      <View style={{ opacity: current ? 1 : 0.5 }}>
        <MascotHero path={path} stage={info.stage} height={size} float={current} shadow={false} />
      </View>
    </View>
  );

  const Info = (
    <View style={[styles.info, reverse && { alignItems: "flex-end" }]}>
      <Text style={[styles.title, { opacity: current ? 1 : 0.7 }]}>{info.title}</Text>
      <Text style={[styles.xp, { color: accent, opacity: current ? 1 : 0.7 }]}>{info.xpLabel}</Text>
      <Text style={[styles.tagline, reverse && { textAlign: "right" }]}>{info.tagline}</Text>
    </View>
  );

  return (
    <Animated.View
      entering={FadeInDown.delay(200 + index * 220).springify().damping(15)}
      style={styles.row}
    >
      {reverse ? (<>{Info}{Mascot}</>) : (<>{Mascot}{Info}</>)}
    </Animated.View>
  );
}
