import { ExternalLink, CheckCircle } from "lucide-react";
import type { SourcingLink } from "../../types/bom";

interface SourcingLinkBadgeProps {
  link: SourcingLink;
}

export function SourcingLinkBadge({ link }: SourcingLinkBadgeProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-md border border-gray-700 px-2 py-0.5 text-xs text-gray-300 hover:border-gray-500 hover:text-gray-100"
      title={link.notes ?? `Buy from ${link.vendor}`}
    >
      {link.verified && (
        <CheckCircle className="h-3 w-3 text-success-500" />
      )}
      {link.vendor}
      <ExternalLink className="h-2.5 w-2.5" />
    </a>
  );
}
