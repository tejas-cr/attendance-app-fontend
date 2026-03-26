"use client";

import { useParams, useRouter } from "next/navigation";
import { User2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEmployessAdmin } from "@/lib/actions/employee.admin.actions";
import { useEffect } from "react";

type User = {
  _id: string;
  name: string;
  role: "SENIOR" | "JUNIOR";
};

export default function EmployeeSidebar() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const {data, isLoading, error} = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const accessToken = window.localStorage.getItem('access_token') ?? '';
      const refreshToken = window.localStorage.getItem('refresh_token') ?? '';
      return getEmployessAdmin(accessToken, refreshToken);
    },
  })

  
  
  useEffect(() => {
    if (data?.access_token) window.localStorage.setItem('access_token', data.access_token);
    if (data?.refresh_token) window.localStorage.setItem('refresh_token', data.refresh_token);
  }, [data?.access_token, data?.refresh_token]);
  if (!id) return null;
  if (isLoading) return <aside className="w-64 px-4 py-6">Loading...</aside>;
  if (error) return <aside className="w-64 px-4 py-6">Failed to load users</aside>;
  
  const users = data?.users ?? [];

  const seniors = users.filter(u => u.role === "SENIOR");
  const juniors = users.filter(u => u.role === "JUNIOR");
  
  const activeId = id;

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white/90 backdrop-blur px-2 py-6">
        <SidebarSection title="Senior Employees" users={seniors} activeId={activeId} />
        <SidebarSection title="Junior Employees" users={juniors} activeId={activeId} />
    </aside>
  );
}

function SidebarSection ({
    title,
    users,
    activeId,
  }: {
    title: string;
    users: any;
    activeId?: any;
  }) {
    const router = useRouter();
    
    return (
    <div className="mb-6">
      <p className="mb-2 px-3 text-xs font-bold uppercase text-slate-500">
        {title}
      </p>

      <ul className="space-y-1">
        {users.map((u: User) => {
          const isActive = activeId === u._id;

          return (
            <li
              key={u._id}
              onClick={() => router.push(`/employees/${u._id}`)}
              className={`
                flex items-center gap-2 rounded-lg px-3 py-2
                cursor-pointer transition
                ${
                  isActive
                    ? "bg-[#4285F4]/10 text-[#4285F4] font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              <User2 size={16} />
              <span className="truncate">{u.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
