"use client"

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import SideNav from "./side-panel";

export default function LayoutWrapper({
    children
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const hideLayout = pathname === "/sign-in" || pathname === '/'

    return (
        <div className="flex h-screen">
            {!hideLayout && <SideNav />}
            <div className="flex flex-col flex-1 overflow-hidden">
                {!hideLayout && <Navbar />}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}