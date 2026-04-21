import type { AssemblySection } from "../types/assembly";

const REPO_BASE =
  "https://github.com/eamars/OpenTrickler/blob/main";

export const ASSEMBLY_SECTIONS: AssemblySection[] = [
  {
    id: "electronics_prep",
    title: "Electronics Preparation",
    description:
      "Solder headers to the Pico 2W, configure stepper drivers, and prepare the control board.",
    guideUrl: `${REPO_BASE}/Manual/initialization_guide.md`,
    requiredWhen: () => true,
    steps: [
      {
        id: "solder_pico_headers",
        title: "Solder pin headers to Raspberry Pi Pico 2W",
        description:
          "Solder 2x 40-pin 2.54mm pitch headers to the Pico board.",
      },
      {
        id: "configure_drivers",
        title: "Configure TMC2209 stepper drivers",
        description:
          "Install jumper caps on the motor expansion board. Verify driver pin alignment before inserting.",
      },
      {
        id: "install_pico",
        title: "Install Pico on motor expansion board",
        description:
          "Seat the Pico 2W onto the motor expansion board headers. Ensure correct orientation.",
      },
      {
        id: "connect_display",
        title: "Connect Mini 12864 LCD",
        description:
          "Attach the display module to the control board via ribbon cables.",
      },
      {
        id: "flash_firmware",
        title: "Flash firmware",
        description:
          "Download and flash the OpenTrickler RP2040 firmware via USB.",
      },
    ],
  },
  {
    id: "trickler_assembly",
    title: "OpenTrickler Core Assembly",
    description:
      "Assemble the main trickler body, install bearings, motors, and rotary tubes.",
    guideUrl: `${REPO_BASE}/Manual/assembly.md`,
    requiredWhen: () => true,
    steps: [
      {
        id: "install_heatsets_body",
        title: "Install heatset inserts into trickler body",
        description:
          "Use a soldering iron to press M3x5x4 heatset inserts into all marked positions on the front and rear body.",
      },
      {
        id: "install_bearings",
        title: "Install bearings",
        description:
          "Press 6801-2RS bearings into the front body and 6804-2RS bearings into the rear body. Use the printed bearing insertion tools.",
      },
      {
        id: "assemble_rotary_tubes",
        title: "Assemble rotary tubes",
        description:
          "Insert the large rotary tube and chosen small rotary tube (flow rate variant) into the bearings.",
      },
      {
        id: "install_motors",
        title: "Mount NEMA17 stepper motors",
        description:
          "Attach motors to the rear body with M3 screws. Install GT2 40T pulleys on motor shafts.",
      },
      {
        id: "install_belts",
        title: "Install timing belts",
        description:
          "Route the coarse belt (174mm/87T) and fine belt (166mm/83T) around the pulleys and tubes.",
      },
      {
        id: "close_body",
        title: "Close the trickler body",
        description:
          "Attach the front body to the rear body. Install access doors and cover plates.",
      },
    ],
  },
  {
    id: "servo_gate_assembly",
    title: "Servo Gate Installation",
    description:
      "Install servo motors, shutter gears, and gate hangers on the trickler tubes.",
    guideUrl: `${REPO_BASE}/Manual/assembly.md`,
    requiredWhen: (c) => c.servoGate === true,
    steps: [
      {
        id: "mount_servos",
        title: "Mount MG90s servos",
        description:
          "Attach servo motors to the printed servo hangers on both trickler tubes.",
      },
      {
        id: "install_shutters",
        title: "Install shutter gears",
        description:
          "Attach the printed spur gears and shutter assemblies to the servo arms.",
      },
      {
        id: "wire_servos",
        title: "Wire servos to control board",
        description:
          "Connect servo signal and power cables to the designated pins on the motor expansion board.",
      },
    ],
  },
  {
    id: "ad_shield_assembly",
    title: "A&D FX Shield Assembly",
    description:
      "Assemble and install the windshield, powder cup, and discharge system for the A&D FX scale.",
    guideUrl: `${REPO_BASE}/STL/A%26D%20FX%20Shield/README.md`,
    requiredWhen: (c) =>
      c.scaleType === "ad_fx120i_300i" ||
      c.scaleType === "gg_jj223bf",
    steps: [
      {
        id: "ad_install_heatsets",
        title: "Install heatset inserts into shield",
        description:
          "Press 15x M3x5x4 heatset inserts into the shield body and adapters.",
      },
      {
        id: "ad_assemble_shield",
        title: "Assemble shield body",
        description:
          "Attach the shield to the scale base adapter ring. Install the pan cover.",
      },
      {
        id: "ad_install_cup",
        title: "Assemble powder cup",
        description:
          "Attach the cup handle to the cup body. Place on the weighing pan adapter.",
      },
      {
        id: "ad_install_discharge",
        title: "Install discharge system",
        description:
          "Mount the front and rear discharge cups with sliding door. Connect to the trickler output.",
      },
      {
        id: "ad_add_pan_weight",
        title: "Add pan counterweight",
        description:
          "Place ~100g in coins inside the pan cover to meet the minimum weighing pan weight requirement.",
      },
    ],
  },
  {
    id: "gg_housing_assembly",
    title: "G&G JJ100B Housing Assembly",
    description:
      "Assemble and install the housing, powder cup, and discharge system for the G&G JJ100B scale.",
    guideUrl: `${REPO_BASE}/STL/G%26G%20JJ100B%20housing/README.md`,
    requiredWhen: (c) => c.scaleType === "gg_jj100b",
    steps: [
      {
        id: "gg_assemble_housing",
        title: "Assemble housing body",
        description:
          "Attach the body cover to the baseplate. Install the scale plate.",
      },
      {
        id: "gg_install_cup",
        title: "Install powder cup and discharge",
        description:
          "Mount the cup and discharge cup with sliding door on the housing.",
      },
    ],
  },
  {
    id: "hopper_assembly",
    title: "Powder Hopper Assembly",
    description:
      "Assemble the powder hopper and attach it to the trickler rear body.",
    guideUrl: `${REPO_BASE}/STL/Powder%20Hopper/README.md`,
    requiredWhen: () => true,
    steps: [
      {
        id: "hopper_assemble",
        title: "Assemble hopper",
        description:
          "Stack the hopper base, body (your chosen height), and cap. Secure with M3x8 BHCS and shim washers.",
      },
      {
        id: "hopper_mount",
        title: "Mount hopper to trickler",
        description:
          "Attach the rear body interface piece to the hopper base, then mount to the trickler rear body.",
      },
    ],
  },
  {
    id: "scale_connection",
    title: "Scale Communication Setup",
    description:
      "Connect the scale to the controller via RS232 and configure the serial parameters.",
    guideUrl: `${REPO_BASE}/Manual/initialization_guide.md`,
    requiredWhen: () => true,
    steps: [
      {
        id: "connect_rs232",
        title: "Connect RS232 cable",
        description:
          "Connect the DB9 RS232 cable between the scale and the control board.",
      },
      {
        id: "configure_scale_comms",
        title: "Configure scale communication",
        description:
          "Set baud rate and protocol settings on both the scale and in the OpenTrickler firmware.",
      },
    ],
  },
  {
    id: "initialization",
    title: "System Initialization",
    description:
      "Power on, validate LED status, test motors, and verify scale communication.",
    guideUrl: `${REPO_BASE}/Manual/initialization_guide.md`,
    requiredWhen: () => true,
    steps: [
      {
        id: "first_power",
        title: "First power-on",
        description:
          "Connect power and verify LED status indicators. Check display shows the main menu.",
      },
      {
        id: "test_motors",
        title: "Test motors via Cleanup Mode",
        description:
          "Run Cleanup Mode to verify both motors spin correctly and in the right direction.",
      },
      {
        id: "verify_scale",
        title: "Verify scale communication",
        description:
          "Confirm the display shows live weight readings from the scale.",
      },
    ],
  },
  {
    id: "memphis_v1_assembly",
    title: "Memphis Mod V1 Assembly",
    description:
      "Assemble the Memphis V1 A&D FX shield, display mount, PCB enclosure, " +
      "and rear discharge system.",
    guideUrl:
      "https://github.com/eamars/OpenTrickler/blob/main/CommunityContributions/Memphis/V1/readme.md",
    requiredWhen: (c) =>
      c.communityMods.includes("memphis_v1_ad_shield") &&
      (c.scaleType === "ad_fx120i_300i" ||
        c.scaleType === "gg_jj223bf"),
    steps: [
      {
        id: "memphis_v1_heatsets",
        title: "Install heatset inserts",
        description:
          "Press 24x M3x5x4 heatsets into the Memphis parts: 8x display bracket, " +
          "4x enclosure bottom, 4x display front, 2x rear discharge cup, " +
          "plus additional locations per the upstream guide.",
      },
      {
        id: "memphis_v1_rear_discharge",
        title: "Assemble rear discharge mount",
        description:
          "Use 4x M3x12 SHCS to join the rear_discharge_mount to the " +
          "rear_body_without_holes and the scale_shield.",
      },
      {
        id: "memphis_v1_display",
        title: "Assemble display module",
        description:
          "Join display_assy_body to display_assy_bracket with 4x M3x10 BHCS, " +
          "then attach display_assy_front with 4x M3x12 SHCS. Mount to scale_shield " +
          "with 4x M3x10 BHCS. Route display cables along the bracket.",
      },
      {
        id: "memphis_v1_led",
        title: "Install WS2812B LED",
        description:
          "Wire a WS2812B LED using a connector from the 3D Mellow PCB (use the DI pin). " +
          "Fit the 13mm lens into the display front, filing to tolerance if needed.",
      },
      {
        id: "memphis_v1_pcb_enclosure",
        title: "Assemble PCB enclosure",
        description:
          "Press 4x heatsets into enclosure_bottom. Attach to scale_shield with " +
          "4x M3x10 BHCS and 4x M3 nuts. Route cables, then secure the PCB with " +
          "4x M3x6 BHCS. Snap on enclosure_top.",
      },
      {
        id: "memphis_v1_scale_base",
        title: "Mount scale base",
        description:
          "Attach scale_base to scale_shield with 4x M3x10 SHCS and 2x M3x10 BHCS.",
      },
      {
        id: "memphis_v1_cup",
        title: "Assemble powder cup",
        description:
          "Use the shot glass (50mm tall, 41.6mm top diameter) as the cup body. " +
          "Attach to powder_cup_handle. Add the 35mm o-ring if the fit is loose.",
      },
      {
        id: "memphis_v1_rear_cup",
        title: "Assemble rear discharger cup",
        description:
          "Press 2x heatsets into rear_discharge_cup_ring. Secure rear_discharger_cup " +
          "with 2x M3x10 SHCS.",
      },
      {
        id: "memphis_v1_acrylic_hopper",
        title: "Install acrylic hopper (optional)",
        description:
          "Fit the clear acrylic tube (60mm OD / 56mm ID) between hopper_base_plexi " +
          "and hopper_cap.",
      },
    ],
  },
  {
    id: "memphis_v2_assembly",
    title: "Memphis Mod V2 Assembly",
    description:
      "Assemble the Memphis V2 redesigned lid, front and rear body, display mount, " +
      "PCB enclosure, powder bin, and funnel.",
    guideUrl:
      "https://github.com/eamars/OpenTrickler/blob/main/CommunityContributions/Memphis/V2/readme.md",
    requiredWhen: (c) =>
      c.communityMods.includes("memphis_v2_ad_lid") &&
      (c.scaleType === "ad_fx120i_300i" ||
        c.scaleType === "gg_jj223bf"),
    steps: [
      {
        id: "memphis_v2_heatsets",
        title: "Install heatset inserts",
        description:
          "Press 27x M3xL4xOD5 heatsets: 6x rear body, 4x front body, 6x lid, " +
          "4x PCB enclosure, 7x display (6 for right-button variant).",
      },
      {
        id: "memphis_v2_rear_body",
        title: "Assemble rear body",
        description:
          "Install 6804 and 6801 bearings, NEMA 17 steppers, 40-tooth GT2 pulleys, " +
          "and GT2 belts (166mm and 174mm) into RearBodyWithoutHolesOnTheLeft. " +
          "Fasten with 8x M3x8 BHCS and 8x shim washers.",
      },
      {
        id: "memphis_v2_front_body",
        title: "Assemble front body",
        description:
          "Install 6804 and 6801 bearings into FrontBodyWhitoutServoWithAcrylic. " +
          "Fit the 2mm x 37x62.5mm plexiglass window if using the acrylic variant.",
      },
      {
        id: "memphis_v2_interface",
        title: "Assemble interface",
        description:
          "Print Interface or InterfaceWithServos (match your servo gate choice). " +
          "Attach InterfaceFrontFlap and InterfaceRearFlap.",
      },
      {
        id: "memphis_v2_lid",
        title: "Mount lid",
        description:
          "Install 6 heatsets and 4 magnets in Lid_NoServos or Lid_Servos. " +
          "Join front body, rear body, and interface to the lid with 8x M3x20 BHCS.",
      },
      {
        id: "memphis_v2_display",
        title: "Assemble display",
        description:
          "Install heatsets in the display back (7x for left-button, 6x for right-button). " +
          "Fasten the Mini 12864 with 4x M3x10 BHCS. Mount to the lid with 3x M3x10 BHCS " +
          "(2x for right-button variant). Route cables through to the back.",
      },
      {
        id: "memphis_v2_pcb_enclosure",
        title: "Assemble PCB enclosure",
        description:
          "Install 4x heatsets in Enclosure. Mount to the rear body with 2x M3x8 BHCS. " +
          "Route all cables, connect to PCB, secure PCB with 4x M3x10 BHCS. " +
          "Test the trickler, then close with Enclosure_Lid.",
      },
      {
        id: "memphis_v2_close_lid",
        title: "Close the lid",
        description:
          "Install Lid_WireCover, SmallCableLock, and BigCableBlock with 6x M3x10 BHCS.",
      },
      {
        id: "memphis_v2_hopper",
        title: "Install acrylic hopper",
        description:
          "Fit the clear acrylic tube (60mm OD / 56mm ID) between HopperBasePlexi " +
          "and HopperCap. Attach RearBodyInterfaceModified. Secure with 1x M3x8 BHCS " +
          "and 2x shim washers.",
      },
      {
        id: "memphis_v2_powder_bin",
        title: "Assemble powder bin and funnel",
        description:
          "Place 2 magnets in PowderBinBracket and glue to PowderBin. " +
          "Place 2 magnets in Funnel33mm. The 33mm funnel matches a 41.6mm shot glass.",
      },
      {
        id: "memphis_v2_cup",
        title: "Assemble powder cup and cup stop",
        description:
          "Use the shot glass (50mm tall, 41.6mm top diameter) with PowderCuphandle. " +
          "Add the 35mm o-ring if loose. Glue CupStop with a school glue stick.",
      },
      {
        id: "memphis_v2_led",
        title: "Install WS2812B LED (optional)",
        description:
          "If using a WS2812B, wire with 3x 200mm leads and a 3-pin 2.54mm JST " +
          "connector. Position the LED and route wires to the back. " +
          "Print Lid_LEDStrip_AddOn if using a strip.",
      },
    ],
  },
  {
    id: "dud3z_alt_pan_assembly",
    title: "Dud3z Alternative Pan",
    description:
      "Install the Dud3z debris-resistant weighing pan on the A&D FX scale.",
    guideUrl:
      "https://github.com/eamars/OpenTrickler/blob/main/CommunityContributions/Dud3z/readme.md",
    requiredWhen: (c) =>
      c.communityMods.includes("dud3z_alt_pan") &&
      (c.scaleType === "ad_fx120i_300i" ||
        c.scaleType === "gg_jj223bf"),
    steps: [
      {
        id: "dud3z_install_heatset",
        title: "Install heatset in pan adapter",
        description:
          "Melt an M3 brass insert into the stock scale_weighing_pan_adapter.",
      },
      {
        id: "dud3z_mount_adapter",
        title: "Mount adapter to load cell",
        description:
          "Place the scale_weighing_pan_adapter onto the load cell of the A&D FX scale.",
      },
      {
        id: "dud3z_secure_pan",
        title: "Secure alternative pan",
        description:
          "Fasten the Dud3z pan to the adapter with an M3 screw (min 6mm). " +
          "Confirm the pan sits level and clears the scale housing and draft shield.",
      },
    ],
  },
  {
    id: "tuning",
    title: "PID Tuning & Calibration",
    description:
      "Create powder profiles and tune PID parameters for accurate dispensing.",
    guideUrl: `${REPO_BASE}/Manual/tuning_guide.md`,
    requiredWhen: () => true,
    steps: [
      {
        id: "create_profile",
        title: "Create powder profile",
        description:
          "Set up a new profile via the web interface for your powder type.",
      },
      {
        id: "tune_coarse",
        title: "Tune coarse trickler",
        description:
          "Adjust coarse trickler PID parameters. Target: coarse phase completes in under 10 seconds.",
      },
      {
        id: "tune_fine",
        title: "Tune fine trickler",
        description:
          "Adjust fine trickler PID parameters and stop threshold. Target: fine phase completes in under 15 seconds.",
      },
      {
        id: "tune_servos",
        title: "Tune servo gates",
        description:
          "Adjust servo open/close positions and timing via the web interface.",
      },
    ],
  },
];
