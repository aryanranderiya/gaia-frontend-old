import ImagePreview from "@/components/LandingPage/Sections/Hero_Image";
import HeroSection from "@/components/LandingPage/Sections/Hero_Section";
import AllFeatures from "@/components/LandingPage/Sections/Section_AllFeatures";
import Section_Document from "@/components/LandingPage/Sections/Section_Documents";
import Section_Notes from "@/components/LandingPage/Sections/Section_Notes";
import TargetAudience from "@/components/LandingPage/Sections/Section_TargetAudience";
import WhatCanYouDo from "@/components/LandingPage/Sections/Section_WhatCanYouDo";
import Section_ConvoManagement from "@/components/LandingPage/Sections/Sections_ConvoManagement";
import TheSearchForAssistants from "@/components/LandingPage/Sections/TheSearchForAssistants";
import SuspenseLoader from "@/components/SuspenseLoader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense, lazy, useEffect } from "react";

const ComingSoon = lazy(
  () => import("@/components/LandingPage/Sections/Section_ComingSoon")
);
const FlowchartDemo = lazy(
  () => import("@/components/LandingPage/Sections/Section_Flowchart")
);
const Footer = lazy(() => import("@/components/LandingPage/misc/Footer"));
const GoalSection = lazy(
  () => import("@/components/LandingPage/Sections/Section_Goal")
);
const ImageGeneration = lazy(
  () => import("@/components/LandingPage/Sections/Section_GenerateImage")
);
const Internet = lazy(
  () => import("@/components/LandingPage/Sections/Section_Internet")
);
const FinalSection = lazy(() => import("./FinalSection"));

export default function LandingPage() {
  useEffect(() => {
    const img = new Image();
    img.src = "/landing/screenshot.png";
    img.decode(); // Hint to browser to decode image early
  }, []);

  return (
    <ScrollArea>
      <div className="landing_page relative select-none">
        <div className="fixed inset-0 bg-gradient-to-b bg-[#00bbff15] z-[-1] top-0 h-screen" />

        <HeroSection />
        <ImagePreview />

        <TheSearchForAssistants />
        <WhatCanYouDo />

        <Suspense fallback={<SuspenseLoader />}>
          <Internet />
        </Suspense>

        <Suspense fallback={<SuspenseLoader />}>
          <GoalSection />
        </Suspense>

        <div className="w-screen flex justify-center min-h-screen items-center h-fit sm:pt-0 pt-[10vh] flex-col ">
          <div className="font-medium text-5xl relative z-[1]">
            Ditch all other chatbots!
          </div>
          <div className="text-foreground-600 mb-4 relative z-[1]">
            GAIA has everything you need.
          </div>

          <div className="grid w-screen max-w-screen-xl gap-4 sm:grid-cols-3 grid-cols-1 relative z-[0]">
            <div className="h-full w-full absolute top-0 flex justify-start flex-col items-center pointer-events-none">
              <div className="size-[500px] blur-[200px] bg-[#00bbff] z-[-1] relative"></div>
              <div className="size-[500px] blur-[200px] bg-[#00bbff] z-[-1] relative top-[30vh]"></div>
            </div>

            <Suspense fallback={<SuspenseLoader />}>
              {/* <div className="z-[1] col-span-2"> */}
              <Section_Notes />
              {/* </div> */}
            </Suspense>

            <Suspense fallback={<SuspenseLoader />}>
              {/* <div className="z-[1]"> */}
              <ImageGeneration />
              {/* </div> */}
            </Suspense>

            <Suspense fallback={<SuspenseLoader />}>
              {/* <div className="z-[1]"> */}
              <FlowchartDemo />
              {/* </div> */}
            </Suspense>

            <Suspense fallback={<SuspenseLoader />}>
              {/* <div className="z-[1]"> */}
              <Section_Document />
              {/* </div> */}
            </Suspense>

            <Suspense fallback={<SuspenseLoader />}>
              {/* <div className="z-[1]"> */}
              <Section_ConvoManagement />
              {/* </div> */}
            </Suspense>
          </div>
        </div>
        {/* 
        <Suspense fallback={<SuspenseLoader />}>
          <AllFeatures />
        </Suspense> */}

        <Suspense fallback={<SuspenseLoader />}>
          <TargetAudience />
        </Suspense>

        <Suspense fallback={<SuspenseLoader />}>
          <ComingSoon />
        </Suspense>

        <Suspense fallback={<SuspenseLoader />}>
          <FinalSection />
        </Suspense>

        <Suspense fallback={<SuspenseLoader />}>
          <Footer />
        </Suspense>
      </div>
    </ScrollArea>
  );
}
