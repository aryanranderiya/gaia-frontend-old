import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import StaticSidebar from "../Goals/StaticSidebar";
import { Target02Icon } from "../icons";
import { SectionHeading } from "./SectionHeading";

export default function GoalSection() {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

  const sectionRef = useRef(null); // Reference to the section element

  // Intersection Observer logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Section is visible
        } else {
          setIsVisible(false); // Section is not visible
        }
      },
      {
        rootMargin: "0px", // Optional: adjust the margin around the root (viewport)
        threshold: 0.7, // Trigger when 50% of the section is visible
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current); // Observe the section element

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current); // Clean up the observer when component is unmounted
    };
  }, []);

  return (
    <div
      ref={sectionRef} // Attach ref to the section
      className={`flex items-center flex-col min-h-screen relative transition-all`}
    >
      <SectionHeading
        heading={"Manage your Goals"}
        subheading={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, eius?"
        }
        icon={<Target02Icon color="#ffffff90" width={45} height={45} />}
      />

      <StaticSidebar hover1={hover1} isVisible={isVisible} />

      <div className="flex gap-4 p-10 items-center justify-center">
        <div
          className={` space-y-3 transition-all relative ${
            hover1 ? "w-[40%]" : "w-[30%]"
          } ${hover2 ? "opacity-30" : "opacity-100"}`}
          onMouseOver={() => setHover1(true)}
          onMouseOut={() => setHover1(false)}
        >
          <Chip
            variant="shadow"
            color="primary"
            size="lg"
            classNames={{ content: "font-medium" }}
          >
            Step 1: Enter your goal
          </Chip>
          <img
            src="/landing/blur_goals.png"
            className="h-[70vh] w-full object-cover rounded-3xl outline hover:!outline-[#00bbff] outline-zinc-700 transition-all"
          />

          <div className="absolute min-h-full w-full left-0 top-0 flex items-center justify-center">
            <div className="bg-zinc-900 w-[530px] p-7 rounded-xl space-y-3">
              <div className="text-lg font-medium">Add Goal</div>
              <div className="text-sm">
                I will help you create a step-by-step plan to achieve your goal!
              </div>
              <Input
                variant="faded"
                label="What goal do you want to achieve?"
                size="lg"
                endContent={
                  <Button isIconOnly color="primary">
                    <Send color="black" fill="#ffffff40" />
                  </Button>
                }
              />
            </div>
          </div>
        </div>

        <div
          className={`space-y-3 flex flex-col items-end transition-all  ${
            hover2 ? "w-[70%]" : "w-[50%]"
          } ${hover1 ? "opacity-30" : "opacity-100"}`}
          onMouseOver={() => setHover2(true)}
          onMouseOut={() => setHover2(false)}
        >
          <Chip
            variant="shadow"
            color="primary"
            size="lg"
            classNames={{ content: "font-medium" }}
          >
            Step 2: Track your progress
          </Chip>
          <img
            src="/landing/goal_cropped.png"
            className="h-[70vh] w-full object-top object-cover rounded-3xl outline hover:!outline-[#00bbff] outline-zinc-700 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
