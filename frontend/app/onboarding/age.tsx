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

export default function AgeScreen() {
  const styles = useStyles();
  const router = useRouter();
  const { age, mascotPath, set } = useOnboarding();
  const path = mascotPath ?? "green";

  return (
    <OnboardingShell
      step={4}
      path={path}
      onBack={() => router.back()}
      title="How old are you?"
      subtitle="Helps calculate your daily energy needs."
      footer={<PrimaryButton label="Next" onPress={() => router.push("/onboarding/gender")} testID="age-next" />}
    >
      <View style={styles.body}>
        <View style={styles.picker}>
          <WheelPicker min={13} max={100} value={age} onChange={(v) => set("age", v)} unit="years" path={path} testID="age-picker" />
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.mascotRow}>
          <MascotHero path={path} stage="pup" height={150} float shadow={false} />
          <View style={styles.bubbleWrap}>
            <MascotSpeechBubble text="One step closer to your plan." pointer="left" />
          </View>
        </View>
      </View>
    </OnboardingShell>
  );
}
