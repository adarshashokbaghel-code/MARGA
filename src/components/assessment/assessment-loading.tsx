export function AssessmentLoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 border border-black bg-[#F5F5F5]" />
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <div className="hidden space-y-3 lg:block">
          <div className="h-36 border border-black bg-[#F5F5F5]" />
          <div className="h-52 border border-black bg-[#F5F5F5]" />
        </div>
        <div className="h-96 border border-black bg-[#F5F5F5]" />
      </div>
    </div>
  );
}
