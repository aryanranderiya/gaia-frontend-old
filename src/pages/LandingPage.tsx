import { Suspense, lazy, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SuspenseLoader from "@/components/SuspenseLoader";
import ImagePreview from "@/components/LandingPage/Sections/Hero_Image";
import HeroSection from "@/components/LandingPage/Sections/Hero_Section";

const FeatureList = lazy(
  () => import("@/components/LandingPage/Sections/FeatureList")
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
        <div className="fixed inset-0 bg-gradient-to-b from-[#00bbff30] to-black z-[-1] top-0 h-screen" />

        <HeroSection />

        <ImagePreview />

        <Suspense fallback={<SuspenseLoader />}>
          <Internet />
        </Suspense>

        <Suspense fallback={<SuspenseLoader />}>
          <GoalSection />
        </Suspense>

        <div className="w-screen flex justify-center min-h-screen items-center h-fit sm:pt-0 pt-[10vh]">
          <div className="grid w-screen max-w-screen-2xl gap-4 sm:grid-cols-3 grid-cols-1">
            <Suspense fallback={<SuspenseLoader />}>
              <ImageGeneration />
            </Suspense>

            <Suspense fallback={<SuspenseLoader />}>
              <FlowchartDemo />
            </Suspense>

            <Suspense fallback={<SuspenseLoader />}>
              <FlowchartDemo />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<SuspenseLoader />}>
          <FeatureList />
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
