import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "./CardSkeleton";

export function SectionSkeleton() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-12">
        <Skeleton className="h-6 w-48 rounded" />
        <Skeleton className="h-6 w-10 rounded-full" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}