import { apiauth } from "@/utils/apiaxios";
import { CalendarSimpleIcon, Target04Icon } from "@/components/icons";
import { GoalData } from "@/pages/GoalPage";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function GoalCard({
  goal,
  fetchGoals,
}: {
  goal: GoalData;
  fetchGoals: () => void;
}) {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  async function deleteGoal(goalId: string) {
    try {
      const response = await apiauth.delete(`/goals/${goalId}`);
      console.log("Goal deleted successfully:", response.data);
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  }

  const handleDelete = () => {
    deleteGoal(goal?.id);
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Modal
        isOpen={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        className="dark text-foreground"
      >
        <ModalContent>
          <ModalHeader className="inline-block">
            Are you sure you want to delete the roadmap titled
            <span className="ml-1 font-normal text-primary-500">
              {goal?.roadmap?.title || goal.title}
            </span>
            <span className="ml-1">?</span>
          </ModalHeader>

          <ModalBody>
            <p className="text-danger-400 font-medium">
              This action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setOpenDeleteDialog(false)}
            >
              Close
            </Button>
            <Button color="primary" onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="bg-black bg-opacity-50 sm:w-[45vw] md:w-[23vw] flex flex-col p-4 rounded-lg  w-full group">
        <div className="font-medium text-xl flex items-center gap-1 w-full relative ">
          <Target04Icon width={20} height={20} />
          <span className="truncate w-[85%]">
            {goal?.roadmap?.title || goal.title}
          </span>

          <div className="absolute -right-2 group-hover:opacity-100 opacity-0 transition-opacity dark">
            <Dropdown
              classNames={{
                content: "bg-zinc-900",
              }}
            >
              <DropdownTrigger>
                <Button variant="flat" isIconOnly>
                  <DotsVerticalIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" className="dark">
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onPress={() => setOpenDeleteDialog(true)}
                >
                  Delete Roadmap
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
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
    </>
  );
}
