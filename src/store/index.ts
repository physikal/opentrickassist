import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  BuildConfig,
  CommunityModId,
  ScaleType,
  ControllerVersion,
  FlowRate,
  HopperHeight,
  BeltType,
} from "../types/config";
import { INITIAL_CONFIG } from "../types/config";
import { validatePersistedState } from "./validation";

export interface TrackingEntry {
  purchased: boolean;
  printed: boolean;
  completed: boolean;
  date: string;
}

export interface AppState {
  schemaVersion: number;
  config: BuildConfig;
  wizardStep: number;
  wizardComplete: boolean;
  bomTracking: Record<string, TrackingEntry>;
  stlTracking: Record<string, TrackingEntry>;
  assemblyTracking: Record<string, TrackingEntry>;
  stepTracking: Record<string, TrackingEntry>;

  setScaleType: (value: ScaleType) => void;
  setControllerVersion: (value: ControllerVersion) => void;
  setFlowRate: (value: FlowRate) => void;
  setServoGate: (value: boolean) => void;
  setVolumeReducer: (value: boolean) => void;
  setHopperHeight: (value: HopperHeight) => void;
  setBeltType: (value: BeltType) => void;
  setNeopixelLeds: (value: boolean) => void;
  toggleCommunityMod: (modId: CommunityModId) => void;
  setWizardStep: (step: number) => void;
  completeWizard: () => void;
  goToWizardStep: (step: number) => void;

  toggleBomPurchased: (itemId: string) => void;
  toggleStlPrinted: (fileId: string) => void;
  toggleAssemblyCompleted: (sectionId: string) => void;
  toggleStepCompleted: (stepId: string) => void;

  resetAll: () => void;
  importState: (data: unknown) => boolean;
  exportState: () => string;
}

const CURRENT_SCHEMA_VERSION = 1;

const DEFAULT_TRACKING: TrackingEntry = {
  purchased: false,
  printed: false,
  completed: false,
  date: "",
};

function getTracking(
  record: Record<string, TrackingEntry>,
  id: string,
): TrackingEntry {
  return record[id] ?? DEFAULT_TRACKING;
}

const INITIAL_STATE = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  config: INITIAL_CONFIG,
  wizardStep: 0,
  wizardComplete: false,
  bomTracking: {} as Record<string, TrackingEntry>,
  stlTracking: {} as Record<string, TrackingEntry>,
  assemblyTracking: {} as Record<string, TrackingEntry>,
  stepTracking: {} as Record<string, TrackingEntry>,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setScaleType: (value) =>
        set((s) => ({ config: { ...s.config, scaleType: value } })),
      setControllerVersion: (value) =>
        set((s) => ({
          config: { ...s.config, controllerVersion: value },
        })),
      setFlowRate: (value) =>
        set((s) => ({ config: { ...s.config, flowRate: value } })),
      setServoGate: (value) =>
        set((s) => ({ config: { ...s.config, servoGate: value } })),
      setVolumeReducer: (value) =>
        set((s) => ({
          config: { ...s.config, volumeReducer: value },
        })),
      setHopperHeight: (value) =>
        set((s) => ({
          config: { ...s.config, hopperHeight: value },
        })),
      setBeltType: (value) =>
        set((s) => ({ config: { ...s.config, beltType: value } })),
      setNeopixelLeds: (value) =>
        set((s) => ({
          config: { ...s.config, neopixelLeds: value },
        })),

      toggleCommunityMod: (modId) =>
        set((s) => {
          const mods = s.config.communityMods.includes(modId)
            ? s.config.communityMods.filter((m) => m !== modId)
            : [...s.config.communityMods, modId];
          return { config: { ...s.config, communityMods: mods } };
        }),

      setWizardStep: (step) => set({ wizardStep: step }),
      completeWizard: () =>
        set({ wizardComplete: true, wizardStep: 9 }),
      goToWizardStep: (step) =>
        set({ wizardStep: step, wizardComplete: false }),

      toggleBomPurchased: (itemId) =>
        set((s) => {
          const current = getTracking(s.bomTracking, itemId);
          const purchased = !current.purchased;
          return {
            bomTracking: {
              ...s.bomTracking,
              [itemId]: {
                ...current,
                purchased,
                date: purchased
                  ? new Date().toISOString()
                  : current.date,
              },
            },
          };
        }),

      toggleStlPrinted: (fileId) =>
        set((s) => {
          const current = getTracking(s.stlTracking, fileId);
          const printed = !current.printed;
          return {
            stlTracking: {
              ...s.stlTracking,
              [fileId]: {
                ...current,
                printed,
                date: printed
                  ? new Date().toISOString()
                  : current.date,
              },
            },
          };
        }),

      toggleAssemblyCompleted: (sectionId) =>
        set((s) => {
          const current = getTracking(
            s.assemblyTracking,
            sectionId,
          );
          const completed = !current.completed;
          return {
            assemblyTracking: {
              ...s.assemblyTracking,
              [sectionId]: {
                ...current,
                completed,
                date: completed
                  ? new Date().toISOString()
                  : current.date,
              },
            },
          };
        }),

      toggleStepCompleted: (stepId) =>
        set((s) => {
          const current = getTracking(s.stepTracking, stepId);
          const completed = !current.completed;
          return {
            stepTracking: {
              ...s.stepTracking,
              [stepId]: {
                ...current,
                completed,
                date: completed
                  ? new Date().toISOString()
                  : current.date,
              },
            },
          };
        }),

      resetAll: () => set(INITIAL_STATE),

      importState: (data) => {
        const validated = validatePersistedState(data);
        if (validated) {
          set({
            schemaVersion: validated.schemaVersion,
            config: validated.config as BuildConfig,
            wizardStep: validated.wizardStep,
            wizardComplete: validated.wizardComplete,
            bomTracking:
              validated.bomTracking as Record<string, TrackingEntry>,
            stlTracking:
              validated.stlTracking as Record<string, TrackingEntry>,
            assemblyTracking:
              validated.assemblyTracking as Record<
                string,
                TrackingEntry
              >,
            stepTracking:
              validated.stepTracking as Record<string, TrackingEntry>,
          });
          return true;
        }
        return false;
      },

      exportState: () => {
        const s = get();
        return JSON.stringify(
          {
            schemaVersion: s.schemaVersion,
            config: s.config,
            wizardStep: s.wizardStep,
            wizardComplete: s.wizardComplete,
            bomTracking: s.bomTracking,
            stlTracking: s.stlTracking,
            assemblyTracking: s.assemblyTracking,
            stepTracking: s.stepTracking,
          },
          null,
          2,
        );
      },
    }),
    {
      name: "opentrickler-build",
      version: CURRENT_SCHEMA_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        schemaVersion: state.schemaVersion,
        config: state.config,
        wizardStep: state.wizardStep,
        wizardComplete: state.wizardComplete,
        bomTracking: state.bomTracking,
        stlTracking: state.stlTracking,
        assemblyTracking: state.assemblyTracking,
        stepTracking: state.stepTracking,
      }),
    },
  ),
);
