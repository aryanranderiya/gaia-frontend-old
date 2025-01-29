import { Button } from "@heroui/button";
// import GradualSpacing from "../MagicUI/gradual-spacing";
import TypingAnimation from "../../MagicUI/typing-animation";
// import WaitlistOnlyInput from "./WaitListIOnlyInput";
// import { Avatar, AvatarGroup } from "@heroui/avatar";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { StarsIcon } from "../../icons";
import { AnimatedShinyText } from "../../ui/animated-shiny-text";

export default function HeroSection() {
  return (
    <>
      <div className="flex flex-col w-screen justify-start items-center gap-8 pt-32 h-[60vh]">
        <div className="flex flex-col justify-center items-center h-full">
          <div
            className={cn(
              "group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer border-white/5 bg-neutral-900 hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:duration-300 hover:text-neutral-400">
              <StarsIcon
                color="transparent"
                fill="#ffffffAA"
                className="mr-1"
                width={20}
                height={20}
              />
              Introducing GAIA
            </AnimatedShinyText>
          </div>

          <div className="py-3">
            {/* <div className="text-8xl bg-gradient-to-b from-white to-gray-200-300/50 bg-clip-text text-center font-medium leading-none text-transparent dark:from-white dark:to-zinc-700 from-50% max-w-screen-lg -my-2">
              Your Personalised AI
            </div>
            <div className="text-8xl bg-gradient-to-b from-white to-gray-200-300/50 bg-clip-text text-center font-medium leading-none text-transparent dark:from-white dark:to-zinc-700 from-50% max-w-screen-lg -my-2">
              Assistant awaits.
            </div> */}
            <div className="text-8xl max-w-screen-lg text-center font-medium helvetica leading-none">
              Your Personalised AI Assistant awaits.
            </div>
          </div>

          <TypingAnimation
            text="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            // text="A personalised AI Assistant, tailored for you."
            className="text-lg font-normal py-0 leading-7 sm:text-xl text-foreground-500"
            duration={20}
          />

          <Button
            color="primary"
            radius="full"
            variant="shadow"
            size="lg"
            className="font-medium mt-8"
          >
            <div className="flex items-center gap-1">
              Get Started -<span className="font-normal">It's free!</span>
              <ArrowUpRight />
            </div>
          </Button>
        </div>

        {/* <div className="flex gap-3 flex-wrap w-screen justify-center my-6">
          <WaitlistOnlyInput />
        </div> */}
        {/* 
        <div className="flex flex-col items-center gap-4">
          <AvatarGroup isBordered max={10}>
            <Avatar src="https://github.com/aryanranderiya.png" showFallback />
            <Avatar src="https://github.com/farzaa.png" showFallback />
            <Avatar src="https://i.pravatar.cc/150?img=12" showFallback />
            <Avatar src="https://i.pravatar.cc/150?img=41" showFallback />
            <Avatar src="https://i.pravatar.cc/150?img=58" showFallback />
          </AvatarGroup>
          <p className="text-sm text-foreground-700 ms-2">
            Join 1000's of users optimizing their daily life!
          </p>
        </div> */}
      </div>
    </>
  );
}
