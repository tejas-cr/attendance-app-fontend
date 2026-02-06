"use client";

import { adminService } from "@/services/admin-services";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UpdateTaskForm from "../components/UpdateTaskForm";
import { Button } from "@/components/ui/button";
import DeleteTaskModal from "../components/DeleteTaskModal";

export default function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const {data} = await adminService.getTaskById(id as string);
        setTask(data);
      } catch (err) {
        console.error("Failed to fetch task", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!task) {
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
            {task.title}
          </h1>

          <div className="space-y-3 text-slate-600">
            <p><strong>Id:</strong> {task.id}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Deadline:</strong> {task.deadline}</p>
            <p><strong>Created At:</strong> {task.createdAt}</p>
            <p><strong>Updated At:</strong> {task.updatedAt}</p>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => setIsEditing(true)}
            >
              Update Task
            </Button>
            <DeleteTaskModal
              taskId={task.id}
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
                task={task}
                onSuccess={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}

        {isDeleting && (
          <DeleteTaskModal
            taskId={task.id}
            onSuccess={() => setIsDeleting(false)}
          />
        )}
      </div>
    </div>
  );
}