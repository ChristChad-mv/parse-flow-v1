import { Workflow } from '@prisma/client'
import React from 'react';
import { ReactFlowProvider } from "@xyflow/react"
import FlowEditor from './FlowEditor';
import TopBar from './topbar/TopBar';
import TaskMenu from './TaskMenu';
import { FlowValidationContextProvider } from '@/components/context/FlowValidationContext';

function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex flex-col h-full w-full">
          <TopBar 
            title="Workflow editor" 
            subtitle={workflow.name} 
            workflowId={workflow.id}
          />
          <section className='flex flex-1 h-full overflow-hidden'>
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  )
}

export default Editor;