import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="relative rounded-sm border border-neutral-100 bg-white/90 p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Skeleton className="h-12 w-12 rounded-sm" />

        <div className="flex-1 space-y-2">
          {/* Name */}
          <Skeleton className="h-4 w-32" />

          {/* Email */}
          <Skeleton className="h-3 w-48" />
        </div>
      </div>

      {/* Team badge */}
      <Skeleton className="absolute right-1 top-1 h-5 w-12 rounded-full" />
    </div>
  );
}