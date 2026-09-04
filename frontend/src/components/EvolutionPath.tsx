import React from "react";
import { View } from "react-native";
import { makeStyles, useTheme } from "@/src/theme";
import { MascotPath, STAGES } from "@/src/mascots";
import MascotStageCard from "./MascotStageCard";

const useStyles = makeStyles((t) => ({
  wrap: { paddingLeft: t.spacing.lg, paddingRight: t.spacing.lg, position: "relative" },
  line: {
    position: "absolute",
    left: t.spacing.lg + 58,
    top: 30,
    bottom: 40,
    width: 3,
    borderRadius: 2,
    backgroundColor: t.colors.border,
  },
  rowWrap: { marginBottom: t.spacing.lg },
}));

export default function EvolutionPath({ path }: { path: MascotPath }) {
  const styles = useStyles();
  const t = useTheme();
  // top = alpha, bottom = cub (current)
  const ordered = [...STAGES].reverse();

  return (
    <View style={styles.wrap}>
      <View style={[styles.line, { backgroundColor: path === "pink" ? t.colors.pinkTintStrong : t.colors.greenTintStrong }]} />
      {ordered.map((info, i) => (
        <View key={info.stage} style={styles.rowWrap}>
          <MascotStageCard
            path={path}
            info={info}
            index={ordered.length - 1 - i}
            current={info.stage === "cub"}
          />
        </View>
      ))}
    </View>
  );
}
