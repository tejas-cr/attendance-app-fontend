// "use client";
// import PersonaCard from "@/app/test/test2/page";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { PersonaSkeleton } from "./personas/PersonaSkeleton";

// export function DashboardSkeleton() {
//   return (
//     <div className="min-h-screen dark:bg-neutral-900 bg-neutral-50 p-6 animate-pulse">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           <div className="space-y-2">
//             <div className="h-7 w-40 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
//             <div className="h-4 w-64 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
//           </div>
//           <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {Array.from({ length: 3 }).map((_, idx) => (
//             <Card
//               key={idx}
//               className="border border-neutral-200 dark:border-neutral-700"
//             >
//               <CardHeader>
//                 <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
//               </CardHeader>
//               <CardContent>
//                 <div className="h-8 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-2" />
//                 <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Array.from({ length: 6 }).map((_, idx) => (
//             <div key={idx}>
//               <PersonaSkeleton idx={idx} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PersonaSkeleton } from "./Personas/Skeletons";
import "./skeletons.css";

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen dark:bg-neutral-900 bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="skeleton h-7 w-40 rounded-lg" />
            <div className="skeleton h-4 w-64 rounded-lg" />
          </div>
          <div className="skeleton h-10 w-32 rounded-lg" />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card
              key={idx}
              className="border border-neutral-200 dark:border-neutral-700"
            >
              <CardHeader>
                <div className="skeleton h-4 w-24 rounded-lg" />
              </CardHeader>
              <CardContent>
                <div className="skeleton h-8 w-16 rounded-lg mb-2" />
                <div className="skeleton h-4 w-20 rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Persona cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx}>
              <PersonaSkeleton idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}