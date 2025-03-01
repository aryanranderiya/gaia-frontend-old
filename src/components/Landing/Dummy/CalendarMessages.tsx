import { SimpleChatBubbleUser } from "@/components/Landing/Dummy/SimpleChatBubbles";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { CalendarBotMessage } from "../Dummy/CalendarBotMessage";

export default function CalendarMessages({
  setAddedToCalendar,
}: {
  setAddedToCalendar: Dispatch<SetStateAction<boolean>>;
}) {
  const dummyAddToCalendar = () => {
    setAddedToCalendar((prev: boolean) => {
      if (!prev) return true;
      return prev;
    });
    toast.success("Event has been added to Calendar!");
  };

  return (
    <div className="flex flex-col gap-3">
      <SimpleChatBubbleUser>
        Schedule a meeting with Sarah on Friday at 3 PM.
      </SimpleChatBubbleUser>

      <CalendarBotMessage dummyAddToCalendar={dummyAddToCalendar} />
    </div>
  );
}
