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

const TOTAL_STEPS = 10;

export function WizardPage() {
  const wizardStep = useAppStore((s) => s.wizardStep);
  const config = useAppStore((s) => s.config);
  const setWizardStep = useAppStore((s) => s.setWizardStep);
  const completeWizard = useAppStore((s) => s.completeWizard);
  const navigate = useNavigate();

  function canProceed(): boolean {
    switch (wizardStep) {
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
        return true;
      case 9:
        return true;
      default:
        return false;
    }
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
      <WizardProgress currentStep={wizardStep} />
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
