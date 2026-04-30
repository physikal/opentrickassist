import { StepLayout } from "../StepLayout";
import { useAppStore } from "../../../store";
import {
  COMMUNITY_MODS,
  CATEGORY_META,
  type ModDefinition,
  type ModCategory,
} from "../../../data/community-mods";
import type { MemphisV2Display } from "../../../types/config";
import {
  Check,
  Info,
  ExternalLink,
  AlertTriangle,
  Eye,
} from "lucide-react";

const DISPLAY_OPTIONS: {
  id: MemphisV2Display;
  label: string;
  hint: string;
}[] = [
  {
    id: "bigtreetech",
    label: "BigTreeTech",
    hint: "BigTreeTech Mini 12864",
  },
  {
    id: "fly_left",
    label: "Fly (button left)",
    hint: "Fly Mini 12864 - button on left",
  },
  {
    id: "fly_right",
    label: "Fly (button right)",
    hint: "Fly Mini 12864 - button on right",
  },
];

function ImpactBadge({ mod }: { mod: ModDefinition }) {
  if (mod.impact === "replaces") {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-warning-500/20 px-1.5 py-0.5 text-[10px] font-medium text-warning-500">
        <AlertTriangle className="h-3 w-3" />
        Replaces base parts
      </span>
    );
  }
  if (mod.impact === "preview") {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-gray-700 px-1.5 py-0.5 text-[10px] font-medium text-gray-300">
        <Eye className="h-3 w-3" />
        Preview - guide only
      </span>
    );
  }
  return null;
}

function ModCard({ mod }: { mod: ModDefinition }) {
  const config = useAppStore((s) => s.config);
  const toggleCommunityMod = useAppStore((s) => s.toggleCommunityMod);
  const setMemphisV1AcrylicHopper = useAppStore(
    (s) => s.setMemphisV1AcrylicHopper,
  );
  const setMemphisV2Display = useAppStore(
    (s) => s.setMemphisV2Display,
  );

  const compatible = mod.requiresWhen
    ? mod.requiresWhen(config)
    : true;
  const selected = config.communityMods.includes(mod.id);

  return (
    <div
      className={[
        "rounded-lg border p-3 transition-all",
        selected
          ? "border-primary-500 bg-primary-500/10"
          : !compatible
            ? "cursor-not-allowed border-gray-800 opacity-40"
            : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/50",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => compatible && toggleCommunityMod(mod.id)}
        disabled={!compatible}
        className="w-full text-left"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <h4
                className={[
                  "text-sm font-medium",
                  selected ? "text-primary-300" : "text-gray-200",
                ].join(" ")}
              >
                {mod.name}
              </h4>
              <ImpactBadge mod={mod} />
            </div>
            <p className="mt-0.5 text-[10px] text-gray-500">
              by {mod.author}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {mod.description}
            </p>
            {mod.previewNote && (
              <p className="mt-1 text-xs text-amber-400">
                {mod.previewNote}
              </p>
            )}
          </div>
          {selected && (
            <Check className="mt-1 h-4 w-4 shrink-0 text-primary-400" />
          )}
        </div>
      </button>

      {mod.docUrl && (
        <a
          href={mod.docUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[11px] text-primary-400 hover:text-primary-300"
        >
          Upstream guide
          <ExternalLink className="h-3 w-3" />
        </a>
      )}

      {selected && mod.id === "memphis_v1_ad_shield" && (
        <label className="mt-3 flex items-start gap-2 rounded border border-gray-700 bg-gray-900/50 p-2">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-900 text-primary-500 focus:ring-primary-500"
            checked={config.memphisV1AcrylicHopper}
            onChange={(e) =>
              setMemphisV1AcrylicHopper(e.target.checked)
            }
          />
          <div className="flex-1">
            <span className="text-xs font-medium text-gray-200">
              Use clear acrylic tube hopper
            </span>
            <p className="mt-0.5 text-[11px] text-gray-500">
              Replaces the printed hopper with a 60mm OD / 56mm ID
              acrylic tube using Memphis&apos;s hopper_base_plexi /
              hopper_cap STLs.
            </p>
          </div>
        </label>
      )}

      {selected && mod.id === "memphis_v2_ad_lid" && (
        <div className="mt-3 rounded border border-gray-700 bg-gray-900/50 p-2">
          <p className="text-xs font-medium text-gray-200">
            Display choice
          </p>
          <p className="mt-0.5 text-[11px] text-gray-500">
            V2 has separate mount files for two display brands.
            Required to proceed.
          </p>
          <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
            {DISPLAY_OPTIONS.map((d) => {
              const active = config.memphisV2Display === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setMemphisV2Display(d.id)}
                  className={[
                    "rounded border p-2 text-left text-[11px]",
                    active
                      ? "border-primary-500 bg-primary-500/10 text-primary-200"
                      : "border-gray-700 text-gray-300 hover:border-gray-600",
                  ].join(" ")}
                >
                  <div className="font-medium">{d.label}</div>
                  <div className="mt-0.5 text-[10px] text-gray-500">
                    {d.hint}
                  </div>
                </button>
              );
            })}
          </div>
          {config.memphisV2Display === null && (
            <p className="mt-2 text-[11px] text-amber-400">
              Pick a display brand to include the correct mount files.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const CATEGORY_ORDER: ModCategory[] = [
  "scale_variant",
  "powder_handling",
  "build_options",
  "accessories",
];

export function CommunityModsStep() {
  const config = useAppStore((s) => s.config);
  const visibleMods = COMMUNITY_MODS.filter(
    (m) => !m.requiresWhen || m.requiresWhen(config),
  );

  const byCategory = new Map<ModCategory, ModDefinition[]>();
  for (const cat of CATEGORY_ORDER) byCategory.set(cat, []);
  for (const mod of visibleMods) {
    byCategory.get(mod.category)?.push(mod);
  }

  return (
    <StepLayout
      title="Community Modifications"
      description="Optional modifications grouped by purpose. Select any that interest you — they'll be added to your print list."
    >
      <div className="mb-4 flex items-start gap-2 rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
        <p className="text-xs text-gray-400">
          Mods that don&rsquo;t apply to your current build are hidden.
          Only one A&D FX Shield Variant can be active — picking a new
          one replaces any other.
        </p>
      </div>

      {CATEGORY_ORDER.map((category) => {
        const mods = byCategory.get(category) ?? [];
        if (mods.length === 0) return null;
        const meta = CATEGORY_META[category];
        return (
          <div key={category} className="mb-6 last:mb-0">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              {meta.label}
            </h3>
            <p className="mb-3 text-xs text-gray-500">{meta.hint}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {mods.map((mod) => (
                <ModCard key={mod.id} mod={mod} />
              ))}
            </div>
          </div>
        );
      })}
    </StepLayout>
  );
}
