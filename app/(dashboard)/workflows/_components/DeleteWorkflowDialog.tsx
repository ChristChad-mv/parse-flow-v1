"use client";


import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';
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
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}

function DeleteWorkflowDialog({ open, setOpen, workflowName, workflowId }: Props) {
  const [confirmText, setConfirmText] = useState("");

  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow, 
    onSuccess: () => {
      toast.success("Worflow deleted successfully", { id: workflowId })
    },
    onError: () => {
      toast.error("Something went wrong", {id: workflowId})
    },
  });

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
            <AlertDialogAction 
              disabled={confirmText !== workflowName || deleteMutation.isPending} 
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
              onClick={() => {
                toast.loading("Deleting workflow...", { id: workflowId });
                deleteMutation.mutate(workflowId);
              }}
              >
                Delete
              </AlertDialogAction>
            <AlertDialogCancel onClick={() => setConfirmText("")} >Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
}

export default DeleteWorkflowDialog;