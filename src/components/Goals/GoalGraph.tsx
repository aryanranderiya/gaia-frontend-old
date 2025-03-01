// GoalGraph.tsx
import React from "react";
import {
  ReactFlow,
  ConnectionLineType,
  ReactFlowInstance,
} from "@xyflow/react";
import { Node, Edge } from "@xyflow/react";
import { NodeData, EdgeType } from "@/pages/Goal";

interface GoalGraphProps {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeType>[];
  nodeTypes: any;
  handleInit: (
    reactFlowInstance: ReactFlowInstance<Node<NodeData>, Edge<EdgeType>>
  ) => void;
}

const GoalGraph: React.FC<GoalGraphProps> = ({
  nodes,
  edges,
  nodeTypes,
  handleInit,
}) => {
  return (
    <ReactFlow
      fitView
      className="relative"
      connectionLineType={ConnectionLineType.SmoothStep}
      edges={edges}
      elementsSelectable={true}
      fitViewOptions={{ minZoom: 1.2 }}
      minZoom={0.2}
      nodeTypes={nodeTypes}
      nodes={nodes}
      nodesConnectable={false}
      nodesDraggable={false}
      style={{ background: "transparent" }}
      onInit={handleInit}
    />
  );
};

export default GoalGraph;
