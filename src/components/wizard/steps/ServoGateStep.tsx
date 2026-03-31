import { StepLayout } from "../StepLayout";
import { OptionCard } from "../OptionCard";
import { useAppStore } from "../../../store";
import { Zap } from "lucide-react";

export function ServoGateStep() {
  const servoGate = useAppStore((s) => s.config.servoGate);
  const setServoGate = useAppStore((s) => s.setServoGate);

  return (
    <StepLayout
      title="Servo Gate System"
      description="Servo gates add PWM-controlled shutters to the trickler tubes for precise flow control. They stop powder flow instantly when the target weight is approached."
    >
      <div className="space-y-3">
        <OptionCard
          title="Yes, include servo gates"
          description="Adds 2x TowerPro MG90s servo motors with printed shutter gears and hangers. Provides more precise cutoff control and reduces overthrow. Tunable via the web interface."
          selected={servoGate === true}
          onSelect={() => setServoGate(true)}
          recommended
          icon={<Zap className="h-5 w-5" />}
        />
        <OptionCard
          title="No servo gates"
          description="Powder flow is controlled purely by motor speed. Simpler build with fewer parts, but slightly less precise cutoff timing."
          selected={servoGate === false}
          onSelect={() => setServoGate(false)}
          icon={<Zap className="h-5 w-5" />}
        />
      </div>
    </StepLayout>
  );
}
