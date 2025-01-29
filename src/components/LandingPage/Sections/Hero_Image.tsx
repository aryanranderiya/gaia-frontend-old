// import StarterEmoji from "../Chat/StarterEmoji";
// import StarterText from "../Chat/StarterText";
import { useState } from "react";
import { Safari } from "../../ui/safari";
import { Spinner } from "@heroui/spinner";
import { GridPattern } from "../../ui/grid-pattern";
import { cn } from "@/lib/utils";
import { ShineBorder } from "@/components/ui/shine-border";
import { AnimatedSection } from "../misc/AnimatedSection";

export default function ImagePreview() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <AnimatedSection>
      <div className="flex items-center justify-center h-fit w-screen mt-14 sm:mb-0 mb-[20vh]">
        <GridPattern
          width={20}
          height={20}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] max-h-[120vh] top-[40vh]"
          )}
        />

        <div className="relative">
          {!isImageLoaded && (
            <div className="flex items-center justify-center top-0 z-10 absolute w-full h-full bg-zinc-950 rounded-xl">
              <Spinner size="lg" />
            </div>
          )}

          {/* shadow-[0px_0px_200px_#00bbff70] animate-pulse-shadow */}
          <ShineBorder
            className="size-full w-fit !min-w-fit rounded-xl bg-zinc-800 p-0 animate-pulse-shadow"
            color={["#00bbff", "#27272a"]}
            borderWidth={3}
            duration={7}
            borderRadius={10}
          >
            <Safari
              url="heygaia.io"
              mode="simple"
              className="w-full"
              handleImageLoad={handleImageLoad}
              imageSrc="/landing/screenshot.png"
            />
          </ShineBorder>
        </div>
      </div>
    </AnimatedSection>
  );
}

{
  /* <div className="flex items-center justify-center top-0 z-10 absolute w-full h-full">
          <div className="flex items-center justify-center flex-1 ">
            <div className="flex items-center justify-center flex-col gap-2">
              <StarterEmoji />

              <StarterText />
            </div>
          </div>
        </div>
         */
}

// {
//   /* <img
//     //       src={"/landing/landing_pc.png"}
//     //       alt="Homepage Image with screenshots of GAIA"
//     //       className="rounded-3xl scale-100"
//     //     /> */
// }
// //     <img
// //       src={"/landing/new_devices.png"}
// //       // srcSet={image_webp}
// //       alt="Homepage Image with screenshots of GAIA"
// //     />
