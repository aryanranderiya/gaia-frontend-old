import { apiauth } from "@/utils/apiaxios";
import AddGoalDialog from "@/components/Goals/AddGoalDialog";
import { GoalCard } from "@/components/Goals/GoalCard";
import { Target04Icon } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await apiauth.get("/goals");
      console.log("goals", response.data);
      setGoals(response.data);
    } catch (err) {
      console.error(err);
      // navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async (goalTitle: string) => {
    try {
      const response = await apiauth.post("/goals", { title: goalTitle });
      navigate(`/try/goals/${response.data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = (goalTitle: string) => {
    createGoal(goalTitle);
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <ScrollArea>
          <div className="flex items-center flex-col gap-2">
            <div className="font-bold text-center text-5xl">Roadmaps</div>
            <div className=" text-center text-md pb-6 max-w-screen-md">
              A tool that instantly generates personalized goal roadmaps from a
              single prompt, helping you plan and track your objectives
              efficiently.
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pb-8 dark">
            {goals.length > 0 ? (
              goals.map((goal, index) => (
                <GoalCard key={index} goal={goal} fetchGoals={fetchGoals} />
              ))
            ) : (
              <div className="h-[80vh] flex items-center">
                {loading ? <Spinner /> : <div>No Goals created yet.</div>}
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="absolute left-0 bottom-6 flex justify-center items-center w-full z-10">
          <Button
            variant="shadow"
            color="primary"
            size="lg"
            radius="full"
            className="font-semibold gap-2"
            onPress={() => setOpenDialog(true)}
          >
            <Target04Icon width={23} height={23} />
            Create a new Goal
          </Button>
        </div>
        <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1]" />
      </div>
      <AddGoalDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        addGoal={handleAddGoal}
      />
    </>
  );
}
