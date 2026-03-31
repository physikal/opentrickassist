import { z } from "zod/v4";

const BuildConfigSchema = z.object({
  scaleType: z
    .enum(["ad_fx120i_300i", "gg_jj100b", "gg_jj223bf"])
    .nullable(),
  controllerVersion: z.enum(["v1", "v2"]).nullable(),
  flowRate: z.enum(["low", "mid", "high"]).nullable(),
  servoGate: z.boolean().nullable(),
  volumeReducer: z.boolean().nullable(),
  hopperHeight: z.enum(["100mm", "150mm", "200mm"]).nullable(),
  beltType: z.enum(["tpu_printed", "aftermarket_gt2"]).nullable(),
  communityMods: z.array(z.string()),
  neopixelLeds: z.boolean().nullable(),
});

const TrackingEntrySchema = z.object({
  purchased: z.boolean().default(false),
  printed: z.boolean().default(false),
  completed: z.boolean().default(false),
  date: z.string().default(""),
});

export const AppStateSchema = z.object({
  schemaVersion: z.number(),
  config: BuildConfigSchema,
  wizardStep: z.number(),
  wizardComplete: z.boolean(),
  bomTracking: z.record(z.string(), TrackingEntrySchema),
  stlTracking: z.record(z.string(), TrackingEntrySchema),
  assemblyTracking: z.record(z.string(), TrackingEntrySchema),
  stepTracking: z.record(z.string(), TrackingEntrySchema),
});

export type PersistedState = z.infer<typeof AppStateSchema>;

export function validatePersistedState(
  data: unknown,
): PersistedState | null {
  const result = AppStateSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  console.warn("Failed to validate persisted state:", result.error);
  return null;
}
