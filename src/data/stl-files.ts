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

function ian99rtThickerDischargeActive(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("ian99rt_thicker_discharge") &&
    isAdFx(config)
  );
}

function deweyWindowedFrontActive(config: BuildConfig): boolean {
  return config.communityMods.includes("dewey_windowed_front");
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
        requiredWhen: (config) => !memphisV2ReplacesCore(config),
      },
      {
        id: "front_body_cover",
        filename: "front_body_cover.stl",
        repoPath: `${CORE}/front_body_cover.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => !memphisV2ReplacesCore(config),
      },
      {
        id: "rear_body",
        filename: "rear_body.stl",
        repoPath: `${CORE}/rear_body.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          !memphisV1ReplacesAdFxPart(config) &&
          !memphisV2ReplacesCore(config),
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
        requiredWhen: (config) => config.servoGate === true,
      },
      {
        id: "right_servo_hanger",
        filename: "right_servo_hanger.stl",
        repoPath: `${SERVO}/right_servo_hanger.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.servoGate === true,
      },
      {
        id: "left_shutter",
        filename: "left_shutter.stl",
        repoPath: `${SERVO}/left_shutter.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.servoGate === true,
      },
      {
        id: "right_shutter",
        filename: "right_shutter.stl",
        repoPath: `${SERVO}/right_shutter.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.servoGate === true,
      },
      {
        id: "spur_gear",
        filename: "spur_gear_x2.stl",
        repoPath: `${SERVO}/spur_gear_x2.stl`,
        printQuantity: 2,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.servoGate === true,
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
          !deweyAdShieldActive(config),
      },
      {
        id: "ad_trickler_adapter_plate",
        filename: "trickler_adapter_plate.stl",
        repoPath: `${AD_FX}/trickler_adapter_plate.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) && !deweyAdShieldActive(config),
      },
      {
        id: "ad_scale_base_adapter_ring",
        filename: "scale_base_adapter_ring.stl",
        repoPath: `${AD_FX}/scale_base_adapter_ring.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) && !memphisV1ReplacesAdFxPart(config),
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
          isAdFx(config) && !deweyAdShieldActive(config),
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
          !ian99rtThickerDischargeActive(config),
      },
      {
        id: "ad_powder_cup_body",
        filename: "powder_cup_body.stl",
        repoPath: `${AD_FX}/powder_cup_body.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => isAdFx(config),
      },
      {
        id: "ad_powder_cup_handle",
        filename: "powder_cup_handle.stl",
        repoPath: `${AD_FX}/powder_cup_handle.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) && !memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "ad_front_discharger_mount",
        filename: "front_discharger_mount.stl",
        repoPath: `${AD_FX}/front_discharger_mount.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) && !ian99rtThickerDischargeActive(config),
      },
      {
        id: "ad_rear_discharge_mount",
        filename: "rear_discharge_mount.stl",
        repoPath: `${AD_FX}/rear_discharge_mount.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) && !memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "ad_rear_discharger_cup",
        filename: "rear_discharger_cup.stl",
        repoPath: `${AD_FX}/rear_discharger_cup.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) && !memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "ad_rear_discharge_cup_ring",
        filename: "rear_discharge_cup_ring.stl",
        repoPath: `${AD_FX}/rear_discharge_cup_ring.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) && !memphisV1ReplacesAdFxPart(config),
      },
      {
        id: "ad_rear_discharger_sliding_door",
        filename: "rear_discharger_sliding_door.stl",
        repoPath: `${AD_FX}/rear_discharger_sliding_door.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          isAdFx(config) && !memphisV1ReplacesAdFxPart(config),
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
        requiredWhen: (config) => !memphisV1HopperActive(config),
      },
      {
        id: "hopper_body_100mm",
        filename: "hopper_body_100mm.stl",
        repoPath: `${HOPPER}/hopper_body_100mm.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          !memphisV1HopperActive(config) &&
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
          config.hopperHeight === "200mm",
      },
      {
        id: "hopper_cap",
        filename: "hopper_cap.stl",
        repoPath: `${HOPPER}/hopper_cap.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Print in vase mode with 0.8mm wall for best results.",
        requiredWhen: (config) => !memphisV1HopperActive(config),
      },
      {
        id: "rear_body_interface",
        filename: "rear_body_interface.stl",
        repoPath: `${HOPPER}/rear_body_interface.stl`,
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: () => true,
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
    id: "plexi_cutting_jigs",
    name: "Plexi Cutting Jigs (for Windowed Front)",
    description:
      "Score-and-snap jigs for cutting the plexiglass window panel by " +
      "hand. Three sizes — print whichever matches your plexiglass sheet. " +
      "Final window dimension is 62×38mm.",
    requiredWhen: (config) => deweyWindowedFrontActive(config),
    files: [
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
];
