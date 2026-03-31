import { useAppStore } from "../../store";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router";

const SCALE_LABELS: Record<string, string> = {
  ad_fx120i_300i: "A&D FX-120i/300i",
  gg_jj100b: "G&G JJ100B",
  gg_jj223bf: "G&G JJ223BF",
};

export function ConfigSummaryBanner() {
  const config = useAppStore((s) => s.config);
  const wizardComplete = useAppStore((s) => s.wizardComplete);
  const navigate = useNavigate();

  if (!wizardComplete) {
    return (
      <div className="mb-6 rounded-lg border border-warning-500/30 bg-warning-500/10 px-4 py-3">
        <p className="text-sm text-warning-500">
          Complete the{" "}
          <button
            onClick={() => navigate("/wizard")}
            className="underline hover:text-warning-600"
          >
            configuration wizard
          </button>{" "}
          first to see your personalized build plan.
        </p>
      </div>
    );
  }

  const tags = [
    config.scaleType ? SCALE_LABELS[config.scaleType] : null,
    config.controllerVersion
      ? `Controller ${config.controllerVersion}`
      : null,
    config.flowRate
      ? `${config.flowRate.charAt(0).toUpperCase() + config.flowRate.slice(1)} flow`
      : null,
    config.servoGate ? "Servo gate" : null,
    config.volumeReducer ? "Volume reducer" : null,
    config.hopperHeight ? `${config.hopperHeight} hopper` : null,
    config.beltType === "tpu_printed" ? "TPU belts" : "GT2 belts",
  ].filter(Boolean);

  return (
    <div className="mb-6 flex items-start justify-between rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-700 px-2.5 py-0.5 text-xs text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={() => navigate("/wizard")}
        className="ml-3 flex shrink-0 items-center gap-1 text-xs text-gray-400 hover:text-gray-200"
      >
        <Settings className="h-3.5 w-3.5" />
        Edit
      </button>
    </div>
  );
}
