import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z.string().min(1, "The name is required.").max(50),
  description: z.string().max(80).optional(),
  definition: z.string().optional(),
});

export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;
