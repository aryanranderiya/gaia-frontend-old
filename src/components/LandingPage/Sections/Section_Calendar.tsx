import { Button } from "@heroui/button";
import { toast } from "sonner";

import { AnimatedSection } from "../misc/AnimatedSection";
import { SectionHeading } from "../misc/SectionHeading";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BubbleConversationChatIcon,
  Calendar01Icon,
  CalendarAdd01Icon,
  GoogleCalendar,
} from "@/components/icons";
import { SimpleChatBubbleUser } from "@/components/Chat/ChatBubbles/SimpleChatBubbles";

function Test() {
  const DummyAddToCalendar = () => {
    toast.success("Event has been added to Calendar!");
  };

  return (
    <div className="flex flex-col gap-3">
      <SimpleChatBubbleUser>
        Schedule a meeting with Sarah on Friday at 3 PM.
      </SimpleChatBubbleUser>

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
            onPress={DummyAddToCalendar}
            // isLoading={eventAddLoading}
          >
            Add Event
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Section_Calendar() {
  return (
    <AnimatedSection className="w-screen justify-center items-center flex z-[1] relative">
      <div className="max-w-screen-xl w-screen flex flex-row justify-evenly items-start sm:space-x-10 space-x-5 ">
        <SectionHeading
          className="w-full"
          heading={"Manage your Calendar"}
          icon={<CalendarAdd01Icon color="#9b9b9b" height={45} width={45} />}
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
                variant="flat"
                startContent={<GoogleCalendar width={23} />}
                // variant="faded"
                // size="lg"
                // color="primary"
              >
                Integrated with Google Calendar
              </Button>
            </div>
          }
        />

        <Tabs className="w-full h-[340px] overflow-hidden" defaultValue="chat">
          <TabsList className="w-full mb-3 rounded-full">
            <TabsTrigger className="rounded-full" value="chat">
              <BubbleConversationChatIcon className="mr-2" />
              New Chat
            </TabsTrigger>
            <TabsTrigger className="rounded-full" value="calendar">
              <Calendar01Icon className="mr-2" />
              Calendar
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat">
            <div className="w-full h-fit !mt-0 bg-gradient-to-bl px-10 rounded-3xl z-[1]">
              <Test />
            </div>
          </TabsContent>
          <TabsContent className="space-y-2 px-10" value="calendar">
            <div className="text-white bg-opacity-65 p-4 rounded-lg shadow-md cursor-pointer w-full transition-colors duration-200 relative z-[1] overflow-hidden">
              <div className="flex items-center gap-2 relative z-[1]">
                <span className="text-xl">🔔</span>
                <div className="font-bold text-lg">Meeting with Sarah</div>
              </div>
              <div className="text-sm mt-2 relative z-[1] opacity-70">
                Friday Feb 14 2025
              </div>
              <div className="absolute inset-0 z-[0] opacity-50 rounded-lg w-full bg-yellow-500" />
            </div>

            <div className="text-white bg-opacity-65 p-4 rounded-lg shadow-md cursor-pointer w-full transition-colors duration-200 relative z-[1] overflow-hidden">
              <div className="flex items-center gap-2 relative z-[1]">
                <span className="text-xl">📅</span>
                <div className="font-bold text-lg">{"Event title"}</div>
              </div>
              <div className="text-sm mt-2 relative z-[1] opacity-70">
                Friday Feb 14 2025
              </div>
              <div className="absolute inset-0 z-[0] opacity-50 rounded-lg w-full bg-primary" />
            </div>

            <div className="text-white bg-opacity-65 p-4 rounded-lg shadow-md cursor-pointer w-full transition-colors duration-200 relative z-[1] overflow-hidden">
              <div className="flex items-center gap-2 relative z-[1]">
                <span className="text-xl">📅</span>
                <div className="font-bold text-lg">{"Event title"}</div>
              </div>
              <div className="text-sm mt-2 relative z-[1] opacity-70">
                Friday Feb 14 2025
              </div>
              <div className="absolute inset-0 z-[0] opacity-50 rounded-lg w-full bg-primary" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedSection>
  );
}
