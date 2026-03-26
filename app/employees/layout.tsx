import EmployeeSidebar from "./components/employee-sidebar";

export default async function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning className="flex w-full min-h-screen ">
      <main className="flex-1">{children}</main>
      <EmployeeSidebar />
    </div>
  );
}
