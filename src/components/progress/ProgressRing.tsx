interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({
  percentage,
  size = 120,
  strokeWidth = 8,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary-500 transition-all duration-500"
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-2xl font-bold text-gray-100">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}
