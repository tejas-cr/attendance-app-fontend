"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import "../skeletons.css";

export function PersonaSkeleton({ idx }: { idx: number }) {
  return (
    <Card
      key={idx}
      className="
        border border-neutral-200/70 dark:border-neutral-800/70
        bg-neutral-100/60 dark:bg-neutral-900/60
        shadow-inner dark:shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)]
        rounded-xl backdrop-blur-sm transition-all duration-300
        hover:shadow-[inset_0_0_6px_rgba(0,0,0,0.08)]
      "
    >
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="skeleton w-12 h-12 rounded-xl shadow-inner dark:shadow-[inset_0_1px_3px_rgba(255,255,255,0.08)]" />
          <div className="space-y-2 flex-1">
            <div className="skeleton h-4 w-32 rounded shadow-inner" />
            <div className="skeleton h-3 w-24 rounded shadow-inner" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="skeleton w-4 h-4 rounded shadow-inner" />
            <div className="skeleton h-3 w-40 rounded shadow-inner" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="skeleton w-4 h-4 rounded shadow-inner" />
            <div className="skeleton h-3 w-36 rounded shadow-inner" />
          </div>
        </div>

        <div className="skeleton h-12 rounded shadow-inner" />
        <div className="flex space-x-2">
          <div className="skeleton h-9 rounded flex-1 shadow-inner" />
          <div className="skeleton h-9 w-20 rounded shadow-inner" />
        </div>
      </CardContent>
    </Card>
  );
}