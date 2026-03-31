import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  canProceed,
  onBack,
  onNext,
  onFinish,
}: WizardNavigationProps) {
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="mt-8 flex items-center justify-between">
      <button
        onClick={onBack}
        disabled={isFirst}
        className={[
          "flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium",
          isFirst
            ? "cursor-not-allowed text-gray-600"
            : "text-gray-300 hover:bg-gray-800",
        ].join(" ")}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      {isLast ? (
        <button
          onClick={onFinish}
          className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
        >
          <Check className="h-4 w-4" />
          Generate My Build Plan
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={[
            "flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-medium",
            canProceed
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "cursor-not-allowed bg-gray-800 text-gray-500",
          ].join(" ")}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
