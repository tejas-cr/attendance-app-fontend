"use client";

import { adminService } from "@/services/admin-services";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UpdateTaskForm from "../components/UpdateTaskForm";
import { Button } from "@/components/ui/button";
import DeleteTaskModal from "../components/DeleteTaskModal";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TaskPage() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => adminService.getTaskById(id as string),
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!data) {
    return <div className="p-8">Task not found</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => router.push("/tasks")}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft size={18} />
          Back to Tasks
        </button>

        <div
          className={`relative bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg border border-slate-200 transition-all ${
            isEditing ? "blur-sm scale-[0.98]" : "hover:shadow-xl"
          }`}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {data.title}
              </h1>
              <p className="text-sm text-slate-400 mt-1">Task ID: {data.id}</p>
            </div>

            <div className="flex gap-2">
              <Badge variant={data.status} />
              <PriorityBadge level={data.priority} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <Detail label="Description" value={data.description} full />
            <Detail label="Deadline" value={data.deadline} />
            <Detail label="Created At" value={data.createdAt} />
            <Detail label="Updated At" value={data.updatedAt} />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button className="rounded-xl" onClick={() => setIsEditing(true)}>
              Update Task
            </Button>

            <DeleteTaskModal
              taskId={data.id}
              onSuccess={() => setIsDeleting(false)}
            />
          </div>
        </div>

        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsEditing(false)}
            />

            <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in">
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>

              <UpdateTaskForm
                task={data}
                onSuccess={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Badge({ variant }: { variant: string }) {
  const colors: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        colors[variant?.toLowerCase()] || "bg-slate-100 text-slate-600"
      }`}
    >
      {variant}
    </span>
  );
}

function PriorityBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    high: "bg-red-100 text-red-700",
    medium: "bg-orange-100 text-orange-700",
    low: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        colors[level?.toLowerCase()] || "bg-slate-100 text-slate-600"
      }`}
    >
      {level} Priority
    </span>
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
