"use client"

import { adminService } from "@/services/admin-services";
import { Calendar, CheckCircle, CircleAlert, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@/services/auth-service";
import { countAttendance } from "@/app/utils/countAttendance";
import { AttendanceMember } from "@/app/types/attendance";
import { useRouter } from "next/navigation";

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

                setUsers(Array.isArray(users) ? users : []);
                setMembers(members);

            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const attendanceStats = countAttendance(members);

    const stats = [
        {
            title: "Employee's",
            count: users.length - 1,
            icon: <Users size={28} />,
            color: "text-[#4285F4]", // Google Blue
            bg: "bg-[#4285F4]/10",
            path: "/employees",
        },
        {
            title: "Present",
            count: attendanceStats.present,
            icon: <CheckCircle size={28} />,
            color: "text-[#34A853]", // Google Green
            bg: "bg-[#34A853]/10",
            path: "/attendance",
        },
        {
            title: "Absent",
            count: attendanceStats.absent - 1,
            icon: <CircleAlert size={28} />,
            color: "text-[#DB4437]", // Google Red
            bg: "bg-[#DB4437]/10",
            path: "/attendance",
        },
    ];

    return (
    <main className="w-full bg-accent min-h-screen">

      {/* --- Modules Grid --- */}
      <section className="relative mt-1 z-30 max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-white/50 shadow-sm text-sm font-bold text-slate-600">
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
            <div
              key={index}
              onClick={() => {item.path ? router.push(item.path) : null }}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-white/50 cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-8">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} transition-transform group-hover:scale-110 duration-300`}
                >
                  {item.icon}
                </div>
                
                <div className="text-right">
                    <p className="text-3xl font-extrabold text-slate-800 group-hover:text-[#4285F4] transition-colors">
                    {loading ? "..." : item.count}
                    </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-[#4285F4] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}