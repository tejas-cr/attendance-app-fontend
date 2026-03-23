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
import AddUserForm from "./AddUserForm";
import { UserPlus } from "lucide-react";

export default function AddUserModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
        className="rounded-xs"
        >
            <UserPlus />
            Add User
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <AddUserForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
