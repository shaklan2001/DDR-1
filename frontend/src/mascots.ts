import { ImageSourcePropType } from "react-native";

export type MascotPath = "green" | "pink";
export type MascotStage = "cub" | "pup" | "wild" | "alpha";
export type MascotPose = "default" | "happy";

// Static require() registry — Metro needs literal paths.
const MALE = {
  cub: {
    default: require("@/assets/mascots/male/cub/default.png"),
    happy: require("@/assets/mascots/male/cub/happy.png"),
  },
  pup: { default: require("@/assets/mascots/male/pup/default.png") },
  wild: { default: require("@/assets/mascots/male/wild/default.png") },
  alpha: { default: require("@/assets/mascots/male/alpha/default.png") },
} as const;

const FEMALE = {
  cub: {
    default: require("@/assets/mascots/female/cub/default.png"),
    happy: require("@/assets/mascots/female/cub/happy.png"),
  },
  pup: { default: require("@/assets/mascots/female/pup/default.png") },
  wild: { default: require("@/assets/mascots/female/wild/default.png") },
  alpha: { default: require("@/assets/mascots/female/alpha/default.png") },
} as const;

export function mascotSource(
  path: MascotPath,
  stage: MascotStage,
  pose: MascotPose = "default",
): ImageSourcePropType {
  const set = path === "pink" ? FEMALE : MALE;
  const stageSet = set[stage] as Record<string, ImageSourcePropType>;
  return stageSet[pose] ?? stageSet.default;
}

export const environments = {
  splash: require("@/assets/environments/splash-dark.png"),
  forest: require("@/assets/environments/forest-light.png"),
  mountain: require("@/assets/environments/mountain-light.png"),
} as const;

export const brand = {
  leaf: require("@/assets/brand/ddr-leaf.png"),
} as const;

export type StageInfo = {
  stage: MascotStage;
  title: string;
  xp: number;
  xpLabel: string;
  tagline: string;
};

// Ordered bottom -> top for the evolution journey (Cub first).
export const STAGES: StageInfo[] = [
  { stage: "cub", title: "Wolf Cub", xp: 0, xpLabel: "0 XP", tagline: "Every Alpha starts here." },
  { stage: "pup", title: "Wolf Pup", xp: 500, xpLabel: "500 XP", tagline: "Show up daily." },
  { stage: "wild", title: "Wild Wolf", xp: 2000, xpLabel: "2,000 XP", tagline: "Hit your targets." },
  { stage: "alpha", title: "Alpha Wolf", xp: 5000, xpLabel: "5,000 XP", tagline: "Stay consistent." },
];
