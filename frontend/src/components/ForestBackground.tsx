import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { makeStyles } from "@/src/theme";
import { environments } from "@/src/mascots";
import LeafDecoration from "./LeafDecoration";

type Variant = "splash" | "forest" | "mountain" | "plain";

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  fill: { ...StyleSheetAbsolute },
}));

const StyleSheetAbsolute = { position: "absolute" as const, top: 0, left: 0, right: 0, bottom: 0 };

export default function ForestBackground({
  variant = "forest",
  children,
  leaves = true,
}: {
  variant?: Variant;
  children?: React.ReactNode;
  leaves?: boolean;
}) {
  const styles = useStyles();

  const image =
    variant === "splash" ? environments.splash : variant === "mountain" ? environments.mountain : variant === "forest" ? environments.forest : null;

  return (
    <View style={styles.root}>
      {image && (
        <Image source={image} style={StyleSheetAbsolute} contentFit="cover" transition={250} />
      )}

      {variant === "splash" && (
        <LinearGradient
          colors={["rgba(11,17,32,0.35)", "rgba(11,17,32,0.55)", "rgba(11,17,32,0.92)"]}
          locations={[0, 0.55, 1]}
          style={StyleSheetAbsolute}
        />
      )}

      {(variant === "forest" || variant === "mountain") && (
        <LinearGradient
          colors={["rgba(249,250,251,0.55)", "rgba(249,250,251,0.15)", "rgba(249,250,251,0.5)"]}
          locations={[0, 0.42, 1]}
          style={StyleSheetAbsolute}
        />
      )}

      {leaves && variant !== "plain" && (
        <>
          <LeafDecoration size={34} top="8%" left="6%" rotate={-18} opacity={variant === "splash" ? 0.5 : 0.75} sway delay={200} />
          <LeafDecoration size={22} top="14%" right="10%" rotate={30} opacity={variant === "splash" ? 0.4 : 0.65} sway delay={800} />
          <LeafDecoration size={28} top="30%" right="5%" rotate={-8} opacity={variant === "splash" ? 0.35 : 0.55} sway delay={1400} />
        </>
      )}

      {children}
    </View>
  );
}
