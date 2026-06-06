import { cn } from "@/lib/utils";

interface MargaLogoProps {
  className?: string;
  showWordmark?: boolean;
  variant?: "brand" | "monochrome";
}

function MargaLogo({
  className,
  showWordmark = true,
  variant = "monochrome",
}: MargaLogoProps) {
  const isBrand = variant === "brand";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        aria-hidden
        className="shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(2, 8)">
          <path
            d="M4 24 Q20 2 52 24 Q20 46 4 24Z"
            fill="none"
            stroke={isBrand ? "var(--logo-stroke)" : "#000000"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="28"
            cy="24"
            r="10"
            fill="none"
            stroke={isBrand ? "var(--logo-stroke)" : "#000000"}
            strokeWidth="2"
          />
          <circle
            cx="28"
            cy="24"
            r="5"
            fill={isBrand ? "var(--logo-teal)" : "#000000"}
          />
          <line
            x1="28"
            y1="2"
            x2="28"
            y2="9"
            stroke={isBrand ? "var(--logo-teal)" : "#000000"}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="18"
            y1="4.5"
            x2="22"
            y2="11"
            stroke={isBrand ? "var(--logo-teal)" : "#000000"}
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.6"
          />
          <line
            x1="38"
            y1="4.5"
            x2="34"
            y2="11"
            stroke={isBrand ? "var(--logo-teal)" : "#000000"}
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      </svg>
      {showWordmark && (
        <span
          className={cn(
            "text-base font-semibold leading-none tracking-tight",
            isBrand ? "text-foreground" : "text-black",
          )}
        >
          Marga
          <span className={isBrand ? "text-teal" : "text-black"}>.me</span>
        </span>
      )}
    </span>
  );
}

export { MargaLogo };
