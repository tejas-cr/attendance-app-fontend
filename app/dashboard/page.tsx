// import KabanBoard from "@/components/kaban-board";
import Navbar from "@/components/navbar";
import SideNav from "@/components/side-panel";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function DashboardPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">Dashboard</h1>
                    <p className="text-gray-600">Manage tasks</p>
                </div>
            </div>
        </div>
    );
}

export default async function Dashboard() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Navbar />
            <div className="flex">
                <SideNav />
                <DashboardPage />
            </div>
        </Suspense>
    )
}