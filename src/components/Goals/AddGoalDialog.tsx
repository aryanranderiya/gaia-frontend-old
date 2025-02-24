import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Send } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function AddGoalDialog({
  openDialog,
  setOpenDialog,
  addGoal,
  prevGoalTitle,
}: {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  addGoal: (goal: string) => void;
  prevGoalTitle?: string | null;
}) {
  const [goalTitle, setGoalTitle] = useState(prevGoalTitle || "");

  useEffect(() => {
    if (prevGoalTitle) setGoalTitle(prevGoalTitle);
  }, [prevGoalTitle]);

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
      backdrop="blur"
      className="dark text-foreground"
      isOpen={openDialog}
      onOpenChange={setOpenDialog}
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
            classNames={{ inputWrapper: "pr-2" }}
            endContent={
              <Button
                isIconOnly
                className="font-medium"
                color="primary"
                onPress={handleAddGoal}
              >
                <Send />
              </Button>
            }
            label="What goal do you want to achieve?"
            value={goalTitle}
            variant="faded"
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
