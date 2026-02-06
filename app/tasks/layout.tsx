import TaskSidebar from "./components/Task-Sidebar";

export default async function TaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen bg-accent">
      <main className="flex-1 p-8">{children}</main>
      <TaskSidebar />
    </div>
  );
}
