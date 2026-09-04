import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { makeStyles } from "@/src/theme";

type Pointer = "left" | "right" | "down" | "none";

const useStyles = makeStyles((t) => ({
  bubble: {
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    paddingVertical: t.spacing.md,
    paddingHorizontal: t.spacing.base,
    maxWidth: 220,
    shadowColor: t.colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  text: { fontFamily: t.fonts.semibold, fontSize: 14.5, lineHeight: 20, color: t.colors.text },
  tail: {
    position: "absolute",
    width: 16,
    height: 16,
    backgroundColor: t.colors.surface,
    borderColor: t.colors.border,
    transform: [{ rotate: "45deg" }],
  },
}));

export default function MascotSpeechBubble({
  text,
  pointer = "down",
  animateKey,
  style,
  testID,
}: {
  text: string;
  pointer?: Pointer;
  animateKey?: string | number;
  style?: any;
  testID?: string;
}) {
  const styles = useStyles();
  const [shown, setShown] = React.useState("");

  React.useEffect(() => {
    // word-by-word reveal
    const words = text.split(" ");
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(words.slice(0, i).join(" "));
      if (i >= words.length) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, [text, animateKey]);

  const tailStyle =
    pointer === "left"
      ? { left: -6, top: "50%" as const, marginTop: -8, borderLeftWidth: 1, borderBottomWidth: 1 }
      : pointer === "right"
      ? { right: -6, top: "50%" as const, marginTop: -8, borderRightWidth: 1, borderTopWidth: 1 }
      : pointer === "down"
      ? { bottom: -6, left: "50%" as const, marginLeft: -8, borderRightWidth: 1, borderBottomWidth: 1 }
      : null;

  return (
    <Animated.View
      testID={testID}
      entering={FadeInDown.springify().damping(16)}
      style={[styles.bubble, style]}
    >
      <Text style={styles.text}>{shown || " "}</Text>
      {tailStyle && <View style={[styles.tail, tailStyle]} />}
    </Animated.View>
  );
}
