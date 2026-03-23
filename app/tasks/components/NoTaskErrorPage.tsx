import { AlertTriangle, PlusCircle } from "lucide-react";
import CreateTaskModal from "./CreateTaskModal";

export function NoTasksErrorPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-xl text-center px-6">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600 shadow-inner">
          <AlertTriangle size={36} />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black text-slate-800 mb-4">
          No tasks available
        </h1>

        {/* Message */}
        <p className="text-slate-600 text-lg mb-10 leading-relaxed">
          We couldn’t find any tasks for this workspace.  
          This usually means no tasks have been created yet.
        </p>

        {/* Actions */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CreateTaskModal>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition">
              <PlusCircle size={18} />
              Create task
            </button>
          </CreateTaskModal>

          <button
            onClick={() => window.location.reload()}
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Retry
          </button>
        </div> */}

        {/* Footer hint */}
        <p className="mt-10 text-sm text-slate-400">
          If you believe this is a mistake, please contact an administrator.
        </p>
      </div>
    </div>
  );
}
