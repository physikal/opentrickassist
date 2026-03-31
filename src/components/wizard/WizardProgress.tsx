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
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, i) => {
          const isActive = i === currentStep;
          const isComplete = i < currentStep;
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
                <div
                  className={[
                    "z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                    isActive
                      ? "bg-primary-500 text-white"
                      : isComplete
                        ? "bg-primary-500/20 text-primary-400"
                        : "bg-gray-800 text-gray-500",
                  ].join(" ")}
                >
                  {isComplete ? "\u2713" : i}
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={[
                      "h-0.5 flex-1",
                      isComplete ? "bg-primary-500" : "bg-gray-700",
                    ].join(" ")}
                  />
                )}
              </div>
              <span
                className={[
                  "mt-1.5 hidden text-xs sm:block",
                  isActive
                    ? "font-medium text-primary-400"
                    : "text-gray-500",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
