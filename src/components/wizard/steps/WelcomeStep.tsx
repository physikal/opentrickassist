import { StepLayout } from "../StepLayout";
import { Crosshair, Rocket } from "lucide-react";

export function WelcomeStep() {
  return (
    <StepLayout title="Build Your OpenTrickler">
      <div className="space-y-6">
        <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6">
          <div className="flex items-start gap-4">
            <Crosshair className="mt-1 h-8 w-8 shrink-0 text-primary-400" />
            <div>
              <h3 className="text-base font-medium text-gray-100">
                What is OpenTrickler?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                OpenTrickler is an open-source, 3D-printable powder
                trickler system for precision ammunition reloading. It
                uses dual stepper motors with coarse and fine control
                for repeatable, accurate powder charges.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6">
          <div className="flex items-start gap-4">
            <Rocket className="mt-1 h-8 w-8 shrink-0 text-primary-400" />
            <div>
              <h3 className="text-base font-medium text-gray-100">
                What this tool does
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                This wizard walks you through the build options, then
                generates a personalized parts list with sourcing
                links, a print checklist for all STL files, and
                assembly guides. Your progress is saved automatically
                in your browser.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  Choose your scale, controller, and options
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  Get an exact parts list with buy links
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  Track what you have purchased and printed
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  Follow assembly guides step by step
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Click <span className="font-medium text-gray-300">Next</span>{" "}
          to begin configuring your build.
        </p>
      </div>
    </StepLayout>
  );
}
