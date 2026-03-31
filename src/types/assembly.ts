import type { BuildConfig } from "./config";

export interface AssemblyStep {
  id: string;
  title: string;
  description: string;
}

export interface AssemblySection {
  id: string;
  title: string;
  description: string;
  guideUrl: string;
  requiredWhen: (config: BuildConfig) => boolean;
  steps: AssemblyStep[];
}
