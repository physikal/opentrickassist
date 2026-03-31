import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { useAppStore } from "../../store";
import type { VendorGroup } from "../../types/bom";

interface BomVendorSectionProps {
  group: VendorGroup;
}

export function BomVendorSection({ group }: BomVendorSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const bomTracking = useAppStore((s) => s.bomTracking);
  const toggleBomPurchased = useAppStore(
    (s) => s.toggleBomPurchased,
  );

  const purchasedCount = group.items.filter(
    (entry) => bomTracking[entry.item.id]?.purchased,
  ).length;
  const totalCount = group.items.length;

  const unpurchasedLinks = group.items
    .filter(
      (entry) =>
        entry.link && !bomTracking[entry.item.id]?.purchased,
    )
    .map((entry) => entry.link!.url);

  function openAllLinks() {
    for (const url of unpurchasedLinks) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  const isUnsourced = group.vendor === "Unsourced";

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
          <h3 className="text-sm font-semibold text-gray-200">
            {group.vendor}
          </h3>
          <span className="text-xs text-gray-500">
            {totalCount} {totalCount === 1 ? "item" : "items"}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {purchasedCount}/{totalCount} purchased
        </span>
      </button>
      {expanded && (
        <div className="border-t border-gray-800">
          {!isUnsourced && unpurchasedLinks.length > 0 && (
            <div className="px-4 py-2 border-b border-gray-800/50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openAllLinks();
                }}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-500"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open All {unpurchasedLinks.length} Links
              </button>
            </div>
          )}
          {group.items.map((entry) => {
            const purchased =
              bomTracking[entry.item.id]?.purchased ?? false;
            return (
              <div
                key={`${entry.item.id}-${entry.link?.url ?? "unsourced"}`}
                className={[
                  "flex items-start gap-3 border-b border-gray-800/50 px-3 py-3 last:border-b-0",
                  purchased ? "opacity-60" : "",
                ].join(" ")}
              >
                <input
                  type="checkbox"
                  checked={purchased}
                  onChange={() =>
                    toggleBomPurchased(entry.item.id)
                  }
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary-500"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span
                      className={[
                        "text-sm font-medium",
                        purchased
                          ? "text-gray-500 line-through"
                          : "text-gray-200",
                      ].join(" ")}
                    >
                      {entry.item.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      x{entry.item.quantity} {entry.item.unit}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {entry.item.specification}
                  </p>
                  {entry.link && (
                    <div className="mt-1.5">
                      <a
                        href={entry.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View listing
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
