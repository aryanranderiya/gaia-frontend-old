// import StarterEmoji from "../Chat/StarterEmoji";
// import StarterText from "../Chat/StarterText";
import { Safari } from "../ui/safari";

export default function ImagePreview() {
  return (
    <div className="flex items-center justify-center h-fit w-screen mt-14 sm:mb-0 mb-[20vh]">
      <div className="min-w-[160%] sm:min-w-[70%] sm:max-w-[70%] relative">
        <Safari
          url="yourgaia.io"
          mode="simple"
          className="size-full"
          imageSrc="/landing/screenshot.png"
        />
        {/* <div className="flex items-center justify-center top-0 z-10 absolute w-full h-full">
          <div className="flex items-center justify-center flex-1 ">
            <div className="flex items-center justify-center flex-col gap-2">
              <StarterEmoji />

              <StarterText />
            </div>
          </div>
        </div>
         */}
      </div>
    </div>
  );
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
