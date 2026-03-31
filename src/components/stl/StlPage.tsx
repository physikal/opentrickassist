import { useMemo, useState, useCallback } from "react";
import { useAppStore } from "../../store";
import { ConfigSummaryBanner } from "../shared/ConfigSummaryBanner";
import { StlGroupSection } from "./StlGroupSection";
import { computeStl } from "../../lib/stl-engine";
import { downloadStlZip } from "../../lib/stl-download";
import { Info, Download, Loader2 } from "lucide-react";

export function StlPage() {
  const config = useAppStore((s) => s.config);
  const wizardComplete = useAppStore((s) => s.wizardComplete);
  const stlTracking = useAppStore((s) => s.stlTracking);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const groups = useMemo(() => computeStl(config), [config]);

  const allFiles = useMemo(
    () => groups.flatMap((g) => g.files),
    [groups],
  );

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    setProgress({ done: 0, total: allFiles.length });
    try {
      await downloadStlZip(allFiles, (done, total) => {
        setProgress({ done, total });
      });
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Download failed",
      );
    } finally {
      setDownloading(false);
    }
  }, [allFiles]);

  if (!wizardComplete) {
    return (
      <div>
        <ConfigSummaryBanner />
      </div>
    );
  }

  const totalFiles = allFiles.length;
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

      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {printedFiles}/{totalFiles} files printed
        </span>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 disabled:opacity-60"
        >
          {downloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Downloading {progress.done}/{progress.total}...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download All STL Files
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {groups.map((group) => (
          <StlGroupSection key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
