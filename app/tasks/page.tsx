import { Suspense } from "react";
import TasksPage from "./components/TasksPage";

export default async function Tasks() {
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <TasksPage />
            </Suspense>
        </>
    )
}