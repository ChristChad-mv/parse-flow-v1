"use client";


import { AlertDescription } from '@/components/ui/alert';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel
 } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
}

function DeleteWorkflowDialog({ open, setOpen, workflowName }: Props) {
  const [confirmText, setConfirmText] = useState("");
  return (
      <AlertDialog open={open} onOpenChange={setOpen} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
            <AlertDescription>
              If you delete this workflow, you&apos;ll not be able to recover it.
              <div className="flex flex-col py-4 gap-2"> 
                <p>If you&apos;re sure, enter <b>{workflowName}.</b></p>
                <Input 
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                />
              </div>
            </AlertDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Delete</AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
}

export default DeleteWorkflowDialog;