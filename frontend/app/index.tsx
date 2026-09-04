import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { makeStyles, useTheme } from "@/src/theme";
import { brand } from "@/src/mascots";
import ForestBackground from "@/src/components/ForestBackground";
import MascotHero from "@/src/components/MascotHero";
import PrimaryButton from "@/src/components/PrimaryButton";
import LeafDecoration from "@/src/components/LeafDecoration";

const { height: SCREEN_H } = Dimensions.get("window");

const useStyles = makeStyles((t) => ({
  fill: { flex: 1 },
  content: { flex: 1, paddingHorizontal: t.spacing.lg },
  top: { alignItems: "flex-start" },
  wordmark: {
    fontFamily: t.fonts.black,
    fontSize: 46,
    lineHeight: 46,
    color: t.colors.onDark,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: t.fonts.medium,
    fontSize: 16,
    color: t.colors.onDarkMuted,
    marginTop: t.spacing.md,
  },
  mascotWrap: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  footerCopy: {
    fontFamily: t.fonts.medium,
    fontSize: 13,
    color: t.colors.onDarkMuted,
    textAlign: "center",
    marginTop: t.spacing.md,
  },
}));

export default function Splash() {
  const styles = useStyles();
  const t = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const begin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/login");
  };

  const mascotH = Math.min(SCREEN_H * 0.44, 380);

  return (
    <Pressable style={styles.fill} onPress={begin} testID="splash-screen">
      <StatusBar style="light" />
      <ForestBackground variant="splash">
        {/* extra amber glow leaf accents */}
        <LeafDecoration size={26} bottom="30%" left="12%" rotate={20} opacity={0.5} tint={t.colors.amber} sway delay={400} />
        <View style={[styles.content, { paddingTop: insets.top + t.spacing.xl }]}>
          <Animated.View entering={FadeInDown.duration(600)} style={styles.top}>
            <Image source={brand.leaf} style={{ width: 46, height: 46, marginBottom: t.spacing.base }} contentFit="contain" />
            <Text style={styles.wordmark}>DIET</Text>
            <Text style={styles.wordmark}>DONE</Text>
            <Text style={styles.wordmark}>RIGHT</Text>
            <Text style={styles.tagline}>Consistency looks good on you.</Text>
          </Animated.View>

          <View style={styles.mascotWrap}>
            <Animated.View entering={FadeIn.delay(300).duration(700)}>
              <MascotHero path="green" stage="cub" height={mascotH} float shadow={false} />
            </Animated.View>
          </View>

          <Animated.View entering={FadeInUp.delay(500).duration(600)} style={{ paddingBottom: insets.bottom + t.spacing.base }}>
            <PrimaryButton label="Tap to begin" variant="amber" onPress={begin} testID="splash-begin-button" />
            <Text style={styles.footerCopy}>Fuel better. A brighter you.</Text>
          </Animated.View>
        </View>
      </ForestBackground>
    </Pressable>
  );
}
