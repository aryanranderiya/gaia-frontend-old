import { Button } from "@nextui-org/button";

export default function FinalSection() {
  return (
    <div className="flex w-screen items-center flex-col p-24 min-h-[60vh] bg-gradient-to-t from-[#00bbff30] to-black justify-center">
      <div className="flex w-full flex-col items-center gap-3">
        <div className="text-6xl font-medium">Get Started for Free</div>
        <div className="text-lg text-foreground-500">
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
