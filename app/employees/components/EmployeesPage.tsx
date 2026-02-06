"use client";

import { adminService } from "@/services/admin-services";
import { User } from "@/services/auth-service";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmployeesPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const { users } = await adminService.getAllUsers();

              setUsers(Array.isArray(users) ? users : []);

          } catch (error) {
              console.error("Failed to fetch users", error);
          } finally {
              setLoading(false);
          }
      };

      fetchUsers();
  }, []);

  const seniors = users.filter((user) => user.role === 'SENIOR');
  const juniors = users.filter((user) => user.role === 'JUNIOR');  

  return (
    <div className="w-full min-h-screen bg-accent p-8">
      <h1 className="text-3xl font-black text-slate-800 mb-8">
        Employees
      </h1>

      <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-slate-100 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-10 relative">

          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-slate-200" />
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
      </div>
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
      <div className="flex items-center justify-between mb-12">
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
    <div
      onClick={() => router.push(`/employees/${_id}`)}
      className="
        group relative overflow-hidden
        rounded-xl border border-slate-200/60
        bg-white/90 p-5
        shadow-sm hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      <div className="flex items-start gap-4">
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-xl bg-slate-100 text-slate-600
            group-hover:bg-[#4285F4]/10 group-hover:text-[#4285F4]
            transition-all duration-300
          "
        >
          <User2 size={20} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p
              className="
                truncate font-semibold text-slate-800
                group-hover:text-[#4285F4]
                transition-colors
              "
            >
              {name}
            </p>

            {/* Team badge */}
            {teamId && (
              <span
                className="
                  absolute right-1 top-1
                  rounded-full bg-slate-100 px-2.5 py-0.5
                  text-xs font-medium text-slate-600
                  group-hover:bg-[#4285F4]/10 group-hover:text-[#4285F4]
                  transition-colors
                "
              >
                {teamId}
              </span>
            )}
          </div>

          <p
            className="
              mt-1 truncate text-sm text-slate-500
              group-hover:text-slate-600
              transition-colors
            "
          >
            {email}
          </p>
        </div>
      </div>
    </div>
  );
}
