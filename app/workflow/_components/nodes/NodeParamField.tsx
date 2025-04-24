"use client";

import { TaskParam, TaskParamType } from '@/types/task';
import React, { useCallback } from 'react'
import StringParam from './param/StringParam';
import { Connection, useReactFlow } from '@xyflow/react';
import { AppNode } from '@/types/appNode';
import BrowserInstanceParam from './BrowserInstanceParam';

function NodeParamField({ param, nodeId }: { param: TaskParam, nodeId: string  }) {
  const { updateNodeData, getNode, getEdges } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  // Check if there's an incoming connection to this param
  const hasIncomingConnection = getEdges().some(
    edge => edge.target === nodeId && edge.targetHandle === param.name
  );

  const updateNodeParamValue = useCallback((newValue: string) => {
    updateNodeData(nodeId, {
      inputs: {
        ...node?.data.inputs, 
        [param.name]: newValue,
      },
    })
  }, [nodeId, updateNodeData, param, node?.data.inputs]);

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam 
          param={param} 
          value={value} 
          updateNodeParamValue={updateNodeParamValue}
          disabled={hasIncomingConnection}
        />
      )
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam 
          param={param}
        />
      )
    default:
      return (
        <div className="w-full">
          <p className='text-xs text-muted-foreground'>Not implemented</p>
        </div>
      )
  }
}

export default NodeParamField