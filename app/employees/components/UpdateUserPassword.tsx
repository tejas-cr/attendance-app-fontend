"use client";

import { adminService } from "@/services/admin-services";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";


export default function UpdateUserPassword({
    id,
    onSuccess
}: {
    id: string;
    onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const updateField = (value: string) => {
    setPassword(value);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            setSaving(false);
            return;
        }

        const res = await adminService.updateUserPassword(id, {password});

        if (res.success) {
            setSuccess(res.message);
            setPassword("");
            setTimeout(() => onSuccess?.(), 2000);
        }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-3xl p-8 shadow-xl space-y-8">

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-6">
          <h2 className="text-xl font-bold text-slate-700">
            New Password
          </h2>

          <Field label="Password">
            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => updateField(e.target.value)}
                    className="pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                </button>

            </div>
          </Field>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <Button type="submit" disabled={saving || !password} className="w-full">
            {saving ? "Updating..." : "Update Password"}
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
