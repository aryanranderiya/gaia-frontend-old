import React, { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "../AnimatedSection";
import {
  CheckmarkSquare03Icon,
  FlowchartIcon1,
  Target02Icon,
} from "@/components/Misc/icons";
import StaticSidebar from "@/components/Goals/StaticSidebar";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Send } from "lucide-react";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

export default function GoalSection(): JSX.Element {
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const steps: Step[] = [
    {
      icon: <Target02Icon color={undefined} height={30} width={30} />,
      title: "Enter your goal",
      description:
        "Define your objective clearly so we can create a personalized plan for you.",
      image: "/landing/blur_goals.webp",
    },
    {
      icon: <FlowchartIcon1 color={undefined} height={30} width={30} />,
      title: "Create a Flowchart",
      description:
        "GAIA provides a step-by-step plan with resources to help you achieve your goal!",
      image: "/landing/goal tracking.png",
    },
    {
      icon: <CheckmarkSquare03Icon color={undefined} height={30} width={30} />,
      title: "Keep Track",
      description:
        "Monitor your milestones and celebrate every step toward achieving your goal.",
      image: "/landing/goal_cropped.png",
    },
  ];
  const [selectedImage, setSelectedImage] = useState<string>(
    steps[selectedStep].image
  );

  useEffect(() => {
    steps.forEach((step) => {
      new Image().src = step.image;
    });
  }, []);

  return (
    <AnimatedSection className="flex w-screen flex-col items-center min-h-fit relative transition-all p-4 sm:mt-0 gap-5 ">
      <GoalHeader />
      <GoalSteps
        steps={steps}
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
        setSelectedImage={setSelectedImage}
      />
      <GoalImage image={selectedImage} />
    </AnimatedSection>
  );
}

function GoalHeader(): JSX.Element {
  return (
    <div className="text-center max-w-screen-md">
      <h2 className="sm:text-5xl text-4xl font-bold flex items-center gap-4 mb-2 justify-center">
        Need help setting goals?
      </h2>
      <p className="text-foreground-700 text-lg">
        GAIA makes it easy by creating a step-by-step plan just for you. Enter
        your goal, and GAIA will break it down into clear actions with timelines
        and helpful resources to keep you on track.
      </p>
    </div>
  );
}

interface GoalStepsProps {
  steps: Step[];
  selectedStep: number;
  setSelectedStep: (index: number) => void;
  setSelectedImage: (index: string) => void;
}

function GoalSteps({
  steps,
  selectedStep,
  setSelectedStep,
  setSelectedImage,
}: GoalStepsProps): JSX.Element {
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const goalSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedStep === 2 && isComplete) {
      setSelectedImage("/landing/goal_checked.png");
    } else {
      setSelectedImage(steps[selectedStep].image);
    }
  }, [isComplete, selectedStep, steps]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (goalSectionRef.current) {
      observer.observe(goalSectionRef.current);
    }

    return () => {
      if (goalSectionRef.current) {
        observer.unobserve(goalSectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={goalSectionRef} className="relative min-w-full">
      <AnimatedSection className="grid w-screen max-w-screen-xl sm:grid-cols-3 items-center justify-center sm:gap-5">
        {steps.map((step, index) => (
          <GoalStep
            key={index}
            index={index + 1}
            isSelected={selectedStep === index}
            onClick={() => setSelectedStep(index)}
            {...step}
          />
        ))}
      </AnimatedSection>

      <StaticSidebar
        isVisible={selectedStep === 2 && isVisible}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
      />
    </div>
  );
}

interface GoalStepProps extends Step {
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

function GoalStep({
  icon,
  title,
  description,
  index,
  isSelected,
  onClick,
}: GoalStepProps): JSX.Element {
  return (
    <div
      className={`flex items-center gap-1 sm:p-5 p-2 sm:flex-col flex-row justify-center rounded-3xl cursor-pointer transition-all hover:opacity-100 ${
        isSelected ? "opacity-100" : "sm:opacity-60"
      }`}
      onClick={onClick}
    >
      <div
        className={`bg-zinc-800 outline outline-2 ${
          isSelected
            ? "outline-primary text-primary"
            : " outline-zinc-700 text-white "
        } min-w-[50px] min-h-[50px] rounded-xl flex items-center justify-center relative m-5`}
      >
        {icon}
        <div className="bg-primary rounded-full min-w-5 min-h-5 text-sm font-bold text-black flex items-center justify-center absolute -bottom-1 -right-1">
          {index}
        </div>
      </div>
      <div className="flex flex-col sm:items-center items-start max-w-fit">
        <h3 className="text-xl font-bold sm:text-center text-start">{title}</h3>
        <p className="sm:text-center text-start text-foreground-500 w-full">
          {description}
        </p>
      </div>
    </div>
  );
}

interface GoalImageProps {
  image: string;
}

function GoalImage({ image }: GoalImageProps): JSX.Element {
  return (
    <div className="relative sm:flex hidden">
      <img
        src={image}
        alt="Goal step illustration"
        className="h-[50vh] sm:w-screen max-w-screen-sm sm:max-w-screen-xl object-center object-cover rounded-3xl transition-all outline outline-4 outline-zinc-800"
      />
      {image == "/landing/blur_goals.webp" && (
        <div className="absolute h-full w-full flex items-center justify-center z-[2] top-0 left-0">
          <Input
            classNames={{ inputWrapper: "pr-2" }}
            className="w-96"
            endContent={
              <Button
                isIconOnly
                className="font-medium"
                color="primary"
                // onPress={handleAddGoal}
              >
                <Send />
              </Button>
            }
            label="What goal do you want to achieve?"
            variant="faded"
            // value={goalTitle}
            // onChange={(e: { target: { value: SetStateAction<string> } }) =>
            //   setGoalTitle(e.target.value)
            // }
            // onKeyDown={handleKeyPress}
          />
        </div>
      )}
    </div>
  );
}
