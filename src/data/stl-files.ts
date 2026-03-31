import type { StlGroup } from "../types/stl";

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
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: () => true,
      },
      {
        id: "front_body_cover",
        filename: "front_body_cover.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: () => true,
      },
      {
        id: "rear_body",
        filename: "rear_body.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: () => true,
      },
      {
        id: "front_rear_door",
        filename: "front_rear_door_x2.stl",
        printQuantity: 2,
        material: "abs_asa_petg",
        requiredWhen: () => true,
      },
      {
        id: "large_rotary_tube",
        filename: "large_rotary_tube.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: () => true,
      },
      {
        id: "small_rotary_tube_low_flow",
        filename: "small_rotary_tube_low_flow.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.flowRate === "low" || config.flowRate === null,
      },
      {
        id: "small_rotary_tube_mid_flow",
        filename: "small_rotary_tube_mid_flow.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.flowRate === "mid",
      },
      {
        id: "small_rotary_tube_high_flow",
        filename: "small_rotary_tube_high_flow.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.flowRate === "high",
      },
      {
        id: "gt2_40t_pulley",
        filename: "40_teeth_gt2_pulley_x2.stl",
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
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.servoGate === true,
      },
      {
        id: "right_servo_hanger",
        filename: "right_servo_hanger.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.servoGate === true,
      },
      {
        id: "left_shutter",
        filename: "left_shutter.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.servoGate === true,
      },
      {
        id: "right_shutter",
        filename: "right_shutter.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.servoGate === true,
      },
      {
        id: "spur_gear",
        filename: "spur_gear_x2.stl",
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
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.volumeReducer === true,
      },
      {
        id: "front_volume_insert_bottom",
        filename: "FrontVolumeReductionInsert_Bottom.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.volumeReducer === true,
      },
      {
        id: "rear_volume_insert_top",
        filename: "RearVolumeReductionInsert_Top.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.volumeReducer === true,
      },
      {
        id: "rear_volume_insert_bottom",
        filename: "RearVolumeReductionInsert_Bottom.stl",
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
    requiredWhen: (config) =>
      config.scaleType === "ad_fx120i_300i" ||
      config.scaleType === "gg_jj223bf",
    files: [
      {
        id: "ad_scale_shield",
        filename: "scale_shield.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_trickler_adapter_plate",
        filename: "trickler_adapter_plate.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_scale_base_adapter_ring",
        filename: "scale_base_adapter_ring.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_scale_weighing_pan_adapter",
        filename: "scale_weighing_pan_adapter.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_weighing_pan_27mm",
        filename: "weighing_pan_27mm.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_scale_pan_cover",
        filename: "scale_pan_cover.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_pan_cover",
        filename: "pan_cover.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_pan_cover_lid",
        filename: "pan_cover_lid.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_cup_base_7mm",
        filename: "cup_base_7mm.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_powder_cup_body",
        filename: "powder_cup_body.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_powder_cup_handle",
        filename: "powder_cup_handle.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_front_discharger_mount",
        filename: "front_discharger_mount.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_rear_discharge_mount",
        filename: "rear_discharge_mount.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_rear_discharger_cup",
        filename: "rear_discharger_cup.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_rear_discharge_cup_ring",
        filename: "rear_discharge_cup_ring.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "ad_rear_discharger_sliding_door",
        filename: "rear_discharger_sliding_door.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
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
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_body",
        filename: "JJ100B_Body.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_body_cover",
        filename: "JJ100B_Body-cover.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_scale_plate",
        filename: "JJ100B_Scale-plate.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_ring",
        filename: "JJ100B_Ring.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_cup",
        filename: "JJ100B_Cup.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_discharger_cup",
        filename: "JJ100B_Discharger_cup.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_discharger_cup_ring",
        filename: "JJ100B_Discharger_cup_ring.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_discharger_mount",
        filename: "JJ100B_Discharger_mount.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_front_discharger_mount",
        filename: "JJ100B_Front_discharger_mount.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
      {
        id: "gg_discharger_sliding_door",
        filename: "JJ100B_Discharger_sliding_door.stl",
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
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: () => true,
      },
      {
        id: "hopper_body_100mm",
        filename: "hopper_body_100mm.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) =>
          config.hopperHeight === "100mm" || config.hopperHeight === null,
      },
      {
        id: "hopper_body_150mm",
        filename: "hopper_body_150mm.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.hopperHeight === "150mm",
      },
      {
        id: "hopper_body_200mm",
        filename: "hopper_body_200mm.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        requiredWhen: (config) => config.hopperHeight === "200mm",
      },
      {
        id: "hopper_cap",
        filename: "hopper_cap.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Print in vase mode with 0.8mm wall for best results.",
        requiredWhen: () => true,
      },
      {
        id: "rear_body_interface",
        filename: "rear_body_interface.stl",
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
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Used to press 6801-2RS bearings into housings.",
        requiredWhen: () => true,
      },
      {
        id: "6801_bearing_eject",
        filename: "6801_bearing_eject_helper.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Used to remove 6801-2RS bearings from housings.",
        requiredWhen: () => true,
      },
      {
        id: "6804_bearing_press",
        filename: "6804_bearing_press_helper.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Used to press 6804-2RS bearings into housings.",
        requiredWhen: () => true,
      },
      {
        id: "6804_bearing_eject",
        filename: "6804_bearing_eject_helper.stl",
        printQuantity: 1,
        material: "abs_asa_petg",
        specialInstructions: "Used to remove 6804-2RS bearings from housings.",
        requiredWhen: () => true,
      },
    ],
  },
];
