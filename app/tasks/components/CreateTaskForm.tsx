"use client";

import { useState } from "react";
import { adminService } from "@/services/admin-services";;
import { CreateTaskRequest, TaskPriority } from "@/app/types/task";
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

const initialState: CreateTaskRequest = {
  title: "",
  description: "",
  priority: "LOW",
  deadline: "",
  assignedToId: "",
};

interface AddTaskFormProps {
  onSuccess?: () => void;
}

export default function AddTaskForm({ onSuccess }: AddTaskFormProps) {
  const [form, setForm] = useState<CreateTaskRequest>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const updateField = (key: keyof CreateTaskRequest, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await adminService.createTask(form);

      if (res.success) {
        setSuccessMsg(res.message);
        setForm(initialState);
        onSuccess?.();
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <Field label="Task Title">
            <Input
            placeholder="Enter task title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
            />
        </Field>

        {/* Description */}
        <Field label="Description">
            <Input
            placeholder="Short task description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            required
            />
        </Field>

        {/* Assigned To */}
        <Field label="Assign To (Employee ID)">
            <Input
            placeholder="Employee ID"
            value={form.assignedToId}
            onChange={(e) => updateField("assignedToId", e.target.value)}
            required
            />
        </Field>

        {/* Priority + Deadline */}
        <div className="grid grid-cols-2 gap-4">
            <Field label="Priority">
            <Select
                value={form.priority}
                onValueChange={(value) =>
                updateField("priority", value as TaskPriority)
                }
            >
                <SelectTrigger>
                <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
            </Select>
            </Field>

            <Field label="Deadline">
            <Input
                type="date"
                value={form.deadline}
                onChange={(e) => updateField("deadline", e.target.value)}
                required
            />
            </Field>
        </div>

        {/* Error */}
        {error && (
            <p className="text-sm text-red-600">{error}</p>
        )}

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Task..." : "Create Task"}
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

