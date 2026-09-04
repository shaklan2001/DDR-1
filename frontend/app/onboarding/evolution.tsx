import React from "react";
import { useRouter } from "expo-router";
import { useOnboarding } from "@/src/onboarding-context";
import OnboardingShell from "@/src/components/OnboardingShell";
import PrimaryButton from "@/src/components/PrimaryButton";
import EvolutionPath from "@/src/components/EvolutionPath";

export default function Evolution() {
  const router = useRouter();
  const { mascotPath } = useOnboarding();
  const path = mascotPath ?? "green";

  return (
    <OnboardingShell
      step={2}
      path={path}
      variant="mountain"
      scrollable
      onBack={() => router.back()}
      title={"Your wolf evolves\nwith your progress"}
      subtitle="Log meals. Earn XP. Hit your goals. Become the best version of you."
      footer={<PrimaryButton label="Let's go" onPress={() => router.push("/onboarding/goal")} testID="evolution-next" />}
    >
      <EvolutionPath path={path} />
    </OnboardingShell>
  );
}
