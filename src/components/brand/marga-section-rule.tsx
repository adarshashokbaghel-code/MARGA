import { cn } from "@/lib/utils";

export function MargaSectionRule({
  inverted,
  className,
}: {
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex items-center gap-4", className)}>
      <div className={cn("h-1 w-24", inverted ? "bg-white" : "bg-black")} />
      <div className="size-3 bg-marga-yellow" aria-hidden />
    </div>
  );
}
