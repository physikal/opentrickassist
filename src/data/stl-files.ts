import type { StlGroup } from "../types/stl";
import type { BuildConfig } from "../types/config";

const REPO_BASE = "STL";
const CORE = `${REPO_BASE}/OpenTrickler`;
const SERVO = `${CORE}/ServoGate`;
const VOLUME = `${CORE}/VolumeReducer`;
const TOOLS = `${CORE}/Tools`;
const HOPPER = `${REPO_BASE}/Powder Hopper`;
const AD_FX = `${REPO_BASE}/A&D FX Shield`;
const GG_JJ100B = `${REPO_BASE}/G&G JJ100B housing`;
const MEMPHIS_V1 = "CommunityContributions/Memphis/V1/STL";
const MEMPHIS_V2 = "CommunityContributions/Memphis/V2/3MF";
const DUD3Z = "CommunityContributions/Dud3z";
const DEWEY_ROOT = "CommunityContributions/Dewey";
const DEWEY_AD_SHIELD = `${DEWEY_ROOT}/A&D Shield Mods`;
const DEWEY_FRONT_REDUCER = `${DEWEY_ROOT}/Front Reducer Mods`;
const DEWEY_REAR_REDUCER = `${DEWEY_ROOT}/Rear Reducer Mods`;
const IAN99RT = "CommunityContributions/ian99rt";
const CRAYONS82 = "CommunityContributions/Crayons82/STL";
const DIRTBIT = "CommunityContributions/dirtbit/STL";
const HAYAMINI = "CommunityContributions/HayaminiNL/STL";
const MATTYY_P = "CommunityContributions/mattyy_p";
const HARRYM = "CommunityContributions/1harrym/STL";
const GOLMETH = "CommunityContributions/Golmeth/STL";
const NUMEN = "CommunityContributions/4numen/STL";
const NEOPIXEL = "CommunityContributions/eamars/neopixel_led_mod/STL";

function isAdFx(config: BuildConfig): boolean {
  return (
    config.scaleType === "ad_fx120i_300i" ||
    config.scaleType === "gg_jj223bf"
  );
}

function memphisV1ReplacesAdFxPart(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("memphis_v1_ad_shield") &&
    isAdFx(config)
  );
}

function memphisV1HopperActive(config: BuildConfig): boolean {
  return (
    memphisV1ReplacesAdFxPart(config) && config.memphisV1AcrylicHopper
  );
}

function memphisV2ReplacesCore(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("memphis_v2_ad_lid") &&
    isAdFx(config)
  );
}

function deweyAdShieldActive(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("dewey_ad_shield") && isAdFx(config)
  );
}

function crayons82Active(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("crayons82_ad_shield") && isAdFx(config)
  );
}

function dirtbitActive(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("dirtbit_rear_body_mod") &&
    isAdFx(config)
  );
}

function ian99rtThickerDischargeActive(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("ian99rt_thicker_discharge") &&
    isAdFx(config)
  );
}

function ian99rtGearlessActive(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("ian99rt_gearless_shutter") &&
    config.servoGate === true
  );
}

function deweyWindowedFrontActive(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("dewey_windowed_front") &&
    !memphisV2ReplacesCore(config) &&
    !crayons82Active(config) &&
    !neopixelModActive(config)
  );
}

function deweyCupHolsterActive(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("dewey_cup_holster") &&
    isAdFx(config) &&
    !deweyAdShieldActive(config) &&
    !memphisV1ReplacesAdFxPart(config) &&
    !crayons82Active(config)
  );
}

function neopixelModActive(config: BuildConfig): boolean {
  return (
    (config.communityMods.includes("neopixel_led_mod") ||
      config.neopixelLeds === true) &&
    isAdFx(config) &&
    !memphisV1ReplacesAdFxPart(config) &&
    !memphisV2ReplacesCore(config) &&
    !crayons82Active(config) &&
    !dirtbitActive(config) &&
    !deweyAdShieldActive(config)
  );
}

function deweyBallPowderActive(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("dewey_ball_powder_plate") &&
    config.volumeReducer === true
  );
}

function printTolerancePackActive(config: BuildConfig): boolean {
  return config.communityMods.includes("print_tolerance_pack");
}

function hopperAdapterActive(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("1harrym_water_bottle_adapter") ||
    config.communityMods.includes("golmeth_lee_bottle_adapter")
  );
}

