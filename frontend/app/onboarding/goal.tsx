import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { makeStyles } from "@/src/theme";
import { useOnboarding, Goal } from "@/src/onboarding-context";
import OnboardingShell from "@/src/components/OnboardingShell";
import PrimaryButton from "@/src/components/PrimaryButton";
import SelectionCard from "@/src/components/SelectionCard";
import MascotHero from "@/src/components/MascotHero";
import MascotSpeechBubble from "@/src/components/MascotSpeechBubble";

const GOALS: { key: Goal; title: string; subtitle: string; icon: string }[] = [
  { key: "lose_weight", title: "Lose Weight", subtitle: "Calorie deficit & fat burn", icon: "scale-bathroom" },
  { key: "balanced", title: "Stay Balanced", subtitle: "Maintain your current composition", icon: "scale-balance" },
  { key: "build_muscle", title: "Build Muscle", subtitle: "Protein-focused growth plan", icon: "dumbbell" },
];

const SPEECH: Record<Goal, string> = {
  lose_weight: "Steady wins this one.",
  balanced: "Consistency is the goal.",
  build_muscle: "Let's fuel the work.",
};

const useStyles = makeStyles((t) => ({
  body: { flex: 1 },
  cards: { paddingHorizontal: t.spacing.lg, paddingTop: t.spacing.lg, gap: t.spacing.md },
  mascotRow: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: t.spacing.lg, paddingBottom: t.spacing.sm },
  bubbleWrap: { flex: 1, alignItems: "flex-end", justifyContent: "center", paddingBottom: 24 },
}));

export default function GoalScreen() {
  const styles = useStyles();
  const router = useRouter();
  const { goal, mascotPath, set } = useOnboarding();
  const path = mascotPath ?? "green";

  return (
    <OnboardingShell
      step={3}
      path={path}
      onBack={() => router.back()}
      title="What's your main goal?"
      subtitle="Your wolf adapts the plan."
      footer={
        <PrimaryButton
          label="Next"
          disabled={!goal}
          onPress={() => router.push("/onboarding/age")}
          testID="goal-next"
        />
      }
    >
      <View style={styles.body}>
        <View style={styles.cards}>
          {GOALS.map((g) => (
            <SelectionCard
              key={g.key}
              title={g.title}
              subtitle={g.subtitle}
              icon={g.icon}
              selected={goal === g.key}
              onPress={() => set("goal", g.key)}
              testID={`goal-${g.key}`}
            />
          ))}
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.mascotRow}>
          <MascotHero path={path} stage="cub" height={150} float shadow={false} />
          <View style={styles.bubbleWrap}>
            <MascotSpeechBubble
              text={goal ? SPEECH[goal] : "Pick what fits you."}
              pointer="left"
              animateKey={goal ?? "none"}
            />
          </View>
        </View>
      </View>
    </OnboardingShell>
  );
}
