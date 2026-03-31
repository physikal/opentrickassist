import type { ReactNode } from "react";

interface ProgressCardProps {
  title: string;
  current: number;
  total: number;
  icon: ReactNode;
}

export function ProgressCard({
  title,
  current,
  total,
  icon,
}: ProgressCardProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
      <div className="flex items-center gap-3">
        <div className="text-gray-400">{icon}</div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-200">
            {title}
          </h4>
          <p className="text-xs text-gray-500">
            {current} of {total}
          </p>
        </div>
        <span className="text-lg font-bold text-gray-200">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-800">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
