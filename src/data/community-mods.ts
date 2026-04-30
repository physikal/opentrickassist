import type {
  BuildConfig,
  CommunityModId,
} from "../types/config";

export type ModImpact = "additive" | "replaces" | "preview";

export type ModCategory =
  | "scale_variant"
  | "powder_handling"
  | "build_options"
  | "accessories";

export const CATEGORY_META: Record<
  ModCategory,
  { label: string; hint: string }
> = {
  scale_variant: {
    label: "A&D FX Shield Variants",
    hint: "Pick one full-build alternative for the A&D FX shield. Selecting a new one replaces any other in this group.",
  },
  powder_handling: {
    label: "Powder Handling",
    hint: "Mods that change how powder flows, weighs, or discharges. Helpful for specific powder types or anti-jam needs.",
  },
  build_options: {
    label: "Build & Print Options",
    hint: "Mechanical, electrical, and printability tweaks to the base build.",
  },
  accessories: {
    label: "Accessories & Hopper Alternatives",
    hint: "Quality-of-life add-ons and alternative hoppers.",
  },
};

export interface ModDefinition {
  id: CommunityModId;
  name: string;
  author: string;
  description: string;
  docUrl?: string;
  impact: ModImpact;
  category: ModCategory;
  exclusiveGroup?: string;
  requiresWhen?: (config: BuildConfig) => boolean;
  previewNote?: string;
}

const UPSTREAM_BASE =
  "https://github.com/eamars/OpenTrickler/tree/main/CommunityContributions";

function isAdFx(config: BuildConfig): boolean {
  return (
    config.scaleType === "ad_fx120i_300i" ||
    config.scaleType === "gg_jj223bf"
  );
}

