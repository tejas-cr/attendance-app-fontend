"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { Task } from "@/app/types/task";
import { adminService } from "@/services/admin-services";
import CreateTaskModal from "./CreateTaskModal";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PageSkeleton } from "@/components/skeletons/PageSkeleton";
import { NoTasksErrorPage } from "./NoTaskErrorPage";

const fetchTasks = async () => {
  try {
    const tasks = await adminService.getTasks();
    return tasks;
  } catch (error) {
    console.error("Failed to fetch users", error);
  }
};
export default function TasksPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'REVIEW'>("all");
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  })

  if (isLoading) return <PageSkeleton />
  if (error) return <NoTasksErrorPage />


  const filteredTasks = data?.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase());

    const matchesFilter = filter === "all" || task.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full min-h-screen p-8 border">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-800">Tasks</h1>
        <CreateTaskModal />
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl pb-20 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-1/2">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search tasks or assignee..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              ALL
            </FilterButton>
            <FilterButton
              active={filter === "TODO"}
              onClick={() => setFilter("TODO")}
            >
              TODO
            </FilterButton>
            <FilterButton
              active={filter === "IN_PROGRESS"}
              onClick={() => setFilter("IN_PROGRESS")}
            >
              IN PROGRESS
            </FilterButton>
            <FilterButton
              active={filter === "COMPLETED"}
              onClick={() => setFilter("COMPLETED")}
            >
              DONE
            </FilterButton>
            <FilterButton
              active={filter === "REVIEW"}
              onClick={() => setFilter("REVIEW")}
            >
              REVIEW
            </FilterButton>
          </div>
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks?.map((task: any) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {filteredTasks?.length === 0 && (
          <p className="text-slate-500 col-span-full text-center">
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer
        ${
          active
            ? "bg-blue-600 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
    >
      {children}
    </button>
  );
}

function TaskCard({ task }: { task: any }) {
  const router = useRouter();
  const deadlineDate = new Date(task.deadline);

  return (
    <div
      onClick={() => router.push(`/tasks/${task.id}`)}
      className="bg-white/90 backdrop-blur-sm rounded-sm p-6 shadow-xl shadow-slate-200/50 border border-neutral-100 cursor-pointer
      hover:-translate-y-1 hover:shadow-2xl hover:border-neutral-200 transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-slate-800">{task.title}</h3>
        <StatusIcon status={task.status} />
      </div>

      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* <div className="flex items-center justify-between mt-auto">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600"
        >
          <Users size={16} />
          {task.assignees.length} members
        </button>
      </div> */}

      {/* <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
        <ul className="space-y-1">
          {task.assignees.map((member: string) => (
            <li key={member} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-200" />
              {member}
            </li>
          ))}
        </ul>
      </div> */}

      <div className="flex items-center justify-between mt-4">
        {/* <StatusBadge status={task.status} /> */}
        <div className={`flex items-center gap-1 text-sm font-medium`}>
          <Calendar size={14} />
          {deadlineDate.toLocaleDateString()}
        </div>
        <PriorityBadge priority={task.priority} />
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "COMPLETED")
    return <CheckCircle className="text-green-600" size={18} />;
  if (status === "IN_PROGRESS")
    return <Clock className="text-yellow-500" size={18} />;
  return <AlertCircle className="text-red-500" size={18} />;
}

function StatusBadge({ status }: { status: string }) {
  const map: any = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-red-100 text-red-700",
    "in-progress": "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${map[status]}`}>
      {status.replace("-", " ").toUpperCase()}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: any = {
    HIGH: "bg-red-50 text-red-600",
    LOW: "bg-green-50 text-green-600",
  };

  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${map[priority]}`}
    >
      {priority.toUpperCase()}
    </span>
  );
}
