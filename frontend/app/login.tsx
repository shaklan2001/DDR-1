import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Animated, { FadeInDown } from "react-native-reanimated";
import { makeStyles, useTheme } from "@/src/theme";
import ForestBackground from "@/src/components/ForestBackground";
import MascotHero from "@/src/components/MascotHero";
import AuthField from "@/src/components/AuthField";
import PrimaryButton from "@/src/components/PrimaryButton";
import SocialAuthButton from "@/src/components/SocialAuthButton";

const useStyles = makeStyles((t) => ({
  scroll: { flexGrow: 1, justifyContent: "center", paddingHorizontal: t.spacing.lg },
  mascotRow: { alignItems: "center", zIndex: 2 },
  card: {
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.xl,
    padding: t.spacing.lg,
    marginTop: -34,
    shadowColor: t.colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  heading: { fontFamily: t.fonts.extrabold, fontSize: 26, color: t.colors.charcoal, textAlign: "center", letterSpacing: -0.5 },
  sub: { fontFamily: t.fonts.medium, fontSize: 14.5, color: t.colors.textSecondary, textAlign: "center", marginTop: 6, marginBottom: t.spacing.lg },
  fields: { gap: t.spacing.md, marginBottom: t.spacing.base },
  sep: { flexDirection: "row", alignItems: "center", gap: t.spacing.md, marginVertical: t.spacing.base },
  sepLine: { flex: 1, height: 1, backgroundColor: t.colors.border },
  sepText: { fontFamily: t.fonts.semibold, fontSize: 11.5, color: t.colors.textTertiary, letterSpacing: 0.5 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: t.spacing.base, gap: 5 },
  footerText: { fontFamily: t.fonts.medium, fontSize: 14, color: t.colors.textSecondary },
  footerLink: { fontFamily: t.fonts.bold, fontSize: 14, color: t.colors.green },
}));

export default function Login() {
  const styles = useStyles();
  const t = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const proceed = () => router.push("/onboarding/choose-wolf");

  return (
    <ForestBackground variant="forest">
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24 }]}
        bottomOffset={24}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mascotRow}>
          <MascotHero path="green" stage="cub" pose="happy" height={190} float shadow={false} />
        </View>

        <Animated.View entering={FadeInDown.duration(500)} style={styles.card}>
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.sub}>Your wolf kept your spot.</Text>

          <View style={styles.fields}>
            <AuthField
              label="Email"
              icon="email-outline"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              testID="login-email-input"
            />
            <AuthField
              label="Password"
              icon="lock-outline"
              placeholder="Enter your password"
              isPassword
              value={password}
              onChangeText={setPassword}
              testID="login-password-input"
            />
          </View>

          <PrimaryButton label="Sign in" showIcon={false} onPress={proceed} testID="login-submit-button" />

          <View style={styles.sep}>
            <View style={styles.sepLine} />
            <Text style={styles.sepText}>OR CONTINUE WITH</Text>
            <View style={styles.sepLine} />
          </View>

          <SocialAuthButton onPress={proceed} testID="login-google-button" />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account?</Text>
            <Pressable onPress={() => router.push("/signup")} testID="go-to-signup-link">
              <Text style={styles.footerLink}>Sign up</Text>
            </Pressable>
          </View>
        </Animated.View>
      </KeyboardAwareScrollView>
    </ForestBackground>
  );
}
