import { apiauth } from "@/apiaxios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoomSlider } from "@/components/zoom-slider";
import { Spinner } from "@nextui-org/spinner";
import { MiniMap, ReactFlow } from "@xyflow/react";
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

export default function GoalPage() {
  const [goalData, setGoalData] = useState<GoalData | null>(null);
  const [loading, setLoading] = useState(true);
  const { goalId } = useParams();

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        setLoading(true);
        const response = await apiauth.get(`/goals/${goalId}`);
        console.log("data", response.data.roadmap);
        setGoalData(response.data);
      } catch (error) {
        console.error("Goal fetch error:", error);
        setGoalData(null);
      } finally {
        setLoading(false);
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

          {loading ? (
            <div className="h-full w-screen flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="w-full h-full">
              <ReactFlow
                className="relative"
                nodes={goalData?.roadmap?.nodes}
                edges={goalData?.roadmap?.edges}
                nodesConnectable={false}
                elementsSelectable={false}
                nodesDraggable={false}
                fitView
                colorMode="dark"
                proOptions={{ hideAttribution: true }}
                style={{
                  background: "transparent",
                }}
              >
                <MiniMap />
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
