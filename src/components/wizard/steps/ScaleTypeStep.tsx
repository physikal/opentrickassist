import { StepLayout } from "../StepLayout";
import { OptionCard } from "../OptionCard";
import { WarningBanner } from "../WarningBanner";
import { useAppStore } from "../../../store";
import { Scale, ExternalLink, FileText } from "lucide-react";

const isAdFx = (s: string | null) =>
  s === "ad_fx120i_300i" || s === "gg_jj223bf";

export function ScaleTypeStep() {
  const scaleType = useAppStore((s) => s.config.scaleType);
  const setScaleType = useAppStore((s) => s.setScaleType);

  return (
    <StepLayout
      title="Choose Your Scale"
      description="The scale is the foundation of the system. It determines which shield/housing you'll print and affects several BOM items."
    >
      <div className="space-y-3">
        <OptionCard
          title="A&D FX-120i / FX-300i"
          description="Precision analytical balance. Most popular choice with the best community support and documentation. The FX-120i offers 0.001g resolution, FX-300i offers 0.01g with higher capacity. Also compatible with the Japanese FX-123 (grams-only equivalent of FX-120i)."
          selected={scaleType === "ad_fx120i_300i"}
          onSelect={() => setScaleType("ad_fx120i_300i")}
          recommended
          icon={<Scale className="h-5 w-5" />}
        />
        <OptionCard
          title="G&G JJ100B"
          description="Budget-friendly option with 0.001g resolution. Fully supported with a dedicated housing design. Good weight refresh rate suitable for PID control."
          selected={scaleType === "gg_jj100b"}
          onSelect={() => setScaleType("gg_jj100b")}
          icon={<Scale className="h-5 w-5" />}
        />
        <OptionCard
          title="G&G JJ223BF"
          description="Higher capacity scale. Uses the A&D FX Shield adapter parts. Has inconsistent weight refresh rates (up to 10 second delays)."
          selected={scaleType === "gg_jj223bf"}
          onSelect={() => setScaleType("gg_jj223bf")}
          warning="Not recommended: slow refresh rates make it unsuitable for PID control. Consider the JJ100B or A&D FX instead."
          icon={<Scale className="h-5 w-5" />}
        />
      </div>

      {scaleType === "gg_jj223bf" && (
        <WarningBanner message="The G&G JJ223BF has been reported to have weight refresh delays up to 10 seconds, making PID tuning unreliable. This scale requires A&D FX Shield adapter parts. Proceed only if you already own this scale." />
      )}

      {isAdFx(scaleType) && (
        <a
          href="https://github.com/eamars/OpenTrickler-RP2040-Controller/blob/main/manuals/OpenTrickler%20manual%20for%20ADFX%20scale.pdf"
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-start gap-3 rounded-md border border-gray-700 bg-gray-800/50 p-3 hover:border-primary-500"
        >
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
          <div className="flex-1">
            <div className="flex items-center gap-1 text-xs font-medium text-gray-200">
              A&D Scale Configuration Guide (PDF)
              <ExternalLink className="h-3 w-3 text-gray-500" />
            </div>
            <p className="mt-0.5 text-[11px] text-gray-500">
              Required serial-port and filter settings for the A&D FX
              series. Save this for first-run setup.
            </p>
          </div>
        </a>
      )}
    </StepLayout>
  );
}
