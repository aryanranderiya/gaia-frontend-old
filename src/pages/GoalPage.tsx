import { apiauth } from "@/apiaxios";
import { BookIcon1 } from "@/components/icons";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoomSlider } from "@/components/zoom-slider";
import { Chip } from "@nextui-org/chip";
import {
  ConnectionLineType,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre"; // Import dagre for layout
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Checkbox } from "@nextui-org/checkbox";

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
  const [isComplete, setIsComplete] = useState(false);

  return (
    <>
      <Handle type="target" position={Position.Top} />

      <div
        className={`${
          isComplete
            ? "bg-[#092d3b] outline-primary-500"
            : "bg-foreground-50 outline-foreground-100"
        }  transition-colors outline outline-2  p-4 rounded-sm shadow-md text-white  flex flex-col gap-1`}
      >
        <div className="text-lg leading-5 font-bold">
          <Checkbox
            color="primary"
            radius="full"
            isSelected={isComplete}
            onValueChange={setIsComplete}
          >
            {data.label}
          </Checkbox>
        </div>
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

        <Accordion className="px-0">
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            isCompact
            title={
              <div className="flex items-center gap-1 font-medium">
                <BookIcon1 width={15} />
                <span>Resources</span>
              </div>
            }
          >
            <div className="mt-2 relative -top-2">
              {data?.resources?.map((resource: string) => (
                <li className="text-xs relative">
                  <span className="relative -left-2">{resource}</span>
                </li>
              ))}
            </div>
          </AccordionItem>
        </Accordion>
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

        if (goal?.roadmap) {
          setGoalData(goal);
          setLoading(false);

          const graph = new dagre.graphlib.Graph();
          graph.setGraph({ rankdir: "TD" });
          graph.setDefaultEdgeLabel(() => ({}));

          goal.roadmap.nodes?.forEach((node: NodeType) => {
            graph.setNode(node.id, { width: 350, height: 220 });
          });

          goal.roadmap.edges?.forEach((edge: EdgeType) => {
            graph.setEdge(edge.source, edge.target);
          });

          dagre.layout(graph);

          const updatedNodes = goal.roadmap.nodes?.map((node: NodeType) => {
            const { x, y } = graph.node(node.id);
            return { ...node, position: { x, y }, type: "customNode" };
          });

          setNodes(updatedNodes || []);
          setEdges(goal.roadmap.edges || []);
        } else {
          console.log("initialising roadmap web socket");
          initiateWebSocket(goalId, goal.title);
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
      const jsonData = event.data.replace(/^data: /, "");
      const parsedData = JSON.parse(jsonData);
      setLoadingPieces((old) => old + parsedData.response);
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
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-white text-2xl mt-1">
              {goalData?.roadmap?.title || goalData?.title}
            </h1>
            <h2 className="text-foreground-500 text-md mt-1 ">
              {goalData?.roadmap?.description || goalData?.description}
            </h2>
          </div>
          {loading ? (
            <div className="bg-black w-fit pt-9 pb-0  relative h-fit flex items-center justify-center rounded-xl bg-opacity-50 flex-col gap-10 overflow-hidden">
              <div className="text-center space-y-2">
                <div className="font-medium text-xl text-foreground">
                  Creating your detailed Roadmap.
                </div>
                {goalData?.title}

                <div className=" text-foreground-500 text-medium">
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
            <div className="w-full h-full">
              <ReactFlow
                className="relative"
                nodes={nodes}
                edges={edges}
                nodesConnectable={false}
                // elementsSelectable={false}
                // onNodeClick={() => console.log("asdas")}
                nodesDraggable={false}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                minZoom={0.2}
                fitViewOptions={{ minZoom: 1.2 }}
                // maxZoom={2.0}
                colorMode="dark"
                proOptions={{ hideAttribution: true }}
                nodeTypes={nodeTypes}
                style={{
                  background: "transparent",
                }}
              >
                <MiniMap className="fixed !bottom-[100px]" />
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
