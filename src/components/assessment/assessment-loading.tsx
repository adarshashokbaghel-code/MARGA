export function AssessmentLoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 rounded-full bg-muted/80" />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
        <div className="hidden space-y-4 lg:block">
          <div className="h-40 rounded-3xl bg-muted/60" />
          <div className="h-64 rounded-3xl bg-muted/40" />
        </div>
        <div className="h-[420px] rounded-3xl bg-muted/50" />
      </div>
    </div>
  );
}
