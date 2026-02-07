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
    <main className="w-full min-h-screen px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => router.push("/tasks")}
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
          <h1 className="text-3xl font-black text-slate-800 mb-4">
            {data.title}
          </h1>

          <div className="space-y-3 text-slate-600">
            <p><strong>Id:</strong> {data.id}</p>
            <p><strong>Description:</strong> {data.description}</p>
            <p><strong>Status:</strong> {data.status}</p>
            <p><strong>Priority:</strong> {data.priority}</p>
            <p><strong>Deadline:</strong> {data.deadline}</p>
            <p><strong>Created At:</strong> {data.createdAt}</p>
            <p><strong>Updated At:</strong> {data.updatedAt}</p>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => setIsEditing(true)}
            >
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
                task={data}
                onSuccess={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}

        {isDeleting && (
          <DeleteTaskModal
            taskId={data.id}
            onSuccess={() => setIsDeleting(false)}
          />
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
