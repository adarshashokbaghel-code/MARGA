import { cn } from "@/lib/utils";

interface MargaLogoProps {
  className?: string;
  showWordmark?: boolean;
}

function MargaLogo({ className, showWordmark = true }: MargaLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 64 64"
        aria-hidden
        className="shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(2, 8)">
          <path
            d="M4 24 Q20 2 52 24 Q20 46 4 24Z"
            fill="none"
            stroke="var(--logo-stroke)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="28"
            cy="24"
            r="10"
            fill="none"
            stroke="var(--logo-stroke)"
            strokeWidth="2"
          />
          <circle cx="28" cy="24" r="5" fill="var(--logo-teal)" />
          <line
            x1="28"
            y1="2"
            x2="28"
            y2="9"
            stroke="var(--logo-teal)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="18"
            y1="4.5"
            x2="22"
            y2="11"
            stroke="var(--logo-teal)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.6"
          />
          <line
            x1="38"
            y1="4.5"
            x2="34"
            y2="11"
            stroke="var(--logo-teal)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      </svg>
      {showWordmark && (
        <span className="text-base font-semibold tracking-tight text-foreground">
          Marga<span className="text-teal">.me</span>
        </span>
      )}
    </span>
  );
}

export { MargaLogo };
