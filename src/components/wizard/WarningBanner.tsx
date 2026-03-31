import { AlertTriangle } from "lucide-react";

interface WarningBannerProps {
  message: string;
}

export function WarningBanner({ message }: WarningBannerProps) {
  return (
    <div className="mt-4 flex items-start gap-2 rounded-lg border border-warning-500/30 bg-warning-500/10 px-4 py-3">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning-500" />
      <p className="text-sm text-warning-500">{message}</p>
    </div>
  );
}
