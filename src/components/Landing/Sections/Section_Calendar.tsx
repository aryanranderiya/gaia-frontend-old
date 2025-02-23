import { Button } from "@heroui/button";
import { toast } from "sonner";
import { Dispatch, SetStateAction, useState } from "react";
import { Clock } from "lucide-react";

import { AnimatedSection } from "../AnimatedSection";
import { SectionHeading } from "../SectionHeading";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BubbleConversationChatIcon,
  Calendar01Icon,
  CalendarAdd01Icon,
  GoogleCalendar,
} from "@/components/Misc/icons";
import { SimpleChatBubbleUser } from "@/components/Chat/ChatBubbles/SimpleChatBubbles";

export function CalendarBotMessage({
  dummyAddToCalendar,
}: {
  dummyAddToCalendar: () => void;
}) {
  return (
    <div>
      <div className="p-4 bg-zinc-800 rounded-2xl rounded-bl-none mt-1 flex gap-1 flex-col max-w-[400px] w-fit">
        <div className="">
          Would you like to add this event to your Calendar?
        </div>

        <div className="bg-zinc-900 p-3 flex flex-row rounded-xl items-start gap-3 ">
          <GoogleCalendar height={35} width={25} />
          <div className="flex flex-col gap-1">
            <div>
              <div className="font-medium">Meeting with Sarah</div>
              <div className="text-sm">Scheduled meeting with Sarah</div>
            </div>
            <div className="text-xs text-foreground-500">Fri Feb 14 2025</div>
          </div>
        </div>

        <Button
          className="w-full"
          color="primary"
          onPress={dummyAddToCalendar}
          // isLoading={eventAddLoading}
        >
          Add Event
        </Button>
      </div>
    </div>
  );
}

function CalendarAddChat({
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

export default function Section_Calendar() {
  const [addedToCalendar, setAddedToCalendar] = useState(false);
  const [openedCalendar, setOpenedCalendar] = useState(false);

  return (
    <AnimatedSection className="w-screen justify-center items-center flex z-[1] relative">
      <div className="max-w-screen-xl w-screen flex sm:flex-row flex-col justify-evenly items-start sm:space-x-10 space-x-5 ">
        <SectionHeading
          className="w-full"
          heading={"Manage your Calendar"}
          icon={
            <CalendarAdd01Icon
              className="sm:w-[40px] w-[35px] sm:h-[40px] h-[40px]"
              color="#9b9b9b"
            />
          }
          subheading={
            <div>
              <div>
                Easily schedule, update, and check events just by texting GAIA.{" "}
                <br />
                No need to open your calendar—add appointments, set reminders,
                and stay organized with a simple message!
              </div>
              <Button
                disableRipple
                className="w-fit cursor-default mt-4 text-foreground-600"
                radius="full"
                startContent={<GoogleCalendar width={23} />}
                variant="flat"
              >
                Integrated with Google Calendar
              </Button>
            </div>
          }
        />

        <Tabs
          className="w-full box-border sm:m-0 !m-0 px-4 h-[340px] overflow-hidden"
          defaultValue="chat"
        >
          <TabsList className="w-full mb-3 rounded-full">
            <TabsTrigger className="rounded-full" value="chat">
              <BubbleConversationChatIcon className="mr-2" />
              New Chat
            </TabsTrigger>
            <TabsTrigger
              className="rounded-full"
              value="calendar"
              onClick={() => {
                if (addedToCalendar) setOpenedCalendar(true);
              }}
            >
              <Calendar01Icon className="mr-2" />
              <div className="relative">
                Calendar
                {addedToCalendar && !openedCalendar && (
                  <div
                    className="bg-red-500 min-h-2 min-w-2 rounded-full absolute -right-2
                   -top-[2px]"
                  />
                )}
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat">
            <div className="w-full h-fit !mt-0 bg-gradient-to-bl px-10 rounded-3xl z-[1]">
              <CalendarAddChat setAddedToCalendar={setAddedToCalendar} />
            </div>
          </TabsContent>
          <TabsContent className="space-y-2 sm:px-10 px-4" value="calendar">
            {addedToCalendar && (
              <div className="text-white bg-opacity-65 p-4 rounded-lg bg-yellow-500/30 shadow-md cursor-pointer w-full transition-colors duration-200 relative z-[1] overflow-hidden flex items-start gap-3 pl-6">
                <div className="min-h-[90%] min-w-1 bg-yellow-500 rounded-full absolute top-[5px] left-[8px]" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 relative z-[1]">
                    {/* <span className="text-xl">🔔</span> */}
                    <div className="font-bold text-lg">Meeting with Sarah</div>
                  </div>
                  <div className="text-sm mt-2 relative z-[1] flex items-center gap-1 text-yellow-500">
                    <Clock height={18} width={18} />
                    Friday Feb 14 2025
                  </div>
                </div>
              </div>
            )}

            <div className="text-white bg-opacity-65 p-4 rounded-lg bg-blue-500/30 shadow-md cursor-pointer w-full transition-colors duration-200 relative z-[1] overflow-hidden flex items-start gap-3 pl-6">
              <div className="min-h-[90%] min-w-1 bg-blue-500 rounded-full absolute top-[5px] left-[8px]" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2 relative z-[1]">
                  <div className="font-bold text-lg">📅 Event 1</div>
                </div>
                <div className="text-sm mt-2 relative z-[1] flex items-center gap-1 text-blue-500">
                  <Clock height={18} width={18} />
                  Friday Feb 14 2025
                </div>
              </div>
            </div>
            <div className="text-white bg-opacity-65 p-4 rounded-lg bg-blue-500/30 shadow-md cursor-pointer w-full transition-colors duration-200 relative z-[1] overflow-hidden flex items-start gap-3 pl-6">
              <div className="min-h-[90%] min-w-1 bg-blue-500 rounded-full absolute top-[5px] left-[8px]" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2 relative z-[1]">
                  <div className="font-bold text-lg">📅 Event 2</div>
                </div>
                <div className="text-sm mt-2 relative z-[1] flex items-center gap-1 text-blue-500">
                  <Clock height={18} width={18} />
                  Friday Feb 14 2025
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedSection>
  );
}
