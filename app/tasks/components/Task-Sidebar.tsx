"use client";

import { useParams, useRouter } from "next/navigation";
import { User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { adminService } from "@/services/admin-services";
import { Task } from "@/app/types/task";

export default function TaskSidebar() {
  const params = useParams();
  const id = params?.id;
  
  const [tasks, setTasks] = useState<Task[]>([])
  
  useEffect(() => {
    if (!id) return;
    const fetchTasks = async () => {
        try {
            const tasks = await adminService.getTasks();
            setTasks(Array.isArray(tasks) ? tasks : []);

        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    fetchTasks();
    }, [id]);

  if (!id) return null;
  
  const activeId = id;

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white/90 backdrop-blur px-2 py-6">
        <SidebarSection title="Tasks" tasks={tasks} activeId={activeId} />
    </aside>
  );
}

function SidebarSection ({
    title,
    tasks,
    activeId,
  }: {
    title: string;
    tasks: Task[];
    activeId?: any;
  }) {
    const router = useRouter();
    
    return (
    <div className="mb-6">
      <p className="mb-2 px-3 text-xs font-bold uppercase text-slate-500">
        {title}
      </p>

      <ul className="space-y-1">
        {tasks.map((t) => {
          const isActive = activeId === t.id;

          return (
            <li
              key={t.id}
              onClick={() => router.push(`/tasks/${t.id}`)}
              className={`
                flex items-center gap-2 rounded-lg px-3 py-2
                cursor-pointer transition
                ${
                  isActive
                    ? "bg-[#4285F4]/10 text-[#4285F4] font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              <User2 size={16} />
              <span className="truncate">{t.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