export const COMMUNITY_MODS: ModDefinition[] = [
  {
    id: "memphis_v1_ad_shield",
    name: "Memphis V1 - A&D FX Shield",
    author: "Memphis",
    description:
      "Redesigned A&D FX scale shield with integrated display mount, " +
      "PCB enclosure, scale base, and rear discharge system. " +
      "Optional clear acrylic tube hopper.",
    docUrl: `${UPSTREAM_BASE}/Memphis/V1`,
    impact: "replaces",
    category: "scale_variant",
    exclusiveGroup: "ad_fx_shield_variant",
    requiresWhen: (c) => isAdFx(c),
  },
  {
    id: "memphis_v2_ad_lid",
    name: "Memphis V2 - A&D FX Lid",
    author: "Memphis",
    description:
      "Full redesign of the lid, front body, rear body, display mount, " +
      "and PCB enclosure. Distributed as .3mf project files. " +
      "Includes powder bin with magnetic funnel.",
    docUrl: `${UPSTREAM_BASE}/Memphis/V2`,
    impact: "replaces",
    category: "scale_variant",
    exclusiveGroup: "ad_fx_shield_variant",
    requiresWhen: (c) => isAdFx(c),
  },
  {
    id: "crayons82_ad_shield",
    name: "Crayons82 A&D FX Shield",
    author: "Crayons82",
    description:
      "Alternative full-build redesign: front/rear body, base, PCB enclosure, " +
      "display, shield, powder pan, shutters, hopper, and trickler tube inserts. " +
      "Assembly guidance refers to the Memphis V1 readme.",
    docUrl: `${UPSTREAM_BASE}/Crayons82`,
    impact: "preview",
    category: "scale_variant",
    exclusiveGroup: "ad_fx_shield_variant",
    requiresWhen: (c) => isAdFx(c),
    previewNote:
      "Parts-list integration coming soon. For now, print and source " +
      "parts directly from the upstream Crayons82 folder.",
  },
  {
    id: "dirtbit_rear_body_mod",
    name: "dirtbit Rear Body & Display",
    author: "dirtbit",
    description:
      "Alternative rear body with integrated Fly Mini 12864 display mount, " +
      "trickler adapter plate, PCB enclosure, and volume reduction inserts " +
      "designed for easier cleaning.",
    docUrl: `${UPSTREAM_BASE}/dirtbit`,
    impact: "preview",
    category: "scale_variant",
    exclusiveGroup: "ad_fx_shield_variant",
    requiresWhen: (c) => isAdFx(c),
    previewNote:
      "Parts-list integration coming soon. For now, print and source " +
      "parts directly from the upstream dirtbit folder.",
  },
  {
    id: "dewey_ad_shield",
    name: "Dewey A&D Shield",
    author: "Dewey",
    description:
      "Full A&D shield mod that routes servo and motor wires UNDER the adapter " +
      "plate for a cleaner look (away from moving belts). Includes shield, " +
      "adapter plate, optional wire plugs, modded HayaminiNL controller case, " +
      "and a lid with built-in cup holster.",
    docUrl: `${UPSTREAM_BASE}/Dewey/A%26D%20Shield%20Mods`,
    impact: "replaces",
    category: "scale_variant",
    exclusiveGroup: "ad_fx_shield_variant",
    requiresWhen: (c) => isAdFx(c),
  },
  {
    id: "dud3z_alt_pan",
    name: "Alternative Weighing Pan",
    author: "Dud3z",
    description:
      "Debris-resistant weighing pan for use with Memphis V1. Lets stray " +
      "powder kernels fall through the sides so they don't add weight.",
    docUrl: `${UPSTREAM_BASE}/Dud3z`,
    impact: "additive",
    category: "powder_handling",
    requiresWhen: (c) =>
      isAdFx(c) && c.communityMods.includes("memphis_v1_ad_shield"),
  },
  {
    id: "dewey_ball_powder_plate",
    name: "Ball Powder Rear Bearing Plate",
    author: "Dewey",
    description:
      "Modified rear bearing plate sized for ball-style powders (CFE223, " +
      "H4350, LeverEvolution). Enlarged openings and 60° chamfer let kernels " +
      "flow without bridging. Works with V1 and V2 builds — V1 builds also " +
      "need the V2 volume reducer + rear door.",
    docUrl: `${UPSTREAM_BASE}/Dewey/Rear%20Reducer%20Mods`,
    impact: "additive",
    category: "powder_handling",
    requiresWhen: (c) => c.volumeReducer === true,
  },
  {
    id: "ian99rt_thicker_discharge",
    name: "Thicker Front Discharge Plate (+3mm)",
    author: "ian99rt",
    description:
      "Thicker, steeper-angle front discharge plate to stop powder from " +
      "hanging in the chute when the shutter closes (a known issue with " +
      "H4350 and similar powders). Bundled with the matching shorter cup " +
      "base — both parts must be printed together.",
    docUrl: `${UPSTREAM_BASE}/ian99rt`,
    impact: "replaces",
    category: "powder_handling",
    requiresWhen: (c) => isAdFx(c),
  },
  {
    id: "hayamini_controller_case",
    name: "Controller Board Case",
    author: "HayaminiNL",
    description:
      "Enclosure for the Pico motor expansion board (v2.0/2.1 USB-C). " +
      "Includes mounting bracket for rear motor assembly.",
    impact: "additive",
    category: "build_options",
    requiresWhen: (c) => c.controllerVersion === "v2",
  },
  {
    id: "hayamini_cable_management",
    name: "Servo Cable Management",
    author: "HayaminiNL",
    description:
      "Cable management system for servo gate wiring. Keeps wires tidy and out of the way.",
    impact: "additive",
    category: "build_options",
    requiresWhen: (c) => c.servoGate === true,
  },
  {
    id: "neopixel_led_mod",
    name: "Neopixel LED Status Lights",
    author: "eamars",
    description:
      "3x RGB Neopixel LEDs for status indication. Shows trickler state visually.",
    impact: "additive",
    category: "build_options",
  },
  {
    id: "dewey_windowed_front",
    name: "Windowed Front Body",
    author: "Dewey",
    description:
      "Front body variant with a window cutout for a plexiglass panel. " +
      "Lets you see the powder level inside the trickler. Plexi-cutting " +
      "jigs are auto-included with the print list.",
    impact: "additive",
    category: "build_options",
  },
  {
    id: "dewey_cup_holster",
    name: "Cup Holster",
    author: "Dewey",
    description:
      "Convenient holster to hold the powder cup when not in use on the scale.",
    impact: "additive",
    category: "accessories",
  },
  {
    id: "ian99rt_gearless_shutter",
    name: "Gearless Shutter",
    author: "ian99rt",
    description:
      "Alternative shutter design that doesn't use gears. Simplified servo gate mechanism.",
    impact: "additive",
    category: "build_options",
    requiresWhen: (c) => c.servoGate === true,
  },
  {
    id: "mattyy_p_extended_servo",
    name: "Extended Servo Support",
    author: "mattyy_p",
    description: "Extended mounting bracket for servo motors.",
    impact: "additive",
    category: "build_options",
    requiresWhen: (c) => c.servoGate === true,
  },
  {
    id: "mattyy_p_hollow_tube",
    name: "Hollow Trickler Tube",
    author: "mattyy_p",
    description:
      "Alternative hollow trickler tube design for different flow characteristics.",
    impact: "additive",
    category: "powder_handling",
  },
  {
    id: "print_tolerance_pack",
    name: "Print Tolerance Tuner Pack",
    author: "Dewey",
    description:
      "Spacers and a wider front cover for builds where stock prints fit " +
      "too tightly. Includes 0.6mm wider front cover, three door spacers " +
      "(0.2/0.4/0.6mm), and three volume-reducer spacers. Print only the " +
      "size you need after a test fit.",
    docUrl: `${UPSTREAM_BASE}/Dewey`,
    impact: "additive",
    category: "build_options",
  },
  {
    id: "1harrym_water_bottle_adapter",
    name: "Water Bottle Hopper Adapter",
    author: "1harrym",
    description:
      "Adapter to use a standard water bottle as a powder hopper. " +
      "High capacity alternative to printed hoppers.",
    impact: "additive",
    category: "accessories",
  },
  {
    id: "golmeth_lee_bottle_adapter",
    name: "Lee Bottle Adapter",
    author: "Golmeth",
    description:
      "Adapter for Lee powder bottle to feed directly into the hopper.",
    impact: "additive",
    category: "accessories",
  },
  {
    id: "4numen_phone_holder",
    name: "Phone Holder",
    author: "4numen",
    description:
      "Mount for your phone near the trickler. Useful for monitoring the web interface.",
    impact: "additive",
    category: "accessories",
  },
  {
    id: "4numen_jj100b_bumper",
    name: "JJ100B Scale Bumper",
    author: "4numen",
    description:
      "Protective bumper for the G&G JJ100B scale housing.",
    impact: "additive",
    category: "build_options",
    requiresWhen: (c) => c.scaleType === "gg_jj100b",
  },
];

export function getExclusiveGroup(
  modId: CommunityModId,
): string | undefined {
  return COMMUNITY_MODS.find((m) => m.id === modId)?.exclusiveGroup;
}

export function getModsInGroup(group: string): CommunityModId[] {
  return COMMUNITY_MODS.filter((m) => m.exclusiveGroup === group).map(
    (m) => m.id,
  );
}
