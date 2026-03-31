import { useAppStore } from "../../store";
import { SourcingLinkBadge } from "./SourcingLinkBadge";
import type { BomItem } from "../../types/bom";

interface BomItemRowProps {
  item: BomItem;
}

export function BomItemRow({ item }: BomItemRowProps) {
  const purchased =
    useAppStore((s) => s.bomTracking[item.id]?.purchased ?? false);
  const toggleBomPurchased = useAppStore(
    (s) => s.toggleBomPurchased,
  );

  return (
    <div
      className={[
        "flex items-start gap-3 border-b border-gray-800/50 px-3 py-3 last:border-b-0",
        purchased ? "opacity-60" : "",
      ].join(" ")}
    >
      <input
        type="checkbox"
        checked={purchased}
        onChange={() => toggleBomPurchased(item.id)}
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
            {item.name}
          </span>
          <span className="text-xs text-gray-500">
            x{item.quantity} {item.unit}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-gray-500">
          {item.specification}
        </p>
        {item.notes && (
          <p className="mt-0.5 text-xs text-gray-400 italic">
            {item.notes}
          </p>
        )}
        {item.sourcingLinks.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {item.sourcingLinks.map((link, i) => (
              <SourcingLinkBadge key={i} link={link} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
