import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import StaticSidebar from "../../Goals/StaticSidebar";
import { Target02Icon } from "../../icons";
import { SectionHeading } from "../misc/SectionHeading";
import { AnimatedSection } from "../misc/AnimatedSection";

export default function GoalSection() {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const sectionRef = useRef(null); // Reference to the section element

  // Intersection Observer logic
  useEffect(() => {
    [
      "/landing/goal_checked.png",
      "/landing/goal_cropped.png",
      "/landing/blur_goals.webp",
    ].forEach((image) => {
      const img = new Image();
      img.src = image;
    });

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
    <AnimatedSection
      className={`flex flex-col items-center min-h-screen relative transition-all p-4 sm:mt-0 my-24 `}
    >
      <div>
        <div className="max-w-screen-xl w-screen" ref={sectionRef}>
          <SectionHeading
            heading={"Manage your Goals"}
            subheading={
              "Simply enter what goal you want to achieve, and GAIA will help create a step by step actionable plan, along with a timeline and resources to help achieve the goal"
            }
            icon={<Target02Icon color="#ffffff90" width={45} height={45} />}
          />
        </div>
      </div>
      <div className="flex sm:gap-7 gap-20 sm:pt-10 pt-12 items-center justify-center sm:flex-row flex-col max-w-screen-xl">
        <div
          className={` space-y-5 transition-all relative w-full bg-zinc-950 outline rounded-3xl p-3 ${
            hover1
              ? "sm:w-[60%] sm:!outline-[#00bbff] "
              : "sm:w-[45%] sm:outline-zinc-900"
          } ${hover2 ? "opacity-20" : "opacity-100"}`}
          onMouseOver={() => setHover1(true)}
          onMouseOut={() => setHover1(false)}
        >
          {/* <Chip
            variant="shadow"
            color="primary"
            classNames={{ content: "font-medium" }}
          >
            Step 1: Enter your goal
          </Chip> */}

          <div className="flex items-start flex-col gap-2 px-2 pt-2">
            <Chip
              variant="shadow"
              color="primary"
              classNames={{ content: "font-medium" }}
            >
              Step 1
            </Chip>

            <div className="font-medium text-2xl">Enter your Goal</div>
          </div>
          <img
            src="/landing/blur_goals.webp"
            className={`sm:h-[60vh] h-fit w-full object-cover rounded-3xl transition-all sm:flex hidden`}
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

        <div
          className={` space-y-5 transition-all relative w-full bg-zinc-950 outline rounded-3xl p-3 ${
            hover2
              ? "sm:w-[80%] sm:!outline-[#00bbff] "
              : "sm:w-[60%] sm:outline-zinc-900"
          } ${hover1 ? "opacity-20" : "opacity-100"}`}
          onMouseOver={() => setHover2(true)}
          onMouseOut={() => setHover2(false)}
        >
          <div className="flex items-start flex-col gap-2">
            <Chip
              variant="shadow"
              color="primary"
              classNames={{ content: "font-medium" }}
            >
              Step 2
            </Chip>

            <div className="font-medium text-2xl">Track your progress</div>
          </div>
          <img
            src={
              isComplete
                ? "/landing/goal_checked.png"
                : "/landing/goal_cropped.png"
            }
            className="h-[60vh] w-full object-top object-cover rounded-3xl transition-all"
          />
        </div>
        <StaticSidebar
          hover1={hover1}
          isVisible={isVisible}
          isComplete={isComplete}
          setIsComplete={setIsComplete}
        />
      </div>
    </AnimatedSection>
  );
}
