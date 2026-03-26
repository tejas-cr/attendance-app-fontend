"use client";

import { useState } from "react";
import { adminService } from "@/services/admin-services";
import { CreateUserRequest } from "@/services/admin-services";
import { UserRole } from "@/app/types/attendance";
import { useQueryClient } from "@tanstack/react-query";
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
import { generateEmployeeId } from "@/app/utils/idGenerator";
import { Eye, EyeOff } from "lucide-react";

const initialState: CreateUserRequest = {
  employeeId: "",
  name: "",
  email: "",
  phone: "",
  role: "JUNIOR",
  teamId: "",
  password: "",
  shiftStart: "09:00",
  shiftEnd: "18:00",
};

interface AddUserFormProps {
  onSuccess?: () => void;
}

export default function AddUserForm({ onSuccess }: AddUserFormProps) {
  const [form, setForm] = useState<CreateUserRequest>(initialState);
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const updateField = (key: keyof CreateUserRequest, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const employeeId = generateEmployeeId();
      const res = await adminService.createUser({ ...form, employeeId: employeeId });

      if (res.success) {
        setSuccessMsg(res.message);
        setTempPassword(res.data.tempPassword);
        setForm(initialState);
        setTimeout(() => onSuccess?.(), 2000);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Name */}
        <Field label="Name">
          <Input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
        </Field>
        {/* Email */}
        <Field label="Email">
          <Input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
          />
        </Field>

      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Phone */}
        <Field label="Phone">
          <Input
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            required
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Role */}
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
              <SelectItem value="SENIOR">Senior</SelectItem>
              <SelectItem value="JUNIOR">Junior</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Team ID */}
        <Field label="Team ID">
          <Input
            value={form.teamId}
            onChange={(e) => updateField("teamId", e.target.value)}
            required
          />
        </Field>
      </div>

      {/* Password */}
      <Field label="Password">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </Field>

      {/* Shift */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Shift Start">
          <Input
            type="time"
            value={form.shiftStart}
            onChange={(e) => updateField("shiftStart", e.target.value)}
          />
        </Field>

        <Field label="Shift End">
          <Input
            type="time"
            value={form.shiftEnd}
            onChange={(e) => updateField("shiftEnd", e.target.value)}
          />
        </Field>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Success */}
      {successMsg && (
        <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
          <p>{successMsg}</p>
          {tempPassword && (
            <p className="mt-1">
              Temporary Password:{" "}
              <span className="font-semibold">{tempPassword}</span>
            </p>
          )}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create User"}
      </Button>
    </form>
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

