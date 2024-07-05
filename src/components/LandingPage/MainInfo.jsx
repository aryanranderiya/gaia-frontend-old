import TypingAnimation from "../MagicUI/typing-animation";
import GradualSpacing from "../MagicUI/gradual-spacing";
import WaitListButton from "./WaitlistModal";
// import { Button } from "@nextui-org/button";
// import { FallingStarIcon } from "../icons";
// import { useNavigate } from "react-router-dom";

export default function MainInfo() {
  // const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col w-screen justify-start items-center gap-8 pt-40">
        <div className="flex flex-col justify-center items-center gap-2 pt-32 h-full">
          <GradualSpacing
            text="Introducing G.A.I.A"
            className="bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center font-medium leading-none text-transparent dark:from-white dark:to-zinc-900 landingpage_maintext"
          />
          <TypingAnimation
            text="A General purpose AI Assistant, tailored just for you."
            className="text-medium font-normal py-0 leading-7 sm:text-xl"
            duration={20}
          />
        </div>

        <div className="flex gap-3 flex-wrap w-screen justify-center">
          <WaitListButton />
          {/* 
          <Button
            color="success"
            radius="full"
            variant="flat"
            size="lg"
            className="arrow_diagonal_btn font-medium"
            onPress={() => navigate("/early-access")}
            endContent={
              <FallingStarIcon
                className="arrow_diagonal"
                color="primary"
                width="15"
                height="15"
              />
            }
          >
            Get early access
          </Button> */}
        </div>
      </div>
    </>
  );
}
