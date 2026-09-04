import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@react-native-vector-icons/material-design-icons";
import Animated, { FadeIn, FadeInUp, FadeInDown } from "react-native-reanimated";
import { makeStyles, useTheme } from "@/src/theme";
import { useOnboarding } from "@/src/onboarding-context";
import ForestBackground from "@/src/components/ForestBackground";
import MascotHero from "@/src/components/MascotHero";
import PlanGenerationStep from "@/src/components/PlanGenerationStep";
import PrimaryButton from "@/src/components/PrimaryButton";

function computePlan(gender: string | null, age: number, cm: number, kg: number, goal: string | null) {
  const s = gender === "male" ? 5 : gender === "female" ? -161 : -78;
  const bmr = 10 * kg + 6.25 * cm - 5 * age + s;
  const tdee = bmr * 1.45;
  const factor = goal === "lose_weight" ? 0.8 : goal === "build_muscle" ? 1.1 : 1.0;
  const kcal = Math.round((tdee * factor) / 10) * 10;
  const proteinPerKg = goal === "build_muscle" ? 2.0 : goal === "lose_weight" ? 1.8 : 1.6;
  const protein = Math.round(proteinPerKg * kg);
  const fat = Math.round((kcal * 0.25) / 9);
  const carbs = Math.max(0, Math.round((kcal - (protein * 4 + fat * 9)) / 4));
  return { kcal, protein, carbs, fat };
}

const STEPS = ["Calculating daily calories", "Setting macro targets", "Preparing your wolf journey"];

const useStyles = makeStyles((t) => ({
  root: { flex: 1, paddingHorizontal: t.spacing.lg },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  headline: { fontFamily: t.fonts.extrabold, fontSize: 26, color: t.colors.charcoal, textAlign: "center", letterSpacing: -0.5 },
  buildCard: {
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.base,
    marginTop: t.spacing.lg,
    width: "100%",
    shadowColor: t.colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  readyTitle: { fontFamily: t.fonts.black, fontSize: 32, color: t.colors.charcoal, textAlign: "center", letterSpacing: -0.8 },
  readySub: { fontFamily: t.fonts.medium, fontSize: 15, color: t.colors.textSecondary, textAlign: "center", marginTop: 6 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: t.spacing.md, marginTop: t.spacing.lg },
  stat: {
    width: "47.5%",
    flexDirection: "row",
    alignItems: "center",
    gap: t.spacing.md,
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.md,
  },
  statIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  statValue: { fontFamily: t.fonts.extrabold, fontSize: 19, color: t.colors.charcoal },
  statLabel: { fontFamily: t.fonts.medium, fontSize: 12, color: t.colors.textSecondary },
  adjust: { fontFamily: t.fonts.medium, fontSize: 13, color: t.colors.textTertiary, textAlign: "center", marginTop: t.spacing.base },
}));

function Stat({ value, unit, label, icon, color, bg }: { value: number; unit: string; label: string; icon: string; color: string; bg: string }) {
  const styles = useStyles();
  return (
    <View style={styles.stat}>
      <View style={[styles.statIcon, { backgroundColor: bg }]}>
        <Icon name={icon as any} size={20} color={color} />
      </View>
      <View>
        <Text style={styles.statValue}>{value}<Text style={{ fontSize: 13 }}>{unit}</Text></Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

export default function PlanScreen() {
  const styles = useStyles();
  const t = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mascotPath, gender, age, heightCm, weightKg, goal } = useOnboarding();
  const path = mascotPath ?? "green";

  const [done, setDone] = React.useState(0);
  const [ready, setReady] = React.useState(false);
  const plan = React.useMemo(() => computePlan(gender, age, heightCm, weightKg, goal), [gender, age, heightCm, weightKg, goal]);

  React.useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => timers.push(setTimeout(() => setDone(i + 1), 650 * (i + 1))));
    timers.push(setTimeout(() => setReady(true), 650 * STEPS.length + 700));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <ForestBackground variant={ready ? "mountain" : "forest"}>
      <View style={[styles.root, { paddingTop: insets.top + t.spacing.lg, paddingBottom: insets.bottom + t.spacing.base }]}>
        {!ready ? (
          <View style={styles.center}>
            <Text style={styles.headline}>Building your plan...</Text>
            <MascotHero path={path} stage="cub" height={190} float shadow />
            <Animated.View entering={FadeIn} style={styles.buildCard}>
              {STEPS.map((label, i) => (
                <PlanGenerationStep key={label} label={label} done={done > i} testID={`plan-step-${i}`} />
              ))}
            </Animated.View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Animated.View entering={FadeIn.duration(500)} style={{ alignItems: "center" }}>
              <MascotHero path={path} stage="pup" height={210} float shadow />
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(150).duration(500)}>
              <Text style={styles.readyTitle}>You&apos;re ready!</Text>
              <Text style={styles.readySub}>A healthier, stronger you starts now.</Text>
              <View style={styles.grid}>
                <Stat value={plan.kcal} unit=" kcal" label="per day" icon="fire" color={t.colors.amber} bg={t.colors.amberTint} />
                <Stat value={plan.protein} unit="g" label="protein" icon="food-drumstick" color={t.colors.protein} bg={t.colors.proteinTint} />
                <Stat value={plan.carbs} unit="g" label="carbs" icon="barley" color={t.colors.amberDark} bg={t.colors.carbTint} />
                <Stat value={plan.fat} unit="g" label="fat" icon="water" color={t.colors.textSecondary} bg={t.colors.fatTint} />
              </View>
              <Text style={styles.adjust}>You can adjust these later.</Text>
            </Animated.View>
            <View style={{ flex: 1 }} />
            <Animated.View entering={FadeInDown.delay(300)}>
              <PrimaryButton label="Start my journey" variant={path === "pink" ? "pink" : "dark"} onPress={() => router.replace("/")} testID="plan-start-button" />
            </Animated.View>
          </View>
        )}
      </View>
    </ForestBackground>
  );
}
