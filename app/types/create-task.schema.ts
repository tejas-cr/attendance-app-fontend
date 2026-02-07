import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["LOW", "HIGH"]),
  deadline: z.string().min(1, "Deadline is required"),
  assignedToId: z.string().min(1, "Please select a user"),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
