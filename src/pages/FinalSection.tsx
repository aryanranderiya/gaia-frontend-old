import { Button } from "@nextui-org/button";

export default function FinalSection() {
  return (
    <div className="flex w-screen items-center flex-col sm:p-24 p-5 sm:min-h-[60vh] min-h-[50vh] bg-gradient-to-t from-[#00bbff30] to-black justify-center">
      <div className="flex w-full flex-col items-center gap-3 justify-center">
        <div className="sm:text-6xl text-4xl font-medium">
          Get Started for Free
        </div>
        <div className="text-lg text-foreground-500 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
          facilis.
        </div>
        <Button
          size="lg"
          color="primary"
          radius="full"
          className="font-medium text-lg mt-3"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
