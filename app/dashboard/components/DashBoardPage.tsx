"use client";

import { adminService } from "@/services/admin-services";
import {
  Calendar,
  UserPlus,
  Users,
  UserMinus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@/services/auth-service";
import { countAttendance } from "@/app/utils/countAttendance";
import { AttendanceMember } from "@/app/types/attendance";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [members, setMembers] = useState<AttendanceMember[]>([]);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { users } = await adminService.getAllUsers();
        const { members } = await adminService.getAttendance();

        setUsers(Array.isArray(users) ? users.filter((user) => user.role !== "ADMIN") : []);
        setMembers(members.filter((member) => member.role !== "ADMIN"));
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchUsers();
  }, []);

  const attendanceStats = countAttendance(members);

  const stats = [
    {
      title: "Employee's",
      count: users.length,
      icon: <Users size={28} />,
      color: "text-[#4285F4]",
      bg: "bg-[#4285F4]/10",
      path: "/employees",
    },
    {
      title: "Present",
      count: attendanceStats.present,
      icon: <UserPlus size={28} />,
      color: "text-[#34A853]",
      bg: "bg-[#34A853]/10",
      path: "/attendance",
    },
    {
      title: "Absent",
      count: attendanceStats.absent,
      icon: <UserMinus size={28} />,
      color: "text-[#DB4437]",
      bg: "bg-[#DB4437]/10",
      path: "/attendance",
    },
  ];
  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <main className="w-full min-h-screen ">

      {/* --- Modules Grid --- */}
      <section className="relative z-30 max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-white/50 shadow-sm text-sm font-bold text-slate-600 mt-3">
            <Calendar size={18} className="text-[#4285F4]" />
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <Card
              key={index}
              onClick={() => { item.path ? router.push(item.path) : null }}
              className="group bg-white rounded-sm border-neutral-100 cursor-pointer hover:border-neutral-200 
              hover:shadow-md hover:-translate-y-1
              transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2
              "
              tabIndex={item.path ? 0 : -1}
              role={item.path ? "button" : undefined}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.bg} ${item.color} transition-transform duration-200`}
                  >
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-neutral-900 tabular-nums">
                      {loading ? "..." : item.count}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <h3 className="text-sm font-medium text-neutral-600">
                  {item.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
