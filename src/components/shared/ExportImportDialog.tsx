import { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Download, Upload, X } from "lucide-react";
import { useAppStore } from "../../store";
import { toast } from "sonner";

export function ExportImportDialog() {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportState = useAppStore((s) => s.exportState);
  const importState = useAppStore((s) => s.importState);

  function handleExport() {
    const data = exportState();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `opentrickler-build-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Build plan exported");
  }

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data: unknown = JSON.parse(e.target?.result as string);
        const success = importState(data);
        if (success) {
          toast.success("Build plan imported successfully");
          setOpen(false);
        } else {
          toast.error("Invalid build plan file");
        }
      } catch {
        toast.error("Could not read file");
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800">
          <Download className="h-4 w-4" />
          Backup / Restore
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold text-gray-100">
            Backup & Restore
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-gray-400">
            Export your build progress as a JSON file or import a
            previous backup.
          </Dialog.Description>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleExport}
              className="flex w-full items-center gap-3 rounded-lg border border-gray-700 px-4 py-3 text-left hover:bg-gray-800"
            >
              <Download className="h-5 w-5 text-primary-400" />
              <div>
                <p className="text-sm font-medium text-gray-200">
                  Export Build Plan
                </p>
                <p className="text-xs text-gray-500">
                  Download your configuration and progress
                </p>
              </div>
            </button>

            <label className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-gray-700 px-4 py-3 text-left hover:bg-gray-800">
              <Upload className="h-5 w-5 text-primary-400" />
              <div>
                <p className="text-sm font-medium text-gray-200">
                  Import Build Plan
                </p>
                <p className="text-xs text-gray-500">
                  Restore from a previous export
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