export const STL_GROUPS: StlGroup[] = [
  {
    id: "opentrickler_core",
    name: "OpenTrickler Core",
    description: "Main body, tubes, pulleys, and doors for the trickler assembly.",
    requiredWhen: () => true,
    files: [
      {
        id: "front_body",
        filename: "front_body.stl",
        repoPath: `${CORE}/front_body.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          !memphisV2ReplacesCore(config) &&
          !crayons82Active(config) &&
          !deweyWindowedFrontActive(config) &&
          !neopixelModActive(config) &&
          !(
            ian99rtGearlessActive(config) &&
            !memphisV2ReplacesCore(config) &&
            !crayons82Active(config)
          ),
      },
      {
        id: "front_body_cover",
        filename: "front_body_cover.stl",
        repoPath: `${CORE}/front_body_cover.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          !memphisV2ReplacesCore(config) && !crayons82Active(config),
      },
      {
        id: "rear_body",
        filename: "rear_body.stl",
        repoPath: `${CORE}/rear_body.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          !memphisV1ReplacesAdFxPart(config) &&
          !memphisV2ReplacesCore(config) &&
          !crayons82Active(config) &&
          !dirtbitActive(config),
      },
      {
        id: "front_rear_door",
        filename: "front_rear_door_x2.stl",
        repoPath: `${CORE}/front_rear_door_x2.stl`,
        printQuantity: 2,
        material: "abs_asa_petg",
        requiredWhen: () => true,
      },
      {
        id: "large_rotary_tube",
        filename: "large_rotary_tube.stl",
        repoPath: `${CORE}/large_rotary_tube.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: () => true,
      },
      {
        id: "small_rotary_tube_low_flow",
        filename: "small_rotary_tube_low_flow.stl",
        repoPath: `${CORE}/small_rotary_tube_low_flow.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.flowRate === "low" || config.flowRate === null,
      },
      {
        id: "small_rotary_tube_mid_flow",
        filename: "small_rotary_tube_mid_flow.stl",
        repoPath: `${CORE}/small_rotary_tube_mid_flow.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.flowRate === "mid",
      },
      {
        id: "small_rotary_tube_high_flow",
        filename: "small_rotary_tube_high_flow.stl",
        repoPath: `${CORE}/small_rotary_tube_high_flow.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.flowRate === "high",
      },
      {
        id: "gt2_40t_pulley",
        filename: "40_teeth_gt2_pulley_x2.stl",
        repoPath: `${CORE}/40_teeth_gt2_pulley_x2.stl`,
        printQuantity: 2,
        material: "abs_asa_petg",
        specialInstructions: "Can use aftermarket metal pulleys instead.",
        requiredWhen: () => true,
      },
    ],
  },
  {
    id: "servo_gate",
    name: "Servo Gate",
    description: "Gate shutters, hangers, and gears for servo-controlled powder dispensing.",
    requiredWhen: (config) => config.servoGate === true,
    files: [
      {
        id: "left_servo_hanger",
        filename: "left_servo_hanger.stl",
        repoPath: `${SERVO}/left_servo_hanger.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.servoGate === true &&
          !config.communityMods.includes("mattyy_p_extended_servo"),
      },
      {
        id: "right_servo_hanger",
        filename: "right_servo_hanger.stl",
        repoPath: `${SERVO}/right_servo_hanger.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.servoGate === true &&
          !config.communityMods.includes("mattyy_p_extended_servo"),
      },
      {
        id: "left_shutter",
        filename: "left_shutter.stl",
        repoPath: `${SERVO}/left_shutter.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.servoGate === true && !ian99rtGearlessActive(config),
      },
      {
        id: "right_shutter",
        filename: "right_shutter.stl",
        repoPath: `${SERVO}/right_shutter.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.servoGate === true && !ian99rtGearlessActive(config),
      },
      {
        id: "spur_gear",
        filename: "spur_gear_x2.stl",
        repoPath: `${SERVO}/spur_gear_x2.stl`,
        printQuantity: 2,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.servoGate === true && !ian99rtGearlessActive(config),
      },
    ],
  },
  {
    id: "volume_reducer",
    name: "Volume Reducer",
    description: "Inserts that reduce the internal volume of the trickler tubes for finer control.",
    requiredWhen: (config) => config.volumeReducer === true,
    files: [
      {
        id: "front_volume_insert_top",
        filename: "FrontVolumeReductionInsert_Top.stl",
        repoPath: `${VOLUME}/FrontVolumeReductionInsert_Top.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.volumeReducer === true,
      },
      {
        id: "front_volume_insert_bottom",
        filename: "FrontVolumeReductionInsert_Bottom.stl",
        repoPath: `${VOLUME}/FrontVolumeReductionInsert_Bottom.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.volumeReducer === true,
      },
      {
        id: "rear_volume_insert_top",
        filename: "RearVolumeReductionInsert_Top.stl",
        repoPath: `${VOLUME}/RearVolumeReductionInsert_Top.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.volumeReducer === true,
      },
      {
        id: "rear_volume_insert_bottom",
        filename: "RearVolumeReductionInsert_Bottom.stl",
        repoPath: `${VOLUME}/RearVolumeReductionInsert_Bottom.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.volumeReducer === true,
      },
    ],
  },
  {
    id: "ad_fx_shield",
    name: "A&D FX Shield",
    description:
      "Scale shield, adapter plates, discharge system, and powder cups " +
      "for A&D FX-120i/300i compatible scales.",
    requiredWhen: (config) => isAdFx(config),
    files: [
      {
        id: "ad_scale_shield",
        filename: "scale_shield.stl",
        repoPath: `${AD_FX}/scale_shield.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) &&
          !memphisV1ReplacesAdFxPart(config) &&
          !deweyAdShieldActive(config) &&
          !crayons82Active(config) &&
          !neopixelModActive(config),
      },
      {
        id: "ad_trickler_adapter_plate",
        filename: "trickler_adapter_plate.stl",
        repoPath: `${AD_FX}/trickler_adapter_plate.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) &&
          !deweyAdShieldActive(config) &&
          !dirtbitActive(config) &&
          !crayons82Active(config) &&
          !neopixelModActive(config),
      },
      {
        id: "ad_scale_base_adapter_ring",
        filename: "scale_base_adapter_ring.stl",
        repoPath: `${AD_FX}/scale_base_adapter_ring.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) &&
          !memphisV1ReplacesAdFxPart(config) &&
          !crayons82Active(config),
      },
      {
        id: "ad_scale_weighing_pan_adapter",
        filename: "scale_weighing_pan_adapter.stl",
        repoPath: `${AD_FX}/scale_weighing_pan_adapter.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => isAdFx(config),
      },
      {
        id: "ad_weighing_pan_27mm",
        filename: "weighing_pan_27mm.stl",
        repoPath: `${AD_FX}/weighing_pan_27mm.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => isAdFx(config),
      },
      {
        id: "ad_scale_pan_cover",
        filename: "scale_pan_cover.stl",
        repoPath: `${AD_FX}/scale_pan_cover.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => isAdFx(config),
      },
      {
        id: "ad_pan_cover",
        filename: "pan_cover.stl",
        repoPath: `${AD_FX}/pan_cover.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => isAdFx(config),
      },
      {
        id: "ad_pan_cover_lid",
        filename: "pan_cover_lid.stl",
        repoPath: `${AD_FX}/pan_cover_lid.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) &&
          !deweyAdShieldActive(config) &&
          !deweyCupHolsterActive(config) &&
          !crayons82Active(config),
      },
      {
        id: "ad_cup_base_7mm",
        filename: "cup_base_7mm.stl",
        repoPath: `${AD_FX}/cup_base_7mm.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) &&
          !memphisV1ReplacesAdFxPart(config) &&
          !ian99rtThickerDischargeActive(config) &&
          !crayons82Active(config),
      },
      {
        id: "ad_powder_cup_body",
        filename: "powder_cup_body.stl",
        repoPath: `${AD_FX}/powder_cup_body.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) && !crayons82Active(config),
      },
      {
        id: "ad_powder_cup_handle",
        filename: "powder_cup_handle.stl",
        repoPath: `${AD_FX}/powder_cup_handle.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) &&
          !memphisV1ReplacesAdFxPart(config) &&
          !crayons82Active(config),
      },
      {
        id: "ad_front_discharger_mount",
        filename: "front_discharger_mount.stl",
        repoPath: `${AD_FX}/front_discharger_mount.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) &&
          !ian99rtThickerDischargeActive(config) &&
          !neopixelModActive(config) &&
          !crayons82Active(config),
      },
      {
        id: "ad_rear_discharge_mount",
        filename: "rear_discharge_mount.stl",
        repoPath: `${AD_FX}/rear_discharge_mount.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) &&
          !memphisV1ReplacesAdFxPart(config) &&
          !crayons82Active(config),
      },
      {
        id: "ad_rear_discharger_cup",
        filename: "rear_discharger_cup.stl",
        repoPath: `${AD_FX}/rear_discharger_cup.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) &&
          !memphisV1ReplacesAdFxPart(config) &&
          !crayons82Active(config),
      },
      {
        id: "ad_rear_discharge_cup_ring",
        filename: "rear_discharge_cup_ring.stl",
        repoPath: `${AD_FX}/rear_discharge_cup_ring.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) &&
          !memphisV1ReplacesAdFxPart(config) &&
          !crayons82Active(config),
      },
      {
        id: "ad_rear_discharger_sliding_door",
        filename: "rear_discharger_sliding_door.stl",
        repoPath: `${AD_FX}/rear_discharger_sliding_door.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) &&
          !memphisV1ReplacesAdFxPart(config) &&
          !crayons82Active(config),
      },
    ],
  },
  {
    id: "gg_jj100b_housing",
    name: "G&G JJ100B Housing",
    description:
      "Custom baseplate, body, cups, and discharge system for the G&G JJ100B scale.",
    requiredWhen: (config) => config.scaleType === "gg_jj100b",
    files: [
      {
        id: "gg_baseplate",
        filename: "JJ100B_Baseplate_OpenTrickler.stl",
        repoPath: `${GG_JJ100B}/JJ100B_Baseplate_OpenTrickler.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_body",
        filename: "JJ100B_Body.stl",
        repoPath: `${GG_JJ100B}/JJ100B_Body.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_body_cover",
        filename: "JJ100B_Body-cover.stl",
        repoPath: `${GG_JJ100B}/JJ100B_Body-cover.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_scale_plate",
        filename: "JJ100B_Scale-plate.stl",
        repoPath: `${GG_JJ100B}/JJ100B_Scale-plate.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_ring",
        filename: "JJ100B_Ring.stl",
        repoPath: `${GG_JJ100B}/JJ100B_Ring.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_cup",
        filename: "JJ100B_Cup.stl",
        repoPath: `${GG_JJ100B}/JJ100B_Cup.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_discharger_cup",
        filename: "JJ100B_Discharger_cup.stl",
        repoPath: `${GG_JJ100B}/JJ100B_Discharger_cup.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_discharger_cup_ring",
        filename: "JJ100B_Discharger_cup_ring.stl",
        repoPath: `${GG_JJ100B}/JJ100B_Discharger_cup_ring.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_discharger_mount",
        filename: "JJ100B_Discharger_mount.stl",
        repoPath: `${GG_JJ100B}/JJ100B_Discharger_mount.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_front_discharger_mount",
        filename: "JJ100B_Front_discharger_mount.stl",
        repoPath: `${GG_JJ100B}/JJ100B_Front_discharger_mount.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_discharger_sliding_door",
        filename: "JJ100B_Discharger_sliding_door.stl",
        repoPath: `${GG_JJ100B}/JJ100B_Discharger_sliding_door.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
    ],
  },
  {
    id: "powder_hopper",
    name: "Powder Hopper",
    description:
      "Base, body (height-specific), cap, and rear body interface for the powder hopper.",
    requiredWhen: () => true,
    files: [
      {
        id: "hopper_base",
        filename: "hopper_base.stl",
        repoPath: `${HOPPER}/hopper_base.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          !memphisV1HopperActive(config) &&
          !hopperAdapterActive(config) &&
          !crayons82Active(config),
      },
      {
        id: "hopper_body_100mm",
        filename: "hopper_body_100mm.stl",
        repoPath: `${HOPPER}/hopper_body_100mm.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          !memphisV1HopperActive(config) &&
          !hopperAdapterActive(config) &&
          !crayons82Active(config) &&
          (config.hopperHeight === "100mm" ||
            config.hopperHeight === null),
      },
      {
        id: "hopper_body_150mm",
        filename: "hopper_body_150mm.stl",
        repoPath: `${HOPPER}/hopper_body_150mm.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          !memphisV1HopperActive(config) &&
          !hopperAdapterActive(config) &&
          !crayons82Active(config) &&
          config.hopperHeight === "150mm",
      },
      {
        id: "hopper_body_200mm",
        filename: "hopper_body_200mm.stl",
        repoPath: `${HOPPER}/hopper_body_200mm.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          !memphisV1HopperActive(config) &&
          !hopperAdapterActive(config) &&
          !crayons82Active(config) &&
          config.hopperHeight === "200mm",
      },
      {
        id: "hopper_cap",
        filename: "hopper_cap.stl",
        repoPath: `${HOPPER}/hopper_cap.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Print in vase mode with 0.8mm wall for best results.",
        requiredWhen: (config) =>
          !memphisV1HopperActive(config) &&
          !hopperAdapterActive(config) &&
          !crayons82Active(config),
      },
      {
        id: "rear_body_interface",
        filename: "rear_body_interface.stl",
        repoPath: `${HOPPER}/rear_body_interface.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          !memphisV2ReplacesCore(config) && !crayons82Active(config),
      },
    ],
  },
  {
    id: "belts_tpu",
    name: "Belts (TPU Printed)",
    description:
      "3D-printable GT2 timing belts in TPU. " +
      "Alternative to purchasing aftermarket closed-loop belts.",
    requiredWhen: (config) => config.beltType === "tpu_printed",
    files: [
      {
        id: "gt2_86t_belt",
        filename: "GT2_86T_Belt.stl",
        repoPath: `${CORE}/GT2_86T_Belt.stl`,
        printQuantity: 1,
        material: "tpu_95a",
        specialInstructions:
          "Print in TPU 95A. Coarse tube belt (86 teeth). " +
          "Aftermarket equivalent is 174mm / 87 teeth.",
        requiredWhen: (config) => config.beltType === "tpu_printed",
      },
      {
        id: "gt2_82t_belt",
        filename: "GT2_82T_Belt.stl",
        repoPath: `${CORE}/GT2_82T_Belt.stl`,
        printQuantity: 1,
        material: "tpu_95a",
        specialInstructions:
          "Print in TPU 95A. Fine tube belt (82 teeth). " +
          "Aftermarket equivalent is 166mm / 83 teeth.",
        requiredWhen: (config) => config.beltType === "tpu_printed",
      },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    description: "Bearing insertion and ejection helpers for assembly.",
    requiredWhen: () => true,
    files: [
      {
        id: "6801_bearing_press",
        filename: "6801_bearing_press_helper.stl",
        repoPath: `${TOOLS}/6801_bearing_press_helper.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Used to press 6801-2RS bearings into housings.",
        requiredWhen: () => true,
      },
      {
        id: "6801_bearing_eject",
        filename: "6801_bearing_eject_helper.stl",
        repoPath: `${TOOLS}/6801_bearing_eject_helper.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Used to remove 6801-2RS bearings from housings.",
        requiredWhen: () => true,
      },
      {
        id: "6804_bearing_press",
        filename: "6804_bearing_press_helper.stl",
        repoPath: `${TOOLS}/6804_bearing_press_helper.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Used to press 6804-2RS bearings into housings.",
        requiredWhen: () => true,
      },
      {
        id: "6804_bearing_eject",
        filename: "6804_bearing_eject_helper.stl",
        repoPath: `${TOOLS}/6804_bearing_eject_helper.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Used to remove 6804-2RS bearings from housings.",
        requiredWhen: () => true,
      },
    ],
  },
  {
    id: "memphis_v1",
    name: "Memphis Mod V1 - A&D FX Shield",
    description:
      "Redesigned A&D FX scale shield with integrated display mount, " +
      "PCB enclosure, and scale base. Community contribution by Memphis.",
    requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
    files: [
      {
        id: "memphis_v1_rear_body_without_holes",
        filename: "rear_body_without_holes.stl",
        repoPath: `${MEMPHIS_V1}/rear_body_without_holes.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Replaces the stock rear body. Sides have no through-holes.",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_scale_shield",
        filename: "scale_shield.stl",
        repoPath: `${MEMPHIS_V1}/scale_shield.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_scale_base",
        filename: "scale_base.stl",
        repoPath: `${MEMPHIS_V1}/scale_base.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_cup_base",
        filename: "cup_base.stl",
        repoPath: `${MEMPHIS_V1}/cup_base.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Taped to the first weighing plate.",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_powder_cup_handle",
        filename: "powder_cup_handle.stl",
        repoPath: `${MEMPHIS_V1}/powder_cup_handle.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_rear_discharge_mount",
        filename: "rear_discharge_mount.stl",
        repoPath: `${MEMPHIS_V1}/rear_discharge_mount.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_rear_discharger_cup",
        filename: "rear_discharger_cup.stl",
        repoPath: `${MEMPHIS_V1}/rear_discharger_cup.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_rear_discharge_cup_ring",
        filename: "rear_discharge_cup_ring.stl",
        repoPath: `${MEMPHIS_V1}/rear_discharge_cup_ring.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_rear_discharger_sliding_door",
        filename: "rear_discharger_slinding_door.stl",
        repoPath: `${MEMPHIS_V1}/rear_discharger_slinding_door.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Filename typo preserved from upstream repo.",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_display_assy_body",
        filename: "display_assy_body.stl",
        repoPath: `${MEMPHIS_V1}/display_assy_body.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_display_assy_bracket",
        filename: "display_assy_bracket.stl",
        repoPath: `${MEMPHIS_V1}/display_assy_bracket.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_display_assy_front",
        filename: "display_assy_front.stl",
        repoPath: `${MEMPHIS_V1}/display_assy_front.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_display_assy_button",
        filename: "display_assy_button.stl",
        repoPath: `${MEMPHIS_V1}/display_assy_button.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_enclosure_bottom",
        filename: "enclosure_bottom.stl",
        repoPath: `${MEMPHIS_V1}/enclosure_bottom.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "PCB enclosure bottom half.",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_enclosure_top",
        filename: "enclosure_top.stl",
        repoPath: `${MEMPHIS_V1}/enclosure_top.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "PCB enclosure top cover - snaps on.",
        requiredWhen: (config) => memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "memphis_v1_hopper_base_plexi",
        filename: "hopper_base_plexi.stl",
        repoPath: `${MEMPHIS_V1}/hopper_base_plexi.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "For clear acrylic tube hopper (60mm OD / 56mm ID).",
        requiredWhen: (config) => memphisV1HopperActive(config),
      },
      {
        id: "memphis_v1_hopper_cap",
        filename: "hopper_cap.stl",
        repoPath: `${MEMPHIS_V1}/hopper_cap.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "For clear acrylic tube hopper (60mm OD / 56mm ID).",
        requiredWhen: (config) => memphisV1HopperActive(config),
      },
    ],
  },
  {
    id: "memphis_v2",
    name: "Memphis Mod V2 - A&D FX Lid",
    description:
      "Full lid and body redesign with integrated display, PCB enclosure, " +
      "interface, powder bin, and funnel. Files are .3mf format " +
      "(pre-sliced projects). Community contribution by Memphis.",
    requiredWhen: (config) => memphisV2ReplacesCore(config),
    files: [
      {
        id: "memphis_v2_rear_body_no_holes_left",
        filename: "RearBodyWithoutHolesOnTheLeft.3mf",
        repoPath: `${MEMPHIS_V2}/RearBodyWithoutHolesOnTheLeft.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Replaces stock rear body.",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_rear_body_interface_modified",
        filename: "RearBodyInterfaceModified.3mf",
        repoPath: `${MEMPHIS_V2}/RearBodyInterfaceModified.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Modified hopper/rear-body interface for easier fit.",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_front_body_with_acrylic",
        filename: "FrontBodyWhitoutServoWithAcrylic.3mf",
        repoPath: `${MEMPHIS_V2}/FrontBody/FrontBodyWhitoutServoWithAcrylic.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Front body with acrylic window, no servos variant. " +
          "Filename typo preserved from upstream.",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_front_volume_reducer_with_hole",
        filename: "FrontVolumeReducerWithHole.3mf",
        repoPath: `${MEMPHIS_V2}/FrontBody/FrontVolumeReducerWithHole.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) && config.volumeReducer === true,
      },
      {
        id: "memphis_v2_front_body_cover_with_hole",
        filename: "FrontBodyCoverWithHole.3mf",
        repoPath: `${MEMPHIS_V2}/FrontBody/FrontBodyCoverWithHole.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Front body cover with hole for the plexiglass window.",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_front_cover",
        filename: "FrontCover.3mf",
        repoPath: `${MEMPHIS_V2}/FrontBody/FrontCover.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Alternative solid front cover (no plexiglass window).",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_cap_with_hole",
        filename: "CapWithHole.3mf",
        repoPath: `${MEMPHIS_V2}/FrontBody/CapWithHole.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_cap",
        filename: "Cap.3mf",
        repoPath: `${MEMPHIS_V2}/FrontBody/Cap.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Alternative plain cap (without hole).",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_interface_no_servos",
        filename: "Interface.3mf",
        repoPath: `${MEMPHIS_V2}/Interface/Interface.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Interface without servos.",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) && config.servoGate !== true,
      },
      {
        id: "memphis_v2_interface_with_servos",
        filename: "InterfaceWithServos.3mf",
        repoPath: `${MEMPHIS_V2}/Interface/InterfaceWithServos.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Interface with servo cutouts.",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) && config.servoGate === true,
      },
      {
        id: "memphis_v2_interface_front_flap",
        filename: "InterfaceFrontFlap.3mf",
        repoPath: `${MEMPHIS_V2}/Interface/InterfaceFrontFlap.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_interface_rear_flap",
        filename: "InterfaceRearFlap.3mf",
        repoPath: `${MEMPHIS_V2}/Interface/InterfaceRearFlap.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_lid_no_servos",
        filename: "Lid_NoServos.3mf",
        repoPath: `${MEMPHIS_V2}/Lid/Lid_NoServos.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) && config.servoGate !== true,
      },
      {
        id: "memphis_v2_lid_servos",
        filename: "Lid_Servos.3mf",
        repoPath: `${MEMPHIS_V2}/Lid/Lid_Servos.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) && config.servoGate === true,
      },
      {
        id: "memphis_v2_lid_wire_cover",
        filename: "Lid_WireCover.3mf",
        repoPath: `${MEMPHIS_V2}/Lid/Lid_WireCover.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_small_cable_lock",
        filename: "SmallCableLock.3mf",
        repoPath: `${MEMPHIS_V2}/Lid/SmallCableLock.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_big_cable_block",
        filename: "BigCableBlock.3mf",
        repoPath: `${MEMPHIS_V2}/Lid/BigCableBlock.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_powder_bin",
        filename: "PowderBin.3mf",
        repoPath: `${MEMPHIS_V2}/Lid/PowderBin.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_powder_bin_bracket",
        filename: "PowderBinBracket.3mf",
        repoPath: `${MEMPHIS_V2}/Lid/PowderBinBracket.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_funnel_33mm",
        filename: "Funnel33mm.3mf",
        repoPath: `${MEMPHIS_V2}/Lid/Funnel33mm.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "33mm funnel for standard 41.6mm shot glass.",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_lid_led_strip_addon",
        filename: "Lid_LEDStrip_AddOn.3mf",
        repoPath: `${MEMPHIS_V2}/Lid_LEDStrip_AddOn.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Optional - print only if using a WS2812B LED strip.",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) &&
          config.neopixelLeds === true,
      },
      {
        id: "memphis_v2_display_bigtreetech_back",
        filename: "BigTreetechScreen_Back.3mf",
        repoPath: `${MEMPHIS_V2}/Display/BigTreetechScreen_Back.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) &&
          config.memphisV2Display === "bigtreetech",
      },
      {
        id: "memphis_v2_display_bigtreetech_front",
        filename: "BigTreetechScreen_Front.3mf",
        repoPath: `${MEMPHIS_V2}/Display/BigTreetechScreen_Front.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) &&
          config.memphisV2Display === "bigtreetech",
      },
      {
        id: "memphis_v2_display_fly_left_back",
        filename: "FlyScreen_Back.3mf",
        repoPath: `${MEMPHIS_V2}/Display/FlyScreen_Back.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Fly display with button on the left.",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) &&
          config.memphisV2Display === "fly_left",
      },
      {
        id: "memphis_v2_display_fly_left_front",
        filename: "FlyScreen_Front.3mf",
        repoPath: `${MEMPHIS_V2}/Display/FlyScreen_Front.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) &&
          config.memphisV2Display === "fly_left",
      },
      {
        id: "memphis_v2_display_fly_right_back",
        filename: "FlyScreen_RightButton_Back.3mf",
        repoPath: `${MEMPHIS_V2}/Display/FlyScreen_RightButton_Back.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Fly display with button on the right.",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) &&
          config.memphisV2Display === "fly_right",
      },
      {
        id: "memphis_v2_display_fly_right_front",
        filename: "FlyScreen_RightButton_Front.3mf",
        repoPath: `${MEMPHIS_V2}/Display/FlyScreen_RightButton_Front.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          memphisV2ReplacesCore(config) &&
          config.memphisV2Display === "fly_right",
      },
      {
        id: "memphis_v2_pcb_enclosure",
        filename: "Enclosure.3mf",
        repoPath: `${MEMPHIS_V2}/PCB/Enclosure.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_pcb_enclosure_lid",
        filename: "Enclosure_Lid.3mf",
        repoPath: `${MEMPHIS_V2}/PCB/Enclosure_Lid.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_hopper_base_plexi",
        filename: "HopperBasePlexi.3mf",
        repoPath: `${MEMPHIS_V2}/Hopper/HopperBasePlexi.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "For clear acrylic tube hopper (60mm OD / 56mm ID).",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_hopper_cap",
        filename: "HopperCap.3mf",
        repoPath: `${MEMPHIS_V2}/Hopper/HopperCap.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_powder_cup_handle",
        filename: "PowderCuphandle.3mf",
        repoPath: `${MEMPHIS_V2}/PowderCuphandle.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
      {
        id: "memphis_v2_cup_stop",
        filename: "CupStop.3mf",
        repoPath: `${MEMPHIS_V2}/CupStop.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Glue on with a school glue stick.",
        requiredWhen: (config) => memphisV2ReplacesCore(config),
      },
    ],
  },
  {
    id: "dud3z_alt_pan",
    name: "Dud3z Alternative Weighing Pan",
    description:
      "Debris-resistant weighing pan for use with Memphis V1. " +
      "Requires the stock scale_weighing_pan_adapter.stl (already in the A&D FX Shield group).",
    requiredWhen: (config) =>
      isAdFx(config) &&
      config.communityMods.includes("dud3z_alt_pan"),
    files: [
      {
        id: "dud3z_alt_pan_stl",
        filename: "AlternativePanMemphisMod.stl",
        repoPath: `${DUD3Z}/AlternativePanMemphisMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Antistatic filament recommended. No supports needed. " +
          "Screws to scale_weighing_pan_adapter with 1x M3 screw (>=6mm).",
        requiredWhen: (config) =>
          isAdFx(config) &&
          config.communityMods.includes("dud3z_alt_pan"),
      },
    ],
  },
  {
    id: "dewey_ad_shield",
    name: "Dewey A&D Shield",
    description:
      "Routes servo and motor wires under the adapter plate. Replaces " +
      "the stock scale shield, adapter plate, and shield-cover lid; adds " +
      "wire plugs, modded HayaminiNL controller case, and an integrated " +
      "cup-holster lid.",
    requiredWhen: (config) => deweyAdShieldActive(config),
    files: [
      {
        id: "dewey_ad_scale_shield",
        filename: "1_ScaleShield_DeweyMod.stl",
        repoPath: `${DEWEY_AD_SHIELD}/1_ScaleShield_DeweyMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Replaces stock scale_shield. Cutouts on left and right route " +
          "servo/motor wires. Print with brim recommended.",
        requiredWhen: (config) => deweyAdShieldActive(config),
      },
      {
        id: "dewey_ad_feeder_plug",
        filename: "2_FeederPlug_x2.stl",
        repoPath: `${DEWEY_AD_SHIELD}/2_FeederPlug_x2.stl`,
        printQuantity: 2,
        material: "abs_asa_petg",
        specialInstructions:
          "Fills unused cutouts in the modded scale shield.",
        requiredWhen: (config) => deweyAdShieldActive(config),
      },
      {
        id: "dewey_ad_adapter_plate",
        filename: "3b_AdapterPlate_DeweyMod.stl",
        repoPath: `${DEWEY_AD_SHIELD}/3b_AdapterPlate_DeweyMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Replaces stock trickler_adapter_plate. Has servo/motor JST " +
          "holes only. If you also want dirtbit display mounting holes, " +
          "use 3a from the upstream folder instead. Print with brim.",
        requiredWhen: (config) => deweyAdShieldActive(config),
      },
      {
        id: "dewey_ad_motor_wires_plug",
        filename: "4_MotorWiresPlug_x2.stl",
        repoPath: `${DEWEY_AD_SHIELD}/4_MotorWiresPlug_x2.stl`,
        printQuantity: 2,
        material: "abs_asa_petg",
        specialInstructions:
          "Optional - small plugs to tuck motor wires closer.",
        requiredWhen: (config) => deweyAdShieldActive(config),
      },
      {
        id: "dewey_ad_servo_wires_plug",
        filename: "5_ServoWiresPlug_x2.stl",
        repoPath: `${DEWEY_AD_SHIELD}/5_ServoWiresPlug_x2.stl`,
        printQuantity: 2,
        material: "abs_asa_petg",
        specialInstructions:
          "Optional - small plugs to tuck servo wires closer.",
        requiredWhen: (config) =>
          deweyAdShieldActive(config) && config.servoGate === true,
      },
      {
        id: "dewey_ad_case_body_bottom",
        filename: "6_CaseV2.xBodyBottom_DeweyMod.stl",
        repoPath: `${DEWEY_AD_SHIELD}/6_CaseV2.xBodyBottom_DeweyMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Modded HayaminiNL controller case bottom (back holes fit JST " +
          "plugs). Use 2x M3x12 SHCS, 2x M3 nut. Print with mouse ears " +
          "or brim.",
        requiredWhen: (config) =>
          deweyAdShieldActive(config) &&
          config.controllerVersion === "v2",
      },
      {
        id: "dewey_ad_case_body_top",
        filename: "7_CaseV2.xBodyTopRecreated_DeweyMod.stl",
        repoPath: `${DEWEY_AD_SHIELD}/7_CaseV2.xBodyTopRecreated_DeweyMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Modded HayaminiNL controller case top (wider serial port). " +
          "Use 4x M3x30 SHCS, 4x M3 nut. Print with mouse ears or brim.",
        requiredWhen: (config) =>
          deweyAdShieldActive(config) &&
          config.controllerVersion === "v2",
      },
      {
        id: "dewey_ad_case_rear_bracket",
        filename: "8_CaseV2.RearBracket.stl",
        repoPath: `${DEWEY_AD_SHIELD}/8_CaseV2.RearBracket.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "HayaminiNL's unmodded rear bracket, copied for convenience. " +
          "Use 2x M3x10 BHCS.",
        requiredWhen: (config) =>
          deweyAdShieldActive(config) &&
          config.controllerVersion === "v2",
      },
      {
        id: "dewey_ad_lid_cup_holster",
        filename: "9_Lid_wCupHolster_DeweyMod.stl",
        repoPath: `${DEWEY_AD_SHIELD}/9_Lid_wCupHolster_DeweyMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Replaces pan_cover_lid. Built-in holster securely stores the " +
          "powder cup in the front shield cover lid.",
        requiredWhen: (config) => deweyAdShieldActive(config),
      },
    ],
  },
  {
    id: "dewey_ball_powder_plate",
    name: "Ball Powder Rear Bearing Plate",
    description:
      "Modified rear bearing plate sized for ball powders (CFE223, " +
      "H4350, LeverEvolution). Works with V1 and V2 builds.",
    requiredWhen: (config) => deweyBallPowderActive(config),
    files: [
      {
        id: "dewey_ball_powder_plate_stl",
        filename: "1_V1.V2.RearBackBallPowder_DeweyMod.stl",
        repoPath: `${DEWEY_REAR_REDUCER}/1_V1.V2.RearBackBallPowder_DeweyMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "60° chamfer with no bearing reliefs. Pair with the V2 " +
          "volume reducer + rear door if installing in a V1 trickler. " +
          "Easy to clean with a small blower or paint brush.",
        requiredWhen: (config) => deweyBallPowderActive(config),
      },
    ],
  },
  {
    id: "ian99rt_thicker_discharge",
    name: "ian99rt Thicker Discharge Plate Bundle",
    description:
      "Steeper-angle front discharge plate (+3mm thicker) plus the " +
      "matching shorter cup base. Replaces stock front_discharger_mount " +
      "and cup_base_7mm. Both parts must be printed together.",
    requiredWhen: (config) => ian99rtThickerDischargeActive(config),
    files: [
      {
        id: "ian99rt_thicker_discharge_plate",
        filename: "Front_Discharge_Plate_+3mm_thicker.3MF",
        repoPath: `${IAN99RT}/Front_Discharge_Plate_+3mm_thicker.3MF`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Replaces stock front_discharger_mount. Steeper angle reduces " +
          "powder hanging when the shutter closes (helps with H4350 " +
          "and similar powders).",
        requiredWhen: (config) => ian99rtThickerDischargeActive(config),
      },
      {
        id: "ian99rt_shorter_cup_base",
        filename: "cup_base_3mm_Shorter.3mf",
        repoPath: `${IAN99RT}/cup_base_3mm_Shorter.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Replaces stock cup_base_7mm. Required to fit under the " +
          "thicker discharge plate.",
        requiredWhen: (config) => ian99rtThickerDischargeActive(config),
      },
    ],
  },
  {
    id: "dewey_windowed_front",
    name: "Dewey Windowed Front Body",
    description:
      "Windowed front body with plexiglass panel cutout, plus score-and-snap " +
      "cutting jigs. Final window dimension is 62×38mm.",
    requiredWhen: (config) => deweyWindowedFrontActive(config),
    files: [
      {
        id: "dewey_windowed_front_servo",
        filename: "2a_FrontBodyV2.Windowed_DeweyMod.stl",
        repoPath: `${DEWEY_FRONT_REDUCER}/2a_FrontBodyV2.Windowed_DeweyMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Replaces stock front_body when using servo gates. Pair with a " +
          "2mm plexiglass panel cut to 62×38mm.",
        requiredWhen: (config) =>
          deweyWindowedFrontActive(config) &&
          config.servoGate === true &&
          !ian99rtGearlessActive(config),
      },
      {
        id: "dewey_windowed_front_no_servo",
        filename: "2b_FrontBodyV2.WindowedNoServos_DeweyMod.stl",
        repoPath: `${DEWEY_FRONT_REDUCER}/2b_FrontBodyV2.WindowedNoServos_DeweyMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Replaces stock front_body when not using servo gates.",
        requiredWhen: (config) =>
          deweyWindowedFrontActive(config) && config.servoGate !== true,
      },
      {
        id: "dewey_window_test_piece",
        filename: "2c_Window Test Piece_DeweyMod.stl",
        repoPath: `${DEWEY_FRONT_REDUCER}/2c_Window Test Piece_DeweyMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Optional fit-check piece for the plexiglass window.",
        requiredWhen: (config) => deweyWindowedFrontActive(config),
      },
      {
        id: "plexi_jig_62mm",
        filename: "4b_PlexiJig_62x38mm.stl",
        repoPath: `${DEWEY_FRONT_REDUCER}/4b_PlexiJig_62x38mm.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Final size jig (62×38mm). The one most builders need.",
        requiredWhen: (config) => deweyWindowedFrontActive(config),
      },
      {
        id: "plexi_jig_132mm",
        filename: "4c_PlexiJig_132x38mm.stl",
        repoPath: `${DEWEY_FRONT_REDUCER}/4c_PlexiJig_132x38mm.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Mid-size jig (132×38mm). Use as a step-down from larger sheets.",
        requiredWhen: (config) => deweyWindowedFrontActive(config),
      },
      {
        id: "plexi_jig_182mm",
        filename: "4a_PlexiJig_182x38mm.stl",
        repoPath: `${DEWEY_FRONT_REDUCER}/4a_PlexiJig_182x38mm.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Largest jig (182×38mm). Skip if your sheet is smaller.",
        requiredWhen: (config) => deweyWindowedFrontActive(config),
      },
    ],
  },
  {
    id: "print_tolerance_pack",
    name: "Print Tolerance Tuner Pack",
    description:
      "Spacers and a wider front cover for builds where stock parts fit " +
      "too tightly. Print only the size you need after a test fit — you " +
      "don't need all of them.",
    requiredWhen: (config) => printTolerancePackActive(config),
    files: [
      {
        id: "tolerance_front_cover_wider",
        filename: "1_FrontBodyCover_0.6mmWiderGap.stl",
        repoPath: `${DEWEY_FRONT_REDUCER}/1_FrontBodyCover_0.6mmWiderGap.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Front body cover with a 0.6mm wider gap. Use if your stock " +
          "cover slides on too tightly.",
        requiredWhen: (config) => printTolerancePackActive(config),
      },
      {
        id: "tolerance_volume_spacer_02",
        filename: "3a_FrontVolumeReducerBack_0.2mmSpacer.stl",
        repoPath: `${DEWEY_FRONT_REDUCER}/3a_FrontVolumeReducerBack_0.2mmSpacer.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Volume reducer bearing plate with 0.2mm added thickness.",
        requiredWhen: (config) =>
          printTolerancePackActive(config) &&
          config.volumeReducer === true,
      },
      {
        id: "tolerance_volume_spacer_04",
        filename: "3b_FrontVolumeReducerBack_0.4mmSpacer.stl",
        repoPath: `${DEWEY_FRONT_REDUCER}/3b_FrontVolumeReducerBack_0.4mmSpacer.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Volume reducer bearing plate with 0.4mm added thickness.",
        requiredWhen: (config) =>
          printTolerancePackActive(config) &&
          config.volumeReducer === true,
      },
      {
        id: "tolerance_volume_spacer_06",
        filename: "3c_FrontVolumeReducerBack_0.6mmSpacer.stl",
        repoPath: `${DEWEY_FRONT_REDUCER}/3c_FrontVolumeReducerBack_0.6mmSpacer.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Volume reducer bearing plate with 0.6mm added thickness.",
        requiredWhen: (config) =>
          printTolerancePackActive(config) &&
          config.volumeReducer === true,
      },
      {
        id: "tolerance_door_spacer_02",
        filename: "2a_FrontRearDoor_0.2mm_spacer.stl",
        repoPath: `${DEWEY_REAR_REDUCER}/2a_FrontRearDoor_0.2mm_spacer.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Front/rear door with 0.2mm spacer for tighter fit.",
        requiredWhen: (config) => printTolerancePackActive(config),
      },
      {
        id: "tolerance_door_spacer_04",
        filename: "2b_FrontRearDoor_0.4mm_spacer.stl",
        repoPath: `${DEWEY_REAR_REDUCER}/2b_FrontRearDoor_0.4mm_spacer.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Front/rear door with 0.4mm spacer for tighter fit.",
        requiredWhen: (config) => printTolerancePackActive(config),
      },
      {
        id: "tolerance_door_spacer_06",
        filename: "2c_FrontRearDoor_0.6mm_spacer.stl",
        repoPath: `${DEWEY_REAR_REDUCER}/2c_FrontRearDoor_0.6mm_spacer.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Front/rear door with 0.6mm spacer for tighter fit.",
        requiredWhen: (config) => printTolerancePackActive(config),
      },
    ],
  },
  {
    id: "bearing_test_print",
    name: "Bearing Test Print (recommended first print)",
    description:
      "Small bearing test piece to dial in your X-Y hole compensation " +
      "before committing filament to large parts. Print this first.",
    requiredWhen: () => true,
    files: [
      {
        id: "bearing_test_print_stl",
        filename: "V2.BodyBearingTest_DeweyMod.stl",
        repoPath: `${DEWEY_ROOT}/V2.BodyBearingTest_DeweyMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Start with zero X-Y hole compensation, then adjust based on " +
          "how the bearing fits before printing the full body parts.",
        requiredWhen: () => true,
      },
    ],
  },

  {
    id: "crayons82",
    name: "Crayons82 A&D FX Shield",
    description:
      "Full-build Crayons82 redesign. Upstream recommends printing from STEP " +
      "files when possible for better dimensional accuracy.",
    requiredWhen: (config) => crayons82Active(config),
    files: [
      {
        id: "crayons82_base",
        filename: "BASE.stl",
        repoPath: `${CRAYONS82}/Base/BASE.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_front_body",
        filename: "FRONT BODY.stl",
        repoPath: `${CRAYONS82}/Front body components/FRONT BODY.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_cover",
        filename: "COVER (2).stl",
        repoPath: `${CRAYONS82}/Front body components/COVER (2).stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_dump_shield",
        filename: "DUMP SHIELD.stl",
        repoPath: `${CRAYONS82}/Front body components/DUMP SHIELD.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_front_door",
        filename: "FRONT DOOR.stl",
        repoPath: `${CRAYONS82}/Front body components/FRONT DOOR.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_front_door_clear",
        filename: "FRONT DOOR CLEAR CUTOUT.stl",
        repoPath: `${CRAYONS82}/Front body components/FRONT DOOR CLEAR CUTOUT.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Clear-cutout door variant for acrylic window.",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_led_wire_housing",
        filename: "LED WIRE HOUSING.stl",
        repoPath: `${CRAYONS82}/Front body components/LED WIRE HOUSING.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Insert the LED wire before sliding the front body into place.",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_shutter_left",
        filename: "SHUTTER_LEFT GATE.stl",
        repoPath: `${CRAYONS82}/Front body components/SHUTTER_LEFT GATE.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          crayons82Active(config) && config.servoGate === true,
      },
      {
        id: "crayons82_shutter_right",
        filename: "SHUTTER_RIGHT GATE.stl",
        repoPath: `${CRAYONS82}/Front body components/SHUTTER_RIGHT GATE.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          crayons82Active(config) && config.servoGate === true,
      },
      {
        id: "crayons82_volume_reducer_back",
        filename: "VOLUME REDUCER BACK.stl",
        repoPath: `${CRAYONS82}/Front body components/VOLUME REDUCER BACK.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          crayons82Active(config) && config.volumeReducer === true,
      },
      {
        id: "crayons82_pcb_rear",
        filename: "PBC REAR HOUSING.stl",
        repoPath: `${CRAYONS82}/PCB board components/PBC REAR HOUSING.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Filename typo (PBC) preserved from upstream.",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_pcb_front",
        filename: "PCB FRONT COVER (1).stl",
        repoPath: `${CRAYONS82}/PCB board components/PCB FRONT COVER (1).stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_hopper_funnel",
        filename: "HOPPER FUNNEL.stl",
        repoPath: `${CRAYONS82}/Powder hopper components/HOPPER FUNNEL.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_powder_tube_lid",
        filename: "POWDER TUBE LID.stl",
        repoPath: `${CRAYONS82}/Powder hopper components/POWDER TUBE LID.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_rear_body_interface",
        filename: "REAR BODY INTERFACE.stl",
        repoPath: `${CRAYONS82}/Powder hopper components/REAR BODY INTERFACE.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_coin_weight_adapter",
        filename: "Coin weight adapter.stl",
        repoPath: `${CRAYONS82}/Powder pan/Coin weight adapter.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_scale_post",
        filename: "Scale post.stl",
        repoPath: `${CRAYONS82}/Powder pan/Scale post.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_weight_pan",
        filename: "Weight pan.stl",
        repoPath: `${CRAYONS82}/Powder pan/Weight pan.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_rear_body",
        filename: "REAR BODY.stl",
        repoPath: `${CRAYONS82}/Rear body components/REAR BODY.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_rear_vol_back",
        filename: "REAR VOLUME REDUCER BACK .stl",
        repoPath: `${CRAYONS82}/Rear body components/REAR VOLUME REDUCER BACK .stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Trailing space in filename preserved from upstream.",
        requiredWhen: (config) =>
          crayons82Active(config) && config.volumeReducer === true,
      },
      {
        id: "crayons82_rear_vol_door",
        filename: "REAR VOLUME REDUCER DOOR.stl",
        repoPath: `${CRAYONS82}/Rear body components/REAR VOLUME REDUCER DOOR.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          crayons82Active(config) && config.volumeReducer === true,
      },
      {
        id: "crayons82_rear_vol_front",
        filename: "REAR VOLUME REDUCER FRONT.stl",
        repoPath: `${CRAYONS82}/Rear body components/REAR VOLUME REDUCER FRONT.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          crayons82Active(config) && config.volumeReducer === true,
      },
      {
        id: "crayons82_dump_v77",
        filename: "OPEN TRICKLER V3 v77.stl",
        repoPath: `${CRAYONS82}/Rear powder dump components/OPEN TRICKLER V3 v77.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_powder_cup_emptying",
        filename: "POWDER CUP (EMPTYING).stl",
        repoPath: `${CRAYONS82}/Rear powder dump components/POWDER CUP (EMPTYING).stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_pull_tab",
        filename: "PULL TAB.stl",
        repoPath: `${CRAYONS82}/Rear powder dump components/PULL TAB.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_support_pull_tab",
        filename: "SUPPORT PULL TAB.stl",
        repoPath: `${CRAYONS82}/Rear powder dump components/SUPPORT PULL TAB.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_display_front",
        filename: "DISPLAY FRONT COVER.stl",
        repoPath: `${CRAYONS82}/Screen display components/DISPLAY FRONT COVER.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_display_rear",
        filename: "DISPLAY REAR HOUSING.stl",
        repoPath: `${CRAYONS82}/Screen display components/DISPLAY REAR HOUSING.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_illuminated_knob",
        filename: "ILLUMINATED KNOB.stl",
        repoPath: `${CRAYONS82}/Screen display components/ILLUMINATED KNOB.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_display_support",
        filename: "SUPPORT.stl",
        repoPath: `${CRAYONS82}/Screen display components/SUPPORT.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_shield",
        filename: "SHIELD.stl",
        repoPath: `${CRAYONS82}/Shield/SHIELD.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_fastener",
        filename: "Fastener.stl",
        repoPath: `${CRAYONS82}/Shield/Fastener.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Wire securment fastener for LED wiring.",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_led_keeper",
        filename: "LED keeper.stl",
        repoPath: `${CRAYONS82}/Shield/LED keeper.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_insert_large",
        filename: "LARGE TRICKLER.stl",
        repoPath: `${CRAYONS82}/trickler tube inserts/LARGE TRICKLER.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Screw-in fine-trickler insert. Test-fit before installing the tube.",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_insert_medium",
        filename: "MEDIUM.stl",
        repoPath: `${CRAYONS82}/trickler tube inserts/MEDIUM.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_insert_seal",
        filename: "SEAL.stl",
        repoPath: `${CRAYONS82}/trickler tube inserts/SEAL.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_insert_small",
        filename: "SMALL.stl",
        repoPath: `${CRAYONS82}/trickler tube inserts/SMALL.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_insert_tool",
        filename: "TOOL.stl",
        repoPath: `${CRAYONS82}/trickler tube inserts/TOOL.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
      {
        id: "crayons82_insert_ultra_fine",
        filename: "ULTRA FINE.stl",
        repoPath: `${CRAYONS82}/trickler tube inserts/ULTRA FINE.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => crayons82Active(config),
      },
    ],
  },
  {
    id: "dirtbit",
    name: "dirtbit Rear Body & Display",
    description:
      "Fly Mini 12864 display assembly, rear body, PCB enclosure, adapter " +
      "plate, and easy-clean volume reduction inserts.",
    requiredWhen: (config) => dirtbitActive(config),
    files: [
      {
        id: "dirtbit_display_body",
        filename: "Display_Assy_body.stl",
        repoPath: `${DIRTBIT}/Display_Assy_body.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "For Mellow FLY Mini V1.0 12864 display. Print with support on " +
          "build plate only — see upstream orientation images.",
        requiredWhen: (config) => dirtbitActive(config),
      },
      {
        id: "dirtbit_display_bracket",
        filename: "Display_Assy_bracket.stl",
        repoPath: `${DIRTBIT}/Display_Assy_bracket.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => dirtbitActive(config),
      },
      {
        id: "dirtbit_display_front",
        filename: "Display_Assy_front.stl",
        repoPath: `${DIRTBIT}/Display_Assy_front.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => dirtbitActive(config),
      },
      {
        id: "dirtbit_rear_body",
        filename: "OpenTrickler_RearBody.stl",
        repoPath: `${DIRTBIT}/OpenTrickler_RearBody.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Replaces stock rear_body.",
        requiredWhen: (config) => dirtbitActive(config),
      },
      {
        id: "dirtbit_enclosure_bottom",
        filename: "enclosure_bottom.stl",
        repoPath: `${DIRTBIT}/enclosure_bottom.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Rotate the expansion-board screw terminal 180° and use an M12 " +
          "thread socket. See upstream screw_terminal.png.",
        requiredWhen: (config) => dirtbitActive(config),
      },
      {
        id: "dirtbit_enclosure_top",
        filename: "enclosure_top.stl",
        repoPath: `${DIRTBIT}/enclosure_top.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => dirtbitActive(config),
      },
      {
        id: "dirtbit_adapter_plate",
        filename: "trickler_adapter_plate.stl",
        repoPath: `${DIRTBIT}/trickler_adapter_plate.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Replaces stock trickler_adapter_plate.",
        requiredWhen: (config) => dirtbitActive(config),
      },
      {
        id: "dirtbit_vol_front_body",
        filename: "VolumeReductionInsert_front_body.stl",
        repoPath: `${DIRTBIT}/VolumeReductionInsert_front_body.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          dirtbitActive(config) && config.volumeReducer === true,
      },
      {
        id: "dirtbit_vol_front_cover",
        filename: "VolumeReductionInsert_front_cover.stl",
        repoPath: `${DIRTBIT}/VolumeReductionInsert_front_cover.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          dirtbitActive(config) && config.volumeReducer === true,
      },
      {
        id: "dirtbit_vol_rear_body",
        filename: "VolumeReductionInsert_rear_body.stl",
        repoPath: `${DIRTBIT}/VolumeReductionInsert_rear_body.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          dirtbitActive(config) && config.volumeReducer === true,
      },
      {
        id: "dirtbit_vol_rear_top",
        filename: "VolumeReductionInsert_rear_top.stl",
        repoPath: `${DIRTBIT}/VolumeReductionInsert_rear_top.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          dirtbitActive(config) && config.volumeReducer === true,
      },
    ],
  },
  {
    id: "ian99rt_gearless_shutter",
    name: "ian99rt Gearless Shutter",
    description:
      "Shoulder-bolt / needle-bearing shutters and matching arms. Optional " +
      "one-piece windowed front housing for gearless builds.",
    requiredWhen: (config) => ian99rtGearlessActive(config),
    files: [
      {
        id: "ian99rt_gearless_shutters",
        filename: "LeftandRight_Shutter_Gearless.3mf",
        repoPath: `${IAN99RT}/LeftandRight_Shutter_Gearless.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Replaces stock left/right shutters and spur gears. Uses 2x " +
          "3mm shoulder bolts (M2.5 × 16mm) and 2x HF0306 needle bearings.",
        requiredWhen: (config) => ian99rtGearlessActive(config),
      },
      {
        id: "ian99rt_shutter_arms",
        filename: "Shutter_Arm_R01_X2.3mf",
        repoPath: `${IAN99RT}/Shutter_Arm_R01_X2.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => ian99rtGearlessActive(config),
      },
      {
        id: "ian99rt_gearless_windowed_front",
        filename: "front_body_1pc_for_SquareWindow_and_GearlessShutter_R03.3mf",
        repoPath: `${IAN99RT}/front_body_1pc_for_SquareWindow_and_GearlessShutter_R03.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "One-piece front housing for gearless shutter + 2×38×63mm acrylic " +
          "window. Printable without supports. Uses included servo screws.",
        requiredWhen: (config) =>
          ian99rtGearlessActive(config) &&
          !memphisV2ReplacesCore(config) &&
          !crayons82Active(config),
      },
      {
        id: "ian99rt_dirtbit_screen_bracket",
        filename: "LeftSide_Screen_Bracket_for_dirtBit_Screen_Housing.3mf",
        repoPath: `${IAN99RT}/LeftSide_Screen_Bracket_for_dirtBit_Screen_Housing.3mf`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Optional left-side screen bracket for dirtbit display housing.",
        requiredWhen: (config) =>
          ian99rtGearlessActive(config) && dirtbitActive(config),
      },
    ],
  },
  {
    id: "neopixel_led_mod",
    name: "eamars Neopixel LED Mod",
    description:
      "Replacement parts with Neopixel pockets for A&D FX builds. Based on " +
      "OpenTrickler v2.0.1; see upstream readme for cable prep.",
    requiredWhen: (config) => neopixelModActive(config),
    files: [
      {
        id: "neopixel_front_body",
        filename: "front_body_with_shutter_with_led.stl",
        repoPath: `${NEOPIXEL}/front_body_with_shutter_with_led.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Replaces stock front_body. Route LED cables per upstream guide.",
        requiredWhen: (config) => neopixelModActive(config),
      },
      {
        id: "neopixel_front_discharger",
        filename: "front_discharger_mount_with_led.stl",
        repoPath: `${NEOPIXEL}/front_discharger_mount_with_led.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Replaces stock front_discharger_mount. Install first Neopixel here.",
        requiredWhen: (config) => neopixelModActive(config),
      },
      {
        id: "neopixel_scale_shield",
        filename: "scale_shield_with_led.stl",
        repoPath: `${NEOPIXEL}/scale_shield_with_led.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Replaces stock scale_shield. Cable cutouts for LED wiring.",
        requiredWhen: (config) => neopixelModActive(config),
      },
      {
        id: "neopixel_adapter_plate",
        filename: "trickler_adapter_plate.stl",
        repoPath: `${NEOPIXEL}/trickler_adapter_plate.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => neopixelModActive(config),
      },
      {
        id: "neopixel_vol_bottom",
        filename: "FrontVolumeReductionInsert_Bottom_with_LED.stl",
        repoPath: `${NEOPIXEL}/FrontVolumeReductionInsert_Bottom_with_LED.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          neopixelModActive(config) && config.volumeReducer === true,
      },
      {
        id: "neopixel_vol_top",
        filename: "FrontVolumeReductionInsert_Top_with_LED.stl.stl",
        repoPath: `${NEOPIXEL}/FrontVolumeReductionInsert_Top_with_LED.stl.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Double .stl extension preserved from upstream.",
        requiredWhen: (config) =>
          neopixelModActive(config) && config.volumeReducer === true,
      },
    ],
  },
  {
    id: "dewey_cup_holster",
    name: "Dewey Cup Holster Lid",
    description:
      "Front shield cover lid with integrated powder-cup holster.",
    requiredWhen: (config) => deweyCupHolsterActive(config),
    files: [
      {
        id: "dewey_cup_holster_lid",
        filename: "9_Lid_wCupHolster_DeweyMod.stl",
        repoPath: `${DEWEY_AD_SHIELD}/9_Lid_wCupHolster_DeweyMod.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Replaces stock pan_cover_lid.",
        requiredWhen: (config) => deweyCupHolsterActive(config),
      },
    ],
  },
  {
    id: "hayamini_controller_case",
    name: "HayaminiNL Controller Case",
    description:
      "USB-C controller board enclosure and rear mounting bracket.",
    requiredWhen: (config) =>
      config.communityMods.includes("hayamini_controller_case") &&
      config.controllerVersion === "v2" &&
      !deweyAdShieldActive(config),
    files: [
      {
        id: "hayamini_case_bottom",
        filename: "OpenTrickler controllerboard v2.x case v12 - Case body bottom.stl",
        repoPath: `${HAYAMINI}/OpenTrickler controllerboard v2.x case v12 - Case body bottom.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Needs 4x M3x30 SHCS and 4x M3 nuts.",
        requiredWhen: (config) =>
          config.communityMods.includes("hayamini_controller_case") &&
          config.controllerVersion === "v2" &&
          !deweyAdShieldActive(config),
      },
      {
        id: "hayamini_case_top",
        filename: "OpenTrickler controllerboard v2.x case v12 - Case body top.stl",
        repoPath: `${HAYAMINI}/OpenTrickler controllerboard v2.x case v12 - Case body top.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.communityMods.includes("hayamini_controller_case") &&
          config.controllerVersion === "v2" &&
          !deweyAdShieldActive(config),
      },
      {
        id: "hayamini_case_bracket",
        filename: "OpenTrickler controllerboard v2.x case v12 - Case rear bracket.stl",
        repoPath: `${HAYAMINI}/OpenTrickler controllerboard v2.x case v12 - Case rear bracket.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "2x BHCS M3x10, 2x SHCS M3x12, 2x M3 nut, 2x M3x5x4 heatset into rear_body.",
        requiredWhen: (config) =>
          config.communityMods.includes("hayamini_controller_case") &&
          config.controllerVersion === "v2" &&
          !deweyAdShieldActive(config),
      },
    ],
  },
  {
    id: "hayamini_cable_management",
    name: "HayaminiNL Servo Cable Management",
    description: "Guides servo-gate wires clear of belts and tubes.",
    requiredWhen: (config) =>
      config.communityMods.includes("hayamini_cable_management") &&
      config.servoGate === true,
    files: [
      {
        id: "hayamini_cable_mgmt",
        filename: "OpenTrickler Servogate enhancement - Cable management Servogate.stl",
        repoPath: `${HAYAMINI}/OpenTrickler Servogate enhancement - Cable management Servogate.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Secure with 2x M3x14 SHCS.",
        requiredWhen: (config) =>
          config.communityMods.includes("hayamini_cable_management") &&
          config.servoGate === true,
      },
    ],
  },
  {
    id: "mattyy_p_extended_servo",
    name: "mattyy_p Extended Servo Support",
    description: "Left and right extended servo mounts — not interchangeable.",
    requiredWhen: (config) =>
      config.communityMods.includes("mattyy_p_extended_servo") &&
      config.servoGate === true,
    files: [
      {
        id: "mattyy_servo_left",
        filename: "Extended Servo Support Left.stl",
        repoPath: `${MATTYY_P}/Extended Servo Support Left.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.communityMods.includes("mattyy_p_extended_servo") &&
          config.servoGate === true,
      },
      {
        id: "mattyy_servo_right",
        filename: "Extended Servo Support Right.stl",
        repoPath: `${MATTYY_P}/Extended Servo Support Right.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.communityMods.includes("mattyy_p_extended_servo") &&
          config.servoGate === true,
      },
    ],
  },
  {
    id: "mattyy_p_hollow_tube",
    name: "mattyy_p Hollow Trickler Tube",
    description:
      "Two-piece fine trickler tube: vase-mode insert + outer shell.",
    requiredWhen: (config) =>
      config.communityMods.includes("mattyy_p_hollow_tube"),
    files: [
      {
        id: "mattyy_hollow_outer",
        filename: "Small Trickler Tube Hollow.stl",
        repoPath: `${MATTYY_P}/Small Trickler Tube Hollow.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.communityMods.includes("mattyy_p_hollow_tube"),
      },
      {
        id: "mattyy_hollow_insert",
        filename: "Small Trickler Tube Vase Mode Insert.stl",
        repoPath: `${MATTYY_P}/Small Trickler Tube Vase Mode Insert.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Print in vase mode (brim if needed). Glue into the hollow outer shell.",
        requiredWhen: (config) =>
          config.communityMods.includes("mattyy_p_hollow_tube"),
      },
    ],
  },
  {
    id: "1harrym_water_bottle_adapter",
    name: "1harrym Water Bottle Hopper Adapter",
    description: "Threaded hopper-base replacement for a standard water bottle.",
    requiredWhen: (config) =>
      config.communityMods.includes("1harrym_water_bottle_adapter"),
    files: [
      {
        id: "harrym_water_bottle",
        filename: "OpenTrickler_Waterbootle_Adapter.stl",
        repoPath: `${HARRYM}/OpenTrickler_Waterbootle_Adapter.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Filename typo (Waterbootle) preserved from upstream. Replaces hopper base/body/cap.",
        requiredWhen: (config) =>
          config.communityMods.includes("1harrym_water_bottle_adapter"),
      },
    ],
  },
  {
    id: "golmeth_lee_bottle_adapter",
    name: "Golmeth Lee Bottle Adapter",
    description: "Hopper-base replacement for a Lee powder bottle.",
    requiredWhen: (config) =>
      config.communityMods.includes("golmeth_lee_bottle_adapter"),
    files: [
      {
        id: "golmeth_lee_adapter",
        filename: "LEE-adapter2-final.stl",
        repoPath: `${GOLMETH}/LEE-adapter2-final.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Replaces hopper base/body/cap.",
        requiredWhen: (config) =>
          config.communityMods.includes("golmeth_lee_bottle_adapter"),
      },
    ],
  },
  {
    id: "4numen_phone_holder",
    name: "4numen Phone Holder",
    description: "Phone mount near the trickler for monitoring the web UI.",
    requiredWhen: (config) =>
      config.communityMods.includes("4numen_phone_holder"),
    files: [
      {
        id: "numen_phone_holder",
        filename: "Phone_holder.stl",
        repoPath: `${NUMEN}/Phone_holder.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Prints without supports.",
        requiredWhen: (config) =>
          config.communityMods.includes("4numen_phone_holder"),
      },
    ],
  },
  {
    id: "4numen_jj100b_bumper",
    name: "4numen JJ100B Bumper Pack",
    description:
      "Bumper, positioning ring, and related JJ100B scale-plate helpers.",
    requiredWhen: (config) =>
      config.communityMods.includes("4numen_jj100b_bumper") &&
      config.scaleType === "gg_jj100b",
    files: [
      {
        id: "numen_bumper",
        filename: "JJ100B_Bumper.stl",
        repoPath: `${NUMEN}/JJ100B_Bumper.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Attach ring base to bumper with 1x M3 10mm tapered screw.",
        requiredWhen: (config) =>
          config.communityMods.includes("4numen_jj100b_bumper") &&
          config.scaleType === "gg_jj100b",
      },
      {
        id: "numen_positioning_ring",
        filename: "JJ100B_PossitioningRing.stl",
        repoPath: `${NUMEN}/JJ100B_PossitioningRing.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Filename typo preserved from upstream.",
        requiredWhen: (config) =>
          config.communityMods.includes("4numen_jj100b_bumper") &&
          config.scaleType === "gg_jj100b",
      },
      {
        id: "numen_ring_bumper_base",
        filename: "JJ100B_RingWithBumperBase.stl",
        repoPath: `${NUMEN}/JJ100B_RingWithBumperBase.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.communityMods.includes("4numen_jj100b_bumper") &&
          config.scaleType === "gg_jj100b",
      },
      {
        id: "numen_scales_plate",
        filename: "JJ100B_ScalesPlate.stl",
        repoPath: `${NUMEN}/JJ100B_ScalesPlate.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions:
          "Press-on positioning ring plate. Scale X/Y ±0.01% if the ring is tight.",
        requiredWhen: (config) =>
          config.communityMods.includes("4numen_jj100b_bumper") &&
          config.scaleType === "gg_jj100b",
      },
    ],
  },
];

