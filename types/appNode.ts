import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./task";

export interface AppNodeData {
  // In that respect.. we can have anything we want
  type: TaskType;
  inputs: Record<string, string>;
  [key: string ]: any;
}
export interface AppNode extends Node {
  data: AppNodeData;
  
}

export interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
}