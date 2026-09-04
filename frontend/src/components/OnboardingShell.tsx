import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@react-native-vector-icons/material-design-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { makeStyles } from "@/src/theme";
import { MascotPath } from "@/src/mascots";
import ForestBackground from "./ForestBackground";
import OnboardingProgress from "./OnboardingProgress";

const useStyles = makeStyles((t) => ({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: t.spacing.md,
    paddingHorizontal: t.spacing.lg,
    paddingBottom: t.spacing.base,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: t.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  content: { paddingHorizontal: t.spacing.lg },
  title: { fontFamily: t.fonts.extrabold, fontSize: 27, lineHeight: 33, color: t.colors.charcoal, letterSpacing: -0.5 },
  subtitle: { fontFamily: t.fonts.medium, fontSize: 15.5, lineHeight: 22, color: t.colors.textSecondary, marginTop: t.spacing.sm },
  body: { flex: 1 },
  footer: { paddingHorizontal: t.spacing.lg },
}));

export default function OnboardingShell({
  step,
  total = 7,
  path = "green",
  onBack,
  title,
  subtitle,
  children,
  footer,
  variant = "forest",
  scrollable = false,
  centerTitle = false,
}: {
  step: number;
  total?: number;
  path?: MascotPath;
  onBack?: () => void;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "forest" | "mountain";
  scrollable?: boolean;
  centerTitle?: boolean;
}) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();

  const Header = (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      {onBack ? (
        <Pressable
          testID="onboarding-back-button"
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => { Haptics.selectionAsync(); onBack(); }}
          style={styles.backBtn}
        >
          <Icon name="chevron-left" size={26} color="#111827" />
        </Pressable>
      ) : (
        <View style={styles.backBtn} />
      )}
      <View style={{ flex: 1 }}>
        <OnboardingProgress step={step} total={total} path={path} />
      </View>
    </View>
  );

  const TitleBlock = (
    <Animated.View entering={FadeInDown.duration(450)} style={[styles.content, centerTitle && { alignItems: "center" }]}>
      <Text style={[styles.title, centerTitle && { textAlign: "center" }]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, centerTitle && { textAlign: "center" }]}>{subtitle}</Text> : null}
    </Animated.View>
  );

  return (
    <ForestBackground variant={variant}>
      {Header}
      {scrollable ? (
        <ScrollView
          style={styles.body}
          contentContainerStyle={{ paddingBottom: 12 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {TitleBlock}
          <Animated.View entering={FadeIn.delay(120).duration(450)} style={{ flex: 1 }}>
            {children}
          </Animated.View>
        </ScrollView>
      ) : (
        <View style={styles.body}>
          {TitleBlock}
          <Animated.View entering={FadeIn.delay(120).duration(450)} style={{ flex: 1 }}>
            {children}
          </Animated.View>
        </View>
      )}
      {footer ? (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 12, paddingTop: 8 }]}>{footer}</View>
      ) : null}
    </ForestBackground>
  );
}
