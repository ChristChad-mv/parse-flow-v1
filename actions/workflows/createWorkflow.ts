"use server";

import { prisma } from "@/lib/prisma";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { auth } from "@clerk/nextjs/server";
import { WorkflowStatus } from "@/types/workflow";

export async function CreateWorkflow(form: createWorkflowSchemaType) {

  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const result = await prisma.workflow.create({
    data: {
      ...data, 
      userId,
      status: WorkflowStatus.DRAFT,
      definition: data.definition ?? "", 
      description: data.description ?? "",
    },
  });

  if (!result) {
    throw new Error("Failed to create a workflow");
  }

  return { id: result.id };
}