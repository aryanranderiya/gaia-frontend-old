import { Safari } from "../ui/safari";
// import image_png from "./images/homepage_image.png";
// import image_webp from "./images/homepage_image.webp";

export default function ImagePreview() {
  return (
    <div className="flex items-center justify-center h-fit w-screen mt-14 sm:mb-0 mb-[20vh]">
      <div className="min-w-[160%] sm:min-w-[70%] sm:max-w-[70%]">
        <Safari
          url="yourgaia.io"
          mode="simple"
          className="size-full"
          imageSrc="/landing/screenshot.png"
        />
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
