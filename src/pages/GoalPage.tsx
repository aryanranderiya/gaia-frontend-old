import { apiauth } from "@/apiaxios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoomSlider } from "@/components/zoom-slider";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface GoalData {
  goalId: string;
  title: string;
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
}

export default function GoalPage() {
  const [goalData, setGoalData] = useState<GoalData | null>(null);
  const [loading, setLoading] = useState(true);
  const { goalId } = useParams();

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        setLoading(true);

        const response = await apiauth.get(`/goals/${goalId}`);
        const data: GoalData = response.data;

        console.log(data);

        setGoalData(data);
      } catch (error) {
        console.error("Goal fetch error:", error);
        setGoalData(null);
      } finally {
        // setLoading(false);
      }
    };

    if (goalId) fetchGoalData();
  }, [goalId]);

  if (goalData === null && !loading) return <div>Page Not Found</div>;

  return (
    <div className="flex flex-col justify-between h-full">
      <ScrollArea>
        <div className="flex flex-wrap gap-4 justify-center pb-8 h-screen w-screen text-background relative">
          <h1 className="font-bold text-white text-2xl mt-1">
            {goalData?.title}
          </h1>
          <div />

          {/* <Skeleton> */}
          {loading && (
            <div className="w-full h-full">
              <ReactFlow
                className="relative"
                nodes={[
                  {
                    id: "root",
                    type: "input",
                    data: { label: "Root Node" },
                    position: { x: 500, y: 50 },
                    style: {
                      backgroundColor: "#00bbff",
                      borderRadius: "20px",
                    },
                  },
                  {
                    id: "child-1",
                    data: { label: "Child 1" },
                    position: { x: 300, y: 150 },
                  },
                  {
                    id: "child-2",
                    data: { label: "Child 2" },
                    position: { x: 700, y: 150 },
                  },
                  {
                    id: "child-1-1",
                    data: { label: "Child 1.1" },
                    position: { x: 200, y: 250 },
                  },
                  {
                    id: "child-1-2",
                    data: { label: "Child 1.2" },
                    position: { x: 400, y: 250 },
                  },
                  {
                    id: "child-2-1",
                    data: { label: "Child 2.1" },
                    position: { x: 600, y: 250 },
                  },
                  {
                    id: "child-2-2",
                    data: { label: "Child 2.2" },
                    position: { x: 800, y: 250 },
                  },
                  {
                    id: "child-1-1-1",
                    data: { label: "Child 1.1.1" },
                    position: { x: 150, y: 350 },
                  },
                  {
                    id: "child-1-1-2",
                    data: { label: "Child 1.1.2" },
                    position: { x: 250, y: 350 },
                  },
                  {
                    id: "child-1-2-2",
                    data: { label: "Child 1.2.2" },
                    position: { x: 450, y: 350 },
                  },
                  {
                    id: "child-2-2-1",
                    data: { label: "Child 2.2.1" },
                    position: { x: 750, y: 350 },
                  },
                  {
                    id: "child-2-2-2",
                    data: { label: "Child 2.2.2" },
                    position: { x: 850, y: 350 },
                  },
                ]}
                edges={[
                  {
                    id: "e-root-1",
                    source: "root",
                    target: "child-1",
                    animated: true,
                  },
                  {
                    id: "e-root-2",
                    source: "root",
                    target: "child-2",
                    animated: true,
                  },
                  {
                    id: "e-1-1",
                    source: "child-1",
                    target: "child-1-1",
                  },
                  { id: "e-1-2", source: "child-1", target: "child-1-2" },
                  { id: "e-2-1", source: "child-2", target: "child-2-1" },
                  { id: "e-2-2", source: "child-2", target: "child-2-2" },
                  { id: "e-1-1-1", source: "child-1-1", target: "child-1-1-1" },
                  { id: "e-1-1-2", source: "child-1-1", target: "child-1-1-2" },
                  { id: "e-1-2-1", source: "child-1-2", target: "child-1-2-1" },
                  {
                    id: "e-1-2-2",
                    source: "child-1-2",
                    target: "child-1-2-2",
                    animated: true,
                  },
                  { id: "e-2-1-1", source: "child-2-1", target: "child-2-1-1" },
                  { id: "e-2-1-2", source: "child-2-1", target: "child-2-1-2" },
                  {
                    id: "e-2-2-1",
                    source: "child-2-2",
                    target: "child-2-2-1",
                    animated: true,
                  },
                  { id: "e-2-2-2", source: "child-2-2", target: "child-2-2-2" },
                ]}
                nodesConnectable={false}
                elementsSelectable={false}
                nodesDraggable={false}
                fitView
                colorMode="dark"
                style={{
                  background: "transparent",
                }}
                proOptions={{ hideAttribution: true }}
              >
                {/* <MiniMap /> */}
                <ZoomSlider className="fixed bottom-[10px] !right-0 !left-auto h-fit !top-auto z-30 " />
              </ReactFlow>
            </div>
          )}
          {/* </Skeleton> */}
        </div>
      </ScrollArea>
      <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1] pointer-events-none" />
    </div>
  );
}
