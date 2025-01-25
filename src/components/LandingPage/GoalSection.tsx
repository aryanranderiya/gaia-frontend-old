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
      className={`flex items-center flex-col min-h-screen relative transition-all p-4 sm:mt-0 mt-20`}
    >
      <SectionHeading
        heading={"Manage your Goals"}
        subheading={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, eius?"
        }
        icon={<Target02Icon color="#ffffff90" width={45} height={45} />}
      />

      <div className="flex sm:gap-7 gap-20 sm:pt-10 pt-12 sm:p-10 p-2 items-center justify-center sm:flex-row flex-col">
        <div
          className={` space-y-5 transition-all relative w-full ${
            hover1 ? "sm:w-[40%]" : "sm:w-[30%]"
          } ${hover2 ? "opacity-20" : "opacity-100"}`}
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
            src="/landing/blur_goals.webp"
            className="sm:h-[70vh] h-fit outline-transparent w-full object-cover rounded-3xl sm:outline hover:sm:!outline-[#00bbff] sm:outline-zinc-800 transition-all sm:flex hidden"
          />

          <div className="sm:absolute relative min-h-full w-full left-0 top-0 flex items-center justify-center">
            <div className="bg-zinc-900 sm:w-[530px] w-full sm:p-7 p-3 rounded-xl space-y-3">
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
        {/* 
        <div
          className={`space-y-5 flex flex-col items-end transition-all  ${
            hover2 ? "w-[60%]" : "w-[50%]"
          } ${hover1 ? "opacity-30" : "opacity-100"}`}
          onMouseOver={() => setHover2(true)}
          onMouseOut={() => setHover2(false)}
        > */}

        <div
          className={`space-y-5 flex flex-col sm:items-end items-start transition-all ${
            hover2 ? "sm:w-[60%]" : "sm:w-[50%]"
          } ${hover1 ? "opacity-20" : "opacity-100"}`}
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
            className="h-[70vh] w-full object-top object-cover rounded-3xl outline hover:!outline-[#00bbff] outline-zinc-800 transition-all"
          />
        </div>
        <StaticSidebar hover1={hover1} isVisible={isVisible} />
      </div>
    </div>
  );
}
