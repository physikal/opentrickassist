import { StepLayout } from "../StepLayout";
import { OptionCard } from "../OptionCard";
import { useAppStore } from "../../../store";
import { ArrowUpDown } from "lucide-react";

export function HopperHeightStep() {
  const hopperHeight = useAppStore((s) => s.config.hopperHeight);
  const setHopperHeight = useAppStore((s) => s.setHopperHeight);

  return (
    <StepLayout
      title="Powder Hopper Height"
      description="The hopper feeds powder into the trickler. Taller hoppers hold more powder. The body is printed in vase mode with 0.8mm single-wall thickness."
    >
      <div className="space-y-3">
        <OptionCard
          title="100mm"
          description="Compact hopper. Suitable for small batches or limited workspace. Holds less powder, may need more frequent refills."
          selected={hopperHeight === "100mm"}
          onSelect={() => setHopperHeight("100mm")}
          icon={<ArrowUpDown className="h-5 w-5" />}
        />
        <OptionCard
          title="150mm"
          description="Medium hopper. Good balance of capacity and size for most reloading sessions."
          selected={hopperHeight === "150mm"}
          onSelect={() => setHopperHeight("150mm")}
          recommended
          icon={<ArrowUpDown className="h-5 w-5" />}
        />
        <OptionCard
          title="200mm"
          description="Tall hopper. Maximum powder capacity for long reloading sessions or large charges."
          selected={hopperHeight === "200mm"}
          onSelect={() => setHopperHeight("200mm")}
          icon={<ArrowUpDown className="h-5 w-5" />}
        />
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Tip: You can also scale the hopper body STL in the Z direction
        to create a custom height.
      </p>
    </StepLayout>
  );
}
