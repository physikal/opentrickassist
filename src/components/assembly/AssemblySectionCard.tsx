import { useState } from "react";
import { useAppStore } from "../../store";
import type { AssemblySection } from "../../types/assembly";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface AssemblySectionCardProps {
  section: AssemblySection;
}

export function AssemblySectionCard({
  section,
}: AssemblySectionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const stepTracking = useAppStore((s) => s.stepTracking);
  const toggleStepCompleted = useAppStore(
    (s) => s.toggleStepCompleted,
  );
  const assemblyTracking = useAppStore((s) => s.assemblyTracking);
  const toggleAssemblyCompleted = useAppStore(
    (s) => s.toggleAssemblyCompleted,
  );

  const sectionComplete =
    assemblyTracking[section.id]?.completed ?? false;
  const completedSteps = section.steps.filter(
    (step) => stepTracking[step.id]?.completed,
  ).length;

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50">
      <div className="flex items-start gap-3 px-4 py-3">
        <input
          type="checkbox"
          checked={sectionComplete}
          onChange={() => toggleAssemblyCompleted(section.id)}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary-500"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3
                className={[
                  "text-sm font-semibold",
                  sectionComplete
                    ? "text-gray-500 line-through"
                    : "text-gray-200",
                ].join(" ")}
              >
                {section.title}
              </h3>
              <p className="mt-0.5 text-xs text-gray-400">
                {section.description}
              </p>
            </div>
            <a
              href={section.guideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex shrink-0 items-center gap-1 text-xs text-primary-400 hover:text-primary-300"
            >
              Guide
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300"
          >
            {expanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
            {completedSteps}/{section.steps.length} steps
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-800 px-4 py-2">
          {section.steps.map((step) => {
            const completed =
              stepTracking[step.id]?.completed ?? false;
            return (
              <div
                key={step.id}
                className="flex items-start gap-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => toggleStepCompleted(step.id)}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-primary-500"
                />
                <div>
                  <p
                    className={[
                      "text-xs font-medium",
                      completed
                        ? "text-gray-500 line-through"
                        : "text-gray-300",
                    ].join(" ")}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
