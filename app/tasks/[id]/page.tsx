"use client";

import { adminService } from "@/services/admin-services";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UpdateTaskForm from "../components/UpdateTaskForm";
import { Button } from "@/components/ui/button";
import DeleteTaskModal from "../components/DeleteTaskModal";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const fetchTask = async (id: string) => {
  const {data: task} = await adminService.getTaskById(id);
  return task;
};
export default function TaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const {data: task, isLoading, error} = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => fetchTask(id as string),
  });

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (!task) return <div className="p-8">Task not found</div>;

  return (
    <main className="w-full min-h-screen  px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div
          className={`relative bg-white rounded-3xl p-8 shadow-xl transition ${
            isEditing ? "blur-sm scale-[0.98]" : ""
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-slate-800">
                {task.title}
              </h1>
              <p className="text-sm text-slate-500 mt-1">Task ID: {task.id}</p>
            </div>

            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
              {task.status}
            </span>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <Detail label="Description" value={task.description} full />
            <Detail label="Priority" value={task.priority} />
            <Detail label="Deadline" value={task.deadline} />
            <Detail label="Created At" value={task.createdAt} />
            <Detail label="Updated At" value={task.updatedAt} />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <Button onClick={() => setIsEditing(true)}>Update Task</Button>

            <DeleteTaskModal taskId={task.id} onSuccess={() => router.back()} />
          </div>
        </div>

        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsEditing(false)}
            />

            <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl">
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>

              <UpdateTaskForm
                task={task}
                onSuccess={() => setIsEditing(false)}
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
      <p className="text-xs font-semibold text-slate-400 mb-1">{label}</p>
      <p className="text-slate-700">{value}</p>
    </div>
  );
}
