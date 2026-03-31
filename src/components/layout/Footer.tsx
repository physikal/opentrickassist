import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800 px-4 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-gray-500">
        <p>
          Data sourced from{" "}
          <a
            href="https://github.com/eamars/OpenTrickler"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 underline hover:text-gray-300"
          >
            OpenTrickler
          </a>{" "}
          repository
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/eamars/OpenTrickler"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-400 hover:text-gray-300"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
