import React, { useEffect, useState } from "react";
import { AnimatedSection } from "../AnimatedSection";
import {
  CheckmarkSquare03Icon,
  FlowchartIcon1,
  Target02Icon,
} from "@/components/Misc/icons";
import StaticSidebar from "@/components/Goals/StaticSidebar";

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
      image: "/landing/create_goal.png",
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

  return (
    <AnimatedSection className="flex flex-col items-center min-h-fit relative transition-all p-4 sm:mt-0 gap-5">
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
      <h2 className="sm:text-5xl text-2xl font-bold flex items-center gap-4 mb-2 justify-center">
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

  useEffect(() => {
    if (selectedStep == 2 && isComplete)
      setSelectedImage("/landing/goal_checked.png");
    else setSelectedImage(steps[selectedStep].image);
  }, [isComplete, selectedStep, steps]);

  return (
    <AnimatedSection className="min-w-full grid w-screen max-w-screen-xl grid-cols-3 items-center justify-center gap-5">
      {steps.map((step, index) => (
        <GoalStep
          key={index}
          index={index + 1}
          isSelected={selectedStep === index}
          onClick={() => setSelectedStep(index)}
          {...step}
        />
      ))}

      <StaticSidebar
        isVisible={selectedStep == 2}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
      />
    </AnimatedSection>
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
      className={`flex flex-col items-center gap-1 p-5 rounded-3xl cursor-pointer transition-all ${
        isSelected ? "opacity-100" : "opacity-60"
      }`}
      onClick={onClick}
    >
      <div
        className={`bg-zinc-800 outline outline-2 ${
          isSelected
            ? "outline-primary text-primary"
            : " outline-zinc-700 text-white "
        } w-[50px] h-[50px] rounded-xl flex items-center justify-center relative m-5`}
      >
        {icon}
        <div className="bg-primary rounded-full min-w-5 min-h-5 text-sm font-bold text-black flex items-center justify-center absolute -bottom-1 -right-1">
          {index}
        </div>
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="w-full text-center text-foreground-500">{description}</p>
    </div>
  );
}

interface GoalImageProps {
  image: string;
}

function GoalImage({ image }: GoalImageProps): JSX.Element {
  return (
    <img
      src={image}
      alt="Goal step illustration"
      className="h-[50vh] w-screen max-w-screen-xl object-center object-cover rounded-3xl transition-all outline outline-4 outline-zinc-800"
    />
  );
}
