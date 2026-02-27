import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type { CardSettings } from "../lib/types";
import { DEFAULT_SETTINGS } from "../lib/types";
import { loadInitialSettings, persistCurrentAsDefault } from "../lib/profiles";

const MAX_HISTORY = 50;

interface SettingsContextValue {
  settings: CardSettings;
  updateSetting: <K extends keyof CardSettings>(
    key: K,
    value: CardSettings[K],
  ) => void;
  updateSettingLive: <K extends keyof CardSettings>(
    key: K,
    value: CardSettings[K],
  ) => void;
  commitLiveSettings: () => void;
  applySettings: (partial: Partial<CardSettings>) => void;
  resetSettings: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<CardSettings>(loadInitialSettings);
  const [past, setPast] = useState<CardSettings[]>([]);
  const [future, setFuture] = useState<CardSettings[]>([]);

  // Ref to track whether a change comes from undo/redo so we skip
  // pushing onto the history stacks in those cases.
  const isUndoRedoRef = useRef(false);
  const liveSnapshotRef = useRef<CardSettings | null>(null);
  const liveChangedRef = useRef(false);

  /** Push the current settings onto the past stack and clear the future. */
  const pushHistory = useCallback((prev: CardSettings) => {
    setPast((p) => {
      const next = [...p, prev];
      if (next.length > MAX_HISTORY) next.shift();
      return next;
    });
    setFuture([]);
  }, []);

  const updateSetting = useCallback(
    <K extends keyof CardSettings>(key: K, value: CardSettings[K]) => {
      liveSnapshotRef.current = null;
      liveChangedRef.current = false;
      setSettings((prev) => {
        pushHistory(prev);
        return { ...prev, [key]: value };
      });
    },
    [pushHistory],
  );

  const updateSettingLive = useCallback(
    <K extends keyof CardSettings>(key: K, value: CardSettings[K]) => {
      setSettings((prev) => {
        if (Object.is(prev[key], value)) {
          return prev;
        }
        if (!liveSnapshotRef.current) {
          liveSnapshotRef.current = prev;
          setFuture([]);
        }
        liveChangedRef.current = true;
        return { ...prev, [key]: value };
      });
    },
    [],
  );

  const commitLiveSettings = useCallback(() => {
    const snapshot = liveSnapshotRef.current;
    const didChange = liveChangedRef.current;
    liveSnapshotRef.current = null;
    liveChangedRef.current = false;
    if (!snapshot || !didChange) return;

    setPast((p) => {
      const next = [...p, snapshot];
      if (next.length > MAX_HISTORY) next.shift();
      return next;
    });
  }, []);

  const applySettings = useCallback(
    (partial: Partial<CardSettings>) => {
      liveSnapshotRef.current = null;
      liveChangedRef.current = false;
      setSettings((prev) => {
        pushHistory(prev);
        return { ...prev, ...partial };
      });
    },
    [pushHistory],
  );

  const resetSettings = useCallback(() => {
    liveSnapshotRef.current = null;
    liveChangedRef.current = false;
    setSettings((prev) => {
      pushHistory(prev);
      return { ...DEFAULT_SETTINGS };
    });
  }, [pushHistory]);

  const undo = useCallback(() => {
    liveSnapshotRef.current = null;
    liveChangedRef.current = false;
    setPast((prevPast) => {
      if (prevPast.length === 0) return prevPast;
      const newPast = [...prevPast];
      const previous = newPast.pop()!;
      isUndoRedoRef.current = true;
      setSettings((current) => {
        setFuture((f) => {
          const next = [...f, current];
          if (next.length > MAX_HISTORY) next.shift();
          return next;
        });
        return previous;
      });
      return newPast;
    });
  }, []);

  const redo = useCallback(() => {
    liveSnapshotRef.current = null;
    liveChangedRef.current = false;
    setFuture((prevFuture) => {
      if (prevFuture.length === 0) return prevFuture;
      const newFuture = [...prevFuture];
      const next = newFuture.pop()!;
      isUndoRedoRef.current = true;
      setSettings((current) => {
        setPast((p) => {
          const newPast = [...p, current];
          if (newPast.length > MAX_HISTORY) newPast.shift();
          return newPast;
        });
        return next;
      });
      return newFuture;
    });
  }, []);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  // Persist settings with a short debounce to reduce localStorage churn.
  useEffect(() => {
    const timer = setTimeout(() => {
      persistCurrentAsDefault(settings);
    }, 200);
    return () => clearTimeout(timer);
  }, [settings]);

  // Global keyboard shortcuts: Cmd+Z for undo, Cmd+Shift+Z for redo.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "z") return;

      // Don't intercept when the user is typing in an input/textarea.
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      e.preventDefault();

      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        updateSettingLive,
        commitLiveSettings,
        applySettings,
        resetSettings,
        undo,
        redo,
        canUndo,
        canRedo,
      }}
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
