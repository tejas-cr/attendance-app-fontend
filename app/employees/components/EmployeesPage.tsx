"use client";

import { adminService } from "@/services/admin-services";
import { User } from "@/services/auth-service";
import { User2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AddUserModal from "./AddUserModal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NoTasksErrorPage } from "@/app/tasks/components/NoTaskErrorPage";
import { PageSkeleton } from "@/components/skeletons/PageSkeleton";

export default function EmployeesPage() {
  const [users, setUsers] = useState<User[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => adminService.getAllUsers(),
  });

  useEffect(() => {
    if (data) {
      setUsers(data.users.filter((user) => user.role !== "ADMIN"));
    }
  }, [data]);

  if (isLoading) return <PageSkeleton />
  if (isError) return <NoTasksErrorPage />

  const seniors = users.filter((user) => user.role === 'SENIOR');
  const juniors = users.filter((user) => user.role === 'JUNIOR');

  return (
    <div className="w-full min-h-screen p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-800">
          Employees
        </h1>
        <AddUserModal />
      </div>

      {/* <div className="bg-white/90 backdrop-blur rounded-xs shadow-xl border border-slate-100 p-8"> */}
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-10 relative">

        {/* <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-slate-200" /> */}
        {/* Seniors */}
        <Section
          title="Senior Employees"
          count={seniors.length}
          accent="border-indigo-600">
          {seniors.map((emp) => (
            <EmployeeCard key={emp._id} {...emp} />
          ))}
        </Section>

        {/* Juniors */}
        <Section
          title="Junior Employees"
          count={juniors.length}
          accent="border-emerald-600">
          {juniors.map((emp) => (
            <EmployeeCard key={emp._id} {...emp} />
          ))}
        </Section>
      </div>
      {/* </div> */}
    </div>
  );
}

function Section({
  title,
  count,
  accent,
  children,
}: {
  title: string;
  count: number;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-start mb-12 gap-4">
        <h2
          className={`text-xl font-extrabold text-slate-700 border-l-4 pl-4 ${accent}`}
        >
          {title}
        </h2>
        <span
          className={`text-sm font-bold border ${accent} bg-slate-100 px-3 py-1 rounded-full`}
        >
          {count}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

function EmployeeCard({
  _id,
  name,
  email,
  teamId,
}: {
  _id: string;
  name: string;
  email: string;
  teamId: string;
}) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/employees/${_id}`)}
      className="bg-white rounded-sm border-neutral-100 cursor-pointer hover:border-neutral-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-in-out relative overflow-hidden"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div
            className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-200 group-hover:text-neutral-900 transition-colors duration-200"
          >
            <User2 size={24} />
          </div>
          {teamId && (
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 group-hover:bg-neutral-200 transition-colors duration-200">
              {teamId}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors duration-200 truncate">
          {name}
        </h3>
        <p className="text-sm text-neutral-500 truncate mt-1 group-hover:text-neutral-600 transition-colors duration-200">
          {email}
        </p>
      </CardContent>
    </Card>
  );
}
