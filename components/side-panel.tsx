"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItems } from "@/config";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// import { ThemeToggle } from './theme-toggle';

export default function SideNav() {
  const navItems = NavItems();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("sidebarExpanded");
      if (saved === null) {
        return true;
      }
      return JSON.parse(saved);
    }
    return true; // default state if window is not defined
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "sidebarExpanded",
        JSON.stringify(isSidebarExpanded),
      );
    }
  }, [isSidebarExpanded]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div>
      <div
        className={cn(
          isSidebarExpanded ? "w-[220px]" : "w-[72px]",
          "border-r transition-all duration-300 ease-in-out hidden sm:flex h-screen bg-white shadow-sm",
        )}
      >
        <aside className="flex h-full flex-col w-full break-words px-4 overflow-x-hidden columns-1">
          {/* Top */}
          <Link href="/" className="mt-6 mb-4 flex items-center">
            {isSidebarExpanded ? (
              <div className="flex items-center gap-1 text-3xl font-bold tracking-tight">
                <span className="text-blue-600">Sched</span>
                <span className="text-emerald-500">IO</span>
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white font-bold text-lg shadow-sm">
                S
              </div>
            )}
          </Link>

          <div className="mt-4 relative pb-2">
            {/* <Link
              href="/"
              className="flex items-center gap-2 text-xl font-semibold text-primary"
            >
              SchedIO
            </Link> */}
            <div className="flex flex-col space-y-1">
              {navItems.map((item, idx) => {
                if (item.position === "top") {
                  return (
                    <Fragment key={idx}>
                      <div className="space-y-1">
                        <SideNavItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                        />
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
          {/* Bottom */}
          <div className="sticky bottom-0 mt-auto whitespace-nowrap mb-4 transition duration-200 block">
            {/* <ThemeToggle isDropDown={true} /> */}
            {navItems.map((item, idx) => {
              if (item.position === "bottom") {
                return (
                  <Fragment key={idx}>
                    <div className="space-y-1">
                      <SideNavItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={isSidebarExpanded}
                      />
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        </aside>
        <div className="relative h-full">
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-[-18px] flex h-9 w-9 items-center justify-center rounded-full bg-white border shadow-md hover:bg-neutral-100 transition"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? (
              <ChevronLeft size={16} className="stroke-foreground" />
            ) : (
              <ChevronRight size={16} className="stroke-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// export const SideNavItem: React.FC<{
//   label: string;
//   icon: any;
//   path: string;
//   active: boolean;
//   isSidebarExpanded: boolean;
// }> = ({ label, icon, path, active, isSidebarExpanded }) => {
//   return (
//     <>
//       {isSidebarExpanded ? (
//         <Link
//           href={path}
//           className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
//             active
//               ? "font-base text-sm bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white"
//               : "hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
//           }`}
//         >
//           <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
//             {icon}
//             <span>{label}</span>
//           </div>
//         </Link>
//       ) : (
//         <TooltipProvider delayDuration={70}>
//           <Tooltip>
//             <TooltipTrigger>
//               <Link
//                 href={path}
//                 className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
//                   active
//                     ? "font-base text-sm bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-white"
//                     : "hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
//                 }`}
//               >
//                 <div className="relative font-base text-sm p-2 flex flex-row items-center space-x-2 rounded-md duration-100">
//                   {icon}
//                 </div>
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent
//               side="left"
//               className="px-3 py-1.5 text-xs"
//               sideOffset={10}
//             >
//               <span>{label}</span>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       )}
//     </>
//   );
// };
export const SideNavItem: React.FC<{
  label: string;
  icon: any;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
}> = ({ label, icon, path, active, isSidebarExpanded }) => {
  const baseStyles =
    "group flex items-center gap-3 rounded-lg transition-all duration-200";

  const activeStyles =
    "bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 shadow-sm";

  const inactiveStyles =
    "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800";

  return (
    <Link
      href={path}
      className={cn(
        baseStyles,
        active ? activeStyles : inactiveStyles,
        isSidebarExpanded ? "px-3 py-2" : "p-2 justify-center",
      )}
    >
      <span
        className={cn(
          "transition-colors",
          active
            ? "text-blue-600"
            : "text-neutral-400 group-hover:text-neutral-700",
        )}
      >
        {icon}
      </span>

      {isSidebarExpanded && (
        <span className="text-sm font-medium">{label}</span>
      )}
    </Link>
  );
};
