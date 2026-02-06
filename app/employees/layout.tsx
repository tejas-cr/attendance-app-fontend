import EmployeeSidebar from "./components/employee-sidebar";

export default async function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen ">
      <main className="flex-1 p-8">{children}</main>
      <EmployeeSidebar />
    </div>
  );
}
