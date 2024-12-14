import { apiauth } from "@/apiaxios";
import AddGoalDialog from "@/components/Goals/AddGoalDialog";
import { CalendarSimpleIcon, Target04Icon } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoalData } from "./GoalPage";
import { Spinner } from "@nextui-org/spinner";

export function GoalCard({ goal }: { goal: GoalData }) {
  const navigate = useNavigate();

  return (
    <div className="bg-black bg-opacity-50 sm:w-[45vw] md:w-[23vw] flex flex-col p-4 rounded-lg  w-full">
      <div className="font-medium text-xl flex items-center gap-1">
        <Target04Icon width={20} height={20} />
        <span className="truncate w-[90%]">{goal.title}</span>
      </div>

      <Chip
        size="sm"
        variant="flat"
        color={
          !goal.roadmap?.nodes?.length || !goal.roadmap?.edges?.length
            ? "warning"
            : goal.progress === 100
            ? "success"
            : goal.progress > 0
            ? "primary"
            : "warning"
        }
        className="mt-2"
      >
        {!goal.roadmap?.nodes?.length || !goal.roadmap?.edges?.length
          ? "Not Started"
          : goal.progress === 100
          ? "Completed"
          : goal.progress > 0
          ? "In Progress"
          : "Not Started"}
      </Chip>

      <div className="my-3 flex items-center gap-2 justify-between">
        <div className="bg-black h-3 rounded-full relative w-[100%]">
          <div
            style={{ width: `${goal?.progress || 0}%` }}
            className={`absolute left-0 bg-[#00bbff] top-0 h-3 rounded-full`}
          />
        </div>
        <span className="text-xs">{goal?.progress || 0}%</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-foreground-500 flex text-sm items-center gap-1 mt-2">
          <CalendarSimpleIcon width={20} />
          {new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }).format(new Date(goal?.created_at))}
        </div>
        <Button
          size="sm"
          color="primary"
          variant="flat"
          onPress={() => navigate(`./${goal.id}`)}
        >
          View Goal
        </Button>
      </div>
    </div>
  );
}

// [
//   {
//     id: "goal001",
//     title: "Read 10 pages of a book every day",
//     description: "Develop a habit of reading to improve knowledge and focus.",
//     createdAt: new Date().toISOString(),
//     progress: 20,
//   },
//   {
//     id: "goal002",
//     title: "Run a 5k marathon",
//     description:
//       "Train regularly to build endurance and achieve fitness goals.",
//     createdAt: new Date().toISOString(),
//     progress: 45,
//   },
//   {
//     id: "goal003",
//     title: "Launch a personal blog",
//     description: "Create a platform to share ideas, tutorials, and stories.",
//     createdAt: new Date().toISOString(),
//     progress: 70,
//   },
//   {
//     id: "goal004",
//     title: "Save $1000 in an emergency fund",
//     description: "Build financial security by saving consistently each month.",
//     createdAt: new Date().toISOString(),
//     progress: 55,
//   },
//   {
//     id: "goal005",
//     title: "Learn to cook 5 new recipes",
//     description: "Expand culinary skills by trying diverse cuisines.",
//     createdAt: new Date().toISOString(),
//     progress: 30,
//   },
//   {
//     id: "goal006",
//     title: "Complete a 30-day yoga challenge",
//     description:
//       "Improve flexibility and mindfulness with daily yoga practice.",
//     createdAt: new Date().toISOString(),
//     progress: 10,
//   },
//   {
//     id: "goal007",
//     title: "Master basic photography skills",
//     description: "Learn to capture and edit stunning photos using a DSLR.",
//     createdAt: new Date().toISOString(),
//     progress: 60,
//   },
//   {
//     id: "goal008",
//     title: "Declutter the entire house",
//     description: "Organize living spaces to improve productivity and clarity.",
//     createdAt: new Date().toISOString(),
//     progress: 80,
//   },
//   {
//     id: "goal009",
//     title: "Learn a new programming language",
//     description: "Expand technical skills by mastering Python or TypeScript.",
//     createdAt: new Date().toISOString(),
//     progress: 35,
//   },
//   {
//     id: "goal010",
//     title: "Plant and grow a vegetable garden",
//     description: "Grow fresh, organic vegetables in the backyard.",
//     createdAt: new Date().toISOString(),
//     progress: 15,
//   },
// ];
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

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = (goalTitle: string) => {
    const createGoal = async () => {
      try {
        const response = await apiauth.post("/goals", { title: goalTitle });
        navigate(`/try/goals/${response.data.id}`);

        // fetchGoals();
      } catch (err) {
        console.error(err);
        // navigate("/login");
      }
    };

    createGoal();
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <ScrollArea>
          <div className="flex flex-wrap gap-4 justify-center pb-8 dark">
            {goals.length > 0 ? (
              goals.map((goal, index) => <GoalCard key={index} goal={goal} />)
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
