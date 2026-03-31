import { useMemo } from "react";
import { useAppStore } from "../../store";
import { ConfigSummaryBanner } from "../shared/ConfigSummaryBanner";
import { ExportImportDialog } from "../shared/ExportImportDialog";
import { ProgressRing } from "./ProgressRing";
import { ProgressCard } from "./ProgressCard";
import { computeBom } from "../../lib/bom-engine";
import { computeStl } from "../../lib/stl-engine";
import { computeAssembly } from "../../lib/assembly-engine";
import {
  ShoppingCart,
  Printer,
  Wrench,
  RotateCcw,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export function ProgressPage() {
  const config = useAppStore((s) => s.config);
  const wizardComplete = useAppStore((s) => s.wizardComplete);
  const bomTracking = useAppStore((s) => s.bomTracking);
  const stlTracking = useAppStore((s) => s.stlTracking);
  const assemblyTracking = useAppStore((s) => s.assemblyTracking);
  const stepTracking = useAppStore((s) => s.stepTracking);
  const resetAll = useAppStore((s) => s.resetAll);
  const [showReset, setShowReset] = useState(false);

  const bomCategories = useMemo(() => computeBom(config), [config]);
  const stlGroups = useMemo(() => computeStl(config), [config]);
  const assemblySections = useMemo(
    () => computeAssembly(config),
    [config],
  );

  if (!wizardComplete) {
    return (
      <div>
        <ConfigSummaryBanner />
      </div>
    );
  }

  const bomItems = bomCategories.flatMap((c) => c.items);
  const bomPurchased = bomItems.filter(
    (i) => bomTracking[i.id]?.purchased,
  ).length;

  const stlFiles = stlGroups.flatMap((g) => g.files);
  const stlPrinted = stlFiles.filter(
    (f) => stlTracking[f.id]?.printed,
  ).length;

  const allSteps = assemblySections.flatMap((s) => s.steps);
  const stepsCompleted = allSteps.filter(
    (s) => stepTracking[s.id]?.completed,
  ).length;
  const sectionsCompleted = assemblySections.filter(
    (s) => assemblyTracking[s.id]?.completed,
  ).length;

  const totalTasks = bomItems.length + stlFiles.length + allSteps.length;
  const completedTasks = bomPurchased + stlPrinted + stepsCompleted;
  const overallPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div>
      <ConfigSummaryBanner />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-100">
          Build Progress
        </h2>
        <div className="flex gap-2">
          <ExportImportDialog />
          <Dialog.Root open={showReset} onOpenChange={setShowReset}>
            <Dialog.Trigger asChild>
              <button className="flex items-center gap-2 rounded-lg border border-danger-500/30 px-3 py-2 text-sm text-danger-500 hover:bg-danger-500/10">
                <RotateCcw className="h-4 w-4" />
                Reset All
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60" />
              <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-xl">
                <Dialog.Title className="text-lg font-semibold text-gray-100">
                  Reset Everything?
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-gray-400">
                  This will clear your configuration, all tracking
                  progress, and wizard state. This cannot be undone.
                  Consider exporting your data first.
                </Dialog.Description>
                <div className="mt-6 flex justify-end gap-3">
                  <Dialog.Close asChild>
                    <button className="rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    onClick={() => {
                      resetAll();
                      setShowReset(false);
                    }}
                    className="rounded-lg bg-danger-600 px-4 py-2 text-sm font-medium text-white hover:bg-danger-500"
                  >
                    Reset All Data
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      <div className="mb-8 flex justify-center">
        <ProgressRing percentage={overallPercentage} size={140} />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <ProgressCard
          title="Parts Purchased"
          current={bomPurchased}
          total={bomItems.length}
          icon={<ShoppingCart className="h-5 w-5" />}
        />
        <ProgressCard
          title="Parts Printed"
          current={stlPrinted}
          total={stlFiles.length}
          icon={<Printer className="h-5 w-5" />}
        />
        <ProgressCard
          title="Assembly Sections"
          current={sectionsCompleted}
          total={assemblySections.length}
          icon={<Wrench className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}
