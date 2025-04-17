"use client"

import React, { useCallback, useEffect } from 'react'
import { Workflow } from '@prisma/client';
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react';
import "@xyflow/react/dist/style.css";
import NodeComponent from './nodes/NodeComponent';
import { CreateFlowNode } from '@/lib/workflow/createFlowNode';
import { TaskType } from '@/types/task';
import { AppNode } from '@/types/appNode';
import { UpdateWorkflow } from '@/actions/workflows/updateWorkflow';

const nodeTypes = {
  FlowScrapeNode: NodeComponent, 
}

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };

function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, getViewport } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if(!flow) return;

      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if(!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({x, y, zoom});

    } catch (error) {
      throw new Error("Error message : " + (error || "Something went wrong"));
    }
  
  }, [workflow.definition, setEdges, setNodes, setViewport]);
  
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []) 

  const onDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    if(!taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    })
    
    const newNode = CreateFlowNode(taskType as TaskType, position);
    const newNodes = nodes.concat(newNode);
    setNodes(newNodes);
    
    const currentViewport = getViewport();
    const definition = JSON.stringify({
      nodes: newNodes,
      edges,
      viewport: currentViewport
    });
    
    try {
      await UpdateWorkflow({ id: workflow.id, definition });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du workflow", error);
    }
    
  }, [nodes, edges, screenToFlowPosition, getViewport, setNodes, workflow.id]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true}, eds))
  }, [setEdges])
  
  return (
    <div className='h-full w-full'>
      <ReactFlow 
        nodes={nodes} 
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        snapToGrid
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        fitView
      >
        <Controls position='top-left' fitViewOptions={fitViewOptions}/>
        <Background variant={BackgroundVariant.Dots} gap={12} />
      </ReactFlow>
    </div>
  )
}

export default FlowEditor;