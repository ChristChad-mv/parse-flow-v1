"use server";

import { prisma } from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { WorkflowExecutionPlan } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const {userId} = await auth();

  if(!userId) {
    throw new Error("Unauthentificated")
  }

  const workflow = prisma.workflow.findUnique({
    where: {
      userId, 
      id: form.workflowId, 
    }, 
  });
  
  if(!workflow) {
    throw new Error("Workflow not found.")
  }

  let executionPlan: WorkflowExecutionPlan = [];
  if(!form.flowDefinition) {
    throw new Error("workflow definiition is not defined")
  }

  const flow = JSON.parse(form.flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if(!result.executionPlan) {
    throw new Error("")
  }

  executionPlan = result.executionPlan;
  console.log(executionPlan);
}