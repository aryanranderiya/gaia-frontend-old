// GoalPage.tsx
import CustomNode from "@/components/Goals/CustomNode";
import GoalGraph from "@/components/Goals/GoalGraph";
import GoalHeader from "@/components/Goals/GoalHeader";
import GoalSidebar from "@/components/Goals/GoalSidebar";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { EdgeType, GoalData, NodeData, NodeType } from "@/types/goalTypes";
import { apiauth } from "@/utils/apiaxios";
import {
  Edge,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
} from "@xyflow/react";
import dagre from "dagre";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";


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
    if (!goalId) return;
    try {
      setLoading(true);
      const response = await apiauth.get(`/goals/${goalId}`);
      const goal = response.data;
      if (goal?.roadmap) {
        setGoalData(goal);
        // Build graph layout with dagre
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
        if (updatedNodes && updatedNodes.length > 0) {
          setCurrentlySelectedNodeId(updatedNodes[0].id);
          setOpenSidebar(true);
        }
        setEdges(goal.roadmap.edges || []);
        setLoading(false);
      } else {
        // Fallback to WebSocket initialization if no roadmap exists
        initiateWebSocket(goalId, goal.title);
      }
    } catch (error) {
      console.error("Goal fetch error:", error);
      setGoalData(null);
      setLoading(false);
    }
  };

  const initiateWebSocket = (goalId: string, goalTitle: string) => {
    const ws = new WebSocket(`${import.meta.env.VITE_BACKEND_URL}ws/roadmap`);
    ws.onopen = () => {
      ws.send(JSON.stringify({ goal_id: goalId, goal_title: goalTitle }));
      console.log("WebSocket: Generating roadmap...");
    };
    ws.onmessage = (event) => {
      const jsonData = event.data.replace(/^data: /, "");
      const parsedData = JSON.parse(jsonData) || jsonData;
      console.log("Parsed WebSocket response:", parsedData);
    };
    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => {
      console.log("WebSocket closed.");
      fetchGoalData();
      setLoading(false);
    };
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
      y: 0,
      zoom: 1,
    });
  };

  const handleCheckboxClick = async () => {
    if (!currentlySelectedNodeId) return;
    const selectedNode = nodes.find(
      (node) => node.id === currentlySelectedNodeId
    );
    if (!selectedNode) return;
    const updatedIsComplete = !selectedNode.data.isComplete;

    // Optimistically update node state
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === currentlySelectedNodeId
          ? { ...node, data: { ...node.data, isComplete: updatedIsComplete } }
          : node
      )
    );

    // Update the server state
    try {
      await apiauth.patch(
        `/goals/${selectedNode.data.goalId}/roadmap/nodes/${selectedNode.id}`,
        { is_complete: updatedIsComplete }
      );
      toast.success(
        updatedIsComplete ? "Marked as completed!" : "Marked as not completed!"
      );
    } catch (error) {
      console.error("Error updating node status:", error);
      toast.error("Could not mark as complete");
      // Revert the change if update fails
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === currentlySelectedNodeId
            ? {
                ...node,
                data: { ...node.data, isComplete: !updatedIsComplete },
              }
            : node
        )
      );
    }
  };

  return (
    <ReactFlowProvider>
      <div className="flex flex-row justify-between h-full relative w-full">
        {openSidebar && (
          <GoalSidebar
            nodes={nodes}
            currentlySelectedNodeId={currentlySelectedNodeId}
            handleCheckboxClick={handleCheckboxClick}
          />
        )}
        <div
          className={`flex flex-wrap gap-4 justify-center items-center pb-8 h-screen text-background relative flex-row w-full min-w-full ${
            !loading ? "h-fit" : "h-screen"
          }`}
        >
          {loading ? (
            <div className="bg-black w-fit pt-9 pb-0 relative h-fit flex items-center justify-center rounded-xl bg-opacity-50 flex-col gap-10 overflow-hidden ">
              <div className="text-center space-y-2">
                <div className="font-medium text-xl text-foreground">
                  Creating your detailed Roadmap.
                </div>
                {goalData?.title}
                <div className="text-foreground-500 text-medium">
                  Please Wait. This may take a while.
                </div>
                <div className="text-red-500 flex items-center gap-2">
                  {/* TriangleAlert can be imported and used here */}
                  <span className="inline-block w-4 h-4 bg-red-500" />
                  Do not leave this page while the roadmap is being generated.
                </div>
              </div>
              <div className="px-32">
                <MultiStepLoader
                  duration={4500}
                  loading={true}
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
                  loop={false}
                />
              </div>
            </div>
          ) : (
            <>
              <GoalHeader goalData={goalData} />
              <div className="w-full h-full relative">
                <GoalGraph
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={nodeTypes}
                  handleInit={handleInit}
                />
              </div>
            </>
          )}
        </div>
        <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1] pointer-events-none" />
      </div>
    </ReactFlowProvider>
  );
}
