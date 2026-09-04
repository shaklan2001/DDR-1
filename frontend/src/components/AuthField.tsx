import React from "react";
import { View, Text, TextInput, Pressable, TextInputProps } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons";
import { makeStyles, useTheme } from "@/src/theme";

const useStyles = makeStyles((t) => ({
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: t.spacing.md,
    backgroundColor: t.colors.surface,
    borderWidth: 1.5,
    borderColor: t.colors.border,
    borderRadius: t.radius.md,
    paddingHorizontal: t.spacing.base,
    height: 62,
  },
  fieldFocused: { borderColor: t.colors.green },
  iconWrap: {
    width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center",
    backgroundColor: t.colors.surfaceAlt,
  },
  col: { flex: 1 },
  label: { fontFamily: t.fonts.semibold, fontSize: 11.5, color: t.colors.textSecondary, letterSpacing: 0.3, textTransform: "uppercase" },
  input: { fontFamily: t.fonts.medium, fontSize: 16, color: t.colors.charcoal, padding: 0, marginTop: 1 },
}));

export default function AuthField({
  label,
  icon,
  isPassword = false,
  accent = "green",
  testID,
  ...props
}: {
  label: string;
  icon: string;
  isPassword?: boolean;
  accent?: "green" | "pink";
  testID?: string;
} & TextInputProps) {
  const styles = useStyles();
  const t = useTheme();
  const [focused, setFocused] = React.useState(false);
  const [hidden, setHidden] = React.useState(isPassword);
  const accentColor = accent === "pink" ? t.colors.pink : t.colors.green;

  return (
    <View style={[styles.field, focused && { borderColor: accentColor }]}>
      <View style={[styles.iconWrap, focused && { backgroundColor: accent === "pink" ? t.colors.pinkTint : t.colors.greenTint }]}>
        <Icon name={icon as any} size={19} color={focused ? accentColor : t.colors.textSecondary} />
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          testID={testID}
          style={styles.input}
          placeholderTextColor={t.colors.textTertiary}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </View>
      {isPassword && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hidden ? "Show password" : "Hide password"}
          onPress={() => setHidden((h) => !h)}
          hitSlop={10}
        >
          <Icon name={hidden ? "eye-outline" : "eye-off-outline"} size={20} color={t.colors.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}
