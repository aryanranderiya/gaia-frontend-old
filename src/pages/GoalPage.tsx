import { apiauth } from "@/apiaxios";
import { BookIcon1 } from "@/components/icons";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoomSlider } from "@/components/zoom-slider";
import { Chip } from "@nextui-org/chip";
import {
  ConnectionLineType,
  Handle,
  Position,
  ReactFlow,
  ReactFlowInstance,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre"; // Import dagre for layout
import { Book } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export interface GoalData {
  id: string;
  created_at: Date;
  title: string;
  description: string;
  progress: number;
  roadmap: {
    title?: string;
    description?: string;
    nodes?: Array<NodeType>;
    edges?: Array<EdgeType>;
  };
}

export interface EdgeType extends Record<string, unknown> {
  id: string;
  source: string;
  target: string;
}

export interface NodeType {
  id: string;
  position: { x: number; y: number };
  data: NodeData;
}

export interface NodeData extends Record<string, unknown> {
  id: string;
  goalId?: string;
  label: string;
  details: string[];
  estimatedTime: string[];
  resources: string[];
  isComplete: boolean;
}

const CustomNode = React.memo(
  ({
    data,
    currentlySelectedNodeId,
    setCurrentlySelectedNodeId,
    setOpenSidebar,
  }: {
    data: NodeData;
    currentlySelectedNodeId: string | null;
    setCurrentlySelectedNodeId: React.Dispatch<
      React.SetStateAction<string | null>
    >;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    console.log(data);

    return (
      <>
        <Handle type="target" position={Position.Top} />

        <div
          className={`${
            currentlySelectedNodeId === data.id
              ? "outline-[#00bbff] shadow-lg"
              : "outline-zinc-700"
          } ${
            data.isComplete ? "bg-[#092d3b]" : "bg-foreground-900"
          } transition-colors outline outline-2 p-4 rounded-sm text-white flex flex-col gap-1 max-w-[250px] min-w-[250px] text-center`}
          onClick={() => {
            setCurrentlySelectedNodeId(data.id);
            setOpenSidebar(true);
          }}
        >
          {data.label}
        </div>

        <Handle type="source" position={Position.Bottom} />
      </>
    );
  }
);
export default function GoalPage() {
  const [goalData, setGoalData] = useState<GoalData | null>(null);
  const [loading, setLoading] = useState(true);
  const { goalId } = useParams();
  const [nodes, setNodes] = useState<Node<NodeData>[]>([]);
  const [edges, setEdges] = useState<Edge<EdgeType>[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentlySelectedNodeId, setCurrentlySelectedNodeId] = useState<
    string | null
  >(null);

  const nodeTypes = useMemo(
    () => ({
      customNode: (props: any) => (
        <CustomNode
          {...props}
          currentlySelectedNodeId={currentlySelectedNodeId}
          setCurrentlySelectedNodeId={setCurrentlySelectedNodeId}
          setOpenSidebar={setOpenSidebar}
        />
      ),
    }),
    [currentlySelectedNodeId]
  );

  const fetchGoalData = async () => {
    try {
      if (!goalId) return;

      setLoading(true);
      const response = await apiauth.get(`/goals/${goalId}`);
      const goal = response.data;

      if (goal?.roadmap) {
        setGoalData(goal);
        setLoading(false);

        const graph = new dagre.graphlib.Graph();
        graph.setGraph({ rankdir: "TD" });
        graph.setDefaultEdgeLabel(() => ({}));

        goal.roadmap.nodes?.forEach((node: NodeType) => {
          graph.setNode(node.id, { width: 350, height: 100 });
        });

        goal.roadmap.edges?.forEach((edge: EdgeType) => {
          graph.setEdge(edge.source, edge.target);
        });

        dagre.layout(graph);

        const updatedNodes = goal.roadmap.nodes?.map((node: NodeType) => {
          const { x, y } = graph.node(node.id);
          return {
            id: node.id,
            position: { x, y },
            type: "customNode",
            data: { ...node.data, id: node.id, goalId: goal.id },
          };
        });

        setNodes(updatedNodes || []);
        setEdges(goal.roadmap.edges || []);
      }
    } catch (error) {
      console.error("Goal fetch error:", error);
      setGoalData(null);
    }
  };

  useEffect(() => {
    if (goalId) fetchGoalData();
  }, [goalId]);

  const handleInit = (
    reactFlowInstance: ReactFlowInstance<Node<NodeData>, Edge<EdgeType>>
  ) => {
    const viewport = reactFlowInstance.getViewport();
    reactFlowInstance.setViewport({
      ...viewport,
      x: viewport.x + 75,
      y: -50,
      zoom: 1,
    });
  };

  if (goalData === null && !loading) return <div>Page Not Found</div>;

  return (
    <div className="flex flex-row justify-between h-full relative">
      <div
        className={`${
          openSidebar ? "visible" : "hidden"
        } fixed right-2 top-2 bg-zinc-900 max-w-[350px] p-2 rounded-xl flex flex-col gap-3 z-10 shadow-lg`}
      >
        <div className="p-4 space-y-2">
          <div className="text-xl font-medium ">
            {currentlySelectedNodeId &&
              nodes.find((node) => node.id === currentlySelectedNodeId)?.data
                .label}
          </div>

          <div className="text-sm -mt-2 text-foreground-500">
            {currentlySelectedNodeId &&
              nodes
                .find((node) => node.id === currentlySelectedNodeId)
                ?.data?.details?.join(", ")}
          </div>
          {currentlySelectedNodeId &&
            (() => {
              const selectedNode = nodes.find(
                (node) => node.id === currentlySelectedNodeId
              );
              const estimatedTime = selectedNode?.data?.estimatedTime;

              return estimatedTime ? (
                <Chip size="sm" color="primary" variant="flat">
                  {estimatedTime}
                </Chip>
              ) : null;
            })()}
        </div>

        <div className=" bg-black bg-opacity-35 p-5 rounded-lg">
          <div className="flex text-md font-medium gap-2 items-center pb-2">
            <BookIcon1 width={18} />
            Resources
          </div>
          <div className="text-sm">
            {currentlySelectedNodeId &&
              nodes
                .find((node) => node.id === currentlySelectedNodeId)
                ?.data?.resources?.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
          </div>
        </div>
      </div>

      <ScrollArea>
        <div className="flex flex-wrap gap-4 justify-center items-center pb-8 h-[90vh] w-screen text-background relative flex-row">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-white text-2xl mt-1">
              {goalData?.roadmap?.title || goalData?.title}
            </h1>
            <h2 className="text-foreground-500 text-md mt-1 ">
              {goalData?.roadmap?.description || goalData?.description}
            </h2>
          </div>
          {loading ? (
            <div className="bg-black w-fit pt-9 pb-0 relative h-fit flex items-center justify-center rounded-xl bg-opacity-50 flex-col gap-10 overflow-hidden">
              <div className="text-center space-y-2">
                <div className="font-medium text-xl text-foreground">
                  Creating your detailed Roadmap.
                </div>
                {goalData?.title}
                <div className="text-foreground-500 text-medium">
                  Please Wait. This may take a while.
                </div>
              </div>
              <div className="px-32">
                <MultiStepLoader
                  duration={4500}
                  loadingStates={[
                    { text: "Setting your goal... Let's get started!" },
                    { text: "Exploring your objectives... Almost there!" },
                    { text: "Adding some details to your vision..." },
                    { text: "Creating milestones to guide you..." },
                    { text: "Building your personalized roadmap..." },
                    { text: "Placing the first pieces of the puzzle..." },
                    {
                      text: "Connecting the dots... Things are coming together!",
                    },
                    { text: "Gathering the resources you’ll need..." },
                    { text: "Estimating time... Getting a clearer picture!" },
                    { text: "Putting the final touches on your plan..." },
                  ]}
                  loading={true}
                  loop={false}
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <ReactFlow
                className="relative"
                nodes={nodes}
                edges={edges}
                onInit={handleInit}
                nodesConnectable={false}
                nodesDraggable={false}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                elementsSelectable={true}
                fitViewOptions={{ minZoom: 1.2 }}
                minZoom={0.2}
                nodeTypes={nodeTypes}
                style={{ background: "transparent" }}
              >
                <ZoomSlider className="fixed bottom-[25px] !right-0 !left-auto h-fit !top-auto z-30 dark" />
              </ReactFlow>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1] pointer-events-none" />
    </div>
  );
}
