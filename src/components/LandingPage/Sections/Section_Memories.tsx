import {
  Brain02Icon,
  CalendarAdd01Icon,
  GoogleCalendar,
} from "@/components/icons";
import { AnimatedSection } from "../misc/AnimatedSection";
import { SectionHeading } from "../misc/SectionHeading";
import { Button } from "@heroui/button";

export default function Section_Memories() {
  return (
    <AnimatedSection className="w-screen min-h-[100vh] justify-center items-center flex">
      <div className="max-w-screen-xl w-screen flex flex-row justify-evenly items-start sm:space-x-10 space-x-5 ">
        <SectionHeading
          className="w-full"
          heading={"An Assistant That Remembers"}
          subheading={
            <div>
              GAIA remembers your preferences, past conversations, and important
              details, so you don’t have to repeat yourself.
              <br />
              Get a smarter, more personalized experience every time you chat.
            </div>
          }
          icon={<Brain02Icon color="#9b9b9b" width={45} height={45} />}
        />

        <div className="w-full h-[50vh] bg-green-400 !mt-0"></div>
      </div>
    </AnimatedSection>
  );
}
