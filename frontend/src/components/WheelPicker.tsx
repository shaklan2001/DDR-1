import React from "react";
import { View, Text, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { makeStyles, useTheme } from "@/src/theme";
import { MascotPath } from "@/src/mascots";

const ITEM_HEIGHT = 54;
const VISIBLE = 5;
const PAD = ITEM_HEIGHT * ((VISIBLE - 1) / 2);

function WheelItem({
  label,
  index,
  scrollY,
  unit,
}: {
  label: string;
  index: number;
  scrollY: Animated.SharedValue<number>;
  unit?: string;
}) {
  const t = useTheme();
  const styles = useStyles();
  const animStyle = useAnimatedStyle(() => {
    const pos = index * ITEM_HEIGHT;
    const dist = Math.abs(scrollY.value - pos);
    const opacity = interpolate(dist, [0, ITEM_HEIGHT, ITEM_HEIGHT * 2], [1, 0.42, 0.16], Extrapolation.CLAMP);
    const scale = interpolate(dist, [0, ITEM_HEIGHT, ITEM_HEIGHT * 2], [1, 0.82, 0.7], Extrapolation.CLAMP);
    return { opacity, transform: [{ scale }] };
  });
  const textAnim = useAnimatedStyle(() => {
    const pos = index * ITEM_HEIGHT;
    const dist = Math.abs(scrollY.value - pos);
    const isCenter = dist < ITEM_HEIGHT / 2;
    return { color: isCenter ? t.colors.charcoal : t.colors.textTertiary } as any;
  });
  return (
    <Animated.View style={[styles.item, animStyle]}>
      <Animated.Text style={[styles.itemText, textAnim]}>{label}</Animated.Text>
      {unit ? <Text style={styles.unit}>{unit}</Text> : null}
    </Animated.View>
  );
}

const useStyles = makeStyles((t) => ({
  wrap: { height: ITEM_HEIGHT * VISIBLE, alignSelf: "stretch" },
  highlight: {
    position: "absolute",
    left: 24,
    right: 24,
    top: PAD,
    height: ITEM_HEIGHT,
    borderRadius: t.radius.md,
    borderWidth: 1.5,
  },
  item: { height: ITEM_HEIGHT, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  itemText: { fontFamily: t.fonts.extrabold, fontSize: 30, letterSpacing: -0.5 },
  unit: { fontFamily: t.fonts.semibold, fontSize: 17, color: t.colors.textSecondary },
}));

export default function WheelPicker({
  min,
  max,
  value,
  onChange,
  unit,
  path = "green",
  testID,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  path?: MascotPath;
  testID?: string;
}) {
  const styles = useStyles();
  const t = useTheme();
  const scrollY = useSharedValue((value - min) * ITEM_HEIGHT);
  const ref = React.useRef<Animated.ScrollView>(null);
  const data = React.useMemo(() => Array.from({ length: max - min + 1 }, (_, i) => min + i), [min, max]);
  const lastIndex = React.useRef(value - min);

  React.useEffect(() => {
    const idx = value - min;
    ref.current?.scrollTo({ y: idx * ITEM_HEIGHT, animated: false });
    scrollY.value = idx * ITEM_HEIGHT;
    lastIndex.current = idx;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(data.length - 1, idx));
    if (clamped !== lastIndex.current) {
      lastIndex.current = clamped;
      Haptics.selectionAsync();
    }
    onChange(data[clamped]);
  };

  const highlightColor = path === "pink" ? t.colors.pink : t.colors.green;
  const highlightBg = path === "pink" ? t.colors.pinkTint : t.colors.greenTint;

  return (
    <View style={styles.wrap} testID={testID}>
      <View pointerEvents="none" style={[styles.highlight, { borderColor: highlightColor, backgroundColor: highlightBg }]} />
      <Animated.ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={handler}
        onMomentumScrollEnd={onMomentumEnd}
        contentContainerStyle={{ paddingVertical: PAD }}
      >
        {data.map((n, i) => (
          <WheelItem key={n} label={String(n)} index={i} scrollY={scrollY} unit={unit} />
        ))}
      </Animated.ScrollView>
    </View>
  );
}
