import type { BuildConfig } from "../types/config";
import type { StlGroup } from "../types/stl";
import { STL_GROUPS } from "../data/stl-files";

export function computeStl(config: BuildConfig): StlGroup[] {
  return STL_GROUPS.map((group) => ({
    ...group,
    files: group.files.filter((file) => file.requiredWhen(config)),
  })).filter(
    (group) =>
      group.requiredWhen(config) && group.files.length > 0,
  );
}

export function countStlFiles(config: BuildConfig): number {
  return computeStl(config).reduce(
    (sum, group) =>
      sum +
      group.files.reduce((s, f) => s + f.printQuantity, 0),
    0,
  );
}
