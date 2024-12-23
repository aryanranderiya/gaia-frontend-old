import { apiauth } from "@/apiaxios";
import { BookIcon1 } from "@/components/icons";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoomSlider } from "@/components/zoom-slider";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Checkbox } from "@nextui-org/checkbox";
import { Chip } from "@nextui-org/chip";
import {
  ConnectionLineType,
  Handle,
  Position,
  ReactFlow,
  ReactFlowInstance,
  useReactFlow,
  useViewport,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre"; // Import dagre for layout
import { ChevronDown, Info, Plus } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  id: string;
  goalId?: string;
  label: string;
  details: string[];
  estimatedTime: string[];
  resources: string[];
  isComplete: boolean;
}

export default function GoalPage() {
  const CustomNode = React.memo(({ data }: { data: NodeData }) => {
    const [isComplete, setIsComplete] = useState(data.isComplete);

    // Memoizing the handleCheckboxClick function using useCallback
    const handleCheckboxClick = useCallback(async () => {
      const newIsComplete = !isComplete;
      setIsComplete(newIsComplete);

      try {
        const response = await apiauth.patch(
          `/goals/${data.goalId}/roadmap/nodes/${data.id}`,
          { is_complete: newIsComplete }
        );

        console.log(response);

        // if (response.status !== 200)
        //   throw new Error("Failed to update the node status");
      } catch (error) {
        console.error("Error while updating the node status:", error);
        setIsComplete(!newIsComplete);
      }
    }, [data.goalId, data.id, isComplete]); // Add dependencies

    return (
      <>
        <Handle type="target" position={Position.Top} />

        <div
          className={`${
            isComplete
              ? "bg-[#092d3b] outline-primary-500"
              : "bg-foreground-50 outline-foreground-100"
          }  transition-colors outline outline-2  p-4 rounded-sm shadow-md text-white  flex flex-col gap-1 max-w-[350px] min-w-[350px]`}
          onClick={() => {
            setOpenSidebar(true);
            setCurrentlySelectedNode(data);
          }}
        >
          {/* <div className="text-lg leading-5 font-bold">
            <Checkbox
              color="primary"
              radius="full"
              isSelected={isComplete}
              onValueChange={handleCheckboxClick}
            >
            </Checkbox>
            </div> */}
          {data.label}

          {data.estimatedTime && (
            <Chip size="sm" color="primary" variant="flat">
              {data?.estimatedTime}
            </Chip>
          )}

          {/* <Accordion className="px-0">
            <AccordionItem
              key="1"
              aria-label="details"
              isCompact
              title={
                <div className="flex items-center gap-1 font-medium">
                  <Info width={15} />
                  <span>Details</span>
                </div>
              }
            >
              <div>
                {data?.details?.map((detail: string) => (
                  <li className="text-xs relative" key={detail}>
                    <span className="relative -left-2">{detail}</span>
                  </li>
                ))}
              </div>
            </AccordionItem>

            <AccordionItem
              key="2"
              aria-label="resources"
              isCompact
              className="py-0"
              title={
                <div className="flex items-center gap-1 font-medium">
                  <BookIcon1 width={15} />
                  <span>Resources</span>
                </div>
              }
            >
              <div>
                {data?.resources?.map((resource: string) => (
                  <li className="text-xs relative" key={resource}>
                    <span className="relative -left-2">{resource}</span>
                  </li>
                ))}
              </div>
            </AccordionItem>
          </Accordion> */}
        </div>

        <Handle type="source" position={Position.Bottom} />
      </>
    );
  });

  const nodeTypes = useMemo(
    () => ({
      customNode: CustomNode,
    }),
    []
  );
  const [goalData, setGoalData] = useState<GoalData | null>(null);
  const [loading, setLoading] = useState(true);
  const { goalId } = useParams();
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentlySelectedNode, setCurrentlySelectedNode] =
    useState<NodeData>();
  const { setViewport } = useReactFlow();
  const { x, y, zoom } = useViewport();

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
          return {
            ...node,
            position: { x, y },
            type: "customNode",
            data: { ...node.data, id: node.id, goalId: goal.id },
          };
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

  useEffect(() => {
    if (goalId) fetchGoalData();
  }, [goalId]);

  // useEffect(() => {
  //   setViewport({ x: 300, y: 200, zoom: 3 });
  // }, [setViewport]);

  // useEffect(() => {
  //   console.log("test2", x, y, zoom);
  // }, [x, y, zoom]);

  const initiateWebSocket = (goalId: string, goalTitle: string) => {
    const ws = new WebSocket(`${import.meta.env.VITE_BACKEND_URL}ws/roadmap`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ goal_id: goalId, goal_title: goalTitle }));
      console.log("WebSocket: Generating roadmap...");
    };

    ws.onmessage = (event) => {
      const jsonData = event.data.replace(/^data: /, "");
      const parsedData = JSON.parse(jsonData) || jsonData;
      // console.log("Parsed WebSocket response:", parsedData);
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => {
      console.log("WebSocket closed.");
      fetchGoalData();
      setLoading(false);
    };
  };

  const handleInit = (reactFlowInstance: ReactFlowInstance) => {
    const currentViewport = reactFlowInstance.getViewport();
    const currentX = currentViewport.x || 0;
    const newX = currentX + 75;
    reactFlowInstance.setViewport({
      x: newX,
      y: -50,
      zoom: 1,
    });
  };

  if (goalData === null && !loading) return <div>Page Not Found</div>;

  return (
    <div className="flex flex-row justify-between h-full relative">
      {/* <SidebarProvider open={openSidebar} onOpenChange={setOpenSidebar}> */}
      <div
        className={`${
          openSidebar ? "visible" : "hidden"
        } fixed right-2 top-2 bg-zinc-900 max-w-[350px] p-5 rounded-xl flex flex-col gap-3 z-10 shadow-lg`}
      >
        <div className="text-xl font-medium">
          {currentlySelectedNode?.label}
        </div>

        <div className="text-sm -mt-2 text-foreground-500">
          {currentlySelectedNode?.details}
        </div>

        <div className="text-sm">
          <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
        </div>
      </div>

      {!!goalData?.progress && (
        <div className="w-full flex justify-center  absolute bottom-[20px] z-30 pointer-events-none">
          <div className="flex items-center text-white text-sm my-2 gap-3 bg-black bg-opacity-30 backdrop-blur-md outline-[3px] outline outline-[#002d3d] shadow-lg  rounded-full py-3 px-5">
            Progress
            <div className="w-[300px] h-[15px] bg-white bg-opacity-20 rounded-full">
              <div
                style={{ width: `${goalData?.progress}%` }}
                className="bg-[#00bbff] h-[15px] rounded-full"
              />
            </div>
            {goalData?.progress}%
          </div>
        </div>
      )}

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
            <div className="w-full h-full relative">
              <ReactFlow
                className="relative"
                nodes={nodes}
                edges={edges}
                onInit={handleInit}
                nodesConnectable={false}
                // elementsSelectable={false}
                // onNodeClick={() => console.log("asdas")}
                nodesDraggable={false}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                elementsSelectable={true}
                fitViewOptions={{ minZoom: 1.2 }}
                minZoom={0.2}
                // maxZoom={2.0}
                // onNodeClick={(e) => console.log("Test", e)}
                colorMode="dark"
                proOptions={{ hideAttribution: true }}
                nodeTypes={nodeTypes}
                // onSelect={() => console.log("hi")}

                style={{
                  background: "transparent",
                }}
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
