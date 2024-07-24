import TypingAnimation from "../MagicUI/typing-animation";
import GradualSpacing from "../MagicUI/gradual-spacing";
import WaitListButton from "./WaitlistModal";
import WaitlistOnlyInput from "./WaitListIOnlyInput";


export default function MainInfo() {

  return (
    <>
      <div className="flex flex-col w-screen justify-start items-center gap-8 pt-36">
        <div className="flex flex-col justify-center items-center h-full">
          <GradualSpacing
            text="Introducing G.A.I.A"
            className="landingpage_maintext bg-gradient-to-b from-black to-gray-200-300/50 bg-clip-text text-center font-medium leading-none text-transparent dark:from-white dark:to-zinc-700 from-30% py-4" />

          <TypingAnimation
            text="A General purpose AI Assistant, tailored for you."
            className="text-lg font-normal py-0 leading-7 sm:text-xl text-foreground-500"
            duration={20}
          />
        </div>

        <div className="flex gap-3 flex-wrap w-screen justify-center">
          <WaitlistOnlyInput />
        </div>
      </div>
    </>
  );
}
