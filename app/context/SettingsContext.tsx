import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { CardSettings } from "../lib/types";
import { DEFAULT_SETTINGS } from "../lib/types";
import { loadInitialSettings, persistCurrentAsDefault } from "../lib/profiles";

interface SettingsContextValue {
  settings: CardSettings;
  updateSetting: <K extends keyof CardSettings>(
    key: K,
    value: CardSettings[K],
  ) => void;
  applySettings: (partial: Partial<CardSettings>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<CardSettings>(loadInitialSettings);

  const updateSetting = useCallback(
    <K extends keyof CardSettings>(key: K, value: CardSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const applySettings = useCallback((partial: Partial<CardSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings({ ...DEFAULT_SETTINGS });
  }, []);

  useEffect(() => {
    persistCurrentAsDefault(settings);
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{ settings, updateSetting, applySettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
