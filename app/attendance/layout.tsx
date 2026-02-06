import AttendanceSidebar from "./components/attendance-sidebar";

export default async function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen">
      <main className="flex-1 p-8">{children}</main>
      <AttendanceSidebar />
    </div>
  );
}
