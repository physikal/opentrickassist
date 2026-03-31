import { StepLayout } from "../StepLayout";
import { OptionCard } from "../OptionCard";
import { useAppStore } from "../../../store";
import { Droplets } from "lucide-react";

export function FlowRateStep() {
  const flowRate = useAppStore((s) => s.config.flowRate);
  const setFlowRate = useAppStore((s) => s.setFlowRate);

  return (
    <StepLayout
      title="Fine Trickler Flow Rate"
      description="Choose the rotary tube variant based on the powder types you'll be using. This affects only the small rotary tube STL file."
    >
      <div className="space-y-3">
        <OptionCard
          title="Low Flow"
          description="Best for ball powders and small kernel extruded powders. Smallest groove depth for maximum precision with fast-flowing powders."
          selected={flowRate === "low"}
          onSelect={() => setFlowRate("low")}
          icon={<Droplets className="h-5 w-5" />}
        />
        <OptionCard
          title="Mid Flow"
          description="Versatile option for medium-sized extruded powder kernels. Good balance of flow rate and precision for most rifle powders."
          selected={flowRate === "mid"}
          onSelect={() => setFlowRate("mid")}
          recommended
          icon={<Droplets className="h-5 w-5" />}
        />
        <OptionCard
          title="High Flow"
          description="Designed for large magnum powder kernels and high-volume charges. Flow-through tube design for faster dispensing of coarse powders."
          selected={flowRate === "high"}
          onSelect={() => setFlowRate("high")}
          icon={<Droplets className="h-5 w-5" />}
        />
      </div>
    </StepLayout>
  );
}
