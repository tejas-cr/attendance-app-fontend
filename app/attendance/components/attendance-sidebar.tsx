"use client";

import { useParams, useRouter } from "next/navigation";
import { User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { adminService } from "@/services/admin-services";
import { UserAttendance } from "@/app/types/attendance";

export default function AttendanceSidebar() {
  const params = useParams();
  const id = params?.id;
  
  const [users, setUsers] = useState<UserAttendance[]>([])
  
  useEffect(() => {
    if (!id) return;

    adminService.getUserAttendance()
    .then(({ users }: any) => {
      setUsers(Array.isArray(users) ? users : []);
    })
    .catch((err) => {
      console.error("Failed to fetch users", err);
    })
  }, [id])

  if (!id) return null;
  
  const present = users.filter(u => u.today.status === "PRESENT");
  const absent = users.filter(u => u.today.status === "ABSENT");
  
  const activeId = id;

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white/90 backdrop-blur px-2 py-6">
        <SidebarSection title="Present Employees" users={present} activeId={activeId} accent={true}/>
        <SidebarSection title="Absent Employees" users={absent} activeId={activeId} />
    </aside>
  );
}

function SidebarSection ({
    title,
    users,
    activeId,
    accent,
  }: {
    title: string;
    users: UserAttendance[];
    activeId?: any;
    accent?: boolean
  }) {
    const router = useRouter();
    
    return (
    <div className="mb-6">
      <p className="mb-2 px-3 text-xs font-bold uppercase text-slate-500">
        {title}
      </p>

      <ul className="space-y-1">
        {users.map((u) => {
          const isActive = activeId === u.id;

          return (
            <li
              key={u.id}
              onClick={() => router.push(`/attendance/${u.id}`)}
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
              <User2 className={`text-${accent ? "green-600" : "red-600"}`} size={16} />
              <span className="truncate">{u.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
