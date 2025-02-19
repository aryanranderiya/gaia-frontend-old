import { Button } from "@heroui/button";
// import GradualSpacing from "../MagicUI/gradual-spacing";
// import WaitlistOnlyInput from "./WaitListIOnlyInput";
// import { Avatar, AvatarGroup } from "@heroui/avatar";
import TypingAnimation from "@/components/MagicUI/typing-animation";
import { Spotlight } from "@/components/ui/spotlight-new";
// import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
// import { AnimatedShinyText } from "../../ui/animated-shiny-text";
import { AnimatedSection } from "../misc/AnimatedSection";

export default function HeroSection() {
  return (
    <div className="flex flex-col w-screen justify-center items-center gap-8 sm:pt-32 pt-16 min-h-[80vh] h-fit">
      <div className="fixed top-0 left-0 w-screen">
        <Spotlight duration={15} />
      </div>
      <AnimatedSection className="flex flex-col justify-center items-center h-full z-[2] gap-4 relative">
        {/* <div className="tracking-[1rem] text-transparent bg-gradient-to-r via-white  bg-clip-text to-zinc-400 from-zinc-400">
          {/* INTRODUCING{"  "}GAIA 
        </div> 
          */}
        {/* <div
          className={cn(
            "group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer border-white/5 bg-neutral-900 hover:bg-neutral-800"
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:duration-300 hover:text-neutral-400">
            Currently in beta
          </AnimatedShinyText>
        </div> */}
        <div className="py-3">
          <div className="sm:text-8xl text-5xl bg-gradient-to-b from-white bg-clip-text text-center font-medium leading-none text-transparent to-zinc-400 max-w-screen-lg sm:-my-2">
            Your Personal AI Assistant awaits.
          </div>
        </div>
        <TypingAnimation
          text={
            "GAIA is your one stop solution personal assistant that helps with everything from calendar management to goal tracking"
          }
          className="text-lg font-normal py-0 sm:px-0 px-4 leading-7 sm:text-xl text-white max-w-screen-sm"
          duration={5}
        />
        <Button
          color="primary"
          radius="full"
          variant="shadow"
          size="lg"
          as={Link}
          to={"/get-started"}
          className="font-medium mt-8 outline outline-4 outline-[#75daff] hover:bg-[#75daff] border-none hover:scale-105 hover:outline-[#00bbff] hover:-translate-y-1 group"
        >
          <div className="flex items-center gap-1">
            Get Started for Free
            <ArrowUpRight />
          </div>
        </Button>
      </AnimatedSection>
    </div>
  );
}
