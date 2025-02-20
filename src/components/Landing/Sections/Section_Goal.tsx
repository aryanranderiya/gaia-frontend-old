/* eslint-disable prettier/prettier */
// import { Button } from "@heroui/button";
// import { Chip } from "@heroui/chip";
// import { Input } from "@heroui/input";
// import { Send } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import StaticSidebar from "../../Goals/StaticSidebar";
// import { Target02Icon } from "../../icons";
// import { SectionHeading } from "../misc/SectionHeading";
// import { AnimatedSection } from "../misc/AnimatedSection";

import { AnimatedSection } from "../AnimatedSection";

import {
  CheckmarkSquare03Icon,
  FlowchartIcon1,
  Target02Icon,
} from "@/components/Misc/icons";

// export default function GoalSection() {
//   const [hover1, setHover1] = useState(false);
//   const [hover2, setHover2] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);

//   const sectionRef = useRef(null); // Reference to the section element

//   // Intersection Observer logic
//   useEffect(() => {
//     [
//       "/landing/goal_checked.webp",
//       "/landing/goal_cropped.webp",
//       "/landing/blur_goals.webp",
//     ].forEach((image) => {
//       setTimeout(
//         () => {
//           const img = new Image();
//           img.src = image;
//         },
//         image == "/landing/goal_cropped.webp" ? 1000 : 0
//       );
//     });

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true); // Section is visible
//         } else {
//           setIsVisible(false); // Section is not visible
//         }
//       },
//       {
//         rootMargin: "0px", // Optional: adjust the margin around the root (viewport)
//         threshold: 0.6,
//       }
//     );

//     if (sectionRef.current) observer.observe(sectionRef.current); // Observe the section element

//     return () => {
//       if (sectionRef.current) observer.unobserve(sectionRef.current); // Clean up the observer when component is unmounted
//     };
//   }, []);

//   return (
//     <AnimatedSection
//       className={`flex flex-col items-center min-h-fit relative transition-all p-4 sm:mt-0 `}
//     >
//       <div>
// <div className="max-w-screen-xl w-screen">
//           <SectionHeading
//             heading={"Need help setting goals?"}
//             subheading={`GAIA makes it easy by creating a step-by-step plan just for you. Enter your goal, and GAIA will break it down into clear actions with timelines and helpful resources to keep you on track.`}
//             icon={<Target02Icon color="#9b9b9b" width={45} height={45} />}
//           />
//         </div>
//       </div>
//       <div
//         className="flex sm:gap-7 gap-20 sm:pt-10 pt-12 items-center justify-center sm:flex-row flex-col max-w-screen-xl"
//         ref={sectionRef}
//       >
//         <div
//           className={` space-y-5 transition-all relative w-full bg-zinc-900 sm:outline rounded-3xl p-3 ${
//             hover1
//               ? "sm:!outline-[#00bbff] "
//               : // sm:w-[60%]
//                 "sm:outline-zinc-800"
//             // sm:w-[45%]
//             // ${hover2 ? "opacity-20" : "opacity-100"}
//           }

//           `}
//           onMouseOver={() => setHover1(true)}
//           onMouseOut={() => setHover1(false)}
//         >
//           {/* <Chip
//             variant="shadow"
//             color="primary"
//             classNames={{ content: "font-medium" }}
//           >
//             Step 1: Enter your goal
//           </Chip> */}

//           <div className="flex items-start flex-col gap-2 px-2 pt-2">
//             <Chip
//               variant="shadow"
//               color="primary"
//               classNames={{ content: "font-medium" }}
//             >
//               Step 1
//             </Chip>

//             <div className="space-y-1">
//               <div className="font-medium text-2xl">Enter your Goal</div>
//               <div className="text-foreground-500">
//                 Simply describe what you are trying to achieve. GAIA will
//                 generate a detailed roadmap with actionable steps to help
//                 achieve your goal!
//               </div>
//             </div>
//           </div>
//           <img
//             src="/landing/blur_goals.webp"
//             className={`sm:h-[60vh] h-fit w-full object-cover rounded-3xl transition-all sm:flex hidden`}
//             alt="Create a Goal Background"
//           />

//           <div className="sm:absolute relative min-h-full w-full left-0 top-0 flex items-center justify-center">
//             <div className="bg-zinc-900 sm:w-[450px] w-full sm:p-5 p-3 rounded-xl space-y-3">
//               {/* <div className="text-lg font-medium">Add Goal</div>
//               <div className="text-sm">
//                 I will help you create a step-by-step plan to achieve your goal!
//               </div> */}
//               <Input
//                 variant="faded"
//                 label="What goal do you want to achieve?"
//                 size="lg"
//                 endContent={
//                   <Button isIconOnly color="primary">
//                     <Send color="black" fill="#ffffff40" />
//                   </Button>
//                 }
//               />
//             </div>
//           </div>
//         </div>

