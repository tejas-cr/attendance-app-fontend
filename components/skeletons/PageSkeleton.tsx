import { Skeleton } from "@/components/ui/skeleton";
import { SectionSkeleton } from "./SectionSkeleton";

export function PageSkeleton() {
  return (
    <div className="w-full min-h-screen p-8">
      {/* Page title */}
      <Skeleton className="h-8 w-48 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
    </div>
  );
}