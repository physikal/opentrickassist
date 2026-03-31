import type { BuildConfig } from "../types/config";
import type { AssemblySection } from "../types/assembly";
import { ASSEMBLY_SECTIONS } from "../data/assembly-steps";

export function computeAssembly(
  config: BuildConfig,
): AssemblySection[] {
  return ASSEMBLY_SECTIONS.filter((section) =>
    section.requiredWhen(config),
  );
}

export function countAssemblySteps(config: BuildConfig): number {
  return computeAssembly(config).reduce(
    (sum, section) => sum + section.steps.length,
    0,
  );
}
