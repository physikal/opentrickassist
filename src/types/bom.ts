import type { BuildConfig } from "./config";

export interface SourcingLink {
  vendor: string;
  url: string;
  verified: boolean;
  notes?: string;
}

export interface BomItem {
  id: string;
  name: string;
  specification: string;
  quantity: number;
  unit: string;
  sourcingLinks: SourcingLink[];
  notes?: string;
  requiredWhen: (config: BuildConfig) => boolean;
}

export interface BomCategory {
  id: string;
  name: string;
  items: BomItem[];
}

export interface VendorGroup {
  vendor: string;
  items: { item: BomItem; link: SourcingLink | null }[];
}
