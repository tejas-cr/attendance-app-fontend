"use client";

import { adminService } from "@/services/admin-services";
import { useState } from "react";
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
import { Task, TaskPriority, TaskStatus, UpdateTaskInput } from "@/app/types/task";

export default function UpdateTaskForm({
  task,
  onSuccess,
}: {
  task: Task;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<UpdateTaskInput>({
  title: task.title,
  description: task.description,
  priority: task.priority,
  status: task.status,
  assignedToId: task.assignedToId,
  deadline: task.deadline
    ? new Date(task.deadline).toISOString().slice(0, 10)
    : "",
});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateField = (key: keyof UpdateTaskInput, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
        const res = await adminService.updateTask(task.id, form);

        if (res.success) {
            setSuccess(res.message);
            setForm((prev) => ({
                ...prev,
                deadline: res.data.deadline
                    ? new Date(res.data.deadline).toISOString().slice(0, 10)
                    : "",
            }));
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
      <div className="w-full bg-white rounded-3xl p-8 shadow-xl space-y-8">

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-6">
          <h2 className="text-xl font-bold text-slate-700">
            Update Task
          </h2>

          <Field label="Title">
            <Input
              value={form.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </Field>

          <Field label="Description">
            <Input
              value={form.description || ""}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </Field>

          <Field label="Assign To (Employee ID)">
            <Input
              value={form.assignedToId || ""}
              onChange={(e) =>
                updateField("assignedToId", e.target.value)
              }
            />
          </Field>

          <div className="grid grid-cols-3 gap-4">
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
            
            <Field label="Status">
              <Select
                value={form.status}
                onValueChange={(value) =>
                  updateField("status", value as TaskStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODO">To Do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="REVIEW">Review</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Deadline">
              <Input
                type="date"
                value={form.deadline || ""}
                onChange={(e) =>
                  updateField("deadline", e.target.value)
                }
              />
            </Field>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Updating..." : "Update Task"}
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
