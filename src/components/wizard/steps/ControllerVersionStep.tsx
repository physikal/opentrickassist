import { StepLayout } from "../StepLayout";
import { OptionCard } from "../OptionCard";
import { useAppStore } from "../../../store";
import { Cpu } from "lucide-react";

export function ControllerVersionStep() {
  const controllerVersion = useAppStore(
    (s) => s.config.controllerVersion,
  );
  const setControllerVersion = useAppStore(
    (s) => s.setControllerVersion,
  );

  return (
    <StepLayout
      title="Controller Version"
      description="The controller version determines the power supply type and fine trickler gear ratio."
    >
      <div className="space-y-3">
        <OptionCard
          title="v2.x (USB-C Power Delivery)"
          description="Current recommended version. Uses a standard USB-C PD 30W charger for power. Simpler wiring, active development. Fine trickler gear ratio: 1.818."
          selected={controllerVersion === "v2"}
          onSelect={() => setControllerVersion("v2")}
          recommended
          icon={<Cpu className="h-5 w-5" />}
        />
        <OptionCard
          title="v1.x (12/24V PSU)"
          description="Legacy version using a Meanwell LRS-50-24 or similar power supply. Still functional but no longer the primary development target. Fine trickler gear ratio: 2.105."
          selected={controllerVersion === "v1"}
          onSelect={() => setControllerVersion("v1")}
          icon={<Cpu className="h-5 w-5" />}
        />
      </div>
    </StepLayout>
  );
}
