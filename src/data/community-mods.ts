import type {
  BuildConfig,
  CommunityModId,
} from "../types/config";

export type ModImpact = "additive" | "replaces" | "preview";

export interface ModDefinition {
  id: CommunityModId;
  name: string;
  author: string;
  description: string;
  docUrl?: string;
  impact: ModImpact;
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
    exclusiveGroup: "ad_fx_shield_variant",
    requiresWhen: (c) => isAdFx(c),
    previewNote:
      "Parts-list integration coming soon. For now, print and source " +
      "parts directly from the upstream dirtbit folder.",
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
    requiresWhen: (c) =>
      isAdFx(c) && c.communityMods.includes("memphis_v1_ad_shield"),
  },
  {
    id: "hayamini_controller_case",
    name: "Controller Board Case",
    author: "HayaminiNL",
    description:
      "Enclosure for the Pico motor expansion board (v2.0/2.1 USB-C). " +
      "Includes mounting bracket for rear motor assembly.",
    impact: "additive",
    requiresWhen: (c) => c.controllerVersion === "v2",
  },
  {
    id: "hayamini_cable_management",
    name: "Servo Cable Management",
    author: "HayaminiNL",
    description:
      "Cable management system for servo gate wiring. Keeps wires tidy and out of the way.",
    impact: "additive",
    requiresWhen: (c) => c.servoGate === true,
  },
  {
    id: "neopixel_led_mod",
    name: "Neopixel LED Status Lights",
    author: "eamars",
    description:
      "3x RGB Neopixel LEDs for status indication. Shows trickler state visually.",
    impact: "additive",
  },
  {
    id: "dewey_windowed_front",
    name: "Windowed Front Body",
    author: "Dewey",
    description:
      "Front body variant with a window cutout for a plexiglass panel. " +
      "Lets you see the powder level inside the trickler.",
    impact: "additive",
  },
  {
    id: "dewey_cup_holster",
    name: "Cup Holster",
    author: "Dewey",
    description:
      "Convenient holster to hold the powder cup when not in use on the scale.",
    impact: "additive",
  },
  {
    id: "ian99rt_gearless_shutter",
    name: "Gearless Shutter",
    author: "ian99rt",
    description:
      "Alternative shutter design that doesn't use gears. Simplified servo gate mechanism.",
    impact: "additive",
    requiresWhen: (c) => c.servoGate === true,
  },
  {
    id: "mattyy_p_extended_servo",
    name: "Extended Servo Support",
    author: "mattyy_p",
    description: "Extended mounting bracket for servo motors.",
    impact: "additive",
    requiresWhen: (c) => c.servoGate === true,
  },
  {
    id: "mattyy_p_hollow_tube",
    name: "Hollow Trickler Tube",
    author: "mattyy_p",
    description:
      "Alternative hollow trickler tube design for different flow characteristics.",
    impact: "additive",
  },
  {
    id: "1harrym_water_bottle_adapter",
    name: "Water Bottle Hopper Adapter",
    author: "1harrym",
    description:
      "Adapter to use a standard water bottle as a powder hopper. " +
      "High capacity alternative to printed hoppers.",
    impact: "additive",
  },
  {
    id: "golmeth_lee_bottle_adapter",
    name: "Lee Bottle Adapter",
    author: "Golmeth",
    description:
      "Adapter for Lee powder bottle to feed directly into the hopper.",
    impact: "additive",
  },
  {
    id: "4numen_phone_holder",
    name: "Phone Holder",
    author: "4numen",
    description:
      "Mount for your phone near the trickler. Useful for monitoring the web interface.",
    impact: "additive",
  },
  {
    id: "4numen_jj100b_bumper",
    name: "JJ100B Scale Bumper",
    author: "4numen",
    description:
      "Protective bumper for the G&G JJ100B scale housing.",
    impact: "additive",
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
