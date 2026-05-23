import type { ReactNode } from "react";

import { DotPattern } from "@/components/ui/dot-pattern";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

function HeroBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <GridPattern
        width={40}
        height={40}
        className={cn(
          "fill-teal/20 stroke-teal/25",
          "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]",
        )}
      />
      <DotPattern
        width={20}
        height={20}
        cr={1}
        className={cn(
          "fill-navy/15",
          "[mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_75%)]",
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export { HeroBackground };
