"use client";

import { adminService } from "@/services/admin-services";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CircleX } from "lucide-react";

export default function DeleteTaskModal({
    taskId,
    onSuccess,
}: {
    taskId: string;
    onSuccess: () => void
}) {
    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        try {
            const res = await adminService.deleteTask(taskId);
            console.log(res)
            onSuccess?.();
            setOpen(false);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

  return (
    <div>
        <Dialog 
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600">
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="border ">
                <DialogHeader className="flex flex-col items-center">
                    <DialogTitle>Delete Task</DialogTitle>
                    <DialogDescription>
                        <CircleX className="text-red-500 "/>
                    </DialogDescription>
                </DialogHeader>
                    <div className="flex justify-evenly">
                        <Button onClick={handleDelete}>
                            OK
                        </Button>
                        <Button onClick={() => setOpen(false)}>
                            CANCEL
                        </Button>
                    </div>
            </DialogContent>
        </Dialog>
    </div>
  );
}