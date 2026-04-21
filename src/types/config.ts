export type ScaleType = "ad_fx120i_300i" | "gg_jj100b" | "gg_jj223bf";
export type ControllerVersion = "v1" | "v2";
export type FlowRate = "low" | "mid" | "high";
export type HopperHeight = "100mm" | "150mm" | "200mm";
export type BeltType = "tpu_printed" | "aftermarket_gt2";
export type MemphisV2Display = "bigtreetech" | "fly_left" | "fly_right";

export type CommunityModId =
  | "memphis_v1_ad_shield"
  | "memphis_v2_ad_lid"
  | "crayons82_ad_shield"
  | "dirtbit_rear_body_mod"
  | "dud3z_alt_pan"
  | "hayamini_controller_case"
  | "hayamini_cable_management"
  | "neopixel_led_mod"
  | "ian99rt_gearless_shutter"
  | "mattyy_p_extended_servo"
  | "mattyy_p_hollow_tube"
  | "1harrym_water_bottle_adapter"
  | "golmeth_lee_bottle_adapter"
  | "4numen_phone_holder"
  | "4numen_jj100b_bumper"
  | "dewey_windowed_front"
  | "dewey_cup_holster";

export interface BuildConfig {
  scaleType: ScaleType | null;
  controllerVersion: ControllerVersion | null;
  flowRate: FlowRate | null;
  servoGate: boolean | null;
  volumeReducer: boolean | null;
  hopperHeight: HopperHeight | null;
  beltType: BeltType | null;
  communityMods: CommunityModId[];
  neopixelLeds: boolean | null;
  memphisV2Display: MemphisV2Display | null;
  memphisV1AcrylicHopper: boolean;
}

export const INITIAL_CONFIG: BuildConfig = {
  scaleType: null,
  controllerVersion: null,
  flowRate: null,
  servoGate: null,
  volumeReducer: null,
  hopperHeight: null,
  beltType: null,
  communityMods: [],
  neopixelLeds: null,
  memphisV2Display: null,
  memphisV1AcrylicHopper: false,
};

export function isMemphisCompatibleScale(
  scaleType: ScaleType | null,
): boolean {
  return (
    scaleType === "ad_fx120i_300i" || scaleType === "gg_jj223bf"
  );
}
