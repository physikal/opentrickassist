import { useAppStore } from "../../store";
import type { StlFile } from "../../types/stl";
import { FileBox } from "lucide-react";

interface StlFileRowProps {
  file: StlFile;
}

export function StlFileRow({ file }: StlFileRowProps) {
  const printed =
    useAppStore((s) => s.stlTracking[file.id]?.printed ?? false);
  const toggleStlPrinted = useAppStore((s) => s.toggleStlPrinted);

  return (
    <div
      className={[
        "flex items-start gap-3 border-b border-gray-800/50 px-3 py-3 last:border-b-0",
        printed ? "opacity-60" : "",
      ].join(" ")}
    >
      <input
        type="checkbox"
        checked={printed}
        onChange={() => toggleStlPrinted(file.id)}
        className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary-500"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <FileBox className="inline h-3.5 w-3.5 text-gray-500" />
          <span
            className={[
              "text-sm font-medium",
              printed
                ? "text-gray-500 line-through"
                : "text-gray-200",
            ].join(" ")}
          >
            {file.filename}
          </span>
          {file.printQuantity > 1 && (
            <span className="text-xs text-primary-400">
              x{file.printQuantity}
            </span>
          )}
        </div>
        <div className="mt-1 flex flex-wrap gap-1.5">
          <span
            className={[
              "rounded-md px-1.5 py-0.5 text-[10px] font-medium",
              file.material === "tpu_95a"
                ? "bg-warning-500/20 text-warning-500"
                : "bg-gray-700 text-gray-400",
            ].join(" ")}
          >
            {file.material === "tpu_95a" ? "TPU 95A" : "ABS/ASA/PETG"}
          </span>
        </div>
        {file.specialInstructions && (
          <p className="mt-1 text-xs text-gray-400 italic">
            {file.specialInstructions}
          </p>
        )}
      </div>
    </div>
  );
}
