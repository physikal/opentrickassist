import { StepLayout } from "../StepLayout";
import {
  Crosshair,
  Rocket,
  PlayCircle,
  MessagesSquare,
  ExternalLink,
} from "lucide-react";

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

        <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-5">
          <h3 className="text-sm font-medium text-gray-200">
            Helpful resources before you start
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            From the upstream OpenTrickler maintainers and community.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <a
              href="https://www.youtube.com/watch?v=DNZ34U0TyB8"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 rounded-md border border-gray-700 bg-gray-900/40 p-3 hover:border-primary-500 hover:bg-gray-800"
            >
              <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <div className="flex-1">
                <div className="flex items-center gap-1 text-xs font-medium text-gray-200">
                  Long Range Lab build series
                  <ExternalLink className="h-3 w-3 text-gray-500" />
                </div>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Step-by-step video walkthrough of the full build.
                </p>
              </div>
            </a>
            <a
              href="https://discord.gg/ZhdThA2vrW"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 rounded-md border border-gray-700 bg-gray-900/40 p-3 hover:border-primary-500 hover:bg-gray-800"
            >
              <MessagesSquare className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
              <div className="flex-1">
                <div className="flex items-center gap-1 text-xs font-medium text-gray-200">
                  OpenTrickler Discord
                  <ExternalLink className="h-3 w-3 text-gray-500" />
                </div>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Community help and development discussion.
                </p>
              </div>
            </a>
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
