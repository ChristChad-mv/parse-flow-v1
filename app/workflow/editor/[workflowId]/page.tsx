import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import React from 'react';
import Editor from '../../_components/Editor';

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { workflowId } = await params; // Ajout de await pour résoudre la promesse
  const { userId } = await auth();

  if (!userId) {
    notFound(); // ou redirect('/sign-in') si tu veux
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    notFound();
  }

  return <Editor workflow={workflow} />;
}
