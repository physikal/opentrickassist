import { StepLayout } from "../StepLayout";
import { useAppStore } from "../../../store";
import { Edit2 } from "lucide-react";

const SCALE_LABELS: Record<string, string> = {
  ad_fx120i_300i: "A&D FX-120i/300i",
  gg_jj100b: "G&G JJ100B",
  gg_jj223bf: "G&G JJ223BF",
};

const FLOW_LABELS: Record<string, string> = {
  low: "Low Flow",
  mid: "Mid Flow",
  high: "High Flow",
};

const BELT_LABELS: Record<string, string> = {
  tpu_printed: "Printed TPU",
  aftermarket_gt2: "Aftermarket GT2",
};

interface ReviewRowProps {
  label: string;
  value: string;
  stepIndex: number;
  onEdit: (step: number) => void;
}

function ReviewRow({ label, value, stepIndex, onEdit }: ReviewRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-800 py-3 last:border-b-0">
      <div>
        <span className="text-xs text-gray-500">{label}</span>
        <p className="text-sm font-medium text-gray-200">{value}</p>
      </div>
      <button
        onClick={() => onEdit(stepIndex)}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary-400"
      >
        <Edit2 className="h-3 w-3" />
        Edit
      </button>
    </div>
  );
}

export function ReviewStep() {
  const config = useAppStore((s) => s.config);
  const goToWizardStep = useAppStore((s) => s.goToWizardStep);

  return (
    <StepLayout
      title="Review Your Configuration"
      description="Verify your choices before generating the build plan. Click Edit to change any option."
    >
      <div className="rounded-lg border border-gray-700 bg-gray-800/50 px-4">
        <ReviewRow
          label="Scale"
          value={
            config.scaleType
              ? SCALE_LABELS[config.scaleType] ?? config.scaleType
              : "Not selected"
          }
          stepIndex={1}
          onEdit={goToWizardStep}
        />
        <ReviewRow
          label="Controller"
          value={
            config.controllerVersion
              ? `Version ${config.controllerVersion}`
              : "Not selected"
          }
          stepIndex={2}
          onEdit={goToWizardStep}
        />
        <ReviewRow
          label="Fine Trickler Flow Rate"
          value={
            config.flowRate
              ? FLOW_LABELS[config.flowRate] ?? config.flowRate
              : "Not selected"
          }
          stepIndex={3}
          onEdit={goToWizardStep}
        />
        <ReviewRow
          label="Servo Gate"
          value={
            config.servoGate === null
              ? "Not selected"
              : config.servoGate
                ? "Yes"
                : "No"
          }
          stepIndex={4}
          onEdit={goToWizardStep}
        />
        <ReviewRow
          label="Volume Reducer"
          value={
            config.volumeReducer === null
              ? "Not selected"
              : config.volumeReducer
                ? "Yes"
                : "No"
          }
          stepIndex={5}
          onEdit={goToWizardStep}
        />
        <ReviewRow
          label="Hopper Height"
          value={config.hopperHeight ?? "Not selected"}
          stepIndex={6}
          onEdit={goToWizardStep}
        />
        <ReviewRow
          label="Timing Belts"
          value={
            config.beltType
              ? BELT_LABELS[config.beltType] ?? config.beltType
              : "Not selected"
          }
          stepIndex={7}
          onEdit={goToWizardStep}
        />
        <div className="border-b border-gray-800 py-3 last:border-b-0">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">
                Community Mods
              </span>
              <p className="text-sm font-medium text-gray-200">
                {config.communityMods.length === 0
                  ? "None selected"
                  : `${config.communityMods.length} selected`}
              </p>
            </div>
            <button
              onClick={() => goToWizardStep(8)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary-400"
            >
              <Edit2 className="h-3 w-3" />
              Edit
            </button>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-400">
        Click{" "}
        <span className="font-medium text-primary-400">
          Generate My Build Plan
        </span>{" "}
        to create your personalized parts list, print checklist, and
        assembly guides.
      </p>
    </StepLayout>
  );
}
