import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import Editor from '../../_components/Editor';
import { NextPage } from 'next';

interface WorkflowPageProps {
  params: {
    workflowId: string;
  };
}

const Page: NextPage<WorkflowPageProps> = async ({ params }) => {
  const { workflowId } = params;
  const { userId } = await auth();

  if (!userId) return <div>Unauthentificated </div>;
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) return <div>Workflow not found</div>;

  return <Editor workflow={workflow} />;
};

export default Page;