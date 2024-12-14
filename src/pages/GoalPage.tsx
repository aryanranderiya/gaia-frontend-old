import { apiauth } from "@/apiaxios";
import { BookIcon1 } from "@/components/icons";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoomSlider } from "@/components/zoom-slider";
import { Chip } from "@nextui-org/chip";
import { ConnectionLineType, Handle, Position, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre"; // Import dagre for layout
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface GoalData {
  id: string;
  created_at: Date;
  title: string;
  progress: number;
  roadmap: {
    nodes?: Array<NodeType>;
    edges?: Array<EdgeType>;
  };
}

export interface EdgeType {
  id: string;
  source: string;
  target: string;
}

export interface NodeType {
  id: string;
  position: { x: number; y: number };
  data: NodeData;
}

export interface NodeData {
  label: string;
  details: string[];
  estimatedTime: string[];
  resources: string[];
}

const CustomNode = ({ data }: { data: NodeData }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />

      <div className="bg-foreground-50 outline outline-2 outline-foreground-100 p-4 rounded-sm shadow-md text-white  flex flex-col gap-1">
        <div className="text-lg leading-5 font-bold">{data.label}</div>
        <div>
          {data?.details?.map((detail: string) => (
            <li className="text-xs relative">
              <span className="relative -left-2">{detail}</span>
            </li>
          ))}
        </div>

        <Chip size="sm" color="primary" variant="flat">
          {data.estimatedTime}
        </Chip>

        <hr className="border-foreground-100 my-1" />

        <div className="flex items-center gap-1 font-medium">
          <BookIcon1 width={15} />
          <span>Resources</span>
        </div>
        <div className="mt-2 relative -top-2">
          {data?.resources?.map((resource: string) => (
            <li className="text-xs relative">
              <span className="relative -left-2">{resource}</span>
            </li>
          ))}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

const nodeTypes = {
  customNode: CustomNode,
};

export default function GoalPage() {
  const [goalData, setGoalData] = useState<GoalData | null>(null);
  const [loading, setLoading] = useState(true);
  const { goalId } = useParams();
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        if (!goalId) return;

        setLoading(true);
        const response = await apiauth.get(`/goals/${goalId}`);
        const goal = response.data;
        console.log("data", goal.roadmap);

        // if (goal.roadmap?.nodes?.length === 0) {
        if (!goal?.roadmap) {
          console.log("initialising roadmap web socket");

          initiateWebSocket(goalId, goal.title);
        } else {
          setGoalData(goal);
          setLoading(false);

          const graph = new dagre.graphlib.Graph();
          graph.setGraph({ rankdir: "TD" }); // Optional settings for the graph (e.g., margins)
          graph.setDefaultEdgeLabel(() => ({}));

          // Add nodes and edges to the graph
          goal.roadmap.nodes?.forEach((node: NodeType) => {
            graph.setNode(node.id, { width: 300, height: 220 });
          });

          goal.roadmap.edges?.forEach((edge: EdgeType) => {
            graph.setEdge(edge.source, edge.target);
          });

          // Run the Dagre layout algorithm
          dagre.layout(graph);

          // Apply the new node positions based on the layout
          const updatedNodes = goal.roadmap.nodes?.map((node: NodeType) => {
            const { x, y } = graph.node(node.id);
            return { ...node, position: { x, y }, type: "customNode" };
          });

          setNodes(updatedNodes || []);
          setEdges(goal.roadmap.edges || []);
        }
      } catch (error) {
        console.error("Goal fetch error:", error);
        setGoalData(null);
      }
    };

    if (goalId) fetchGoalData();
  }, [goalId]);

  const initiateWebSocket = (goalId: string, goalTitle: string) => {
    const ws = new WebSocket(`${import.meta.env.VITE_BACKEND_URL}ws/roadmap`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ goal_id: goalId, goal_title: goalTitle }));
      console.log("WebSocket: Generating roadmap...");
    };

    ws.onmessage = (event) => {
      // const data = JSON.parse(event.data);
      // Assuming event.data is like: "data: {\"response\":\"Time\", \"p\":\"abcdefghijklmnopqrstuvwxy\"}"
      const jsonData = event.data.replace(/^data: /, "");
      const parsedData = JSON.parse(jsonData);
      console.log("Parsed WebSocket response:", parsedData.response);
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => {
      console.log("WebSocket closed.");
      setLoading(false);
    };
  };

  if (goalData === null && !loading) return <div>Page Not Found</div>;

  return (
    <div className="flex flex-row justify-between h-full">
      <ScrollArea>
        <div className="flex flex-wrap gap-4 justify-center items-center pb-8 h-[90vh] w-screen text-background relative flex-row">
          <h1 className="font-bold text-white text-2xl mt-1">
            {goalData?.title}
          </h1>

          {loading ? (
            <div className="bg-black w-fit pt-9 pb-0 px-32 relative h-fit flex items-center justify-center rounded-xl bg-opacity-50 flex-col gap-10 overflow-hidden">
              <div className="text-center space-y-2">
                <div className="font-medium text-xl text-foreground">
                  Creating your detailed Roadmap.
                </div>
                {goalData?.title}

                <div className=" text-foreground-500 text-medium">
                  Please Wait. This may take a while.
                </div>
              </div>
              <MultiStepLoader
                duration={3500}
                loadingStates={[
                  { text: "Defining the Goal" },
                  { text: "Analyzing Objectives" },
                  { text: "Adding Description" },
                  { text: "Generating Milestones" },
                  { text: "Creating Detailed Roadmap" },
                  { text: "Adding Nodes" },
                  { text: "Creating Connecting Edges" },
                  { text: "Fetching Resources" },
                  { text: "Estimating Time" },
                  { text: "Adding finishing touches.." },
                ]}
                loading={true}
                loop={false}
              />
            </div>
          ) : (
            <div className="w-full h-full">
              <ReactFlow
                className="relative"
                nodes={nodes}
                edges={edges}
                nodesConnectable={false}
                elementsSelectable={false}
                nodesDraggable={false}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                // minZoom={1.2}
                // fitViewOptions={{ minZoom: 1.2 }}
                // maxZoom={2.0}
                colorMode="dark"
                proOptions={{ hideAttribution: true }}
                nodeTypes={nodeTypes}
                style={{
                  background: "transparent",
                }}
              >
                <ZoomSlider className="fixed bottom-[10px] !right-0 !left-auto h-fit !top-auto z-30 " />
              </ReactFlow>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1] pointer-events-none" />
    </div>
  );
}
