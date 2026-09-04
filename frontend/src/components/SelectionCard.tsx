import React from "react";
import { View, Text, Pressable } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons";
import * as Haptics from "expo-haptics";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { makeStyles, useTheme } from "@/src/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
type Accent = "green" | "pink" | "neutral";
type Layout = "row" | "tile";

const useStyles = makeStyles((t) => ({
  base: {
    backgroundColor: t.colors.surface,
    borderWidth: 2,
    borderColor: t.colors.border,
    borderRadius: t.radius.lg,
    shadowColor: t.colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  row: { flexDirection: "row", alignItems: "center", padding: t.spacing.base, gap: t.spacing.base },
  tile: { alignItems: "center", justifyContent: "center", paddingVertical: t.spacing.lg, paddingHorizontal: t.spacing.sm, gap: t.spacing.sm },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: t.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: t.colors.surfaceAlt,
  },
  iconWrapTile: {
    width: 52,
    height: 52,
    borderRadius: t.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: t.colors.surfaceAlt,
  },
  textCol: { flex: 1, gap: 3 },
  title: { fontFamily: t.fonts.bold, fontSize: 17, color: t.colors.charcoal },
  titleTile: { fontFamily: t.fonts.bold, fontSize: 15.5, color: t.colors.charcoal, textAlign: "center" },
  subtitle: { fontFamily: t.fonts.medium, fontSize: 13.5, color: t.colors.textSecondary, lineHeight: 18 },
  check: {
    width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center",
  },
  checkTile: { position: "absolute", top: 8, right: 8, width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center" },
}));

export default function SelectionCard({
  title,
  subtitle,
  icon,
  selected,
  onPress,
  accent = "green",
  layout = "row",
  style,
  testID,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
  selected: boolean;
  onPress: () => void;
  accent?: Accent;
  layout?: Layout;
  style?: any;
  testID?: string;
}) {
  const styles = useStyles();
  const t = useTheme();
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const accentColor = accent === "pink" ? t.colors.pink : accent === "neutral" ? t.colors.charcoal : t.colors.green;
  const tintBg = accent === "pink" ? t.colors.pinkTint : accent === "neutral" ? t.colors.surfaceAlt : t.colors.greenTint;
  const iconTint = selected ? accentColor : t.colors.textSecondary;

  const selectedStyle = selected
    ? { borderColor: accentColor, backgroundColor: tintBg }
    : null;

  return (
    <AnimatedPressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={title}
      onPressIn={() => { scale.value = withSpring(0.98, { damping: 15 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 15 }); }}
      onPress={() => { Haptics.selectionAsync(); onPress(); }}
      style={[styles.base, styles[layout], selectedStyle, animStyle, style]}
    >
      {icon && (
        <View style={[layout === "tile" ? styles.iconWrapTile : styles.iconWrap, selected && { backgroundColor: accent === "neutral" ? t.colors.border : "rgba(255,255,255,0.8)" }]}>
          <Icon name={icon as any} size={layout === "tile" ? 28 : 26} color={iconTint} />
        </View>
      )}

      {layout === "row" ? (
        <View style={styles.textCol}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      ) : (
        <Text style={styles.titleTile}>{title}</Text>
      )}

      {layout === "row" && (
        <View style={[styles.check, { backgroundColor: selected ? accentColor : t.colors.surfaceAlt }]}>
          {selected && <Icon name="check" size={16} color="#FFFFFF" />}
        </View>
      )}
      {layout === "tile" && selected && (
        <View style={[styles.checkTile, { backgroundColor: accentColor }]}>
          <Icon name="check" size={13} color="#FFFFFF" />
        </View>
      )}
    </AnimatedPressable>
  );
}
