// CustomNode.tsx
import React from "react";
import { Handle, Position } from "@xyflow/react";
import { NodeData } from "@/pages/Goal";

interface CustomNodeProps {
  data: NodeData;
  currentlySelectedNodeId: string | null;
  setCurrentlySelectedNodeId: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomNode: React.FC<CustomNodeProps> = React.memo(
  ({
    data,
    currentlySelectedNodeId,
    setCurrentlySelectedNodeId,
    setOpenSidebar,
  }) => {
    return (
      <>
        <Handle position={Position.Top} type="target" />
        <div
          className={`${
            currentlySelectedNodeId === data.id
              ? "!outline-[#00bbff] shadow-lg"
              : "outline-zinc-700"
          } ${
            data.isComplete
              ? "bg-[#00bbff73] outline-[#00bbff30] line-through"
              : "bg-zinc-800"
          } transition-all outline outline-[3px] p-4 rounded-lg text-white flex flex-row gap-1 max-w-[250px] min-w-[250px] text-center items-center justify-center`}
          onClick={() => {
            setCurrentlySelectedNodeId(data.id);
            setOpenSidebar(true);
          }}
        >
          {data.label}
        </div>
        <Handle position={Position.Bottom} type="source" />
      </>
    );
  }
);

export default CustomNode;
