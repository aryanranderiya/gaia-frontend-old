// import StarterEmoji from "../Chat/StarterEmoji";
// import StarterText from "../Chat/StarterText";
import { useState } from "react";
import { Safari } from "../../ui/safari";
import { Spinner } from "@heroui/spinner";
import { GridPattern } from "../../ui/grid-pattern";
import { cn } from "@/lib/utils";

export default function ImagePreview() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="flex items-center justify-center h-fit w-screen mt-14 sm:mb-0 mb-[20vh]">
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] max-h-[120vh] top-[50vh]"
        )}
      />

      <div className="min-w-[160%] sm:min-w-[70%] sm:max-w-[70%] relative">
        {!isImageLoaded && (
          <div className="flex items-center justify-center top-0 z-10 absolute w-full h-full bg-zinc-950 rounded-xl">
            <Spinner size="lg" />
          </div>
        )}

        <Safari
          url="yourgaia.io"
          mode="simple"
          className="size-full shadow-[0px_0px_200px_#00bbff70] rounded-xl outline outline-[#00bbff] outline-[2px] animate-pulse-shadow"
          handleImageLoad={handleImageLoad}
          imageSrc="/landing/screenshot.png"
        />
      </div>
    </div>
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
