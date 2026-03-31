import { useMemo } from "react";
import { useAppStore } from "../../store";
import { ConfigSummaryBanner } from "../shared/ConfigSummaryBanner";
import { StlGroupSection } from "./StlGroupSection";
import { computeStl } from "../../lib/stl-engine";
import { Info } from "lucide-react";

export function StlPage() {
  const config = useAppStore((s) => s.config);
  const wizardComplete = useAppStore((s) => s.wizardComplete);
  const stlTracking = useAppStore((s) => s.stlTracking);

  const groups = useMemo(() => computeStl(config), [config]);

  if (!wizardComplete) {
    return (
      <div>
        <ConfigSummaryBanner />
      </div>
    );
  }

  const totalFiles = groups.reduce(
    (sum, g) => sum + g.files.length,
    0,
  );
  const printedFiles = groups.reduce(
    (sum, g) =>
      sum +
      g.files.filter((f) => stlTracking[f.id]?.printed).length,
    0,
  );

  return (
    <div>
      <ConfigSummaryBanner />

      <div className="mb-4 flex items-start gap-2 rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
        <div className="text-xs text-gray-400">
          <p className="font-medium text-gray-300">
            Print Settings Reminder
          </p>
          <p className="mt-1">
            Standard parts: ABS, ASA, or PETG. 0.2mm layer height,
            40% infill, 4 walls. Hopper body: print in vase mode with
            0.8mm single-wall thickness. TPU parts: TPU 95A with
            direct drive extruder recommended.
          </p>
        </div>
      </div>

      <div className="mb-4 text-xs text-gray-500">
        {printedFiles}/{totalFiles} files printed
      </div>

      <div className="space-y-3">
        {groups.map((group) => (
          <StlGroupSection key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
