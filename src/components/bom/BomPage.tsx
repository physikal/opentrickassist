import { useState, useMemo } from "react";
import { useAppStore } from "../../store";
import { ConfigSummaryBanner } from "../shared/ConfigSummaryBanner";
import { BomCategorySection } from "./BomCategorySection";
import { computeBom } from "../../lib/bom-engine";
import { Search } from "lucide-react";

type Filter = "all" | "unpurchased" | "purchased";

export function BomPage() {
  const config = useAppStore((s) => s.config);
  const wizardComplete = useAppStore((s) => s.wizardComplete);
  const bomTracking = useAppStore((s) => s.bomTracking);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const categories = useMemo(() => computeBom(config), [config]);

  const filteredCategories = useMemo(() => {
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const matchesSearch =
            search === "" ||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.specification
              .toLowerCase()
              .includes(search.toLowerCase());

          const isPurchased = bomTracking[item.id]?.purchased ?? false;
          const matchesFilter =
            filter === "all" ||
            (filter === "purchased" && isPurchased) ||
            (filter === "unpurchased" && !isPurchased);

          return matchesSearch && matchesFilter;
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, filter, search, bomTracking]);

  if (!wizardComplete) {
    return (
      <div>
        <ConfigSummaryBanner />
      </div>
    );
  }

  const totalItems = categories.reduce(
    (sum, cat) => sum + cat.items.length,
    0,
  );
  const purchasedItems = categories.reduce(
    (sum, cat) =>
      sum +
      cat.items.filter((item) => bomTracking[item.id]?.purchased)
        .length,
    0,
  );

  return (
    <div>
      <ConfigSummaryBanner />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search parts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pr-3 pl-9 text-sm text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-1">
          {(["all", "unpurchased", "purchased"] as const).map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={[
                  "rounded-md px-3 py-1.5 text-xs font-medium capitalize",
                  filter === f
                    ? "bg-primary-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-gray-200",
                ].join(" ")}
              >
                {f}
              </button>
            ),
          )}
        </div>
        <span className="text-xs text-gray-500">
          {purchasedItems}/{totalItems} purchased
        </span>
      </div>

      <div className="space-y-3">
        {filteredCategories.map((category) => (
          <BomCategorySection key={category.id} category={category} />
        ))}
        {filteredCategories.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">
            No items match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
