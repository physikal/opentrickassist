import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "../../store";
import { BomItemRow } from "./BomItemRow";
import type { BomCategory } from "../../types/bom";

interface BomCategorySectionProps {
  category: BomCategory;
}

export function BomCategorySection({
  category,
}: BomCategorySectionProps) {
  const [expanded, setExpanded] = useState(true);
  const bomTracking = useAppStore((s) => s.bomTracking);

  const purchasedCount = category.items.filter(
    (item) => bomTracking[item.id]?.purchased,
  ).length;
  const totalCount = category.items.length;

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
            {category.name}
          </h3>
        </div>
        <span className="text-xs text-gray-500">
          {purchasedCount}/{totalCount} purchased
        </span>
      </button>
      {expanded && (
        <div className="border-t border-gray-800">
          {category.items.map((item) => (
            <BomItemRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
