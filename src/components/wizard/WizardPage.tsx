import { useAppStore } from "../../store";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { WizardProgress } from "./WizardProgress";
import { WizardNavigation } from "./WizardNavigation";
import { WelcomeStep } from "./steps/WelcomeStep";
import { ScaleTypeStep } from "./steps/ScaleTypeStep";
import { ControllerVersionStep } from "./steps/ControllerVersionStep";
import { FlowRateStep } from "./steps/FlowRateStep";
import { ServoGateStep } from "./steps/ServoGateStep";
import { VolumeReducerStep } from "./steps/VolumeReducerStep";
import { HopperHeightStep } from "./steps/HopperHeightStep";
import { BeltTypeStep } from "./steps/BeltTypeStep";
import { CommunityModsStep } from "./steps/CommunityModsStep";
import { ReviewStep } from "./steps/ReviewStep";
import type { BuildConfig } from "../../types/config";

const TOTAL_STEPS = 10;

function stepCanProceed(
  step: number,
  config: BuildConfig,
): boolean {
  switch (step) {
    case 0:
      return true;
    case 1:
      return config.scaleType !== null;
    case 2:
      return config.controllerVersion !== null;
    case 3:
      return config.flowRate !== null;
    case 4:
      return config.servoGate !== null;
    case 5:
      return config.volumeReducer !== null;
    case 6:
      return config.hopperHeight !== null;
    case 7:
      return config.beltType !== null;
    case 8:
      return (
        !config.communityMods.includes("memphis_v2_ad_lid") ||
        config.memphisV2Display !== null
      );
    case 9:
      return true;
    default:
      return false;
  }
}

function computeMaxReachableStep(config: BuildConfig): number {
  for (let i = 0; i < TOTAL_STEPS - 1; i++) {
    if (!stepCanProceed(i, config)) return i;
  }
  return TOTAL_STEPS - 1;
}

export function WizardPage() {
  const wizardStep = useAppStore((s) => s.wizardStep);
  const config = useAppStore((s) => s.config);
  const setWizardStep = useAppStore((s) => s.setWizardStep);
  const completeWizard = useAppStore((s) => s.completeWizard);
  const navigate = useNavigate();

  const maxReachableStep = computeMaxReachableStep(config);

  function canProceed(): boolean {
    return stepCanProceed(wizardStep, config);
  }

  function handleBack() {
    if (wizardStep > 0) {
      setWizardStep(wizardStep - 1);
    }
  }

  function handleNext() {
    if (canProceed() && wizardStep < TOTAL_STEPS - 1) {
      setWizardStep(wizardStep + 1);
    }
  }

  function handleFinish() {
    completeWizard();
    toast.success("Build plan generated! Check your Parts List.");
    navigate("/bom");
  }

  function renderStep() {
    switch (wizardStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return <ScaleTypeStep />;
      case 2:
        return <ControllerVersionStep />;
      case 3:
        return <FlowRateStep />;
      case 4:
        return <ServoGateStep />;
      case 5:
        return <VolumeReducerStep />;
      case 6:
        return <HopperHeightStep />;
      case 7:
        return <BeltTypeStep />;
      case 8:
        return <CommunityModsStep />;
      case 9:
        return <ReviewStep />;
      default:
        return <WelcomeStep />;
    }
  }

  return (
    <div>
      <WizardProgress
        currentStep={wizardStep}
        maxReachableStep={maxReachableStep}
        onStepClick={setWizardStep}
      />
      {renderStep()}
      <WizardNavigation
        currentStep={wizardStep}
        totalSteps={TOTAL_STEPS}
        canProceed={canProceed()}
        onBack={handleBack}
        onNext={handleNext}
        onFinish={handleFinish}
      />
    </div>
  );
}
