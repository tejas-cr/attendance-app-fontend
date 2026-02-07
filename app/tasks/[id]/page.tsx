"use client";

import { adminService } from "@/services/admin-services";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UpdateTaskForm from "../components/UpdateTaskForm";
import { Button } from "@/components/ui/button";
import DeleteTaskModal from "../components/DeleteTaskModal";
import { useQuery } from "@tanstack/react-query";

export default function TaskPage() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    <div className="w-full min-h-screen flex  items-center justify-center p-8">
      {/* Card container */}
      <div className="relative w-full max-w-2xl">

        {/* Task Card */}
        <div
          className={`bg-white rounded-3xl p-8 shadow-xl transition-all ${
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

        {/* Overlay */}
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
    </div>
  );
}