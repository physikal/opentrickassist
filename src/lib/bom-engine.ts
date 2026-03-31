import type { BuildConfig } from "../types/config";
import type { BomCategory, VendorGroup } from "../types/bom";
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

export function groupBomByVendor(
  categories: BomCategory[],
): VendorGroup[] {
  const vendorMap = new Map<
    string,
    VendorGroup["items"]
  >();

  for (const category of categories) {
    for (const item of category.items) {
      if (item.sourcingLinks.length === 0) {
        const unsourced = vendorMap.get("Unsourced") ?? [];
        unsourced.push({ item, link: null });
        vendorMap.set("Unsourced", unsourced);
      } else {
        for (const link of item.sourcingLinks) {
          const existing = vendorMap.get(link.vendor) ?? [];
          existing.push({ item, link });
          vendorMap.set(link.vendor, existing);
        }
      }
    }
  }

  const groups: VendorGroup[] = [];
  const unsourced = vendorMap.get("Unsourced");
  vendorMap.delete("Unsourced");

  for (const [vendor, items] of vendorMap) {
    groups.push({ vendor, items });
  }
  groups.sort((a, b) => b.items.length - a.items.length);

  if (unsourced) {
    groups.push({ vendor: "Unsourced", items: unsourced });
  }

  return groups;
}
