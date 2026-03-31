import type { BuildConfig } from "../types/config";
import type { BomCategory } from "../types/bom";
import { BOM_CATEGORIES } from "../data/bom-items";

export function computeBom(config: BuildConfig): BomCategory[] {
  return BOM_CATEGORIES.map((category) => ({
    ...category,
    items: category.items.filter((item) => item.requiredWhen(config)),
  })).filter((category) => category.items.length > 0);
}

export function countBomItems(config: BuildConfig): number {
  return computeBom(config).reduce(
    (sum, cat) => sum + cat.items.length,
    0,
  );
}
