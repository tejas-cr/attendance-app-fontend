"use client";

import { adminService } from "@/services/admin-services";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import UpdateUserForm from "../components/UpdateUserForm";
import UpdateUserPassword from "../components/UpdateUserPassword";

export default function EmployeePage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const {data} = await adminService.getUserById(id as string);
        setEmployee(data);
      } catch (err) {
        console.error("Failed to fetch employee", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!employee) {
    return <div className="p-8">Employee not found</div>;
  }

  return (
    <div className="w-full flex bg-accent">
      <div className="w-full bg-white rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-black text-slate-800 mb-4">
          {employee.name}
        </h1>

        <div className="space-y-3 text-slate-600">
          <p><strong>Id:</strong> {employee.employeeId}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Role:</strong> {employee.role}</p>
          <p><strong>Team:</strong> {employee.teamId || "—"}</p>
          <p><strong>Shift Start:</strong> {employee.shiftStart}</p>
          <p><strong>Shift End:</strong> {employee.shiftEnd}</p>
          <p><strong>Created At:</strong> {employee.createdAt}</p>
          <p><strong>Updated At:</strong> {employee.updatedAt}</p>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            className="mt-6"
            onClick={() => setIsEditing(true)}
          >
            Update User
          </Button>
          <Button
            className="mt-6"
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
            className="absolute inset-0 bg-black/40 rounded-3xl"
            onClick={() => setIsEditing(false)}
          />

          {/* Form modal */}
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl">
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
            className="absolute inset-0 bg-black/40 rounded-3xl"
            onClick={() => setPasswordModalOpen(false)}
          />

          {/* Form modal */}
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl">
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
  );
}
