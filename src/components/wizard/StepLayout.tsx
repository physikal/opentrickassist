import type { ReactNode } from "react";

interface StepLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function StepLayout({
  title,
  description,
  children,
}: StepLayoutProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
      {description && (
        <p className="mt-1.5 text-sm text-gray-400">{description}</p>
      )}
      <div className="mt-6">{children}</div>
    </div>
  );
}
