import { StepLayout } from "../StepLayout";
import { useAppStore } from "../../../store";
import type { CommunityModId } from "../../../types/config";
import { Check, Info } from "lucide-react";

interface ModDefinition {
  id: CommunityModId;
  name: string;
  author: string;
  description: string;
  requiresWhen?: (config: {
    scaleType: string | null;
    controllerVersion: string | null;
    servoGate: boolean | null;
  }) => boolean;
}

const COMMUNITY_MODS: ModDefinition[] = [
  {
    id: "hayamini_controller_case",
    name: "Controller Board Case",
    author: "HayaminiNL",
    description:
      "Enclosure for the Pico motor expansion board (v2.0/2.1 USB-C). Includes mounting bracket for rear motor assembly.",
    requiresWhen: (c) => c.controllerVersion === "v2",
  },
  {
    id: "hayamini_cable_management",
    name: "Servo Cable Management",
    author: "HayaminiNL",
    description:
      "Cable management system for servo gate wiring. Keeps wires tidy and out of the way.",
    requiresWhen: (c) => c.servoGate === true,
  },
  {
    id: "neopixel_led_mod",
    name: "Neopixel LED Status Lights",
    author: "eamars",
    description:
      "3x RGB Neopixel LEDs for status indication. Shows trickler state visually.",
  },
  {
    id: "dewey_windowed_front",
    name: "Windowed Front Body",
    author: "Dewey",
    description:
      "Front body variant with a window cutout for a plexiglass panel. Lets you see the powder level inside the trickler.",
  },
  {
    id: "dewey_cup_holster",
    name: "Cup Holster",
    author: "Dewey",
    description:
      "Convenient holster to hold the powder cup when not in use on the scale.",
  },
  {
    id: "ian99rt_gearless_shutter",
    name: "Gearless Shutter",
    author: "ian99rt",
    description:
      "Alternative shutter design that doesn't use gears. Simplified servo gate mechanism.",
    requiresWhen: (c) => c.servoGate === true,
  },
  {
    id: "mattyy_p_extended_servo",
    name: "Extended Servo Support",
    author: "mattyy_p",
    description: "Extended mounting bracket for servo motors.",
    requiresWhen: (c) => c.servoGate === true,
  },
  {
    id: "mattyy_p_hollow_tube",
    name: "Hollow Trickler Tube",
    author: "mattyy_p",
    description:
      "Alternative hollow trickler tube design for different flow characteristics.",
  },
  {
    id: "1harrym_water_bottle_adapter",
    name: "Water Bottle Hopper Adapter",
    author: "1harrym",
    description:
      "Adapter to use a standard water bottle as a powder hopper. High capacity alternative to printed hoppers.",
  },
  {
    id: "golmeth_lee_bottle_adapter",
    name: "Lee Bottle Adapter",
    author: "Golmeth",
    description:
      "Adapter for Lee powder bottle to feed directly into the hopper.",
  },
  {
    id: "4numen_phone_holder",
    name: "Phone Holder",
    author: "4numen",
    description:
      "Mount for your phone near the trickler. Useful for monitoring the web interface.",
  },
  {
    id: "4numen_jj100b_bumper",
    name: "JJ100B Scale Bumper",
    author: "4numen",
    description:
      "Protective bumper for the G&G JJ100B scale housing.",
    requiresWhen: (c) => c.scaleType === "gg_jj100b",
  },
];

export function CommunityModsStep() {
  const config = useAppStore((s) => s.config);
  const communityMods = config.communityMods;
  const toggleCommunityMod = useAppStore((s) => s.toggleCommunityMod);

  return (
    <StepLayout
      title="Community Modifications"
      description="Optional modifications created by community members. Select any that interest you -- they'll be added to your print list."
    >
      <div className="mb-3 flex items-start gap-2 rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
        <p className="text-xs text-gray-400">
          Some mods are only available for specific configurations.
          Incompatible mods are grayed out.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {COMMUNITY_MODS.map((mod) => {
          const isCompatible = mod.requiresWhen
            ? mod.requiresWhen(config)
            : true;
          const isSelected = communityMods.includes(mod.id);

          return (
            <button
              key={mod.id}
              onClick={() => isCompatible && toggleCommunityMod(mod.id)}
              disabled={!isCompatible}
              className={[
                "rounded-lg border p-3 text-left transition-all",
                isSelected
                  ? "border-primary-500 bg-primary-500/10"
                  : !isCompatible
                    ? "cursor-not-allowed border-gray-800 opacity-40"
                    : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/50",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4
                    className={[
                      "text-sm font-medium",
                      isSelected
                        ? "text-primary-300"
                        : "text-gray-200",
                    ].join(" ")}
                  >
                    {mod.name}
                  </h4>
                  <p className="mt-0.5 text-[10px] text-gray-500">
                    by {mod.author}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {mod.description}
                  </p>
                </div>
                {isSelected && (
                  <Check className="ml-2 h-4 w-4 shrink-0 text-primary-400" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </StepLayout>
  );
}
