import { Suspense } from "react";
import EmployeesPage from "./components/EmployeesPage";

export default async function Dashboard() {
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <EmployeesPage />
            </Suspense>
        </>
    )
}