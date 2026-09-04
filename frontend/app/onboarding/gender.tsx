import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import Icon from "@react-native-vector-icons/material-design-icons";
import { makeStyles, useTheme } from "@/src/theme";
import { useOnboarding, Gender } from "@/src/onboarding-context";
import OnboardingShell from "@/src/components/OnboardingShell";
import PrimaryButton from "@/src/components/PrimaryButton";
import SelectionCard from "@/src/components/SelectionCard";
import MascotHero from "@/src/components/MascotHero";
import MascotSpeechBubble from "@/src/components/MascotSpeechBubble";

const OPTIONS: { key: Gender; title: string; icon: string; accent: "green" | "pink" | "neutral" }[] = [
  { key: "male", title: "Male", icon: "gender-male", accent: "green" },
  { key: "female", title: "Female", icon: "gender-female", accent: "pink" },
  { key: "other", title: "Other", icon: "account-outline", accent: "neutral" },
];

const useStyles = makeStyles((t) => ({
  body: { flex: 1 },
  tiles: { flexDirection: "row", gap: t.spacing.md, paddingHorizontal: t.spacing.lg, paddingTop: t.spacing.lg },
  helper: {
    flexDirection: "row",
    alignItems: "center",
    gap: t.spacing.sm,
    backgroundColor: t.colors.surfaceAlt,
    borderRadius: t.radius.md,
    padding: t.spacing.md,
    marginHorizontal: t.spacing.lg,
    marginTop: t.spacing.base,
  },
  helperText: { flex: 1, fontFamily: t.fonts.medium, fontSize: 12.5, color: t.colors.textSecondary, lineHeight: 17 },
  mascotRow: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: t.spacing.lg, paddingBottom: t.spacing.sm },
  bubbleWrap: { flex: 1, alignItems: "flex-end", justifyContent: "center", paddingBottom: 20 },
}));

export default function GenderScreen() {
  const styles = useStyles();
  const t = useTheme();
  const router = useRouter();
  const { gender, mascotPath, set } = useOnboarding();
  const path = mascotPath ?? "green";

  return (
    <OnboardingShell
      step={5}
      path={path}
      onBack={() => router.back()}
      title={"How should we calculate\nyour plan?"}
      subtitle="We use this to estimate your daily energy needs."
      footer={
        <PrimaryButton
          label="Next"
          disabled={!gender}
          onPress={() => router.push("/onboarding/height")}
          testID="gender-next"
        />
      }
    >
      <View style={styles.body}>
        <View style={styles.tiles}>
          {OPTIONS.map((o) => (
            <SelectionCard
              key={o.key}
              title={o.title}
              icon={o.icon}
              layout="tile"
              accent={o.accent}
              selected={gender === o.key}
              onPress={() => set("gender", o.key)}
              style={{ flex: 1 }}
              testID={`gender-${o.key}`}
            />
          ))}
        </View>

        <View style={styles.helper}>
          <Icon name="information-outline" size={16} color={t.colors.textSecondary} />
          <Text style={styles.helperText}>Your wolf style and this answer can be different.</Text>
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.mascotRow}>
          <MascotHero path={path} stage="cub" height={148} float shadow={false} />
          <View style={styles.bubbleWrap}>
            <MascotSpeechBubble text="It's about building a better you." pointer="left" />
          </View>
        </View>
      </View>
    </OnboardingShell>
  );
}
