"use client";

import { adminService } from "@/services/admin-services";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import UpdateUserForm from "../components/UpdateUserForm";
import UpdateUserPassword from "../components/UpdateUserPassword";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function EmployeePage() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const router = useRouter();

  const { data: employee, isLoading, error } = useQuery({
    queryKey: ["employees", id],
    queryFn: () => adminService.getUserById(id as string).then(res => res.data),
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!employee) {
    return <div className="p-8">Employee not found</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => router.push("/employees")}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft size={18} />
          Back to Employees
        </button>

        <div
          className={`relative bg-white/80 backdrop-blur rounded-sm p-8 shadow-lg border border-slate-200 transition-all ${
            isEditing || passwordModalOpen ? "blur-sm scale-[0.98]" : "hover:shadow-xl"
          }`}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {employee.name}
              </h1>
              <p className="text-sm text-slate-400 mt-1">Employee ID: {employee.employeeId}</p>
            </div>
            <div className="flex gap-2">
              <RoleBadge level={employee.role} />
              <TeamBadge variant={employee.teamId} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <Detail label="Email" value={employee.email} full/>
            <Detail label="Shift Start" value={employee.shiftStart} />
            <Detail label="Shift End" value={employee.shiftEnd} />
            <Detail label="Created At" value={employee.createdAt} />
            <Detail label="Updated At" value={employee.updatedAt} />
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <Button
              className="rounded-xs"
              onClick={() => setIsEditing(true)}
            >
              Update User
            </Button>
            <Button
              className="rounded-xs"
              onClick={() => setPasswordModalOpen(true)}
            >
              Update Password
            </Button>
          </div>
        </div>

        {isEditing && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            {/* Dark backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsEditing(false)}
            />

            {/* Form modal */}
            <div className="relative w-full max-w-xl bg-white rounded-sm shadow-2xl">
              <div className="flex items-center justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400 hover:text-slate-600 text-xl mr-4 mt-4"
                >
                  ✕
                </button>
              </div>

              <UpdateUserForm
                data={employee}
                onSuccess={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}
        {passwordModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            {/* Dark backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setPasswordModalOpen(false)}
            />

            {/* Form modal */}
            <div className="relative w-full max-w-md bg-white rounded-sm shadow-2xl">
              <div className="flex items-center justify-end">
                <button
                  onClick={() => setPasswordModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-xl mr-4 mt-4"
                >
                  ✕
                </button>
              </div>

              <UpdateUserPassword
                id={employee._id}
                onSuccess={() => setPasswordModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


function Detail({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-slate-700 leading-relaxed">{value || "—"}</p>
    </div>
  );
}
function TeamBadge({ variant }: { variant: string }) {
  const colors: Record<string, string> = {
    TEAM_1: "bg-green-100 text-green-700",
    TEAM_2: "bg-yellow-100 text-yellow-700",
    TEAM_3: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        colors[variant] || "bg-slate-100 text-slate-600"
      }`}
    >
      {variant}
    </span>
  );
}

function RoleBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    ADMIN: "bg-red-100 text-red-700",
    SENIOR: "bg-orange-100 text-orange-700",
    JUNIOR: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        colors[level] || "bg-slate-100 text-slate-600"
      }`}
    >
      {level} 
    </span>
  );
}