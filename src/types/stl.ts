import type { BuildConfig } from "./config";

export type PrintMaterial = "abs_asa_petg" | "tpu_95a";

export interface StlFile {
  id: string;
  filename: string;
  printQuantity: number;
  material: PrintMaterial;
  specialInstructions?: string;
  requiredWhen: (config: BuildConfig) => boolean;
}

export interface StlGroup {
  id: string;
  name: string;
  description?: string;
  requiredWhen: (config: BuildConfig) => boolean;
  files: StlFile[];
}
