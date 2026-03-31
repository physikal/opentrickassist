import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "../../store";
import { StlFileRow } from "./StlFileRow";
import type { StlGroup } from "../../types/stl";

interface StlGroupSectionProps {
  group: StlGroup;
}

export function StlGroupSection({ group }: StlGroupSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const stlTracking = useAppStore((s) => s.stlTracking);

  const printedCount = group.files.filter(
    (file) => stlTracking[file.id]?.printed,
  ).length;
  const totalCount = group.files.length;

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
          <div>
            <h3 className="text-sm font-semibold text-gray-200">
              {group.name}
            </h3>
            {group.description && (
              <p className="text-xs text-gray-500">
                {group.description}
              </p>
            )}
          </div>
        </div>
        <span className="text-xs text-gray-500">
          {printedCount}/{totalCount} printed
        </span>
      </button>
      {expanded && (
        <div className="border-t border-gray-800">
          {group.files.map((file) => (
            <StlFileRow key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}
