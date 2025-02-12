import { CalendarAdd01Icon, GoogleCalendar } from "@/components/icons";
import { AnimatedSection } from "../misc/AnimatedSection";
import { SectionHeading } from "../misc/SectionHeading";
import { Button } from "@heroui/button";

export default function Section_Calendar() {
  return (
    <AnimatedSection className="w-screen min-h-[100vh] justify-center items-center flex">
      <div className="max-w-screen-xl w-screen flex flex-row justify-evenly items-start sm:space-x-10 space-x-5 ">
        <SectionHeading
          className="w-full"
          heading={"Manage your Calendar"}
          subheading={
            <div>
              <div>
                Easily schedule, update, and check events just by texting GAIA.{" "}
                <br />
                No need to open your calendar—add appointments, set reminders,
                and stay organized with a simple message!
              </div>
              <Button
                className="w-fit cursor-pointer mt-4 text-foreground-600"
                // variant="faded"
                variant="flat"
                radius="full"
                size="lg"
                disableRipple
                // color="primary"
                startContent={<GoogleCalendar width={27} />}
              >
                Integrated with Google Calendar
              </Button>
            </div>
          }
          icon={<CalendarAdd01Icon color="#9b9b9b" width={45} height={45} />}
        />

        <div className="w-full h-[50vh] bg-green-400 !mt-0"></div>
      </div>
    </AnimatedSection>
  );
}
