export function PresentPageSkeleton() {
  return (
    <div className="w-full min-h-screen p-8 animate-pulse">
      {/* Page title */}
      <div className="h-8 w-48 bg-slate-200 rounded mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-6 w-48 bg-slate-200 rounded" />
        <div className="h-6 w-10 bg-slate-200 rounded-full" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <EmployeeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function EmployeeCardSkeleton() {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-sm border border-neutral-100
        bg-white/90 p-5 shadow-sm
      "
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="h-12 w-12 rounded-sm bg-slate-200" />

        <div className="flex-1 space-y-2">
          {/* Name */}
          <div className="h-4 w-32 bg-slate-200 rounded" />

          {/* Email */}
          <div className="h-3 w-48 bg-slate-200 rounded" />
        </div>
      </div>

      {/* Team badge */}
      <div className="absolute right-1 top-1 h-5 w-12 bg-slate-200 rounded-full" />
    </div>
  );
}
