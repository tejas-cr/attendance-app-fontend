"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateTaskForm from "./CreateTaskForm";
import { ClipboardPen } from "lucide-react";

export default function CreateTaskModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
        className="rounded-xs"
        >
            <ClipboardPen />
            Add Task
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <CreateTaskForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
