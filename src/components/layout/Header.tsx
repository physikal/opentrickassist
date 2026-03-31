import { Crosshair } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 px-4 py-3">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <Crosshair className="h-6 w-6 text-primary-400" />
        <div>
          <h1 className="text-lg font-semibold text-gray-100">
            OpenTrickler Build Companion
          </h1>
          <p className="text-xs text-gray-500">
            Configure, source, print, and build
          </p>
        </div>
      </div>
    </header>
  );
}
