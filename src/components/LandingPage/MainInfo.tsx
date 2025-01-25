import { Button } from "@nextui-org/button";
// import GradualSpacing from "../MagicUI/gradual-spacing";
import TypingAnimation from "../MagicUI/typing-animation";
// import WaitlistOnlyInput from "./WaitListIOnlyInput";
// import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <div className="flex flex-col w-screen justify-start items-center gap-8 pt-36">
        <div className="flex flex-col justify-center items-center h-full">
          <div
            // text=""
            className="landingpage_maintext bg-gradient-to-b from-white to-gray-200-300/50 bg-clip-text text-center font-medium leading-none text-transparent dark:from-white dark:to-zinc-700 from-30% py-4"
          >
            Introducing G.A.I.A
          </div>

          <TypingAnimation
            text="A personalised AI Assistant, tailored for you."
            className="text-lg font-normal py-0 leading-7 sm:text-xl text-foreground-500"
            duration={20}
          />
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

        <Button
          color="primary"
          radius="full"
          variant="shadow"
          size="lg"
          className="font-medium"
        >
          <div className="flex items-center gap-1">
            Get Started
            <ArrowUpRight />
          </div>
        </Button>
      </div>
    </>
  );
}
