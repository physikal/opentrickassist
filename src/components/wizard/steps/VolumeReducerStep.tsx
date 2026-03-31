import { StepLayout } from "../StepLayout";
import { OptionCard } from "../OptionCard";
import { useAppStore } from "../../../store";
import { Minimize2 } from "lucide-react";

export function VolumeReducerStep() {
  const volumeReducer = useAppStore((s) => s.config.volumeReducer);
  const setVolumeReducer = useAppStore((s) => s.setVolumeReducer);

  return (
    <StepLayout
      title="Volume Reducer"
      description="Optional inserts that fill empty space inside the trickler body, reducing the amount of powder that can accumulate in dead zones."
    >
      <div className="space-y-3">
        <OptionCard
          title="Yes, include volume reducers"
          description="Adds front and rear reduction inserts. Reduces powder waste and helps with smaller charge weights by minimizing dead volume in the trickler body."
          selected={volumeReducer === true}
          onSelect={() => setVolumeReducer(true)}
          icon={<Minimize2 className="h-5 w-5" />}
        />
        <OptionCard
          title="No volume reducers"
          description="Standard trickler body without inserts. Fine for most use cases, especially larger charge weights."
          selected={volumeReducer === false}
          onSelect={() => setVolumeReducer(false)}
          icon={<Minimize2 className="h-5 w-5" />}
        />
      </div>
    </StepLayout>
  );
}
