const STEP_LABELS = [
  "Welcome",
  "Scale",
  "Controller",
  "Flow Rate",
  "Servo Gate",
  "Reducer",
  "Hopper",
  "Belts",
  "Mods",
  "Review",
];

interface WizardProgressProps {
  currentStep: number;
  maxReachableStep: number;
  onStepClick: (step: number) => void;
}

export function WizardProgress({
  currentStep,
  maxReachableStep,
  onStepClick,
}: WizardProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, i) => {
          const isActive = i === currentStep;
          const isComplete = i < currentStep;
          const isClickable = i <= maxReachableStep && i !== currentStep;
          return (
            <div key={label} className="flex flex-1 flex-col items-center">
              <div className="relative flex w-full items-center">
                {i > 0 && (
                  <div
                    className={[
                      "h-0.5 flex-1",
                      isComplete ? "bg-primary-500" : "bg-gray-700",
                    ].join(" ")}
                  />
                )}
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(i)}
                  disabled={!isClickable}
                  aria-label={`Go to ${label} step`}
                  aria-current={isActive ? "step" : undefined}
                  className={[
                    "z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors",
                    isActive
                      ? "bg-primary-500 text-white"
                      : isComplete
                        ? "bg-primary-500/20 text-primary-400"
                        : "bg-gray-800 text-gray-500",
                    isClickable
                      ? "cursor-pointer hover:ring-2 hover:ring-primary-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                      : "cursor-default",
                  ].join(" ")}
                >
                  {isComplete ? "✓" : i}
                </button>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={[
                      "h-0.5 flex-1",
                      isComplete ? "bg-primary-500" : "bg-gray-700",
                    ].join(" ")}
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => isClickable && onStepClick(i)}
                disabled={!isClickable}
                aria-hidden="true"
                tabIndex={-1}
                className={[
                  "mt-1.5 hidden text-xs sm:block",
                  isActive
                    ? "font-medium text-primary-400"
                    : "text-gray-500",
                  isClickable
                    ? "cursor-pointer hover:text-primary-300"
                    : "cursor-default",
                ].join(" ")}
              >
                {label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
