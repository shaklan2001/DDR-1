import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { makeStyles } from "@/src/theme";
import { useOnboarding } from "@/src/onboarding-context";
import OnboardingShell from "@/src/components/OnboardingShell";
import PrimaryButton from "@/src/components/PrimaryButton";
import WheelPicker from "@/src/components/WheelPicker";
import MascotHero from "@/src/components/MascotHero";
import MascotSpeechBubble from "@/src/components/MascotSpeechBubble";

const useStyles = makeStyles((t) => ({
  body: { flex: 1 },
  picker: { marginTop: t.spacing.base },
  mascotRow: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: t.spacing.lg, paddingBottom: t.spacing.sm },
  bubbleWrap: { flex: 1, alignItems: "flex-end", justifyContent: "center", paddingBottom: 20 },
}));

export default function WeightScreen() {
  const styles = useStyles();
  const router = useRouter();
  const { weightKg, mascotPath, set } = useOnboarding();
  const path = mascotPath ?? "green";

  return (
    <OnboardingShell
      step={7}
      path={path}
      onBack={() => router.back()}
      title="What's your weight?"
      subtitle="We'll use this to set your daily targets."
      footer={<PrimaryButton label="Build my plan" onPress={() => router.push("/onboarding/plan")} testID="weight-next" />}
    >
      <View style={styles.body}>
        <View style={styles.picker}>
          <WheelPicker min={30} max={200} value={weightKg} onChange={(v) => set("weightKg", v)} unit="kg" path={path} testID="weight-picker" />
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.mascotRow}>
          <MascotHero path={path} stage="pup" pose="default" height={152} float shadow={false} />
          <View style={styles.bubbleWrap}>
            <MascotSpeechBubble text="You're doing great." pointer="left" />
          </View>
        </View>
      </View>
    </OnboardingShell>
  );
}
