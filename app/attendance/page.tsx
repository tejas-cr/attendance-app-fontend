import { Suspense } from "react";
import AttendancePage from "./components/AttendancePage";

export default async function Dashboard() {
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <AttendancePage />
            </Suspense>
        </>
    )
}