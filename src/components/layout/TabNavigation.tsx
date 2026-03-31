import { NavLink } from "react-router";
import {
  Wand2,
  ShoppingCart,
  Printer,
  Wrench,
  BarChart3,
} from "lucide-react";

const TABS = [
  { to: "/wizard", label: "Wizard", icon: Wand2 },
  { to: "/bom", label: "Parts List", icon: ShoppingCart },
  { to: "/stl", label: "Print List", icon: Printer },
  { to: "/assembly", label: "Assembly", icon: Wrench },
  { to: "/progress", label: "Progress", icon: BarChart3 },
] as const;

export function TabNavigation() {
  return (
    <nav className="border-b border-gray-800 bg-gray-900/30">
      <div className="mx-auto flex max-w-5xl overflow-x-auto">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              [
                "flex items-center gap-2 px-4 py-3 text-sm font-medium",
                "border-b-2 transition-colors whitespace-nowrap",
                isActive
                  ? "border-primary-500 text-primary-400"
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600",
              ].join(" ")
            }
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
