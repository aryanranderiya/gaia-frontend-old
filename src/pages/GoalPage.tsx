import { apiauth } from "@/apiaxios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@nextui-org/button";
import "@xyflow/react/dist/style.css";
import { ArrowLeft } from "lucide-react";
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

        // Single API call to fetch goal data
        const response = await apiauth.get(`/goals/${goalId}`);
        const data: GoalData = response.data;

        console.log(data);

        setGoalData(data);
      } catch (error) {
        console.error("Goal fetch error:", error);
        setGoalData(null);
      } finally {
        setLoading(false);
      }
    };

    if (goalId) {
      fetchGoalData();
    }
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
          {/* Add your ReactFlow or goal visualization here */}
        </div>
      </ScrollArea>
      <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1]" />
    </div>
  );
}
