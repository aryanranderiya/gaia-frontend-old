import { GoogleCalendar } from "@/components/Misc/icons";
import { AnimatedSection } from "@/layouts/AnimatedSection";
import { Button } from "@heroui/button";

export function CalendarBotMessage({
  dummyAddToCalendar,
}: {
  dummyAddToCalendar: () => void;
}) {
  return (
    <div>
      <AnimatedSection className="p-4 bg-zinc-800 rounded-2xl rounded-bl-none mt-1 flex gap-1 flex-col max-w-[400px] w-fit">
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

        <Button className="w-full" color="primary" onPress={dummyAddToCalendar}>
          Add Event
        </Button>
      </AnimatedSection>
    </div>
  );
}
