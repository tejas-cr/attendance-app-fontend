"use client";

import { adminService } from "@/services/admin-services";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UpdateTaskForm from "../components/UpdateTaskForm";
import { Button } from "@/components/ui/button";
import DeleteTaskModal from "../components/DeleteTaskModal";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// export default function TaskPage() {
//   const { id } = useParams();
//   const [task, setTask] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const {data} = await adminService.getTaskById(id as string);
//         setTask(data);
//       } catch (err) {
//         console.error("Failed to fetch task", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTask();
//   }, [id]);

//   if (loading) {
//     return <div className="p-8">Loading...</div>;
//   }

//   if (!task) {
//     return <div className="p-8">Task not found</div>;
//   }

//   return (
//     <div className="w-full min-h-screen flex  items-center justify-center p-8">
//       {/* Card container */}
//       <div className="relative w-full max-w-2xl">

//         {/* Task Card */}
//         <div
//           className={`bg-white rounded-3xl p-8 shadow-xl transition-all ${
//             isEditing ? "blur-sm scale-[0.98]" : ""
//           }`}
//         >
//           <h1 className="text-3xl font-black text-slate-800 mb-4">
//             {task.title}
//           </h1>

//           <div className="space-y-3 text-slate-600">
//             <p><strong>Id:</strong> {task.id}</p>
//             <p><strong>Description:</strong> {task.description}</p>
//             <p><strong>Status:</strong> {task.status}</p>
//             <p><strong>Priority:</strong> {task.priority}</p>
//             <p><strong>Deadline:</strong> {task.deadline}</p>
//             <p><strong>Created At:</strong> {task.createdAt}</p>
//             <p><strong>Updated At:</strong> {task.updatedAt}</p>
//           </div>

//           <div className="flex justify-end gap-4">
//             <Button
//               onClick={() => setIsEditing(true)}
//             >
//               Update Task
//             </Button>
//             <DeleteTaskModal
//               taskId={task.id}
//               onSuccess={() => setIsDeleting(false)}
//             />
//           </div>
//         </div>

//         {/* Overlay */}
//         {isEditing && (
//           <div className="absolute inset-0 z-50 flex items-center justify-center">
//             {/* Dark backdrop */}
//             <div
//               className="absolute inset-0 bg-black/40 rounded-3xl"
//               onClick={() => setIsEditing(false)}
//             />

//             {/* Form modal */}
//             <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl">
//               <div className="flex items-center justify-end">
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="text-slate-400 hover:text-slate-600 text-xl mr-4 mt-4"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <UpdateTaskForm
//                 task={task}
//                 onSuccess={() => setIsEditing(false)}
//               />
//             </div>
//           </div>
//         )}

//         {isDeleting && (
//           <DeleteTaskModal
//             taskId={task.id}
//             onSuccess={() => setIsDeleting(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

export default function TaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await adminService.getTaskById(id as string);
        setTask(data);
      } catch (err) {
        console.error("Failed to fetch task", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!task) return <div className="p-8">Task not found</div>;

  return (
    <main className="w-full min-h-screen bg-accent px-6 py-10">
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
