import { Button } from "@heroui/button";
import { Eraser } from "lucide-react";
import { ModalAction } from "./SettingsMenu";
export default function GeneralSection({
  setModalAction,
}: {
  setModalAction: React.Dispatch<React.SetStateAction<ModalAction | null>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="mb-3">General</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Eraser className="text-foreground-300" />
          Delete all chats
        </div>
        <Button
          variant="flat"
          color="danger"
          className="w-1/5"
          radius="sm"
          onPress={() => setModalAction("clear_chats")}
        >
          Delete all
        </Button>
      </div>
    </div>
  );
}
