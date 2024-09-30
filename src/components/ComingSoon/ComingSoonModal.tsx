import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@nextui-org/button";

const steps = [
  {
    title: "Exciting New Features!",
    description: "Discover what's coming soon to enhance your experience.",
    image: "https://placehold.co/600x400",
    content:
      "We're thrilled to announce a suite of new features that will revolutionize your workflow. From advanced AI-powered suggestions to seamless integrations with your favorite tools, we're taking productivity to the next level.",
  },
  {
    title: "Enhanced Collaboration",
    description: "Work together like never before.",
    image: "https://placehold.co/600x400",
    content:
      "Our new collaboration tools will make teamwork a breeze. Real-time editing, intuitive commenting systems, and smart notifications will keep your team in sync and moving forward efficiently.",
  },
  {
    title: "Powerful Analytics",
    description: "Gain insights to drive your success.",
    image: "https://placehold.co/600x400",
    content:
      "Unlock the potential of your data with our upcoming analytics dashboard. Visualize trends, track performance, and make data-driven decisions with ease. Your path to success is about to become clearer than ever.",
  },
];

export default function Component({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-zinc-900 text-white border-none flex flex-col gap-3 sm:max-w-[500px] max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl select-text">
            {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription className="text-center select-text">
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>

        <img
          src={steps[currentStep].image}
          alt={`Coming Soon - ${steps[currentStep].title}`}
          className="rounded-xl w-full object-cover h-[200px]"
          loading="eager"
        />

        <p className="text-foreground-400 select-text">
          {steps[currentStep].content}
        </p>

        <DialogFooter className="flex justify-between items-center mt-2 gap-2 w-full">
          <div className="flex gap-2 items-center justify-between w-full">
            <Button
              variant="flat"
              onClick={handlePrevious}
              isDisabled={currentStep === 0}
              color="primary"
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? "bg-primary" : "bg-gray-600"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>

            <Button onClick={handleNext} variant="flat" color="primary">
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
