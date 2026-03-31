import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface OptionCardProps {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  recommended?: boolean;
  warning?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export function OptionCard({
  title,
  description,
  selected,
  onSelect,
  recommended,
  warning,
  disabled,
  icon,
}: OptionCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={[
        "relative w-full rounded-lg border p-4 text-left transition-all",
        selected
          ? "border-primary-500 bg-primary-500/10"
          : disabled
            ? "cursor-not-allowed border-gray-800 bg-gray-900/50 opacity-50"
            : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800",
      ].join(" ")}
    >
      {recommended && (
        <span className="absolute -top-2.5 right-3 rounded-full bg-primary-600 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
          Recommended
        </span>
      )}
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 text-gray-400">{icon}</div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={[
                "text-sm font-medium",
                selected ? "text-primary-300" : "text-gray-200",
              ].join(" ")}
            >
              {title}
            </h3>
            {selected && (
              <Check className="h-4 w-4 text-primary-400" />
            )}
          </div>
          <p className="mt-1 text-xs text-gray-400">{description}</p>
          {warning && (
            <p className="mt-2 text-xs text-warning-500">{warning}</p>
          )}
        </div>
      </div>
    </button>
  );
}
