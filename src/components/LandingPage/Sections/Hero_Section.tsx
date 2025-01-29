import { Button } from "@heroui/button";
// import GradualSpacing from "../MagicUI/gradual-spacing";
// import WaitlistOnlyInput from "./WaitListIOnlyInput";
// import { Avatar, AvatarGroup } from "@heroui/avatar";
import TypingAnimation from "@/components/MagicUI/typing-animation";
import { Spotlight } from "@/components/ui/spotlight-new";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { AnimatedShinyText } from "../../ui/animated-shiny-text";
import { AnimatedSection } from "../misc/AnimatedSection";

export default function HeroSection() {
  return (
    <div className="flex flex-col w-screen justify-start items-center gap-8 pt-32 h-[60vh]">
      <div className="fixed top-0 left-0 w-screen">
        <Spotlight duration={15} />
      </div>
      <AnimatedSection className="flex flex-col justify-center items-center h-full">
        <div
          className={cn(
            "group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer border-white/5 bg-neutral-900 hover:bg-neutral-800"
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:duration-300 hover:text-neutral-400">
            {/* <StarsIcon
              color="transparent"
              fill="#ffffffAA"
              className="mr-1"
              width={20}
              height={20}
            /> */}
            Currently in beta
          </AnimatedShinyText>
        </div>

        <div className="py-3">
          <div className="text-8xl bg-gradient-to-b from-zinc-200 bg-clip-text text-center font-medium leading-none text-transparent to-zinc-700 from-50% max-w-screen-lg -my-2">
            Your Personal AI Assistant awaits.
          </div>
        </div>

        <TypingAnimation
          text="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          className="text-lg font-normal py-0 leading-7 sm:text-xl text-foreground-600"
          duration={20}
        />

        <Button
          color="primary"
          radius="full"
          variant="shadow"
          size="lg"
          className="font-medium mt-8 outline outline-4 outline-[#75daff] hover:bg-[#75daff] border-none hover:scale-105 hover:outline-[#00bbff] hover:-translate-y-1 group"
        >
          <div className="flex items-center gap-1">
            Get Started for free
            {/* <span className="font-normal max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-[opacity] duration-200 ease group-hover:transition-[max-width] group-hover:duration-200 overflow-hidden whitespace-nowrap">
              &#8212; It's free!
            </span> */}
            <ArrowUpRight />
          </div>
        </Button>
      </AnimatedSection>
    </div>
  );
}
