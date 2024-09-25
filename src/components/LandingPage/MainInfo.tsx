import GradualSpacing from "../MagicUI/gradual-spacing";
import TypingAnimation from "../MagicUI/typing-animation";
import WaitlistOnlyInput from "./WaitListIOnlyInput";

export default function MainInfo() {
  return (
    <>
      <div className="flex flex-col w-screen justify-start items-center gap-8 pt-36">
        <div className="flex flex-col justify-center items-center h-full">
          <GradualSpacing
            text="Introducing G.A.I.A"
            className="landingpage_maintext bg-gradient-to-b from-white to-gray-200-300/50 bg-clip-text text-center font-medium leading-none text-transparent dark:from-white dark:to-zinc-700 from-30% py-4"
          />

          <TypingAnimation
            text="A General purpose AI Assistant, tailored for you."
            className="text-lg font-normal py-0 leading-7 sm:text-xl text-foreground-500"
            duration={20}
          />
        </div>

        <div className="flex gap-3 flex-wrap w-screen justify-center my-6">
          <WaitlistOnlyInput />
        </div>
        {/* 
        <div className="flex flex-col items-center gap-4">
          <AvatarGroup isBordered max={10} total={"x"} >
            <Avatar src="https://github.com/aryanranderiya.png" showFallback />
            <Avatar src="https://github.com/farzaa.png" showFallback />
            <Avatar src="https://i.pravatar.cc/150?img=12" showFallback />
            <Avatar src="https://i.pravatar.cc/150?img=41" showFallback />
            <Avatar src="https://i.pravatar.cc/150?img=52" showFallback />
            <Avatar src="https://i.pravatar.cc/150?img=44" showFallback />
            <Avatar src="https://i.pravatar.cc/150?img=58" showFallback />
          </AvatarGroup>
          <p className="text-sm text-foreground-700 ms-2">Join 1000+ users optimizing their daily life!</p>
        </div> */}
      </div>
    </>
  );
}
