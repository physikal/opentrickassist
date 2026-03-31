import { useMemo } from "react";
import { useAppStore } from "../../store";
import { ConfigSummaryBanner } from "../shared/ConfigSummaryBanner";
import { AssemblySectionCard } from "./AssemblySectionCard";
import { computeAssembly } from "../../lib/assembly-engine";

export function AssemblyPage() {
  const config = useAppStore((s) => s.config);
  const wizardComplete = useAppStore((s) => s.wizardComplete);

  const sections = useMemo(() => computeAssembly(config), [config]);

  if (!wizardComplete) {
    return (
      <div>
        <ConfigSummaryBanner />
      </div>
    );
  }

  return (
    <div>
      <ConfigSummaryBanner />

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-100">
          Assembly Guide
        </h2>
        <p className="text-sm text-gray-400">
          Follow these sections in order. Each links to the detailed
          guide on GitHub.
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <AssemblySectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
