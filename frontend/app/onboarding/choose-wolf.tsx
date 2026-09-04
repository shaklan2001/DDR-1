import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, FadeInDown } from "react-native-reanimated";
import Icon from "@react-native-vector-icons/material-design-icons";
import { makeStyles, useTheme } from "@/src/theme";
import { useOnboarding } from "@/src/onboarding-context";
import { MascotPath, brand } from "@/src/mascots";
import OnboardingShell from "@/src/components/OnboardingShell";
import PrimaryButton from "@/src/components/PrimaryButton";
import MascotHero from "@/src/components/MascotHero";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const useStyles = makeStyles((t) => ({
  body: { flex: 1, paddingHorizontal: t.spacing.lg, paddingTop: t.spacing.lg },
  cards: { flexDirection: "row", gap: t.spacing.md },
  card: {
    flex: 1,
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.lg,
    borderWidth: 2,
    borderColor: t.colors.border,
    paddingTop: t.spacing.md,
    paddingBottom: t.spacing.base,
    alignItems: "center",
    overflow: "hidden",
    shadowColor: t.colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  label: { fontFamily: t.fonts.extrabold, fontSize: 17, color: t.colors.charcoal, marginTop: 2 },
  support: { fontFamily: t.fonts.medium, fontSize: 12.5, color: t.colors.textSecondary, textAlign: "center", marginTop: 4, paddingHorizontal: 8, lineHeight: 17 },
  check: { position: "absolute", top: 10, right: 10, width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  note: {
    flexDirection: "row",
    alignItems: "center",
    gap: t.spacing.md,
    backgroundColor: t.colors.greenTint,
    borderRadius: t.radius.md,
    padding: t.spacing.base,
    marginTop: t.spacing.lg,
  },
  noteText: { flex: 1, fontFamily: t.fonts.semibold, fontSize: 13.5, color: t.colors.greenDark, lineHeight: 19 },
}));

function WolfCard({ path, selected, onPress }: { path: MascotPath; selected: boolean; onPress: () => void }) {
  const styles = useStyles();
  const t = useTheme();
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const accent = path === "pink" ? t.colors.pink : t.colors.green;
  const tint = path === "pink" ? t.colors.pinkTint : t.colors.greenTint;
  const label = path === "pink" ? "Pink Journey" : "Green Journey";
  const support = path === "pink" ? "Bold. Positive. Ready to grow." : "Focused. Friendly. Ready to grow.";

  return (
    <AnimatedPressable
      testID={`wolf-card-${path}`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPressIn={() => { scale.value = withSpring(0.97, { damping: 15 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 15 }); }}
      onPress={() => { Haptics.selectionAsync(); onPress(); }}
      style={[styles.card, anim, selected && { borderColor: accent, backgroundColor: tint }]}
    >
      {selected && (
        <View style={[styles.check, { backgroundColor: accent }]}>
          <Icon name="check" size={15} color="#FFFFFF" />
        </View>
      )}
      <MascotHero path={path} stage="cub" height={132} float={selected} shadow={false} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.support}>{support}</Text>
    </AnimatedPressable>
  );
}

export default function ChooseWolf() {
  const styles = useStyles();
  const t = useTheme();
  const router = useRouter();
  const { mascotPath, set } = useOnboarding();

  return (
    <OnboardingShell
      step={1}
      path={mascotPath ?? "green"}
      title="Choose your wolf"
      subtitle="Same journey. Different style. You can change this later."
      footer={
        <PrimaryButton
          label="Next"
          disabled={!mascotPath}
          onPress={() => router.push("/onboarding/evolution")}
          testID="choose-wolf-next"
        />
      }
    >
      <View style={styles.body}>
        <View style={styles.cards}>
          <WolfCard path="green" selected={mascotPath === "green"} onPress={() => set("mascotPath", "green")} />
          <WolfCard path="pink" selected={mascotPath === "pink"} onPress={() => set("mascotPath", "pink")} />
        </View>

        <Animated.View entering={FadeInDown.delay(200)} style={styles.note}>
          <Image source={brand.leaf} style={{ width: 24, height: 24 }} contentFit="contain" />
          <Text style={styles.noteText}>Your wolf will grow with you — from Cub to Alpha.</Text>
        </Animated.View>
      </View>
    </OnboardingShell>
  );
}
