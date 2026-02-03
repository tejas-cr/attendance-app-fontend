import Navbar from "@/components/navbar";
import SideNav from "@/components/side-panel";
import { Suspense } from "react";
import DashboardPage from "./components/DashBoardPage";

export default async function Dashboard() {
    return (
        <>
            <Navbar />
            <Suspense fallback={<p>Loading...</p>}>
                <div className="flex">
                    <SideNav />
                    <DashboardPage />
                </div>
            </Suspense>
        </>
    )
}