//         <div
//           className={` space-y-5 transition-all relative w-full bg-zinc-900 sm:outline rounded-3xl p-3 ${
//             hover2
//               ? // sm:w-[80%]
//                 "sm:!outline-[#00bbff] "
//               : // sm:w-[60%]
//                 "sm:outline-zinc-800"
//             //  ${hover1 ? "opacity-20" : "opacity-100"}
//           }
//            `}
//           onMouseOver={() => setHover2(true)}
//           onMouseOut={() => setHover2(false)}
//         >
//           <div className="flex items-start flex-col gap-2">
//             <Chip
//               variant="shadow"
//               color="primary"
//               classNames={{ content: "font-medium" }}
//             >
//               Step 2
//             </Chip>

//             <div className="space-y-1">
//               <div className="font-medium text-2xl">Track your progress</div>
//               <div className="text-foreground-500">
//                 Gain access to to-dos, resources and estimated time for each
//                 step. Track your progress by marking completed steps on your
//                 roadmap.
//               </div>
//             </div>
//           </div>
//           <img
//             src={
//               isComplete
//                 ? "/landing/goal_checked.webp"
//                 : "/landing/goal_cropped.webp"
//             }
//             alt="Flowchart of created goal"
//             className="h-[60vh] w-full object-top object-cover rounded-3xl transition-all"
//           />
//         </div>
//         <StaticSidebar
//           hover1={hover1}
//           isVisible={isVisible}
//           isComplete={isComplete}
//           setIsComplete={setIsComplete}
//         />
//       </div>
//     </AnimatedSection>
//   );
// }

export default function GoalSection() {
  return (
    <AnimatedSection
      className={`flex flex-col items-center min-h-fit relative transition-all p-4 sm:mt-0`}
    >
      {/* <SectionHeading
        heading={"Need help setting goals?"}
        subheading={`GAIA makes it easy by creating a step-by-step plan just for you. Enter your goal, and GAIA will break it down into clear actions with timelines and helpful resources to keep you on track.`}
        icon={<Target02Icon color="#9b9b9b" width={45} height={45} />}
        className="w-screen max-w-screen-xl text-center !items-center !justify-center"
      /> */}

      <div>
        <div
          className={`sm:text-5xl text-2xl font-bold flex items-center gap-4 mb-2 text-center justify-center`}
        >
          {/* <Target02Icon color="#9b9b9b" width={45} height={45} /> */}
          Need help setting goals?
        </div>
        <div
          className={` text-foreground-700 max-w-screen-md "text-md text-lg text-center`}
        >
          GAIA makes it easy by creating a step-by-step plan just for you. Enter
          your goal, and GAIA will break it down into clear actions with
          timelines and helpful resources to keep you on track.
        </div>
      </div>
      <AnimatedSection className="flex min-w-full justify-evenly items-center w-screen max-w-screen-xl py-10">
        <div className="flex flex-col items-center gap-1">
          <div className="bg-zinc-800 outline-zinc-700 outline outline-2 w-[50px] h-[50px] rounded-xl flex items-center justify-center relative m-5">
            <Target02Icon color="white" height={30} width={30} />
            <div className="bg-primary rounded-full min-w-5 min-h-5 text-sm font-bold text-black flex items-center justify-center absolute -bottom-1 -right-1">
              1
            </div>
          </div>

          <div className="text-xl font-bold">Enter your goal</div>
          <div className="w-[50%] text-center text-foreground-500">
            Define your objective clearly so we can create a personalized plan
            for you.
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="bg-zinc-800 outline-zinc-700 outline outline-2 w-[50px] h-[50px] rounded-xl flex items-center justify-center relative m-5">
            <FlowchartIcon1 color="white" height={30} width={30} />
            <div className="bg-primary rounded-full min-w-5 min-h-5 text-sm font-bold text-black flex items-center justify-center absolute -bottom-1 -right-1">
              2
            </div>
          </div>
          <div className="text-xl font-bold">Create a Flowchart</div>
          <div className="w-[50%] text-center text-foreground-500">
            GAIA provides a step-by-step plan with resources to help you achieve
            your goal!
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="bg-zinc-800 outline-zinc-700 outline outline-2 w-[50px] h-[50px] rounded-xl flex items-center justify-center relative m-5">
            <CheckmarkSquare03Icon color="white" height={30} width={30} />
            <div className="bg-primary rounded-full min-w-5 min-h-5 text-sm font-bold text-black flex items-center justify-center absolute -bottom-1 -right-1">
              3
            </div>
          </div>
          <div className="text-xl font-bold">Keep Track</div>
          <div className="w-[50%] text-center text-foreground-500">
            Monitor your milestones and celebrate every step toward achieving
            your goal.
          </div>
        </div>
      </AnimatedSection>
    </AnimatedSection>
  );
}
