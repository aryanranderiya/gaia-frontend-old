import TypingAnimation from "../MagicUI/typing-animation";
import GradualSpacing from "../MagicUI/gradual-spacing";
import JoinButtons from "./JoinButtons";

export default function MainInfo() {
  return (
    <>
      <div className="flex flex-col w-screen justify-start items-center gap-8 pt-20">
        <div className="flex flex-col justify-center items-center gap-2 pt-32">
          <GradualSpacing
            text="Introducing G.A.I.A"
            className="bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center font-medium leading-none text-transparent dark:from-white dark:to-slate-900/10 landingpage_maintext"
          />

          <div className=""></div>
          <TypingAnimation
            text="A General purpose AI Assistant, tailored just for you."
            className="text-medium font-normal py-0 leading-7 sm:text-xl"
            duration={20}
          />
        </div>

        <div className="flex gap-3 flex-wrap w-screen justify-center">
          <JoinButtons />
        </div>
      </div>
    </>
  );
}
