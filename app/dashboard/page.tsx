import { Suspense } from "react";
import DashboardPage from "./components/DashBoardPage";

export default async function Dashboard() {
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <DashboardPage />
            </Suspense>
        </>
    )
}