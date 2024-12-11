import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Send } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate for navigation in React Router v6

export default function AddGoalDialog({
  openDialog,
  setOpenDialog,
  addGoal,
}: {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  addGoal: (goal: string) => void;
}) {
  const [goalTitle, setGoalTitle] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddGoal();
    }
  };

  const handleAddGoal = () => {
    if (!goalTitle) {
      return;
    }
    addGoal(goalTitle);
    setGoalTitle("");
    setOpenDialog(false);
  };

  return (
    <Modal
      isOpen={openDialog}
      onOpenChange={setOpenDialog}
      className="dark text-foreground"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 mb-0 pb-0">
          Add Goal
        </ModalHeader>
        <ModalBody>
          <div className="text-sm">
            I will help you create a step-by-step plan to achieve your goal !
          </div>
          <Input
            label="What goal do you want to achieve?"
            variant="faded"
            value={goalTitle}
            classNames={{ inputWrapper: "pr-2" }}
            endContent={
              <Button
                color="primary"
                onPress={handleAddGoal}
                className="font-medium"
                isIconOnly
              >
                <Send />
              </Button>
            }
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setGoalTitle(e.target.value)
            }
            onKeyDown={handleKeyPress}
          />
        </ModalBody>
        <ModalFooter className="pt-0" />
      </ModalContent>
    </Modal>
  );
}
