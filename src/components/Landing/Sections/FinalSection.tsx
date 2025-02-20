import { Button } from "@heroui/button";
import { Link } from "react-router-dom";

export default function FinalSection() {
  return (
    <div className="flex w-screen items-center flex-col !m-0 sm:p-36 p-5 min-h-fit bg-gradient-to-t from-[#00bbff30] to-black justify-center">
      <div className="flex w-full flex-col items-center gap-3 justify-center">
        <div className="sm:text-6xl text-4xl font-medium">
          Get Started for Free
        </div>
        <div className="text-lg text-foreground-700 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
          facilis.
        </div>
        <Button
          as={Link}
          className="font-medium text-lg mt-3"
          color="primary"
          radius="full"
          size="lg"
          to={"/get-started"}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
