"use client";

import { adminService } from "@/services/admin-services";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TeamStatusResponse, UserByIdResponse, UserUpdateInput } from "@/app/types/user";
import { UserRole } from "@/app/types/attendance";
import { useQueryClient } from "@tanstack/react-query";


export default function UpdateUserForm({
  data,
  onSuccess,
}: {
  data: UserByIdResponse["data"];
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<UserUpdateInput>({
    name: data.name,
    role: data.role,
    teamId: data.teamId,
    shiftStart: data.shiftStart,
    shiftEnd: data.shiftEnd
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const updateField = (key: keyof UserUpdateInput, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
        const res = await adminService.updateUser(data._id, form);
        queryClient.invalidateQueries({ queryKey: ["employees"] });

        if (res.success) {
            setSuccess(res.message);
            setForm(prev => prev);
            onSuccess?.();
        }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-sm p-8 shadow-xl space-y-8">

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-6">
          <h2 className="text-xl font-bold text-slate-700">
            Update User
          </h2>

          <Field label="Title">
            <Input
              value={form.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </Field>

          <Field label="Team ID">
            <Input
              value={form.teamId || ""}
              onChange={(e) =>
                updateField("teamId", e.target.value)
              }
            />
          </Field>

          <Field label="Role">
            <Select
              value={form.role}
              onValueChange={(value) =>
                updateField("role", value as UserRole)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SENIOR">SENIOR</SelectItem>
                <SelectItem value="JUNIOR">JUNIOR</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Shift Start">
              <Input
                type="time"
              value={form.shiftStart}
              onChange={(e) =>
                updateField("shiftStart", e.target.value)
              }
            />
            </Field>
            <Field label="Shift End">
              <Input
                type="time"
                value={form.shiftEnd}
                onChange={(e) =>
                  updateField("shiftEnd", e.target.value)
                }
              />
            </Field>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Updating..." : "Update User"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
