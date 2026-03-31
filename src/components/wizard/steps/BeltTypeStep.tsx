import { StepLayout } from "../StepLayout";
import { OptionCard } from "../OptionCard";
import { useAppStore } from "../../../store";
import { Link } from "lucide-react";

export function BeltTypeStep() {
  const beltType = useAppStore((s) => s.config.beltType);
  const setBeltType = useAppStore((s) => s.setBeltType);

  return (
    <StepLayout
      title="Timing Belt Type"
      description="The coarse and fine trickler tubes are driven by GT2 timing belts. You can print them in TPU or buy aftermarket belts."
    >
      <div className="space-y-3">
        <OptionCard
          title="Print TPU Belts"
          description="Print flexible belts using TPU 95A filament. Free if you have TPU capability. Requires good TPU printing skills and a direct drive extruder for best results."
          selected={beltType === "tpu_printed"}
          onSelect={() => setBeltType("tpu_printed")}
          icon={<Link className="h-5 w-5" />}
        />
        <OptionCard
          title="Buy Aftermarket GT2 Belts"
          description="Purchase standard GT2 timing belts: 174mm (87 teeth) for the coarse trickler and 166mm (83 teeth) for the fine trickler. 6mm belt width. More reliable than printed belts."
          selected={beltType === "aftermarket_gt2"}
          onSelect={() => setBeltType("aftermarket_gt2")}
          recommended
          icon={<Link className="h-5 w-5" />}
        />
      </div>
    </StepLayout>
  );
}
