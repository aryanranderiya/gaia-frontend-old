import { apiauth } from "@/apiaxios";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoomSlider } from "@/components/zoom-slider";
import { Handle, NodeProps, Position, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface GoalData {
  id: string;
  created_at: Date;
  title: string;
  progress: number;
  roadmap: {
    nodes?: Array<{
      id: string;
      position: { x: number; y: number };
      data: { label: string };
    }>;
    edges?: Array<{
      id: string;
      source: string;
      target: string;
    }>;
  };
}

const CustomNode = ({ data }: NodeProps) => {
  return (
    <>
      {/* Left Handle */}
      <Handle
        type="target"
        position={Position.Top}
        // style={{ background: "#555" }}
      />

      {/* Node Content */}
      <div className="bg-foreground-50 outline outline-2 outline-foreground-400 p-4 rounded-sm shadow-lg text-white">
        <div className="text-lg">{data.label}</div>
        {data.description && <p className="text-sm mt-2">{data.description}</p>}

        {/* {data?.details?.map((detail))} */}
      </div>

      {/* Right Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        // style={{ background: "#555" }}
      />
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
        <div className="flex flex-wrap gap-4 justify-center items-center pb-8 h-[95vh] w-screen text-background relative flex-row">
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
                nodes={goalData?.roadmap?.nodes?.map((node, index) => ({
                  ...node,
                  position: {
                    x: node.position.x + index * 50,
                    y: node.position.y + index * 50,
                  },
                  type: "customNode",
                }))}
                edges={goalData?.roadmap?.edges}
                nodesConnectable={false}
                elementsSelectable={false}
                nodesDraggable={false}
                fitView
                colorMode="dark"
                proOptions={{ hideAttribution: true }}
                nodeTypes={nodeTypes}
                style={{
                  background: "transparent",
                }}
              >
                {/* <MiniMap /> */}
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
