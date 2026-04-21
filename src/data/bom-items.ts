import type { BomCategory } from "../types/bom";
import type { BuildConfig } from "../types/config";

function isAdFx(config: BuildConfig): boolean {
  return (
    config.scaleType === "ad_fx120i_300i" ||
    config.scaleType === "gg_jj223bf"
  );
}

function memphisV1Active(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("memphis_v1_ad_shield") &&
    isAdFx(config)
  );
}

function memphisV2Active(config: BuildConfig): boolean {
  return (
    config.communityMods.includes("memphis_v2_ad_lid") &&
    isAdFx(config)
  );
}

function dud3zAltPanActive(config: BuildConfig): boolean {
  return (
    isAdFx(config) && config.communityMods.includes("dud3z_alt_pan")
  );
}

export const BOM_CATEGORIES: BomCategory[] = [
  {
    id: "core_electronics",
    name: "Core Electronics",
    items: [
      {
        id: "pico_2w",
        name: "Raspberry Pi Pico 2W",
        specification: "Pico 2W with wireless",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "Raspberry Pi",
            url: "https://www.raspberrypi.com/products/raspberry-pi-pico-2/?variant=pico-2-w",
            verified: true,
          },
        ],
        notes:
          "First gen Pico W is supported but not recommended. " +
          "Available with or without GPIO headers.",
        requiredWhen: () => true,
      },
      {
        id: "pico_header_pins",
        name: "2.54mm Pitch Header Pins",
        specification: "2x 20-pin single row 2.54mm pitch",
        quantity: 2,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "LCSC",
            url: "https://www.lcsc.com/product-detail/_ZHOURI-_C2977586.html",
            verified: true,
          },
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/3256805561549792.html",
            verified: false,
          },
        ],
        notes: "Cut from a 40-pin header. Only needed if Pico has no pre-soldered headers.",
        requiredWhen: () => true,
      },
      {
        id: "motor_expansion_board",
        name: "Pico Motor Expansion Board",
        specification: "For Raspberry Pi Pico",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "Mellow 3D (AliExpress)",
            url: "https://www.aliexpress.com/item/1005008080766173.html",
            verified: true,
          },
        ],
        requiredWhen: () => true,
      },
      {
        id: "tmc2209_drivers",
        name: "TMC2209 Stepper Motor Driver",
        specification: "StepStick module format",
        quantity: 2,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "Fly TMC2209 (AliExpress)",
            url: "https://www.aliexpress.com/item/1005001877899893.html",
            verified: true,
          },
          {
            vendor: "BigTreeTech TMC2209 (AliExpress)",
            url: "https://www.aliexpress.com/item/33029587820.html",
            verified: true,
            notes: "Listing includes TMC2208 and TMC2209 - select TMC2209",
          },
          {
            vendor: "BigTreeTech (Official)",
            url: "https://biqu.equipment/collections/driver-board/products/bigtreetech-tmc2209-stepper-motor-driver-for-3d-printer-board-vs-tmc2208",
            verified: false,
          },
        ],
        notes: "No standard pinout for StepStick modules - stick to recommended parts.",
        requiredWhen: () => true,
      },
      {
        id: "mini_12864_lcd",
        name: "Mini 12864 LCD Display",
        specification: "Mini 12864 with controller",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "Fly Mini 12864 (AliExpress)",
            url: "https://www.aliexpress.com/item/1005003579276633.html",
            verified: true,
          },
          {
            vendor: "BigTreeTech Mini 12864 (AliExpress)",
            url: "https://www.aliexpress.com/item/1005005114662084.html",
            verified: true,
          },
        ],
        notes: "No standard pinout for mini 12864 displays - stick to recommended parts.",
        requiredWhen: () => true,
      },
      {
        id: "jumper_caps",
        name: "2mm Pitch Jumper Caps",
        specification: "2mm pitch female jumper",
        quantity: 3,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/3256803974952256.html",
            verified: false,
          },
          {
            vendor: "RS-Online",
            url: "https://nz.rs-online.com/web/p/jumpers-shunts/6742404",
            verified: false,
          },
        ],
        notes: "Used for RS232 cable configuration (straight-through vs NULL-modem).",
        requiredWhen: () => true,
      },
      {
        id: "micro_usb_cable",
        name: "Micro USB Data Cable",
        specification: "Standard Micro USB",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/3256805656009583.html",
            verified: false,
          },
        ],
        notes: "Used for Pico firmware programming.",
        requiredWhen: () => true,
      },
    ],
  },
  {
    id: "power_supply",
    name: "Power Supply",
    items: [
      {
        id: "usb_c_pd_30w",
        name: "USB-C PD 30W Power Supply",
        specification: "30W USB-C Power Delivery",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "VOLTME (AliExpress)",
            url: "https://www.aliexpress.com/item/1005004696508238.html",
            verified: false,
          },
        ],
        requiredWhen: (config) => config.controllerVersion === "v2",
      },
      {
        id: "meanwell_lrs_50_24",
        name: "Meanwell LRS-50-24 Power Supply",
        specification: "24V 2A (50W) AC-DC",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "Digikey",
            url: "https://www.digikey.co.nz/en/products/detail/mean-well-usa-inc/LRS-50-24/7705048",
            verified: false,
          },
        ],
        notes: "12V or 24V acceptable. Minimum 2A output to avoid brownout under motor load.",
        requiredWhen: (config) => config.controllerVersion === "v1",
      },
    ],
  },
  {
    id: "motors_motion",
    name: "Motors & Motion",
    items: [
      {
        id: "nema17_motors",
        name: "NEMA17 Stepper Motor",
        specification: "Bipolar 42mm, 5mm shaft, shaft length >20mm",
        quantity: 2,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "Hanpose (AliExpress)",
            url: "https://www.aliexpress.com/item/1005005195056354.html",
            verified: false,
          },
        ],
        notes: "Any bipolar NEMA17 works. Shaft must be 5mm diameter and >20mm long.",
        requiredWhen: () => true,
      },
      {
        id: "gt2_40t_pulleys",
        name: "GT2 40-Tooth Timing Pulley",
        specification: "40T, 5mm bore, 6mm belt width",
        quantity: 2,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/1005002843440540.html",
            verified: false,
          },
        ],
        notes: "Can be 3D printed instead of purchased.",
        requiredWhen: () => true,
      },
      {
        id: "gt2_belt_coarse",
        name: "GT2 Closed Loop Belt (Coarse Tube)",
        specification: "174mm / 87 teeth, 6mm width",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/1005003420172630.html",
            verified: false,
          },
        ],
        notes:
          "Not needed if using TPU printed belts. " +
          "Aftermarket belts need 1 tooth longer (176mm) for easier installation.",
        requiredWhen: (config) => config.beltType === "aftermarket_gt2",
      },
      {
        id: "gt2_belt_fine",
        name: "GT2 Closed Loop Belt (Fine Tube)",
        specification: "166mm / 83 teeth, 6mm width",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/1005003420172630.html",
            verified: false,
          },
        ],
        notes:
          "Not needed if using TPU printed belts. " +
          "Aftermarket belts need 1 tooth longer (168mm) for easier installation.",
        requiredWhen: (config) => config.beltType === "aftermarket_gt2",
      },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    items: [
      {
        id: "rs232_cable_ff",
        name: "RS232 DB9 Cable (Female-Female)",
        specification: "DB9 female to female, straight-through or null-modem",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/3256805572553474.html",
            verified: false,
          },
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/3256805240818006.html",
            verified: false,
          },
        ],
        notes: "Female-to-female required for A&D FX-120i/300i scales.",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" ||
          config.scaleType === "gg_jj223bf",
      },
      {
        id: "rs232_cable_mf",
        name: "RS232 DB9 Cable (Male-Female)",
        specification: "DB9 male to female, straight-through or null-modem",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/3256805572553474.html",
            verified: false,
          },
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/3256805240818006.html",
            verified: false,
          },
        ],
        notes: "Male-to-female required for G&G JJ100B scales.",
        requiredWhen: (config) => config.scaleType === "gg_jj100b",
      },
    ],
  },
  {
    id: "bearings",
    name: "Bearings",
    items: [
      {
        id: "bearing_6801",
        name: "6801-2RS Deep Groove Ball Bearing",
        specification: "12x21x5mm, rubber sealed",
        quantity: 2,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/4000120762936.html",
            verified: true,
            notes: "Select 6801-2RS",
          },
        ],
        notes: "2RS (rubber seal) preferred over ZZ (metal shield).",
        requiredWhen: () => true,
      },
      {
        id: "bearing_6804",
        name: "6804-2RS Deep Groove Ball Bearing",
        specification: "20x32x7mm, rubber sealed",
        quantity: 2,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/4000120762936.html",
            verified: true,
            notes: "Select 6804-2RS",
          },
        ],
        notes: "2RS (rubber seal) preferred over ZZ (metal shield).",
        requiredWhen: () => true,
      },
    ],
  },
  {
    id: "fasteners_core",
    name: "Fasteners - Core OpenTrickler",
    items: [
      {
        id: "heatset_inserts_core",
        name: "Heatset Inserts",
        specification: "M3x5x4mm (M3, OD 5mm, length 4mm)",
        quantity: 18,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/4000232858343.html",
            verified: true,
          },
        ],
        notes:
          "4x bottom of rear body, 4x sides of rear body, " +
          "4x bottom of front body, 2x sides of front body, " +
          "plus 4x additional locations.",
        requiredWhen: () => true,
      },
      {
        id: "m3x8_bhcs_core",
        name: "M3x8 BHCS",
        specification: "M3x8mm Button Head Cap Screw",
        quantity: 8,
        unit: "pcs",
        sourcingLinks: [],
        requiredWhen: () => true,
      },
      {
        id: "m3x12_shcs_core",
        name: "M3x12 SHCS",
        specification: "M3x12mm Socket Head Cap Screw",
        quantity: 2,
        unit: "pcs",
        sourcingLinks: [],
        requiredWhen: () => true,
      },
      {
        id: "m2x8_self_tapping",
        name: "M2x8 Self-Tapping Screws",
        specification: "M2x8mm self-tapping",
        quantity: 4,
        unit: "pcs",
        sourcingLinks: [],
        notes: "For LCD display mounting.",
        requiredWhen: () => true,
      },
      {
        id: "m2_5x3_5_bhcs",
        name: "M2.5x3.5 BHCS",
        specification: "M2.5x3.5mm Button Head Cap Screw",
        quantity: 2,
        unit: "pcs",
        sourcingLinks: [],
        notes: "For spur gear fixing (typically included with servo motors).",
        requiredWhen: (config) => config.servoGate === true,
      },
      {
        id: "shim_washers_core",
        name: "Shim Washers",
        specification: "OD 6mm, ID 3mm, 0.5mm thick",
        quantity: 8,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Used between moving parts to reduce friction.",
        requiredWhen: () => true,
      },
    ],
  },
  {
    id: "fasteners_ad_fx",
    name: "Fasteners - A&D FX Shield",
    items: [
      {
        id: "heatset_inserts_ad",
        name: "Heatset Inserts",
        specification: "M3x5x4mm",
        quantity: 15,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/4000232858343.html",
            verified: true,
          },
        ],
        notes:
          "1x cup base, 1x weighing pan adapter, 8x scale shield, " +
          "3x pan cover, 2x rear discharge cup ring.",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" &&
          !memphisV1Active(config),
      },
      {
        id: "m3x6_bhcs_ad",
        name: "M3x6 BHCS",
        specification: "M3x6mm Button Head Cap Screw",
        quantity: 8,
        unit: "pcs",
        sourcingLinks: [],
        notes:
          "2x weighing pan, 2x powder cup handle, " +
          "2x pan cover locators, 2x rear discharge cup.",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" &&
          !memphisV1Active(config),
      },
      {
        id: "m3x12_shcs_ad",
        name: "M3x12 SHCS",
        specification: "M3x12mm Socket Head Cap Screw",
        quantity: 4,
        unit: "pcs",
        sourcingLinks: [],
        notes: "FX shield lower assembly.",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" &&
          !memphisV1Active(config),
      },
      {
        id: "m3x10_shcs_ad",
        name: "M3x10 SHCS",
        specification: "M3x10mm Socket Head Cap Screw",
        quantity: 8,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Trickler adapter plate to front/rear discharger mounts.",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" &&
          !memphisV1Active(config),
      },
      {
        id: "m3x8_shcs_ad",
        name: "M3x8 SHCS",
        specification: "M3x8mm Socket Head Cap Screw",
        quantity: 7,
        unit: "pcs",
        sourcingLinks: [],
        notes: "4x FX shield general assembly, 3x pan cover lid.",
        requiredWhen: (config) =>
          config.scaleType === "ad_fx120i_300i" &&
          !memphisV1Active(config),
      },
    ],
  },
  {
    id: "fasteners_hopper",
    name: "Fasteners - Powder Hopper",
    items: [
      {
        id: "m3x8_bhcs_hopper",
        name: "M3x8 BHCS",
        specification: "M3x8mm Button Head Cap Screw",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Secures hopper base to rear body interface.",
        requiredWhen: () => true,
      },
      {
        id: "shim_washers_hopper",
        name: "Shim Washers",
        specification: "OD 6mm, ID 3mm, 0.5mm thick",
        quantity: 2,
        unit: "pcs",
        sourcingLinks: [],
        requiredWhen: () => true,
      },
    ],
  },
  {
    id: "scale_accessories",
    name: "Scale Accessories",
    items: [
      {
        id: "ad_pan_weight",
        name: "Pan Weight (Coins)",
        specification: "~100g total weight",
        quantity: 1,
        unit: "set",
        sourcingLinks: [],
        notes:
          "Approximately 100g in coins placed on the weighing pan " +
          "adapter to stabilize readings. Any coins or small weights work.",
        requiredWhen: (config) => config.scaleType === "ad_fx120i_300i",
      },
    ],
  },
  {
    id: "optional_servo_gate",
    name: "Optional - Servo Gate",
    items: [
      {
        id: "servo_mg90s",
        name: "TowerPro MG90s Servo Motor",
        specification: "Full metal gear, 180-degree rotation",
        quantity: 2,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/1005004550692203.html",
            verified: false,
          },
        ],
        notes:
          "Full metal gears and 180-degree rotation recommended. " +
          "Typically ships with M2x8 screws and M2.5x3.5 screw included.",
        requiredWhen: (config) => config.servoGate === true,
      },
      {
        id: "heatset_inserts_servo",
        name: "Heatset Inserts (Servo Gate)",
        specification: "M3x5x4mm",
        quantity: 6,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/4000232858343.html",
            verified: true,
          },
        ],
        notes: "4x bottom, 2x sides of front body for servo hangers.",
        requiredWhen: (config) => config.servoGate === true,
      },
      {
        id: "m3x12_shcs_servo",
        name: "M3x12 SHCS (Servo Gate)",
        specification: "M3x12mm Socket Head Cap Screw",
        quantity: 2,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Securing servo hangers to front body.",
        requiredWhen: (config) => config.servoGate === true,
      },
    ],
  },
  {
    id: "optional_neopixel",
    name: "Optional - Neopixel LEDs",
    items: [
      {
        id: "neopixel_leds",
        name: "Neopixel RGB LEDs",
        specification: "WS2812B compatible, individually addressable",
        quantity: 3,
        unit: "pcs",
        sourcingLinks: [],
        notes: "For status indication lighting on the trickler body.",
        requiredWhen: (config) => config.neopixelLeds === true,
      },
    ],
  },
  {
    id: "memphis_v1",
    name: "Memphis Mod V1 - Parts & Fasteners",
    items: [
      {
        id: "memphis_v1_heatsets",
        name: "Heatset Inserts",
        specification: "M3x5x4mm (M3, OD 5mm, length 4mm)",
        quantity: 24,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress",
            url: "https://www.aliexpress.com/item/4000232858343.html",
            verified: true,
          },
        ],
        notes:
          "8x display bracket, 4x enclosure bottom, " +
          "2x rear discharge cup, plus additional locations.",
        requiredWhen: (config) => memphisV1Active(config),
      },
      {
        id: "memphis_v1_m3_nuts",
        name: "M3 Nuts",
        specification: "Standard M3 hex nut",
        quantity: 4,
        unit: "pcs",
        sourcingLinks: [],
        notes: "For enclosure bottom mounting.",
        requiredWhen: (config) => memphisV1Active(config),
      },
      {
        id: "memphis_v1_m3x6_bhcs",
        name: "M3x6 BHCS",
        specification: "M3x6mm Button Head Cap Screw",
        quantity: 4,
        unit: "pcs",
        sourcingLinks: [],
        notes: "For PCB mounting inside enclosure.",
        requiredWhen: (config) => memphisV1Active(config),
      },
      {
        id: "memphis_v1_m3x10_bhcs",
        name: "M3x10 BHCS",
        specification: "M3x10mm Button Head Cap Screw",
        quantity: 16,
        unit: "pcs",
        sourcingLinks: [],
        notes:
          "Display body to bracket, bracket to scale shield, " +
          "enclosure bottom to scale shield, scale base mounting.",
        requiredWhen: (config) => memphisV1Active(config),
      },
      {
        id: "memphis_v1_m3x10_shcs",
        name: "M3x10 SHCS",
        specification: "M3x10mm Socket Head Cap Screw",
        quantity: 4,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Scale base to scale shield (2x), rear discharger cup (2x).",
        requiredWhen: (config) => memphisV1Active(config),
      },
      {
        id: "memphis_v1_m3x12_shcs",
        name: "M3x12 SHCS",
        specification: "M3x12mm Socket Head Cap Screw",
        quantity: 4,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Rear discharge mount to rear body / scale shield.",
        requiredWhen: (config) => memphisV1Active(config),
      },
      {
        id: "memphis_v1_shot_glass",
        name: "Shot Glass (Powder Cup)",
        specification: "Height 50mm, top diameter 41.6mm",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Standard shot glass serves as the powder cup body.",
        requiredWhen: (config) => memphisV1Active(config),
      },
      {
        id: "memphis_v1_oring",
        name: "O-Ring",
        specification: "35mm diameter",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Optional - can be omitted if the printed cup fit is tight.",
        requiredWhen: (config) => memphisV1Active(config),
      },
      {
        id: "memphis_v1_ws2812b_led",
        name: "WS2812B LED (with cable & connector)",
        specification: "Single WS2812B LED module with wiring",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Uses one of the connectors from the 3D Mellow PCB. Use the DI pin.",
        requiredWhen: (config) => memphisV1Active(config),
      },
      {
        id: "memphis_v1_led_lens",
        name: "LED Lens",
        specification: "13mm diameter",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        notes: "May need filing/sanding to fit. Press into the display front.",
        requiredWhen: (config) => memphisV1Active(config),
      },
      {
        id: "memphis_v1_acrylic_tube",
        name: "Clear Acrylic Tube (Hopper)",
        specification: "Outer diameter 60mm, inner diameter 56mm",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Only needed for the optional acrylic hopper.",
        requiredWhen: (config) =>
          memphisV1Active(config) && config.memphisV1AcrylicHopper,
      },
    ],
  },
  {
    id: "memphis_v2",
    name: "Memphis Mod V2 - Parts & Fasteners",
    items: [
      {
        id: "memphis_v2_heatsets",
        name: "Heatset Inserts",
        specification: "M3xL4xOD5mm",
        quantity: 27,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress (reference)",
            url: "https://fr.aliexpress.com/item/1005006472702418.html",
            verified: false,
          },
        ],
        notes:
          "6x rear body, 4x front body, 6x lid, 4x PCB enclosure, " +
          "7x display (6 for right-button variant).",
        requiredWhen: (config) => memphisV2Active(config),
      },
      {
        id: "memphis_v2_magnets",
        name: "Magnets",
        specification: "8x2mm",
        quantity: 8,
        unit: "pcs",
        sourcingLinks: [],
        notes:
          "4x lid closure, 2x powder bin holder, 2x funnel.",
        requiredWhen: (config) => memphisV2Active(config),
      },
      {
        id: "memphis_v2_m3x8_bhcs",
        name: "M3x8 BHCS",
        specification: "M3x8mm Button Head Cap Screw",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Hopper base to rear body interface.",
        requiredWhen: (config) => memphisV2Active(config),
      },
      {
        id: "memphis_v2_m3x10_bhcs",
        name: "M3x10 BHCS",
        specification: "M3x10mm Button Head Cap Screw",
        quantity: 17,
        unit: "pcs",
        sourcingLinks: [],
        notes:
          "Display to lid, PCB mounting, lid wire cover, " +
          "enclosure to rear body. 6 for right-button display variant.",
        requiredWhen: (config) => memphisV2Active(config),
      },
      {
        id: "memphis_v2_m3x20_bhcs",
        name: "M3x20 BHCS",
        specification: "M3x20mm Button Head Cap Screw",
        quantity: 8,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Front body, rear body, and interface to lid.",
        requiredWhen: (config) => memphisV2Active(config),
      },
      {
        id: "memphis_v2_shim_washers",
        name: "Shim Washers",
        specification: "OD 6mm, ID 3mm, 0.5mm thick",
        quantity: 10,
        unit: "pcs",
        sourcingLinks: [],
        notes: "8x front/rear body shafts, 2x hopper.",
        requiredWhen: (config) => memphisV2Active(config),
      },
      {
        id: "memphis_v2_plexi_sheet",
        name: "Plexiglass Sheet (Front Window)",
        specification: "2mm thickness, 37x62.5mm",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Only needed if printing the acrylic-windowed front cover.",
        requiredWhen: (config) => memphisV2Active(config),
      },
      {
        id: "memphis_v2_acrylic_tube",
        name: "Clear Acrylic Tube (Hopper)",
        specification: "Outer diameter 60mm, inner diameter 56mm",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        notes: "For the Memphis acrylic hopper (replaces printed hopper).",
        requiredWhen: (config) => memphisV2Active(config),
      },
      {
        id: "memphis_v2_shot_glass",
        name: "Shot Glass (Powder Cup)",
        specification: "Height 50mm, top diameter 41.6mm",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        requiredWhen: (config) => memphisV2Active(config),
      },
      {
        id: "memphis_v2_oring",
        name: "O-Ring",
        specification: "35mm diameter",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        notes: "Optional - can be omitted if the printed cup fit is tight.",
        requiredWhen: (config) => memphisV2Active(config),
      },
      {
        id: "memphis_v2_ws2812b",
        name: "WS2812B (Strip or PCB LED)",
        specification: "Single LED or short strip",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [
          {
            vendor: "AliExpress (strip)",
            url: "https://fr.aliexpress.com/item/1005007982624217.html",
            verified: false,
          },
          {
            vendor: "AliExpress (PCB LED)",
            url: "https://fr.aliexpress.com/item/32560280169.html",
            verified: false,
          },
        ],
        notes:
          "Optional. Uses a connector from the 3D Mellow PCB. " +
          "Print Lid_LEDStrip_AddOn if using a strip.",
        requiredWhen: (config) =>
          memphisV2Active(config) && config.neopixelLeds === true,
      },
      {
        id: "memphis_v2_led_wire",
        name: "LED Wire & JST Connector",
        specification: "200mm wire x3, 3-pin JST 2.54mm pitch",
        quantity: 1,
        unit: "set",
        sourcingLinks: [],
        notes: "Only needed if wiring the optional WS2812B.",
        requiredWhen: (config) =>
          memphisV2Active(config) && config.neopixelLeds === true,
      },
    ],
  },
  {
    id: "dud3z_alt_pan",
    name: "Dud3z Alternative Pan",
    items: [
      {
        id: "dud3z_pan_m3_screw",
        name: "M3 Screw (Alt Pan)",
        specification: "M3 screw, minimum length 6mm",
        quantity: 1,
        unit: "pcs",
        sourcingLinks: [],
        notes:
          "Secures the alternative pan to the scale_weighing_pan_adapter.",
        requiredWhen: (config) => dud3zAltPanActive(config),
      },
    ],
  },
];
