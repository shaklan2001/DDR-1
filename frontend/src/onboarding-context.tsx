import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { storage } from "@/src/utils/storage";
import { MascotPath } from "@/src/mascots";

export type Goal = "lose_weight" | "balanced" | "build_muscle";
export type Gender = "male" | "female" | "other";

export type OnboardingState = {
  mascotPath: MascotPath | null;
  goal: Goal | null;
  age: number;
  gender: Gender | null;
  heightCm: number;
  weightKg: number;
};

const DEFAULTS: OnboardingState = {
  mascotPath: null,
  goal: null,
  age: 25,
  gender: null,
  heightCm: 170,
  weightKg: 70,
};

const STORAGE_KEY = "ddr.onboarding.v1";

type Ctx = OnboardingState & {
  ready: boolean;
  set: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void;
  reset: () => void;
};

const OnboardingContext = createContext<Ctx | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OnboardingState>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await storage.getItem<Partial<OnboardingState> | null>(STORAGE_KEY, null);
      if (saved && typeof saved === "object") {
        setState((prev) => ({ ...prev, ...saved }));
      }
      setReady(true);
    })();
  }, []);

  const set = useCallback(<K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => {
    setState((prev) => {
      const next = { ...prev, [key]: value };
      storage.setItem(STORAGE_KEY, next as any);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULTS);
    storage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<Ctx>(() => ({ ...state, ready, set, reset }), [state, ready, set, reset]);

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): Ctx {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}

/** Mascot path resolves to green by default before any choice (for splash/pre-choice screens). */
export function usePath(): MascotPath {
  const { mascotPath } = useOnboarding();
  return mascotPath ?? "green";
}
